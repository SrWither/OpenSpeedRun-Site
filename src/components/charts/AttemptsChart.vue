<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartOptions, TooltipItem } from 'chart.js'
import '@/utils/chartSetup'
import { chartColors } from '@/utils/chartColors'
import { formatMs } from '@/utils/formatTime'

const props = defineProps<{ series: { runIndex: number; ms: number }[] }>()
const colors = chartColors()

const chartData = computed(() => ({
  labels: props.series.map((s) => `#${s.runIndex}`),
  datasets: [
    {
      label: 'Finish time',
      data: props.series.map((s) => s.ms),
      borderColor: colors.accent,
      backgroundColor: `color-mix(in srgb, ${colors.accent} 18%, transparent)`,
      pointBackgroundColor: colors.accent,
      pointBorderColor: colors.accent,
      pointRadius: 3,
      pointHoverRadius: 5,
      tension: 0.25,
      fill: true,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'nearest', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        title: (items: TooltipItem<'line'>[]) => `Attempt ${items[0]?.label ?? ''}`,
        label: (item: TooltipItem<'line'>) => formatMs(item.parsed.y),
      },
    },
  },
  scales: {
    x: {
      grid: { color: colors.border },
      ticks: { color: colors.inkMuted },
    },
    y: {
      grid: { color: colors.border },
      title: { display: true, text: 'Time (lower is better)', color: colors.inkMuted },
      ticks: {
        color: colors.inkMuted,
        callback: (value) => formatMs(Number(value)),
      },
    },
  },
}))
</script>

<template>
  <div class="h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
