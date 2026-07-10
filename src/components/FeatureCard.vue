<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

defineProps<{ icon: IconDefinition; title: string }>()
</script>

<template>
  <div
    class="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/50"
  >
    <FontAwesomeIcon :icon="icon" class="h-6 w-6 text-accent" />
    <h3 class="mt-3 font-semibold">{{ title }}</h3>
    <p class="mt-1.5 text-sm text-ink-muted">
      <slot />
    </p>
  </div>
</template>
