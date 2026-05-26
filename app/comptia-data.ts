export interface CompTiaDomain {
  id: string;
  name: string;
  subDomains: {
    id: string;
    name: string;
    themes: string[];
  }[];
}

export const COMPTIA_SY0701_STRUCTURE: CompTiaDomain[] = [
  {
    id: "D1",
    name: "General Security Concepts (12%)",
    subDomains: [
      { id: "1.1", name: "Compare security controls", themes: ["Technical controls", "Administrative controls", "Physical controls", "Preventive vs Detective"] },
      { id: "1.2", name: "Fundamental security concepts", themes: ["CIA Triad", "Non-repudiation", "AAA Framework", "Gap analysis"] },
      { id: "1.3", name: "Change management", themes: ["Change approval", "Impact analysis", "Rollback planning", "Documentation"] },
      { id: "1.4", name: "Cryptographic solutions", themes: ["Symmetric encryption", "Asymmetric encryption", "Hashing", "PKI", "Digital signatures"] },
    ],
  },
  {
    id: "D2",
    name: "Threats, Vulnerabilities, and Mitigations (22%)",
    subDomains: [
      { id: "2.1", name: "Compare threat actors", themes: ["Nation-state", "Organized crime", "Hacktivist", "Insider threat", "Script kiddie"] },
      { id: "2.2", name: "Common attack vectors", themes: ["Phishing", "Social engineering", "Malware", "Ransomware", "Brute force", "DDoS"] },
      { id: "2.3", name: "Vulnerability types", themes: ["SQL Injection", "XSS", "Buffer overflow", "Race conditions", "Zero-day"] },
      { id: "2.4", name: "Indicators of compromise", themes: ["Unusual outbound traffic", "Anomalies in privileged user accounts", "DNS request anomalies", "Mismatched port-application traffic"] },
    ],
  },
  {
    id: "D3",
    name: "Security Architecture (18%)",
    subDomains: [
      { id: "3.1", name: "Secure network architecture", themes: ["Load balancing", "Firewalls", "WAF", "Segmentation", "VLANs", "Zero Trust", "SDN"] },
      { id: "3.2", name: "Cloud infrastructure", themes: ["IaaS", "PaaS", "SaaS", "Shared responsibility", "Cloud security controls"] },
      { id: "3.3", name: "Identity and access management", themes: ["MFA", "IAM", "SSO", "SAML", "OIDC", "Federation", "RBAC", "PAM"] },
    ],
  },
  {
    id: "D4",
    name: "Security Operations (28%)",
    subDomains: [
      { id: "4.1", name: "Incident response tools", themes: ["SIEM", "SOAR", "Nmap", "Netstat", "Wireshark", "Log analysis", "tcpdump"] },
      { id: "4.2", name: "Vulnerability management", themes: ["CVE/CVSS", "Scanning", "Penetration testing", "Patch management", "False positives"] },
      { id: "4.3", name: "Incident response process", themes: ["Preparation", "Identification", "Containment", "Eradication", "Recovery", "Lessons learned"] },
    ],
  },
  {
    id: "D5",
    name: "Security Program Management (10%)",
    subDomains: [
      { id: "5.1", name: "Governance and compliance", themes: ["ISO 27001", "NIST CSF", "PCI DSS", "GDPR", "Audit", "Security policies"] },
      { id: "5.2", name: "Risk management", themes: ["Quantitative risk", "Qualitative risk", "Risk register", "SLE/ALE/ARO", "Risk appetite"] },
      { id: "5.3", name: "Business continuity", themes: ["BCP", "DRP", "RTO/RPO", "Tabletop exercises", "After-action reports"] },
    ],
  },
];
