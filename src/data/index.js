import { parseMd } from '../utils/parseMd'

// Static imports — add new .md files here as content grows
import conferenceRaw from '../../content/conference.md?raw'
import committeeRaw from '../../content/committee.md?raw'
import galleryRaw from '../../content/gallery.md?raw'

const speakerRaws       = import.meta.glob('../../content/speakers/*.md',      { query: '?raw', import: 'default', eager: true })
const panelRaws         = import.meta.glob('../../content/panels/*.md',        { query: '?raw', import: 'default', eager: true })
const sessionRaws       = import.meta.glob('../../content/sessions/*.md',      { query: '?raw', import: 'default', eager: true })
const workshopRaws      = import.meta.glob('../../content/workshops/*.md',     { query: '?raw', import: 'default', eager: true })
const presentationRaws  = import.meta.glob('../../content/presentations/*.md', { query: '?raw', import: 'default', eager: true })

function parseAll(raws) {
  return Object.entries(raws)
    .map(([, raw]) => parseMd(raw))
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
}

// Group presentations by session_id
const presentationsBySession = {}
for (const [, raw] of Object.entries(presentationRaws)) {
  const parsed = parseMd(raw)
  const sid = parsed.data.session_id
  if (sid) {
    if (!presentationsBySession[sid]) presentationsBySession[sid] = []
    presentationsBySession[sid].push(parsed)
  }
}

// Attach grouped presentations to each session
function parseSessions(raws) {
  return Object.entries(raws)
    .map(([, raw]) => {
      const session = parseMd(raw)
      session.data.presentations = presentationsBySession[session.data.id] ?? []
      return session
    })
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
}

export const conference = parseMd(conferenceRaw)
export const committee  = parseMd(committeeRaw)
export const gallery    = parseMd(galleryRaw)
export const speakers   = parseAll(speakerRaws)
export const panels     = parseAll(panelRaws)
export const sessions   = parseSessions(sessionRaws)
export const workshops  = parseAll(workshopRaws)
