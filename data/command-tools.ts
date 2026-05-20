export type CommandTool = {
  id: string;
  name: string;
  english: string;
  purpose: string;
  examTip: string;
  domain: "Security Operations";
  source: "Commandes et outils fréquents local import";
};

export type CommandToolConfusion = {
  id: string;
  comparison: string;
  difference: string;
  sectionTitle: "Commandes et outils";
  domain: "Security Operations";
  source: "Commandes et outils fréquents local import";
};

export type CommandToolScenario = {
  id: string;
  scenario: string;
  likelyTool: string;
  domain: "Security Operations";
  source: "Commandes et outils fréquents local import";
};

export const commandTools = [
  {
    "id": "command-tool-ping",
    "name": "ping",
    "english": "Packet Internet Groper",
    "purpose": "Tester si une machine répond sur le réseau.",
    "examTip": "Utilise ICMP. Sert à vérifier la connectivité de base.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-tracert",
    "name": "tracert",
    "english": "Trace Route",
    "purpose": "Afficher le chemin réseau vers une destination sous Windows.",
    "examTip": "Utile pour diagnostiquer où le trafic bloque.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-traceroute",
    "name": "traceroute",
    "english": "Trace Route",
    "purpose": "Version Linux/macOS de tracert.",
    "examTip": "Même logique que tracert.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ipconfig",
    "name": "ipconfig",
    "english": "IP Configuration",
    "purpose": "Afficher/configurer les paramètres IP sous Windows.",
    "examTip": "ipconfig /all, ipconfig /release, ipconfig /renew.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ifconfig",
    "name": "ifconfig",
    "english": "Interface Configuration",
    "purpose": "Ancienne commande Linux pour interfaces réseau.",
    "examTip": "Souvent remplacée par ip.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ip",
    "name": "ip",
    "english": "IP command",
    "purpose": "Gérer IP, routes, interfaces sous Linux.",
    "examTip": "Moderne : ip addr, ip route, ip link.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-netstat",
    "name": "netstat",
    "english": "Network Statistics",
    "purpose": "Voir connexions réseau, ports ouverts, routes.",
    "examTip": "Ancien mais très testé.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ss",
    "name": "ss",
    "english": "Socket Statistics",
    "purpose": "Alternative moderne à netstat sous Linux.",
    "examTip": "Plus rapide, plus détaillé.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-nslookup",
    "name": "nslookup",
    "english": "Name Server Lookup",
    "purpose": "Interroger DNS.",
    "examTip": "Vérifier résolution nom ↔ IP.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-dig",
    "name": "dig",
    "english": "Domain Information Groper",
    "purpose": "Outil DNS avancé.",
    "examTip": "Plus puissant que nslookup.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-host",
    "name": "host",
    "english": "Host lookup",
    "purpose": "Requête DNS simple sous Linux.",
    "examTip": "Résolution rapide d’un domaine.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-arp",
    "name": "arp",
    "english": "Address Resolution Protocol tool",
    "purpose": "Voir/modifier cache ARP.",
    "examTip": "Utile pour détecter ARP poisoning.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-route",
    "name": "route",
    "english": "Routing table tool",
    "purpose": "Afficher/modifier table de routage.",
    "examTip": "Remplacé souvent par ip route.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-curl",
    "name": "curl",
    "english": "Client URL",
    "purpose": "Envoyer requêtes HTTP/HTTPS/API.",
    "examTip": "Tester headers, certificats, APIs.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-wget",
    "name": "wget",
    "english": "Web Get",
    "purpose": "Télécharger fichiers depuis web/FTP.",
    "examTip": "Utile pour récupérer fichiers/scripts.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ssh",
    "name": "ssh",
    "english": "Secure Shell",
    "purpose": "Administration distante chiffrée.",
    "examTip": "Alternative sécurisée à Telnet.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-scp",
    "name": "scp",
    "english": "Secure Copy Protocol",
    "purpose": "Copier fichiers via SSH.",
    "examTip": "Simple, sécurisé.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-sftp",
    "name": "sftp",
    "english": "SSH File Transfer Protocol",
    "purpose": "Transfert de fichiers sécurisé via SSH.",
    "examTip": "Alternative sécurisée à FTP.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-telnet",
    "name": "telnet",
    "english": "Teletype Network",
    "purpose": "Connexion distante non chiffrée.",
    "examTip": "À éviter ; parfois utilisé pour tester ports.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ftp",
    "name": "ftp",
    "english": "File Transfer Protocol",
    "purpose": "Transfert de fichiers non sécurisé.",
    "examTip": "Alternative : SFTP/FTPS.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-nmap",
    "name": "nmap",
    "english": "Network Mapper",
    "purpose": "Scanner réseau, ports, services.",
    "examTip": "Très important : reconnaissance, ports ouverts.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-netcat-nc",
    "name": "netcat / nc",
    "english": "Network Cat",
    "purpose": "Lire/écrire sur connexions TCP/UDP.",
    "examTip": "Peut tester ports, bannières, shells. Outil puissant.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-tcpdump",
    "name": "tcpdump",
    "english": "TCP Dump",
    "purpose": "Capture réseau en ligne de commande.",
    "examTip": "Génère/analyse trafic réseau.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-wireshark",
    "name": "Wireshark",
    "english": "Packet analyzer",
    "purpose": "Analyse graphique des paquets.",
    "examTip": "Lire PCAP, comprendre trafic réseau.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-tshark",
    "name": "tshark",
    "english": "Terminal Wireshark",
    "purpose": "Wireshark en ligne de commande.",
    "examTip": "Analyse PCAP sans interface graphique.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-hping3",
    "name": "hping3",
    "english": "Packet crafting tool",
    "purpose": "Générer paquets TCP/IP personnalisés.",
    "examTip": "Tests firewall, SYN, ICMP. Peut être offensif/lab.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-openssl",
    "name": "openssl",
    "english": "Open Secure Sockets Layer toolkit",
    "purpose": "Tester TLS, générer clés, CSR, certificats.",
    "examTip": "Très important pour PKI/TLS.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-gpg",
    "name": "gpg",
    "english": "GNU Privacy Guard",
    "purpose": "Chiffrement/signature de fichiers/messages.",
    "examTip": "Utilise OpenPGP.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-hashcat",
    "name": "hashcat",
    "english": "Password recovery tool",
    "purpose": "Tester/cracker des hashes.",
    "examTip": "À connaître conceptuellement : brute force, dictionary.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-john",
    "name": "john",
    "english": "John the Ripper",
    "purpose": "Outil de cracking de mots de passe.",
    "examTip": "Même usage que hashcat, souvent en lab.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-chmod",
    "name": "chmod",
    "english": "Change Mode",
    "purpose": "Modifier permissions Linux.",
    "examTip": "Exemple : chmod 600 file.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-chown",
    "name": "chown",
    "english": "Change Owner",
    "purpose": "Modifier propriétaire fichier Linux.",
    "examTip": "Propriétaire/groupe.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ls",
    "name": "ls",
    "english": "List",
    "purpose": "Lister fichiers Linux.",
    "examTip": "ls -la affiche fichiers cachés + permissions.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-ps",
    "name": "ps",
    "english": "Process Status",
    "purpose": "Voir processus actifs.",
    "examTip": "Investigation système.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-top",
    "name": "top",
    "english": "Table of Processes",
    "purpose": "Voir processus/CPU/RAM en temps réel.",
    "examTip": "Diagnostic performance/processus suspects.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-kill",
    "name": "kill",
    "english": "Kill process",
    "purpose": "Terminer un processus Linux.",
    "examTip": "kill -9 PID force l’arrêt.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-systemctl",
    "name": "systemctl",
    "english": "System Control",
    "purpose": "Gérer services Linux systemd.",
    "examTip": "Start/stop/restart/status.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-journalctl",
    "name": "journalctl",
    "english": "Journal Control",
    "purpose": "Lire logs systemd.",
    "examTip": "Très utile investigation Linux.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-grep",
    "name": "grep",
    "english": "Global Regular Expression Print",
    "purpose": "Rechercher du texte dans fichiers/logs.",
    "examTip": "Indispensable pour filtrer logs.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-find",
    "name": "find",
    "english": "Find files",
    "purpose": "Rechercher fichiers par nom, date, taille.",
    "examTip": "Investigation fichiers suspects.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-awk",
    "name": "awk",
    "english": "Text processing tool",
    "purpose": "Extraire/traiter colonnes texte.",
    "examTip": "Logs et scripts.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-sed",
    "name": "sed",
    "english": "Stream Editor",
    "purpose": "Modifier texte en flux.",
    "examTip": "Automatisation/scripts.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-cat",
    "name": "cat",
    "english": "Concatenate",
    "purpose": "Afficher contenu fichier.",
    "examTip": "Simple lecture.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-less",
    "name": "less",
    "english": "File pager",
    "purpose": "Lire gros fichiers page par page.",
    "examTip": "Plus pratique que cat pour logs.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-tail",
    "name": "tail",
    "english": "Display file end",
    "purpose": "Afficher fin d’un fichier.",
    "examTip": "tail -f suit logs en temps réel.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-head",
    "name": "head",
    "english": "Display file beginning",
    "purpose": "Afficher début d’un fichier.",
    "examTip": "Voir premières lignes.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-whoami",
    "name": "whoami",
    "english": "Who am I",
    "purpose": "Afficher l’utilisateur courant.",
    "examTip": "Vérifier contexte/privilèges.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-id",
    "name": "id",
    "english": "Identity",
    "purpose": "Afficher UID/GID/groupes Linux.",
    "examTip": "Vérifier permissions utilisateur.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-sudo",
    "name": "sudo",
    "english": "Superuser Do",
    "purpose": "Exécuter commande avec privilèges élevés.",
    "examTip": "Principe du moindre privilège.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-su",
    "name": "su",
    "english": "Substitute User",
    "purpose": "Changer d’utilisateur.",
    "examTip": "Souvent root.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-passwd",
    "name": "passwd",
    "english": "Password",
    "purpose": "Modifier mot de passe utilisateur.",
    "examTip": "Gestion comptes Linux.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-useradd",
    "name": "useradd",
    "english": "User Add",
    "purpose": "Créer utilisateur Linux.",
    "examTip": "Provisioning.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-usermod",
    "name": "usermod",
    "english": "User Modify",
    "purpose": "Modifier utilisateur Linux.",
    "examTip": "Groupes, shell, verrouillage.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-groupadd",
    "name": "groupadd",
    "english": "Group Add",
    "purpose": "Créer groupe Linux.",
    "examTip": "Gestion permissions.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-df",
    "name": "df",
    "english": "Disk Free",
    "purpose": "Voir espace disque disponible.",
    "examTip": "Disponibilité/performance.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-du",
    "name": "du",
    "english": "Disk Usage",
    "purpose": "Voir taille fichiers/dossiers.",
    "examTip": "Trouver fichiers volumineux.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-mount",
    "name": "mount",
    "english": "Mount filesystem",
    "purpose": "Monter un système de fichiers.",
    "examTip": "Disques, partages, forensic.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-dd",
    "name": "dd",
    "english": "Data Duplicator",
    "purpose": "Copier bit-à-bit un disque/fichier.",
    "examTip": "Forensic image, dangereux si mal utilisé.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-shasum-sha256sum",
    "name": "shasum / sha256sum",
    "english": "SHA checksum",
    "purpose": "Calculer hash SHA.",
    "examTip": "Vérifier intégrité fichier.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-md5sum",
    "name": "md5sum",
    "english": "MD5 checksum",
    "purpose": "Calculer hash MD5.",
    "examTip": "Ancien, faible, encore utilisé pour vérification simple.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-powershell",
    "name": "PowerShell",
    "english": "Microsoft automation shell",
    "purpose": "Administration Windows avancée.",
    "examTip": "Très utilisé pour scripting, logs, sécurité.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-get-process",
    "name": "Get-Process",
    "english": "PowerShell cmdlet",
    "purpose": "Lister processus Windows.",
    "examTip": "Équivalent amélioré de tasklist.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-get-service",
    "name": "Get-Service",
    "english": "PowerShell cmdlet",
    "purpose": "Lister services Windows.",
    "examTip": "Vérifier services suspects.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-get-eventlog",
    "name": "Get-EventLog",
    "english": "PowerShell cmdlet",
    "purpose": "Lire journaux Windows classiques.",
    "examTip": "Logs sécurité/système.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-get-winevent",
    "name": "Get-WinEvent",
    "english": "PowerShell cmdlet",
    "purpose": "Lire événements Windows modernes.",
    "examTip": "Plus puissant que Get-EventLog.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-net-user",
    "name": "net user",
    "english": "Windows account command",
    "purpose": "Gérer utilisateurs locaux Windows.",
    "examTip": "Voir/créer/modifier comptes.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-net-use",
    "name": "net use",
    "english": "Windows network mapping",
    "purpose": "Mapper partages réseau.",
    "examTip": "SMB, accès fichiers.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-net-share",
    "name": "net share",
    "english": "Windows share command",
    "purpose": "Voir/créer partages Windows.",
    "examTip": "Détecter partages exposés.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-tasklist",
    "name": "tasklist",
    "english": "Task List",
    "purpose": "Lister processus Windows.",
    "examTip": "Investigation.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-taskkill",
    "name": "taskkill",
    "english": "Task Kill",
    "purpose": "Terminer processus Windows.",
    "examTip": "Réponse incident.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-gpupdate",
    "name": "gpupdate",
    "english": "Group Policy Update",
    "purpose": "Forcer mise à jour GPO.",
    "examTip": "Sécurité Windows/AD.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-gpresult",
    "name": "gpresult",
    "english": "Group Policy Result",
    "purpose": "Voir politiques appliquées.",
    "examTip": "Diagnostic GPO.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-sfc",
    "name": "sfc",
    "english": "System File Checker",
    "purpose": "Vérifier fichiers système Windows.",
    "examTip": "Intégrité système.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-chkdsk",
    "name": "chkdsk",
    "english": "Check Disk",
    "purpose": "Vérifier disque Windows.",
    "examTip": "Santé système fichiers.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-regedit",
    "name": "regedit",
    "english": "Registry Editor",
    "purpose": "Modifier registre Windows.",
    "examTip": "Puissant, risqué.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-event-viewer",
    "name": "Event Viewer",
    "english": "Windows Event Viewer",
    "purpose": "Lire journaux Windows.",
    "examTip": "Investigation authentification, erreurs, sécurité.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-sysinternals",
    "name": "Sysinternals",
    "english": "Microsoft admin tools",
    "purpose": "Suite d’outils Windows avancés.",
    "examTip": "Process Monitor, Autoruns, TCPView.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-autoruns",
    "name": "Autoruns",
    "english": "Sysinternals Autoruns",
    "purpose": "Voir programmes au démarrage.",
    "examTip": "Détecter persistance malware.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-process-explorer",
    "name": "Process Explorer",
    "english": "Sysinternals Process Explorer",
    "purpose": "Analyse avancée des processus.",
    "examTip": "Parent/child process, DLL, signatures.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-tcpview",
    "name": "TCPView",
    "english": "Sysinternals TCPView",
    "purpose": "Voir connexions réseau Windows.",
    "examTip": "Alternative graphique à netstat.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-whois",
    "name": "whois",
    "english": "Whois lookup",
    "purpose": "Trouver infos domaine/IP.",
    "examTip": "OSINT, reconnaissance.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-theharvester",
    "name": "theHarvester",
    "english": "OSINT harvesting tool",
    "purpose": "Collecter emails, domaines, hosts.",
    "examTip": "Recon passive.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-maltego",
    "name": "Maltego",
    "english": "OSINT link analysis",
    "purpose": "Visualiser relations entre entités.",
    "examTip": "OSINT graphique.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-shodan",
    "name": "Shodan",
    "english": "Search engine for internet-connected devices",
    "purpose": "Rechercher systèmes exposés sur Internet.",
    "examTip": "OSINT, exposition publique.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-censys",
    "name": "Censys",
    "english": "Internet asset search",
    "purpose": "Recherche actifs/certificats exposés.",
    "examTip": "Similaire à Shodan.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-virustotal",
    "name": "VirusTotal",
    "english": "Malware/file reputation service",
    "purpose": "Vérifier hash, URL, fichier suspect.",
    "examTip": "Attention confidentialité des fichiers uploadés.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-yara",
    "name": "YARA",
    "english": "Malware pattern matching",
    "purpose": "Règles pour détecter familles malware.",
    "examTip": "Threat hunting/malware analysis.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-sigma",
    "name": "Sigma",
    "english": "Generic SIEM rule format",
    "purpose": "Règles détection génériques convertibles SIEM.",
    "examTip": "Blue team.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-snort",
    "name": "Snort",
    "english": "IDS/IPS engine",
    "purpose": "Détection réseau par signatures.",
    "examTip": "Règles IDS/IPS.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-suricata",
    "name": "Suricata",
    "english": "IDS/IPS/NSM engine",
    "purpose": "Alternative à Snort.",
    "examTip": "Analyse réseau.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-zeek",
    "name": "Zeek",
    "english": "Network Security Monitor",
    "purpose": "Analyse comportement réseau.",
    "examTip": "Produit logs riches, pas juste signatures.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-metasploit",
    "name": "Metasploit",
    "english": "Exploitation framework",
    "purpose": "Tester exploitabilité en pentest autorisé.",
    "examTip": "À connaître conceptuellement.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-burp-suite",
    "name": "Burp Suite",
    "english": "Web security testing proxy",
    "purpose": "Tester applications web.",
    "examTip": "Intercepter HTTP, tester XSS/SQLi.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-owasp-zap",
    "name": "OWASP ZAP",
    "english": "Zed Attack Proxy",
    "purpose": "Scanner/tester apps web.",
    "examTip": "Alternative open source à Burp.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-nikto",
    "name": "Nikto",
    "english": "Web server scanner",
    "purpose": "Scanner mauvaises configs web.",
    "examTip": "Recon web.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-nessus",
    "name": "Nessus",
    "english": "Vulnerability scanner",
    "purpose": "Scanner vulnérabilités.",
    "examTip": "Credentialed/non-credentialed scans.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-tool-openvas-greenbone",
    "name": "OpenVAS / Greenbone",
    "english": "Vulnerability scanner",
    "purpose": "Scanner vulnérabilités open source.",
    "examTip": "Alternative à Nessus.",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  }
] satisfies CommandTool[];

