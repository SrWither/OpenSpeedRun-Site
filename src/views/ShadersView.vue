<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const versions = [
  '1.10',
  '1.20',
  '1.30',
  '1.40',
  '1.50',
  '3.30',
  '4.00',
  '4.10',
  '4.20',
  '4.30',
  '4.40',
  '4.50',
  '4.60',
  '1.00 ES',
  '3.00 ES',
  '3.10 ES',
  '3.20 ES',
]

const gallery = [
  { name: 'Retrowave', file: 'retrowave' },
  { name: 'Space', file: 'space' },
  { name: 'Landscape', file: 'landscape' },
  { name: 'Orange', file: 'orange' },
]
const baseUrl = import.meta.env.BASE_URL

const vertexExample = `#version 330 core

in vec2 a_pos;
out vec2 v_uv;

void main() {
    v_uv = (a_pos + 1.0) * 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const fragmentExample = `#version 330 core

in vec2 v_uv;
out vec4 FragColor;

uniform float u_time;

void main() {
    vec3 color = 0.5 + 0.5 * cos(u_time + v_uv.xyx + vec3(0.0, 2.0, 4.0));
    FragColor = vec4(color, 1.0);
}`
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Shaders</h1>
    <p class="mt-4 text-lg text-ink-muted">
      Every theme can use an animated GLSL shader as its background, live behind your splits —
      write your own, or drop in one of the community examples shipped with the repo.
    </p>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Where they live</h2>
      <p class="mt-3 text-ink-muted">
        Shaders are just <code class="font-mono text-sm">.glsl</code> /
        <code class="font-mono text-sm">.glsl.vert</code> file pairs in your config directory.
        Pick one from <code class="font-mono text-sm">openspeedrun-cfg</code>'s theme editor, or
        drop your own files in:
      </p>
      <CodeBlock
        class="mt-4"
        label="path"
        code="~/.config/openspeedrun/shaders/"
      />
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Supported GLSL versions</h2>
      <p class="mt-3 text-ink-muted">
        Both desktop GLSL and GLSL ES are supported, from OpenGL 2.1-era shaders up to modern
        core-profile ones:
      </p>
      <div class="mt-3 flex flex-wrap gap-2">
        <code
          v-for="v in versions"
          :key="v"
          class="rounded-md border border-border bg-surface-alt px-2.5 py-1 font-mono text-xs"
        >
          {{ v }}
        </code>
      </div>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Vertex shader requirements</h2>
      <ul class="mt-3 list-disc space-y-1.5 pl-5 text-ink-muted">
        <li>
          Explicitly declare a <code class="font-mono text-sm">#version</code> directive (e.g.
          <code class="font-mono text-sm">#version 100</code>, the minimum supported).
        </li>
        <li>Define an attribute/input named <code class="font-mono text-sm">a_pos</code> of type <code class="font-mono text-sm">vec2</code>.</li>
        <li>Compute <code class="font-mono text-sm">gl_Position</code> from <code class="font-mono text-sm">a_pos</code>.</li>
      </ul>
      <CodeBlock class="mt-4" label="background.glsl.vert" :code="vertexExample" />
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">Fragment shader requirements</h2>
      <ul class="mt-3 list-disc space-y-1.5 pl-5 text-ink-muted">
        <li>Also needs an explicit <code class="font-mono text-sm">#version</code> directive.</li>
        <li>
          Use <code class="font-mono text-sm">gl_FragCoord</code> or interpolated UVs to compute
          per-pixel output.
        </li>
        <li>
          GLSL 1.00: write to <code class="font-mono text-sm">gl_FragColor</code>. Modern GLSL
          (330 core+): declare your own <code class="font-mono text-sm">out vec4</code>.
        </li>
      </ul>
      <CodeBlock class="mt-4" label="background.glsl" :code="fragmentExample" />
      <p class="mt-3 text-sm text-ink-muted">
        See the repo's
        <a
          href="https://github.com/SrWither/OpenSpeedRun/blob/master/docs/SHADERS.md"
          target="_blank"
          rel="noopener"
          class="text-accent hover:underline"
          >docs/SHADERS.md</a
        >
        for the full uniform list and more conventions.
      </p>
    </section>

    <section class="mt-10">
      <h2 class="text-xl font-bold">A few examples from the gallery</h2>
      <p class="mt-3 text-ink-muted">
        Sourced from
        <a href="https://www.shadertoy.com/" target="_blank" rel="noopener" class="text-accent hover:underline"
          >ShaderToy</a
        >
        and
        <a href="http://glslsandbox.com/" target="_blank" rel="noopener" class="text-accent hover:underline"
          >GLSL Sandbox</a
        >, ready to drop in — check
        <code class="font-mono text-sm">exampleconfig/shaders/</code> in the repo for the full
        set (kirby, threads, waves, fog, clouds, conjuring, vortex, bacterium, and more).
      </p>
      <div class="mt-6 grid grid-cols-2 gap-4">
        <figure v-for="s in gallery" :key="s.file" class="overflow-hidden rounded-lg border border-border">
          <img
            :src="`${baseUrl}shaders/${s.file}.png`"
            :alt="`${s.name} shader preview`"
            class="w-full"
          />
          <figcaption class="border-t border-border bg-surface-alt px-3 py-1.5 text-xs text-ink-muted">
            {{ s.name }}
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>
