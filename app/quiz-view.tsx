"use client";

import { AlertCircle, CheckCircle2, Flag, Loader2, Sparkles, Target, XCircle, Zap, Trophy, Settings2, Compass, Lightbulb } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useTimeTracker } from "./hooks/useTimeTracker";
import { cn } from "@/lib/utils";
import { QuizConfig } from "./quiz-config";

type QuizQuestion = {
  id: string;
  domain: string;
  questionNumber: number;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  source: string;
  scenario?: string;
};

type QuizMode = "quick" | "weak" | "errors" | "custom";

const domainColors: Record<string, { bg: string; border: string; dot: string }> = {
  "General Security Concepts":                 { bg: "dom-bg-violet",  border: "dom-bd-violet",  dot: "bg-violet-500"  },
  "Threats, Vulnerabilities, and Mitigations": { bg: "dom-bg-red",     border: "dom-bd-red",     dot: "bg-red-500"     },
  "Security Architecture":                     { bg: "dom-bg-blue",    border: "dom-bd-blue",    dot: "bg-blue-500"    },
  "Security Operations":                       { bg: "dom-bg-emerald", border: "dom-bd-emerald", dot: "bg-emerald-500" },
  "Security Program Management and Oversight": { bg: "dom-bg-amber",   border: "dom-bd-amber",   dot: "bg-amber-500"   },
};

function dc(domain: string) {
  return domainColors[domain] ?? { bg: "bg-muted", border: "border-border", dot: "bg-primary" };
}

// ─── LetterBadge ─────────────────────────────────────────────────────────────
function LetterBadge({ letter, state }: {
  letter: string;
  state: "default" | "selected" | "correct" | "wrong" | "correct-unselected";
}) {
  return (
    <span className={cn(
      "flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-all duration-300",
      state === "default"            && "bg-muted text-muted-foreground border border-border/50",
      state === "selected"           && "bg-primary text-primary-foreground shadow-sm shadow-primary/20",
      state === "correct"            && "bg-[var(--success)] text-white shadow-sm",
      state === "wrong"              && "bg-[var(--danger)] text-white shadow-sm",
      state === "correct-unselected" && "border-2 border-[var(--success)] bg-success-muted text-success-fg",
    )}>
      {letter}
    </span>
  );
}

// ─── StatChip ─────────────────────────────────────────────────────────────────
function StatChip({
  label,
  value,
  sub,
  accent,
  icon: Icon
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-card border border-border bg-card/60 backdrop-blur-sm p-3 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md group",
      accent
    )}>
      {/* Subtle background glow */}
      <div className="absolute -right-6 -bottom-6 h-12 w-12 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-300" />
      
      <div className="flex items-start justify-between gap-1.5">
        <div className="min-w-0 space-y-0.5">
          <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/80">{label}</p>
          <p className="text-lg font-black tracking-tight tabular-nums text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-3 w-3" />
          </div>
        )}
      </div>
      {sub && <p className="mt-1 text-[8px] font-semibold text-muted-foreground/90 leading-none truncate">{sub}</p>}
    </div>
  );
}

// ─── ModeCard ─────────────────────────────────────────────────────────────────
function ModeCard({ icon: Icon, label, desc, onClick, disabled }: {
  icon: React.ElementType;
  label: string;
  desc: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex items-center gap-2.5 rounded-card border p-2.5 text-left transition-all duration-300 relative overflow-hidden w-full",
        disabled
          ? "cursor-not-allowed opacity-40 bg-muted/30 border-border"
          : "bg-muted/40 border-border hover:border-primary/40 hover:bg-card hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <div className={cn(
        "flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-btn transition-colors duration-300",
        disabled 
          ? "bg-muted text-muted-foreground" 
          : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
      )}>
        <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-black text-foreground group-hover:text-primary transition-colors duration-200 truncate">{label}</p>
        <p className="mt-0.5 truncate text-[10px] font-medium text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}