export const commandToolConfusions = [
  {
    "id": "command-confusion-ping-vs-traceroute-tracert",
    "comparison": "ping vs traceroute/tracert",
    "difference": "ping teste si ça répond ; traceroute montre le chemin.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-nslookup-vs-dig",
    "comparison": "nslookup vs dig",
    "difference": "nslookup simple ; dig plus détaillé et préféré en diagnostic avancé.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-netstat-vs-ss",
    "comparison": "netstat vs ss",
    "difference": "netstat ancien ; ss moderne sous Linux.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-ifconfig-vs-ip",
    "comparison": "ifconfig vs ip",
    "difference": "ifconfig ancien ; ip moderne.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-tcpdump-vs-wireshark",
    "comparison": "tcpdump vs Wireshark",
    "difference": "tcpdump CLI ; Wireshark interface graphique.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-nmap-vs-nessus",
    "comparison": "Nmap vs Nessus",
    "difference": "Nmap découvre ports/services ; Nessus cherche vulnérabilités.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-vulnerability-scanner-vs-exploitation-framework",
    "comparison": "Vulnerability scanner vs Exploitation framework",
    "difference": "Nessus/OpenVAS détectent ; Metasploit exploite/teste.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-siem-rules-vs-yara-vs-sigma",
    "comparison": "SIEM rules vs YARA vs Sigma",
    "difference": "YARA détecte fichiers/malware ; Sigma décrit règles SIEM ; SIEM corrèle logs.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-curl-vs-wget",
    "comparison": "curl vs wget",
    "difference": "curl teste requêtes/API ; wget télécharge surtout des fichiers.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-ssh-vs-telnet",
    "comparison": "ssh vs telnet",
    "difference": "ssh chiffré ; telnet en clair.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-sftp-vs-ftp",
    "comparison": "sftp vs ftp",
    "difference": "sftp sécurisé via SSH ; ftp non chiffré.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-dd-vs-backup-classique",
    "comparison": "dd vs backup classique",
    "difference": "dd fait copie bit-à-bit, utile forensic ; backup sert restauration métier.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-confusion-hashcat-vs-sha256sum",
    "comparison": "hashcat vs sha256sum",
    "difference": "sha256sum calcule un hash ; hashcat tente de casser des hashes.",
    "sectionTitle": "Commandes et outils",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  }
] satisfies CommandToolConfusion[];

