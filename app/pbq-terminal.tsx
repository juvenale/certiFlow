"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountdownTimer, ScoringDisplay, Badge, ActionButton, GhostButton, usePBQPersist } from "./pbq-shared";
import type { TerminalPBQ } from "@/data/pbq";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

export function InteractiveTerminal({ exercise, onReset }: { exercise: TerminalPBQ; onReset: () => void }) {
  const persist = usePBQPersist(exercise.id);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>(() => [
    { text: "Security+ Lab Environment [v7.01]", type: "output" },
    { text: 'Tapez "help" pour les commandes disponibles.', type: "output" },
    { text: "Scénario : Une alerte SIEM signale du trafic suspect. Investiguez avec le terminal.", type: "success" },
  ]);
  const [isBlocked, setIsBlocked] = useState(false);

  // Grading milestones
  const [reconCompleted, setReconCompleted] = useState(false);
  const [investigateCompleted, setInvestigateCompleted] = useState(false);
  const [inspectCompleted, setInspectCompleted] = useState(false);
  const [blockCompleted, setBlockCompleted] = useState(false);

  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [answerDetails, setAnswerDetails] = useState<{ label: string; userAnswer: string; correct: string; isCorrect: boolean }[]>([]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto scroll within the terminal body container
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["help", "clear", "ifconfig", "netstat", "nmap", "iptables", "whois"];
      const currentInput = input.trim();
      if (!currentInput) return;
      const match = commands.find(c => c.startsWith(currentInput));
      if (match) {
        setInput(match);
      }
    }
  }

  function execute(cmd: string) {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(" ");
    const primary = args[0];

    let outputLines: TerminalLine[] = [];

    switch (primary) {
      case "help":
        outputLines = [
          { text: "Commandes :", type: "output" },
          { text: "  clear               - Effacer l'écran", type: "output" },
          { text: "  ifconfig            - Configuration réseau", type: "output" },
          { text: "  netstat             - Connexions actives", type: "output" },
          { text: "  nmap                - Scan de ports", type: "output" },
          { text: "  iptables            - Règles du pare-feu", type: "output" },
          { text: "  whois <ip>          - Résolution DNS inverse et renseignements", type: "output" },
          { text: "  iptables block 4444 - Bloquer un port réseau suspect", type: "output" },
        ];
        break;

      case "clear":
        setHistory([]);
        return;

      case "ifconfig":
        outputLines = [
          { text: "eth0: <UP,BROADCAST,RUNNING> mtu 1500", type: "output" },
          { text: "  inet 192.168.1.45 netmask 255.255.255.0", type: "output" },
          { text: "  ether 00:0c:29:3e:5b:21", type: "output" },
        ];
        break;

      case "netstat":
        setReconCompleted(true);
        if (!isBlocked) {
          outputLines = [
            { text: "Proto  Adresse locale       Adresse externe      Etat        PID", type: "output" },
            { text: "TCP    0.0.0.0:80           0.0.0.0:0             LISTENING   1024 (nginx)", type: "output" },
            { text: "TCP    192.168.1.45:4444    203.0.113.5:80        ESTABLISHED 4112 (unknown.sh)", type: "error" },
            { text: "TCP    0.0.0.0:22           0.0.0.0:0             LISTENING   845 (sshd)", type: "output" },
          ];
        } else {
          outputLines = [
            { text: "Proto  Adresse locale       Adresse externe      Etat        PID", type: "output" },
            { text: "TCP    0.0.0.0:80           0.0.0.0:0             LISTENING   1024 (nginx)", type: "output" },
            { text: "TCP    192.168.1.45:4444    203.0.113.5:80        CLOSED      -", type: "success" },
            { text: "TCP    0.0.0.0:22           0.0.0.0:0             LISTENING   845 (sshd)", type: "output" },
          ];
        }
        break;

      case "nmap":
        setReconCompleted(true);
        if (!isBlocked) {
          outputLines = [
            { text: "Starting Nmap scan on 192.168.1.45", type: "output" },
            { text: "PORT     STATE   SERVICE", type: "output" },
            { text: "22/tcp   open    ssh", type: "output" },
            { text: "80/tcp   open    http", type: "output" },
            { text: "4444/tcp open    Reverse Shell suspect", type: "error" },
          ];
        } else {
          outputLines = [
            { text: "Starting Nmap scan on 192.168.1.45", type: "output" },
            { text: "PORT     STATE   SERVICE", type: "output" },
            { text: "22/tcp   open    ssh", type: "output" },
            { text: "80/tcp   open    http", type: "output" },
            { text: "4444/tcp closed  Reverse Shell suspect", type: "success" },
          ];
        }
        break;

      case "iptables":
        setInspectCompleted(true);
        if (trimmed.includes("block") || trimmed.includes("drop") || trimmed.includes("deny")) {
          if (trimmed.includes("4444")) {
            setBlockCompleted(true);
            setIsBlocked(true);
            outputLines = [
              { text: "[SUCCESS] Règle de pare-feu ajoutée avec succès : DROP tcp dpt:4444", type: "success" },
              { text: "La connexion suspecte vers 203.0.113.5:80 a été coupée.", type: "success" },
            ];
          } else {
            outputLines = [
              { text: "Usage: iptables block 4444", type: "error" },
            ];
          }
        } else {
          if (!isBlocked) {
            outputLines = [
              { text: "Chain INPUT (policy ACCEPT)", type: "output" },
              { text: "ACCEPT tcp -- anywhere anywhere tcp dpt:http", type: "output" },
              { text: "ACCEPT tcp -- anywhere anywhere tcp dpt:ssh", type: "output" },
              { text: "Aucune règle DROP pour les ports non-standards.", type: "error" },
            ];
          } else {
            outputLines = [
              { text: "Chain INPUT (policy ACCEPT)", type: "output" },
              { text: "DROP  tcp -- anywhere anywhere tcp dpt:4444", type: "success" },
              { text: "ACCEPT tcp -- anywhere anywhere tcp dpt:http", type: "output" },
              { text: "ACCEPT tcp -- anywhere anywhere tcp dpt:ssh", type: "output" },
            ];
          }
        }
        break;

      case "whois":
        setInvestigateCompleted(true);
        if (args[1] === "203.0.113.5" || args[1] === "known-malicious-c2.example.com") {
          outputLines = [
            { text: "203.0.113.5 -> known-malicious-c2.example.com", type: "error" },
            { text: "Enregistrement de sécurité : Domaine de commande et de contrôle (C2) suspect.", type: "error" },
            { text: "IP associée à des campagnes de phishing récentes.", type: "error" },
          ];
        } else {
          outputLines = [
            { text: "Usage: whois 203.0.113.5", type: "error" },
          ];
        }
        break;

      case "block":
        if (args[1] === "4444") {
          setBlockCompleted(true);
          setIsBlocked(true);
          outputLines = [
            { text: "[SUCCESS] Fermeture du port 4444", type: "success" },
            { text: "Trafic coupé vers 203.0.113.5:80.", type: "success" },
          ];
        } else {
          outputLines = [
            { text: "Usage: block 4444", type: "error" },
          ];
        }
        break;

      default:
        // Check for quick remediation shortcut
        if (trimmed.includes("block 4444") || trimmed.includes("dport 4444")) {
          setBlockCompleted(true);
          setIsBlocked(true);
          outputLines = [
            { text: "[SUCCESS] Règle de pare-feu configurée pour bloquer le port 4444.", type: "success" },
            { text: "La session SSH/Reverse Shell malveillante a été coupée.", type: "success" },
          ];
        } else {
          outputLines = [{ text: `bash: ${primary}: commande introuvable. Tapez "help".`, type: "error" }];
        }
    }

    setHistory((prev) => [...prev, { text: `root@lab:~# ${cmd}`, type: "input" }, ...outputLines]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || submitted) return;
    execute(input);
    setInput("");
  }

  function grade() {
    const fb: string[] = [];
    const details: { label: string; userAnswer: string; correct: string; isCorrect: boolean }[] = [];
    let total = 0;

    // Milestone 1: Reconnaissance
    details.push({
      label: "Reconnaissance (netstat ou nmap exécutés)",
      userAnswer: reconCompleted ? "Réussie" : "Non tentée",
      correct: "Réussie",
      isCorrect: reconCompleted,
    });
    if (reconCompleted) {
      total += 25;
      fb.push("Détection du port suspect 4444 : +25 pts");
    } else {
      fb.push("Détection du port suspect 4444 : Manquée (utilisez netstat ou nmap)");
    }

    // Milestone 2: Investigation
    details.push({
      label: "Investigation (whois sur l'IP malveillante)",
      userAnswer: investigateCompleted ? "Réussie" : "Non tentée",
      correct: "Réussie",
      isCorrect: investigateCompleted,
    });
    if (investigateCompleted) {
      total += 25;
      fb.push("Enquête sur l'IP malveillante 203.0.113.5 : +25 pts");
    } else {
      fb.push("Enquête sur l'IP malveillante 203.0.113.5 : Manquée (utilisez whois)");
    }

    // Milestone 3: Inspection pare-feu
    details.push({
      label: "Inspection du pare-feu (iptables exécuté)",
      userAnswer: inspectCompleted ? "Réussie" : "Non tentée",
      correct: "Réussie",
      isCorrect: inspectCompleted,
    });
    if (inspectCompleted) {
      total += 25;
      fb.push("Inspection des règles iptables existantes : +25 pts");
    } else {
      fb.push("Inspection des règles iptables existantes : Manquée (utilisez iptables)");
    }

    // Milestone 4: Remédiation
    details.push({
      label: "Remédiation (blocage du port 4444)",
      userAnswer: blockCompleted ? "Réussie" : "Non tentée",
      correct: "Réussie",
      isCorrect: blockCompleted,
    });
    if (blockCompleted) {
      total += 25;
      fb.push("Blocage du port 4444 et containment de la menace : +25 pts");
    } else {
      fb.push("Blocage du port 4444 et containment de la menace : Manquée (utilisez block 4444)");
    }

    setScore(total);
    setFeedback(fb);
    setAnswerDetails(details);
    setSubmitted(true);
  }

  function reset() {
    onReset();
  }

  return (
    <div className="space-y-4">
      {/* Timer or Complete indicator */}
      <CountdownTimer seconds={exercise.timeLimitSeconds} onExpire={grade} incompleteCount={submitted ? 0 : 1} />

      {/* Role and Scenario Card */}
      <div className="rounded-card border border-border bg-muted p-4 shadow-sm">
        <p className="font-black text-sm uppercase tracking-wider text-primary">Rôle : {exercise.role}</p>
        <p className="mt-1 text-sm text-foreground">{exercise.scenario}</p>
        <div className="mt-3">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Objectifs requis :</p>
          <ul className="mt-1 space-y-1">
            {exercise.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Terminal Sandbox */}
      <div className="w-full rounded-card border border-[#1a2833] bg-[#05080c] crt-terminal font-mono text-sm shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between bg-[#0d1419] px-4 py-2 border-b border-[#1a2833] z-20 relative">
          <div className="flex items-center gap-2 text-[#8ba0b0]">
            <Terminal className="h-4 w-4 text-green-500 animate-pulse" />
            <span className="font-bold tracking-tight">sec-incident-response.sh (Terminal Interactif)</span>
          </div>
          <button
            onClick={() => {
              setIsBlocked(false);
              setReconCompleted(false);
              setInvestigateCompleted(false);
              setInspectCompleted(false);
              setBlockCompleted(false);
              setHistory([
                { text: "Terminal réinitialisé.", type: "success" },
                { text: 'Tapez "help" pour les commandes disponibles.', type: "output" },
              ]);
            }}
            className="text-[#6b8090] hover:text-[#b8c8d4] transition"
            title="Reset history"
            disabled={submitted}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div ref={terminalBodyRef} className="h-[450px] overflow-y-auto p-4 space-y-1 select-text z-20 relative scrollbar-thin">
          {history.map((line, i) => (
            <div
              key={i}
              className={cn(
                "whitespace-pre-wrap transition-colors duration-150",
                line.type === "input" && "crt-text-green font-bold",
                line.type === "error" && "crt-text-red font-semibold",
                line.type === "success" && "crt-text-green font-bold",
                line.type === "output" && "crt-text-blue"
              )}
            >
              {line.type === "input" && <span className="text-green-500/70 mr-1.5 select-none">root@lab:~#</span>}
              {line.text}
            </div>
          ))}
        </div>

        {/* Shortcut Commands (tactile toolbar for mobile/tablets) */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0d1419]/90 px-4 py-2 border-t border-[#1a2833] select-none z-20 relative">
          <span className="text-[10px] text-[#6b8090] uppercase tracking-wider mr-1">Raccourcis tactiles :</span>
          {["help", "netstat", "nmap", "iptables", "whois", "block 4444"].map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => {
                if (submitted) return;
                if (cmd === "block 4444") {
                  setInput("iptables block 4444");
                } else {
                  setInput(cmd);
                }
              }}
              className="px-2 py-0.5 rounded bg-[#1a2833] hover:bg-[#253949] text-xs font-semibold text-[#b8c8d4] hover:text-white transition-all font-mono active:scale-95"
            >
              {cmd}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex bg-[#0d1419]/50 border-t border-[#1a2833] px-4 py-3 z-20 relative">
          <span className="text-green-500 mr-2 font-bold select-none">root@lab:~#</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={submitted}
            className="flex-1 bg-transparent text-[#e0e8f0] focus:outline-none caret-green-500 crt-text-green font-bold"
            placeholder={submitted ? "Exercice corrigé. Retournez à la liste." : "Saisissez votre commande (Tab pour compléter)..."}
            autoFocus
          />
        </form>
      </div>

      {/* Action buttons and results */}
      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted && (
          <ActionButton onClick={grade}>
            {"Corriger l'exercice"}
          </ActionButton>
        )}
        {submitted && (
          <ScoringDisplay
            score={score}
            max={exercise.scoring.max}
            feedback={feedback}
            correctAnswers={answerDetails}
          />
        )}
        <GhostButton onClick={reset}>
          Retourner aux PBQ
        </GhostButton>
      </div>
    </div>
  );
}