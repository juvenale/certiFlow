"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

const scenarios: Record<string, (cmd: string) => TerminalLine[]> = {
  "reverse-shell": (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(" ");
    const primary = args[0];

    switch (primary) {
      case "help":
        return [
          { text: "Commandes :", type: "output" },
          { text: "  clear    - Effacer l'ecran", type: "output" },
          { text: "  ifconfig - Config reseau", type: "output" },
          { text: "  netstat  - Connexions actives", type: "output" },
          { text: "  nmap     - Scan ports", type: "output" },
          { text: "  iptables - Regles firewall", type: "output" },
          { text: "  whois    - Resolution DNS inverse", type: "output" },
        ];
      case "clear":
        return [{ text: "__CLEAR__", type: "output" }];
      case "ifconfig":
        return [
          { text: "eth0: <UP,BROADCAST,RUNNING> mtu 1500", type: "output" },
          { text: "  inet 192.168.1.45 netmask 255.255.255.0", type: "output" },
          { text: "  ether 00:0c:29:3e:5b:21", type: "output" },
        ];
      case "netstat":
        return [
          { text: "Proto  Adresse locale       Adresse externe      Etat        PID", type: "output" },
          { text: "TCP    0.0.0.0:80           0.0.0.0:0             LISTENING   1024 (nginx)", type: "output" },
          { text: "TCP    192.168.1.45:4444    203.0.113.5:80        ESTABLISHED 4112 (unknown.sh)", type: "error" },
          { text: "TCP    0.0.0.0:22           0.0.0.0:0             LISTENING   845 (sshd)", type: "output" },
        ];
      case "nmap":
        return [
          { text: "Starting Nmap scan on 192.168.1.45", type: "output" },
          { text: "PORT     STATE   SERVICE", type: "output" },
          { text: "22/tcp   open    ssh", type: "output" },
          { text: "80/tcp   open    http", type: "output" },
          { text: "4444/tcp open    Reverse Shell suspect", type: "error" },
        ];
      case "iptables":
        return [
          { text: "Chain INPUT (policy ACCEPT)", type: "output" },
          { text: "ACCEPT tcp -- anywhere anywhere tcp dpt:http", type: "output" },
          { text: "ACCEPT tcp -- anywhere anywhere tcp dpt:ssh", type: "output" },
          { text: "Aucune regle DROP pour ports non-standards.", type: "error" },
        ];
      case "whois":
        return [
          { text: "203.0.113.5 -> known-malicious-c2.example.com", type: "error" },
          { text: "IP associee a des campagnes de phishing recentes.", type: "error" },
        ];
      default:
        return [{ text: `bash: ${primary}: commande introuvable. Tapez "help".`, type: "error" }];
    }
  },
};

export function InteractiveTerminal({ scenario, onComplete }: { scenario?: string; onComplete?: () => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Security+ Lab Environment [v7.01]", type: "output" },
    { text: 'Tapez "help" pour les commandes disponibles.', type: "output" },
    { text: "Scenario: Une alerte SIEM signale du trafic suspect. Investiguez.", type: "success" },
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const handler = scenarios[scenario || "reverse-shell"] || scenarios["reverse-shell"];

  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function execute(cmd: string) {
    const results = handler(cmd);
    if (results.length === 1 && results[0].text === "__CLEAR__") {
      setHistory([]);
      return;
    }
    setHistory((prev) => [...prev, { text: `root@lab:~# ${cmd}`, type: "input" }, ...results]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    execute(input);
    setInput("");
  }

  return (
    <div className="w-full rounded-card border border-[#1a2833] bg-[#0a0f14] font-mono text-sm shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between bg-[#0d1419] px-4 py-2 border-b border-[#1a2833]">
        <div className="flex items-center gap-2 text-[#8ba0b0]">
          <Terminal className="h-4 w-4 text-success" />
          <span>sec-incident-response.sh</span>
        </div>
        <button onClick={() => setHistory([])} className="text-[#6b8090] hover:text-[#b8c8d4] transition" title="Reset">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-1 select-text">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            line.type === "input" ? "text-[#e0e8f0] font-bold" :
            line.type === "error" ? "text-danger-fg" :
            line.type === "success" ? "text-success-fg font-semibold" :
            "text-success/90"
          }`}>{line.text}</div>
        ))}
        <div ref={terminalRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex bg-[#0d1419]/50 border-t border-[#1a2833] px-4 py-3">
        <span className="text-success mr-2 font-bold">root@lab:~#</span>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-[#e0e8f0] focus:outline-none caret-success"
          placeholder="commande..." autoFocus />
      </form>
    </div>
  );
}