export const commandToolScenarios = [
  {
    "id": "command-scenario-tester-connectivit-simple",
    "scenario": "Tester connectivité simple",
    "likelyTool": "ping",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-o-le-trafic-s-arr-te",
    "scenario": "Voir où le trafic s’arrête",
    "likelyTool": "tracert / traceroute",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-v-rifier-dns",
    "scenario": "Vérifier DNS",
    "likelyTool": "nslookup / dig",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-ports-ouverts-localement",
    "scenario": "Voir ports ouverts localement",
    "likelyTool": "netstat / ss",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-scanner-ports-d-un-serveur",
    "scenario": "Scanner ports d’un serveur",
    "likelyTool": "nmap",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-capturer-paquets-en-cli",
    "scenario": "Capturer paquets en CLI",
    "likelyTool": "tcpdump",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-analyser-un-pcap-visuellement",
    "scenario": "Analyser un PCAP visuellement",
    "likelyTool": "Wireshark",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-v-rifier-certificat-tls",
    "scenario": "Vérifier certificat TLS",
    "likelyTool": "openssl",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-t-l-charger-fichier-depuis-url",
    "scenario": "Télécharger fichier depuis URL",
    "likelyTool": "wget / curl",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-tester-une-api-http",
    "scenario": "Tester une API HTTP",
    "likelyTool": "curl",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-v-rifier-hash-fichier",
    "scenario": "Vérifier hash fichier",
    "likelyTool": "sha256sum / shasum",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-chercher-texte-dans-logs",
    "scenario": "Chercher texte dans logs",
    "likelyTool": "grep",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-suivre-logs-en-direct",
    "scenario": "Suivre logs en direct",
    "likelyTool": "tail -f",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-processus-linux",
    "scenario": "Voir processus Linux",
    "likelyTool": "ps / top",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-services-linux",
    "scenario": "Voir services Linux",
    "likelyTool": "systemctl",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-logs-linux-systemd",
    "scenario": "Voir logs Linux systemd",
    "likelyTool": "journalctl",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-logs-windows",
    "scenario": "Voir logs Windows",
    "likelyTool": "Event Viewer / Get-WinEvent",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-persistance-windows",
    "scenario": "Voir persistance Windows",
    "likelyTool": "Autoruns",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-voir-connexions-windows",
    "scenario": "Voir connexions Windows",
    "likelyTool": "TCPView / netstat",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-scanner-vuln-rabilit-s",
    "scenario": "Scanner vulnérabilités",
    "likelyTool": "Nessus / OpenVAS",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-tester-app-web",
    "scenario": "Tester app web",
    "likelyTool": "Burp Suite / OWASP ZAP",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  },
  {
    "id": "command-scenario-osint-domaine-email",
    "scenario": "OSINT domaine/email",
    "likelyTool": "whois / theHarvester / Shodan",
    "domain": "Security Operations",
    "source": "Commandes et outils fréquents local import"
  }
] satisfies CommandToolScenario[];
