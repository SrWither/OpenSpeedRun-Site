<script setup lang="ts">
withDefaults(defineProps<{ size?: 'sm' | 'md' }>(), { size: 'sm' })
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 font-mono font-semibold tracking-wider text-accent uppercase"
    :class="size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'"
  >
    Beta
  </span>
</template>
