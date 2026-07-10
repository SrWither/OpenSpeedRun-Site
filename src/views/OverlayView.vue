<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const configExample = `{
  "options": {
    "enable_overlay_server": true,
    "overlay_server_port": 7331
  }
}`

const snapshotExample = `{
  "title": "Super Mario Bros",
  "category": "Any%",
  "attempts": 42,
  "timing_method": "real_time",
  "selected_comparison": "Personal Best",
  "timer_state": "running",
  "current_time_ms": 84230,
  "secondary_label": null,
  "secondary_time_ms": null,
  "current_split_index": 2,
  "total_splits": 8,
  "sum_of_best_ms": 612400,
  "best_possible_time_ms": 700100,
  "pb_time_ms": 715300,
  "previous_segment_delta_ms": -230,
  "splits": [
    {
      "name": "World 1-1",
      "is_current": false,
      "cumulative_time_ms": 30120,
      "segment_time_ms": 30120,
      "segment_comparison_ms": 29800,
      "delta_ms": 320
    }
  ]
}`

const jsSnippet = `const ws = new WebSocket("ws://127.0.0.1:7331");
ws.onmessage = (event) => {
  const state = JSON.parse(event.data);
  document.getElementById("timer").textContent =
    (state.current_time_ms / 1000).toFixed(2) + "s";
};`
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">OBS Overlay Server</h1>
    <p class="mt-4 text-lg text-ink-muted">
      OpenSpeedRun can expose your live timer, splits, and comparisons over a local WebSocket —
      the same role LiveSplit's "LiveSplit Server" component plays, but streaming JSON instead of
      a plaintext line protocol. Point an OBS browser source at it and build whatever overlay you
      want.
    </p>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Enable it</h2>
      <p class="mt-3 text-ink-muted">
        Off by default — it's a listening socket, so it shouldn't turn on just because a config
        file exists. Turn it on from <code class="font-mono text-sm">openspeedrun-cfg</code> &rarr;
        <strong class="text-ink">Options</strong> &rarr; "Enable OBS overlay server", or by hand:
      </p>
      <CodeBlock class="mt-4" label="theme.json" :code="configExample" />
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Ready-made overlay</h2>
      <p class="mt-3 text-ink-muted">
        The repo ships a complete, ready-to-use overlay at
        <code class="font-mono text-sm">exampleconfig/overlay.html</code> — title/category, the
        big timer with an IGT/RTA secondary clock, attempts, Sum of Best, Best Possible, PB, and a
        colored splits list. Point an OBS browser source (or a regular browser tab, to check it
        connects first) straight at that file. No build step.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Or build your own</h2>
      <p class="mt-3 text-ink-muted">
        Connect to <code class="font-mono text-sm">ws://127.0.0.1:&lt;port&gt;</code> (bound to
        localhost only). Every ~33ms, each connected client gets a full JSON snapshot:
      </p>
      <CodeBlock class="mt-4" label="snapshot" :code="snapshotExample" />
      <p class="mt-4 text-sm text-ink-muted">
        Every <code class="font-mono text-xs">*_time_ms</code>/<code class="font-mono text-xs"
          >delta_ms</code
        >
        field is a plain integer (milliseconds, negative means "ahead") — format it however you
        like, the server doesn't pre-render strings.
        <code class="font-mono text-xs">segment_time_ms</code>/<code class="font-mono text-xs"
          >segment_comparison_ms</code
        >
        are per-split segment times, not cumulative-from-start;
        <code class="font-mono text-xs">cumulative_time_ms</code> is the total elapsed time when
        that split was hit.
      </p>
      <CodeBlock class="mt-4" label="overlay.html (minimal)" :code="jsSnippet" />
    </section>

    <section class="mt-10 rounded-lg border border-border bg-surface-alt/60 p-6 text-center">
      <p class="text-ink-muted">
        Full field reference and a walkthrough of the ready-made overlay live in the README.
      </p>
      <a
        href="https://github.com/SrWither/OpenSpeedRun#overlay-server-obs-browser-source"
        target="_blank"
        rel="noopener"
        class="mt-2 inline-block font-semibold text-accent hover:underline"
      >
        Read the full Overlay Server section &rarr;
      </a>
    </section>
  </div>
</template>
