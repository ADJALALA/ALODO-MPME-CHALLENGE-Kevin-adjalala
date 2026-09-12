import { questions, dimensionLabels } from '../data/questions.js'

/**
 * Convertit une réponse brute en points (0 à 4) selon le type de question.
 * @param {object} question - la question telle que définie dans questions.js
 * @param {*} answer - la réponse de l'utilisateur (format dépend du type)
 * @returns {number} points bruts entre 0 et 4
 */
export function answerToPoints(question, answer) {
  switch (question.type) {
    case 'yes-no':
      // answer attendu : true (Oui) ou false (Non)
      return answer === true ? 4 : 0

    case 'scale': {
      // answer attendu : un entier entre scaleMin et scaleMax (ex. 1 à 5)
      // On ramène l'échelle sur 0-4 : valeur 1 -> 0 point, valeur 5 -> 4 points
      const min = question.scaleMin
      const max = question.scaleMax
      const clamped = Math.min(Math.max(answer, min), max)
      return ((clamped - min) / (max - min)) * 4
    }

    case 'single-choice':
    case 'range':
      // answer attendu : l'index de l'option choisie dans question.options
      return question.options[answer]?.points ?? 0

    case 'multi-choice': {
      // answer attendu : un tableau d'index des options cochées
      // Si l'option exclusive ("Aucun de ces outils") est cochée, score = 0
      const hasExclusive = answer.some((i) => question.options[i]?.exclusive)
      if (hasExclusive) return 0
      // Sinon, on additionne les poids des options cochées, plafonné à 4
      const total = answer.reduce((sum, i) => sum + (question.options[i]?.points ?? 0), 0)
      return Math.min(total, 4)
    }

    default:
      return 0
  }
}

/**
 * Calcule le résultat complet du diagnostic à partir des réponses.
 * @param {object} answers - dictionnaire { questionId: answer }
 * @returns {object} { globalScore, dimensionScores, strongest, weakest, recommendation }
 */
export function computeResult(answers) {
  // 1. Score de chaque question, normalisé sur 100
  const questionScores = questions.map((q) => ({
    dimension: q.dimension,
    score: (answerToPoints(q, answers[q.id]) / 4) * 100,
  }))

  // 2. Regrouper par dimension et faire la moyenne
  const dimensionScores = {}
  for (const dim of Object.keys(dimensionLabels)) {
    const scoresForDim = questionScores.filter((qs) => qs.dimension === dim).map((qs) => qs.score)
    const avg = scoresForDim.reduce((a, b) => a + b, 0) / scoresForDim.length
    dimensionScores[dim] = Math.round(avg)
  }

  // 3. Score global = moyenne des scores de dimension
  const dims = Object.values(dimensionScores)
  const globalScore = Math.round(dims.reduce((a, b) => a + b, 0) / dims.length)

  // 4. Point fort / point faible = dimension max / min
  const entries = Object.entries(dimensionScores)
  const strongest = entries.reduce((a, b) => (b[1] > a[1] ? b : a))
  const weakest = entries.reduce((a, b) => (b[1] < a[1] ? b : a))

  return {
    globalScore,
    dimensionScores,
    strongest: { dimension: strongest[0], score: strongest[1] },
    weakest: { dimension: weakest[0], score: weakest[1] },
    recommendation: buildRecommendation(weakest[0], weakest[1]),
  }
}

/**
 * Génère une recommandation textuelle pour la dimension la plus faible.
 * Trois paliers : faible (<40), moyen (40-70), correct (>70).
 * Les textes sont volontairement génériques mais actionnables — dans une
 * vraie version, ils viendraient d'une base de recommandations plus riche.
 */
function buildRecommendation(dimension, score) {
  const bracket = score < 40 ? 'low' : score < 70 ? 'mid' : 'high'

  const texts = {
    finance: {
      low: "Mettez en place un suivi minimal de vos entrées/sorties d'argent, même sur un simple cahier, avant toute autre chose.",
      mid: 'Structurez votre suivi financier avec un fichier simple et calculez votre marge par produit pour mieux piloter vos prix.',
      high: 'Votre gestion financière est déjà structurée : envisagez un outil de comptabilité pour préparer vos futurs besoins de financement.',
    },
    commercial: {
      low: "Identifiez un premier canal d'acquisition simple (WhatsApp, réseaux sociaux) et suivez-le régulièrement.",
      mid: 'Diversifiez vos canaux de vente et mettez en place un suivi léger de vos clients pour améliorer la fidélisation.',
      high: 'Votre approche commerciale est solide : structurez un programme de fidélisation pour consolider vos acquis.',
    },
    digitalisation: {
      low: 'Commencez par un outil simple et gratuit comme WhatsApp Business pour professionnaliser votre relation client.',
      mid: "Accélérez l'adoption des paiements mobiles et automatisez une première tâche répétitive (facturation, stock).",
      high: 'Votre digitalisation est avancée : explorez des outils pour automatiser davantage vos opérations internes.',
    },
  }

  return texts[dimension][bracket]
}
