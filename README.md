# CertiFlow

Application de préparation aux certifications IT, avec une première concentration sur CompTIA Security+ SY0-701.

## Stack

- Next.js
- React
- Tailwind CSS
- Lucide React
- Recharts
- Supabase prêt à brancher

## Lancer l'application

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Importer la banque de quiz locale

La banque Security+ fournie dans `C:\Users\juven\Documents\QUizzzDavidSeidl.txt` peut être régénérée avec :

```bash
npm run import:seidl
```

Le script extrait les questions, les choix A-D, la bonne réponse et l'explication, puis génère `data/seidl-questions.ts`.

Les examens blancs fournis dans `C:\Users\juven\Documents\ExamsSuite.txt` peuvent être régénérés avec :

```bash
npm run import:exams
```

Le script détecte tous les blocs `exam ...`, extrait les questions valides, puis génère `data/exam-suite.ts`.

Le contenu de cours/flashcards fourni dans `C:\Users\juven\Documents\flashcard cours.txt` peut être régénéré avec :

```bash
npm run import:study
```

Le script détecte les 17 thèmes, les mappe aux domaines SY0-701, puis génère `data/study-content.ts`.

Les acronymes fournis dans `C:\Users\juven\Documents\flashcardAcronyms.txt` peuvent être régénérés avec :

```bash
npm run import:acronyms
```

Le script détecte les thèmes d'acronymes et génère `data/acronym-flashcards.ts`.

Les ports et protocoles fournis dans `C:\Users\juven\Documents\FlashcardPorts.txt` peuvent être régénérés avec :

```bash
npm run import:ports
```

Le script extrait le port, le protocole, la signification anglaise, l'utilité et l'alternative sécurisée, puis génère `data/port-flashcards.ts`.

Les confusions fréquentes fournies dans `C:\Users\juven\Documents\Confusion.txt` peuvent être régénérées avec :

```bash
npm run import:confusions
```

Le script extrait les comparaisons, la signification anglaise et la différence utile en français, puis génère `data/confusions.ts`.

Les commandes et outils fournis dans `C:\Users\juven\Documents\Commandes et outils fréquents.txt` peuvent être régénérés avec :

```bash
npm run import:commands
```

Le script extrait les commandes/outils, les confusions fréquentes et les scénarios d'examen, puis génère `data/command-tools.ts`.

## Modules inclus

- Tableau de bord avec jours restants avant le 25 mai 2026
- Cours par domaine SY0-701 et par thème
- Confusions fréquentes à maîtriser sans passer par les quiz
- Quiz alimenté par la banque locale David Seidl avec explications et journal d'erreurs local
- PBQ simple avec score partiel
- Flashcards par paquet: acronymes, ports/protocoles, commandes/outils, termes techniques
- Ports, protocoles, commandes, outils et scénarios d'examen
- Examens blancs fixes importés et examens aléatoires 30/60/90 questions
- Recherche globale cours, flashcards, quiz et examens
- Plan de révision intensif
- Assistant IA simulé, prêt à être remplacé par une route API OpenAI

## Ancien prototype

Les anciens fichiers `index.html`, `styles.css` et `app.js` restent présents comme prototype statique de départ. La version principale est maintenant la version Next.js dans `app/`.
