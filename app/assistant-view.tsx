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
      const customKey = typeof window !== "undefined" ? localStorage.getItem("certiflow-custom-api-key") : "";
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(customKey ? { "Authorization": `Bearer ${customKey}` } : {})
        },
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

  function selectModePrompt(selectedMode: AssistantMode) {
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
            onClick={() => selectModePrompt(item.id)}
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

      <div className="overflow-hidden rounded-card border border-border bg-card shadow-md flex flex-col">
        {/* Chat Window Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Cockpit de chat IA · DeepSeek</p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-xs font-bold text-muted-foreground transition hover:text-red-500 select-none"
            >
              Effacer la conversation
            </button>
          )}
        </div>

        {/* Chat Messages Stream */}
        <div className="max-h-[30rem] overflow-y-auto p-4 space-y-4 min-h-[160px] bg-card scrollbar-thin">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10 text-muted-foreground select-none">
              <Bot className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-bold">Aucun message pour le moment</p>
              <p className="text-xs max-w-sm mt-1">Sélectionnez un prompt rapide ci-dessus ou posez directement votre question pour démarrer.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={cn("flex gap-2.5", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm",
                  message.role === "user" ? "bg-primary text-white" : "border border-border bg-muted",
                )}>
                  {message.role === "user" ? (
                    <span className="text-[10px] font-black select-none">Q</span>
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <div className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  message.role === "user" 
                    ? "bg-primary text-white border border-primary/10 rounded-tr-none" 
                    : "border border-border bg-muted/65 text-foreground rounded-tl-none"
                )}>
                  {message.role === "assistant" && (
                    <div className="mb-2.5 inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground select-none">
                      <Brain className="h-3 w-3 text-primary" /> {modeLabel(message.mode)}
                    </div>
                  )}
                  {message.text}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted shadow-sm">
                <Bot className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl rounded-tl-none border border-border bg-muted/60 px-4 py-3 text-sm text-foreground shadow-sm">
                <div className="flex items-center gap-1 select-none">
                  <span className="dot-pulse" />
                  <span className="dot-pulse" />
                  <span className="dot-pulse" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground animate-pulse">DeepSeek formule une réponse...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Sticky Input container docked at bottom */}
        <div className="border-t border-border bg-muted/40 p-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mode actif: {modeLabel(mode)}</span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground select-none">
              <CornerDownLeft className="h-3 w-3" /> Ctrl+Entrée pour envoyer
            </span>
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question sur CompTIA Security+ ou expliquez une confusion..."
            rows={3}
            className="w-full resize-none rounded-card border border-border bg-card p-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary shadow-inner"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-40 shadow-sm"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
