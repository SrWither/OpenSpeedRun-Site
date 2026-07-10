/** Formats milliseconds as `H:MM:SS.mmm` (or `M:SS.mmm` under an hour),
 * matching how the app itself displays times. */
export function formatMs(ms: number | null | undefined): string {
  if (ms === null || ms === undefined || Number.isNaN(ms)) return '—'

  const sign = ms < 0 ? '-' : ''
  const abs = Math.abs(ms)
  const totalSeconds = Math.floor(abs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const millis = Math.floor(abs % 1000)

  const pad = (n: number, w = 2) => String(n).padStart(w, '0')
  const time = hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`
  return `${sign}${time}.${pad(millis, 3)}`
}
