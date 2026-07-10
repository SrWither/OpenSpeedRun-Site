/** Reads the current theme's resolved colors straight from CSS custom
 * properties, so Chart.js (which paints to a `<canvas>`, not styled by CSS)
 * can match whichever theme is active. Call again after a dark/light toggle
 * — callers re-mount their chart (e.g. via a `:key` tied to the theme ref)
 * rather than trying to patch a live Chart.js instance's colors in place. */
export function chartColors() {
  const style = getComputedStyle(document.documentElement)
  const get = (name: string) => style.getPropertyValue(name).trim() || '#888888'

  return {
    ink: get('--color-ink'),
    inkMuted: get('--color-ink-muted'),
    accent: get('--color-accent'),
    border: get('--color-border'),
    success: get('--color-success'),
    danger: get('--color-danger'),
  }
}
