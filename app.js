const examDate = new Date("2026-05-25T09:00:00");

const domains = [
  { id: "d1", name: "General Security Concepts", weight: 12, progress: 72 },
  { id: "d2", name: "Threats, Vulnerabilities, and Mitigations", weight: 22, progress: 58 },
  { id: "d3", name: "Security Architecture", weight: 18, progress: 64 },
  { id: "d4", name: "Security Operations", weight: 28, progress: 51 },
  { id: "d5", name: "Security Program Management and Oversight", weight: 20, progress: 47 }
];

const lessons = [
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

const questions = [
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

const flashcards = [
  { term: "SIEM", fr: "Gestion des informations et événements de sécurité", definition: "Collecte et corrèle les logs pour détecter des incidents.", domain: "Security Operations", importance: "Haute" },
  { term: "MFA", fr: "Authentification multifacteur", definition: "Utilise plusieurs facteurs: connaissance, possession, inhérence.", domain: "General Security Concepts", importance: "Haute" },
  { term: "EDR", fr: "Détection et réponse sur endpoint", definition: "Surveille les postes et aide à contenir les menaces.", domain: "Security Operations", importance: "Haute" },
  { term: "PKI", fr: "Infrastructure à clés publiques", definition: "Gère certificats, autorités de certification et confiance cryptographique.", domain: "Security Architecture", importance: "Moyenne" },
  { term: "RTO", fr: "Objectif de temps de reprise", definition: "Durée maximale acceptable avant restauration d'un service.", domain: "Security Program Management and Oversight", importance: "Haute" }
];

const protocols = [
  ["FTP", "20/21 TCP", "Transfert de fichiers", "Non chiffré; préférer SFTP/FTPS"],
  ["SSH", "22 TCP", "Administration distante sécurisée", "Protéger les clés et désactiver les mots de passe faibles"],
  ["DNS", "53 TCP/UDP", "Résolution de noms", "Risque d'empoisonnement DNS; surveiller les requêtes"],
  ["HTTP", "80 TCP", "Web non chiffré", "Préférer HTTPS"],
  ["HTTPS", "443 TCP", "Web chiffré", "Vérifier certificats et versions TLS"],
  ["SMB", "445 TCP", "Partage Windows", "Limiter l'exposition et patcher rapidement"],
  ["RDP", "3389 TCP/UDP", "Bureau à distance", "MFA, VPN, verrouillage et surveillance"]
];

const commands = [
  ["ping", "Tester la connectivité IP", "ping 8.8.8.8"],
  ["ipconfig", "Voir la configuration réseau Windows", "ipconfig /all"],
  ["nslookup", "Interroger DNS", "nslookup example.com"],
  ["netstat", "Lister connexions et ports", "netstat -ano"],
  ["nmap", "Découvrir hôtes et services", "nmap -sV 10.0.0.5"],
  ["tcpdump", "Capturer du trafic", "tcpdump -i eth0 port 53"],
  ["chmod", "Modifier permissions Linux", "chmod 640 secrets.txt"]
];

const pbqItems = [
  { risk: "Vol d'identifiants", answer: "MFA", options: ["MFA", "NTP", "DLP", "RAID"] },
  { risk: "Injection SQL", answer: "WAF", options: ["WAF", "SNMP", "RDP", "DHCP"] },
  { risk: "Fuite de données sensibles", answer: "DLP", options: ["DLP", "NAT", "Telnet", "ARP"] },
  { risk: "Propagation latérale", answer: "Segmentation", options: ["Segmentation", "POP3", "Hashing", "NTP"] }
];

const state = {
  currentQuestion: 0,
  answered: Number(localStorage.getItem("answered") || 0),
  correct: Number(localStorage.getItem("correct") || 0),
  errors: JSON.parse(localStorage.getItem("errors") || "[]"),
  flashIndex: 0,
  flashBack: false,
  errorFilterDomain: "",
  assistantPrompt: "",
  assistantAnswer: ""
};

function saveProgress() {
  localStorage.setItem("answered", state.answered);
  localStorage.setItem("correct", state.correct);
  localStorage.setItem("errors", JSON.stringify(state.errors));
}

function daysUntilExam() {
  const now = new Date();
  const diff = examDate - now;
  return Math.max(0, Math.ceil(diff / 86400000));
}

function scorePercent() {
  return state.answered ? Math.round((state.correct / state.answered) * 100) : 0;
}

function setView(id) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === id));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === id));
  document.getElementById("pageTitle").textContent = document.querySelector(`[data-view="${id}"]`).textContent;
  renderAll();
}

