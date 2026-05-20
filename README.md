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

Puis ouvrir l'application en local sur le port de développement Next.js.

## Importer les banques locales

Les scripts d'import permettent de régénérer les fichiers de données utilisés par l'application.

```bash
npm run import:seidl
npm run import:exams
npm run import:messer
npm run import:study
npm run import:acronyms
npm run import:ports
npm run import:confusions
npm run import:commands
npm run import:pbq
```

Ces scripts lisent les sources locales de révision, extraient les questions, examens, PBQ, flashcards, ports, commandes et confusions, puis génèrent les fichiers TypeScript correspondants dans `data/`.

## Modules inclus

- Tableau de bord avec jours restants avant l'examen
- Cours par domaine SY0-701 et par thème
- Confusions fréquentes à maîtriser sans passer par les quiz
- Quiz avec explications et journal d'erreurs local
- PBQ interactives avec score partiel
- Flashcards par paquet: acronymes, ports/protocoles, commandes/outils, termes techniques
- Ports, protocoles, commandes, outils et scénarios d'examen
- Examens blancs fixes importés et examens aléatoires 30/60/90 questions
- Recherche globale cours, flashcards, quiz et examens
- Plan de révision intensif
- Assistant IA simulé, prêt à être remplacé par une route API OpenAI

## Déploiement

Le projet contient une configuration Netlify avec:

- commande de build: `npm run build`
- dossier publié: `.next`
- version Node: `20`

## Ancien prototype

Les anciens fichiers `index.html`, `styles.css` et `app.js` restent présents comme prototype statique de départ. La version principale est maintenant la version Next.js dans `app/`.
