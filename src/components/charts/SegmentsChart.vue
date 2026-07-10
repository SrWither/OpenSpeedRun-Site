<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartOptions, TooltipItem } from 'chart.js'
import '@/utils/chartSetup'
import { chartColors } from '@/utils/chartColors'
import { formatMs } from '@/utils/formatTime'
import type { SplitStats } from '@/utils/csvStats'

const props = defineProps<{ splits: SplitStats[] }>()
const colors = chartColors()

const chartData = computed(() => ({
  labels: props.splits.map((s) => s.splitName),
  datasets: [
    {
      label: 'Best',
      data: props.splits.map((s) => s.bestMs),
      backgroundColor: colors.success,
    },
    {
      label: 'Average',
      data: props.splits.map((s) => s.averageMs),
      backgroundColor: colors.accent,
    },
    {
      label: 'Worst',
      data: props.splits.map((s) => s.worstMs),
      backgroundColor: colors.danger,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { color: colors.inkMuted } },
    tooltip: {
      callbacks: {
        label: (item: TooltipItem<'bar'>) => `${item.dataset.label}: ${formatMs(item.parsed.y)}`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: colors.inkMuted },
    },
    y: {
      grid: { color: colors.border },
      ticks: {
        color: colors.inkMuted,
        callback: (value) => formatMs(Number(value)),
      },
    },
  },
}))
</script>

<template>
  <div class="h-72">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
