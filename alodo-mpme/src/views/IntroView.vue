<template>
  <div class="max-w-[480px] mx-auto px-5 pt-8 pb-12 w-full">
    <p class="text-accent font-semibold mb-2">ALODO MPME</p>
    <h1 class="text-2xl mb-4">Evaluez la maturité de votre entreprise</h1>
    <p class="text-muted mb-4">
      Vous etes micro, petites ou moyenne entreprise ?
    </p>
    <p class="text-muted mb-4">
      Alodo-mpme vous accompagne dans votre parcours vers l'excellence
    </p>
    <p class="text-muted mb-4">
      Ce diagnostic rapide explore trois piliers de votre activité : votre
      gestion financière, votre approche commerciale et votre niveau de
      digitalisation. Vous répondrez à 9 questions simples.
    </p>
    <p class="text-muted mb-4">
      À la fin, vous recevrez un score global, vos points forts, votre
      principal axe d'amélioration et une recommandation concrète.
    </p>
    <button class="btn-primary" @click="start">Commencer le diagnostic</button>
    <p class="text-center text-sm text-muted mt-3.5">Durée estimée : 3 minutes · 9 questions</p>
  </div>
</template>

<script setup>
// On réinitialise le store ici pour éviter de reprendre un ancien parcours
// à moitié fait si l'utilisateur revient sur cet écran volontairement.
import { useRouter } from 'vue-router'
import { useDiagnosticStore } from '../stores/diagnostic.js'

const router = useRouter()
const store = useDiagnosticStore()

function start() {
  store.reset()
  router.push({ name: 'diagnostic' })
}
</script>



