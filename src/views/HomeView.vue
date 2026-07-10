<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import FeatureCard from "@/components/FeatureCard.vue";

// Purely decorative: makes the hero clock look like a live, running timer
// instead of a static screenshot. Loops every 60s so it never grows a
// second digit and unbalances the layout.
const heroClock = ref("00:00.000");
let rafId = 0;
let startedAt = 0;

function tick() {
  const elapsed = (performance.now() - startedAt) % 60000;
  const seconds = Math.floor(elapsed / 1000);
  const millis = Math.floor(elapsed % 1000);
  heroClock.value = `00:${String(seconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
  rafId = requestAnimationFrame(tick);
}

onMounted(() => {
  startedAt = performance.now();
  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => cancelAnimationFrame(rafId));
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-scanlines relative overflow-hidden border-b border-border">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div class="mx-auto max-w-2xl text-center">
          <span
            class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-ink-muted"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-success"></span>
            open-source &middot; Unix-exclusive
          </span>

          <h1 class="text-glow mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            A speedrun timer, <span class="text-accent">built for Unix.</span>
          </h1>

          <p class="mt-5 text-lg text-ink-muted">
            OpenSpeedRun is a modern, minimalist, open-source speedrun timer for Linux, macOS and
            BSD — a clean GUI, external CLI control, GLSL shader backgrounds, and no dependencies on
            non-Unix libraries.
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <RouterLink
              to="/downloads"
              class="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
            >
              Download
            </RouterLink>
            <a
              href="https://github.com/SrWither/OpenSpeedRun"
              target="_blank"
              rel="noopener"
              class="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-alt"
            >
              View on GitHub
            </a>
          </div>

          <div
            class="text-glow mx-auto mt-3 w-fit font-mono text-6xl font-bold tabular-nums text-accent/90 sm:text-7xl"
          >
            {{ heroClock }}
          </div>
        </div>

        <div class="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6">
          <figure
            class="overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/10"
          >
            <img
              src="/screenshots/timer2.png"
              alt="OpenSpeedRun timer, default theme, help overlay open"
              class="w-full"
            />
            <figcaption
              class="border-t border-border bg-surface-alt px-3 py-1.5 text-xs text-ink-muted"
            >
              Default theme
            </figcaption>
          </figure>
          <figure
            class="overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/10"
          >
            <img
              src="/screenshots/timer.png"
              alt="OpenSpeedRun timer with a shader background"
              class="w-full"
            />
            <figcaption
              class="border-t border-border bg-surface-alt px-3 py-1.5 text-xs text-ink-muted"
            >
              With a shader background
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-glow text-2xl font-bold sm:text-3xl">Everything a runner actually needs</h2>
        <p class="mt-3 text-ink-muted">
          Lightweight, scriptable, and yours to theme — no bloat, no lock-in.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard icon="🖼️" title="Themes & shaders">
          Colors, fonts, spacing, and animated GLSL shader backgrounds — configure everything from a
          dedicated editor, no JSON hand-editing required.
        </FeatureCard>
        <FeatureCard icon="🖥️" title="External CLI control">
          <code class="font-mono text-xs">openspeedrun-cli split</code> lets you bind splits,
          resets, and pauses to system-wide shortcuts — built for Wayland compositors with no global
          hotkey support.
        </FeatureCard>
        <FeatureCard icon="🧩" title="Full split editor">
          Icons, pagination, per-comparison Personal Best and Best/Average/Median Segments, Game
          Time vs Real Time — and LiveSplit
          <code class="font-mono text-xs">.lss</code> import/export, icons included. See the
          <RouterLink to="/splits" class="text-accent hover:underline">Splits</RouterLink> page.
        </FeatureCard>
        <FeatureCard icon="🤖" title="Autosplitter (beta)">
          RetroArch support out of the box, no elevated privileges needed — or opt in to native
          process-memory reading for unmodified PC games.
        </FeatureCard>
        <FeatureCard icon="📡" title="OBS overlay server">
          A local WebSocket streams your live timer, splits, and comparisons as JSON — drop the
          included browser-source overlay straight into OBS.
        </FeatureCard>
        <FeatureCard icon="📊" title="CSV export">
          Export your full attempt and segment history to CSV and build your own stats in whatever
          tool you like — Excel, pandas, Grafana, your call.
        </FeatureCard>
      </div>
    </section>

    <!-- Screenshots -->
    <section class="border-y border-border bg-surface-alt/40">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 class="text-glow text-center text-2xl font-bold sm:text-3xl">Configure it your way</h2>
        <p class="mx-auto mt-3 max-w-xl text-center text-ink-muted">
          A dedicated config app for splits, themes, and shaders — separate from the timer itself,
          so you never fumble a menu mid-run.
        </p>

        <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <img
            src="/screenshots/selector.png"
            alt="Config selector screen"
            class="rounded-lg border border-border"
          />
          <img
            src="/screenshots/splits.png"
            alt="Split editor screen"
            class="rounded-lg border border-border"
          />
        </div>
      </div>
    </section>

    <!-- Binaries -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 class="text-glow text-2xl font-bold sm:text-3xl">Four small, focused binaries</h2>
      <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div class="rounded-lg border border-border p-4">
          <code class="font-mono text-sm font-semibold text-accent">openspeedrun</code>
          <p class="mt-1 text-sm text-ink-muted">The main GUI speedrun timer.</p>
        </div>
        <div class="rounded-lg border border-border p-4">
          <code class="font-mono text-sm font-semibold text-accent">openspeedrun-cfg</code>
          <p class="mt-1 text-sm text-ink-muted">
            Configuration GUI for splits, themes and shaders.
          </p>
        </div>
        <div class="rounded-lg border border-border p-4">
          <code class="font-mono text-sm font-semibold text-accent">openspeedrun-cli</code>
          <p class="mt-1 text-sm text-ink-muted">
            External control (split/start/pause/reset) for hotkey-less compositors.
          </p>
        </div>
        <div class="rounded-lg border border-border p-4">
          <code class="font-mono text-sm font-semibold text-accent">openspeedrun-autosplitter</code>
          <p class="mt-1 text-sm text-ink-muted">
            Headless autosplitter, RetroArch or native process memory.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA band -->
    <section class="border-t border-border bg-surface-alt/40">
      <div class="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 class="text-glow text-2xl font-bold sm:text-3xl">Ready to time your next run?</h2>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <RouterLink
            to="/downloads"
            class="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            Get OpenSpeedRun
          </RouterLink>
          <RouterLink
            to="/info"
            class="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-alt"
          >
            Learn more
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
