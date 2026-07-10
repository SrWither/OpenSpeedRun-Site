<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between"
    >
      <div class="max-w-sm">
        <div class="flex items-center gap-2">
          <img src="/favicon.png" alt="" class="h-6 w-6 rounded" />
          <span class="font-mono font-bold">OpenSpeedRun</span>
        </div>
        <p class="mt-2 text-sm text-ink-muted">
          A modern, minimalist, open-source speedrun timer — built for Unix. No dependencies on
          non-Unix libraries, no telemetry, no nonsense.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div>
          <h3 class="font-mono text-xs font-semibold tracking-wider text-ink-muted uppercase">
            Project
          </h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li><RouterLink to="/info" class="hover:text-accent">Info</RouterLink></li>
            <li><RouterLink to="/downloads" class="hover:text-accent">Downloads</RouterLink></li>
            <li><RouterLink to="/shaders" class="hover:text-accent">Shaders</RouterLink></li>
            <li>
              <RouterLink to="/autosplitter" class="hover:text-accent">Autosplitter</RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-mono text-xs font-semibold tracking-wider text-ink-muted uppercase">
            Source
          </h3>
          <ul class="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/SrWither/OpenSpeedRun"
                target="_blank"
                rel="noopener"
                class="hover:text-accent"
                >GitHub</a
              >
            </li>
            <li>
              <a
                href="https://github.com/SrWither/OpenSpeedRun/releases"
                target="_blank"
                rel="noopener"
                class="hover:text-accent"
                >Releases</a
              >
            </li>
            <li>
              <a
                href="https://github.com/SrWither/OpenSpeedRun/issues"
                target="_blank"
                rel="noopener"
                class="hover:text-accent"
                >Report an issue</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-mono text-xs font-semibold tracking-wider text-ink-muted uppercase">
            License
          </h3>
          <p class="mt-3 text-sm text-ink-muted">BSD 3-Clause</p>
        </div>
      </div>
    </div>

    <div class="border-t border-border px-4 py-4 text-center text-xs text-ink-muted sm:px-6">
      &copy; {{ year }} Fadel — OpenSpeedRun is free and open-source software.
    </div>
  </footer>
</template>
