<script setup lang="ts">
defineProps<{ icon: string; title: string; note?: string }>()
</script>

<template>
  <div class="rounded-lg border border-border bg-surface p-5">
    <div class="flex items-center gap-2.5">
      <span class="text-2xl leading-none">{{ icon }}</span>
      <h3 class="font-semibold">{{ title }}</h3>
    </div>
    <p v-if="note" class="mt-1 text-xs text-ink-muted">{{ note }}</p>
    <div class="mt-4 space-y-3 text-sm">
      <slot />
    </div>
  </div>
</template>
