export type ConfusionItem = {
  id: string;
  sectionId: string;
  sectionTitle: string;
  domain: string;
  comparison: string;
  english: string;
  difference: string;
  source: "Confusion local import";
};

export type ConfusionSection = {
  id: string;
  number: number;
  title: string;
  domain: string;
  items: ConfusionItem[];
};

export const confusionSections = [
  {
    "id": "confusion-01-concepts-de-s-curit",
    "number": 1,
    "title": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "confusion-01-concepts-de-s-curit-authentication-vs-authorization",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Authentication vs Authorization",
        "english": "Vérification identité vs attribution permissions",
        "difference": "Authentication = “qui es-tu ?” Authorization = “que peux-tu faire ?”",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-authorization-vs-accounting",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Authorization vs Accounting",
        "english": "Permissions vs traçabilité",
        "difference": "Authorization donne l’accès ; Accounting journalise les actions.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-confidentiality-vs-integrity",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Confidentiality vs Integrity",
        "english": "Protection lecture vs protection modification",
        "difference": "Chiffrement = confidentiality ; hash/signature = integrity.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-integrity-vs-non-repudiation",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Integrity vs Non-repudiation",
        "english": "Donnée non modifiée vs action non niable",
        "difference": "Signature numérique donne souvent les deux.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-availability-vs-resiliency",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Availability vs Resiliency",
        "english": "Disponibilité vs capacité à résister/récupérer",
        "difference": "Availability = service accessible ; resiliency = redondance, failover, DR.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-gap-analysis-vs-risk-assessment",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Gap analysis vs Risk assessment",
        "english": "Écart actuel/cible vs analyse des risques",
        "difference": "Gap = “où sommes-nous vs où voulons-nous aller ?”",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-zero-trust-vs-network-segmentation",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Zero Trust vs Network segmentation",
        "english": "Vérification continue vs séparation réseau",
        "difference": "Zero Trust vérifie identité/contexte ; segmentation limite mouvement latéral.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-01-concepts-de-s-curit-control-plane-vs-data-plane",
        "sectionId": "confusion-01-concepts-de-s-curit",
        "sectionTitle": "Concepts de sécurité",
        "domain": "General Security Concepts",
        "comparison": "Control plane vs Data plane",
        "english": "Décision vs application",
        "difference": "Control plane décide ; data plane applique/transport.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les",
    "number": 2,
    "title": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-technical-vs-operational-control",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Technical vs Operational control",
        "english": "Contrôle technologique vs humain/processus",
        "difference": "Firewall = technical ; security guard = operational.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-managerial-vs-operational-control",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Managerial vs Operational control",
        "english": "Gouvernance vs exécution",
        "difference": "Policy/risk assessment = managerial ; procédure appliquée = operational.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-physical-vs-operational-control",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Physical vs Operational control",
        "english": "Objet physique vs action humaine",
        "difference": "Serrure = physical ; garde qui vérifie badge = operational.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-preventive-vs-detective",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Preventive vs Detective",
        "english": "Empêche vs détecte",
        "difference": "IPS/firewall = preventive ; IDS/SIEM/logs = detective.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-corrective-vs-recovery",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Corrective vs Recovery",
        "english": "Corrige vs restaure",
        "difference": "Patch/reimage = corrective ; restore backup = recovery/corrective selon contexte.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-deterrent-vs-preventive",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Deterrent vs Preventive",
        "english": "Décourage vs bloque",
        "difference": "Caméra visible/panneau = deterrent ; porte verrouillée = preventive.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-compensating-vs-corrective",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Compensating vs Corrective",
        "english": "Remplace un contrôle impossible vs répare",
        "difference": "Isoler serveur non patchable = compensating.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-02-cat-gories-et-types-de-contr-les-directive-vs-managerial",
        "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
        "sectionTitle": "Catégories et types de contrôles",
        "domain": "General Security Concepts",
        "comparison": "Directive vs Managerial",
        "english": "Instruction vs catégorie gouvernance",
        "difference": "Policy est souvent managerial et directive.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-03-r-seau",
    "number": 3,
    "title": "Réseau",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "confusion-03-r-seau-ids-vs-ips",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "IDS vs IPS",
        "english": "Intrusion Detection System vs Intrusion Prevention System",
        "difference": "IDS alerte ; IPS bloque.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-firewall-vs-waf",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "Firewall vs WAF",
        "english": "Firewall vs Web Application Firewall",
        "difference": "Firewall filtre IP/ports ; WAF protège HTTP/app web : SQLi, XSS.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-nids-vs-hids",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "NIDS vs HIDS",
        "english": "Network IDS vs Host IDS",
        "difference": "NIDS surveille réseau ; HIDS surveille hôte/logs/fichiers.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-edr-vs-hids",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "EDR vs HIDS",
        "english": "Endpoint Detection and Response vs Host IDS",
        "difference": "HIDS détecte ; EDR détecte + investigue + répond.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-nac-vs-802-1x",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "NAC vs 802.1X",
        "english": "Network Access Control vs port-based network access control",
        "difference": "NAC = stratégie globale/posture ; 802.1X = mécanisme d’auth réseau.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-radius-vs-tacacs",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "RADIUS vs TACACS+",
        "english": "AAA protocols",
        "difference": "RADIUS = Wi-Fi/VPN ; TACACS+ = administration équipements réseau.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-vlan-vs-subnet",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "VLAN vs Subnet",
        "english": "Segmentation logique L2 vs réseau IP L3",
        "difference": "VLAN sépare couche 2 ; subnet sépare plage IP.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-segmentation-vs-isolation",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "Segmentation vs Isolation",
        "english": "Séparer vs couper fortement",
        "difference": "Segmentation limite flux ; isolation retire ou enferme.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-dmz-vs-internal-network",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "DMZ vs Internal network",
        "english": "Zone exposée vs réseau interne",
        "difference": "DMZ héberge services publics, protège interne.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-proxy-vs-reverse-proxy",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "Proxy vs Reverse proxy",
        "english": "Proxy client vs proxy serveur",
        "difference": "Forward proxy protège clients ; reverse proxy protège serveurs.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-vpn-vs-ztna",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "VPN vs ZTNA",
        "english": "Tunnel réseau vs accès Zero Trust",
        "difference": "VPN donne accès réseau ; ZTNA donne accès applicatif/contextuel.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-split-tunnel-vs-full-tunnel",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "Split tunnel vs Full tunnel",
        "english": "Tunnel partiel vs total",
        "difference": "Split = seulement trafic entreprise ; full = tout trafic via VPN.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-nat-vs-pat",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "NAT vs PAT",
        "english": "Network Address Translation vs Port Address Translation",
        "difference": "NAT traduit IP ; PAT traduit IP + ports pour plusieurs clients.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-03-r-seau-sase-vs-casb",
        "sectionId": "confusion-03-r-seau",
        "sectionTitle": "Réseau",
        "domain": "Security Architecture",
        "comparison": "SASE vs CASB",
        "english": "Secure Access Service Edge vs Cloud Access Security Broker",
        "difference": "SASE = sécurité réseau cloud globale ; CASB = contrôle services cloud/SaaS.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "number": 4,
    "title": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-http-vs-https",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "HTTP vs HTTPS",
        "english": "HyperText Transfer Protocol vs Secure",
        "difference": "HTTP clair ; HTTPS = TLS.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-ftp-vs-sftp-vs-ftps",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "FTP vs SFTP vs FTPS",
        "english": "File Transfer Protocol / SSH File Transfer / FTP Secure",
        "difference": "FTP clair ; SFTP via SSH ; FTPS via TLS.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-telnet-vs-ssh",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "Telnet vs SSH",
        "english": "Remote shell protocols",
        "difference": "Telnet clair ; SSH chiffré.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-ldap-vs-ldaps",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "LDAP vs LDAPS",
        "english": "Directory protocol vs secure LDAP",
        "difference": "LDAP 389 ; LDAPS 636 chiffré.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-snmpv2-vs-snmpv3",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "SNMPv2 vs SNMPv3",
        "english": "Monitoring protocol versions",
        "difference": "v2 faible/community strings ; v3 auth + chiffrement.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-pop3-imap-vs-pop3s-imaps",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "POP3/IMAP vs POP3S/IMAPS",
        "english": "Mail retrieval protocols",
        "difference": "Versions “S” chiffrées.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-smtp-vs-smtps-starttls",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "SMTP vs SMTPS/STARTTLS",
        "english": "Mail transfer",
        "difference": "SMTP peut être clair ; SMTPS/STARTTLS chiffre.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-dns-vs-doh-dot-dnssec",
        "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
        "sectionTitle": "Protocoles sécurisés vs non sécurisés",
        "domain": "Security Architecture",
        "comparison": "DNS vs DoH/DoT/DNSSEC",
        "english": "Name resolution",
        "difference": "DoH/DoT chiffrent ; DNSSEC protège intégrité/authenticité DNS.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-05-cryptographie-pki",
    "number": 5,
    "title": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "confusion-05-cryptographie-pki-hashing-vs-encryption",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Hashing vs Encryption",
        "english": "Empreinte irréversible vs chiffrement réversible",
        "difference": "Hash = intégrité ; encryption = confidentialité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-encoding-vs-encryption",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Encoding vs Encryption",
        "english": "Format conversion vs secrecy",
        "difference": "Encoding n’est pas sécurité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-obfuscation-vs-encryption",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Obfuscation vs Encryption",
        "english": "Cacher/rendre difficile vs chiffrer",
        "difference": "Obfuscation ne garantit pas confidentialité forte.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-symmetric-vs-asymmetric",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Symmetric vs Asymmetric",
        "english": "Same key vs public/private key",
        "difference": "Symmetric rapide ; asymmetric utile échange clés/signature.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-public-key-vs-private-key",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Public key vs Private key",
        "english": "Clé publique vs clé privée",
        "difference": "Chiffrer pour Bob = Bob public key ; signer = ta private key.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-digital-signature-vs-encryption",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Digital signature vs Encryption",
        "english": "Authenticité/intégrité vs confidentialité",
        "difference": "Signature ne cache pas forcément le contenu.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-certificate-vs-key",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Certificate vs Key",
        "english": "Certificat vs clé",
        "difference": "Certificat lie identité à clé publique.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-ca-vs-ra",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "CA vs RA",
        "english": "Certificate Authority vs Registration Authority",
        "difference": "RA vérifie identité ; CA émet/signe.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-crl-vs-ocsp",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "CRL vs OCSP",
        "english": "Revocation list vs online status",
        "difference": "CRL = liste ; OCSP = statut en ligne.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-self-signed-vs-third-party-certificate",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Self-signed vs Third-party certificate",
        "english": "Certificat auto-signé vs reconnu",
        "difference": "Self-signed utile lab/interne ; third-party pour public.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-wildcard-vs-san-certificate",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Wildcard vs SAN certificate",
        "english": "*.domain.com vs noms multiples précis",
        "difference": "Wildcard couvre sous-domaines ; SAN couvre plusieurs noms/domaines.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-key-escrow-vs-key-backup",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Key escrow vs Key backup",
        "english": "Tiers conserve clé vs copie de secours",
        "difference": "Escrow souvent contrôlé/formel.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-tpm-vs-hsm",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "TPM vs HSM",
        "english": "Trusted Platform Module vs Hardware Security Module",
        "difference": "TPM endpoint/local ; HSM entreprise/serveur/CA/paiement.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-kms-vs-hsm",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "KMS vs HSM",
        "english": "Key Management System vs Hardware Security Module",
        "difference": "KMS gère cycle de vie ; HSM protège matériellement les clés.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-salting-vs-key-stretching",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Salting vs Key stretching",
        "english": "Random salt vs ralentissement hash",
        "difference": "Salt rend hash unique ; stretching ralentit brute force.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-tokenization-vs-masking",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Tokenization vs Masking",
        "english": "Remplacement vs masquage partiel",
        "difference": "Tokenization remplace donnée ; masking affiche partiellement.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-steganography-vs-encryption",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Steganography vs Encryption",
        "english": "Cacher existence vs cacher contenu",
        "difference": "Image avec message caché = steganography.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-05-cryptographie-pki-blockchain-vs-open-public-ledger",
        "sectionId": "confusion-05-cryptographie-pki",
        "sectionTitle": "Cryptographie / PKI",
        "domain": "General Security Concepts",
        "comparison": "Blockchain vs Open public ledger",
        "english": "Technologie vs registre public",
        "difference": "Blockchain peut être le mécanisme ; open ledger = registre consultable.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-06-iam-acc-s",
    "number": 6,
    "title": "IAM / accès",
    "domain": "General Security Concepts",
    "items": [
      {
        "id": "confusion-06-iam-acc-s-mfa-vs-2fa",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "MFA vs 2FA",
        "english": "Multi-factor vs two-factor",
        "difference": "2FA = exactement deux facteurs ; MFA = deux ou plus.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-password-pin-vs-password-smart-card",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "Password + PIN vs Password + smart card",
        "english": "Same factor vs two factors",
        "difference": "Password + PIN = knowledge + knowledge, pas vrai MFA fort.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-something-you-know-have-are-do-where",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "Something you know/have/are/do/where",
        "english": "Facteurs auth",
        "difference": "Know = password ; have = token ; are = biométrie ; where = localisation.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-sso-vs-federation",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "SSO vs Federation",
        "english": "Single Sign-On vs trust between organizations",
        "difference": "SSO = une connexion ; federation = confiance entre domaines/IdP.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-saml-vs-oauth-vs-oidc",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "SAML vs OAuth vs OIDC",
        "english": "Auth federation / delegated authorization / identity layer",
        "difference": "SAML/OIDC = login ; OAuth = autoriser une app.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-kerberos-vs-ldap",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "Kerberos vs LDAP",
        "english": "Ticket auth vs directory access",
        "difference": "Kerberos authentifie ; LDAP interroge annuaire.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-rbac-vs-abac",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "RBAC vs ABAC",
        "english": "Role-based vs Attribute-based",
        "difference": "RBAC = rôle ; ABAC = contexte/attributs.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-dac-vs-mac",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "DAC vs MAC",
        "english": "Owner-controlled vs mandatory labels",
        "difference": "DAC = propriétaire choisit ; MAC = classification imposée.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-pam-vs-iam",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "PAM vs IAM",
        "english": "Privileged access vs identity management",
        "difference": "PAM = comptes admin ; IAM = tout cycle identités.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-provisioning-vs-deprovisioning",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "Provisioning vs Deprovisioning",
        "english": "Création accès vs retrait accès",
        "difference": "Offboarding = deprovisioning.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-06-iam-acc-s-least-privilege-vs-need-to-know",
        "sectionId": "confusion-06-iam-acc-s",
        "sectionTitle": "IAM / accès",
        "domain": "General Security Concepts",
        "comparison": "Least privilege vs Need-to-know",
        "english": "Minimum rights vs accès selon besoin info",
        "difference": "Les deux limitent accès, mais need-to-know est centré information.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-07-attaques-sociales",
    "number": 7,
    "title": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "confusion-07-attaques-sociales-phishing-vs-spear-phishing",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Phishing vs Spear phishing",
        "english": "Generic vs targeted phishing",
        "difference": "Spear = ciblé.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-spear-phishing-vs-whaling",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Spear phishing vs Whaling",
        "english": "Targeted vs executive phishing",
        "difference": "Whaling cible dirigeants.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-vishing-vs-smishing",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Vishing vs Smishing",
        "english": "Voice phishing vs SMS phishing",
        "difference": "Vishing = appel ; smishing = SMS.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-pretexting-vs-impersonation",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Pretexting vs Impersonation",
        "english": "Faux scénario vs usurpation identité",
        "difference": "Pretexting crée histoire ; impersonation joue un rôle.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-tailgating-vs-piggybacking",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Tailgating vs Piggybacking",
        "english": "Suivre sans accord vs avec coopération",
        "difference": "Tailgating discret ; piggybacking exploite politesse.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-dumpster-diving-vs-shoulder-surfing",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Dumpster diving vs Shoulder surfing",
        "english": "Poubelles vs observation directe",
        "difference": "Documents jetés vs écran/clavier observé.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-watering-hole-vs-phishing",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Watering hole vs Phishing",
        "english": "Site fréquenté compromis vs message envoyé",
        "difference": "Watering hole attend la victime.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-typosquatting-vs-brand-impersonation",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Typosquatting vs Brand impersonation",
        "english": "Faux domaine proche vs imitation marque",
        "difference": "Typosquatting = erreur de frappe domaine.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-07-attaques-sociales-bec-vs-phishing",
        "sectionId": "confusion-07-attaques-sociales",
        "sectionTitle": "Attaques sociales",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "BEC vs Phishing",
        "english": "Business Email Compromise vs hameçonnage",
        "difference": "BEC vise fraude business, souvent virement.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-08-malware-attaques-techniques",
    "number": 8,
    "title": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "confusion-08-malware-attaques-techniques-virus-vs-worm",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Virus vs Worm",
        "english": "Needs host/action vs self-propagating",
        "difference": "Worm se propage seul.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-trojan-vs-rat",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Trojan vs RAT",
        "english": "Disguised malware vs remote access trojan",
        "difference": "RAT donne contrôle distant.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-spyware-vs-keylogger",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Spyware vs Keylogger",
        "english": "Espion général vs frappes clavier",
        "difference": "Keylogger capture credentials.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-rootkit-vs-bootkit",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Rootkit vs Bootkit",
        "english": "Cache dans OS vs infecte boot",
        "difference": "Bootkit démarre très tôt.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-logic-bomb-vs-ransomware",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Logic bomb vs Ransomware",
        "english": "Triggered code vs extortion encryption",
        "difference": "Logic bomb attend condition.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-dos-vs-ddos",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "DoS vs DDoS",
        "english": "Single source vs distributed",
        "difference": "DDoS = plusieurs sources/botnet.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-on-path-vs-replay",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "On-path vs Replay",
        "english": "Interception active vs réutilisation capture",
        "difference": "Replay rejoue une transaction/session.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-arp-poisoning-vs-dns-poisoning",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "ARP poisoning vs DNS poisoning",
        "english": "LAN mapping vs DNS mapping",
        "difference": "ARP = MAC/IP local ; DNS = nom/IP.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-dns-poisoning-vs-domain-hijacking",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "DNS poisoning vs Domain hijacking",
        "english": "Fausse résolution vs contrôle domaine",
        "difference": "Hijacking modifie contrôle/registrar/DNS.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-ssl-stripping-vs-downgrade-attack",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "SSL stripping vs Downgrade attack",
        "english": "Forcer HTTP vs forcer version faible",
        "difference": "SSL stripping est un type de downgrade.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-sql-injection-vs-xss",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "SQL injection vs XSS",
        "english": "DB injection vs browser script injection",
        "difference": "SQLi cible base ; XSS cible utilisateur/navigateur.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-csrf-vs-xss",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "CSRF vs XSS",
        "english": "Force action vs injecte script",
        "difference": "CSRF exploite session authentifiée.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-directory-traversal-vs-file-inclusion",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Directory traversal vs File inclusion",
        "english": "Accès chemin interdit vs inclusion fichier",
        "difference": "../ = traversal.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-buffer-overflow-vs-memory-leak",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Buffer overflow vs Memory leak",
        "english": "Débordement mémoire vs fuite mémoire",
        "difference": "Overflow peut exécuter code ; leak consomme mémoire.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-privilege-escalation-vs-lateral-movement",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Privilege escalation vs Lateral movement",
        "english": "Monter droits vs se déplacer réseau",
        "difference": "Escalation = admin/root ; lateral = autre machine.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-pass-the-hash-vs-password-cracking",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Pass-the-hash vs Password cracking",
        "english": "Utiliser hash directement vs retrouver password",
        "difference": "PTH n’a pas besoin du mot de passe clair.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-password-spraying-vs-brute-force",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Password spraying vs Brute force",
        "english": "Un mot de passe sur plusieurs comptes vs plusieurs mots sur un compte",
        "difference": "Spraying évite lockout.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-08-malware-attaques-techniques-dictionary-vs-rainbow-table",
        "sectionId": "confusion-08-malware-attaques-techniques",
        "sectionTitle": "Malware / attaques techniques",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Dictionary vs Rainbow table",
        "english": "Liste mots vs hashes pré-calculés",
        "difference": "Salt casse l’efficacité des rainbow tables.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests",
    "number": 9,
    "title": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "items": [
      {
        "id": "confusion-09-vuln-rabilit-s-tests-vulnerability-scan-vs-penetration-test",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Vulnerability scan vs Penetration test",
        "english": "Identify vs exploit",
        "difference": "Scan trouve ; pentest prouve exploitabilité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-credentialed-vs-non-credentialed-scan",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Credentialed vs Non-credentialed scan",
        "english": "Avec identifiants vs sans",
        "difference": "Credentialed = plus précis/interne.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-authenticated-vs-unauthenticated-testing",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Authenticated vs Unauthenticated testing",
        "english": "Avec compte vs sans compte",
        "difference": "Même logique que credentialed.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-known-vs-unknown-environment",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Known vs Unknown environment",
        "english": "White-box vs black-box",
        "difference": "Known = infos fournies ; unknown = vue attaquant externe.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-false-positive-vs-false-negative",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "False positive vs False negative",
        "english": "Fausse alerte vs menace manquée",
        "difference": "False negative plus dangereux.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-cve-vs-cvss-vs-cwe",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "CVE vs CVSS vs CWE",
        "english": "ID vulnérabilité vs score vs faiblesse logicielle",
        "difference": "CVE nomme ; CVSS note ; CWE catégorise.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-exploit-vs-vulnerability",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Exploit vs Vulnerability",
        "english": "Code/méthode d’attaque vs faiblesse",
        "difference": "Vulnérabilité = porte ; exploit = outil pour l’ouvrir.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-patch-vs-mitigation-vs-workaround",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Patch vs Mitigation vs Workaround",
        "english": "Correction vs réduction risque vs contournement temporaire",
        "difference": "Patch corrige racine.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-remediation-vs-validation",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Remediation vs Validation",
        "english": "Corriger vs vérifier correction",
        "difference": "Après patch : rescan/validation.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-responsible-disclosure-vs-bug-bounty",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Responsible disclosure vs Bug bounty",
        "english": "Divulgation coordonnée vs programme récompensé",
        "difference": "Bug bounty peut payer chercheurs.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-sast-vs-dast",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "SAST vs DAST",
        "english": "Static vs Dynamic App Security Testing",
        "difference": "SAST code ; DAST app en exécution.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-sca-vs-sbom",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "SCA vs SBOM",
        "english": "Software Composition Analysis vs Bill of Materials",
        "difference": "SCA analyse dépendances ; SBOM inventaire composants.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-09-vuln-rabilit-s-tests-sandboxing-vs-containerization",
        "sectionId": "confusion-09-vuln-rabilit-s-tests",
        "sectionTitle": "Vulnérabilités / tests",
        "domain": "Threats, Vulnerabilities, and Mitigations",
        "comparison": "Sandboxing vs Containerization",
        "english": "Environnement isolé test vs empaquetage app isolée",
        "difference": "Sandbox analyse/limite ; container déploie.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-10-cloud-architecture",
    "number": 10,
    "title": "Cloud / architecture",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "confusion-10-cloud-architecture-iaas-vs-paas-vs-saas",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "IaaS vs PaaS vs SaaS",
        "english": "Infrastructure/Platform/Software as a Service",
        "difference": "IaaS = client gère le plus ; SaaS = fournisseur gère le plus.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-public-vs-private-cloud",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "Public vs Private cloud",
        "english": "Cloud partagé vs dédié",
        "difference": "Public = fournisseur partagé ; private = organisation dédiée.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-hybrid-vs-multi-cloud",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "Hybrid vs Multi-cloud",
        "english": "On-prem + cloud vs plusieurs clouds",
        "difference": "Hybrid inclut souvent datacenter interne.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-serverless-vs-containers",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "Serverless vs Containers",
        "english": "Functions managed vs packaged runtime",
        "difference": "Serverless cache serveur ; container nécessite orchestration.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-vm-vs-container",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "VM vs Container",
        "english": "Full virtual OS vs shared kernel",
        "difference": "VM plus lourde, isolation forte.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-microservices-vs-monolith",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "Microservices vs Monolith",
        "english": "Petits services vs application unique",
        "difference": "Microservices = plus d’API/surface.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-iac-vs-manual-deployment",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "IaC vs Manual deployment",
        "english": "Code infra vs config manuelle",
        "difference": "IaC versionnable mais erreur répétable massivement.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-sdn-vs-traditional-networking",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "SDN vs Traditional networking",
        "english": "Software control vs device-based",
        "difference": "SDN centralise contrôle.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-edge-vs-fog-computing",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "Edge vs Fog computing",
        "english": "Très proche source vs couche intermédiaire",
        "difference": "Edge = appareil/site local ; fog = nœuds intermédiaires.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-on-prem-vs-off-prem",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "On-prem vs Off-prem",
        "english": "Sur site vs hors site",
        "difference": "Off-prem dépend réseau/fournisseur.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-10-cloud-architecture-responsibility-matrix-vs-sla",
        "sectionId": "confusion-10-cloud-architecture",
        "sectionTitle": "Cloud / architecture",
        "domain": "Security Architecture",
        "comparison": "Responsibility matrix vs SLA",
        "english": "Qui sécurise quoi vs niveau service",
        "difference": "Cloud : matrix clarifie responsabilités.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-11-donn-es-protection",
    "number": 11,
    "title": "Données / protection",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "confusion-11-donn-es-protection-data-at-rest-vs-in-transit-vs-in-use",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Data at rest vs in transit vs in use",
        "english": "Stockée vs transportée vs traitée",
        "difference": "At rest = disk/db ; transit = network ; use = RAM/CPU.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-encryption-at-rest-vs-transport-encryption",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Encryption at rest vs Transport encryption",
        "english": "Storage encryption vs communication encryption",
        "difference": "FDE/TDE vs TLS/VPN.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-full-disk-vs-file-vs-volume-vs-record-encryption",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Full disk vs File vs Volume vs Record encryption",
        "english": "Niveaux de chiffrement",
        "difference": "Full disk protège appareil volé ; record protège champ DB.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-dlp-vs-drm",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "DLP vs DRM",
        "english": "Data Loss Prevention vs Digital Rights Management",
        "difference": "DLP empêche fuite ; DRM contrôle usage contenu.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-data-masking-vs-anonymization",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Data masking vs Anonymization",
        "english": "Masquer vs retirer identification",
        "difference": "Anonymization doit empêcher ré-identification.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-tokenization-vs-encryption",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Tokenization vs Encryption",
        "english": "Token non mathématiquement réversible vs chiffrement réversible",
        "difference": "Token vault nécessaire pour retrouver original.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-data-owner-vs-data-custodian",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Data owner vs Data custodian",
        "english": "Responsable métier vs protecteur technique",
        "difference": "Owner décide accès ; custodian applique.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-data-controller-vs-data-processor",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Data controller vs Data processor",
        "english": "Décide traitement vs traite pour autrui",
        "difference": "GDPR/privacy.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-pii-vs-phi-vs-spi",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "PII vs PHI vs SPI",
        "english": "Personal / Health / Sensitive Personal Information",
        "difference": "PHI = santé ; SPI = sensible.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-data-retention-vs-data-destruction",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Data retention vs Data destruction",
        "english": "Conservation vs suppression",
        "difference": "Retention dit combien de temps ; destruction élimine.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-sanitization-vs-destruction",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Sanitization vs Destruction",
        "english": "Effacer sûrement vs détruire support",
        "difference": "Sanitization permet parfois réutilisation.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-11-donn-es-protection-degaussing-vs-shredding",
        "sectionId": "confusion-11-donn-es-protection",
        "sectionTitle": "Données / protection",
        "domain": "Security Architecture",
        "comparison": "Degaussing vs Shredding",
        "english": "Démagnétiser vs déchiqueter",
        "difference": "Degauss pour supports magnétiques.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-12-r-silience-continuit",
    "number": 12,
    "title": "Résilience / continuité",
    "domain": "Security Architecture",
    "items": [
      {
        "id": "confusion-12-r-silience-continuit-rto-vs-rpo",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "RTO vs RPO",
        "english": "Recovery Time Objective vs Recovery Point Objective",
        "difference": "RTO = temps d’arrêt ; RPO = perte de données.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-mtbf-vs-mttr",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "MTBF vs MTTR",
        "english": "Mean Time Between Failures vs Mean Time To Repair",
        "difference": "MTBF haut = fiable ; MTTR bas = réparation rapide.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-bia-vs-risk-assessment",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "BIA vs Risk assessment",
        "english": "Business Impact Analysis vs risk analysis",
        "difference": "BIA mesure impact métier ; risk assessment probabilité/risque.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-bcp-vs-drp",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "BCP vs DRP",
        "english": "Business Continuity Plan vs Disaster Recovery Plan",
        "difference": "BCP continue activité ; DRP restaure IT.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-coop-vs-drp",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "COOP vs DRP",
        "english": "Continuity of Operations vs Disaster Recovery",
        "difference": "COOP maintient opérations essentielles.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-backup-vs-replication",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "Backup vs Replication",
        "english": "Copie de restauration vs copie synchronisée",
        "difference": "Replication peut répliquer corruption/ransomware.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-snapshot-vs-backup",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "Snapshot vs Backup",
        "english": "État instantané vs copie indépendante",
        "difference": "Snapshot rapide mais dépend souvent stockage source.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-full-vs-differential-vs-incremental",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "Full vs Differential vs Incremental",
        "english": "Sauvegardes",
        "difference": "Differential depuis dernier full ; incremental depuis dernier backup.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-hot-vs-warm-vs-cold-site",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "Hot vs Warm vs Cold site",
        "english": "Site de secours prêt/partiel/minimal",
        "difference": "Hot = plus rapide/cher ; cold = lent/moins cher.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-active-active-vs-active-passive",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "Active/Active vs Active/Passive",
        "english": "Tous actifs vs standby",
        "difference": "Active/active répartit charge.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-failover-vs-failback",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "Failover vs Failback",
        "english": "Bascule vers secours vs retour primaire",
        "difference": "Failback après restauration site principal.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-raid-0-vs-raid-1-vs-raid-5-6-10",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "RAID 0 vs RAID 1 vs RAID 5/6/10",
        "english": "Disk layouts",
        "difference": "RAID 0 pas redondant ; RAID 1 miroir ; 5/6 parité ; 10 miroir+stripe.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-12-r-silience-continuit-ups-vs-generator",
        "sectionId": "confusion-12-r-silience-continuit",
        "sectionTitle": "Résilience / continuité",
        "domain": "Security Architecture",
        "comparison": "UPS vs Generator",
        "english": "Batterie courte durée vs production électrique",
        "difference": "UPS couvre transition vers générateur.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-13-incident-response-investigation",
    "number": 13,
    "title": "Incident response / investigation",
    "domain": "Security Operations",
    "items": [
      {
        "id": "confusion-13-incident-response-investigation-detection-vs-analysis",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Detection vs Analysis",
        "english": "Identifier vs comprendre",
        "difference": "Detection = alerte ; analysis = portée/cause.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-containment-vs-eradication",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Containment vs Eradication",
        "english": "Limiter vs supprimer",
        "difference": "Isoler machine = containment ; supprimer malware = eradication.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-eradication-vs-recovery",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Eradication vs Recovery",
        "english": "Nettoyer vs remettre service",
        "difference": "Recovery restaure fonctionnement.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-recovery-vs-lessons-learned",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Recovery vs Lessons learned",
        "english": "Retour service vs amélioration post-incident",
        "difference": "Lessons learned après incident.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-threat-hunting-vs-incident-response",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Threat hunting vs Incident response",
        "english": "Recherche proactive vs réponse réactive",
        "difference": "Hunting cherche sans alerte confirmée.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-ioc-vs-ioa",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "IOC vs IOA",
        "english": "Indicator of Compromise vs Indicator of Attack",
        "difference": "IOC = preuve compromission ; IOA = comportement d’attaque.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-forensic-image-vs-backup",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Forensic image vs Backup",
        "english": "Copie preuve vs copie restauration",
        "difference": "Image préserve preuve bit-à-bit.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-chain-of-custody-vs-legal-hold",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Chain of custody vs Legal hold",
        "english": "Traçabilité preuve vs obligation de conservation",
        "difference": "Chain = qui/quand/comment ; legal hold = ne pas supprimer.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-acquisition-vs-preservation",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Acquisition vs Preservation",
        "english": "Collecte vs maintien intégrité",
        "difference": "Forensics : préserver avant analyser.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-e-discovery-vs-digital-forensics",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "E-discovery vs Digital forensics",
        "english": "Production légale vs analyse technique preuve",
        "difference": "E-discovery souvent juridique.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-mitre-att-ck-vs-cyber-kill-chain",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "MITRE ATT&CK vs Cyber Kill Chain",
        "english": "TTP matrix vs phases d’attaque",
        "difference": "ATT&CK détaillé techniques ; Kill Chain séquentiel.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-13-incident-response-investigation-playbook-vs-runbook",
        "sectionId": "confusion-13-incident-response-investigation",
        "sectionTitle": "Incident response / investigation",
        "domain": "Security Operations",
        "comparison": "Playbook vs Runbook",
        "english": "Procédure réponse sécurité vs procédure opérationnelle",
        "difference": "Playbook = scénario incident ; runbook = étapes techniques.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-14-risque-grc",
    "number": 14,
    "title": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "items": [
      {
        "id": "confusion-14-risque-grc-risk-appetite-vs-risk-tolerance-vs-risk-threshold",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Risk appetite vs Risk tolerance vs Risk threshold",
        "english": "Appétit global vs tolérance vs seuil",
        "difference": "Appetite stratégique ; tolerance opérationnelle ; threshold déclenche action.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-risk-acceptance-vs-risk-avoidance",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Risk acceptance vs Risk avoidance",
        "english": "Accepter vs éviter",
        "difference": "Acceptance = vivre avec ; avoidance = arrêter activité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-risk-mitigation-vs-risk-transfer",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Risk mitigation vs Risk transfer",
        "english": "Réduire vs transférer",
        "difference": "Mitigation = contrôles ; transfer = assurance/contrat.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-residual-risk-vs-inherent-risk",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Residual risk vs Inherent risk",
        "english": "Après contrôles vs avant contrôles",
        "difference": "Residual reste malgré contrôles.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-sle-vs-ale-vs-aro",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "SLE vs ALE vs ARO",
        "english": "Single loss / annual loss / annual rate",
        "difference": "SLE = AV×EF ; ALE = SLE×ARO.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-qualitative-vs-quantitative-risk",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Qualitative vs Quantitative risk",
        "english": "Descriptif vs numérique",
        "difference": "Qualitative = low/medium/high ; quantitative = dollars/probabilités.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-risk-register-vs-risk-report",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Risk register vs Risk report",
        "english": "Registre suivi vs communication synthèse",
        "difference": "Register = liste vivante ; report = présentation.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-risk-owner-vs-asset-owner",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Risk owner vs Asset owner",
        "english": "Responsable risque vs responsable actif",
        "difference": "Peut être différent.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-due-care-vs-due-diligence",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Due care vs Due diligence",
        "english": "Agir raisonnablement vs vérifier correctement",
        "difference": "Diligence = analyse ; care = action.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-compliance-vs-governance",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Compliance vs Governance",
        "english": "Respect exigences vs pilotage global",
        "difference": "Governance définit direction ; compliance vérifie obligations.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-internal-audit-vs-external-audit",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Internal audit vs External audit",
        "english": "Audit interne vs indépendant",
        "difference": "External plus indépendant.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-assessment-vs-audit",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Assessment vs Audit",
        "english": "Évaluation vs vérification formelle",
        "difference": "Audit plus structuré/preuve/conformité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-attestation-vs-certification",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Attestation vs Certification",
        "english": "Déclaration/validation vs certification officielle",
        "difference": "Attestation peut soutenir conformité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-14-risque-grc-right-to-audit-vs-sla",
        "sectionId": "confusion-14-risque-grc",
        "sectionTitle": "Risque / GRC",
        "domain": "Security Program Management and Oversight",
        "comparison": "Right-to-audit vs SLA",
        "english": "Droit d’auditer fournisseur vs niveau service",
        "difference": "Clause contractuelle différente.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-15-contrats-politiques",
    "number": 15,
    "title": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "items": [
      {
        "id": "confusion-15-contrats-politiques-policy-vs-standard",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "Policy vs Standard",
        "english": "High-level rule vs mandatory requirement",
        "difference": "Policy dit quoi ; standard précise exigences.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-procedure-vs-guideline",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "Procedure vs Guideline",
        "english": "Steps vs recommendation",
        "difference": "Procedure obligatoire détaillée ; guideline conseillé.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-aup-vs-nda",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "AUP vs NDA",
        "english": "Acceptable Use Policy vs Non-Disclosure Agreement",
        "difference": "AUP usage systèmes ; NDA confidentialité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-sla-vs-sow",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "SLA vs SOW",
        "english": "Service Level Agreement vs Statement of Work",
        "difference": "SLA niveaux service ; SOW travail à réaliser.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-mou-vs-moa",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "MOU vs MOA",
        "english": "Memorandum of Understanding vs Memorandum of Agreement",
        "difference": "MOU intention/entente ; MOA accord plus formel.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-msa-vs-sla",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "MSA vs SLA",
        "english": "Master Service Agreement vs Service Level Agreement",
        "difference": "MSA cadre contractuel ; SLA métriques service.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-bpa-vs-nda",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "BPA vs NDA",
        "english": "Business Partnership Agreement vs confidentiality",
        "difference": "BPA partenariat business ; NDA protège infos.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-onboarding-vs-offboarding",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "Onboarding vs Offboarding",
        "english": "Entrée vs départ",
        "difference": "Offboarding mal fait = anciens comptes actifs.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-change-management-vs-configuration-management",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "Change management vs Configuration management",
        "english": "Processus changement vs état/config des systèmes",
        "difference": "Change = approbation/test/backout ; configuration = baseline/CMDB.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-backout-plan-vs-rollback",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "Backout plan vs Rollback",
        "english": "Plan de retour arrière vs action de retour",
        "difference": "Backout plan documente ; rollback exécute.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-15-contrats-politiques-maintenance-window-vs-downtime",
        "sectionId": "confusion-15-contrats-politiques",
        "sectionTitle": "Contrats / politiques",
        "domain": "Security Program Management and Oversight",
        "comparison": "Maintenance window vs Downtime",
        "english": "Période prévue vs interruption réelle",
        "difference": "Window limite impact attendu.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-16-email-identit-domaine",
    "number": 16,
    "title": "Email / identité domaine",
    "domain": "Security Operations",
    "items": [
      {
        "id": "confusion-16-email-identit-domaine-spf-vs-dkim",
        "sectionId": "confusion-16-email-identit-domaine",
        "sectionTitle": "Email / identité domaine",
        "domain": "Security Operations",
        "comparison": "SPF vs DKIM",
        "english": "Sender Policy Framework vs DomainKeys Identified Mail",
        "difference": "SPF autorise serveurs ; DKIM signe message.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-16-email-identit-domaine-dkim-vs-dmarc",
        "sectionId": "confusion-16-email-identit-domaine",
        "sectionTitle": "Email / identité domaine",
        "domain": "Security Operations",
        "comparison": "DKIM vs DMARC",
        "english": "Signature vs policy/reporting",
        "difference": "DMARC décide reject/quarantine/report si échec SPF/DKIM.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-16-email-identit-domaine-spf-vs-dmarc",
        "sectionId": "confusion-16-email-identit-domaine",
        "sectionTitle": "Email / identité domaine",
        "domain": "Security Operations",
        "comparison": "SPF vs DMARC",
        "english": "Sender list vs policy",
        "difference": "SPF seul ne dit pas quoi faire en cas d’échec.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-16-email-identit-domaine-email-encryption-vs-email-signing",
        "sectionId": "confusion-16-email-identit-domaine",
        "sectionTitle": "Email / identité domaine",
        "domain": "Security Operations",
        "comparison": "Email encryption vs Email signing",
        "english": "Confidentiality vs integrity/authenticity",
        "difference": "S/MIME peut faire les deux.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-16-email-identit-domaine-spam-vs-phishing",
        "sectionId": "confusion-16-email-identit-domaine",
        "sectionTitle": "Email / identité domaine",
        "domain": "Security Operations",
        "comparison": "Spam vs Phishing",
        "english": "Unwanted bulk vs malicious deception",
        "difference": "Phishing cherche vol/compromission.",
        "source": "Confusion local import"
      }
    ]
  },
  {
    "id": "confusion-17-logs-monitoring",
    "number": 17,
    "title": "Logs / monitoring",
    "domain": "Security Operations",
    "items": [
      {
        "id": "confusion-17-logs-monitoring-log-aggregation-vs-correlation",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "Log aggregation vs Correlation",
        "english": "Centraliser vs relier événements",
        "difference": "SIEM fait les deux.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-17-logs-monitoring-alert-vs-incident",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "Alert vs Incident",
        "english": "Signal vs événement confirmé/traité",
        "difference": "Toute alerte n’est pas incident.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-17-logs-monitoring-event-vs-incident",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "Event vs Incident",
        "english": "Occurrence vs impact sécurité",
        "difference": "Incident viole politique/sécurité.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-17-logs-monitoring-netflow-vs-pcap",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "NetFlow vs PCAP",
        "english": "Flow metadata vs full packet capture",
        "difference": "NetFlow = qui/combien ; PCAP = contenu paquet.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-17-logs-monitoring-agent-vs-agentless-monitoring",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "Agent vs Agentless monitoring",
        "english": "Avec agent vs sans agent",
        "difference": "Agent plus riche ; agentless plus simple.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-17-logs-monitoring-syslog-vs-snmp-trap",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "Syslog vs SNMP trap",
        "english": "Logs vs alertes équipement",
        "difference": "Syslog journalise ; trap notifie événement.",
        "source": "Confusion local import"
      },
      {
        "id": "confusion-17-logs-monitoring-ueba-vs-siem",
        "sectionId": "confusion-17-logs-monitoring",
        "sectionTitle": "Logs / monitoring",
        "domain": "Security Operations",
        "comparison": "UEBA vs SIEM",
        "english": "Behavior analytics vs event management",
        "difference": "UEBA détecte anomalies comportementales.",
        "source": "Confusion local import"
      }
    ]
  }
] satisfies ConfusionSection[];

export const confusionItems = [
  {
    "id": "confusion-01-concepts-de-s-curit-authentication-vs-authorization",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Authentication vs Authorization",
    "english": "Vérification identité vs attribution permissions",
    "difference": "Authentication = “qui es-tu ?” Authorization = “que peux-tu faire ?”",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-authorization-vs-accounting",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Authorization vs Accounting",
    "english": "Permissions vs traçabilité",
    "difference": "Authorization donne l’accès ; Accounting journalise les actions.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-confidentiality-vs-integrity",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Confidentiality vs Integrity",
    "english": "Protection lecture vs protection modification",
    "difference": "Chiffrement = confidentiality ; hash/signature = integrity.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-integrity-vs-non-repudiation",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Integrity vs Non-repudiation",
    "english": "Donnée non modifiée vs action non niable",
    "difference": "Signature numérique donne souvent les deux.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-availability-vs-resiliency",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Availability vs Resiliency",
    "english": "Disponibilité vs capacité à résister/récupérer",
    "difference": "Availability = service accessible ; resiliency = redondance, failover, DR.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-gap-analysis-vs-risk-assessment",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Gap analysis vs Risk assessment",
    "english": "Écart actuel/cible vs analyse des risques",
    "difference": "Gap = “où sommes-nous vs où voulons-nous aller ?”",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-zero-trust-vs-network-segmentation",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Zero Trust vs Network segmentation",
    "english": "Vérification continue vs séparation réseau",
    "difference": "Zero Trust vérifie identité/contexte ; segmentation limite mouvement latéral.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-01-concepts-de-s-curit-control-plane-vs-data-plane",
    "sectionId": "confusion-01-concepts-de-s-curit",
    "sectionTitle": "Concepts de sécurité",
    "domain": "General Security Concepts",
    "comparison": "Control plane vs Data plane",
    "english": "Décision vs application",
    "difference": "Control plane décide ; data plane applique/transport.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-technical-vs-operational-control",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Technical vs Operational control",
    "english": "Contrôle technologique vs humain/processus",
    "difference": "Firewall = technical ; security guard = operational.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-managerial-vs-operational-control",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Managerial vs Operational control",
    "english": "Gouvernance vs exécution",
    "difference": "Policy/risk assessment = managerial ; procédure appliquée = operational.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-physical-vs-operational-control",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Physical vs Operational control",
    "english": "Objet physique vs action humaine",
    "difference": "Serrure = physical ; garde qui vérifie badge = operational.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-preventive-vs-detective",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Preventive vs Detective",
    "english": "Empêche vs détecte",
    "difference": "IPS/firewall = preventive ; IDS/SIEM/logs = detective.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-corrective-vs-recovery",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Corrective vs Recovery",
    "english": "Corrige vs restaure",
    "difference": "Patch/reimage = corrective ; restore backup = recovery/corrective selon contexte.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-deterrent-vs-preventive",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Deterrent vs Preventive",
    "english": "Décourage vs bloque",
    "difference": "Caméra visible/panneau = deterrent ; porte verrouillée = preventive.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-compensating-vs-corrective",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Compensating vs Corrective",
    "english": "Remplace un contrôle impossible vs répare",
    "difference": "Isoler serveur non patchable = compensating.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-02-cat-gories-et-types-de-contr-les-directive-vs-managerial",
    "sectionId": "confusion-02-cat-gories-et-types-de-contr-les",
    "sectionTitle": "Catégories et types de contrôles",
    "domain": "General Security Concepts",
    "comparison": "Directive vs Managerial",
    "english": "Instruction vs catégorie gouvernance",
    "difference": "Policy est souvent managerial et directive.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-ids-vs-ips",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "IDS vs IPS",
    "english": "Intrusion Detection System vs Intrusion Prevention System",
    "difference": "IDS alerte ; IPS bloque.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-firewall-vs-waf",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "Firewall vs WAF",
    "english": "Firewall vs Web Application Firewall",
    "difference": "Firewall filtre IP/ports ; WAF protège HTTP/app web : SQLi, XSS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-nids-vs-hids",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "NIDS vs HIDS",
    "english": "Network IDS vs Host IDS",
    "difference": "NIDS surveille réseau ; HIDS surveille hôte/logs/fichiers.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-edr-vs-hids",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "EDR vs HIDS",
    "english": "Endpoint Detection and Response vs Host IDS",
    "difference": "HIDS détecte ; EDR détecte + investigue + répond.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-nac-vs-802-1x",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "NAC vs 802.1X",
    "english": "Network Access Control vs port-based network access control",
    "difference": "NAC = stratégie globale/posture ; 802.1X = mécanisme d’auth réseau.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-radius-vs-tacacs",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "RADIUS vs TACACS+",
    "english": "AAA protocols",
    "difference": "RADIUS = Wi-Fi/VPN ; TACACS+ = administration équipements réseau.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-vlan-vs-subnet",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "VLAN vs Subnet",
    "english": "Segmentation logique L2 vs réseau IP L3",
    "difference": "VLAN sépare couche 2 ; subnet sépare plage IP.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-segmentation-vs-isolation",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "Segmentation vs Isolation",
    "english": "Séparer vs couper fortement",
    "difference": "Segmentation limite flux ; isolation retire ou enferme.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-dmz-vs-internal-network",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "DMZ vs Internal network",
    "english": "Zone exposée vs réseau interne",
    "difference": "DMZ héberge services publics, protège interne.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-proxy-vs-reverse-proxy",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "Proxy vs Reverse proxy",
    "english": "Proxy client vs proxy serveur",
    "difference": "Forward proxy protège clients ; reverse proxy protège serveurs.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-vpn-vs-ztna",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "VPN vs ZTNA",
    "english": "Tunnel réseau vs accès Zero Trust",
    "difference": "VPN donne accès réseau ; ZTNA donne accès applicatif/contextuel.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-split-tunnel-vs-full-tunnel",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "Split tunnel vs Full tunnel",
    "english": "Tunnel partiel vs total",
    "difference": "Split = seulement trafic entreprise ; full = tout trafic via VPN.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-nat-vs-pat",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "NAT vs PAT",
    "english": "Network Address Translation vs Port Address Translation",
    "difference": "NAT traduit IP ; PAT traduit IP + ports pour plusieurs clients.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-03-r-seau-sase-vs-casb",
    "sectionId": "confusion-03-r-seau",
    "sectionTitle": "Réseau",
    "domain": "Security Architecture",
    "comparison": "SASE vs CASB",
    "english": "Secure Access Service Edge vs Cloud Access Security Broker",
    "difference": "SASE = sécurité réseau cloud globale ; CASB = contrôle services cloud/SaaS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-http-vs-https",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "HTTP vs HTTPS",
    "english": "HyperText Transfer Protocol vs Secure",
    "difference": "HTTP clair ; HTTPS = TLS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-ftp-vs-sftp-vs-ftps",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "FTP vs SFTP vs FTPS",
    "english": "File Transfer Protocol / SSH File Transfer / FTP Secure",
    "difference": "FTP clair ; SFTP via SSH ; FTPS via TLS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-telnet-vs-ssh",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "Telnet vs SSH",
    "english": "Remote shell protocols",
    "difference": "Telnet clair ; SSH chiffré.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-ldap-vs-ldaps",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "LDAP vs LDAPS",
    "english": "Directory protocol vs secure LDAP",
    "difference": "LDAP 389 ; LDAPS 636 chiffré.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-snmpv2-vs-snmpv3",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "SNMPv2 vs SNMPv3",
    "english": "Monitoring protocol versions",
    "difference": "v2 faible/community strings ; v3 auth + chiffrement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-pop3-imap-vs-pop3s-imaps",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "POP3/IMAP vs POP3S/IMAPS",
    "english": "Mail retrieval protocols",
    "difference": "Versions “S” chiffrées.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-smtp-vs-smtps-starttls",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "SMTP vs SMTPS/STARTTLS",
    "english": "Mail transfer",
    "difference": "SMTP peut être clair ; SMTPS/STARTTLS chiffre.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s-dns-vs-doh-dot-dnssec",
    "sectionId": "confusion-04-protocoles-s-curis-s-vs-non-s-curis-s",
    "sectionTitle": "Protocoles sécurisés vs non sécurisés",
    "domain": "Security Architecture",
    "comparison": "DNS vs DoH/DoT/DNSSEC",
    "english": "Name resolution",
    "difference": "DoH/DoT chiffrent ; DNSSEC protège intégrité/authenticité DNS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-hashing-vs-encryption",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Hashing vs Encryption",
    "english": "Empreinte irréversible vs chiffrement réversible",
    "difference": "Hash = intégrité ; encryption = confidentialité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-encoding-vs-encryption",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Encoding vs Encryption",
    "english": "Format conversion vs secrecy",
    "difference": "Encoding n’est pas sécurité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-obfuscation-vs-encryption",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Obfuscation vs Encryption",
    "english": "Cacher/rendre difficile vs chiffrer",
    "difference": "Obfuscation ne garantit pas confidentialité forte.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-symmetric-vs-asymmetric",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Symmetric vs Asymmetric",
    "english": "Same key vs public/private key",
    "difference": "Symmetric rapide ; asymmetric utile échange clés/signature.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-public-key-vs-private-key",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Public key vs Private key",
    "english": "Clé publique vs clé privée",
    "difference": "Chiffrer pour Bob = Bob public key ; signer = ta private key.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-digital-signature-vs-encryption",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Digital signature vs Encryption",
    "english": "Authenticité/intégrité vs confidentialité",
    "difference": "Signature ne cache pas forcément le contenu.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-certificate-vs-key",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Certificate vs Key",
    "english": "Certificat vs clé",
    "difference": "Certificat lie identité à clé publique.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-ca-vs-ra",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "CA vs RA",
    "english": "Certificate Authority vs Registration Authority",
    "difference": "RA vérifie identité ; CA émet/signe.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-crl-vs-ocsp",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "CRL vs OCSP",
    "english": "Revocation list vs online status",
    "difference": "CRL = liste ; OCSP = statut en ligne.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-self-signed-vs-third-party-certificate",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Self-signed vs Third-party certificate",
    "english": "Certificat auto-signé vs reconnu",
    "difference": "Self-signed utile lab/interne ; third-party pour public.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-wildcard-vs-san-certificate",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Wildcard vs SAN certificate",
    "english": "*.domain.com vs noms multiples précis",
    "difference": "Wildcard couvre sous-domaines ; SAN couvre plusieurs noms/domaines.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-key-escrow-vs-key-backup",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Key escrow vs Key backup",
    "english": "Tiers conserve clé vs copie de secours",
    "difference": "Escrow souvent contrôlé/formel.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-tpm-vs-hsm",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "TPM vs HSM",
    "english": "Trusted Platform Module vs Hardware Security Module",
    "difference": "TPM endpoint/local ; HSM entreprise/serveur/CA/paiement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-kms-vs-hsm",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "KMS vs HSM",
    "english": "Key Management System vs Hardware Security Module",
    "difference": "KMS gère cycle de vie ; HSM protège matériellement les clés.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-salting-vs-key-stretching",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Salting vs Key stretching",
    "english": "Random salt vs ralentissement hash",
    "difference": "Salt rend hash unique ; stretching ralentit brute force.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-tokenization-vs-masking",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Tokenization vs Masking",
    "english": "Remplacement vs masquage partiel",
    "difference": "Tokenization remplace donnée ; masking affiche partiellement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-steganography-vs-encryption",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Steganography vs Encryption",
    "english": "Cacher existence vs cacher contenu",
    "difference": "Image avec message caché = steganography.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-05-cryptographie-pki-blockchain-vs-open-public-ledger",
    "sectionId": "confusion-05-cryptographie-pki",
    "sectionTitle": "Cryptographie / PKI",
    "domain": "General Security Concepts",
    "comparison": "Blockchain vs Open public ledger",
    "english": "Technologie vs registre public",
    "difference": "Blockchain peut être le mécanisme ; open ledger = registre consultable.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-mfa-vs-2fa",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "MFA vs 2FA",
    "english": "Multi-factor vs two-factor",
    "difference": "2FA = exactement deux facteurs ; MFA = deux ou plus.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-password-pin-vs-password-smart-card",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "Password + PIN vs Password + smart card",
    "english": "Same factor vs two factors",
    "difference": "Password + PIN = knowledge + knowledge, pas vrai MFA fort.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-something-you-know-have-are-do-where",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "Something you know/have/are/do/where",
    "english": "Facteurs auth",
    "difference": "Know = password ; have = token ; are = biométrie ; where = localisation.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-sso-vs-federation",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "SSO vs Federation",
    "english": "Single Sign-On vs trust between organizations",
    "difference": "SSO = une connexion ; federation = confiance entre domaines/IdP.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-saml-vs-oauth-vs-oidc",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "SAML vs OAuth vs OIDC",
    "english": "Auth federation / delegated authorization / identity layer",
    "difference": "SAML/OIDC = login ; OAuth = autoriser une app.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-kerberos-vs-ldap",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "Kerberos vs LDAP",
    "english": "Ticket auth vs directory access",
    "difference": "Kerberos authentifie ; LDAP interroge annuaire.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-rbac-vs-abac",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "RBAC vs ABAC",
    "english": "Role-based vs Attribute-based",
    "difference": "RBAC = rôle ; ABAC = contexte/attributs.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-dac-vs-mac",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "DAC vs MAC",
    "english": "Owner-controlled vs mandatory labels",
    "difference": "DAC = propriétaire choisit ; MAC = classification imposée.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-pam-vs-iam",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "PAM vs IAM",
    "english": "Privileged access vs identity management",
    "difference": "PAM = comptes admin ; IAM = tout cycle identités.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-provisioning-vs-deprovisioning",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "Provisioning vs Deprovisioning",
    "english": "Création accès vs retrait accès",
    "difference": "Offboarding = deprovisioning.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-06-iam-acc-s-least-privilege-vs-need-to-know",
    "sectionId": "confusion-06-iam-acc-s",
    "sectionTitle": "IAM / accès",
    "domain": "General Security Concepts",
    "comparison": "Least privilege vs Need-to-know",
    "english": "Minimum rights vs accès selon besoin info",
    "difference": "Les deux limitent accès, mais need-to-know est centré information.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-phishing-vs-spear-phishing",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Phishing vs Spear phishing",
    "english": "Generic vs targeted phishing",
    "difference": "Spear = ciblé.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-spear-phishing-vs-whaling",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Spear phishing vs Whaling",
    "english": "Targeted vs executive phishing",
    "difference": "Whaling cible dirigeants.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-vishing-vs-smishing",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Vishing vs Smishing",
    "english": "Voice phishing vs SMS phishing",
    "difference": "Vishing = appel ; smishing = SMS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-pretexting-vs-impersonation",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Pretexting vs Impersonation",
    "english": "Faux scénario vs usurpation identité",
    "difference": "Pretexting crée histoire ; impersonation joue un rôle.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-tailgating-vs-piggybacking",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Tailgating vs Piggybacking",
    "english": "Suivre sans accord vs avec coopération",
    "difference": "Tailgating discret ; piggybacking exploite politesse.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-dumpster-diving-vs-shoulder-surfing",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Dumpster diving vs Shoulder surfing",
    "english": "Poubelles vs observation directe",
    "difference": "Documents jetés vs écran/clavier observé.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-watering-hole-vs-phishing",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Watering hole vs Phishing",
    "english": "Site fréquenté compromis vs message envoyé",
    "difference": "Watering hole attend la victime.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-typosquatting-vs-brand-impersonation",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Typosquatting vs Brand impersonation",
    "english": "Faux domaine proche vs imitation marque",
    "difference": "Typosquatting = erreur de frappe domaine.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-07-attaques-sociales-bec-vs-phishing",
    "sectionId": "confusion-07-attaques-sociales",
    "sectionTitle": "Attaques sociales",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "BEC vs Phishing",
    "english": "Business Email Compromise vs hameçonnage",
    "difference": "BEC vise fraude business, souvent virement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-virus-vs-worm",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Virus vs Worm",
    "english": "Needs host/action vs self-propagating",
    "difference": "Worm se propage seul.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-trojan-vs-rat",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Trojan vs RAT",
    "english": "Disguised malware vs remote access trojan",
    "difference": "RAT donne contrôle distant.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-spyware-vs-keylogger",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Spyware vs Keylogger",
    "english": "Espion général vs frappes clavier",
    "difference": "Keylogger capture credentials.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-rootkit-vs-bootkit",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Rootkit vs Bootkit",
    "english": "Cache dans OS vs infecte boot",
    "difference": "Bootkit démarre très tôt.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-logic-bomb-vs-ransomware",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Logic bomb vs Ransomware",
    "english": "Triggered code vs extortion encryption",
    "difference": "Logic bomb attend condition.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-dos-vs-ddos",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "DoS vs DDoS",
    "english": "Single source vs distributed",
    "difference": "DDoS = plusieurs sources/botnet.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-on-path-vs-replay",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "On-path vs Replay",
    "english": "Interception active vs réutilisation capture",
    "difference": "Replay rejoue une transaction/session.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-arp-poisoning-vs-dns-poisoning",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "ARP poisoning vs DNS poisoning",
    "english": "LAN mapping vs DNS mapping",
    "difference": "ARP = MAC/IP local ; DNS = nom/IP.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-dns-poisoning-vs-domain-hijacking",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "DNS poisoning vs Domain hijacking",
    "english": "Fausse résolution vs contrôle domaine",
    "difference": "Hijacking modifie contrôle/registrar/DNS.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-ssl-stripping-vs-downgrade-attack",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "SSL stripping vs Downgrade attack",
    "english": "Forcer HTTP vs forcer version faible",
    "difference": "SSL stripping est un type de downgrade.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-sql-injection-vs-xss",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "SQL injection vs XSS",
    "english": "DB injection vs browser script injection",
    "difference": "SQLi cible base ; XSS cible utilisateur/navigateur.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-csrf-vs-xss",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "CSRF vs XSS",
    "english": "Force action vs injecte script",
    "difference": "CSRF exploite session authentifiée.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-directory-traversal-vs-file-inclusion",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Directory traversal vs File inclusion",
    "english": "Accès chemin interdit vs inclusion fichier",
    "difference": "../ = traversal.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-buffer-overflow-vs-memory-leak",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Buffer overflow vs Memory leak",
    "english": "Débordement mémoire vs fuite mémoire",
    "difference": "Overflow peut exécuter code ; leak consomme mémoire.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-privilege-escalation-vs-lateral-movement",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Privilege escalation vs Lateral movement",
    "english": "Monter droits vs se déplacer réseau",
    "difference": "Escalation = admin/root ; lateral = autre machine.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-pass-the-hash-vs-password-cracking",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Pass-the-hash vs Password cracking",
    "english": "Utiliser hash directement vs retrouver password",
    "difference": "PTH n’a pas besoin du mot de passe clair.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-password-spraying-vs-brute-force",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Password spraying vs Brute force",
    "english": "Un mot de passe sur plusieurs comptes vs plusieurs mots sur un compte",
    "difference": "Spraying évite lockout.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-08-malware-attaques-techniques-dictionary-vs-rainbow-table",
    "sectionId": "confusion-08-malware-attaques-techniques",
    "sectionTitle": "Malware / attaques techniques",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Dictionary vs Rainbow table",
    "english": "Liste mots vs hashes pré-calculés",
    "difference": "Salt casse l’efficacité des rainbow tables.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-vulnerability-scan-vs-penetration-test",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Vulnerability scan vs Penetration test",
    "english": "Identify vs exploit",
    "difference": "Scan trouve ; pentest prouve exploitabilité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-credentialed-vs-non-credentialed-scan",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Credentialed vs Non-credentialed scan",
    "english": "Avec identifiants vs sans",
    "difference": "Credentialed = plus précis/interne.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-authenticated-vs-unauthenticated-testing",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Authenticated vs Unauthenticated testing",
    "english": "Avec compte vs sans compte",
    "difference": "Même logique que credentialed.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-known-vs-unknown-environment",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Known vs Unknown environment",
    "english": "White-box vs black-box",
    "difference": "Known = infos fournies ; unknown = vue attaquant externe.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-false-positive-vs-false-negative",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "False positive vs False negative",
    "english": "Fausse alerte vs menace manquée",
    "difference": "False negative plus dangereux.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-cve-vs-cvss-vs-cwe",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "CVE vs CVSS vs CWE",
    "english": "ID vulnérabilité vs score vs faiblesse logicielle",
    "difference": "CVE nomme ; CVSS note ; CWE catégorise.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-exploit-vs-vulnerability",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Exploit vs Vulnerability",
    "english": "Code/méthode d’attaque vs faiblesse",
    "difference": "Vulnérabilité = porte ; exploit = outil pour l’ouvrir.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-patch-vs-mitigation-vs-workaround",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Patch vs Mitigation vs Workaround",
    "english": "Correction vs réduction risque vs contournement temporaire",
    "difference": "Patch corrige racine.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-remediation-vs-validation",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Remediation vs Validation",
    "english": "Corriger vs vérifier correction",
    "difference": "Après patch : rescan/validation.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-responsible-disclosure-vs-bug-bounty",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Responsible disclosure vs Bug bounty",
    "english": "Divulgation coordonnée vs programme récompensé",
    "difference": "Bug bounty peut payer chercheurs.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-sast-vs-dast",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "SAST vs DAST",
    "english": "Static vs Dynamic App Security Testing",
    "difference": "SAST code ; DAST app en exécution.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-sca-vs-sbom",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "SCA vs SBOM",
    "english": "Software Composition Analysis vs Bill of Materials",
    "difference": "SCA analyse dépendances ; SBOM inventaire composants.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-09-vuln-rabilit-s-tests-sandboxing-vs-containerization",
    "sectionId": "confusion-09-vuln-rabilit-s-tests",
    "sectionTitle": "Vulnérabilités / tests",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "comparison": "Sandboxing vs Containerization",
    "english": "Environnement isolé test vs empaquetage app isolée",
    "difference": "Sandbox analyse/limite ; container déploie.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-iaas-vs-paas-vs-saas",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "IaaS vs PaaS vs SaaS",
    "english": "Infrastructure/Platform/Software as a Service",
    "difference": "IaaS = client gère le plus ; SaaS = fournisseur gère le plus.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-public-vs-private-cloud",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "Public vs Private cloud",
    "english": "Cloud partagé vs dédié",
    "difference": "Public = fournisseur partagé ; private = organisation dédiée.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-hybrid-vs-multi-cloud",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "Hybrid vs Multi-cloud",
    "english": "On-prem + cloud vs plusieurs clouds",
    "difference": "Hybrid inclut souvent datacenter interne.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-serverless-vs-containers",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "Serverless vs Containers",
    "english": "Functions managed vs packaged runtime",
    "difference": "Serverless cache serveur ; container nécessite orchestration.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-vm-vs-container",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "VM vs Container",
    "english": "Full virtual OS vs shared kernel",
    "difference": "VM plus lourde, isolation forte.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-microservices-vs-monolith",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "Microservices vs Monolith",
    "english": "Petits services vs application unique",
    "difference": "Microservices = plus d’API/surface.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-iac-vs-manual-deployment",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "IaC vs Manual deployment",
    "english": "Code infra vs config manuelle",
    "difference": "IaC versionnable mais erreur répétable massivement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-sdn-vs-traditional-networking",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "SDN vs Traditional networking",
    "english": "Software control vs device-based",
    "difference": "SDN centralise contrôle.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-edge-vs-fog-computing",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "Edge vs Fog computing",
    "english": "Très proche source vs couche intermédiaire",
    "difference": "Edge = appareil/site local ; fog = nœuds intermédiaires.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-on-prem-vs-off-prem",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "On-prem vs Off-prem",
    "english": "Sur site vs hors site",
    "difference": "Off-prem dépend réseau/fournisseur.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-10-cloud-architecture-responsibility-matrix-vs-sla",
    "sectionId": "confusion-10-cloud-architecture",
    "sectionTitle": "Cloud / architecture",
    "domain": "Security Architecture",
    "comparison": "Responsibility matrix vs SLA",
    "english": "Qui sécurise quoi vs niveau service",
    "difference": "Cloud : matrix clarifie responsabilités.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-data-at-rest-vs-in-transit-vs-in-use",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Data at rest vs in transit vs in use",
    "english": "Stockée vs transportée vs traitée",
    "difference": "At rest = disk/db ; transit = network ; use = RAM/CPU.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-encryption-at-rest-vs-transport-encryption",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Encryption at rest vs Transport encryption",
    "english": "Storage encryption vs communication encryption",
    "difference": "FDE/TDE vs TLS/VPN.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-full-disk-vs-file-vs-volume-vs-record-encryption",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Full disk vs File vs Volume vs Record encryption",
    "english": "Niveaux de chiffrement",
    "difference": "Full disk protège appareil volé ; record protège champ DB.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-dlp-vs-drm",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "DLP vs DRM",
    "english": "Data Loss Prevention vs Digital Rights Management",
    "difference": "DLP empêche fuite ; DRM contrôle usage contenu.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-data-masking-vs-anonymization",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Data masking vs Anonymization",
    "english": "Masquer vs retirer identification",
    "difference": "Anonymization doit empêcher ré-identification.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-tokenization-vs-encryption",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Tokenization vs Encryption",
    "english": "Token non mathématiquement réversible vs chiffrement réversible",
    "difference": "Token vault nécessaire pour retrouver original.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-data-owner-vs-data-custodian",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Data owner vs Data custodian",
    "english": "Responsable métier vs protecteur technique",
    "difference": "Owner décide accès ; custodian applique.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-data-controller-vs-data-processor",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Data controller vs Data processor",
    "english": "Décide traitement vs traite pour autrui",
    "difference": "GDPR/privacy.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-pii-vs-phi-vs-spi",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "PII vs PHI vs SPI",
    "english": "Personal / Health / Sensitive Personal Information",
    "difference": "PHI = santé ; SPI = sensible.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-data-retention-vs-data-destruction",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Data retention vs Data destruction",
    "english": "Conservation vs suppression",
    "difference": "Retention dit combien de temps ; destruction élimine.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-sanitization-vs-destruction",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Sanitization vs Destruction",
    "english": "Effacer sûrement vs détruire support",
    "difference": "Sanitization permet parfois réutilisation.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-11-donn-es-protection-degaussing-vs-shredding",
    "sectionId": "confusion-11-donn-es-protection",
    "sectionTitle": "Données / protection",
    "domain": "Security Architecture",
    "comparison": "Degaussing vs Shredding",
    "english": "Démagnétiser vs déchiqueter",
    "difference": "Degauss pour supports magnétiques.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-rto-vs-rpo",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "RTO vs RPO",
    "english": "Recovery Time Objective vs Recovery Point Objective",
    "difference": "RTO = temps d’arrêt ; RPO = perte de données.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-mtbf-vs-mttr",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "MTBF vs MTTR",
    "english": "Mean Time Between Failures vs Mean Time To Repair",
    "difference": "MTBF haut = fiable ; MTTR bas = réparation rapide.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-bia-vs-risk-assessment",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "BIA vs Risk assessment",
    "english": "Business Impact Analysis vs risk analysis",
    "difference": "BIA mesure impact métier ; risk assessment probabilité/risque.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-bcp-vs-drp",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "BCP vs DRP",
    "english": "Business Continuity Plan vs Disaster Recovery Plan",
    "difference": "BCP continue activité ; DRP restaure IT.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-coop-vs-drp",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "COOP vs DRP",
    "english": "Continuity of Operations vs Disaster Recovery",
    "difference": "COOP maintient opérations essentielles.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-backup-vs-replication",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "Backup vs Replication",
    "english": "Copie de restauration vs copie synchronisée",
    "difference": "Replication peut répliquer corruption/ransomware.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-snapshot-vs-backup",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "Snapshot vs Backup",
    "english": "État instantané vs copie indépendante",
    "difference": "Snapshot rapide mais dépend souvent stockage source.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-full-vs-differential-vs-incremental",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "Full vs Differential vs Incremental",
    "english": "Sauvegardes",
    "difference": "Differential depuis dernier full ; incremental depuis dernier backup.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-hot-vs-warm-vs-cold-site",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "Hot vs Warm vs Cold site",
    "english": "Site de secours prêt/partiel/minimal",
    "difference": "Hot = plus rapide/cher ; cold = lent/moins cher.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-active-active-vs-active-passive",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "Active/Active vs Active/Passive",
    "english": "Tous actifs vs standby",
    "difference": "Active/active répartit charge.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-failover-vs-failback",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "Failover vs Failback",
    "english": "Bascule vers secours vs retour primaire",
    "difference": "Failback après restauration site principal.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-raid-0-vs-raid-1-vs-raid-5-6-10",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "RAID 0 vs RAID 1 vs RAID 5/6/10",
    "english": "Disk layouts",
    "difference": "RAID 0 pas redondant ; RAID 1 miroir ; 5/6 parité ; 10 miroir+stripe.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-12-r-silience-continuit-ups-vs-generator",
    "sectionId": "confusion-12-r-silience-continuit",
    "sectionTitle": "Résilience / continuité",
    "domain": "Security Architecture",
    "comparison": "UPS vs Generator",
    "english": "Batterie courte durée vs production électrique",
    "difference": "UPS couvre transition vers générateur.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-detection-vs-analysis",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Detection vs Analysis",
    "english": "Identifier vs comprendre",
    "difference": "Detection = alerte ; analysis = portée/cause.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-containment-vs-eradication",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Containment vs Eradication",
    "english": "Limiter vs supprimer",
    "difference": "Isoler machine = containment ; supprimer malware = eradication.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-eradication-vs-recovery",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Eradication vs Recovery",
    "english": "Nettoyer vs remettre service",
    "difference": "Recovery restaure fonctionnement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-recovery-vs-lessons-learned",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Recovery vs Lessons learned",
    "english": "Retour service vs amélioration post-incident",
    "difference": "Lessons learned après incident.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-threat-hunting-vs-incident-response",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Threat hunting vs Incident response",
    "english": "Recherche proactive vs réponse réactive",
    "difference": "Hunting cherche sans alerte confirmée.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-ioc-vs-ioa",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "IOC vs IOA",
    "english": "Indicator of Compromise vs Indicator of Attack",
    "difference": "IOC = preuve compromission ; IOA = comportement d’attaque.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-forensic-image-vs-backup",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Forensic image vs Backup",
    "english": "Copie preuve vs copie restauration",
    "difference": "Image préserve preuve bit-à-bit.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-chain-of-custody-vs-legal-hold",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Chain of custody vs Legal hold",
    "english": "Traçabilité preuve vs obligation de conservation",
    "difference": "Chain = qui/quand/comment ; legal hold = ne pas supprimer.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-acquisition-vs-preservation",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Acquisition vs Preservation",
    "english": "Collecte vs maintien intégrité",
    "difference": "Forensics : préserver avant analyser.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-e-discovery-vs-digital-forensics",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "E-discovery vs Digital forensics",
    "english": "Production légale vs analyse technique preuve",
    "difference": "E-discovery souvent juridique.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-mitre-att-ck-vs-cyber-kill-chain",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "MITRE ATT&CK vs Cyber Kill Chain",
    "english": "TTP matrix vs phases d’attaque",
    "difference": "ATT&CK détaillé techniques ; Kill Chain séquentiel.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-13-incident-response-investigation-playbook-vs-runbook",
    "sectionId": "confusion-13-incident-response-investigation",
    "sectionTitle": "Incident response / investigation",
    "domain": "Security Operations",
    "comparison": "Playbook vs Runbook",
    "english": "Procédure réponse sécurité vs procédure opérationnelle",
    "difference": "Playbook = scénario incident ; runbook = étapes techniques.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-risk-appetite-vs-risk-tolerance-vs-risk-threshold",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Risk appetite vs Risk tolerance vs Risk threshold",
    "english": "Appétit global vs tolérance vs seuil",
    "difference": "Appetite stratégique ; tolerance opérationnelle ; threshold déclenche action.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-risk-acceptance-vs-risk-avoidance",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Risk acceptance vs Risk avoidance",
    "english": "Accepter vs éviter",
    "difference": "Acceptance = vivre avec ; avoidance = arrêter activité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-risk-mitigation-vs-risk-transfer",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Risk mitigation vs Risk transfer",
    "english": "Réduire vs transférer",
    "difference": "Mitigation = contrôles ; transfer = assurance/contrat.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-residual-risk-vs-inherent-risk",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Residual risk vs Inherent risk",
    "english": "Après contrôles vs avant contrôles",
    "difference": "Residual reste malgré contrôles.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-sle-vs-ale-vs-aro",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "SLE vs ALE vs ARO",
    "english": "Single loss / annual loss / annual rate",
    "difference": "SLE = AV×EF ; ALE = SLE×ARO.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-qualitative-vs-quantitative-risk",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Qualitative vs Quantitative risk",
    "english": "Descriptif vs numérique",
    "difference": "Qualitative = low/medium/high ; quantitative = dollars/probabilités.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-risk-register-vs-risk-report",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Risk register vs Risk report",
    "english": "Registre suivi vs communication synthèse",
    "difference": "Register = liste vivante ; report = présentation.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-risk-owner-vs-asset-owner",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Risk owner vs Asset owner",
    "english": "Responsable risque vs responsable actif",
    "difference": "Peut être différent.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-due-care-vs-due-diligence",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Due care vs Due diligence",
    "english": "Agir raisonnablement vs vérifier correctement",
    "difference": "Diligence = analyse ; care = action.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-compliance-vs-governance",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Compliance vs Governance",
    "english": "Respect exigences vs pilotage global",
    "difference": "Governance définit direction ; compliance vérifie obligations.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-internal-audit-vs-external-audit",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Internal audit vs External audit",
    "english": "Audit interne vs indépendant",
    "difference": "External plus indépendant.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-assessment-vs-audit",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Assessment vs Audit",
    "english": "Évaluation vs vérification formelle",
    "difference": "Audit plus structuré/preuve/conformité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-attestation-vs-certification",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Attestation vs Certification",
    "english": "Déclaration/validation vs certification officielle",
    "difference": "Attestation peut soutenir conformité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-14-risque-grc-right-to-audit-vs-sla",
    "sectionId": "confusion-14-risque-grc",
    "sectionTitle": "Risque / GRC",
    "domain": "Security Program Management and Oversight",
    "comparison": "Right-to-audit vs SLA",
    "english": "Droit d’auditer fournisseur vs niveau service",
    "difference": "Clause contractuelle différente.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-policy-vs-standard",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "Policy vs Standard",
    "english": "High-level rule vs mandatory requirement",
    "difference": "Policy dit quoi ; standard précise exigences.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-procedure-vs-guideline",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "Procedure vs Guideline",
    "english": "Steps vs recommendation",
    "difference": "Procedure obligatoire détaillée ; guideline conseillé.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-aup-vs-nda",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "AUP vs NDA",
    "english": "Acceptable Use Policy vs Non-Disclosure Agreement",
    "difference": "AUP usage systèmes ; NDA confidentialité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-sla-vs-sow",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "SLA vs SOW",
    "english": "Service Level Agreement vs Statement of Work",
    "difference": "SLA niveaux service ; SOW travail à réaliser.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-mou-vs-moa",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "MOU vs MOA",
    "english": "Memorandum of Understanding vs Memorandum of Agreement",
    "difference": "MOU intention/entente ; MOA accord plus formel.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-msa-vs-sla",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "MSA vs SLA",
    "english": "Master Service Agreement vs Service Level Agreement",
    "difference": "MSA cadre contractuel ; SLA métriques service.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-bpa-vs-nda",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "BPA vs NDA",
    "english": "Business Partnership Agreement vs confidentiality",
    "difference": "BPA partenariat business ; NDA protège infos.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-onboarding-vs-offboarding",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "Onboarding vs Offboarding",
    "english": "Entrée vs départ",
    "difference": "Offboarding mal fait = anciens comptes actifs.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-change-management-vs-configuration-management",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "Change management vs Configuration management",
    "english": "Processus changement vs état/config des systèmes",
    "difference": "Change = approbation/test/backout ; configuration = baseline/CMDB.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-backout-plan-vs-rollback",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "Backout plan vs Rollback",
    "english": "Plan de retour arrière vs action de retour",
    "difference": "Backout plan documente ; rollback exécute.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-15-contrats-politiques-maintenance-window-vs-downtime",
    "sectionId": "confusion-15-contrats-politiques",
    "sectionTitle": "Contrats / politiques",
    "domain": "Security Program Management and Oversight",
    "comparison": "Maintenance window vs Downtime",
    "english": "Période prévue vs interruption réelle",
    "difference": "Window limite impact attendu.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-16-email-identit-domaine-spf-vs-dkim",
    "sectionId": "confusion-16-email-identit-domaine",
    "sectionTitle": "Email / identité domaine",
    "domain": "Security Operations",
    "comparison": "SPF vs DKIM",
    "english": "Sender Policy Framework vs DomainKeys Identified Mail",
    "difference": "SPF autorise serveurs ; DKIM signe message.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-16-email-identit-domaine-dkim-vs-dmarc",
    "sectionId": "confusion-16-email-identit-domaine",
    "sectionTitle": "Email / identité domaine",
    "domain": "Security Operations",
    "comparison": "DKIM vs DMARC",
    "english": "Signature vs policy/reporting",
    "difference": "DMARC décide reject/quarantine/report si échec SPF/DKIM.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-16-email-identit-domaine-spf-vs-dmarc",
    "sectionId": "confusion-16-email-identit-domaine",
    "sectionTitle": "Email / identité domaine",
    "domain": "Security Operations",
    "comparison": "SPF vs DMARC",
    "english": "Sender list vs policy",
    "difference": "SPF seul ne dit pas quoi faire en cas d’échec.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-16-email-identit-domaine-email-encryption-vs-email-signing",
    "sectionId": "confusion-16-email-identit-domaine",
    "sectionTitle": "Email / identité domaine",
    "domain": "Security Operations",
    "comparison": "Email encryption vs Email signing",
    "english": "Confidentiality vs integrity/authenticity",
    "difference": "S/MIME peut faire les deux.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-16-email-identit-domaine-spam-vs-phishing",
    "sectionId": "confusion-16-email-identit-domaine",
    "sectionTitle": "Email / identité domaine",
    "domain": "Security Operations",
    "comparison": "Spam vs Phishing",
    "english": "Unwanted bulk vs malicious deception",
    "difference": "Phishing cherche vol/compromission.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-log-aggregation-vs-correlation",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "Log aggregation vs Correlation",
    "english": "Centraliser vs relier événements",
    "difference": "SIEM fait les deux.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-alert-vs-incident",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "Alert vs Incident",
    "english": "Signal vs événement confirmé/traité",
    "difference": "Toute alerte n’est pas incident.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-event-vs-incident",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "Event vs Incident",
    "english": "Occurrence vs impact sécurité",
    "difference": "Incident viole politique/sécurité.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-netflow-vs-pcap",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "NetFlow vs PCAP",
    "english": "Flow metadata vs full packet capture",
    "difference": "NetFlow = qui/combien ; PCAP = contenu paquet.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-agent-vs-agentless-monitoring",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "Agent vs Agentless monitoring",
    "english": "Avec agent vs sans agent",
    "difference": "Agent plus riche ; agentless plus simple.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-syslog-vs-snmp-trap",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "Syslog vs SNMP trap",
    "english": "Logs vs alertes équipement",
    "difference": "Syslog journalise ; trap notifie événement.",
    "source": "Confusion local import"
  },
  {
    "id": "confusion-17-logs-monitoring-ueba-vs-siem",
    "sectionId": "confusion-17-logs-monitoring",
    "sectionTitle": "Logs / monitoring",
    "domain": "Security Operations",
    "comparison": "UEBA vs SIEM",
    "english": "Behavior analytics vs event management",
    "difference": "UEBA détecte anomalies comportementales.",
    "source": "Confusion local import"
  }
] satisfies ConfusionItem[];
