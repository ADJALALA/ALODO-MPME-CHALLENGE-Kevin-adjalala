export const questions = [
  // ---------------------------------------------------------------------
  // Dimension : FINANCE
  // ---------------------------------------------------------------------
  {
    id: 'fin_1',
    dimension: 'finance',
    type: 'single-choice',
    text: "Comment suivez-vous vos entrées et sorties d'argent ?",
    options: [
      { label: 'Aucun suivi particulier', points: 0 },
      { label: 'Sur papier / carnet', points: 1 },
      { label: 'De tête, sans support écrit régulier', points: 1 },
      { label: 'Fichier Excel ou équivalent', points: 3 },
      { label: 'Logiciel de comptabilité ou de gestion', points: 4 },
    ],
  },
  {
    id: 'fin_2',
    dimension: 'finance',
    type: 'scale',
    text: ' A quelle echelle connaissez-vous votre marge bénéficiaire par produit ou service ?',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Pas du tout', max: 'Très précisément' },
  },
  {
    id: 'fin_3',
    dimension: 'finance',
    type: 'yes-no',
    text: "Séparez-vous clairement les finances de l'entreprise de vos finances personnelles ?",
  },

  // ---------------------------------------------------------------------
  // Dimension : COMMERCIAL
  // ---------------------------------------------------------------------
  {
    id: 'com_1',
    dimension: 'commercial',
    type: 'range',
    text: 'Combien de nouveaux clients avez-vous acquis le mois dernier ?',
    options: [
      { label: '0', points: 0 },
      { label: '1 à 3', points: 1 },
      { label: '4 à 10', points: 2 },
      { label: '11 à 20', points: 3 },
      { label: 'Plus de 20', points: 4 },
    ],
  },
  {
    id: 'com_2',
    dimension: 'commercial',
    type: 'single-choice',
    text: "Comment attirez-vous l'essentiel de vos clients aujourd'hui ?",
    options: [
      { label: 'Aucune démarche particulière', points: 0 },
      { label: 'Bouche-à-oreille uniquement', points: 1 },
      { label: 'Réseaux sociaux / WhatsApp', points: 2 },
      { label: 'Publicité payante', points: 3 },
      { label: 'Réseau + partenariats structurés', points: 4 },
    ],
  },
  {
    id: 'com_3',
    dimension: 'commercial',
    type: 'scale',
    text: 'Dans quelle mesure suivez-vous et fidélisez-vous vos clients existants ?',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Aucun processus', max: 'Processus structuré' },
  },

  // ---------------------------------------------------------------------
  // Dimension : DIGITALISATION
  // ---------------------------------------------------------------------
  {
    id: 'dig_1',
    dimension: 'digitalisation',
    type: 'multi-choice',
    text: 'Quels outils numériques utilisez-vous actuellement pour votre activité ?',
    options: [
      { label: 'WhatsApp Business', points: 1 },
      { label: 'Paiement mobile (Mobile Money, etc.)', points: 1 },
      { label: 'Site web ou page vitrine', points: 1 },
      { label: 'Réseaux sociaux (Facebook, Instagram...)', points: 1 },
      { label: 'Aucun de ces outils', points: 0, exclusive: true },
    ],
  },
  {
    id: 'dig_2',
    dimension: 'digitalisation',
    type: 'yes-no',
    text: 'Acceptez-vous les paiements mobiles ou électroniques ?',
  },
  {
    id: 'dig_3',
    dimension: 'digitalisation',
    type: 'scale',
    text: 'Dans quelle mesure vos tâches quotidiennes (commandes, factures, stock) sont-elles automatisées ?',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { min: 'Tout est manuel', max: 'Largement automatisé' },
  },
]


export const dimensionLabels = {
  finance: 'Finance',
  commercial: 'Commercial',
  digitalisation: 'Digitalisation',
}
