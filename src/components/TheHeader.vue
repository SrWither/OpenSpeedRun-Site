<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import BetaBadge from './BetaBadge.vue'

const { theme, toggle } = useTheme()
const mobileOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/info', label: 'Info' },
  { to: '/shaders', label: 'Shaders' },
  { to: '/autosplitter', label: 'Autosplitter', beta: true },
  { to: '/overlay', label: 'OBS Overlay' },
  { to: '/stats', label: 'Stats' },
]
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-border bg-canvas/80 backdrop-blur supports-[backdrop-filter]:bg-canvas/60"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <RouterLink to="/" class="flex items-center gap-2.5" @click="mobileOpen = false">
        <img src="/favicon.png" alt="" class="h-8 w-8 rounded-md" />
        <span class="font-mono text-lg font-bold tracking-tight blink-cursor">OpenSpeedRun</span>
      </RouterLink>

      <nav class="hidden items-center gap-0.5 lg:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[13px] font-medium whitespace-nowrap text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
          active-class="!text-accent"
        >
          {{ link.label }}
          <BetaBadge v-if="link.beta" />
        </RouterLink>
      </nav>

      <div class="flex items-center gap-1.5">
        <a
          href="https://github.com/SrWither/OpenSpeedRun"
          target="_blank"
          rel="noopener"
          class="rounded-md p-2 text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
          aria-label="View source on GitHub"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.53-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.07.78 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
            />
          </svg>
        </a>

        <button
          type="button"
          class="rounded-md p-2 text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
            <path
              d="M12 4.5a1 1 0 0 1 1-1V2a1 1 0 1 1-2 0v1.5a1 1 0 0 1 1 1Zm0 15a1 1 0 0 1 1 1V22a1 1 0 1 1-2 0v-1.5a1 1 0 0 1 1-1ZM4.5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1.5a1 1 0 0 1 1 1Zm15 0a1 1 0 0 1 1-1H22a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1ZM6.34 6.34a1 1 0 0 1 0 1.42l-1.06 1.06a1 1 0 1 1-1.42-1.42l1.06-1.06a1 1 0 0 1 1.42 0Zm12.02 12.02a1 1 0 0 1 0 1.42l-1.06 1.06a1 1 0 1 1-1.42-1.42l1.06-1.06a1 1 0 0 1 1.42 0ZM17.66 6.34a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.42 1.42l-1.06-1.06a1 1 0 0 1 0-1.42ZM5.66 18.36a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.42 1.42l-1.06-1.06a1 1 0 0 1 0-1.42ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
            />
          </svg>
          <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor">
            <path
              d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.14c0-1.22.25-2.37.73-3.37A1 1 0 0 0 8.6 1.02a10.14 10.14 0 1 0 13 13 1 1 0 0 0-.96-1.02Z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="rounded-md p-2 text-ink-muted hover:bg-surface-alt hover:text-ink lg:hidden"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-if="mobileOpen" class="border-t border-border px-4 py-2 lg:hidden">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-2 rounded-md px-2 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface-alt hover:text-ink"
        active-class="!text-accent"
        @click="mobileOpen = false"
      >
        {{ link.label }}
        <BetaBadge v-if="link.beta" />
      </RouterLink>
    </nav>
  </header>
</template>
