export type StudyItem = {
  id: string;
  themeId: string;
  themeTitle: string;
  domain: string;
  term: string;
  definition: string;
  details: string;
  source: "flashcard cours local import";
};

export type StudyTheme = {
  id: string;
  title: string;
  domain: string;
  items: StudyItem[];
};

export const studyThemes = [
  {
    "id": "concepts-fondamentaux-de-securite",
    "title": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "concepts-fondamentaux-de-securite-cia-triad",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "CIA Triad",
        "definition": "Confidentiality, Integrity, Availability",
        "details": "Base de la s\u00e9curit\u00e9. Confidentiality = emp\u00eacher lecture non autoris\u00e9e. Integrity = emp\u00eacher modification non autoris\u00e9e. Availability = garantir acc\u00e8s aux services.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-confidentiality",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Confidentiality",
        "definition": "Protection contre l'acc\u00e8s non autoris\u00e9 aux donn\u00e9es",
        "details": "Exemples : encryption, access control, data masking.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-integrity",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Integrity",
        "definition": "Garantie que les donn\u00e9es ne sont pas modifi\u00e9es sans autorisation",
        "details": "Exemples : hashing, digital signature, file integrity monitoring.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-availability",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Availability",
        "definition": "Disponibilit\u00e9 des syst\u00e8mes et donn\u00e9es",
        "details": "Exemples : redundancy, backup, clustering, load balancing, UPS.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-aaa",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "AAA",
        "definition": "Authentication, Authorization, Accounting",
        "details": "Tr\u00e8s fr\u00e9quent \u00e0 l'examen. Authentication = qui es-tu ? Authorization = que peux-tu faire ? Accounting = qu'as-tu fait ?",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-authentication",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Authentication",
        "definition": "V\u00e9rification de l'identit\u00e9",
        "details": "Mot de passe, certificat, biom\u00e9trie, token.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-authorization",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Authorization",
        "definition": "Attribution des permissions",
        "details": "RBAC, ABAC, DAC, MAC.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-accounting",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Accounting",
        "definition": "Journalisation des actions",
        "details": "Logs, audit trails, SIEM.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-non-repudiation",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Non-repudiation",
        "definition": "Emp\u00eache quelqu'un de nier une action",
        "details": "Digital signature + logs sign\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-gap-analysis",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Gap Analysis",
        "definition": "Comparaison entre l'\u00e9tat actuel et l'\u00e9tat d\u00e9sir\u00e9",
        "details": "Sert \u00e0 identifier les \u00e9carts de s\u00e9curit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-zero-trust",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Zero Trust",
        "definition": "Mod\u00e8le \"never trust, always verify\"",
        "details": "V\u00e9rifier chaque utilisateur, appareil et requ\u00eate, m\u00eame en interne.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-control-plane",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Control Plane",
        "definition": "Partie d\u00e9cisionnelle du Zero Trust",
        "details": "Policy engine, policy administrator, adaptive identity.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-data-plane",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Data Plane",
        "definition": "Partie o\u00f9 les acc\u00e8s sont appliqu\u00e9s",
        "details": "Policy enforcement point, subject/system, ressources.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-policy-engine",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Policy Engine",
        "definition": "D\u00e9cide si l'acc\u00e8s est autoris\u00e9",
        "details": "Analyse identit\u00e9, contexte, posture de s\u00e9curit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-policy-administrator",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Policy Administrator",
        "definition": "Applique la d\u00e9cision d'acc\u00e8s",
        "details": "Configure ou \u00e9tablit la session.",
        "source": "flashcard cours local import"
      },
      {
        "id": "concepts-fondamentaux-de-securite-policy-enforcement-point",
        "themeId": "concepts-fondamentaux-de-securite",
        "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Policy Enforcement Point",
        "definition": "Point qui autorise ou bloque l'acc\u00e8s",
        "details": "Exemple : proxy, gateway, agent Zero Trust.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "types-de-controles-de-securite",
    "title": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "types-de-controles-de-securite-technical-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Technical Control",
        "definition": "Contr\u00f4le appliqu\u00e9 par technologie",
        "details": "Firewall, IDS, IPS, encryption, antivirus.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-managerial-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Managerial Control",
        "definition": "Contr\u00f4le li\u00e9 \u00e0 la gouvernance",
        "details": "Policies, risk assessment, vendor management.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-operational-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Operational Control",
        "definition": "Contr\u00f4le appliqu\u00e9 par des personnes/processus",
        "details": "Security guard, awareness training, incident response.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-physical-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Physical Control",
        "definition": "Contr\u00f4le prot\u00e9geant l'environnement physique",
        "details": "Locks, fencing, bollards, CCTV, badge readers.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-preventive-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Preventive Control",
        "definition": "Emp\u00eache un incident",
        "details": "Firewall, IPS, access control, MFA.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-detective-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Detective Control",
        "definition": "D\u00e9tecte un incident",
        "details": "IDS, logs, SIEM, CCTV.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-corrective-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Corrective Control",
        "definition": "Corrige apr\u00e8s incident",
        "details": "Restore from backup, patching, reimaging.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-deterrent-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Deterrent Control",
        "definition": "D\u00e9courage une attaque",
        "details": "Warning banner, lighting, visible cameras.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-compensating-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Compensating Control",
        "definition": "Alternative quand le contr\u00f4le principal est impossible",
        "details": "Isoler un vieux serveur non patchable.",
        "source": "flashcard cours local import"
      },
      {
        "id": "types-de-controles-de-securite-directive-control",
        "themeId": "types-de-controles-de-securite",
        "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
        "domain": "General Security Concepts",
        "term": "Directive Control",
        "definition": "Donne des instructions",
        "details": "Policy, procedure, login banner.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "securite-physique",
    "title": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "securite-physique-bollards",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Bollards",
        "definition": "Poteaux anti-v\u00e9hicules",
        "details": "Prot\u00e8gent contre attaques ou accidents avec voiture.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-access-control-vestibule-mantrap",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Access Control Vestibule / Mantrap",
        "definition": "Deux portes successives contr\u00f4lant l'acc\u00e8s",
        "details": "Emp\u00eache tailgating/piggybacking.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-fencing",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Fencing",
        "definition": "Barri\u00e8re physique",
        "details": "Contr\u00f4le/dissuasion p\u00e9rim\u00e9trique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-video-surveillance-cctv",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Video Surveillance / CCTV",
        "definition": "Cam\u00e9ras de surveillance",
        "details": "Detective + deterrent.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-security-guard",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Security Guard",
        "definition": "Agent de s\u00e9curit\u00e9",
        "details": "Operational control, pas physical selon CompTIA.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-access-badge",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Access Badge",
        "definition": "Carte d'acc\u00e8s",
        "details": "Physical/technical selon contexte. Souvent utilis\u00e9 avec RFID.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-lighting",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Lighting",
        "definition": "\u00c9clairage de s\u00e9curit\u00e9",
        "details": "Deterrent control.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-infrared-sensor",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Infrared Sensor",
        "definition": "Capteur bas\u00e9 sur chaleur",
        "details": "D\u00e9tecte chaleur/corps humain.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-pressure-sensor",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Pressure Sensor",
        "definition": "Capteur de pression",
        "details": "D\u00e9tecte poids/pas.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-microwave-sensor",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Microwave Sensor",
        "definition": "Capteur par ondes micro-ondes",
        "details": "Peut couvrir grandes zones, parfois traverse certains mat\u00e9riaux.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-physique-ultrasonic-sensor",
        "themeId": "securite-physique",
        "themeTitle": "S\u00e9curit\u00e9 physique",
        "domain": "General Security Concepts",
        "term": "Ultrasonic Sensor",
        "definition": "Capteur par ultrasons",
        "details": "D\u00e9tecte mouvement via ondes sonores.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "deception-and-disruption",
    "title": "Deception and disruption",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "deception-and-disruption-honeypot",
        "themeId": "deception-and-disruption",
        "themeTitle": "Deception and disruption",
        "domain": "General Security Concepts",
        "term": "Honeypot",
        "definition": "Faux syst\u00e8me vuln\u00e9rable pour attirer attaquants",
        "details": "Sert \u00e0 observer TTPs et d\u00e9tecter intrusion.",
        "source": "flashcard cours local import"
      },
      {
        "id": "deception-and-disruption-honeynet",
        "themeId": "deception-and-disruption",
        "themeTitle": "Deception and disruption",
        "domain": "General Security Concepts",
        "term": "Honeynet",
        "definition": "R\u00e9seau de honeypots",
        "details": "Simule un environnement plus r\u00e9aliste.",
        "source": "flashcard cours local import"
      },
      {
        "id": "deception-and-disruption-honeyfile",
        "themeId": "deception-and-disruption",
        "themeTitle": "Deception and disruption",
        "domain": "General Security Concepts",
        "term": "Honeyfile",
        "definition": "Fichier leurre surveill\u00e9",
        "details": "Exemple : passwords.xlsx surveill\u00e9 par DLP/SIEM.",
        "source": "flashcard cours local import"
      },
      {
        "id": "deception-and-disruption-honeytoken",
        "themeId": "deception-and-disruption",
        "themeTitle": "Deception and disruption",
        "domain": "General Security Concepts",
        "term": "Honeytoken",
        "definition": "Donn\u00e9e leurre surveill\u00e9e",
        "details": "Faux identifiant, fausse cl\u00e9 API, fausse entr\u00e9e DB.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "cryptographie-et-pki",
    "title": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "cryptographie-et-pki-pki",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "PKI",
        "definition": "Public Key Infrastructure",
        "details": "Infrastructure de certificats, cl\u00e9s publiques/priv\u00e9es, CA, CRL, OCSP.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-public-key",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Public Key",
        "definition": "Cl\u00e9 publique",
        "details": "Sert \u00e0 chiffrer pour le destinataire ou v\u00e9rifier une signature.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-private-key",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Private Key",
        "definition": "Cl\u00e9 priv\u00e9e",
        "details": "Sert \u00e0 d\u00e9chiffrer ou signer. Doit rester secr\u00e8te.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-ca",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "CA",
        "definition": "Certificate Authority",
        "details": "Autorit\u00e9 qui \u00e9met les certificats num\u00e9riques.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-csr",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "CSR",
        "definition": "Certificate Signing Request",
        "details": "Demande envoy\u00e9e \u00e0 une CA pour obtenir un certificat.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-crl",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "CRL",
        "definition": "Certificate Revocation List",
        "details": "Liste des certificats r\u00e9voqu\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-ocsp",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "OCSP",
        "definition": "Online Certificate Status Protocol",
        "details": "V\u00e9rifie le statut d'un certificat en temps r\u00e9el.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-root-of-trust",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Root of Trust",
        "definition": "Point de confiance initial",
        "details": "Base de validation d'une cha\u00eene de certificats.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-self-signed-certificate",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Self-signed Certificate",
        "definition": "Certificat sign\u00e9 par lui-m\u00eame",
        "details": "OK en lab/interne, risqu\u00e9 en public car non approuv\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-wildcard-certificate",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Wildcard Certificate",
        "definition": "Certificat pour plusieurs sous-domaines",
        "details": "Exemple : *.example.com. Si compromis, tous les sous-domaines sont \u00e0 risque.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-symmetric-encryption",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Symmetric Encryption",
        "definition": "M\u00eame cl\u00e9 pour chiffrer/d\u00e9chiffrer",
        "details": "Rapide. Exemple : AES.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-asymmetric-encryption",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Asymmetric Encryption",
        "definition": "Paire cl\u00e9 publique/priv\u00e9e",
        "details": "Plus lent, utile pour \u00e9change de cl\u00e9s/signature.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-aes",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "AES",
        "definition": "Advanced Encryption Standard",
        "details": "Algorithme sym\u00e9trique recommand\u00e9. AES-256 souvent cit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-rsa",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "RSA",
        "definition": "Algorithme asym\u00e9trique",
        "details": "Chiffrement, signatures, \u00e9change de cl\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-ecc",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "ECC",
        "definition": "Elliptic Curve Cryptography",
        "details": "Crypto asym\u00e9trique efficace avec cl\u00e9s plus petites.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-diffie-hellman",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Diffie-Hellman",
        "definition": "\u00c9change de cl\u00e9s",
        "details": "Permet d'\u00e9tablir un secret partag\u00e9 sans l'envoyer directement.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-hashing",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Hashing",
        "definition": "Fonction \u00e0 sens unique produisant une empreinte",
        "details": "Sert \u00e0 v\u00e9rifier l'int\u00e9grit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-sha-256",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "SHA-256",
        "definition": "Secure Hash Algorithm 256 bits",
        "details": "Hash moderne recommand\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-md5-sha-1",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "MD5 / SHA-1",
        "definition": "Anciens algorithmes de hash",
        "details": "\u00c0 \u00e9viter : collisions connues/faiblesse.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-salt",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Salt",
        "definition": "Valeur al\u00e9atoire ajout\u00e9e au mot de passe avant hash",
        "details": "Emp\u00eache hashes identiques et rainbow tables.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-key-stretching",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Key Stretching",
        "definition": "Rend le cracking plus lent",
        "details": "PBKDF2, bcrypt, scrypt, Argon2.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-hmac",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "HMAC",
        "definition": "Hash-based Message Authentication Code",
        "details": "Int\u00e9grit\u00e9 + authenticit\u00e9 avec cl\u00e9 secr\u00e8te.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-digital-signature",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Digital Signature",
        "definition": "Signature avec cl\u00e9 priv\u00e9e",
        "details": "Fournit int\u00e9grit\u00e9, authenticit\u00e9, non-r\u00e9pudiation.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-tpm",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "TPM",
        "definition": "Trusted Platform Module",
        "details": "Puce s\u00e9curis\u00e9e pour cl\u00e9s, BitLocker, secure boot.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-hsm",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "HSM",
        "definition": "Hardware Security Module",
        "details": "Module mat\u00e9riel pour prot\u00e9ger cl\u00e9s critiques c\u00f4t\u00e9 serveur/entreprise.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-kms",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "KMS",
        "definition": "Key Management System",
        "details": "Gestion centralis\u00e9e des cl\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-secure-enclave",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Secure Enclave",
        "definition": "Zone isol\u00e9e pour op\u00e9rations sensibles",
        "details": "Souvent associ\u00e9 aux appareils mobiles/Apple.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-steganography",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Steganography",
        "definition": "Cacher un message dans un fichier/image/audio",
        "details": "Obfuscation, pas chiffrement.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-tokenization",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Tokenization",
        "definition": "Remplace donn\u00e9e sensible par token sans valeur",
        "details": "Tr\u00e8s utilis\u00e9 pour cartes bancaires.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-data-masking",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Data Masking",
        "definition": "Masque une partie de la donn\u00e9e",
        "details": "Exemple : XXXX-XXXX-XXXX-1234.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-blockchain",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Blockchain",
        "definition": "Registre distribu\u00e9 immuable",
        "details": "Tra\u00e7abilit\u00e9, int\u00e9grit\u00e9, open public ledger.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cryptographie-et-pki-open-public-ledger",
        "themeId": "cryptographie-et-pki",
        "themeTitle": "Cryptographie et PKI",
        "domain": "General Security Concepts",
        "term": "Open Public Ledger",
        "definition": "Registre public consultable",
        "details": "Transactions visibles et difficiles \u00e0 modifier.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "menaces-acteurs-et-motivations",
    "title": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "menaces-acteurs-et-motivations-nation-state",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Nation-State",
        "definition": "Acteur soutenu par un \u00c9tat",
        "details": "Tr\u00e8s sophistiqu\u00e9, espionnage, guerre, sabotage.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-organized-crime",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Organized Crime",
        "definition": "Groupe criminel structur\u00e9",
        "details": "Motivation principale : gain financier.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-hacktivist",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Hacktivist",
        "definition": "Attaquant motiv\u00e9 par cause politique/sociale",
        "details": "Defacement, leaks, DDoS.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-insider-threat",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Insider Threat",
        "definition": "Menace interne",
        "details": "Employ\u00e9, prestataire, utilisateur l\u00e9gitime.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-unskilled-attacker-script-kiddie",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Unskilled Attacker / Script Kiddie",
        "definition": "Attaquant peu qualifi\u00e9 utilisant outils existants",
        "details": "Opportuniste.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-shadow-it",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Shadow IT",
        "definition": "Technologies utilis\u00e9es sans approbation IT",
        "details": "Risque de fuite, mauvaise configuration, non-conformit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-espionage",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Espionage",
        "definition": "Vol d'informations strat\u00e9giques",
        "details": "Associ\u00e9 nation-state/competitors.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-data-exfiltration",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Data Exfiltration",
        "definition": "Sortie non autoris\u00e9e de donn\u00e9es",
        "details": "D\u00e9tect\u00e9e par DLP, logs, SIEM.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-blackmail",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Blackmail",
        "definition": "Chantage",
        "details": "Souvent ransomware/extortion.",
        "source": "flashcard cours local import"
      },
      {
        "id": "menaces-acteurs-et-motivations-revenge",
        "themeId": "menaces-acteurs-et-motivations",
        "themeTitle": "Menaces, acteurs et motivations",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Revenge",
        "definition": "Vengeance",
        "details": "Souvent insider threat.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "social-engineering",
    "title": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "social-engineering-phishing",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Phishing",
        "definition": "Hame\u00e7onnage par email/message",
        "details": "Attaque large.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-spear-phishing",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Spear Phishing",
        "definition": "Phishing cibl\u00e9",
        "details": "Vise une personne/groupe pr\u00e9cis.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-whaling",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Whaling",
        "definition": "Phishing ciblant dirigeants",
        "details": "CEO, CFO, cadres.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-vishing",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Vishing",
        "definition": "Phishing par appel vocal",
        "details": "Voice phishing.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-smishing",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Smishing",
        "definition": "Phishing par SMS",
        "details": "SMS + lien malveillant.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-pretexting",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Pretexting",
        "definition": "Faux sc\u00e9nario pour obtenir infos",
        "details": "Exemple : faux technicien IT.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-impersonation",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Impersonation",
        "definition": "Usurpation d'identit\u00e9",
        "details": "Se faire passer pour une autorit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-tailgating",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Tailgating",
        "definition": "Suivre quelqu'un sans autorisation",
        "details": "Contournement contr\u00f4le physique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-piggybacking",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Piggybacking",
        "definition": "Suivre quelqu'un avec son consentement implicite",
        "details": "Variante de tailgating.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-dumpster-diving",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Dumpster Diving",
        "definition": "Fouille des poubelles",
        "details": "Recherche documents, badges, infos.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-shoulder-surfing",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Shoulder Surfing",
        "definition": "Observer par-dessus l'\u00e9paule",
        "details": "Vol PIN/mot de passe.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-watering-hole",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Watering Hole",
        "definition": "Compromettre un site fr\u00e9quent\u00e9 par la cible",
        "details": "Attaque indirecte.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-typosquatting",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Typosquatting",
        "definition": "Domaine ressemblant \u00e0 un vrai domaine",
        "details": "Exemple : g00gle.com.",
        "source": "flashcard cours local import"
      },
      {
        "id": "social-engineering-business-email-compromise-bec",
        "themeId": "social-engineering",
        "themeTitle": "Social Engineering",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Business Email Compromise (BEC)",
        "definition": "Fraude via email professionnel compromis/usurp\u00e9",
        "details": "Souvent demande de virement.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "malware-et-attaques",
    "title": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "malware-et-attaques-virus",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Virus",
        "definition": "Malware qui s'attache \u00e0 un fichier/programme",
        "details": "N\u00e9cessite souvent action utilisateur.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-worm",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Worm",
        "definition": "Malware auto-r\u00e9plicatif r\u00e9seau",
        "details": "Se propage seul.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-trojan",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Trojan",
        "definition": "Programme apparemment l\u00e9gitime mais malveillant",
        "details": "Pi\u00e8ge classique : spreadsheet/vendor file.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-rat",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "RAT",
        "definition": "Remote Access Trojan",
        "details": "Donne contr\u00f4le distant \u00e0 l'attaquant.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-ransomware",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Ransomware",
        "definition": "Chiffre ou bloque donn\u00e9es contre ran\u00e7on",
        "details": "Impact disponibilit\u00e9/confidentialit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-spyware",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Spyware",
        "definition": "Espionne activit\u00e9 utilisateur",
        "details": "Collecte infos.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-keylogger",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Keylogger",
        "definition": "Capture frappes clavier",
        "details": "Vol identifiants.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-rootkit",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Rootkit",
        "definition": "Cache pr\u00e9sence malveillante avec privil\u00e8ges \u00e9lev\u00e9s",
        "details": "Tr\u00e8s difficile \u00e0 d\u00e9tecter.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-logic-bomb",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Logic Bomb",
        "definition": "Code d\u00e9clench\u00e9 par condition/date",
        "details": "Souvent insider.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-bloatware",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Bloatware",
        "definition": "Logiciel inutile pr\u00e9install\u00e9",
        "details": "Augmente surface d'attaque.",
        "source": "flashcard cours local import"
      },
      {
        "id": "malware-et-attaques-pup",
        "themeId": "malware-et-attaques",
        "themeTitle": "Malware et attaques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "PUP",
        "definition": "Potentially Unwanted Program",
        "details": "Programme ind\u00e9sirable, pas toujours malware strict.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "attaques-reseau-et-application",
    "title": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "attaques-reseau-et-application-dos",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "DoS",
        "definition": "Denial of Service",
        "details": "Rend service indisponible.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-ddos",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "DDoS",
        "definition": "Distributed Denial of Service",
        "details": "DoS depuis plusieurs sources.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-syn-flood",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "SYN Flood",
        "definition": "Attaque TCP consommant connexions semi-ouvertes",
        "details": "Vise disponibilit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-on-path-mitm",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "On-path / MITM",
        "definition": "Attaquant intercepte/modifie communications",
        "details": "Certificat invalide peut \u00eatre indice.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-replay-attack",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Replay Attack",
        "definition": "R\u00e9utilisation d'une communication captur\u00e9e",
        "details": "Contr\u00e9 par nonce/timestamp.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-session-replay",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Session Replay",
        "definition": "R\u00e9utilisation d'une session valide",
        "details": "Cookies/tokens vol\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-arp-poisoning",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "ARP Poisoning",
        "definition": "Empoisonnement ARP LAN",
        "details": "Redirige trafic vers attaquant.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-dns-poisoning",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "DNS Poisoning",
        "definition": "R\u00e9ponses DNS falsifi\u00e9es",
        "details": "Redirige vers mauvaise IP.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-domain-hijacking",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Domain Hijacking",
        "definition": "Prise de contr\u00f4le d'un domaine",
        "details": "Modifier DNS/registre.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-ssl-stripping",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "SSL Stripping",
        "definition": "Forcer HTTP au lieu de HTTPS",
        "details": "Downgrade attaque.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-sql-injection",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "SQL Injection",
        "definition": "Injection de requ\u00eates SQL",
        "details": "Exemple : ' OR '1'='1.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-xss",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "XSS",
        "definition": "Cross-Site Scripting",
        "details": "Injection script c\u00f4t\u00e9 navigateur.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-csrf",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "CSRF",
        "definition": "Cross-Site Request Forgery",
        "details": "Force utilisateur authentifi\u00e9 \u00e0 faire une action.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-directory-traversal",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Directory Traversal",
        "definition": "Acc\u00e8s fichiers via chemins ../",
        "details": "Exemple : /../../etc/passwd.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-buffer-overflow",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Buffer Overflow",
        "definition": "Trop de donn\u00e9es dans m\u00e9moire tampon",
        "details": "Peut ex\u00e9cuter code arbitraire.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-race-condition",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Race Condition",
        "definition": "R\u00e9sultat d\u00e9pend du timing",
        "details": "TOCTOU classique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-privilege-escalation",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Privilege Escalation",
        "definition": "Obtenir privil\u00e8ges sup\u00e9rieurs",
        "details": "Verticale ou horizontale.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-pass-the-hash",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Pass-the-Hash",
        "definition": "Utiliser un hash NTLM au lieu du mot de passe",
        "details": "Attaque Windows/AD.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-birthday-attack",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Birthday Attack",
        "definition": "Exploite probabilit\u00e9 de collision hash",
        "details": "Li\u00e9 int\u00e9grit\u00e9/hash.",
        "source": "flashcard cours local import"
      },
      {
        "id": "attaques-reseau-et-application-downgrade-attack",
        "themeId": "attaques-reseau-et-application",
        "themeTitle": "Attaques r\u00e9seau et application",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "term": "Downgrade Attack",
        "definition": "Force protocole/version plus faible",
        "details": "Exemple TLS vers SSL.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "securite-reseau",
    "title": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "securite-reseau-firewall",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "Firewall",
        "definition": "Filtre trafic selon r\u00e8gles",
        "details": "Preventive technical control.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-ngfw",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "NGFW",
        "definition": "Next-Generation Firewall",
        "details": "Firewall avanc\u00e9 : app awareness, IPS, inspection.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-waf",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "WAF",
        "definition": "Web Application Firewall",
        "details": "Prot\u00e8ge applications web contre SQLi, XSS, etc.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-ids",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "IDS",
        "definition": "Intrusion Detection System",
        "details": "D\u00e9tecte, alerte, n'interrompt pas forc\u00e9ment.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-ips",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "IPS",
        "definition": "Intrusion Prevention System",
        "details": "Bloque activement, souvent inline.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-nids",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "NIDS",
        "definition": "Network IDS",
        "details": "IDS plac\u00e9 sur r\u00e9seau.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-hids",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "HIDS",
        "definition": "Host IDS",
        "details": "IDS sur endpoint/serveur.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-acl",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "ACL",
        "definition": "Access Control List",
        "details": "Liste de r\u00e8gles allow/deny.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-vlan",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "VLAN",
        "definition": "Virtual LAN",
        "details": "Segmentation logique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-dmz-screened-subnet",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "DMZ / Screened Subnet",
        "definition": "Zone expos\u00e9e contr\u00f4l\u00e9e",
        "details": "Pour serveurs publics : web, mail, DNS.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-nat",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "NAT",
        "definition": "Network Address Translation",
        "details": "Traduction IP priv\u00e9e/publique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-vpn",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "VPN",
        "definition": "Virtual Private Network",
        "details": "Tunnel s\u00e9curis\u00e9 distant/site-\u00e0-site.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-ipsec",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "IPsec",
        "definition": "Suite de protocoles VPN",
        "details": "S\u00e9curise couche r\u00e9seau.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-ssl-tls-vpn",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "SSL/TLS VPN",
        "definition": "VPN via TLS",
        "details": "Souvent portail ou client remote access.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-split-tunnel",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "Split Tunnel",
        "definition": "Seul trafic entreprise passe VPN",
        "details": "Meilleure performance, moins s\u00e9curis\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-full-tunnel",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "Full Tunnel",
        "definition": "Tout trafic passe par VPN",
        "details": "Plus s\u00e9curis\u00e9, plus lourd.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-sase",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "SASE",
        "definition": "Secure Access Service Edge",
        "details": "S\u00e9curit\u00e9 r\u00e9seau cloud pour utilisateurs distribu\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-sdn",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "SDN",
        "definition": "Software-Defined Networking",
        "details": "R\u00e9seau pilot\u00e9 par logiciel.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-nac",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "NAC",
        "definition": "Network Access Control",
        "details": "V\u00e9rifie posture appareil avant acc\u00e8s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-802-1x",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "802.1X",
        "definition": "Contr\u00f4le d'acc\u00e8s r\u00e9seau",
        "details": "Authentification port r\u00e9seau/Wi-Fi Enterprise.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-radius",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "RADIUS",
        "definition": "Protocole AAA r\u00e9seau",
        "details": "Centralise auth Wi-Fi/VPN.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-tacacs",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "TACACS+",
        "definition": "AAA pour \u00e9quipements r\u00e9seau",
        "details": "S\u00e9pare authentication/authorization/accounting.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-proxy",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "Proxy",
        "definition": "Interm\u00e9diaire client-serveur",
        "details": "Filtrage, anonymisation, contr\u00f4le.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-reverse-proxy",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "Reverse Proxy",
        "definition": "Proxy c\u00f4t\u00e9 serveur",
        "details": "Prot\u00e8ge et r\u00e9partit acc\u00e8s aux serveurs.",
        "source": "flashcard cours local import"
      },
      {
        "id": "securite-reseau-load-balancer",
        "themeId": "securite-reseau",
        "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
        "domain": "Security Architecture",
        "term": "Load Balancer",
        "definition": "R\u00e9partit trafic",
        "details": "Availability, performance, HA.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "wi-fi-et-mobile",
    "title": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "wi-fi-et-mobile-wpa2",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "WPA2",
        "definition": "Standard Wi-Fi s\u00e9curis\u00e9 ancien",
        "details": "Utilise souvent CCMP/AES.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-wpa3",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "WPA3",
        "definition": "Standard Wi-Fi plus r\u00e9cent",
        "details": "SAE, meilleure protection.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-psk",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "PSK",
        "definition": "Pre-Shared Key",
        "details": "Mot de passe partag\u00e9 Wi-Fi.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-enterprise-wi-fi",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "Enterprise Wi-Fi",
        "definition": "Wi-Fi avec 802.1X/RADIUS",
        "details": "Chaque utilisateur s'authentifie individuellement.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-evil-twin",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "Evil Twin",
        "definition": "Faux point d'acc\u00e8s imitant le vrai",
        "details": "Vol identifiants/traffic interception.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-rogue-ap",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "Rogue AP",
        "definition": "Point d'acc\u00e8s non autoris\u00e9",
        "details": "Risque Shadow IT.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-deauthentication-attack",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "Deauthentication Attack",
        "definition": "Force d\u00e9connexion Wi-Fi",
        "details": "Peut pr\u00e9parer Evil Twin/capture handshake.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-jamming",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "Jamming",
        "definition": "Brouillage radio",
        "details": "Atteinte disponibilit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-wps-attack",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "WPS Attack",
        "definition": "Exploitation Wi-Fi Protected Setup",
        "details": "PIN WPS faible.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-mdm",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "MDM",
        "definition": "Mobile Device Management",
        "details": "Gestion politiques mobiles : lock, wipe, encryption.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-mam",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "MAM",
        "definition": "Mobile Application Management",
        "details": "Gestion applications mobiles.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-byod",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "BYOD",
        "definition": "Bring Your Own Device",
        "details": "Appareil personnel au travail.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-cope",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "COPE",
        "definition": "Corporate-Owned, Personally Enabled",
        "details": "Appareil entreprise, usage perso autoris\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-cyod",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "CYOD",
        "definition": "Choose Your Own Device",
        "details": "Utilisateur choisit dans liste approuv\u00e9e.",
        "source": "flashcard cours local import"
      },
      {
        "id": "wi-fi-et-mobile-jailbreaking-rooting",
        "themeId": "wi-fi-et-mobile",
        "themeTitle": "Wi-Fi et mobile",
        "domain": "Security Architecture",
        "term": "Jailbreaking/Rooting",
        "definition": "Retirer restrictions OS mobile",
        "details": "Augmente risque s\u00e9curit\u00e9.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "cloud-et-architecture",
    "title": "Cloud et architecture",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "cloud-et-architecture-iaas",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "IaaS",
        "definition": "Infrastructure as a Service",
        "details": "Client g\u00e8re OS, apps, data ; fournisseur g\u00e8re infra.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-paas",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "PaaS",
        "definition": "Platform as a Service",
        "details": "Client g\u00e8re apps/data ; fournisseur g\u00e8re OS/runtime.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-saas",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "SaaS",
        "definition": "Software as a Service",
        "details": "Client utilise application ; fournisseur g\u00e8re presque tout.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-public-cloud",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Public Cloud",
        "definition": "Cloud partag\u00e9 public",
        "details": "AWS/Azure/GCP.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-private-cloud",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Private Cloud",
        "definition": "Cloud d\u00e9di\u00e9 organisation",
        "details": "Plus de contr\u00f4le.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-hybrid-cloud",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Hybrid Cloud",
        "definition": "M\u00e9lange on-prem + cloud",
        "details": "Attention mismatch controls/network protection.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-multi-cloud",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Multi-cloud",
        "definition": "Plusieurs fournisseurs cloud",
        "details": "R\u00e9duit d\u00e9pendance, augmente complexit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-casb",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "CASB",
        "definition": "Cloud Access Security Broker",
        "details": "Contr\u00f4le acc\u00e8s cloud, visibilit\u00e9, DLP cloud.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-iac",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "IaC",
        "definition": "Infrastructure as Code",
        "details": "D\u00e9ployer infra par code. Risque : mauvaises configs propag\u00e9es.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-serverless",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Serverless",
        "definition": "Ex\u00e9cution sans gestion serveur visible",
        "details": "Responsabilit\u00e9 change, d\u00e9pendance fournisseur.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-containerization",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Containerization",
        "definition": "Applications isol\u00e9es en containers",
        "details": "Plus l\u00e9ger que VM.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-microservices",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Microservices",
        "definition": "Application divis\u00e9e en petits services",
        "details": "Plus flexible, augmente surface API.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-api",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "API",
        "definition": "Application Programming Interface",
        "details": "Interface d'\u00e9change applicatif. \u00c0 s\u00e9curiser fortement.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-scada",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "SCADA",
        "definition": "Supervisory Control and Data Acquisition",
        "details": "Syst\u00e8mes industriels critiques.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-ics",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "ICS",
        "definition": "Industrial Control Systems",
        "details": "Syst\u00e8mes de contr\u00f4le industriel.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-iot",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "IoT",
        "definition": "Internet of Things",
        "details": "Appareils connect\u00e9s souvent peu s\u00e9curis\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-rtos",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "RTOS",
        "definition": "Real-Time Operating System",
        "details": "OS temps r\u00e9el pour syst\u00e8mes embarqu\u00e9s/industriels.",
        "source": "flashcard cours local import"
      },
      {
        "id": "cloud-et-architecture-embedded-system",
        "themeId": "cloud-et-architecture",
        "themeTitle": "Cloud et architecture",
        "domain": "Security Architecture",
        "term": "Embedded System",
        "definition": "Syst\u00e8me informatique int\u00e9gr\u00e9 \u00e0 \u00e9quipement",
        "details": "Contraintes patching, CPU, m\u00e9moire.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "resilience-sauvegarde-et-continuite",
    "title": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "resilience-sauvegarde-et-continuite-ha",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "HA",
        "definition": "High Availability",
        "details": "Architecture limitant interruptions.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-redundancy",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Redundancy",
        "definition": "Composants en double",
        "details": "\u00c9vite single point of failure.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-spof",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "SPOF",
        "definition": "Single Point of Failure",
        "details": "\u00c9l\u00e9ment unique dont la panne arr\u00eate le service.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-failover",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Failover",
        "definition": "Basculement vers syst\u00e8me secondaire",
        "details": "Continuit\u00e9 de service.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-clustering",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Clustering",
        "definition": "Groupe de serveurs travaillant ensemble",
        "details": "HA/performance.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-raid-0",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "RAID 0",
        "definition": "Striping sans redondance",
        "details": "Performance, pas s\u00e9curit\u00e9 disponibilit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-raid-1",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "RAID 1",
        "definition": "Mirroring",
        "details": "Redondance disque.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-raid-5-6",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "RAID 5/6",
        "definition": "Parit\u00e9",
        "details": "Tol\u00e9rance panne disque.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-raid-10",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "RAID 10",
        "definition": "Mirroring + striping",
        "details": "Performance + redondance.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-ups",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "UPS",
        "definition": "Uninterruptible Power Supply",
        "details": "Batterie temporaire contre coupure.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-generator",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Generator",
        "definition": "G\u00e9n\u00e9rateur \u00e9lectrique",
        "details": "Continuit\u00e9 plus longue.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-backup-full",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Backup Full",
        "definition": "Sauvegarde compl\u00e8te",
        "details": "Restauration simple mais longue \u00e0 faire.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-backup-incremental",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Backup Incremental",
        "definition": "Sauvegarde changements depuis dernier backup",
        "details": "Rapide \u00e0 faire, restauration plus longue.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-backup-differential",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Backup Differential",
        "definition": "Changements depuis dernier full",
        "details": "Restauration plus simple qu'incr\u00e9mental.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-snapshot",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Snapshot",
        "definition": "\u00c9tat instantan\u00e9 d'un syst\u00e8me",
        "details": "Utile rollback rapide, pas toujours backup complet.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-replication",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Replication",
        "definition": "Copie continue vers autre site/syst\u00e8me",
        "details": "Disponibilit\u00e9/r\u00e9cup\u00e9ration.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-journaling",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Journaling",
        "definition": "Journal des transactions",
        "details": "R\u00e9duit corruption apr\u00e8s panne.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-rto",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "RTO",
        "definition": "Recovery Time Objective",
        "details": "Temps maximal pour restaurer service.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-rpo",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "RPO",
        "definition": "Recovery Point Objective",
        "details": "Quantit\u00e9 maximale de donn\u00e9es perdues acceptable.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-mtbf",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "MTBF",
        "definition": "Mean Time Between Failures",
        "details": "Temps moyen entre pannes.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-mttr",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "MTTR",
        "definition": "Mean Time To Repair/Recover",
        "details": "Temps moyen de r\u00e9paration/r\u00e9cup\u00e9ration.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-bia",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "BIA",
        "definition": "Business Impact Analysis",
        "details": "Identifie impacts m\u00e9tier d'une interruption.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-coop",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "COOP",
        "definition": "Continuity of Operations Plan",
        "details": "Continuer op\u00e9rations malgr\u00e9 incident.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-drp",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "DRP",
        "definition": "Disaster Recovery Plan",
        "details": "Restauration apr\u00e8s sinistre.",
        "source": "flashcard cours local import"
      },
      {
        "id": "resilience-sauvegarde-et-continuite-tabletop-exercise",
        "themeId": "resilience-sauvegarde-et-continuite",
        "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
        "domain": "Security Architecture",
        "term": "Tabletop Exercise",
        "definition": "Simulation th\u00e9orique autour d'une table",
        "details": "Tester plan sans toucher prod.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "security-operations",
    "title": "Security Operations",
    "domain": "Security Operations",
    "items": [
      {
        "id": "security-operations-secure-baseline",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Secure Baseline",
        "definition": "Configuration s\u00e9curis\u00e9e de r\u00e9f\u00e9rence",
        "details": "Point de d\u00e9part hardening.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-hardening",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Hardening",
        "definition": "R\u00e9duction surface d'attaque",
        "details": "D\u00e9sactiver services, patcher, config s\u00e9curis\u00e9e.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-patch-management",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Patch Management",
        "definition": "Gestion des correctifs",
        "details": "Tester, approuver, d\u00e9ployer, valider.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-allow-list",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Allow List",
        "definition": "Liste de ce qui est autoris\u00e9",
        "details": "Plus s\u00e9curis\u00e9, plus difficile \u00e0 maintenir.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-deny-list-block-list",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Deny List / Block List",
        "definition": "Liste de ce qui est bloqu\u00e9",
        "details": "Plus simple mais moins strict.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-configuration-enforcement",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Configuration Enforcement",
        "definition": "Imposer config conforme",
        "details": "NAC, GPO, MDM, posture checks.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-vulnerability-scan",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Vulnerability Scan",
        "definition": "Recherche automatis\u00e9e de vuln\u00e9rabilit\u00e9s",
        "details": "Credentialed vs non-credentialed.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-credentialed-scan",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Credentialed Scan",
        "definition": "Scan avec identifiants",
        "details": "Plus pr\u00e9cis.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-non-credentialed-scan",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Non-Credentialed Scan",
        "definition": "Scan externe sans acc\u00e8s interne",
        "details": "Vue attaquant externe.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-penetration-test",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Penetration Test",
        "definition": "Exploitation contr\u00f4l\u00e9e de vuln\u00e9rabilit\u00e9s",
        "details": "Valide exploitabilit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-rules-of-engagement",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Rules of Engagement",
        "definition": "Cadre l\u00e9gal/technique du pentest",
        "details": "Scope, horaires, limites.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-cve",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "CVE",
        "definition": "Common Vulnerabilities and Exposures",
        "details": "Identifiant vuln\u00e9rabilit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-cvss",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "CVSS",
        "definition": "Common Vulnerability Scoring System",
        "details": "Score de gravit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-false-positive",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "False Positive",
        "definition": "Alerte fausse",
        "details": "Le scan signale vuln\u00e9rabilit\u00e9 inexistante.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-false-negative",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "False Negative",
        "definition": "Manque une vraie vuln\u00e9rabilit\u00e9",
        "details": "Tr\u00e8s dangereux.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-scap",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "SCAP",
        "definition": "Security Content Automation Protocol",
        "details": "Automatisation conformit\u00e9/config/vuln\u00e9rabilit\u00e9s.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-fim",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "FIM",
        "definition": "File Integrity Monitoring",
        "details": "D\u00e9tecte modifications fichiers critiques.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-netflow",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "NetFlow",
        "definition": "M\u00e9tadonn\u00e9es de flux r\u00e9seau",
        "details": "Qui parle \u00e0 qui, volume, ports.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-packet-capture-pcap",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Packet Capture / PCAP",
        "definition": "Capture compl\u00e8te de paquets",
        "details": "Analyse d\u00e9taill\u00e9e r\u00e9seau.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-syslog",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "Syslog",
        "definition": "Standard d'envoi de logs",
        "details": "Centralisation logs.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-snmp-trap",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "SNMP Trap",
        "definition": "Alerte envoy\u00e9e par \u00e9quipement r\u00e9seau",
        "details": "Monitoring r\u00e9seau.",
        "source": "flashcard cours local import"
      },
      {
        "id": "security-operations-ueba",
        "themeId": "security-operations",
        "themeTitle": "Security Operations",
        "domain": "Security Operations",
        "term": "UEBA",
        "definition": "User and Entity Behavior Analytics",
        "details": "D\u00e9tecte comportements anormaux.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "incident-response-et-forensics",
    "title": "Incident Response et Forensics",
    "domain": "Security Operations",
    "items": [
      {
        "id": "incident-response-et-forensics-ir",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "IR",
        "definition": "Incident Response",
        "details": "Processus de r\u00e9ponse aux incidents.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-preparation",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Preparation",
        "definition": "Pr\u00e9parer outils, r\u00f4les, plans",
        "details": "Avant incident.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-detection",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Detection",
        "definition": "Identifier incident",
        "details": "Alertes/logs/SIEM.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-analysis",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Analysis",
        "definition": "Comprendre cause, port\u00e9e, impact",
        "details": "Triage, RCA.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-containment",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Containment",
        "definition": "Limiter propagation",
        "details": "Isoler machine, bloquer compte.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-eradication",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Eradication",
        "definition": "Supprimer cause/malware",
        "details": "Patcher, supprimer persistence.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-recovery",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Recovery",
        "definition": "Restaurer service",
        "details": "Reimage, backup, validation.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-lessons-learned",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Lessons Learned",
        "definition": "Retour d'exp\u00e9rience",
        "details": "Am\u00e9liorer processus.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-rca",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "RCA",
        "definition": "Root Cause Analysis",
        "details": "Identifier cause racine.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-threat-hunting",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Threat Hunting",
        "definition": "Recherche proactive de menaces",
        "details": "Avant alerte confirm\u00e9e.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-forensic-image",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Forensic Image",
        "definition": "Copie bit-\u00e0-bit",
        "details": "Pr\u00e9serve preuve.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-chain-of-custody",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Chain of Custody",
        "definition": "Tra\u00e7abilit\u00e9 des preuves",
        "details": "Qui a eu quoi, quand, comment.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-legal-hold",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Legal Hold",
        "definition": "Pr\u00e9servation obligatoire de preuves",
        "details": "Enqu\u00eate/litige.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-e-discovery",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "E-discovery",
        "definition": "Recherche/production de preuves \u00e9lectroniques",
        "details": "Processus l\u00e9gal.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-order-of-volatility",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Order of Volatility",
        "definition": "Collecte des preuves les plus volatiles d'abord",
        "details": "RAM avant disque, connexions avant fichiers.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-mitre-att-ck",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "MITRE ATT&CK",
        "definition": "Base de tactiques/techniques adverses",
        "details": "Analyse TTPs.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-cyber-kill-chain",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Cyber Kill Chain",
        "definition": "\u00c9tapes d'une attaque",
        "details": "Recon, weaponization, delivery, exploitation, etc.",
        "source": "flashcard cours local import"
      },
      {
        "id": "incident-response-et-forensics-diamond-model",
        "themeId": "incident-response-et-forensics",
        "themeTitle": "Incident Response et Forensics",
        "domain": "Security Operations",
        "term": "Diamond Model",
        "definition": "Mod\u00e8le intrusion : adversary, capability, infrastructure, victim",
        "details": "Analyse menace.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "gouvernance-risque-et-conformite",
    "title": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "items": [
      {
        "id": "gouvernance-risque-et-conformite-grc",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "GRC",
        "definition": "Governance, Risk, Compliance",
        "details": "Domaine 5, tr\u00e8s important.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-policy",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Policy",
        "definition": "R\u00e8gle de haut niveau obligatoire",
        "details": "Quoi faire.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-standard",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Standard",
        "definition": "Exigence sp\u00e9cifique obligatoire",
        "details": "Niveau minimal attendu.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-procedure",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Procedure",
        "definition": "\u00c9tapes d\u00e9taill\u00e9es",
        "details": "Comment faire.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-guideline",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Guideline",
        "definition": "Recommandation non obligatoire",
        "details": "Bonne pratique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-aup",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "AUP",
        "definition": "Acceptable Use Policy",
        "details": "Utilisation acceptable des ressources IT.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-bpa",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "BPA",
        "definition": "Business Partnership Agreement",
        "details": "Accord entre partenaires.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-nda",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "NDA",
        "definition": "Non-Disclosure Agreement",
        "details": "Accord de confidentialit\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-sla",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "SLA",
        "definition": "Service Level Agreement",
        "details": "Niveau de service attendu.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-sow",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "SOW",
        "definition": "Statement of Work",
        "details": "Travail pr\u00e9cis \u00e0 r\u00e9aliser.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-mou-moa",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "MOU/MOA",
        "definition": "Memorandum of Understanding/Agreement",
        "details": "Accord formel g\u00e9n\u00e9ral entre organisations.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk",
        "definition": "Probabilit\u00e9 \u00d7 impact d'une menace exploitant une vuln\u00e9rabilit\u00e9",
        "details": "Base analyse de risques.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-threat",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Threat",
        "definition": "Cause potentielle de dommage",
        "details": "Attaquant, incendie, malware.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-vulnerability",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Vulnerability",
        "definition": "Faiblesse exploitable",
        "details": "Mauvaise config, patch manquant.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-impact",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Impact",
        "definition": "Cons\u00e9quence d'un incident",
        "details": "Financier, l\u00e9gal, r\u00e9putation.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-likelihood",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Likelihood",
        "definition": "Probabilit\u00e9 d'occurrence",
        "details": "Qualitative ou quantitative.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-appetite",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Appetite",
        "definition": "Niveau de risque acceptable global",
        "details": "Strat\u00e9gique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-tolerance",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Tolerance",
        "definition": "Seuil acceptable sp\u00e9cifique",
        "details": "Plus op\u00e9rationnel.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-register",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Register",
        "definition": "Registre des risques",
        "details": "Suit risques, propri\u00e9taires, traitement.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-acceptance",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Acceptance",
        "definition": "Accepter le risque",
        "details": "Aucun contr\u00f4le suppl\u00e9mentaire.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-avoidance",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Avoidance",
        "definition": "\u00c9viter activit\u00e9 risqu\u00e9e",
        "details": "Arr\u00eater service/processus.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-mitigation",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Mitigation",
        "definition": "R\u00e9duire risque par contr\u00f4les",
        "details": "Firewall, patching, MFA.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-risk-transfer",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Risk Transfer",
        "definition": "Transf\u00e9rer risque",
        "details": "Assurance, outsourcing.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-ale",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "ALE",
        "definition": "Annualized Loss Expectancy",
        "details": "Perte annuelle attendue.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-sle",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "SLE",
        "definition": "Single Loss Expectancy",
        "details": "Perte pour un \u00e9v\u00e9nement.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-aro",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "ARO",
        "definition": "Annualized Rate of Occurrence",
        "details": "Fr\u00e9quence annuelle estim\u00e9e.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-formula",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Formula",
        "definition": "ALE = SLE \u00d7 ARO",
        "details": "\u00c0 conna\u00eetre pour questions risque.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-ef",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "EF",
        "definition": "Exposure Factor",
        "details": "Pourcentage de perte d'un actif.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-av",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "AV",
        "definition": "Asset Value",
        "details": "Valeur d'un actif.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-sle-formula",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "SLE Formula",
        "definition": "SLE = AV \u00d7 EF",
        "details": "Calcul perte unique.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-due-diligence",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Due Diligence",
        "definition": "Faire les v\u00e9rifications n\u00e9cessaires",
        "details": "Responsabilit\u00e9 avant d\u00e9cision.",
        "source": "flashcard cours local import"
      },
      {
        "id": "gouvernance-risque-et-conformite-due-care",
        "themeId": "gouvernance-risque-et-conformite",
        "themeTitle": "Gouvernance, risque et conformit\u00e9",
        "domain": "Security Program Management and Oversight",
        "term": "Due Care",
        "definition": "Appliquer mesures raisonnables",
        "details": "Agir correctement.",
        "source": "flashcard cours local import"
      }
    ]
  },
  {
    "id": "audit-conformite-et-tiers",
    "title": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "items": [
      {
        "id": "audit-conformite-et-tiers-internal-audit",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Internal Audit",
        "definition": "Audit par l'organisation",
        "details": "Pr\u00e9paration/am\u00e9lioration interne.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-external-audit",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "External Audit",
        "definition": "Audit par entit\u00e9 externe",
        "details": "Plus ind\u00e9pendant.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-third-party-assessment",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Third-party Assessment",
        "definition": "\u00c9valuation fournisseur/partenaire",
        "details": "Vendor risk management.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-attestation",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Attestation",
        "definition": "D\u00e9claration/validation formelle",
        "details": "Conformit\u00e9 ou contr\u00f4le.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-right-to-audit-clause",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Right-to-Audit Clause",
        "definition": "Clause permettant auditer un fournisseur",
        "details": "Tr\u00e8s important en contrats tiers.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-vendor-assessment",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Vendor Assessment",
        "definition": "\u00c9valuer s\u00e9curit\u00e9 d'un fournisseur",
        "details": "Questionnaires, audits, preuves.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-vendor-monitoring",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Vendor Monitoring",
        "definition": "Surveiller fournisseur dans le temps",
        "details": "Risque tiers continu.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-supply-chain-risk",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Supply Chain Risk",
        "definition": "Risque venant fournisseurs/MSP/librairies",
        "details": "Tr\u00e8s test\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-data-controller",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Data Controller",
        "definition": "D\u00e9cide pourquoi/comment donn\u00e9es trait\u00e9es",
        "details": "Terme privacy/GDPR-like.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-data-processor",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Data Processor",
        "definition": "Traite donn\u00e9es pour controller",
        "details": "Fournisseur/service.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-data-owner",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Data Owner",
        "definition": "Responsable m\u00e9tier des donn\u00e9es",
        "details": "D\u00e9cide acc\u00e8s/classification.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-data-custodian",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Data Custodian",
        "definition": "Responsable technique de protection",
        "details": "Admin/IT.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-data-subject",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "Data Subject",
        "definition": "Personne concern\u00e9e par les donn\u00e9es",
        "details": "Client/employ\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-pii",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "PII",
        "definition": "Personally Identifiable Information",
        "details": "Donn\u00e9es identifiantes.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-phi",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "PHI",
        "definition": "Protected Health Information",
        "details": "Donn\u00e9es de sant\u00e9.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-pci-dss",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "PCI DSS",
        "definition": "Payment Card Industry Data Security Standard",
        "details": "Paiements/cartes bancaires.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-gdpr",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "GDPR",
        "definition": "General Data Protection Regulation",
        "details": "Protection donn\u00e9es personnelles UE.",
        "source": "flashcard cours local import"
      },
      {
        "id": "audit-conformite-et-tiers-hipaa",
        "themeId": "audit-conformite-et-tiers",
        "themeTitle": "Audit, conformit\u00e9 et tiers",
        "domain": "Security Program Management and Oversight",
        "term": "HIPAA",
        "definition": "Health Insurance Portability and Accountability Act",
        "details": "Sant\u00e9 US.",
        "source": "flashcard cours local import"
      }
    ]
  }
] satisfies StudyTheme[];

export const studyItems = [
  {
    "id": "concepts-fondamentaux-de-securite-cia-triad",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "CIA Triad",
    "definition": "Confidentiality, Integrity, Availability",
    "details": "Base de la s\u00e9curit\u00e9. Confidentiality = emp\u00eacher lecture non autoris\u00e9e. Integrity = emp\u00eacher modification non autoris\u00e9e. Availability = garantir acc\u00e8s aux services.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-confidentiality",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Confidentiality",
    "definition": "Protection contre l'acc\u00e8s non autoris\u00e9 aux donn\u00e9es",
    "details": "Exemples : encryption, access control, data masking.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-integrity",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Integrity",
    "definition": "Garantie que les donn\u00e9es ne sont pas modifi\u00e9es sans autorisation",
    "details": "Exemples : hashing, digital signature, file integrity monitoring.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-availability",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Availability",
    "definition": "Disponibilit\u00e9 des syst\u00e8mes et donn\u00e9es",
    "details": "Exemples : redundancy, backup, clustering, load balancing, UPS.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-aaa",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "AAA",
    "definition": "Authentication, Authorization, Accounting",
    "details": "Tr\u00e8s fr\u00e9quent \u00e0 l'examen. Authentication = qui es-tu ? Authorization = que peux-tu faire ? Accounting = qu'as-tu fait ?",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-authentication",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Authentication",
    "definition": "V\u00e9rification de l'identit\u00e9",
    "details": "Mot de passe, certificat, biom\u00e9trie, token.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-authorization",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Authorization",
    "definition": "Attribution des permissions",
    "details": "RBAC, ABAC, DAC, MAC.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-accounting",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Accounting",
    "definition": "Journalisation des actions",
    "details": "Logs, audit trails, SIEM.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-non-repudiation",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Non-repudiation",
    "definition": "Emp\u00eache quelqu'un de nier une action",
    "details": "Digital signature + logs sign\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-gap-analysis",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Gap Analysis",
    "definition": "Comparaison entre l'\u00e9tat actuel et l'\u00e9tat d\u00e9sir\u00e9",
    "details": "Sert \u00e0 identifier les \u00e9carts de s\u00e9curit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-zero-trust",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Zero Trust",
    "definition": "Mod\u00e8le \"never trust, always verify\"",
    "details": "V\u00e9rifier chaque utilisateur, appareil et requ\u00eate, m\u00eame en interne.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-control-plane",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Control Plane",
    "definition": "Partie d\u00e9cisionnelle du Zero Trust",
    "details": "Policy engine, policy administrator, adaptive identity.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-data-plane",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Data Plane",
    "definition": "Partie o\u00f9 les acc\u00e8s sont appliqu\u00e9s",
    "details": "Policy enforcement point, subject/system, ressources.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-policy-engine",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Policy Engine",
    "definition": "D\u00e9cide si l'acc\u00e8s est autoris\u00e9",
    "details": "Analyse identit\u00e9, contexte, posture de s\u00e9curit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-policy-administrator",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Policy Administrator",
    "definition": "Applique la d\u00e9cision d'acc\u00e8s",
    "details": "Configure ou \u00e9tablit la session.",
    "source": "flashcard cours local import"
  },
  {
    "id": "concepts-fondamentaux-de-securite-policy-enforcement-point",
    "themeId": "concepts-fondamentaux-de-securite",
    "themeTitle": "Concepts fondamentaux de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Policy Enforcement Point",
    "definition": "Point qui autorise ou bloque l'acc\u00e8s",
    "details": "Exemple : proxy, gateway, agent Zero Trust.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-technical-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Technical Control",
    "definition": "Contr\u00f4le appliqu\u00e9 par technologie",
    "details": "Firewall, IDS, IPS, encryption, antivirus.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-managerial-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Managerial Control",
    "definition": "Contr\u00f4le li\u00e9 \u00e0 la gouvernance",
    "details": "Policies, risk assessment, vendor management.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-operational-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Operational Control",
    "definition": "Contr\u00f4le appliqu\u00e9 par des personnes/processus",
    "details": "Security guard, awareness training, incident response.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-physical-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Physical Control",
    "definition": "Contr\u00f4le prot\u00e9geant l'environnement physique",
    "details": "Locks, fencing, bollards, CCTV, badge readers.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-preventive-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Preventive Control",
    "definition": "Emp\u00eache un incident",
    "details": "Firewall, IPS, access control, MFA.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-detective-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Detective Control",
    "definition": "D\u00e9tecte un incident",
    "details": "IDS, logs, SIEM, CCTV.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-corrective-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Corrective Control",
    "definition": "Corrige apr\u00e8s incident",
    "details": "Restore from backup, patching, reimaging.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-deterrent-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Deterrent Control",
    "definition": "D\u00e9courage une attaque",
    "details": "Warning banner, lighting, visible cameras.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-compensating-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Compensating Control",
    "definition": "Alternative quand le contr\u00f4le principal est impossible",
    "details": "Isoler un vieux serveur non patchable.",
    "source": "flashcard cours local import"
  },
  {
    "id": "types-de-controles-de-securite-directive-control",
    "themeId": "types-de-controles-de-securite",
    "themeTitle": "Types de contr\u00f4les de s\u00e9curit\u00e9",
    "domain": "General Security Concepts",
    "term": "Directive Control",
    "definition": "Donne des instructions",
    "details": "Policy, procedure, login banner.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-bollards",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Bollards",
    "definition": "Poteaux anti-v\u00e9hicules",
    "details": "Prot\u00e8gent contre attaques ou accidents avec voiture.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-access-control-vestibule-mantrap",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Access Control Vestibule / Mantrap",
    "definition": "Deux portes successives contr\u00f4lant l'acc\u00e8s",
    "details": "Emp\u00eache tailgating/piggybacking.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-fencing",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Fencing",
    "definition": "Barri\u00e8re physique",
    "details": "Contr\u00f4le/dissuasion p\u00e9rim\u00e9trique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-video-surveillance-cctv",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Video Surveillance / CCTV",
    "definition": "Cam\u00e9ras de surveillance",
    "details": "Detective + deterrent.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-security-guard",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Security Guard",
    "definition": "Agent de s\u00e9curit\u00e9",
    "details": "Operational control, pas physical selon CompTIA.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-access-badge",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Access Badge",
    "definition": "Carte d'acc\u00e8s",
    "details": "Physical/technical selon contexte. Souvent utilis\u00e9 avec RFID.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-lighting",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Lighting",
    "definition": "\u00c9clairage de s\u00e9curit\u00e9",
    "details": "Deterrent control.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-infrared-sensor",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Infrared Sensor",
    "definition": "Capteur bas\u00e9 sur chaleur",
    "details": "D\u00e9tecte chaleur/corps humain.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-pressure-sensor",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Pressure Sensor",
    "definition": "Capteur de pression",
    "details": "D\u00e9tecte poids/pas.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-microwave-sensor",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Microwave Sensor",
    "definition": "Capteur par ondes micro-ondes",
    "details": "Peut couvrir grandes zones, parfois traverse certains mat\u00e9riaux.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-physique-ultrasonic-sensor",
    "themeId": "securite-physique",
    "themeTitle": "S\u00e9curit\u00e9 physique",
    "domain": "General Security Concepts",
    "term": "Ultrasonic Sensor",
    "definition": "Capteur par ultrasons",
    "details": "D\u00e9tecte mouvement via ondes sonores.",
    "source": "flashcard cours local import"
  },
  {
    "id": "deception-and-disruption-honeypot",
    "themeId": "deception-and-disruption",
    "themeTitle": "Deception and disruption",
    "domain": "General Security Concepts",
    "term": "Honeypot",
    "definition": "Faux syst\u00e8me vuln\u00e9rable pour attirer attaquants",
    "details": "Sert \u00e0 observer TTPs et d\u00e9tecter intrusion.",
    "source": "flashcard cours local import"
  },
  {
    "id": "deception-and-disruption-honeynet",
    "themeId": "deception-and-disruption",
    "themeTitle": "Deception and disruption",
    "domain": "General Security Concepts",
    "term": "Honeynet",
    "definition": "R\u00e9seau de honeypots",
    "details": "Simule un environnement plus r\u00e9aliste.",
    "source": "flashcard cours local import"
  },
  {
    "id": "deception-and-disruption-honeyfile",
    "themeId": "deception-and-disruption",
    "themeTitle": "Deception and disruption",
    "domain": "General Security Concepts",
    "term": "Honeyfile",
    "definition": "Fichier leurre surveill\u00e9",
    "details": "Exemple : passwords.xlsx surveill\u00e9 par DLP/SIEM.",
    "source": "flashcard cours local import"
  },
  {
    "id": "deception-and-disruption-honeytoken",
    "themeId": "deception-and-disruption",
    "themeTitle": "Deception and disruption",
    "domain": "General Security Concepts",
    "term": "Honeytoken",
    "definition": "Donn\u00e9e leurre surveill\u00e9e",
    "details": "Faux identifiant, fausse cl\u00e9 API, fausse entr\u00e9e DB.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-pki",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "PKI",
    "definition": "Public Key Infrastructure",
    "details": "Infrastructure de certificats, cl\u00e9s publiques/priv\u00e9es, CA, CRL, OCSP.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-public-key",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Public Key",
    "definition": "Cl\u00e9 publique",
    "details": "Sert \u00e0 chiffrer pour le destinataire ou v\u00e9rifier une signature.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-private-key",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Private Key",
    "definition": "Cl\u00e9 priv\u00e9e",
    "details": "Sert \u00e0 d\u00e9chiffrer ou signer. Doit rester secr\u00e8te.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-ca",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "CA",
    "definition": "Certificate Authority",
    "details": "Autorit\u00e9 qui \u00e9met les certificats num\u00e9riques.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-csr",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "CSR",
    "definition": "Certificate Signing Request",
    "details": "Demande envoy\u00e9e \u00e0 une CA pour obtenir un certificat.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-crl",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "CRL",
    "definition": "Certificate Revocation List",
    "details": "Liste des certificats r\u00e9voqu\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-ocsp",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "OCSP",
    "definition": "Online Certificate Status Protocol",
    "details": "V\u00e9rifie le statut d'un certificat en temps r\u00e9el.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-root-of-trust",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Root of Trust",
    "definition": "Point de confiance initial",
    "details": "Base de validation d'une cha\u00eene de certificats.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-self-signed-certificate",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Self-signed Certificate",
    "definition": "Certificat sign\u00e9 par lui-m\u00eame",
    "details": "OK en lab/interne, risqu\u00e9 en public car non approuv\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-wildcard-certificate",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Wildcard Certificate",
    "definition": "Certificat pour plusieurs sous-domaines",
    "details": "Exemple : *.example.com. Si compromis, tous les sous-domaines sont \u00e0 risque.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-symmetric-encryption",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Symmetric Encryption",
    "definition": "M\u00eame cl\u00e9 pour chiffrer/d\u00e9chiffrer",
    "details": "Rapide. Exemple : AES.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-asymmetric-encryption",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Asymmetric Encryption",
    "definition": "Paire cl\u00e9 publique/priv\u00e9e",
    "details": "Plus lent, utile pour \u00e9change de cl\u00e9s/signature.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-aes",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "AES",
    "definition": "Advanced Encryption Standard",
    "details": "Algorithme sym\u00e9trique recommand\u00e9. AES-256 souvent cit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-rsa",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "RSA",
    "definition": "Algorithme asym\u00e9trique",
    "details": "Chiffrement, signatures, \u00e9change de cl\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-ecc",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "ECC",
    "definition": "Elliptic Curve Cryptography",
    "details": "Crypto asym\u00e9trique efficace avec cl\u00e9s plus petites.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-diffie-hellman",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Diffie-Hellman",
    "definition": "\u00c9change de cl\u00e9s",
    "details": "Permet d'\u00e9tablir un secret partag\u00e9 sans l'envoyer directement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-hashing",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Hashing",
    "definition": "Fonction \u00e0 sens unique produisant une empreinte",
    "details": "Sert \u00e0 v\u00e9rifier l'int\u00e9grit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-sha-256",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "SHA-256",
    "definition": "Secure Hash Algorithm 256 bits",
    "details": "Hash moderne recommand\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-md5-sha-1",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "MD5 / SHA-1",
    "definition": "Anciens algorithmes de hash",
    "details": "\u00c0 \u00e9viter : collisions connues/faiblesse.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-salt",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Salt",
    "definition": "Valeur al\u00e9atoire ajout\u00e9e au mot de passe avant hash",
    "details": "Emp\u00eache hashes identiques et rainbow tables.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-key-stretching",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Key Stretching",
    "definition": "Rend le cracking plus lent",
    "details": "PBKDF2, bcrypt, scrypt, Argon2.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-hmac",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "HMAC",
    "definition": "Hash-based Message Authentication Code",
    "details": "Int\u00e9grit\u00e9 + authenticit\u00e9 avec cl\u00e9 secr\u00e8te.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-digital-signature",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Digital Signature",
    "definition": "Signature avec cl\u00e9 priv\u00e9e",
    "details": "Fournit int\u00e9grit\u00e9, authenticit\u00e9, non-r\u00e9pudiation.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-tpm",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "TPM",
    "definition": "Trusted Platform Module",
    "details": "Puce s\u00e9curis\u00e9e pour cl\u00e9s, BitLocker, secure boot.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-hsm",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "HSM",
    "definition": "Hardware Security Module",
    "details": "Module mat\u00e9riel pour prot\u00e9ger cl\u00e9s critiques c\u00f4t\u00e9 serveur/entreprise.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-kms",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "KMS",
    "definition": "Key Management System",
    "details": "Gestion centralis\u00e9e des cl\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-secure-enclave",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Secure Enclave",
    "definition": "Zone isol\u00e9e pour op\u00e9rations sensibles",
    "details": "Souvent associ\u00e9 aux appareils mobiles/Apple.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-steganography",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Steganography",
    "definition": "Cacher un message dans un fichier/image/audio",
    "details": "Obfuscation, pas chiffrement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-tokenization",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Tokenization",
    "definition": "Remplace donn\u00e9e sensible par token sans valeur",
    "details": "Tr\u00e8s utilis\u00e9 pour cartes bancaires.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-data-masking",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Data Masking",
    "definition": "Masque une partie de la donn\u00e9e",
    "details": "Exemple : XXXX-XXXX-XXXX-1234.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-blockchain",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Blockchain",
    "definition": "Registre distribu\u00e9 immuable",
    "details": "Tra\u00e7abilit\u00e9, int\u00e9grit\u00e9, open public ledger.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cryptographie-et-pki-open-public-ledger",
    "themeId": "cryptographie-et-pki",
    "themeTitle": "Cryptographie et PKI",
    "domain": "General Security Concepts",
    "term": "Open Public Ledger",
    "definition": "Registre public consultable",
    "details": "Transactions visibles et difficiles \u00e0 modifier.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-nation-state",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Nation-State",
    "definition": "Acteur soutenu par un \u00c9tat",
    "details": "Tr\u00e8s sophistiqu\u00e9, espionnage, guerre, sabotage.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-organized-crime",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Organized Crime",
    "definition": "Groupe criminel structur\u00e9",
    "details": "Motivation principale : gain financier.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-hacktivist",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Hacktivist",
    "definition": "Attaquant motiv\u00e9 par cause politique/sociale",
    "details": "Defacement, leaks, DDoS.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-insider-threat",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Insider Threat",
    "definition": "Menace interne",
    "details": "Employ\u00e9, prestataire, utilisateur l\u00e9gitime.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-unskilled-attacker-script-kiddie",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Unskilled Attacker / Script Kiddie",
    "definition": "Attaquant peu qualifi\u00e9 utilisant outils existants",
    "details": "Opportuniste.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-shadow-it",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Shadow IT",
    "definition": "Technologies utilis\u00e9es sans approbation IT",
    "details": "Risque de fuite, mauvaise configuration, non-conformit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-espionage",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Espionage",
    "definition": "Vol d'informations strat\u00e9giques",
    "details": "Associ\u00e9 nation-state/competitors.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-data-exfiltration",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Data Exfiltration",
    "definition": "Sortie non autoris\u00e9e de donn\u00e9es",
    "details": "D\u00e9tect\u00e9e par DLP, logs, SIEM.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-blackmail",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Blackmail",
    "definition": "Chantage",
    "details": "Souvent ransomware/extortion.",
    "source": "flashcard cours local import"
  },
  {
    "id": "menaces-acteurs-et-motivations-revenge",
    "themeId": "menaces-acteurs-et-motivations",
    "themeTitle": "Menaces, acteurs et motivations",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Revenge",
    "definition": "Vengeance",
    "details": "Souvent insider threat.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-phishing",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Phishing",
    "definition": "Hame\u00e7onnage par email/message",
    "details": "Attaque large.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-spear-phishing",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Spear Phishing",
    "definition": "Phishing cibl\u00e9",
    "details": "Vise une personne/groupe pr\u00e9cis.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-whaling",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Whaling",
    "definition": "Phishing ciblant dirigeants",
    "details": "CEO, CFO, cadres.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-vishing",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Vishing",
    "definition": "Phishing par appel vocal",
    "details": "Voice phishing.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-smishing",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Smishing",
    "definition": "Phishing par SMS",
    "details": "SMS + lien malveillant.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-pretexting",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Pretexting",
    "definition": "Faux sc\u00e9nario pour obtenir infos",
    "details": "Exemple : faux technicien IT.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-impersonation",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Impersonation",
    "definition": "Usurpation d'identit\u00e9",
    "details": "Se faire passer pour une autorit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-tailgating",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Tailgating",
    "definition": "Suivre quelqu'un sans autorisation",
    "details": "Contournement contr\u00f4le physique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-piggybacking",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Piggybacking",
    "definition": "Suivre quelqu'un avec son consentement implicite",
    "details": "Variante de tailgating.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-dumpster-diving",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Dumpster Diving",
    "definition": "Fouille des poubelles",
    "details": "Recherche documents, badges, infos.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-shoulder-surfing",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Shoulder Surfing",
    "definition": "Observer par-dessus l'\u00e9paule",
    "details": "Vol PIN/mot de passe.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-watering-hole",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Watering Hole",
    "definition": "Compromettre un site fr\u00e9quent\u00e9 par la cible",
    "details": "Attaque indirecte.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-typosquatting",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Typosquatting",
    "definition": "Domaine ressemblant \u00e0 un vrai domaine",
    "details": "Exemple : g00gle.com.",
    "source": "flashcard cours local import"
  },
  {
    "id": "social-engineering-business-email-compromise-bec",
    "themeId": "social-engineering",
    "themeTitle": "Social Engineering",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Business Email Compromise (BEC)",
    "definition": "Fraude via email professionnel compromis/usurp\u00e9",
    "details": "Souvent demande de virement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-virus",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Virus",
    "definition": "Malware qui s'attache \u00e0 un fichier/programme",
    "details": "N\u00e9cessite souvent action utilisateur.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-worm",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Worm",
    "definition": "Malware auto-r\u00e9plicatif r\u00e9seau",
    "details": "Se propage seul.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-trojan",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Trojan",
    "definition": "Programme apparemment l\u00e9gitime mais malveillant",
    "details": "Pi\u00e8ge classique : spreadsheet/vendor file.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-rat",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "RAT",
    "definition": "Remote Access Trojan",
    "details": "Donne contr\u00f4le distant \u00e0 l'attaquant.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-ransomware",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Ransomware",
    "definition": "Chiffre ou bloque donn\u00e9es contre ran\u00e7on",
    "details": "Impact disponibilit\u00e9/confidentialit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-spyware",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Spyware",
    "definition": "Espionne activit\u00e9 utilisateur",
    "details": "Collecte infos.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-keylogger",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Keylogger",
    "definition": "Capture frappes clavier",
    "details": "Vol identifiants.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-rootkit",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Rootkit",
    "definition": "Cache pr\u00e9sence malveillante avec privil\u00e8ges \u00e9lev\u00e9s",
    "details": "Tr\u00e8s difficile \u00e0 d\u00e9tecter.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-logic-bomb",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Logic Bomb",
    "definition": "Code d\u00e9clench\u00e9 par condition/date",
    "details": "Souvent insider.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-bloatware",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Bloatware",
    "definition": "Logiciel inutile pr\u00e9install\u00e9",
    "details": "Augmente surface d'attaque.",
    "source": "flashcard cours local import"
  },
  {
    "id": "malware-et-attaques-pup",
    "themeId": "malware-et-attaques",
    "themeTitle": "Malware et attaques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "PUP",
    "definition": "Potentially Unwanted Program",
    "details": "Programme ind\u00e9sirable, pas toujours malware strict.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-dos",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "DoS",
    "definition": "Denial of Service",
    "details": "Rend service indisponible.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-ddos",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "DDoS",
    "definition": "Distributed Denial of Service",
    "details": "DoS depuis plusieurs sources.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-syn-flood",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "SYN Flood",
    "definition": "Attaque TCP consommant connexions semi-ouvertes",
    "details": "Vise disponibilit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-on-path-mitm",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "On-path / MITM",
    "definition": "Attaquant intercepte/modifie communications",
    "details": "Certificat invalide peut \u00eatre indice.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-replay-attack",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Replay Attack",
    "definition": "R\u00e9utilisation d'une communication captur\u00e9e",
    "details": "Contr\u00e9 par nonce/timestamp.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-session-replay",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Session Replay",
    "definition": "R\u00e9utilisation d'une session valide",
    "details": "Cookies/tokens vol\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-arp-poisoning",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "ARP Poisoning",
    "definition": "Empoisonnement ARP LAN",
    "details": "Redirige trafic vers attaquant.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-dns-poisoning",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "DNS Poisoning",
    "definition": "R\u00e9ponses DNS falsifi\u00e9es",
    "details": "Redirige vers mauvaise IP.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-domain-hijacking",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Domain Hijacking",
    "definition": "Prise de contr\u00f4le d'un domaine",
    "details": "Modifier DNS/registre.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-ssl-stripping",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "SSL Stripping",
    "definition": "Forcer HTTP au lieu de HTTPS",
    "details": "Downgrade attaque.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-sql-injection",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "SQL Injection",
    "definition": "Injection de requ\u00eates SQL",
    "details": "Exemple : ' OR '1'='1.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-xss",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "XSS",
    "definition": "Cross-Site Scripting",
    "details": "Injection script c\u00f4t\u00e9 navigateur.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-csrf",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "CSRF",
    "definition": "Cross-Site Request Forgery",
    "details": "Force utilisateur authentifi\u00e9 \u00e0 faire une action.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-directory-traversal",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Directory Traversal",
    "definition": "Acc\u00e8s fichiers via chemins ../",
    "details": "Exemple : /../../etc/passwd.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-buffer-overflow",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Buffer Overflow",
    "definition": "Trop de donn\u00e9es dans m\u00e9moire tampon",
    "details": "Peut ex\u00e9cuter code arbitraire.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-race-condition",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Race Condition",
    "definition": "R\u00e9sultat d\u00e9pend du timing",
    "details": "TOCTOU classique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-privilege-escalation",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Privilege Escalation",
    "definition": "Obtenir privil\u00e8ges sup\u00e9rieurs",
    "details": "Verticale ou horizontale.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-pass-the-hash",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Pass-the-Hash",
    "definition": "Utiliser un hash NTLM au lieu du mot de passe",
    "details": "Attaque Windows/AD.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-birthday-attack",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Birthday Attack",
    "definition": "Exploite probabilit\u00e9 de collision hash",
    "details": "Li\u00e9 int\u00e9grit\u00e9/hash.",
    "source": "flashcard cours local import"
  },
  {
    "id": "attaques-reseau-et-application-downgrade-attack",
    "themeId": "attaques-reseau-et-application",
    "themeTitle": "Attaques r\u00e9seau et application",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "term": "Downgrade Attack",
    "definition": "Force protocole/version plus faible",
    "details": "Exemple TLS vers SSL.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-firewall",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "Firewall",
    "definition": "Filtre trafic selon r\u00e8gles",
    "details": "Preventive technical control.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-ngfw",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "NGFW",
    "definition": "Next-Generation Firewall",
    "details": "Firewall avanc\u00e9 : app awareness, IPS, inspection.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-waf",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "WAF",
    "definition": "Web Application Firewall",
    "details": "Prot\u00e8ge applications web contre SQLi, XSS, etc.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-ids",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "IDS",
    "definition": "Intrusion Detection System",
    "details": "D\u00e9tecte, alerte, n'interrompt pas forc\u00e9ment.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-ips",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "IPS",
    "definition": "Intrusion Prevention System",
    "details": "Bloque activement, souvent inline.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-nids",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "NIDS",
    "definition": "Network IDS",
    "details": "IDS plac\u00e9 sur r\u00e9seau.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-hids",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "HIDS",
    "definition": "Host IDS",
    "details": "IDS sur endpoint/serveur.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-acl",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "ACL",
    "definition": "Access Control List",
    "details": "Liste de r\u00e8gles allow/deny.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-vlan",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "VLAN",
    "definition": "Virtual LAN",
    "details": "Segmentation logique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-dmz-screened-subnet",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "DMZ / Screened Subnet",
    "definition": "Zone expos\u00e9e contr\u00f4l\u00e9e",
    "details": "Pour serveurs publics : web, mail, DNS.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-nat",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "NAT",
    "definition": "Network Address Translation",
    "details": "Traduction IP priv\u00e9e/publique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-vpn",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "VPN",
    "definition": "Virtual Private Network",
    "details": "Tunnel s\u00e9curis\u00e9 distant/site-\u00e0-site.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-ipsec",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "IPsec",
    "definition": "Suite de protocoles VPN",
    "details": "S\u00e9curise couche r\u00e9seau.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-ssl-tls-vpn",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "SSL/TLS VPN",
    "definition": "VPN via TLS",
    "details": "Souvent portail ou client remote access.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-split-tunnel",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "Split Tunnel",
    "definition": "Seul trafic entreprise passe VPN",
    "details": "Meilleure performance, moins s\u00e9curis\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-full-tunnel",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "Full Tunnel",
    "definition": "Tout trafic passe par VPN",
    "details": "Plus s\u00e9curis\u00e9, plus lourd.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-sase",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "SASE",
    "definition": "Secure Access Service Edge",
    "details": "S\u00e9curit\u00e9 r\u00e9seau cloud pour utilisateurs distribu\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-sdn",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "SDN",
    "definition": "Software-Defined Networking",
    "details": "R\u00e9seau pilot\u00e9 par logiciel.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-nac",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "NAC",
    "definition": "Network Access Control",
    "details": "V\u00e9rifie posture appareil avant acc\u00e8s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-802-1x",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "802.1X",
    "definition": "Contr\u00f4le d'acc\u00e8s r\u00e9seau",
    "details": "Authentification port r\u00e9seau/Wi-Fi Enterprise.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-radius",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "RADIUS",
    "definition": "Protocole AAA r\u00e9seau",
    "details": "Centralise auth Wi-Fi/VPN.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-tacacs",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "TACACS+",
    "definition": "AAA pour \u00e9quipements r\u00e9seau",
    "details": "S\u00e9pare authentication/authorization/accounting.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-proxy",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "Proxy",
    "definition": "Interm\u00e9diaire client-serveur",
    "details": "Filtrage, anonymisation, contr\u00f4le.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-reverse-proxy",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "Reverse Proxy",
    "definition": "Proxy c\u00f4t\u00e9 serveur",
    "details": "Prot\u00e8ge et r\u00e9partit acc\u00e8s aux serveurs.",
    "source": "flashcard cours local import"
  },
  {
    "id": "securite-reseau-load-balancer",
    "themeId": "securite-reseau",
    "themeTitle": "S\u00e9curit\u00e9 r\u00e9seau",
    "domain": "Security Architecture",
    "term": "Load Balancer",
    "definition": "R\u00e9partit trafic",
    "details": "Availability, performance, HA.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-wpa2",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "WPA2",
    "definition": "Standard Wi-Fi s\u00e9curis\u00e9 ancien",
    "details": "Utilise souvent CCMP/AES.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-wpa3",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "WPA3",
    "definition": "Standard Wi-Fi plus r\u00e9cent",
    "details": "SAE, meilleure protection.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-psk",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "PSK",
    "definition": "Pre-Shared Key",
    "details": "Mot de passe partag\u00e9 Wi-Fi.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-enterprise-wi-fi",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "Enterprise Wi-Fi",
    "definition": "Wi-Fi avec 802.1X/RADIUS",
    "details": "Chaque utilisateur s'authentifie individuellement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-evil-twin",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "Evil Twin",
    "definition": "Faux point d'acc\u00e8s imitant le vrai",
    "details": "Vol identifiants/traffic interception.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-rogue-ap",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "Rogue AP",
    "definition": "Point d'acc\u00e8s non autoris\u00e9",
    "details": "Risque Shadow IT.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-deauthentication-attack",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "Deauthentication Attack",
    "definition": "Force d\u00e9connexion Wi-Fi",
    "details": "Peut pr\u00e9parer Evil Twin/capture handshake.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-jamming",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "Jamming",
    "definition": "Brouillage radio",
    "details": "Atteinte disponibilit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-wps-attack",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "WPS Attack",
    "definition": "Exploitation Wi-Fi Protected Setup",
    "details": "PIN WPS faible.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-mdm",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "MDM",
    "definition": "Mobile Device Management",
    "details": "Gestion politiques mobiles : lock, wipe, encryption.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-mam",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "MAM",
    "definition": "Mobile Application Management",
    "details": "Gestion applications mobiles.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-byod",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "BYOD",
    "definition": "Bring Your Own Device",
    "details": "Appareil personnel au travail.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-cope",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "COPE",
    "definition": "Corporate-Owned, Personally Enabled",
    "details": "Appareil entreprise, usage perso autoris\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-cyod",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "CYOD",
    "definition": "Choose Your Own Device",
    "details": "Utilisateur choisit dans liste approuv\u00e9e.",
    "source": "flashcard cours local import"
  },
  {
    "id": "wi-fi-et-mobile-jailbreaking-rooting",
    "themeId": "wi-fi-et-mobile",
    "themeTitle": "Wi-Fi et mobile",
    "domain": "Security Architecture",
    "term": "Jailbreaking/Rooting",
    "definition": "Retirer restrictions OS mobile",
    "details": "Augmente risque s\u00e9curit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-iaas",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "IaaS",
    "definition": "Infrastructure as a Service",
    "details": "Client g\u00e8re OS, apps, data ; fournisseur g\u00e8re infra.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-paas",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "PaaS",
    "definition": "Platform as a Service",
    "details": "Client g\u00e8re apps/data ; fournisseur g\u00e8re OS/runtime.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-saas",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "SaaS",
    "definition": "Software as a Service",
    "details": "Client utilise application ; fournisseur g\u00e8re presque tout.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-public-cloud",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Public Cloud",
    "definition": "Cloud partag\u00e9 public",
    "details": "AWS/Azure/GCP.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-private-cloud",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Private Cloud",
    "definition": "Cloud d\u00e9di\u00e9 organisation",
    "details": "Plus de contr\u00f4le.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-hybrid-cloud",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Hybrid Cloud",
    "definition": "M\u00e9lange on-prem + cloud",
    "details": "Attention mismatch controls/network protection.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-multi-cloud",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Multi-cloud",
    "definition": "Plusieurs fournisseurs cloud",
    "details": "R\u00e9duit d\u00e9pendance, augmente complexit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-casb",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "CASB",
    "definition": "Cloud Access Security Broker",
    "details": "Contr\u00f4le acc\u00e8s cloud, visibilit\u00e9, DLP cloud.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-iac",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "IaC",
    "definition": "Infrastructure as Code",
    "details": "D\u00e9ployer infra par code. Risque : mauvaises configs propag\u00e9es.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-serverless",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Serverless",
    "definition": "Ex\u00e9cution sans gestion serveur visible",
    "details": "Responsabilit\u00e9 change, d\u00e9pendance fournisseur.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-containerization",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Containerization",
    "definition": "Applications isol\u00e9es en containers",
    "details": "Plus l\u00e9ger que VM.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-microservices",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Microservices",
    "definition": "Application divis\u00e9e en petits services",
    "details": "Plus flexible, augmente surface API.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-api",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "API",
    "definition": "Application Programming Interface",
    "details": "Interface d'\u00e9change applicatif. \u00c0 s\u00e9curiser fortement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-scada",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "SCADA",
    "definition": "Supervisory Control and Data Acquisition",
    "details": "Syst\u00e8mes industriels critiques.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-ics",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "ICS",
    "definition": "Industrial Control Systems",
    "details": "Syst\u00e8mes de contr\u00f4le industriel.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-iot",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "IoT",
    "definition": "Internet of Things",
    "details": "Appareils connect\u00e9s souvent peu s\u00e9curis\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-rtos",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "RTOS",
    "definition": "Real-Time Operating System",
    "details": "OS temps r\u00e9el pour syst\u00e8mes embarqu\u00e9s/industriels.",
    "source": "flashcard cours local import"
  },
  {
    "id": "cloud-et-architecture-embedded-system",
    "themeId": "cloud-et-architecture",
    "themeTitle": "Cloud et architecture",
    "domain": "Security Architecture",
    "term": "Embedded System",
    "definition": "Syst\u00e8me informatique int\u00e9gr\u00e9 \u00e0 \u00e9quipement",
    "details": "Contraintes patching, CPU, m\u00e9moire.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-ha",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "HA",
    "definition": "High Availability",
    "details": "Architecture limitant interruptions.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-redundancy",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Redundancy",
    "definition": "Composants en double",
    "details": "\u00c9vite single point of failure.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-spof",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "SPOF",
    "definition": "Single Point of Failure",
    "details": "\u00c9l\u00e9ment unique dont la panne arr\u00eate le service.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-failover",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Failover",
    "definition": "Basculement vers syst\u00e8me secondaire",
    "details": "Continuit\u00e9 de service.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-clustering",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Clustering",
    "definition": "Groupe de serveurs travaillant ensemble",
    "details": "HA/performance.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-raid-0",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "RAID 0",
    "definition": "Striping sans redondance",
    "details": "Performance, pas s\u00e9curit\u00e9 disponibilit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-raid-1",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "RAID 1",
    "definition": "Mirroring",
    "details": "Redondance disque.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-raid-5-6",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "RAID 5/6",
    "definition": "Parit\u00e9",
    "details": "Tol\u00e9rance panne disque.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-raid-10",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "RAID 10",
    "definition": "Mirroring + striping",
    "details": "Performance + redondance.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-ups",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "UPS",
    "definition": "Uninterruptible Power Supply",
    "details": "Batterie temporaire contre coupure.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-generator",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Generator",
    "definition": "G\u00e9n\u00e9rateur \u00e9lectrique",
    "details": "Continuit\u00e9 plus longue.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-backup-full",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Backup Full",
    "definition": "Sauvegarde compl\u00e8te",
    "details": "Restauration simple mais longue \u00e0 faire.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-backup-incremental",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Backup Incremental",
    "definition": "Sauvegarde changements depuis dernier backup",
    "details": "Rapide \u00e0 faire, restauration plus longue.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-backup-differential",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Backup Differential",
    "definition": "Changements depuis dernier full",
    "details": "Restauration plus simple qu'incr\u00e9mental.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-snapshot",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Snapshot",
    "definition": "\u00c9tat instantan\u00e9 d'un syst\u00e8me",
    "details": "Utile rollback rapide, pas toujours backup complet.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-replication",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Replication",
    "definition": "Copie continue vers autre site/syst\u00e8me",
    "details": "Disponibilit\u00e9/r\u00e9cup\u00e9ration.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-journaling",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Journaling",
    "definition": "Journal des transactions",
    "details": "R\u00e9duit corruption apr\u00e8s panne.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-rto",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "RTO",
    "definition": "Recovery Time Objective",
    "details": "Temps maximal pour restaurer service.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-rpo",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "RPO",
    "definition": "Recovery Point Objective",
    "details": "Quantit\u00e9 maximale de donn\u00e9es perdues acceptable.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-mtbf",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "MTBF",
    "definition": "Mean Time Between Failures",
    "details": "Temps moyen entre pannes.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-mttr",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "MTTR",
    "definition": "Mean Time To Repair/Recover",
    "details": "Temps moyen de r\u00e9paration/r\u00e9cup\u00e9ration.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-bia",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "BIA",
    "definition": "Business Impact Analysis",
    "details": "Identifie impacts m\u00e9tier d'une interruption.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-coop",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "COOP",
    "definition": "Continuity of Operations Plan",
    "details": "Continuer op\u00e9rations malgr\u00e9 incident.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-drp",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "DRP",
    "definition": "Disaster Recovery Plan",
    "details": "Restauration apr\u00e8s sinistre.",
    "source": "flashcard cours local import"
  },
  {
    "id": "resilience-sauvegarde-et-continuite-tabletop-exercise",
    "themeId": "resilience-sauvegarde-et-continuite",
    "themeTitle": "R\u00e9silience, sauvegarde et continuit\u00e9",
    "domain": "Security Architecture",
    "term": "Tabletop Exercise",
    "definition": "Simulation th\u00e9orique autour d'une table",
    "details": "Tester plan sans toucher prod.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-secure-baseline",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Secure Baseline",
    "definition": "Configuration s\u00e9curis\u00e9e de r\u00e9f\u00e9rence",
    "details": "Point de d\u00e9part hardening.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-hardening",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Hardening",
    "definition": "R\u00e9duction surface d'attaque",
    "details": "D\u00e9sactiver services, patcher, config s\u00e9curis\u00e9e.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-patch-management",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Patch Management",
    "definition": "Gestion des correctifs",
    "details": "Tester, approuver, d\u00e9ployer, valider.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-allow-list",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Allow List",
    "definition": "Liste de ce qui est autoris\u00e9",
    "details": "Plus s\u00e9curis\u00e9, plus difficile \u00e0 maintenir.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-deny-list-block-list",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Deny List / Block List",
    "definition": "Liste de ce qui est bloqu\u00e9",
    "details": "Plus simple mais moins strict.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-configuration-enforcement",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Configuration Enforcement",
    "definition": "Imposer config conforme",
    "details": "NAC, GPO, MDM, posture checks.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-vulnerability-scan",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Vulnerability Scan",
    "definition": "Recherche automatis\u00e9e de vuln\u00e9rabilit\u00e9s",
    "details": "Credentialed vs non-credentialed.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-credentialed-scan",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Credentialed Scan",
    "definition": "Scan avec identifiants",
    "details": "Plus pr\u00e9cis.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-non-credentialed-scan",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Non-Credentialed Scan",
    "definition": "Scan externe sans acc\u00e8s interne",
    "details": "Vue attaquant externe.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-penetration-test",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Penetration Test",
    "definition": "Exploitation contr\u00f4l\u00e9e de vuln\u00e9rabilit\u00e9s",
    "details": "Valide exploitabilit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-rules-of-engagement",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Rules of Engagement",
    "definition": "Cadre l\u00e9gal/technique du pentest",
    "details": "Scope, horaires, limites.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-cve",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "CVE",
    "definition": "Common Vulnerabilities and Exposures",
    "details": "Identifiant vuln\u00e9rabilit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-cvss",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "CVSS",
    "definition": "Common Vulnerability Scoring System",
    "details": "Score de gravit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-false-positive",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "False Positive",
    "definition": "Alerte fausse",
    "details": "Le scan signale vuln\u00e9rabilit\u00e9 inexistante.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-false-negative",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "False Negative",
    "definition": "Manque une vraie vuln\u00e9rabilit\u00e9",
    "details": "Tr\u00e8s dangereux.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-scap",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "SCAP",
    "definition": "Security Content Automation Protocol",
    "details": "Automatisation conformit\u00e9/config/vuln\u00e9rabilit\u00e9s.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-fim",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "FIM",
    "definition": "File Integrity Monitoring",
    "details": "D\u00e9tecte modifications fichiers critiques.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-netflow",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "NetFlow",
    "definition": "M\u00e9tadonn\u00e9es de flux r\u00e9seau",
    "details": "Qui parle \u00e0 qui, volume, ports.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-packet-capture-pcap",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Packet Capture / PCAP",
    "definition": "Capture compl\u00e8te de paquets",
    "details": "Analyse d\u00e9taill\u00e9e r\u00e9seau.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-syslog",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "Syslog",
    "definition": "Standard d'envoi de logs",
    "details": "Centralisation logs.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-snmp-trap",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "SNMP Trap",
    "definition": "Alerte envoy\u00e9e par \u00e9quipement r\u00e9seau",
    "details": "Monitoring r\u00e9seau.",
    "source": "flashcard cours local import"
  },
  {
    "id": "security-operations-ueba",
    "themeId": "security-operations",
    "themeTitle": "Security Operations",
    "domain": "Security Operations",
    "term": "UEBA",
    "definition": "User and Entity Behavior Analytics",
    "details": "D\u00e9tecte comportements anormaux.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-ir",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "IR",
    "definition": "Incident Response",
    "details": "Processus de r\u00e9ponse aux incidents.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-preparation",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Preparation",
    "definition": "Pr\u00e9parer outils, r\u00f4les, plans",
    "details": "Avant incident.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-detection",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Detection",
    "definition": "Identifier incident",
    "details": "Alertes/logs/SIEM.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-analysis",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Analysis",
    "definition": "Comprendre cause, port\u00e9e, impact",
    "details": "Triage, RCA.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-containment",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Containment",
    "definition": "Limiter propagation",
    "details": "Isoler machine, bloquer compte.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-eradication",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Eradication",
    "definition": "Supprimer cause/malware",
    "details": "Patcher, supprimer persistence.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-recovery",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Recovery",
    "definition": "Restaurer service",
    "details": "Reimage, backup, validation.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-lessons-learned",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Lessons Learned",
    "definition": "Retour d'exp\u00e9rience",
    "details": "Am\u00e9liorer processus.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-rca",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "RCA",
    "definition": "Root Cause Analysis",
    "details": "Identifier cause racine.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-threat-hunting",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Threat Hunting",
    "definition": "Recherche proactive de menaces",
    "details": "Avant alerte confirm\u00e9e.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-forensic-image",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Forensic Image",
    "definition": "Copie bit-\u00e0-bit",
    "details": "Pr\u00e9serve preuve.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-chain-of-custody",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Chain of Custody",
    "definition": "Tra\u00e7abilit\u00e9 des preuves",
    "details": "Qui a eu quoi, quand, comment.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-legal-hold",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Legal Hold",
    "definition": "Pr\u00e9servation obligatoire de preuves",
    "details": "Enqu\u00eate/litige.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-e-discovery",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "E-discovery",
    "definition": "Recherche/production de preuves \u00e9lectroniques",
    "details": "Processus l\u00e9gal.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-order-of-volatility",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Order of Volatility",
    "definition": "Collecte des preuves les plus volatiles d'abord",
    "details": "RAM avant disque, connexions avant fichiers.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-mitre-att-ck",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "MITRE ATT&CK",
    "definition": "Base de tactiques/techniques adverses",
    "details": "Analyse TTPs.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-cyber-kill-chain",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Cyber Kill Chain",
    "definition": "\u00c9tapes d'une attaque",
    "details": "Recon, weaponization, delivery, exploitation, etc.",
    "source": "flashcard cours local import"
  },
  {
    "id": "incident-response-et-forensics-diamond-model",
    "themeId": "incident-response-et-forensics",
    "themeTitle": "Incident Response et Forensics",
    "domain": "Security Operations",
    "term": "Diamond Model",
    "definition": "Mod\u00e8le intrusion : adversary, capability, infrastructure, victim",
    "details": "Analyse menace.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-grc",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "GRC",
    "definition": "Governance, Risk, Compliance",
    "details": "Domaine 5, tr\u00e8s important.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-policy",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Policy",
    "definition": "R\u00e8gle de haut niveau obligatoire",
    "details": "Quoi faire.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-standard",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Standard",
    "definition": "Exigence sp\u00e9cifique obligatoire",
    "details": "Niveau minimal attendu.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-procedure",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Procedure",
    "definition": "\u00c9tapes d\u00e9taill\u00e9es",
    "details": "Comment faire.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-guideline",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Guideline",
    "definition": "Recommandation non obligatoire",
    "details": "Bonne pratique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-aup",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "AUP",
    "definition": "Acceptable Use Policy",
    "details": "Utilisation acceptable des ressources IT.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-bpa",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "BPA",
    "definition": "Business Partnership Agreement",
    "details": "Accord entre partenaires.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-nda",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "NDA",
    "definition": "Non-Disclosure Agreement",
    "details": "Accord de confidentialit\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-sla",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "SLA",
    "definition": "Service Level Agreement",
    "details": "Niveau de service attendu.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-sow",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "SOW",
    "definition": "Statement of Work",
    "details": "Travail pr\u00e9cis \u00e0 r\u00e9aliser.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-mou-moa",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "MOU/MOA",
    "definition": "Memorandum of Understanding/Agreement",
    "details": "Accord formel g\u00e9n\u00e9ral entre organisations.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk",
    "definition": "Probabilit\u00e9 \u00d7 impact d'une menace exploitant une vuln\u00e9rabilit\u00e9",
    "details": "Base analyse de risques.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-threat",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Threat",
    "definition": "Cause potentielle de dommage",
    "details": "Attaquant, incendie, malware.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-vulnerability",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Vulnerability",
    "definition": "Faiblesse exploitable",
    "details": "Mauvaise config, patch manquant.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-impact",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Impact",
    "definition": "Cons\u00e9quence d'un incident",
    "details": "Financier, l\u00e9gal, r\u00e9putation.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-likelihood",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Likelihood",
    "definition": "Probabilit\u00e9 d'occurrence",
    "details": "Qualitative ou quantitative.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-appetite",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Appetite",
    "definition": "Niveau de risque acceptable global",
    "details": "Strat\u00e9gique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-tolerance",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Tolerance",
    "definition": "Seuil acceptable sp\u00e9cifique",
    "details": "Plus op\u00e9rationnel.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-register",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Register",
    "definition": "Registre des risques",
    "details": "Suit risques, propri\u00e9taires, traitement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-acceptance",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Acceptance",
    "definition": "Accepter le risque",
    "details": "Aucun contr\u00f4le suppl\u00e9mentaire.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-avoidance",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Avoidance",
    "definition": "\u00c9viter activit\u00e9 risqu\u00e9e",
    "details": "Arr\u00eater service/processus.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-mitigation",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Mitigation",
    "definition": "R\u00e9duire risque par contr\u00f4les",
    "details": "Firewall, patching, MFA.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-risk-transfer",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Risk Transfer",
    "definition": "Transf\u00e9rer risque",
    "details": "Assurance, outsourcing.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-ale",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "ALE",
    "definition": "Annualized Loss Expectancy",
    "details": "Perte annuelle attendue.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-sle",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "SLE",
    "definition": "Single Loss Expectancy",
    "details": "Perte pour un \u00e9v\u00e9nement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-aro",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "ARO",
    "definition": "Annualized Rate of Occurrence",
    "details": "Fr\u00e9quence annuelle estim\u00e9e.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-formula",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Formula",
    "definition": "ALE = SLE \u00d7 ARO",
    "details": "\u00c0 conna\u00eetre pour questions risque.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-ef",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "EF",
    "definition": "Exposure Factor",
    "details": "Pourcentage de perte d'un actif.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-av",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "AV",
    "definition": "Asset Value",
    "details": "Valeur d'un actif.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-sle-formula",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "SLE Formula",
    "definition": "SLE = AV \u00d7 EF",
    "details": "Calcul perte unique.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-due-diligence",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Due Diligence",
    "definition": "Faire les v\u00e9rifications n\u00e9cessaires",
    "details": "Responsabilit\u00e9 avant d\u00e9cision.",
    "source": "flashcard cours local import"
  },
  {
    "id": "gouvernance-risque-et-conformite-due-care",
    "themeId": "gouvernance-risque-et-conformite",
    "themeTitle": "Gouvernance, risque et conformit\u00e9",
    "domain": "Security Program Management and Oversight",
    "term": "Due Care",
    "definition": "Appliquer mesures raisonnables",
    "details": "Agir correctement.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-internal-audit",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Internal Audit",
    "definition": "Audit par l'organisation",
    "details": "Pr\u00e9paration/am\u00e9lioration interne.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-external-audit",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "External Audit",
    "definition": "Audit par entit\u00e9 externe",
    "details": "Plus ind\u00e9pendant.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-third-party-assessment",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Third-party Assessment",
    "definition": "\u00c9valuation fournisseur/partenaire",
    "details": "Vendor risk management.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-attestation",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Attestation",
    "definition": "D\u00e9claration/validation formelle",
    "details": "Conformit\u00e9 ou contr\u00f4le.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-right-to-audit-clause",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Right-to-Audit Clause",
    "definition": "Clause permettant auditer un fournisseur",
    "details": "Tr\u00e8s important en contrats tiers.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-vendor-assessment",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Vendor Assessment",
    "definition": "\u00c9valuer s\u00e9curit\u00e9 d'un fournisseur",
    "details": "Questionnaires, audits, preuves.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-vendor-monitoring",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Vendor Monitoring",
    "definition": "Surveiller fournisseur dans le temps",
    "details": "Risque tiers continu.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-supply-chain-risk",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Supply Chain Risk",
    "definition": "Risque venant fournisseurs/MSP/librairies",
    "details": "Tr\u00e8s test\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-data-controller",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Data Controller",
    "definition": "D\u00e9cide pourquoi/comment donn\u00e9es trait\u00e9es",
    "details": "Terme privacy/GDPR-like.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-data-processor",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Data Processor",
    "definition": "Traite donn\u00e9es pour controller",
    "details": "Fournisseur/service.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-data-owner",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Data Owner",
    "definition": "Responsable m\u00e9tier des donn\u00e9es",
    "details": "D\u00e9cide acc\u00e8s/classification.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-data-custodian",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Data Custodian",
    "definition": "Responsable technique de protection",
    "details": "Admin/IT.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-data-subject",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "Data Subject",
    "definition": "Personne concern\u00e9e par les donn\u00e9es",
    "details": "Client/employ\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-pii",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "PII",
    "definition": "Personally Identifiable Information",
    "details": "Donn\u00e9es identifiantes.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-phi",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "PHI",
    "definition": "Protected Health Information",
    "details": "Donn\u00e9es de sant\u00e9.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-pci-dss",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "PCI DSS",
    "definition": "Payment Card Industry Data Security Standard",
    "details": "Paiements/cartes bancaires.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-gdpr",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "GDPR",
    "definition": "General Data Protection Regulation",
    "details": "Protection donn\u00e9es personnelles UE.",
    "source": "flashcard cours local import"
  },
  {
    "id": "audit-conformite-et-tiers-hipaa",
    "themeId": "audit-conformite-et-tiers",
    "themeTitle": "Audit, conformit\u00e9 et tiers",
    "domain": "Security Program Management and Oversight",
    "term": "HIPAA",
    "definition": "Health Insurance Portability and Accountability Act",
    "details": "Sant\u00e9 US.",
    "source": "flashcard cours local import"
  }
] satisfies StudyItem[];