// ─── Keyword Highlighter ──────────────────────────────────────────────────────
function highlightKeywords(text: string) {
  if (!text) return "";
  
  // A comprehensive list of Security+ acronyms and high-priority terms
  const keywords = [
    // Acronyms
    "MFA", "SSO", "DLP", "RAID", "SIEM", "IDS", "IPS", "VPN", "ACL", "CVE",
    "DNSSEC", "TLS", "AES", "MD5", "SHA", "IAM", "RBAC", "ABAC", "MAC", "DAC",
    "BYOD", "MDM", "MAM", "COPE", "CYOD", "SaaS", "PaaS", "IaaS", "CASB", "DRP",
    "BCP", "RTO", "RPO", "MTBF", "MTTR", "ALE", "SLE", "ARO", "TTO", "SLA",
    "NDA", "MOU", "ISA", "BPA", "SOW", "DDoS", "XSS", "SQLi", "CSRF", "RAT",
    "AP", "WPA", "WPA2", "WPA3", "WEP", "SSID", "RADIUS", "TACACS\\+", "LDAP",
    "Kerberos", "SAM", "HSM", "TPM", "UEFI", "BIOS", "EDR", "XDR", "NDR",
    "SOC", "CSIRT", "CERT", "IR", "SOAR", "UTM", "NGFW", "DMZ", "VLAN",
    "SDN", "WAF", "API", "REST", "SOAP", "OWASP", "OT", "SCADA", "PLC", "IoT",
    
    // Core Concepts
    "phishing", "spear phishing", "whaling", "vishing", "smishing", "social engineering",
    "ransomware", "spyware", "trojan", "worm", "backdoor", "rootkit", "logic bomb",
    "zero-day", "brute-force", "dictionary attack", "rainbow table", "salt", "salting",
    "mitigation", "vulnerabilité", "menace", "risque", "chiffrement", "authentification",
    "autorisation", "imputabilité", "non-répudiation", "intégrité", "confidentialité",
    "disponibilité", "sauvegarde", "redondance", "pare-feu", "antivirus", "sandbox",
    "hameçonnage", "ingénierie sociale", "rançongiciel",
    
    // Key Exam Question Indicators
    "le plus", "le moins", "le premier", "le meilleur", "le plus probable",
    "le plus adapté", "le plus efficace", "le plus sécurisé", "le plus rapide",
    "le plus économique", "la meilleure option", "le principal", "la principale",
    "le premier élément", "action immédiate", "en premier lieu", "principale", "meilleur"
  ];

  // We build a regex that matches these words, case-insensitive, but with word boundaries
  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  const parts = text.split(pattern);

  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <mark key={i} className="bg-primary/15 text-primary font-black px-0.5 rounded border-b border-primary/30 select-none">
          {part}
        </mark>
      );
    }
    return part;
  });
}

