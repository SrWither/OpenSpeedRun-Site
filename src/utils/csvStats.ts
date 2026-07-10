// Parses and summarizes the two CSV shapes `openspeedrun-cfg`'s History tab
// exports (see the Rust `formats::csv` module) — entirely client-side, no
// upload anywhere. Kept dependency-free (no csv-parse, no charting lib) since
// the format is small and fully under our control.

/** Minimal RFC4180-ish CSV parser: handles quoted fields (with embedded
 * commas/newlines) and doubled internal quotes, since that's the only
 * escaping `formats::csv`'s writer ever produces. */
export function parseCsvRows(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  let i = 0

  while (i < text.length) {
    const c = text[i]

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i++
        continue
      }
      field += c
      i++
      continue
    }

    if (c === '"') {
      inQuotes = true
      i++
      continue
    }
    if (c === ',') {
      row.push(field)
      field = ''
      i++
      continue
    }
    if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
      i++
      continue
    }

    field += c
    i++
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows.filter((r) => !(r.length === 1 && r[0] === ''))
}

function toNumberOrNull(s: string | undefined): number | null {
  if (s === undefined || s === '') return null
  const n = Number(s)
  return Number.isNaN(n) ? null : n
}

export type CsvKind = 'attempts' | 'segments' | 'unknown'

export function detectCsvKind(headerRow: string[]): CsvKind {
  const header = headerRow.join(',')
  if (header === 'run_index,date,real_time_ms,game_time_ms,ended,is_pb') return 'attempts'
  if (header === 'run_index,split_index,split_name,real_time_ms,game_time_ms') return 'segments'
  return 'unknown'
}

export interface AttemptRow {
  runIndex: number
  date: string | null
  realTimeMs: number | null
  gameTimeMs: number | null
  ended: boolean
  isPb: boolean
}

export function parseAttemptRows(rows: string[][]): AttemptRow[] {
  return rows.slice(1).map((r) => ({
    runIndex: Number(r[0]),
    date: r[1] || null,
    realTimeMs: toNumberOrNull(r[2]),
    gameTimeMs: toNumberOrNull(r[3]),
    ended: r[4] === 'true',
    isPb: r[5] === 'true',
  }))
}

export interface SegmentRow {
  runIndex: number
  splitIndex: number
  splitName: string
  realTimeMs: number | null
  gameTimeMs: number | null
}

export function parseSegmentRows(rows: string[][]): SegmentRow[] {
  return rows.slice(1).map((r) => ({
    runIndex: Number(r[0]),
    splitIndex: Number(r[1]),
    splitName: r[2] ?? '',
    realTimeMs: toNumberOrNull(r[3]),
    gameTimeMs: toNumberOrNull(r[4]),
  }))
}

function mean(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0) / xs.length
}

function median(xs: number[]): number {
  const sorted = [...xs].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return ((sorted[mid - 1] as number) + (sorted[mid] as number)) / 2
  }
  return sorted[mid] as number
}

function stddev(xs: number[]): number {
  if (xs.length < 2) return 0
  const m = mean(xs)
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)))
}

export interface AttemptStats {
  totalAttempts: number
  finishedAttempts: number
  completionRate: number
  bestMs: number | null
  averageMs: number | null
  medianMs: number | null
  pbCount: number
  // Chronological (run_index order) times for finished attempts, for a
  // simple progression sparkline.
  series: { runIndex: number; ms: number }[]
}

export function computeAttemptStats(rows: AttemptRow[]): AttemptStats {
  const finished = rows.filter((r) => r.ended && r.realTimeMs !== null)
  const times = finished.map((r) => r.realTimeMs as number)
  const series = [...finished]
    .sort((a, b) => a.runIndex - b.runIndex)
    .map((r) => ({ runIndex: r.runIndex, ms: r.realTimeMs as number }))

  return {
    totalAttempts: rows.length,
    finishedAttempts: finished.length,
    completionRate: rows.length > 0 ? finished.length / rows.length : 0,
    bestMs: times.length > 0 ? Math.min(...times) : null,
    averageMs: times.length > 0 ? mean(times) : null,
    medianMs: times.length > 0 ? median(times) : null,
    pbCount: rows.filter((r) => r.isPb).length,
    series,
  }
}

export interface SplitStats {
  splitIndex: number
  splitName: string
  count: number
  bestMs: number
  averageMs: number
  medianMs: number
  worstMs: number
  stddevMs: number
}

export interface SegmentStats {
  splits: SplitStats[]
  mostInconsistent: SplitStats | null
}

export function computeSegmentStats(rows: SegmentRow[]): SegmentStats {
  const bySplit = new Map<number, { name: string; times: number[] }>()

  for (const row of rows) {
    if (row.realTimeMs === null) continue
    const entry = bySplit.get(row.splitIndex) ?? { name: row.splitName, times: [] }
    entry.times.push(row.realTimeMs)
    bySplit.set(row.splitIndex, entry)
  }

  const splits: SplitStats[] = [...bySplit.entries()]
    .sort(([a], [b]) => a - b)
    .map(([splitIndex, { name, times }]) => ({
      splitIndex,
      splitName: name,
      count: times.length,
      bestMs: Math.min(...times),
      averageMs: mean(times),
      medianMs: median(times),
      worstMs: Math.max(...times),
      stddevMs: stddev(times),
    }))

  const firstSplit = splits[0]
  const mostInconsistent = firstSplit
    ? splits.reduce((worst, s) => (s.stddevMs > worst.stddevMs ? s : worst), firstSplit)
    : null

  return { splits, mostInconsistent }
}