function renderDashboard() {
  const avgProgress = Math.round(domains.reduce((sum, domain) => sum + domain.progress, 0) / domains.length);
  const weakest = [...domains].sort((a, b) => a.progress - b.progress)[0];
  document.getElementById("dashboard").innerHTML = `
    <div class="grid stats">
      ${metric("Score moyen", `${scorePercent()}%`, "Objectif conseillé: 80%+")}
      ${metric("Progression", `${avgProgress}%`, "Cours et pratique")}
      ${metric("Questions", state.answered, "Réponses enregistrées")}
      ${metric("Domaine faible", weakest.name, "Priorité du jour")}
    </div>
    <div class="grid two" style="margin-top:16px">
      <div class="panel">
        <h2>Progression par domaine</h2>
        ${domains.map((domain) => `
          <div class="domain-row">
            <strong>${domain.name}</strong>
            <div class="progress" aria-label="${domain.progress}%"><span style="--value:${domain.progress}%"></span></div>
            <span>${domain.progress}%</span>
          </div>
        `).join("")}
      </div>
      <div class="panel">
        <h2>Prochain objectif recommandé</h2>
        <p>Travaille <strong>${weakest.name}</strong>, puis fais un quiz ciblé de 10 questions et ajoute les erreurs au journal.</p>
        <div class="button-row">
          <button class="primary-button" onclick="setView('quiz')">Lancer un quiz</button>
          <button class="ghost-button" onclick="setView('plan')">Voir le plan</button>
        </div>
      </div>
    </div>
  `;
}

function metric(label, value, note) {
  return `<div class="panel metric"><strong>${value}</strong><span>${label}</span><p class="muted">${note}</p></div>`;
}

