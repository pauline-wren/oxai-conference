import { parseMd } from '../utils/parseMd'

// Static imports — add new .md files here as content grows
import conferenceRaw from '../../content/conference.md?raw'
import committeeRaw from '../../content/committee.md?raw'

const speakerRaws = import.meta.glob('../../content/speakers/*.md', { query: '?raw', import: 'default', eager: true })
const panelRaws   = import.meta.glob('../../content/panels/*.md',   { query: '?raw', import: 'default', eager: true })
const sessionRaws = import.meta.glob('../../content/sessions/*.md', { query: '?raw', import: 'default', eager: true })
const workshopRaws = import.meta.glob('../../content/workshops/*.md', { query: '?raw', import: 'default', eager: true })

function parseAll(raws) {
  return Object.entries(raws)
    .map(([, raw]) => parseMd(raw))
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
}

export const conference = parseMd(conferenceRaw)
export const committee  = parseMd(committeeRaw)
export const speakers   = parseAll(speakerRaws)
export const panels     = parseAll(panelRaws)
export const sessions   = parseAll(sessionRaws)
export const workshops  = parseAll(workshopRaws)
