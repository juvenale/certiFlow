import { NextResponse } from "next/server";

type AssistantMode = "explain_wrong_answer" | "mini_quiz" | "reformulate" | "daily_plan" | "general" | "expliquer";

const modeInstructions: Record<AssistantMode, string> = {
  explain_wrong_answer:
    "Explique pourquoi une réponse Security+ est mauvaise, identifie le piège, donne la bonne logique d'examen et une règle mémotechnique courte.",
  mini_quiz:
    "Crée un mini-quiz Security+ de 3 questions originales avec 4 choix A-D, la bonne réponse et une explication concise après chaque question.",
  reformulate:
    "Reformule le concept demandé en français clair, garde les termes techniques anglais entre parenthèses, ajoute un exemple et les confusions fréquentes.",
  daily_plan:
    "Génère un plan de révision du jour réaliste, découpé en blocs courts, avec quiz, flashcards, PBQ et correction des erreurs.",
  general:
    "Réponds comme un coach de révision Security+ francophone, clair, direct, orienté réussite à l'examen.",
  expliquer:
    "Tu es un expert en cybersécurité et instructeur CompTIA Security+ SY0-701. Analyse une question et explique de façon ultra-concise pourquoi la bonne réponse est correcte et pourquoi le choix de l'étudiant est un piège classique. Structure : 1) Concept Clé (1 phrase), 2) Pourquoi correct (1-2 phrases), 3) Pourquoi le piège (1 ligne). Pas de salutations.",
};

export async function POST(request: Request) {
  try {
    let apiKey = request.headers.get("Authorization")?.replace("Bearer ", "")?.trim();
    if (!apiKey || apiKey === "null" || apiKey === "undefined") {
      apiKey = process.env.DEEPSEEK_API_KEY;
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "Clé API non configurée. Veuillez renseigner votre clé API DeepSeek dans les Paramètres de l'application." },
        { status: 500 },
      );
    }

    const body = await request.json() as {
      prompt?: string;
      mode?: AssistantMode;
      context?: string | { type: string; statement: string; userAnswer: string; correctAnswer: string; explanationStatique?: string };
      history?: Array<{ role: "user" | "assistant"; text: string }>;
    };

    let prompt = body.prompt?.trim();

    // Build contextual prompt for expliquer mode
    if (body.mode === "expliquer" && typeof body.context === "object" && body.context.statement) {
      const ctx = body.context;
      prompt = [
        `**Question :** ${ctx.statement}`,
        `- Option choisie : "${ctx.userAnswer}"`,
        `- Option correcte : "${ctx.correctAnswer}"`,
        `Redige une reponse structuree :`,
        `1. **Le Concept Cle (1 phrase)** : la regle d or au coeur de la question.`,
        `2. **Pourquoi c est correct (1-2 phrases)** : justifie l option correcte.`,
        `3. **Pourquoi l autre est un piege (1 ligne)** : explique pourquoi le choix de l etudiant est hors-sujet ou inadapte.`,
        `Reste concis, pas de salutations.`,
      ].join("\n");
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt vide." }, { status: 400 });
    }

    const mode = body.mode ?? "general";
    const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
    const history = (body.history ?? []).slice(-6);

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: [
              "Tu es l'assistant IA de CertiFlow, une app de préparation CompTIA Security+ SY0-701.",
              "Réponds principalement en français, mais garde les termes importants en anglais entre parenthèses.",
              "Ne copie jamais de questions officielles. Génère des exemples originaux et pédagogiques.",
              "Structure tes réponses avec des titres courts et des listes compactes.",
              "Sois précis, utile, encourageant et orienté examen.",
              modeInstructions[mode],
              body.context ? `Contexte utilisateur: ${body.context}` : "",
            ].filter(Boolean).join("\n"),
          },
          ...history.map((message) => ({
            role: message.role,
            content: message.text,
          })),
          { role: "user", content: prompt },
        ],
        ...(model === "deepseek-v4-pro" ? { thinking: { type: "disabled" } } : {}),
        temperature: mode === "mini_quiz" ? 0.7 : 0.3,
        max_tokens: mode === "mini_quiz" || mode === "daily_plan" ? 1200 : 800,
        stream: false,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json(
        { error: `DeepSeek a refusé la requête (${response.status}).`, details },
        { status: response.status },
      );
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json({ error: "Réponse DeepSeek vide." }, { status: 502 });
    }

    return NextResponse.json({ answer, model });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur assistant inconnue." },
      { status: 500 },
    );
  }
}
