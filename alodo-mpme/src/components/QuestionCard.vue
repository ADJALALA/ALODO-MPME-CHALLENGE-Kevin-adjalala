<template>
  <div class="bg-surface border border-border rounded-[10px] px-5 py-6">
    <h2 class="text-lg mb-5">{{ question.text }}</h2>

    <!-- Oui / Non -->
    <div v-if="question.type === 'yes-no'" class="flex flex-col gap-2.5">
      <button class="option-btn" @click="selectYesNo(true)">Oui</button>
      <button class="option-btn" @click="selectYesNo(false)">Non</button>
    </div>

    <!-- Choix unique ou tranche (même rendu, sémantique différente) -->
    <div v-else-if="question.type === 'single-choice' || question.type === 'range'" class="flex flex-col gap-2.5">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        class="option-btn"
        @click="selectSingleOption(index)"
      >
        {{ option.label }}
      </button>
    </div>

    <!-- Choix multiple : on coche puis on valide -->
    <div v-else-if="question.type === 'multi-choice'" class="flex flex-col gap-2.5">
      <label
        v-for="(option, index) in question.options"
        :key="index"
        class="flex items-center gap-2.5 text-[0.95rem] py-2.5 px-1"
      >
        <input
          type="checkbox"
          :checked="localAnswer.includes(index)"
          @change="toggleMultiOption(index)"
        />
        {{ option.label }}
      </label>
      <button
        class="btn-primary mt-2"
        :disabled="localAnswer.length === 0"
        @click="confirmMultiChoice"
      >
        Valider
      </button>
    </div>

    <!-- Échelle 1-5 -->
    <div v-else-if="question.type === 'scale'">
      <div class="flex gap-2 justify-between">
        <button
          v-for="n in question.scaleMax - question.scaleMin + 1"
          :key="n"
          class="flex-1 aspect-square rounded-full border border-border bg-bg font-medium
                 hover:border-primary hover:bg-primary hover:text-white"
          @click="selectScale(question.scaleMin + n - 1)"
        >
          {{ question.scaleMin + n - 1 }}
        </button>
      </div>
      <div class="flex justify-between mt-2 text-xs text-muted">
        <span>{{ question.scaleLabels.min }}</span>
        <span>{{ question.scaleLabels.max }}</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
})
const emit = defineEmits(['answer'])

// Réponse locale en cours de construction, remise à zéro à chaque question
const localAnswer = ref(props.question.type === 'multi-choice' ? [] : null)

watch(
  () => props.question.id,
  () => {
    localAnswer.value = props.question.type === 'multi-choice' ? [] : null
  }
)

function selectSingleOption(index) {
  emit('answer', index)
}

function toggleMultiOption(index) {
  const current = new Set(localAnswer.value)
  const option = props.question.options[index]

  if (option.exclusive) {
    // Choisir une option "exclusive" (ex: "Aucun de ces outils") désélectionne tout le reste
    localAnswer.value = current.has(index) ? [] : [index]
    return
  }
  // Cocher une option normale retire toute option exclusive déjà cochée
  current.delete(props.question.options.findIndex((o) => o.exclusive))
  current.has(index) ? current.delete(index) : current.add(index)
  localAnswer.value = Array.from(current)
}

function confirmMultiChoice() {
  emit('answer', localAnswer.value)
}

function selectScale(value) {
  emit('answer', value)
}

function selectYesNo(value) {
  emit('answer', value)
}
</script>


<style scoped>

  @reference "../style.css";

  .option-btn {
    @apply text-left bg-bg border border-border rounded-[10px] py-3 px-4
          text-[0.95rem] text-ink hover:border-primary;
  }
</style>
