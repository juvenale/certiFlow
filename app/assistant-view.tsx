"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, CornerDownLeft, Lightbulb, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; text: string };

function getAnswer(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("siem") || p.includes("soar"))
    return "SIEM (Security Information and Event Management) collecte et corrèle les logs. SOAR (Security Orchestration, Automation and Response) automatise la réponse avec des playbooks. Piège classique: SIEM alerte, SOAR orchestre.";
  if (p.includes("ids") || p.includes("ips"))
    return "IDS (Intrusion Detection System) détecte et alerte. IPS (Intrusion Prevention System) est placé inline et peut bloquer. Si la question dit prévention ou blocage automatique → IPS.";
  if (p.includes("mfa") || p.includes("iam"))
    return "IAM (Identity and Access Management) gère identités, authentification et autorisation. MFA ajoute plusieurs facteurs pour réduire l'impact d'un mot de passe compromis.";
  if (p.includes("vpn") || p.includes("ssl") || p.includes("tls"))
    return "TLS est le protocole sous-jacent du HTTPS et des VPN modernes. SSL est obsolète depuis 2015. IPSec VPN opère au niveau réseau (L3), SSL/TLS VPN au niveau application (L7).";
  if (p.includes("zero trust") || p.includes("zéro trust"))
    return "Zero Trust = 'ne jamais faire confiance, toujours vérifier'. Chaque accès est authentifié et autorisé indépendamment du réseau. Pas de périmètre de confiance implicite.";
  if (p.includes("rsa") || p.includes("aes") || p.includes("ecc") || p.includes("crypto") || p.includes("chiffrement") || p.includes("symétrique") || p.includes("asymétrique"))
    return "AES = symétrique (rapide, pour les données). RSA = asymétrique (lent, pour l'échange de clé). ECC offre la même sécurité que RSA avec des clés plus courtes. En pratique: RSA échange la clé, AES chiffre les données.";
  if (p.includes("incident") || p.includes("ir ") || p.includes("response"))
    return "Phases IR Security+: Préparation → Identification → Containment → Éradication → Récupération → Post-incident. Le containment vient AVANT l'éradication — isoler avant de nettoyer.";
  if (p.includes("pentest") || p.includes("vulnérabilité") || p.includes("vuln") || p.includes("cvss") || p.includes("cve"))
    return "Vuln scan = passif, identifie les failles. Pentest = actif, exploite les failles. CVE = identifiant de vulnérabilité. CVSS = score 0–10. Prioritisez score CVSS + exploitabilité réelle.";
  if (p.includes("dns") || p.includes("dhcp"))
    return "DNS résout les noms en IP (port 53). DHCP assigne les IP dynamiquement (ports 67/68). DNS poisoning = fausse entrée dans le cache. DNSSEC authentifie les réponses DNS.";
  if (p.includes("sso") || p.includes("fédération") || p.includes("saml") || p.includes("oauth"))
    return "SSO (Single Sign-On) permet une authentification unique pour plusieurs services. SAML = fédération entre organisations (XML-based). OAuth = autorisation d'accès à des ressources (pas authentification). OpenID Connect = OAuth + authentification.";
  if (p.includes("dlp") || p.includes("data loss"))
    return "DLP (Data Loss Prevention) surveille et bloque l'exfiltration de données sensibles. Peut être basé sur le réseau, les endpoints, ou le cloud. Classifie les données en amont pour être efficace.";
  if (p.includes("hsm") || p.includes("tpm") || p.includes("secure enclave"))
    return "HSM (Hardware Security Module) = module matériel dédié à la gestion des clés cryptographiques (niveau entreprise). TPM = puce intégrée à la carte mère pour sécuriser le boot et les clés locales. Secure Enclave = zone isolée dans le CPU (iOS, Apple Silicon).";
  return "Identifie le concept clé, repère le contrôle attendu, puis élimine les options trop larges ou trop tardives. Security+ demande la meilleure réponse opérationnelle, pas juste une réponse possible.";
}

const quickPrompts = [
  { category: "Détection & Réponse", items: ["SIEM vs SOAR", "IDS vs IPS", "Phases Incident Response"] },
  { category: "Identité & Accès",     items: ["MFA vs IAM", "SSO et fédération SAML", "Zero Trust"] },
  { category: "Cryptographie",        items: ["RSA vs AES vs ECC", "Chiffrement symétrique vs asymétrique", "HSM vs TPM"] },
  { category: "Réseau & Protocoles",  items: ["SSL vs TLS vs VPN", "DNS vs DHCP", "CVE et CVSS"] },
];

export function AssistantView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text?: string) {
    const prompt = (text ?? input).trim();
    if (!prompt) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: prompt },
      { role: "assistant", text: getAnswer(prompt) },
    ]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-card border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-black">Assistant de révision Security+</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Posez vos questions sur les concepts Security+. Réponses instantanées ciblées examen.
            </p>
          </div>
        </div>
      </div>

      {/* Quick prompts */}
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-bold">Questions fréquentes</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickPrompts.map(({ category, items }) => (
            <div key={category}>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((p) => (
                  <button key={p} type="button" onClick={() => send(p)}
                    className="rounded-btn border border-border bg-muted px-2.5 py-1 text-xs font-semibold transition hover:border-primary hover:text-primary">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation */}
      {messages.length > 0 && (
        <div className="rounded-card border border-border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-bold">Conversation</p>
            <button type="button" onClick={() => setMessages([])}
              className="text-xs font-bold text-muted-foreground transition hover:text-red-500">
              Effacer
            </button>
          </div>
          <div className="max-h-[28rem] overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  msg.role === "user" ? "bg-primary" : "bg-muted border border-border"
                )}>
                  {msg.role === "user"
                    ? <span className="text-[10px] font-black text-primary-foreground">Q</span>
                    : <Bot className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
                <div className={cn(
                  "max-w-[85%] rounded-card px-3.5 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted text-foreground"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      )}

      {/* Input */}
      <div className="rounded-card border border-border bg-card p-4 shadow-sm">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: quelle est la différence entre SIEM et SOAR ?"
          rows={3}
          className="w-full resize-none rounded-card border border-border bg-muted p-3 text-sm outline-none transition focus:border-primary"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <CornerDownLeft className="h-3 w-3" /> Ctrl+Entrée pour envoyer
          </span>
          <button type="button" onClick={() => send()} disabled={!input.trim()}
            className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-40">
            <Send className="h-3.5 w-3.5" /> Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
