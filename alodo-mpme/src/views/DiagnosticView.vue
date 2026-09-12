<template>
  <div class="max-w-[480px] mx-auto px-5 pt-8 pb-12 w-full" v-if="store.currentQuestion">
    <ProgressBar
      :current="store.currentIndex"
      :total="store.totalQuestions"
      :dimension-label="dimensionLabels[store.currentQuestion.dimension]"
    />
    <QuestionCard :question="store.currentQuestion" @answer="handleAnswer" />

    <button
      v-if="store.currentIndex > 0"
      class="btn-secondary mt-4"
      @click="store.goToPrevious"
    >
      ← Question précédente
    </button>
  </div>
</template>


<script setup>

import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDiagnosticStore } from '../stores/diagnostic.js'
import { dimensionLabels } from '../data/questions.js'
import ProgressBar from '../components/ProgressBar.vue'
import QuestionCard from '../components/QuestionCard.vue'

const router = useRouter()
const store = useDiagnosticStore()

onMounted(() => {
  store.restore()
  // Si on arrive ici sans avoir démarré (ex. rechargement de page directe
  // sur /diagnostic), on repart proprement depuis l'introduction.
  if (!store.currentQuestion) {
    router.replace({ name: 'intro' })
  }
})

// Dès que le store a calculé un résultat, on navigue vers l'écran résultat.
watch(
  () => store.result,
  (result) => {
    if (result) router.push({ name: 'result' })
  }
)

function handleAnswer(answer) {
  store.answerCurrent(answer)
}
</script>