function renderCourses() {
  document.getElementById("courses").innerHTML = `
    <div class="toolbar">${domains.map((domain) => `<span class="chip">${domain.name} (${domain.weight}%)</span>`).join("")}</div>
    <div class="grid three">
      ${lessons.map((lesson) => `
        <article class="card">
          <span class="chip">${lesson.domain}</span>
          <h2>${lesson.title}</h2>
          <p><strong>Définition:</strong> ${lesson.definition}</p>
          <p><strong>Exemple:</strong> ${lesson.example}</p>
          <p><strong>À l'examen:</strong> ${lesson.exam}</p>
          <p><strong>Piège:</strong> ${lesson.traps}</p>
          <p><strong>Mini-question:</strong> ${lesson.check}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderQuiz() {
  const q = questions[state.currentQuestion % questions.length];
  document.getElementById("quiz").innerHTML = `
    <div class="toolbar">
      <button class="mode-button" onclick="startQuiz('quick')">Quiz rapide</button>
      <button class="mode-button" onclick="startQuiz('weak')">Domaine faible</button>
      <button class="mode-button" onclick="startQuiz('errors')">Mode erreurs</button>
      <span class="chip">Score actuel: ${scorePercent()}%</span>
    </div>
    <div class="question-box">
      <div class="toolbar">
        <span class="chip">${q.domain}</span>
        <span class="chip">${q.difficulty}</span>
      </div>
      <p class="muted">${q.scenario}</p>
      <h2>${q.question}</h2>
      <div class="grid">
        ${q.choices.map((choice, index) => `<button class="choice" onclick="answerQuestion(${index})">${String.fromCharCode(65 + index)}. ${choice}</button>`).join("")}
      </div>
      <div id="quizFeedback"></div>
    </div>
  `;
}

function startQuiz(mode) {
  if (mode === "weak") {
    const weakest = [...domains].sort((a, b) => a.progress - b.progress)[0].name;
    const found = questions.findIndex((q) => q.domain === weakest);
    state.currentQuestion = found >= 0 ? found : 0;
  } else if (mode === "errors" && state.errors.length) {
    const found = questions.findIndex((q) => q.id === state.errors[0].questionId);
    state.currentQuestion = found >= 0 ? found : 0;
  } else {
    state.currentQuestion = Math.floor(Math.random() * questions.length);
  }
  renderQuiz();
}

function answerQuestion(index) {
  const q = questions[state.currentQuestion % questions.length];
  const correct = index === q.answer;
  state.answered += 1;
  if (correct) {
    state.correct += 1;
  } else {
    const existing = state.errors.find((item) => item.questionId === q.id);
    if (existing) {
      existing.count += 1;
      existing.status = "à revoir";
      existing.last = new Date().toLocaleDateString("fr-FR");
    } else {
      state.errors.push({
        questionId: q.id,
        question: q.question,
        chosen: q.choices[index],
        answer: q.choices[q.answer],
        domain: q.domain,
        concept: q.keywords[0],
        count: 1,
        status: "à revoir",
        last: new Date().toLocaleDateString("fr-FR")
      });
    }
  }
  saveProgress();

  document.querySelectorAll(".choice").forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
    if (i === index && !correct) button.classList.add("incorrect");
  });

  document.getElementById("quizFeedback").innerHTML = `
    <div class="answer-card">
      <h3>${correct ? "Correct" : "À revoir"}</h3>
      <p>${q.explanation}</p>
      <p><strong>Pourquoi les autres réponses sont mauvaises:</strong> ${q.wrong}</p>
      <p><strong>Mots-clés:</strong> ${q.keywords.join(", ")}</p>
      <button class="primary-button" onclick="nextQuestion()">Question suivante</button>
    </div>
  `;
}

function nextQuestion() {
  state.currentQuestion = (state.currentQuestion + 1) % questions.length;
  renderQuiz();
}

