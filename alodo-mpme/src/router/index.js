import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import DiagnosticView from '../views/DiagnosticView.vue'
import ResultView from '../views/ResultView.vue'

const router = createRouter({
    history: createWebHistory(), 
    routes: [
        { path: '/', name: 'intro', component: IntroView },
        { path: '/diagnostic', name: 'diagnostic', component: DiagnosticView },
        { path: '/resultat', name: 'result', component: ResultView },
    ],
})

export default router