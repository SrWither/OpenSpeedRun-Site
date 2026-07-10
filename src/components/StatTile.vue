<script setup lang="ts">
defineProps<{ label: string; value: string; sub?: string }>()
</script>

<template>
  <div class="rounded-lg border border-border bg-surface p-4">
    <div class="text-xs font-medium text-ink-muted">{{ label }}</div>
    <div class="mt-1 font-mono text-2xl font-bold tabular-nums">{{ value }}</div>
    <div v-if="sub" class="mt-0.5 text-xs text-ink-muted">{{ sub }}</div>
  </div>
</template>
