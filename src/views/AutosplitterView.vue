<script setup lang="ts">
import BetaBadge from '@/components/BetaBadge.vue'
import CodeBlock from '@/components/CodeBlock.vue'

const retroarchConfig = `{
  "target": { "kind": "retroarch" },
  "poll_interval_ms": 50,
  "watches": [
    {
      "name": "room_id",
      "address": "0x7E0020",
      "value_type": "u8",
      "condition": { "kind": "changed" },
      "action": "split"
    }
  ]
}`

const nativeConfig = `{
  "target": { "kind": "process_memory", "process_name": "game.bin" },
  "poll_interval_ms": 33,
  "watches": [
    {
      "name": "room_id",
      "address": "0x4A9F00",
      "module": "game.bin",
      "pointer_path": ["0x18", "0x10"],
      "value_type": "u32",
      "condition": { "kind": "changed" },
      "action": "split"
    }
  ]
}`
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <div class="flex items-center gap-3">
      <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Autosplitter</h1>
      <BetaBadge size="md" />
    </div>
    <p class="mt-4 text-lg text-ink-muted">
      <code class="font-mono text-base">openspeedrun-autosplitter</code> watches a value in memory
      and turns it into <code class="font-mono text-base">start</code>/<code
        class="font-mono text-base"
        >split</code
      >/<code class="font-mono text-base">reset</code>/<code class="font-mono text-base"
        >pause</code
      >
      commands, sent over the same control socket
      <code class="font-mono text-base">openspeedrun-cli</code> uses. It supports two targets with
      very different privilege requirements.
    </p>

    <section class="mt-10 rounded-lg border border-border bg-surface p-5">
      <h2 class="flex items-center gap-2 text-lg font-bold text-success">
        <span>&#9679;</span> Emulators (RetroArch) — recommended
      </h2>
      <p class="mt-2 text-ink-muted">
        RetroArch (and compatible libretro cores) expose a plaintext, opt-in UDP protocol built
        for exactly this — reading emulated RAM needs <strong class="text-ink">no elevated
        privileges at all</strong>.
      </p>
      <ol class="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-ink-muted">
        <li>
          In RetroArch: <code class="font-mono text-xs">Settings &rarr; Network &rarr; Network Commands</code>
          (opens its UDP port, <code class="font-mono text-xs">55355</code> by default).
        </li>
        <li>Create <code class="font-mono text-xs">autosplitter.json</code> next to your run's <code class="font-mono text-xs">split.json</code>.</li>
        <li>
          Run
          <code class="font-mono text-xs">openspeedrun-autosplitter path/to/autosplitter.json</code>.
        </li>
      </ol>
      <CodeBlock class="mt-4" label="autosplitter.json" :code="retroarchConfig" />
    </section>

    <section class="mt-8 rounded-lg border border-danger/40 bg-danger/5 p-5">
      <h2 class="flex items-center gap-2 text-lg font-bold text-danger">
        <span>&#9679;</span> Native games — advanced, opt-in, Linux only
      </h2>
      <p class="mt-2 text-ink-muted">
        Autosplitting a native/unmodified game requires reading its process memory directly, via
        <code class="font-mono text-sm">/proc/&lt;pid&gt;/mem</code>.
        <strong class="text-ink">This is a real reduction in process isolation, not a formality.</strong>
        On Linux, reading another process's memory needs ptrace access to it, which by default
        (Yama's <code class="font-mono text-sm">ptrace_scope</code>) only your process's own
        children get. Nothing in the config format defaults you into this — it only activates if
        you explicitly write <code class="font-mono text-sm">"kind": "process_memory"</code>.
      </p>
      <p class="mt-3 text-ink-muted">To use it, do one of:</p>
      <ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
        <li>
          Relax it for your session:
          <code class="font-mono text-xs"
            >echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope</code
          >
          (resets on reboot; lets <em>any</em> of your processes ptrace <em>any other</em>).
        </li>
        <li>
          Or grant just this binary the capability (narrower):
          <code class="font-mono text-xs"
            >sudo setcap cap_sys_ptrace=ep $(command -v openspeedrun-autosplitter)</code
          >.
        </li>
      </ul>
      <p class="mt-3 text-sm text-ink-muted">
        Not supported on macOS or *BSD (no <code class="font-mono text-xs">/proc</code>) — selecting
        this target there prints a clear error and exits instead of guessing.
      </p>
      <CodeBlock class="mt-4" label="autosplitter.json" :code="nativeConfig" />
      <ul class="mt-4 space-y-1.5 text-sm text-ink-muted">
        <li>
          <code class="font-mono text-xs">module</code> resolves <code class="font-mono text-xs"
            >address</code
          >
          relative to that module's load base (ASLR-safe), read from
          <code class="font-mono text-xs">/proc/&lt;pid&gt;/maps</code>.
        </li>
        <li>
          <code class="font-mono text-xs">pointer_path</code> (optional) chases an ASL-style
          multi-level pointer — handy for values behind dynamically-allocated memory.
        </li>
        <li>
          It waits for <code class="font-mono text-xs">process_name</code> to appear if it isn't
          running yet, and goes back to waiting if the process exits mid-run.
        </li>
      </ul>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Watch format (both targets)</h2>
      <p class="mt-3 text-ink-muted">
        Each watch reads a value as <code class="font-mono text-sm">value_type</code> (<code
          class="font-mono text-sm"
          >u8</code
        >/<code class="font-mono text-sm">u16</code>/<code class="font-mono text-sm">u32</code>/<code
          class="font-mono text-sm"
          >u64</code
        >/<code class="font-mono text-sm">i8</code>/<code class="font-mono text-sm">i16</code>/<code
          class="font-mono text-sm"
          >i32</code
        >/<code class="font-mono text-sm">i64</code>, <code class="font-mono text-sm">endian</code>
        defaults to little), and fires <code class="font-mono text-sm">action</code> the moment
        <code class="font-mono text-sm">condition</code> transitions into true — never on the
        first sample, and never again while it continues to hold. Condition kinds:
        <code class="font-mono text-sm">equals</code>/<code class="font-mono text-sm"
          >not_equals</code
        >/<code class="font-mono text-sm">greater_than</code>/<code class="font-mono text-sm"
          >less_than</code
        >
        (each take a <code class="font-mono text-sm">value</code>), plus
        <code class="font-mono text-sm">increased</code>/<code class="font-mono text-sm"
          >decreased</code
        >/<code class="font-mono text-sm">changed</code>.
      </p>
    </section>

    <section class="mt-10 rounded-lg border border-border bg-surface-alt/60 p-6">
      <p class="text-ink-muted">
        Full setup notes, the Proton/Wine caveat, and how to find a process name live in the
        README.
      </p>
      <a
        href="https://github.com/SrWither/OpenSpeedRun#autosplitting"
        target="_blank"
        rel="noopener"
        class="mt-2 inline-block font-semibold text-accent hover:underline"
      >
        Read the full Autosplitting section &rarr;
      </a>
    </section>
  </div>
</template>
