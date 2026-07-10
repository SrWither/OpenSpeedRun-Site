<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'
import PlatformCard from '@/components/PlatformCard.vue'

const releasesUrl = 'https://github.com/SrWither/OpenSpeedRun/releases'
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <div class="max-w-2xl">
      <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Downloads</h1>
      <p class="mt-3 text-ink-muted">
        Precompiled binaries for Linux, Windows, macOS and FreeBSD are published on every release.
      </p>
      <a
        :href="releasesUrl"
        target="_blank"
        rel="noopener"
        class="mt-4 inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-ink hover:opacity-90"
      >
        All releases on GitHub &rarr;
      </a>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
      <PlatformCard icon="🐧" title="Linux" note="openspeedrun-linux-gnu-x86_64.zip">
        <ol class="list-decimal space-y-2 pl-4 text-ink-muted">
          <li>Download and unzip the archive from the Releases page.</li>
          <li>
            Move the binaries somewhere in your <code class="font-mono text-xs">PATH</code>, or
            run them from where you extracted them.
          </li>
        </ol>
        <CodeBlock
          label="terminal"
          code="unzip openspeedrun-linux-gnu-x86_64.zip
chmod +x openspeedrun openspeedrun-cfg openspeedrun-cli openspeedrun-autosplitter
./openspeedrun"
        />
        <p class="text-ink-muted">
          Arch-based distros can also install from the
          <a
            href="https://aur.archlinux.org/packages/openspeedrun-bin"
            target="_blank"
            rel="noopener"
            class="text-accent hover:underline"
            >AUR</a
          >:
        </p>
        <CodeBlock label="terminal" code="paru -S openspeedrun-bin" />
      </PlatformCard>

      <PlatformCard icon="🪟" title="Windows" note="openspeedrun-windows-x86_64.zip">
        <ol class="list-decimal space-y-2 pl-4 text-ink-muted">
          <li>Download and extract the zip anywhere, e.g. <code class="font-mono text-xs">C:\Games\OpenSpeedRun\</code>.</li>
          <li>Run <code class="font-mono text-xs">openspeedrun.exe</code>.</li>
          <li>Run <code class="font-mono text-xs">openspeedrun-cfg.exe</code> to configure themes and splits.</li>
        </ol>
        <p class="text-xs text-ink-muted">
          Note: <code class="font-mono text-xs">openspeedrun-cli</code> and
          <code class="font-mono text-xs">openspeedrun-autosplitter</code> are Unix-only (they use
          a Unix control socket) and aren't shipped in the Windows build.
        </p>
      </PlatformCard>

      <PlatformCard icon="🍎" title="macOS" note="openspeedrun-darwin-x86_64.zip — untested, best effort">
        <ol class="list-decimal space-y-2 pl-4 text-ink-muted">
          <li>Download and unzip the archive from the Releases page.</li>
          <li>Run from a terminal: <code class="font-mono text-xs">./openspeedrun</code>.</li>
        </ol>
        <p class="text-ink-muted">
          If macOS refuses to open it as "from an unidentified developer":
        </p>
        <CodeBlock
          label="terminal"
          code="chmod +x openspeedrun
xattr -d com.apple.quarantine openspeedrun"
        />
      </PlatformCard>

      <PlatformCard icon="😈" title="FreeBSD" note="build from source">
        <p class="text-ink-muted">
          No prebuilt package yet — build it yourself, same as below.
        </p>
        <CodeBlock
          label="terminal"
          code="pkg install rust pkgconf
git clone https://github.com/SrWither/OpenSpeedRun.git
cd OpenSpeedRun
cargo build --release"
        />
        <p class="text-ink-muted">
          Note that <code class="font-mono text-xs">process_memory</code> autosplitting is
          Linux-only (it needs <code class="font-mono text-xs">/proc</code>) — use the RetroArch
          target on FreeBSD instead.
        </p>
      </PlatformCard>
    </div>

    <div class="mt-14">
      <h2 class="text-xl font-bold">Build from source</h2>
      <p class="mt-2 text-ink-muted">
        Needs a recent stable Rust toolchain (edition 2024). On Linux you'll also need
        <code class="font-mono text-xs">libx11-dev libxi-dev libxtst-dev pkg-config</code> (or your
        distro's equivalents).
      </p>
      <CodeBlock
        label="terminal"
        class="mt-4"
        code="git clone https://github.com/SrWither/OpenSpeedRun.git
cd OpenSpeedRun
cargo build --release
# or, to install straight into ~/.cargo/bin:
cargo install --path ."
      />
    </div>
  </div>
</template>
