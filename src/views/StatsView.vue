<script setup lang="ts">
import { ref } from 'vue'
import AttemptsChart from '@/components/charts/AttemptsChart.vue'
import SegmentsChart from '@/components/charts/SegmentsChart.vue'
import StatTile from '@/components/StatTile.vue'
import { useTheme } from '@/composables/useTheme'
import { formatMs } from '@/utils/formatTime'
import {
  parseCsvRows,
  detectCsvKind,
  parseAttemptRows,
  parseSegmentRows,
  computeAttemptStats,
  computeSegmentStats,
  type AttemptStats,
  type SegmentStats,
} from '@/utils/csvStats'

const { theme } = useTheme()
const fileName = ref<string | null>(null)
const error = ref<string | null>(null)
const dragOver = ref(false)
const attemptStats = ref<AttemptStats | null>(null)
const segmentStats = ref<SegmentStats | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function reset() {
  fileName.value = null
  error.value = null
  attemptStats.value = null
  segmentStats.value = null
}

async function handleFile(file: File) {
  reset()
  fileName.value = file.name

  const text = await file.text()
  const rows = parseCsvRows(text)
  const header = rows[0]
  if (rows.length === 0 || !header) {
    error.value = 'That file looks empty.'
    return
  }

  const kind = detectCsvKind(header)
  if (kind === 'attempts') {
    attemptStats.value = computeAttemptStats(parseAttemptRows(rows))
  } else if (kind === 'segments') {
    segmentStats.value = computeSegmentStats(parseSegmentRows(rows))
  } else {
    error.value =
      "That doesn't look like an OpenSpeedRun export — expected the header row from " +
      '"Export attempts CSV" or "Export segments CSV" (History tab in openspeedrun-cfg).'
  }
}

function onInputChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) handleFile(file)
}

function onDrop(e: DragEvent) {
  dragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) handleFile(file)
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
    <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Local Stats</h1>
    <p class="mt-4 text-lg text-ink-muted">
      Drop in a CSV exported from <code class="font-mono text-base">openspeedrun-cfg</code>'s
      History tab and see your stats — <strong class="text-ink">processed entirely in your
      browser</strong>. Nothing is uploaded anywhere; there's no server involved at all.
    </p>

    <div
      class="mt-8 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition-colors"
      :class="dragOver ? 'border-accent bg-accent/5' : 'border-border'"
      @dragover.prevent="dragOver = true"
      @dragleave.prevent="dragOver = false"
      @drop.prevent="onDrop"
    >
      <p class="text-ink-muted">Drag & drop an attempts or segments CSV here, or</p>
      <button
        type="button"
        class="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90"
        @click="fileInput?.click()"
      >
        Choose a file
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".csv,text/csv"
        class="hidden"
        @change="onInputChange"
      />
      <p v-if="fileName" class="font-mono text-xs text-ink-muted">Loaded: {{ fileName }}</p>
    </div>

    <p v-if="error" class="mt-4 rounded-md border border-danger/40 bg-danger/5 p-3 text-sm text-danger">
      {{ error }}
    </p>

    <!-- Attempts stats -->
    <section v-if="attemptStats" class="mt-10">
      <h2 class="text-xl font-bold">Attempts</h2>
      <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Total attempts" :value="String(attemptStats.totalAttempts)" />
        <StatTile
          label="Finished"
          :value="String(attemptStats.finishedAttempts)"
          :sub="`${(attemptStats.completionRate * 100).toFixed(1)}% completion rate`"
        />
        <StatTile label="Personal Bests" :value="String(attemptStats.pbCount)" />
        <StatTile label="Best time" :value="formatMs(attemptStats.bestMs)" />
        <StatTile label="Average time" :value="formatMs(attemptStats.averageMs)" />
        <StatTile label="Median time" :value="formatMs(attemptStats.medianMs)" />
      </div>

      <div v-if="attemptStats.series.length > 1" class="mt-6 rounded-lg border border-border bg-surface p-5">
        <h3 class="text-sm font-semibold text-ink-muted">Finished-run progression</h3>
        <AttemptsChart :key="theme" class="mt-3" :series="attemptStats.series" />
      </div>
    </section>

    <!-- Segment stats -->
    <section v-if="segmentStats" class="mt-10">
      <h2 class="text-xl font-bold">Segments</h2>

      <div
        v-if="segmentStats.mostInconsistent"
        class="mt-4 rounded-lg border border-accent/40 bg-accent/5 p-4 text-sm"
      >
        <span class="font-semibold text-ink">Most inconsistent split:</span>
        {{ segmentStats.mostInconsistent.splitName }} &mdash; times swing by about
        {{ formatMs(segmentStats.mostInconsistent.stddevMs) }} (standard deviation) across
        {{ segmentStats.mostInconsistent.count }} attempts.
      </div>

      <div class="mt-6 rounded-lg border border-border bg-surface p-5">
        <h3 class="text-sm font-semibold text-ink-muted">Best / average / worst per split</h3>
        <SegmentsChart :key="theme" class="mt-3" :splits="segmentStats.splits" />
      </div>

      <div class="mt-6 overflow-x-auto rounded-lg border border-border">
        <table class="w-full text-left text-sm">
          <thead class="bg-surface-alt text-xs text-ink-muted">
            <tr>
              <th class="p-3 font-medium">Split</th>
              <th class="p-3 font-medium">Attempts</th>
              <th class="p-3 font-medium">Best</th>
              <th class="p-3 font-medium">Average</th>
              <th class="p-3 font-medium">Median</th>
              <th class="p-3 font-medium">Worst</th>
              <th class="p-3 font-medium">Std. dev.</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="s in segmentStats.splits"
              :key="s.splitIndex"
              class="border-t border-border"
              :class="{ 'bg-accent/5': s === segmentStats.mostInconsistent }"
            >
              <td class="p-3 font-medium">{{ s.splitName }}</td>
              <td class="p-3 text-ink-muted">{{ s.count }}</td>
              <td class="p-3 font-mono text-success">{{ formatMs(s.bestMs) }}</td>
              <td class="p-3 font-mono">{{ formatMs(s.averageMs) }}</td>
              <td class="p-3 font-mono">{{ formatMs(s.medianMs) }}</td>
              <td class="p-3 font-mono text-danger">{{ formatMs(s.worstMs) }}</td>
              <td class="p-3 font-mono text-ink-muted">{{ formatMs(s.stddevMs) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-14 rounded-lg border border-border bg-surface-alt/60 p-6 text-center">
      <p class="text-ink-muted">
        Don't have a CSV yet? Export one from the History tab in
        <code class="font-mono text-sm">openspeedrun-cfg</code>.
      </p>
    </section>
  </div>
</template>
