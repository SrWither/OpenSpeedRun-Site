<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Splits</h1>
    <p class="mt-4 text-lg text-ink-muted">
      Every run is a <code class="font-mono text-base">split.json</code> file, edited from a
      dedicated screen in <code class="font-mono text-base">openspeedrun-cfg</code> — icons,
      pagination for long split lists, and comparisons computed automatically from your history,
      no manual bookkeeping.
    </p>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Comparisons</h2>
      <p class="mt-3 text-ink-muted">
        Alongside <strong class="text-ink">Personal Best</strong> and per-split
        <strong class="text-ink">Best Segments</strong>, OpenSpeedRun derives
        <strong class="text-ink">Average Segments</strong> and
        <strong class="text-ink">Median Segments</strong> straight from your segment history —
        the same comparisons LiveSplit offers, kept in sync every time you finish a run. Both
        <strong class="text-ink">Game Time</strong> and <strong class="text-ink">Real Time</strong>
        are tracked per split, so loadless comparisons work the same way they do there too.
      </p>
    </section>

    <section class="mt-10 rounded-lg border border-border bg-surface p-5">
      <h2 class="text-lg font-bold text-accent">LiveSplit compatibility</h2>
      <p class="mt-2 text-ink-muted">
        The split editor can import and export real
        <code class="font-mono text-sm">.lss</code> files — the same format LiveSplit itself
        reads and writes, so switching between the two doesn't mean rebuilding your splits by
        hand.
      </p>
      <ul class="mt-4 space-y-2 text-sm text-ink-muted">
        <li class="flex gap-2">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">Import</strong> reads a
            <code class="font-mono text-xs">.lss</code> straight from LiveSplit — names, times,
            comparisons and all — and drops it into the editor for review before you save it.
          </span>
        </li>
        <li class="flex gap-2">
          <span class="text-accent">&bull;</span>
          <span>
            <strong class="text-ink">Export</strong> writes a
            <code class="font-mono text-xs">.lss</code> LiveSplit itself can open — including
            icons, matched <strong class="text-ink">byte-for-byte</strong> against LiveSplit's own
            icon encoding rather than an approximation, so they show up correctly in real
            LiveSplit, not just on reimport back into OpenSpeedRun.
          </span>
        </li>
      </ul>
      <CodeBlock
        class="mt-4"
        label="openspeedrun-cfg — Split editor"
        code="[Import .lss]  [Export .lss]  [Import folder]  [Export folder]"
      />
      <p class="mt-3 text-xs text-ink-muted">
        "Average Segments"/"Median Segments" are never written to the file — LiveSplit derives
        those itself from segment history at load time, and so does OpenSpeedRun, so both stay
        correct without duplicating data.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Icons</h2>
      <p class="mt-3 text-ink-muted">
        Every split can carry its own icon — dropped in from any image file, kept a fixed size
        (configurable per-theme) so long split lists stay aligned regardless of each icon's own
        aspect ratio. Icons round-trip through <code class="font-mono text-sm">.lss</code>
        import/export in both directions.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Your data, exportable</h2>
      <p class="mt-3 text-ink-muted">
        Beyond LiveSplit's own format, the History tab can export your full attempt and per-split
        segment history to plain CSV — no LiveSplit needed at all. See the
        <RouterLink to="/stats" class="text-accent hover:underline">Local Stats</RouterLink>
        page to turn that into charts entirely in your browser.
      </p>
    </section>

    <section class="mt-10 rounded-lg border border-border bg-surface-alt/60 p-6 text-center">
      <p class="text-ink-muted">Full split editor and file format details live in the README.</p>
      <a
        href="https://github.com/SrWither/OpenSpeedRun#usage"
        target="_blank"
        rel="noopener"
        class="mt-2 inline-block font-semibold text-accent hover:underline"
      >
        Read more on GitHub &rarr;
      </a>
    </section>
  </div>
</template>