function renderPbq() {
  document.getElementById("pbq").innerHTML = `
    <div class="panel">
      <h2>PBQ: associer le meilleur contrôle au risque</h2>
      <p class="muted">Choisis le contrôle le plus direct pour chaque scénario. Le score partiel est accepté.</p>
      <div class="pbq-zone">
        ${pbqItems.map((item, index) => `
          <div class="pbq-item">
            <strong>${item.risk}</strong>
            <select class="select" id="pbq-${index}">
              <option value="">Choisir un contrôle</option>
              ${item.options.map((option) => `<option value="${option}">${option}</option>`).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="button-row" style="margin-top:16px">
        <button class="primary-button" onclick="gradePbq()">Corriger</button>
      </div>
      <div id="pbqFeedback"></div>
    </div>
  `;
}

function gradePbq() {
  let score = 0;
  const details = pbqItems.map((item, index) => {
    const value = document.getElementById(`pbq-${index}`).value;
    const ok = value === item.answer;
    if (ok) score += 1;
    return `${item.risk}: ${ok ? "correct" : `à revoir, réponse attendue ${item.answer}`}`;
  });
  document.getElementById("pbqFeedback").innerHTML = `<div class="answer-card"><h3>Score: ${score}/${pbqItems.length}</h3><p>${details.join("<br>")}</p></div>`;
}

function renderFlashcards() {
  const card = flashcards[state.flashIndex % flashcards.length];
  document.getElementById("flashcards").innerHTML = `
    <div class="flashcard panel">
      <button type="button" onclick="flipFlashcard()">
        ${state.flashBack ? `
          <h2>${card.term}</h2>
          <p><strong>${card.fr}</strong></p>
          <p>${card.definition}</p>
          <p class="muted">${card.domain} | Importance: ${card.importance}</p>
        ` : `
          <div class="flash-term">${card.term}</div>
          <p class="muted">Clique pour retourner la carte</p>
        `}
      </button>
    </div>
    <div class="button-row" style="margin-top:16px">
      <button class="ghost-button" onclick="prevFlashcard()">Précédente</button>
      <button class="primary-button" onclick="nextFlashcard()">Suivante</button>
    </div>
  `;
}

function flipFlashcard() {
  state.flashBack = !state.flashBack;
  renderFlashcards();
}

function nextFlashcard() {
  state.flashIndex = (state.flashIndex + 1) % flashcards.length;
  state.flashBack = false;
  renderFlashcards();
}

function prevFlashcard() {
  state.flashIndex = (state.flashIndex - 1 + flashcards.length) % flashcards.length;
  state.flashBack = false;
  renderFlashcards();
}

function renderPorts() {
  document.getElementById("ports").innerHTML = `
    <div class="grid two">
      <div class="panel">
        <h2>Ports et protocoles</h2>
        ${protocols.map(([name, port, role, risk]) => `
          <div class="protocol-row">
            <strong>${name}</strong><span>${port}</span><span>${role}</span><span class="muted">${risk}</span>
          </div>
        `).join("")}
      </div>
      <div class="panel">
        <h2>Commandes utiles</h2>
        ${commands.map(([name, role, example]) => `
          <div class="list-row">
            <strong>${name}</strong>
            <span>${role}</span>
            <code>${example}</code>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderExam() {
  document.getElementById("exam").innerHTML = `
    <div class="grid three">
      ${[
        ["Court", 30, "Diagnostic rapide"],
        ["Moyen", 60, "Simulation ciblée"],
        ["Complet", 90, "Répétition générale"]
      ].map(([name, count, note]) => `
        <div class="card">
          <span class="chip">${count} questions</span>
          <h2>Examen blanc ${name}</h2>
          <p>${note}. Questions mélangées, correction détaillée et score par domaine.</p>
          <button class="primary-button" onclick="setView('quiz')">Commencer</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderErrors() {
  document.getElementById("errors").innerHTML = `
    <div class="panel">
      <div class="toolbar">
        <div>
          <h2 style="margin:0">Journal d'erreurs</h2>
          <p class="muted" style="margin: 4px 0 0 0; font-size: 0.9em;">Révise ces concepts pour améliorer ton score.</p>
        </div>
        ${state.errors.length ? `<button class="ghost-button" onclick="clearErrors()">Réinitialiser</button>` : ""}
      </div>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
        ${state.errors.length ? state.errors.map((error) => `
          <div class="card" style="border-left: 4px solid #e74c3c; padding: 16px;">
            <div style="margin-bottom: 12px;">
              <span class="chip">${error.domain}</span>
              <span class="chip">${error.concept}</span>
              <span class="chip" style="color: #e74c3c; background: rgba(231, 76, 60, 0.1);">Ratée ${error.count} fois</span>
            </div>
            <h3 style="margin: 0 0 12px 0; font-size: 1.1em;">${error.question}</h3>
            <div class="grid two" style="gap: 12px;">
              <div style="background: rgba(231, 76, 60, 0.1); padding: 12px; border-radius: 6px; border: 1px solid rgba(231, 76, 60, 0.2);">
                <strong style="color: #e74c3c; display: block; font-size: 0.85em; text-transform: uppercase; margin-bottom: 4px;">❌ Ton choix</strong>
                <span style="color: inherit;">${error.chosen}</span>
              </div>
              <div style="background: rgba(46, 204, 113, 0.1); padding: 12px; border-radius: 6px; border: 1px solid rgba(46, 204, 113, 0.2);">
                <strong style="color: #27ae60; display: block; font-size: 0.85em; text-transform: uppercase; margin-bottom: 4px;">✅ Bonne réponse</strong>
                <span style="color: inherit;">${error.answer}</span>
              </div>
            </div>
          </div>
        `).join("") : (state.errors.length ? `
          <div style="text-align: center; padding: 40px 20px; color: #7f8c8d;">
            <p>Aucune erreur trouvée pour ce domaine.</p>
          </div>
        ` : `
          <div style="text-align: center; padding: 40px 20px; background: rgba(128, 128, 128, 0.05); border-radius: 8px;">
            <h3 style="margin: 0 0 8px 0;">Aucune erreur enregistrée 🎉</h3>
            <p class="muted" style="margin-bottom: 16px;">Lance un quiz pour tester tes connaissances. Tes erreurs apparaîtront ici.</p>
            <button class="primary-button" onclick="setView('quiz')">S'entraîner maintenant</button>
          </div>
        `)}
      </div>
    </div>
  `;
}

function clearErrors() {
  state.errors = [];
  state.errorFilterDomain = "";
  saveProgress();
  renderErrors();
}

function renderPlan() {
  const days = [
    ["Jour 1", "Diagnostic initial, CIA Triad, AAA, Zero Trust, quiz domaine 1"],
    ["Jour 2", "Threats, social engineering, malware, vulnerability management"],
    ["Jour 3", "Architecture, segmentation, cloud, crypto, PKI, PBQ réseau"],
    ["Jour 4", "Security Operations, logs, SIEM/SOAR, incident response, commandes"],
    ["Jour 5", "Governance, risk, compliance, BCP/DRP, awareness"],
    ["Jour 6", "Examen blanc complet, correction détaillée, journal d'erreurs"],
    ["Jour 7", "Révision légère, flashcards, ports, pièges classiques, repos"]
  ];
  const weak = [...domains].sort((a, b) => a.progress - b.progress)[0].name;
  document.getElementById("plan").innerHTML = `
    <div class="panel">
      <h2>Plan jusqu'au 25 mai 2026</h2>
      <p class="muted">Priorité actuelle selon tes scores: ${weak}. Le plan s'intensifie à mesure que la date approche.</p>
      ${days.map(([day, task]) => `<div class="list-row"><strong>${day}</strong><span>${task}</span></div>`).join("")}
    </div>
  `;
}

function renderAssistant() {
  document.getElementById("assistant").innerHTML = `
    <div class="panel" style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h2 style="margin:0 0 8px 0; display: flex; align-items: center; gap: 8px;">
          <span>🤖</span> Assistant IA de révision
        </h2>
        <p class="muted" style="margin: 0; font-size: 0.9em;">
          Prototype local: il simule des réponses pédagogiques. Une prochaine version pourra appeler l'API OpenAI.
        </p>
      </div>

      <div id="assistantChatHistory" style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; padding-right: 8px;">
        ${state.assistantAnswer ? `
          <div style="align-self: flex-end; background: rgba(52, 152, 219, 0.1); padding: 12px 16px; border-radius: 16px 16px 0 16px; max-width: 80%;">
            <strong style="display: block; font-size: 0.8em; color: #2980b9; margin-bottom: 4px;">Toi</strong>
            <span style="line-height: 1.4;">${state.assistantPrompt}</span>
          </div>
          <div style="align-self: flex-start; background: rgba(128, 128, 128, 0.05); border: 1px solid rgba(128, 128, 128, 0.1); padding: 12px 16px; border-radius: 16px 16px 16px 0; max-width: 90%;">
            <strong style="display: block; font-size: 0.8em; color: #7f8c8d; margin-bottom: 4px;">Assistant</strong>
            <span style="line-height: 1.5;">${state.assistantAnswer}</span>
          </div>
        ` : `
          <div style="text-align: center; padding: 32px 0; color: #7f8c8d;">
            <span style="font-size: 2em; display: block; margin-bottom: 8px;">✨</span>
            <p style="margin: 0;">Comment puis-je t'aider dans tes révisions aujourd'hui ?</p>
          </div>
        `}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 4px;">
        <span style="font-size: 0.85em; color: #7f8c8d; margin-top: 6px; margin-right: 4px;">Suggestions :</span>
        <button class="chip" style="cursor: pointer; background: transparent; border: 1px solid #bdc3c7;" onclick="fillAssistant('Différence entre SIEM et SOAR ?')">SIEM vs SOAR</button>
        <button class="chip" style="cursor: pointer; background: transparent; border: 1px solid #bdc3c7;" onclick="fillAssistant('Explique IDS vs IPS')">IDS vs IPS</button>
        <button class="chip" style="cursor: pointer; background: transparent; border: 1px solid #bdc3c7;" onclick="fillAssistant('Qu\\'est-ce que le Zero Trust ?')">Zero Trust</button>
      </div>

      <div style="display: flex; gap: 8px;">
        <input type="text" id="assistantInput" style="flex: 1; padding: 12px; border-radius: 8px; border: 1px solid #bdc3c7; outline: none; font-family: inherit; font-size: 1em;" placeholder="Pose ta question ici..." onkeypress="if(event.key === 'Enter') askAssistant()">
        <button class="primary-button" style="border-radius: 8px; padding: 0 20px; white-space: nowrap;" onclick="askAssistant()">Envoyer</button>
      </div>
    </div>
  `;
}

function fillAssistant(text) {
  const inputEl = document.getElementById("assistantInput");
  if (inputEl) {
    inputEl.value = text;
    inputEl.focus();
  }
}

function askAssistant() {
  const inputEl = document.getElementById("assistantInput");
  const prompt = inputEl.value.trim();
  if (!prompt) return;

  const promptLower = prompt.toLowerCase();
  let answer = "Commence par identifier le concept, le contrôle attendu, puis le piège. Pour Security+, cherche toujours la meilleure réponse, pas une réponse seulement possible.";

  if (promptLower.includes("siem") || promptLower.includes("soar")) {
    answer = "SIEM (Security Information and Event Management) collecte et corrèle les logs. SOAR (Security Orchestration, Automation and Response) automatise la réponse avec des playbooks. Piège classique: SIEM alerte, SOAR orchestre.";
  } else if (promptLower.includes("ids") || promptLower.includes("ips")) {
    answer = "IDS (Intrusion Detection System) détecte et alerte. IPS (Intrusion Prevention System) est placé inline et peut bloquer. Piège classique: si la question dit prévention ou blocage automatique, pense IPS.";
  } else if (promptLower.includes("mfa") || promptLower.includes("iam")) {
    answer = "IAM (Identity and Access Management) gère identités, authentification et autorisation. MFA ajoute plusieurs facteurs pour réduire l'impact d'un mot de passe compromis. Question rapide: lequel est le plus fort, mot de passe + PIN ou mot de passe + application mobile ?";
  } else if (promptLower.includes("zero trust")) {
    answer = "Le Zero Trust repose sur le principe 'Never trust, always verify'. Chaque demande d'accès est évaluée dynamiquement selon l'identité, l'appareil et le contexte, même si l'utilisateur est déjà sur le réseau interne.";
  }

  state.assistantPrompt = prompt;
  state.assistantAnswer = answer;
  renderAssistant();
}

function renderAll() {
  document.getElementById("daysLeft").textContent = daysUntilExam();
  renderDashboard();
  renderCourses();
  renderQuiz();
  renderPbq();
  renderFlashcards();
  renderPorts();
  renderExam();
  renderErrors();
  renderPlan();
  renderAssistant();
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("themeToggle").textContent = document.body.classList.contains("dark") ? "Mode clair" : "Mode sombre";
});

renderAll();
