import { defineStore } from 'pinia'
import { questions } from '../data/questions.js'
import { computeResult } from '../utils/scoring.js'

const STORAGE_KEY = 'alodo-mpme-diagnostic-state'

export const useDiagnosticStore = defineStore('diagnostic', {
  state: () => ({
    currentIndex: 0, 
    answers: {}, 
    result: null, 
  }),

  getters: {
    totalQuestions: () => questions.length,
    currentQuestion(state) {
      return questions[state.currentIndex] ?? null
    },
    progress(state) {
      // Progression en pourcentage, utilisée par la barre de progression
      return Math.round((state.currentIndex / questions.length) * 100)
    },
    isLastQuestion(state) {
      return state.currentIndex === questions.length - 1
    },
  },

  actions: {
    // Enregistre la réponse à la question courante et avance
    answerCurrent(answer) {
      const question = this.currentQuestion
      if (!question) return
      this.answers[question.id] = answer
      this.persist()

      if (this.isLastQuestion) {
        this.finishDiagnostic()
      } else {
        this.currentIndex += 1
      }
    },

    // Revenir à la question précédente (utile si l'utilisateur veut corriger)
    goToPrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1
      }
    },

    // Calcule le résultat final à partir de toutes les réponses
    finishDiagnostic() {
      this.result = computeResult(this.answers)
      this.persist()
    },

    // Remet le parcours à zéro (bouton "Recommencer" sur l'écran résultat)
    reset() {
      this.currentIndex = 0
      this.answers = {}
      this.result = null
      localStorage.removeItem(STORAGE_KEY)
    },

    // Sauvegarde l'état courant dans localStorage
    persist() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentIndex: this.currentIndex,
          answers: this.answers,
          result: this.result,
        })
      )
    },

    // Restaure l'état depuis localStorage (appelé au démarrage de l'app)
    restore() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      try {
        const saved = JSON.parse(raw)
        this.currentIndex = saved.currentIndex ?? 0
        this.answers = saved.answers ?? {}
        this.result = saved.result ?? null
      } catch {
        // Donnée corrompue : on ignore silencieusement et on repart à zéro
      }
    },
  },
})
