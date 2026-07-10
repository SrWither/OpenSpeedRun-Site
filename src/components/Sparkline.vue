<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ values: number[] }>()

const width = 600
const height = 160
const pad = 8

// Lower is better for run times, so the chart is drawn with the y-axis
// flipped: a downward-trending line reads as "getting faster", matching how
// a runner actually thinks about progress, not raw graph convention.
const points = computed(() => {
  const vs = props.values
  if (vs.length === 0) return ''
  const min = Math.min(...vs)
  const max = Math.max(...vs)
  const span = max - min || 1

  return vs
    .map((v, i) => {
      const x = vs.length === 1 ? width / 2 : pad + (i / (vs.length - 1)) * (width - pad * 2)
      const y = pad + ((v - min) / span) * (height - pad * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
})

const averageY = computed(() => {
  const vs = props.values
  if (vs.length === 0) return null
  const min = Math.min(...vs)
  const max = Math.max(...vs)
  const span = max - min || 1
  const avg = vs.reduce((a, b) => a + b, 0) / vs.length
  return pad + ((avg - min) / span) * (height - pad * 2)
})
</script>

<template>
  <svg :viewBox="`0 0 ${width} ${height}`" class="w-full" preserveAspectRatio="none">
    <line
      v-if="averageY !== null"
      :x1="0"
      :x2="width"
      :y1="averageY"
      :y2="averageY"
      stroke="currentColor"
      class="text-ink-muted/30"
      stroke-width="1"
      stroke-dasharray="4 4"
    />
    <polyline
      :points="points"
      fill="none"
      stroke="currentColor"
      class="text-accent"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  </svg>
</template>
