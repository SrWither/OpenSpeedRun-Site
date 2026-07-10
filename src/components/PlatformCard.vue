<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

defineProps<{ icon: IconDefinition; title: string; note?: string }>()
</script>

<template>
  <div class="rounded-lg border border-border bg-surface p-5">
    <div class="flex items-center gap-2.5">
      <FontAwesomeIcon :icon="icon" class="h-6 w-6 text-accent" />
      <h3 class="font-semibold">{{ title }}</h3>
    </div>
    <p v-if="note" class="mt-1 text-xs text-ink-muted">{{ note }}</p>
    <div class="mt-4 space-y-3 text-sm">
      <slot />
    </div>
  </div>
</template>
