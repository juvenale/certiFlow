export const examDate = "2026-05-25T09:00:00";

export const domains = [
  { id: "d1", name: "General Security Concepts", weight: 12, progress: 72 },
  { id: "d2", name: "Threats, Vulnerabilities, and Mitigations", weight: 22, progress: 58 },
  { id: "d3", name: "Security Architecture", weight: 18, progress: 64 },
  { id: "d4", name: "Security Operations", weight: 28, progress: 51 },
  { id: "d5", name: "Security Program Management and Oversight", weight: 20, progress: 47 }
];

export const lessons = [
  {
    domain: "General Security Concepts",
    title: "CIA Triad",
    definition: "Confidentialité, intégrité et disponibilité (Confidentiality, Integrity, Availability).",
    example: "Chiffrer un dossier médical protège la confidentialité; une signature numérique protège l'intégrité.",
    exam: "Security+ teste souvent la capacité à choisir quel pilier CIA est touché dans un scénario.",
    traps: "Ne confonds pas disponibilité avec intégrité: un système en panne reste parfois intact, mais indisponible.",
    check: "Une base modifiée sans autorisation touche quel pilier ?"
  },
  {
    domain: "General Security Concepts",
    title: "Least Privilege",
    definition: "Donner uniquement les droits nécessaires à une tâche.",
    example: "Un stagiaire lit les tickets, mais ne peut pas supprimer des comptes.",
    exam: "Très fréquent dans IAM, Zero Trust, RBAC et séparation des tâches.",
    traps: "Ce n'est pas la même chose que deny by default, même si les deux se complètent.",
    check: "Pourquoi un admin devrait-il utiliser un compte standard pour lire ses emails ?"
  },
  {
    domain: "Threats, Vulnerabilities, and Mitigations",
    title: "Phishing",
    definition: "Manipulation visant à obtenir identifiants, argent ou action dangereuse.",
    example: "Un faux email Microsoft 365 demande une reconnexion urgente.",
    exam: "Les scénarios demandent souvent la meilleure mesure: formation, MFA, filtrage, signalement.",
    traps: "Le spear phishing cible une personne précise; le whaling cible des dirigeants.",
    check: "Quelle mesure limite l'impact si le mot de passe est volé ?"
  },
  {
    domain: "Security Architecture",
    title: "Defense in Depth",
    definition: "Superposer plusieurs contrôles pour réduire le risque global.",
    example: "MFA, segmentation, EDR, filtrage email et sauvegardes immuables contre ransomware.",
    exam: "On te demandera souvent une combinaison de contrôles, pas un outil magique.",
    traps: "Plusieurs contrôles identiques ne font pas une défense en profondeur efficace.",
    check: "Quel contrôle compense l'échec d'un mot de passe ?"
  },
  {
    domain: "Security Operations",
    title: "SIEM",
    definition: "Security Information and Event Management: collecte, corrèle et analyse les logs.",
    example: "Corrélation entre échecs de connexion, géolocalisation inhabituelle et élévation de privilèges.",
    exam: "Security+ vérifie si tu sais choisir SIEM, SOAR, IDS, IPS ou EDR selon le besoin.",
    traps: "Un SIEM n'est pas forcément un outil de réponse automatique: c'est plutôt SOAR.",
    check: "Quel outil orchestre des actions automatiques après une alerte ?"
  },
  {
    domain: "Security Program Management and Oversight",
    title: "Risk Management",
    definition: "Identifier, évaluer, traiter et surveiller les risques.",
    example: "Accepter, transférer, atténuer ou éviter un risque selon coût et impact.",
    exam: "Les questions aiment les choix entre mitigation, acceptance, avoidance et transference.",
    traps: "Acheter une assurance transfère une partie du risque, mais ne supprime pas la menace.",
    check: "Installer un WAF correspond à quelle stratégie de traitement du risque ?"
  }
];

import { seidlQuestions } from "./seidl-questions";
import { chappleQuestions } from "./chapple-questions";
export type { QuizQuestion } from "./seidl-questions";

export const questions = [...seidlQuestions, ...chappleQuestions];

