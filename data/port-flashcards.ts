export type PortFlashcard = {
  id: string;
  port: string;
  protocol: string;
  english: string;
  details: string;
  secureAlternative: string;
  domain: "Security Architecture";
  source: "FlashcardPorts local import";
};

export const portFlashcards = [
  {
    "id": "port-20-21-tcp-ftp",
    "port": "20/21 TCP",
    "protocol": "FTP",
    "english": "File Transfer Protocol",
    "details": "Transfert de fichiers en clair. Port 21 = contrôle, port 20 = données en mode actif.",
    "secureAlternative": "SFTP 22, FTPS 990/21, SCP 22",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-22-tcp-ssh",
    "port": "22 TCP",
    "protocol": "SSH",
    "english": "Secure Shell",
    "details": "Administration distante chiffrée. Remplace Telnet.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-22-tcp-sftp",
    "port": "22 TCP",
    "protocol": "SFTP",
    "english": "SSH File Transfer Protocol",
    "details": "Transfert de fichiers sécurisé via SSH.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-22-tcp-scp",
    "port": "22 TCP",
    "protocol": "SCP",
    "english": "Secure Copy Protocol",
    "details": "Copie sécurisée de fichiers via SSH.",
    "secureAlternative": "SFTP souvent préféré",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-23-tcp-telnet",
    "port": "23 TCP",
    "protocol": "Telnet",
    "english": "Teletype Network",
    "details": "Administration distante en clair. Très risqué.",
    "secureAlternative": "SSH 22",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-25-tcp-smtp",
    "port": "25 TCP",
    "protocol": "SMTP",
    "english": "Simple Mail Transfer Protocol",
    "details": "Envoi d'emails serveur à serveur. Peut être en clair.",
    "secureAlternative": "SMTPS 465, SMTP Submission STARTTLS 587",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-53-udp-tcp-dns",
    "port": "53 UDP/TCP",
    "protocol": "DNS",
    "english": "Domain Name System",
    "details": "Résolution nom ↔ adresse IP. UDP courant, TCP pour transferts de zone ou grandes réponses.",
    "secureAlternative": "DoT 853, DoH 443, DNSSEC pour intégrité",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-67-68-udp-dhcp",
    "port": "67/68 UDP",
    "protocol": "DHCP",
    "english": "Dynamic Host Configuration Protocol",
    "details": "Attribution automatique d'adresse IP. 67 serveur, 68 client.",
    "secureAlternative": "Pas vraiment d'alternative directe ; sécuriser avec DHCP Snooping",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-69-udp-tftp",
    "port": "69 UDP",
    "protocol": "TFTP",
    "english": "Trivial File Transfer Protocol",
    "details": "Transfert simple sans authentification ni chiffrement.",
    "secureAlternative": "SFTP 22, SCP 22, FTPS",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-80-tcp-http",
    "port": "80 TCP",
    "protocol": "HTTP",
    "english": "HyperText Transfer Protocol",
    "details": "Web non chiffré.",
    "secureAlternative": "HTTPS 443",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-88-tcp-udp-kerberos",
    "port": "88 TCP/UDP",
    "protocol": "Kerberos",
    "english": "Kerberos Authentication Protocol",
    "details": "Authentification par tickets, fréquent en Active Directory.",
    "secureAlternative": "Déjà sécurisé si bien configuré",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-110-tcp-pop3",
    "port": "110 TCP",
    "protocol": "POP3",
    "english": "Post Office Protocol version 3",
    "details": "Téléchargement d'emails en clair.",
    "secureAlternative": "POP3S 995",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-123-udp-ntp",
    "port": "123 UDP",
    "protocol": "NTP",
    "english": "Network Time Protocol",
    "details": "Synchronisation de l'heure. Important pour logs, certificats, Kerberos.",
    "secureAlternative": "NTS quand disponible",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-135-tcp-rpc",
    "port": "135 TCP",
    "protocol": "RPC",
    "english": "Remote Procedure Call",
    "details": "Communications de services Windows.",
    "secureAlternative": "Restreindre par firewall/VPN",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-137-139-tcp-udp-netbios",
    "port": "137-139 TCP/UDP",
    "protocol": "NetBIOS",
    "english": "Network Basic Input/Output System",
    "details": "Ancien partage/nommage Windows.",
    "secureAlternative": "SMB 445 sécurisé, ou désactivation si inutile",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-143-tcp-imap",
    "port": "143 TCP",
    "protocol": "IMAP",
    "english": "Internet Message Access Protocol",
    "details": "Consultation emails sur serveur, souvent en clair.",
    "secureAlternative": "IMAPS 993",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-161-162-udp-snmp",
    "port": "161/162 UDP",
    "protocol": "SNMP",
    "english": "Simple Network Management Protocol",
    "details": "Supervision réseau. 161 requêtes, 162 traps. v1/v2c faibles.",
    "secureAlternative": "SNMPv3",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-389-tcp-udp-ldap",
    "port": "389 TCP/UDP",
    "protocol": "LDAP",
    "english": "Lightweight Directory Access Protocol",
    "details": "Requêtes annuaire, souvent Active Directory, en clair.",
    "secureAlternative": "LDAPS 636, ou LDAP avec STARTTLS",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-443-tcp-https",
    "port": "443 TCP",
    "protocol": "HTTPS",
    "english": "HyperText Transfer Protocol Secure",
    "details": "Web chiffré avec TLS.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-445-tcp-smb",
    "port": "445 TCP",
    "protocol": "SMB",
    "english": "Server Message Block",
    "details": "Partage fichiers/imprimantes Windows. Très ciblé.",
    "secureAlternative": "SMBv3 avec encryption, désactiver SMBv1",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-465-tcp-smtps",
    "port": "465 TCP",
    "protocol": "SMTPS",
    "english": "SMTP Secure",
    "details": "SMTP chiffré implicitement avec TLS.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-514-udp-syslog",
    "port": "514 UDP",
    "protocol": "Syslog",
    "english": "System Logging Protocol",
    "details": "Transmission de logs, souvent en clair.",
    "secureAlternative": "Syslog over TLS 6514",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-587-tcp-smtp-submission",
    "port": "587 TCP",
    "protocol": "SMTP Submission",
    "english": "Simple Mail Transfer Protocol Submission",
    "details": "Envoi email client vers serveur, souvent avec STARTTLS.",
    "secureAlternative": "Déjà sécurisé si STARTTLS obligatoire",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-636-tcp-ldaps",
    "port": "636 TCP",
    "protocol": "LDAPS",
    "english": "LDAP over SSL/TLS",
    "details": "LDAP chiffré.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-853-tcp-dot",
    "port": "853 TCP",
    "protocol": "DoT",
    "english": "DNS over TLS",
    "details": "DNS chiffré via TLS.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-993-tcp-imaps",
    "port": "993 TCP",
    "protocol": "IMAPS",
    "english": "IMAP over SSL/TLS",
    "details": "Consultation email chiffrée.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-995-tcp-pop3s",
    "port": "995 TCP",
    "protocol": "POP3S",
    "english": "POP3 over SSL/TLS",
    "details": "POP3 chiffré.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-1433-tcp-ms-sql",
    "port": "1433 TCP",
    "protocol": "MS SQL",
    "english": "Microsoft SQL Server",
    "details": "Base de données Microsoft SQL Server.",
    "secureAlternative": "TLS + firewall + VPN + moindre privilège",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-1521-tcp-oracle-db",
    "port": "1521 TCP",
    "protocol": "Oracle DB",
    "english": "Oracle Database Listener",
    "details": "Connexion aux bases Oracle.",
    "secureAlternative": "TLS + firewall + VPN",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-3306-tcp-mysql",
    "port": "3306 TCP",
    "protocol": "MySQL",
    "english": "MySQL Database Service",
    "details": "Connexion MySQL/MariaDB.",
    "secureAlternative": "TLS + firewall + VPN",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-3389-tcp-rdp",
    "port": "3389 TCP",
    "protocol": "RDP",
    "english": "Remote Desktop Protocol",
    "details": "Bureau distant Windows. Très attaqué.",
    "secureAlternative": "RDP via VPN, RD Gateway, MFA, ou SSH tunneling",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-5060-udp-tcp-sip",
    "port": "5060 UDP/TCP",
    "protocol": "SIP",
    "english": "Session Initiation Protocol",
    "details": "Signalisation VoIP non chiffrée.",
    "secureAlternative": "SIPS 5061",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  },
  {
    "id": "port-5061-tcp-sips",
    "port": "5061 TCP",
    "protocol": "SIPS",
    "english": "SIP Secure",
    "details": "Signalisation VoIP chiffrée avec TLS.",
    "secureAlternative": "Déjà sécurisé",
    "domain": "Security Architecture",
    "source": "FlashcardPorts local import"
  }
] satisfies PortFlashcard[];
