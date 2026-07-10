<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ label?: string; code: string }>()
const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Clipboard API can be unavailable (e.g. insecure context); not worth
    // surfacing an error for a convenience button.
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-surface-alt">
    <div v-if="label" class="flex items-center justify-between border-b border-border px-3 py-1.5">
      <span class="font-mono text-xs text-ink-muted">{{ label }}</span>
      <button
        type="button"
        class="font-mono text-xs text-ink-muted hover:text-accent"
        @click="copy"
      >
        {{ copied ? 'copied!' : 'copy' }}
      </button>
    </div>
    <pre class="overflow-x-auto p-3.5 font-mono text-[13px] leading-relaxed"><code>{{ code }}</code></pre>
  </div>
</template>
