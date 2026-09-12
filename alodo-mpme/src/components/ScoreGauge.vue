<template>
  <div class="text-center" :style="{ width: `${size}px` }">
    <svg viewBox="0 0 100 100" :width="size" :height="size">
      <circle cx="50" cy="50" :r="radius" class="fill-none stroke-border" stroke-width="8" />
      <circle
        cx="50"
        cy="50"
        :r="radius"
        class="fill-none stroke-accent origin-center -rotate-90 transition-[stroke-dashoffset] duration-500 ease-out"
        stroke-width="8"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference * (1 - score / 100)"
      />
      <text x="50" y="55" text-anchor="middle" class="fill-primary-dark font-display" font-size="22">
        {{ score }}
      </text>
    </svg>
    <p class="mt-1.5 text-sm text-muted">{{ label }}</p>
  </div>
</template>

<script setup>

  const props = defineProps({
    score: { type: Number, required: true },
    label: { type: String, required: true },
    size: { type: Number, default: 96 },
  })

  const radius = 40
  const circumference = 2 * Math.PI * radius
</script>


