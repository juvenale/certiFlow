import { NextResponse } from "next/server";

type AssistantMode = "explain_wrong_answer" | "mini_quiz" | "reformulate" | "daily_plan" | "general";

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
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "DEEPSEEK_API_KEY n'est pas configurée côté serveur." },
        { status: 500 },
      );
    }

    const body = await request.json() as {
      prompt?: string;
      mode?: AssistantMode;
      context?: string;
      history?: Array<{ role: "user" | "assistant"; text: string }>;
    };

    const prompt = body.prompt?.trim();
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