export const demoQuestions = [
  {
    id: "q1",
    domain: "Security Operations",
    difficulty: "Moyen",
    scenario: "Tu es analyste SOC. Plusieurs connexions échouées sont suivies d'une connexion réussie depuis un pays inhabituel.",
    question: "Quelle action dois-tu prioriser ?",
    choices: [
      "Supprimer immédiatement le compte utilisateur",
      "Réinitialiser le mot de passe et examiner les journaux d'authentification",
      "Désactiver le pare-feu temporairement",
      "Lancer un scan antivirus sur tous les serveurs"
    ],
    answer: 1,
    explanation: "Le scénario indique une possible compromission de compte. Il faut contenir le risque, vérifier les logs et suivre la procédure de réponse à incident.",
    wrong: "Supprimer le compte peut détruire des preuves. Le pare-feu n'est pas la cause directe. Un scan antivirus global est moins prioritaire.",
    keywords: ["account compromise", "authentication logs", "incident response"]
  },
  {
    id: "q2",
    domain: "General Security Concepts",
    difficulty: "Facile",
    scenario: "Une équipe veut limiter l'impact d'un compte compromis.",
    question: "Quel principe doit guider l'attribution des permissions ?",
    choices: ["Open access", "Least Privilege", "Non-repudiation", "Obfuscation"],
    answer: 1,
    explanation: "Le principe du moindre privilège limite chaque utilisateur aux droits nécessaires.",
    wrong: "Non-repudiation concerne la preuve d'action. Obfuscation cache la complexité, mais ne remplace pas le contrôle d'accès.",
    keywords: ["least privilege", "authorization", "access control"]
  },
  {
    id: "q3",
    domain: "Security Architecture",
    difficulty: "Difficile",
    scenario: "Une application web publique subit des tentatives d'injection SQL et de cross-site scripting.",
    question: "Quel contrôle est le plus adapté en frontal pour réduire ces attaques ?",
    choices: ["WAF", "NTP", "RADIUS", "DLP"],
    answer: 0,
    explanation: "Un Web Application Firewall filtre les requêtes HTTP malveillantes ciblant les applications web.",
    wrong: "NTP synchronise l'heure. RADIUS centralise l'authentification réseau. DLP limite les fuites de données.",
    keywords: ["WAF", "SQL injection", "XSS"]
  },
  {
    id: "q4",
    domain: "Threats, Vulnerabilities, and Mitigations",
    difficulty: "Moyen",
    scenario: "Un employé reçoit un email personnalisé mentionnant son manager et un projet interne.",
    question: "Quel type d'attaque est le plus probable ?",
    choices: ["Smishing", "Spear phishing", "Watering hole", "Tailgating"],
    answer: 1,
    explanation: "Le spear phishing est une attaque de phishing ciblée avec des détails personnalisés.",
    wrong: "Smishing utilise SMS. Watering hole compromet un site fréquenté par la cible. Tailgating est physique.",
    keywords: ["spear phishing", "social engineering"]
  },
  {
    id: "q5",
    domain: "Security Program Management and Oversight",
    difficulty: "Moyen",
    scenario: "Une entreprise souscrit une cyber-assurance pour couvrir une partie des pertes potentielles.",
    question: "Quelle stratégie de traitement du risque est utilisée ?",
    choices: ["Risk avoidance", "Risk transfer", "Risk acceptance", "Risk rejection"],
    answer: 1,
    explanation: "L'assurance transfère une partie de l'impact financier à un tiers.",
    wrong: "Avoidance élimine l'activité risquée. Acceptance garde le risque. Risk rejection n'est pas un choix standard.",
    keywords: ["risk transfer", "insurance"]
  },
  {
    id: "q6",
    domain: "Security Operations",
    difficulty: "Difficile",
    scenario: "Un playbook doit isoler automatiquement un poste après détection EDR confirmée.",
    question: "Quel outil automatise le mieux cette orchestration ?",
    choices: ["SIEM", "SOAR", "NAC passif", "Syslog"],
    answer: 1,
    explanation: "SOAR orchestre et automatise des réponses selon des playbooks.",
    wrong: "SIEM corrèle et alerte. Syslog transporte des logs. NAC peut contrôler l'accès, mais n'est pas l'outil d'orchestration.",
    keywords: ["SOAR", "playbook", "automation"]
  }
];

export const flashcards = [
  { term: "SIEM", fr: "Gestion des informations et événements de sécurité", definition: "Collecte et corrèle les logs pour détecter des incidents.", domain: "Security Operations", importance: "Haute" },
  { term: "MFA", fr: "Authentification multifacteur", definition: "Utilise plusieurs facteurs: connaissance, possession, inhérence.", domain: "General Security Concepts", importance: "Haute" },
  { term: "EDR", fr: "Détection et réponse sur endpoint", definition: "Surveille les postes et aide à contenir les menaces.", domain: "Security Operations", importance: "Haute" },
  { term: "PKI", fr: "Infrastructure à clés publiques", definition: "Gère certificats, autorités de certification et confiance cryptographique.", domain: "Security Architecture", importance: "Moyenne" },
  { term: "RTO", fr: "Objectif de temps de reprise", definition: "Durée maximale acceptable avant restauration d'un service.", domain: "Security Program Management and Oversight", importance: "Haute" }
];

export const protocols = [
  ["FTP", "20/21 TCP", "Transfert de fichiers", "Non chiffré; préférer SFTP/FTPS"],
  ["SSH", "22 TCP", "Administration distante sécurisée", "Protéger les clés et désactiver les mots de passe faibles"],
  ["DNS", "53 TCP/UDP", "Résolution de noms", "Risque d'empoisonnement DNS; surveiller les requêtes"],
  ["HTTP", "80 TCP", "Web non chiffré", "Préférer HTTPS"],
  ["HTTPS", "443 TCP", "Web chiffré", "Vérifier certificats et versions TLS"],
  ["SMB", "445 TCP", "Partage Windows", "Limiter l'exposition et patcher rapidement"],
  ["RDP", "3389 TCP/UDP", "Bureau à distance", "MFA, VPN, verrouillage et surveillance"]
];

export const commands = [
  ["ping", "Tester la connectivité IP", "ping 8.8.8.8"],
  ["ipconfig", "Voir la configuration réseau Windows", "ipconfig /all"],
  ["nslookup", "Interroger DNS", "nslookup example.com"],
  ["netstat", "Lister connexions et ports", "netstat -ano"],
  ["nmap", "Découvrir hôtes et services", "nmap -sV 10.0.0.5"],
  ["tcpdump", "Capturer du trafic", "tcpdump -i eth0 port 53"],
  ["chmod", "Modifier permissions Linux", "chmod 640 secrets.txt"]
];

export const pbqItems = [
  { risk: "Vol d'identifiants", answer: "MFA", options: ["MFA", "NTP", "DLP", "RAID"] },
  { risk: "Injection SQL", answer: "WAF", options: ["WAF", "SNMP", "RDP", "DHCP"] },
  { risk: "Fuite de données sensibles", answer: "DLP", options: ["DLP", "NAT", "Telnet", "ARP"] },
  { risk: "Propagation latérale", answer: "Segmentation", options: ["Segmentation", "POP3", "Hashing", "NTP"] }
];
