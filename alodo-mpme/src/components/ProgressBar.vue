<template>
  <div class="mb-6">
    <div class="h-1.5 bg-border rounded-full overflow-hidden">
      <div
        class="h-full bg-accent transition-[width] duration-300 ease-out"
        :style="{ width: `${((current + 1) / total) * 100}%` }"
      />
    </div>
    <p class="mt-2 text-sm text-muted">
      Question {{ current + 1 }}/{{ total }} — {{ dimensionLabel }}
    </p>
  </div>
</template>


<script setup>
  defineProps({
    current: { type: Number, required: true }, 
    total: { type: Number, required: true },
    dimensionLabel: { type: String, required: true },
  })
</script>

