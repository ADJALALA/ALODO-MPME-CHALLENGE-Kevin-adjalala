<template>
  <nav class="relative border-t border-border px-5 py-4 flex items-center justify-between shadow-lg">
    <p class="font-semibold text-accent">ALODO MPME</p>

    <!-- Desktop : liste horizontale -->
    <ul class="hidden sm:flex items-center gap-1">
      <li v-for="step in steps" :key="step.label">
        <RouterLink
          v-if="step.enabled"
          :to="step.to"
          class="block whitespace-nowrap px-3 py-1.5 rounded-md text-sm font-medium"
          :class="isDiagnosticActive ? 'bg-accent text-white' : 'text-primary'"
        >
          {{ step.label }}
        </RouterLink>
        <span
          v-else
          class="block whitespace-nowrap px-3 py-1.5 rounded-md text-sm text-primary/60 cursor-not-allowed"
          title="Hors périmètre"
        >
          {{ step.label }}
        </span>
      </li>
    </ul>

    <!-- Mobile : bouton hamburger -->
    <button
      class="md:hidden flex items-center justify-center w-9 h-9 rounded-md border border-border"
      @click="open = !open"
      :aria-expanded="open"
      aria-label="Afficher les étapes du programme"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 4H16M2 9H16M2 14H16" stroke="black" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </button>

    <!-- Menu mobile déroulant -->
    <ul
      v-if="open"
      class="sm:hidden absolute left-0 right-0 top-full bg-surface border-t border-border shadow-md py-1"
    >
      <li v-for="step in steps" :key="step.label">
        <RouterLink
          v-if="step.enabled"
          :to="step.to"
          class="block px-5 py-2.5 text-sm font-medium"
          :class="isDiagnosticActive ? 'text-accent' : 'text-primary'"
          @click="closeMenu"
        >
          {{ step.label }}
        </RouterLink>
        <span v-else class="flex items-center justify-between px-5 py-2.5 text-sm text-muted">
          {{ step.label }}
          <span class="text-xs">à venir</span>
        </span>
      </li>
    </ul>
  </nav>
</template>


<script setup>

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false) // menu mobile ouvert/fermé

const diagnosticRouteNames = ['intro', 'diagnostic', 'result']
const isDiagnosticActive = computed(() => diagnosticRouteNames.includes(route.name))

const steps = [
  { label: 'Candidature', enabled: false },
  { label: 'Sélection', enabled: false },
  { label: 'Diagnostic', enabled: true, to: '/' },
  { label: 'Analyse', enabled: false },
  { label: 'Rapport', enabled: false },
  { label: 'Recommandation', enabled: false },
  { label: 'Accompagnement', enabled: false },
]

function closeMenu() {
  open.value = false
}
</script>

