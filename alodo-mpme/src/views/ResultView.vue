<template>
  <div class="max-w-[480px] mx-auto px-5 pt-8 pb-12 w-full" v-if="store.result">
    <p class="text-accent font-semibold mb-2">Votre résultat</p>
    <h1 class="text-2xl mb-6">Score global : {{ store.result.globalScore }}/100</h1>

    <div class="flex justify-between gap-3 my-7">
      <ScoreGauge
        v-for="(score, dim) in store.result.dimensionScores"
        :key="dim"
        :score="score"
        :label="dimensionLabels[dim]"
        :size="84"
      />
    </div>

    <div class="border-l-[3px] border-primary pl-3.5 py-1 mb-4">
      <p class="font-semibold text-sm text-muted mb-0.5">Point fort</p>
      <p>{{ dimensionLabels[store.result.strongest.dimension] }} ({{ store.result.strongest.score }}/100)</p>
    </div>

    <div class="border-l-[3px] border-danger pl-3.5 py-1 mb-4">
      <p class="font-semibold text-sm text-muted mb-0.5">Axe à renforcer</p>
      <p>{{ dimensionLabels[store.result.weakest.dimension] }} ({{ store.result.weakest.score }}/100)</p>
    </div>

    <div class="bg-surface border border-border rounded-[10px] p-4 italic">
      <p class="font-semibold text-sm text-muted mb-0.5 not-italic">Recommandation</p>
      <p>"{{ store.result.recommendation }}"</p>
    </div>

    <button class="btn-secondary w-full mt-6" @click="restart">
      Refaire le diagnostic
    </button>
  </div>
</template>


<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDiagnosticStore } from '../stores/diagnostic.js'
import { dimensionLabels } from '../data/questions.js'
import ScoreGauge from '../components/ScoreGauge.vue'

const router = useRouter()
const store = useDiagnosticStore()

onMounted(() => {
  store.restore()
  
  if (!store.result) {
    router.replace({ name: 'intro' })
  }
})

function restart() {
  store.reset()
  router.push({ name: 'intro' })
}
</script>
