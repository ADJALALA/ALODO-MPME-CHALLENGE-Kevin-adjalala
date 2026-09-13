# ALODO MPME — Prototype de diagnostic

Prototype réalisé dans le cadre du challenge de sélection ALODO TECH.

## 1. Présentation

Une application web (SPA) en 3 écrans qui simule un parcours de diagnostic
MPME sur 3 dimensions : **Finance**, **Commercial** et **Digitalisation**.
L'utilisateur répond à 9 questions (3 par dimension), puis obtient un score
global, un score par dimension, un point fort, un axe à renforcer et une
recommandation.

## 2. Choix produit — pourquoi ces dimensions et ces questions ?

J'ai volontairement limité le périmètre à 3 dimensions sur les 8 possibles. J'ai choisi **Finance, Commercial et Digitalisation** car ce
sont, à mon sens, les trois piliers les plus déterminants et les plus
rapides à évaluer pour une micro/petite entreprise informelle ou
semi-formelle en Afrique de l'Ouest : la plupart démarrent sans séparation
financière claire, dépendent fortement du bouche-à-oreille, et n'ont pas
encore structuré leur usage des outils numériques (WhatsApp Business,
Mobile Money). Ce trio permet aussi un parcours cohérent : on part de la
santé financière, on regarde comment l'entreprise génère du revenu, puis
comment elle utilise le numérique pour soutenir les deux premiers piliers.

Les questions mélangent volontairement les types demandés (oui/non, choix
unique, choix multiple, échelle, tranche) pour montrer la gestion de
plusieurs formats dans une seule logique de scoring cohérente (voir
`src/utils/scoring.js` pour le détail du calcul).

## 3. Choix techniques — pourquoi cette stack ?

- **Vue 3 (Composition API)** : stack frontend que je maîtrise et utilise au
  quotidien idéal pour site statique + Animation fluide.
- **Pinia** : état du parcours (question courante, réponses, résultat)
  centralisé dans un seul store, plus simple à raisonner que du state
  local éclaté entre composants.
- **Vue Router** : un écran = une route, ce qui rend le parcours explicite
  et permet de rafraîchir la page sans tout perdre (grâce à la persistance
  localStorage).
- **Aucun backend, aucune base de données** : les données (questions,
  réponses, résultat) sont mockées et stockées en local (`localStorage`).
  Plus simple et convenable pour un prototype
- **Tailwind CSS v4** : styles utilitaires directement dans les templates,
  avec une palette et des polices custom déclarées via `@theme` dans
  `src/style.css` (pas de `tailwind.config.js`, approche CSS-first de la
  v4) pour garder une identité visuelle cohérente sans réécrire de CSS à
  la main à chaque composant.

## 4. Installation

```bash
npm install
npm run dev
```

L'application est disponible en local sur `http://localhost:5173`.

Pour générer une version de production :

```bash
npm run build
npm run preview
```
Deploiement en ligne sur : https://alodo-mpme-prototype.vercel.app/

## 5. Fonctionnalités

- Écran d'introduction avec présentation du diagnostic.
- Parcours de 9 questions avec barre de progression et repère
  "Question X/9 — Dimension".
- Gestion de 5 types de questions (oui/non, choix unique, choix multiple,
  tranche, échelle) dans un seul composant réutilisable (`QuestionCard.vue`).
- Navigation arrière pour corriger une réponse précédente.
- Calcul du score (global + par dimension), identification du point fort
  et du point faible, recommandation textuelle adaptée.
- Persistance locale (localStorage) : la progression survit à un
  rechargement de page.
- Interface responsive, testée du mobile au desktop.

## 6. Limites (volontairement laissées de côté)

- Seulement 3 dimensions sur 8,.
- Pas de compte utilisateur ni d'historique multi-sessions.
- Pas de dashboard agrégé multi-MPME (hors périmètre du prototype).
- La logique de recommandation est une table de textes simples par palier
  de score, pas un moteur de règles avancé.
- Pas de tests automatisés 

## 7. Améliorations possibles avec plus de temps

- Couvrir les 8 dimensions avec un système de questions conditionnelles.
- Un vrai back-office pour qu'ALODO puisse modifier les questions et leurs
  poids sans toucher au code.
- Historiser les diagnostics d'une même MPME pour visualiser une
  progression dans le temps.
- Ajouter des tests unitaires sur `scoring.js`, qui est la partie la plus
  critique à fiabiliser.

## Bonus — piste d'amélioration produit

Une évolution naturelle serait un **diagnostic adaptatif** : le parcours de
questions s'ajusterait selon le profil déclaré en début de diagnostic
(secteur d'activité, nombre d'employés, statut juridique). Par exemple, une
entreprise avec du personnel verrait apparaître des questions RH, tandis
qu'une activité individuelle sans stock physique sauterait les questions
liées aux opérations et à la gestion des stocks. Techniquement, cela
reviendrait à ajouter un champ `condition` sur chaque question dans
`questions.js`, évalué par le store avant d'afficher la question suivante —
une extension naturelle de l'architecture actuelle, sans refonte majeure.
