<script setup lang="ts"></script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">What is OpenSpeedRun?</h1>
    <p class="mt-4 text-lg text-ink-muted">
      OpenSpeedRun is a modern and minimalistic open-source speedrun timer, designed from the
      ground up for Unix systems — Linux, macOS, and BSD. It's a clean GUI, external CLI control,
      and fully customizable themes, with no dependencies on non-Unix libraries.
    </p>

    <section class="mt-12">
      <h2 class="text-xl font-bold">Why Unix-exclusive?</h2>
      <p class="mt-3 text-ink-muted">
        Most speedrun timers assume Windows: global hotkeys, .NET, a Windows-only autosplitter
        model. OpenSpeedRun starts from the opposite assumption. Many Wayland compositors don't
        support global hotkeys at all, so instead of fighting that, OpenSpeedRun ships a small
        control socket and CLI (<code class="font-mono text-sm">openspeedrun-cli split</code>)
        that any window manager or compositor can bind shortcuts to — the same integration point
        the autosplitter and any custom tooling use too.
      </p>
    </section>

    <section class="mt-12">
      <h2 class="text-xl font-bold">Feature overview</h2>
      <ul class="mt-4 space-y-3 text-ink-muted">
        <li class="flex gap-3">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">Themes.</strong> Colors, font sizes, spacing, and visibility
            toggles for every element, plus animated GLSL shader backgrounds — see the
            <RouterLink to="/shaders" class="text-accent hover:underline">Shaders</RouterLink>
            page.
          </span>
        </li>
        <li class="flex gap-3">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">Split editor.</strong> Icons, pagination, per-split Best
            Segments/Personal Best, and Average/Median Segments computed automatically from your
            history.
          </span>
        </li>
        <li class="flex gap-3">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">LiveSplit compatibility.</strong>
            <code class="font-mono text-sm">.lss</code> import/export, including icons — matched
            byte-for-byte against real LiveSplit's own icon format.
          </span>
        </li>
        <li class="flex gap-3">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">External control.</strong>
            <code class="font-mono text-sm">openspeedrun-cli</code> for hotkeys, an
            <strong class="text-ink">OBS overlay</strong> WebSocket server for streaming, and a
            <RouterLink to="/autosplitter" class="text-accent hover:underline"
              >beta autosplitter</RouterLink
            >.
          </span>
        </li>
        <li class="flex gap-3">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">CSV export.</strong> Full attempt and per-split segment
            history, so you can build your own stats wherever you like.
          </span>
        </li>
      </ul>
    </section>

    <section class="mt-12">
      <h2 class="text-xl font-bold">The four binaries</h2>
      <div class="mt-4 overflow-hidden rounded-lg border border-border">
        <table class="w-full text-left text-sm">
          <tbody>
            <tr class="border-b border-border">
              <td class="p-3 align-top font-mono font-semibold whitespace-nowrap text-accent">
                openspeedrun
              </td>
              <td class="p-3 text-ink-muted">The main GUI speedrun timer.</td>
            </tr>
            <tr class="border-b border-border">
              <td class="p-3 align-top font-mono font-semibold whitespace-nowrap text-accent">
                openspeedrun-cfg
              </td>
              <td class="p-3 text-ink-muted">Configuration GUI to manage themes, splits and shaders.</td>
            </tr>
            <tr class="border-b border-border">
              <td class="p-3 align-top font-mono font-semibold whitespace-nowrap text-accent">
                openspeedrun-cli
              </td>
              <td class="p-3 text-ink-muted">
                Command-line control (split/start/pause/reset/&hellip;), Unix only.
              </td>
            </tr>
            <tr>
              <td class="p-3 align-top font-mono font-semibold whitespace-nowrap text-accent">
                openspeedrun-autosplitter
              </td>
              <td class="p-3 text-ink-muted">Headless autosplitter, Unix only. See the beta page.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-xl font-bold">License</h2>
      <p class="mt-3 text-ink-muted">
        OpenSpeedRun is released under the
        <a
          href="https://github.com/SrWither/OpenSpeedRun/blob/master/LICENSE"
          target="_blank"
          rel="noopener"
          class="text-accent hover:underline"
          >BSD 3-Clause License</a
        >. Free to use, modify, and redistribute.
      </p>
    </section>

    <section class="mt-12 rounded-lg border border-border bg-surface-alt/60 p-6 text-center">
      <p class="text-ink-muted">Questions, bugs, or ideas?</p>
      <a
        href="https://github.com/SrWither/OpenSpeedRun/issues"
        target="_blank"
        rel="noopener"
        class="mt-2 inline-block font-semibold text-accent hover:underline"
      >
        Open an issue on GitHub &rarr;
      </a>
    </section>
  </div>
</template>
