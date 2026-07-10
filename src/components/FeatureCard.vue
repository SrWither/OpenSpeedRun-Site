<script setup lang="ts">
defineProps<{ icon: string; title: string }>()
</script>

<template>
  <div
    class="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
  >
    <div class="text-2xl">{{ icon }}</div>
    <h3 class="mt-3 font-semibold">{{ title }}</h3>
    <p class="mt-1.5 text-sm text-ink-muted">
      <slot />
    </p>
  </div>
</template>
