"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Brain, CalendarDays, CornerDownLeft, FileQuestion, HelpCircle, Lightbulb, Loader2, RefreshCcw, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type AssistantMode = "explain_wrong_answer" | "mini_quiz" | "reformulate" | "daily_plan" | "general";
type Message = { role: "user" | "assistant"; text: string; mode?: AssistantMode };

const assistantModes: Array<{ id: AssistantMode; label: string; description: string; icon: React.ElementType; prompt: string }> = [
  {
    id: "explain_wrong_answer",
    label: "Expliquer une erreur",
    description: "Pourquoi ma réponse est fausse, piège et bonne logique.",
    icon: HelpCircle,
    prompt: "Explique cette mauvaise réponse Security+ et donne la bonne logique d'examen: ",
  },
  {
    id: "mini_quiz",
    label: "Créer un mini-quiz",
    description: "3 questions originales avec correction.",
    icon: FileQuestion,
    prompt: "Crée un mini-quiz Security+ sur ce sujet: ",
  },
  {
    id: "reformulate",
    label: "Reformuler un concept",
    description: "Version simple, exemple et confusions.",
    icon: RefreshCcw,
    prompt: "Reformule clairement ce concept Security+: ",
  },
  {
    id: "daily_plan",
    label: "Plan du jour",
    description: "Plan court avec quiz, flashcards et PBQ.",
    icon: CalendarDays,
    prompt: "Génère mon plan de révision du jour en tenant compte de ce besoin: ",
  },
];

const quickPrompts = [
  { category: "Détection & Réponse", items: ["SIEM vs SOAR", "IDS vs IPS", "Phases Incident Response"] },
  { category: "Identité & Accès", items: ["MFA vs IAM", "SSO et fédération SAML", "Zero Trust"] },
  { category: "Cryptographie", items: ["RSA vs AES vs ECC", "Chiffrement symétrique vs asymétrique", "HSM vs TPM"] },
  { category: "Réseau & Protocoles", items: ["SSL vs TLS vs VPN", "DNS vs DHCP", "CVE et CVSS"] },
];

function modeLabel(mode?: AssistantMode) {
  return assistantModes.find((item) => item.id === mode)?.label ?? "Assistant";
}

export function AssistantView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<AssistantMode>("general");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Assistant prêt. Choisis un mode ou pose ta question.");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string, forcedMode?: AssistantMode) {
    const activeMode = forcedMode ?? mode;
    const prompt = (text ?? input).trim();
    if (!prompt || loading) return;

    const userMessage: Message = { role: "user", text: prompt, mode: activeMode };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setStatus("DeepSeek réfléchit...");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          mode: activeMode,
          context: "Candidat francophone préparant CompTIA Security+ SY0-701 avec CertiFlow.",
          history: messages.slice(-6),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Erreur DeepSeek.");

      setMessages([...nextMessages, { role: "assistant", text: data.answer, mode: activeMode }]);
      setStatus(`Réponse générée avec ${data.model ?? "DeepSeek"}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur inconnue.";
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          mode: activeMode,
          text: `Je n'arrive pas encore à joindre DeepSeek.\n\nÀ vérifier côté Netlify: la variable serveur \`DEEPSEEK_API_KEY\` doit être configurée, puis le site doit être redéployé.\n\nDétail: ${message}`,
        },
      ]);
      setStatus("Assistant indisponible pour le moment.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      send();
    }
  }

  function useModePrompt(selectedMode: AssistantMode) {
    const selected = assistantModes.find((item) => item.id === selectedMode);
    setMode(selectedMode);
    setInput(selected?.prompt ?? "");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-black">Assistant IA DeepSeek pour Security+</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Explique les erreurs, crée des mini-quiz, reformule les concepts et prépare ton plan du jour.
            </p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">{status}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {assistantModes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => useModePrompt(item.id)}
            className={cn(
              "rounded-card border bg-card p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary",
              mode === item.id ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-btn bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="font-black">{item.label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          </button>
        ))}
      </div>

      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-bold">Prompts rapides</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          {quickPrompts.flatMap(({ category, items }) => items).map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt, "reformulate")}
              className="rounded-lg border border-border bg-card p-2.5 text-left text-xs font-medium transition hover:border-primary hover:shadow-sm hover:scale-[1.01]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {messages.length > 0 && (
        <div className="overflow-hidden rounded-card border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-bold">Conversation</p>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-xs font-bold text-muted-foreground transition hover:text-red-500"
            >
              Effacer
            </button>
          </div>
          <div className="max-h-[32rem] space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={cn("flex gap-2.5", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  message.role === "user" ? "bg-primary" : "border border-border bg-muted",
                )}>
                  {message.role === "user" ? (
                    <span className="text-[10px] font-black text-primary-foreground">Q</span>
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <div className={cn(
                  "max-w-[88%] whitespace-pre-wrap rounded-card px-3.5 py-2.5 text-sm leading-relaxed",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border bg-muted text-foreground",
                )}>
                  {message.role === "assistant" && (
                    <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      <Brain className="h-3 w-3" /> {modeLabel(message.mode)}
                    </div>
                  )}
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                  <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-card border border-border bg-muted px-3.5 py-2.5 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  DeepSeek prépare la réponse...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mode actif: {modeLabel(mode)}</span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <CornerDownLeft className="h-3 w-3" /> Ctrl+Entrée pour envoyer
          </span>
        </div>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: explique pourquoi ma réponse IPS est fausse dans une question sur détection seulement..."
          rows={4}
          className="w-full resize-none rounded-card border border-border bg-muted p-3 text-sm outline-none transition focus:border-primary"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