// ─── QuizView ─────────────────────────────────────────────────────────────────
export function QuizView({
  score, answered, correct,
  effectiveQuizQuestions, totalQuestions,
  questionIndex, currentQuestion, currentQuestionChoices, currentQuestionAnswer,
  selectedAnswer, weakestDomain, errorsCount,
  startQuiz, chooseAnswer, nextQuestion,
}: {
  score: number;
  answered: number;
  correct: number;
  effectiveQuizQuestions: QuizQuestion[];
  totalQuestions: number;
  questionIndex: number;
  currentQuestion: QuizQuestion;
  currentQuestionChoices: string[];
  currentQuestionAnswer: number;
  selectedAnswer: number | null;
  weakestDomain: string;
  errorsCount: number;
  startQuiz: (mode: QuizMode, filters?: any) => void;
  chooseAnswer: (index: number) => void;
  nextQuestion: () => void;
}) {
  const pos = questionIndex % effectiveQuizQuestions.length;
  const progressPct = effectiveQuizQuestions.length > 1
    ? Math.round(((pos + 1) / effectiveQuizQuestions.length) * 100)
    : 100;
  
  const [studyMode, setStudyMode] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("certiflow-quiz-study-mode") === "true";
      }
    } catch {}
    return false;
  });
  
  const [zenMode, setZenMode] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("certiflow-quiz-zen-mode") === "true";
      }
    } catch {}
    return false;
  });
  
  const [highlightMode, setHighlightMode] = useState<boolean>(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("certiflow-quiz-highlight-mode") === "true";
      }
    } catch {}
    return false;
  });

  const handleStudyModeChange = (val: boolean) => {
    setStudyMode(val);
    try {
      localStorage.setItem("certiflow-quiz-study-mode", String(val));
    } catch {}
  };

  const handleZenModeChange = (val: boolean) => {
    setZenMode(val);
    try {
      localStorage.setItem("certiflow-quiz-zen-mode", String(val));
    } catch {}
  };

  const handleHighlightModeChange = (val: boolean) => {
    setHighlightMode(val);
    try {
      localStorage.setItem("certiflow-quiz-highlight-mode", String(val));
    } catch {}
  };

  const isCorrect = selectedAnswer === currentQuestionAnswer;
  const colors = dc(currentQuestion.domain);
  const revealed = selectedAnswer !== null || studyMode;
  
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isFlagged, setIsFlagged] = useState(false);
  
  const timer = useTimeTracker(currentQuestion.id, "QCM");
  const saveAndProgressRef = useRef(timer.saveAndProgress);
  
  useEffect(() => {
    saveAndProgressRef.current = timer.saveAndProgress;
  }, [timer.saveAndProgress]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (["a","b","c","d"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (idx < currentQuestionChoices.length && !revealed) chooseAnswer(idx);
      }
      if (e.key === "Enter" && revealed) {
        e.preventDefault();
        saveAndProgressRef.current();
        setAiExplanation(null);
        setIsFlagged(false);
        nextQuestion();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, currentQuestionChoices, chooseAnswer, nextQuestion]);

  const handleAskAI = async () => {
    setIsAiLoading(true); setAiExplanation(null);
    try {
      const customKey = typeof window !== "undefined" ? localStorage.getItem("certiflow-custom-api-key") : "";
      const res = await fetch("/api/assistant", { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json",
          ...(customKey ? { "Authorization": `Bearer ${customKey}` } : {})
        },
        body: JSON.stringify({ mode: "expliquer", context: { type: "QCM", statement: currentQuestion.question,
          userAnswer: selectedAnswer !== null ? currentQuestionChoices[selectedAnswer] : "",
          correctAnswer: currentQuestionChoices[currentQuestionAnswer],
          explanationStatique: currentQuestion.explanation } }) 
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setAiExplanation(data.answer);
    } catch { setAiExplanation("IA indisponible."); }
    finally { setIsAiLoading(false); }
  };

  // Check if this question was previously failed
  const previousErrorCount = (() => {
    try { if (typeof window === "undefined") return 0;
      const errors = JSON.parse(localStorage.getItem("certiflow-errors") || "[]");
      const found = errors.find((e: any) => e.questionId === currentQuestion.id);
      return found ? found.count : 0;
    } catch { return 0; }
  })();

  return (
    <div className="max-w-6xl mx-auto w-full px-2 sm:px-4 lg:px-6">
      <div className={cn(
        "grid grid-cols-1 gap-5 items-start",
        zenMode 
          ? "lg:grid-cols-1 max-w-2xl mx-auto" 
          : "lg:grid-cols-[240px_1fr_290px]"
      )}>
        
        {/* Left Column: Stats & Training Modes (Second on mobile, Left Sidebar on desktop) */}
        <div className={cn(
          "space-y-4 lg:sticky lg:top-20 order-2 lg:order-1",
          zenMode && "lg:hidden"
        )}>
          
          {/* Stats header widget (Vertical Stack) */}
          <div className="rounded-card border border-border bg-card p-3.5 shadow-sm space-y-2.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/85">{"Statistiques"}</p>
            <div className="grid grid-cols-1 gap-2">
              <StatChip
                label="Score session"
                value={score + "%"}
                sub={answered ? `${correct}/${answered} correctes` : "Aucune réponse"}
                icon={Trophy}
                accent={score >= 75 ? "bg-success-muted border-success-muted text-success-fg" : score >= 50 ? "bg-warning-muted border-warning-muted text-warning-fg" : undefined}
              />
              <StatChip 
                label="Questions actives" 
                value={effectiveQuizQuestions.length} 
                sub={`sur ${totalQuestions} au total`}
                icon={Settings2} 
              />
              <StatChip 
                label="Position" 
                value={`${pos + 1} / ${effectiveQuizQuestions.length}`} 
                sub={`${progressPct}% parcouru`}
                icon={Compass} 
              />
            </div>
          </div>

          {/* Mode selector widget */}
          <div className="rounded-card border border-border bg-card p-3.5 shadow-sm space-y-2.5">
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/80">{"Entraînement"}</p>
            <div className="grid gap-2 grid-cols-1">
              <ModeCard icon={Zap}          label="Quiz rapide"    desc="Questions aléatoires"               onClick={() => startQuiz("quick")} />
              <ModeCard icon={Target}       label="Domaine faible" desc={weakestDomain}                      onClick={() => startQuiz("weak")} />
              <ModeCard icon={AlertCircle}  label="Mode erreurs"   desc={errorsCount ? `${errorsCount} erreur${errorsCount > 1 ? "s" : ""} enregistrée${errorsCount > 1 ? "s" : ""}` : "Aucune erreur"}
                onClick={() => startQuiz("errors")} disabled={errorsCount === 0} />
            </div>
          </div>

        </div>

        {/* Center Column: Quiz Cockpit (First on mobile, Middle on desktop) */}
        <div className="space-y-4 order-1 lg:order-2">
          
          {/* Study Options Toolbar */}
          <div className="rounded-card border border-border bg-card/65 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{"Méthode d'étude :"}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={studyMode}
                  onChange={(e) => handleStudyModeChange(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className={cn("font-black text-[9px] uppercase tracking-wider transition-colors", studyMode ? "text-primary" : "text-muted-foreground")}>Mode Flashcard</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={highlightMode}
                  onChange={(e) => handleHighlightModeChange(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className={cn("font-black text-[9px] uppercase tracking-wider transition-colors", highlightMode ? "text-primary" : "text-muted-foreground")}>Focus Mots-Clés</span>
              </label>
              
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={zenMode}
                  onChange={(e) => handleZenModeChange(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className={cn("font-black text-[9px] uppercase tracking-wider transition-colors", zenMode ? "text-primary" : "text-muted-foreground")}>Mode Zen</span>
              </label>
            </div>
          </div>

          {/* Progress bar */}
          <div className="rounded-card border border-border bg-card/80 backdrop-blur-sm p-3.5 py-3 shadow-sm">
            <div className="mb-1.5 flex justify-between items-baseline">
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/85">Progression</span>
              <span className="text-xs font-black text-primary font-mono">{progressPct}% ({pos + 1}/{effectiveQuizQuestions.length})</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Cockpit Container */}
          <div className="w-full space-y-4">
            
            {/* Question card */}
            <div className="rounded-card border border-border bg-card shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              {/* Domain header */}
              <div className="border-b border-border px-4 py-2.5 bg-muted/20">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", colors.dot, "shadow-[0_0_8px_currentColor]")} style={{ color: "var(--primary)" }} />
                    <span className="text-[10px] font-extrabold tracking-wide uppercase text-muted-foreground truncate">{currentQuestion.domain}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {previousErrorCount > 0 && (
                      <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-[8px] font-bold text-red-600 dark:text-red-400 tracking-wide flex items-center gap-1 animate-pulse">
                        <AlertCircle className="h-2 w-2" />
                        {previousErrorCount} révision{previousErrorCount > 1 ? "s" : ""}
                      </span>
                    )}
                    <span className="rounded-full bg-muted/60 border border-border/85 px-1.5 py-0.5 text-[8px] font-bold text-muted-foreground tracking-wide font-mono">
                      Q{currentQuestion.questionNumber}
                    </span>
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold text-primary tracking-wide">
                      {currentQuestion.source}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-5">
                {/* Scenario */}
                {"scenario" in currentQuestion && typeof currentQuestion.scenario === "string" && (
                  <div className="relative rounded-card border-l-4 border-primary bg-muted/40 p-3.5 text-xs italic text-muted-foreground leading-relaxed shadow-sm">
                    {highlightMode ? highlightKeywords(currentQuestion.scenario) : currentQuestion.scenario}
                  </div>
                )}

                {/* Question text */}
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight leading-snug text-foreground">
                  {highlightMode ? highlightKeywords(currentQuestion.question) : currentQuestion.question}
                </h2>

                {/* Choices Grid */}
                <div className="grid gap-2.5">
                  {currentQuestionChoices.map((choice, index) => {
                    const isAnswer = index === currentQuestionAnswer;
                    const isSelected = selectedAnswer === index;

                    let letterState: "default" | "selected" | "correct" | "wrong" | "correct-unselected" = "default";
                    if (revealed) {
                      if (isSelected && isAnswer)         letterState = "correct";
                      else if (isSelected)                letterState = "wrong";
                      else if (isAnswer && studyMode)     letterState = "correct";
                      else if (isAnswer)                  letterState = "correct-unselected";
                    }

                    return (
                      <button
                        key={`${currentQuestion.id}-${index}`}
                        type="button"
                        onClick={() => chooseAnswer(index)}
                        disabled={revealed}
                        className={cn(
                          "group flex items-center gap-3.5 rounded-card border px-4 py-3 text-left transition-all duration-200 w-full relative",
                          !revealed && "border-border hover:border-primary hover:bg-primary/5 hover:scale-[1.003] hover:shadow-[0_2px_8px_rgba(var(--primary-rgb),0.05)] active:scale-[0.995]",
                          revealed && isAnswer && "border-success-muted bg-success-muted text-success-fg shadow-sm",
                          revealed && isSelected && !isAnswer && "border-danger-muted bg-danger-muted text-danger-fg shadow-sm",
                          revealed && !isSelected && !isAnswer && "border-border opacity-35 bg-muted/10",
                        )}
                      >
                        <LetterBadge letter={String.fromCharCode(65 + index)} state={letterState} />
                        <span className={cn(
                          "text-xs sm:text-sm font-semibold leading-relaxed flex-1 text-foreground/90",
                          revealed && isAnswer && "font-black text-success-fg",
                          revealed && isSelected && !isAnswer && "font-black text-danger-fg",
                        )}>
                          {highlightMode ? highlightKeywords(choice) : choice}
                        </span>
                        {!revealed && (
                          <kbd className="ml-auto hidden sm:inline-block text-[9px] font-mono font-black bg-muted/80 px-1.5 py-0.5 rounded border border-border text-muted-foreground tracking-wider transition-colors group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary">
                            {String.fromCharCode(65 + index)}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Skip button */}
                {!revealed && (
                  <div className="flex justify-end pt-0.5">
                    <button
                      type="button"
                      onClick={() => { timer.saveAndProgress(); nextQuestion(); }}
                      className="text-[11px] font-bold text-muted-foreground/80 hover:text-primary transition-colors flex items-center gap-1 group py-1 px-2.5 rounded-full hover:bg-muted/50"
                    >
                      Passer cette question
                      <span className="transition-transform group-hover:translate-x-1 font-mono">→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Correction & AI panel */}
            {revealed && (
              <div className={cn(
                "rounded-card border shadow-md overflow-hidden transition-all duration-300",
                studyMode
                  ? "border-primary/20 shadow-sm"
                  : isCorrect
                    ? "border-success-muted"
                    : "border-danger-muted"
              )}>
                {/* Correction header */}
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-xs font-black tracking-wide uppercase border-b",
                  studyMode
                    ? "bg-primary/10 text-primary border-primary/15"
                    : isCorrect
                      ? "bg-success-muted text-success-fg border-success-muted"
                      : "bg-danger-muted text-danger-fg border-danger-muted"
                )}>
                  {studyMode ? (
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  ) : isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-success-fg" />
                  ) : (
                    <XCircle className="h-4 w-4 text-danger-fg" />
                  )}
                  {studyMode ? "Fiche d'étude active" : isCorrect ? "Réponse correcte !" : "Examen de la réponse"}
                </div>

                <div className="space-y-3.5 bg-card p-4">
                  {/* Split answer panels (only on wrong and not in studyMode) */}
                  {!isCorrect && selectedAnswer !== null && (
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <div className="rounded-card border border-danger-muted bg-danger-muted p-3 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-12 w-12 -mr-4 -mt-4 rounded-full bg-danger-muted/30 blur-lg" />
                        <p className="mb-1 text-[8px] font-black uppercase tracking-widest text-danger-fg">Votre choix</p>
                        <p className="text-xs sm:text-sm font-bold text-foreground flex items-start gap-1.5">
                          <span className="inline-block text-[10px] bg-[var(--danger)] text-white rounded-full h-4.5 w-4.5 text-center leading-4.5 font-black shrink-0">{String.fromCharCode(65 + selectedAnswer)}</span>
                          <span className="leading-tight pt-0.5">{currentQuestionChoices[selectedAnswer] ?? ""}</span>
                        </p>
                      </div>
                      <div className="rounded-card border border-success-muted bg-success-muted p-3 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 h-16 w-16 -mr-4 -mt-4 rounded-full bg-success-muted/30 blur-lg" />
                        <p className="mb-1 text-[8px] font-black uppercase tracking-widest text-success-fg">Bonne réponse</p>
                        <p className="text-xs sm:text-sm font-bold text-foreground flex items-start gap-1.5">
                          <span className="inline-block text-[10px] bg-[var(--success)] text-white rounded-full h-4.5 w-4.5 text-center leading-4.5 font-black shrink-0">{String.fromCharCode(65 + currentQuestionAnswer)}</span>
                          <span className="leading-tight pt-0.5">{currentQuestionChoices[currentQuestionAnswer] ?? ""}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="rounded-card border border-border bg-muted/40 p-3.5 relative overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1.5 text-muted-foreground">
                      <Lightbulb className="h-4 w-4 text-amber-500 animate-pulse" />
                      <p className="text-[9px] font-black uppercase tracking-widest">Explication pédagogique</p>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/90 font-medium">{currentQuestion.explanation}</p>
                  </div>

                  {/* AI Loading panel */}
                  {isAiLoading && (
                    <div className="rounded-card border border-primary/20 bg-primary/5 p-3.5 animate-pulse">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary">{"Analyse détaillée de l'IA en cours..."}</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2.5 bg-primary/10 rounded w-5/6" />
                        <div className="h-2.5 bg-primary/10 rounded w-4/5" />
                        <div className="h-2.5 bg-primary/10 rounded w-3/4" />
                      </div>
                    </div>
                  )}

                  {/* AI Explanation block */}
                  {aiExplanation && (
                    <div className="rounded-card border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent p-3.5 text-xs leading-relaxed border border-border/80 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-left-1 duration-200">
                      <div className="flex items-center gap-1.5 mb-1.5 text-primary">
                        <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                        <p className="text-[9px] font-black uppercase tracking-widest">{"Analyse de l'IA certiFlow"}</p>
                      </div>
                      <div className="text-xs text-foreground/90 font-medium whitespace-pre-line leading-relaxed">{aiExplanation}</div>
                    </div>
                  )}
                  
                  {/* Footer buttons dock */}
                  <div className="mt-3.5 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsFlagged((v: boolean) => !v)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-btn border px-2.5 py-1.5 text-[10px] font-bold transition-all duration-300 hover:scale-[1.02]",
                          isFlagged
                            ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "border-border bg-transparent text-muted-foreground hover:border-amber-500/50 hover:text-amber-500"
                        )}
                      >
                        <Flag className="h-3 w-3" />
                        <span>{isFlagged ? "Marqué" : "Marquer"}</span>
                      </button>
                      
                      {!aiExplanation && !isAiLoading && (
                        <button
                          type="button"
                          onClick={handleAskAI}
                          className="inline-flex items-center gap-1.5 rounded-btn border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/15 px-3.5 py-2 text-xs font-bold text-primary hover:from-primary/20 hover:to-accent/25 hover:border-primary/50 hover:shadow-[0_0_8px_rgba(99,102,241,0.15)] transition-all duration-200 shimmer-effect"
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>Explications IA</span>
                        </button>
                      )}
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => { timer.saveAndProgress(); setAiExplanation(null); setIsFlagged(false); nextQuestion(); }}
                      className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 text-xs font-black text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    >
                      <span>Question suivante</span>
                      <kbd className="hidden sm:inline-block px-1 py-0.5 text-[9px] font-mono font-bold bg-primary-foreground/20 text-primary-foreground rounded border border-primary-foreground/10 select-none">
                        Enter ↵
                      </kbd>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Custom Configuration (Third on mobile, Right Sidebar on desktop) */}
        <div className={cn(
          "space-y-4 lg:sticky lg:top-20 order-3",
          zenMode && "lg:hidden"
        )}>
          
          {/* Custom configuration (Rendered directly, avoiding nested border card!) */}
          <QuizConfig onStartQuiz={(filters) => startQuiz("custom", filters)} />

        </div>

      </div>
    </div>
  );
}
