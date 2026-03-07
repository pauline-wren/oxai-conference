import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import ComingSoon from './ComingSoon'

function PresentationItem({ p, index }) {
  const [open, setOpen] = useState(false)
  const { data: d, content } = p
  return (
    <li className="py-5 border-t border-g800">
      <div className="flex gap-5 items-baseline">
        <span className="text-g700 font-bold text-xs tracking-widest flex-shrink-0 hidden sm:block tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base leading-snug">{d.title}</p>
          <p className="text-mint text-sm mt-1">
            {d.presenter}
            {d.affiliation && <span className="text-g500"> · {d.affiliation}</span>}
          </p>
          {content?.trim() && (
            <>
              <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-1.5 text-[#60a5fa] text-[11px] tracking-widest uppercase hover:opacity-70 transition-opacity mt-2 font-bold"
              >
                {open ? 'Hide abstract' : 'Abstract'}
                <span className={`inline-block w-1.5 h-1.5 border-r-2 border-b-2 border-current transition-transform duration-200 ${open ? '-rotate-135' : 'rotate-45'}`} />
              </button>
              {open && (
                <div className="text-g300 text-sm leading-relaxed mt-2 max-w-2xl border-l-2 border-[#60a5fa]/30 pl-4 prose-sm prose-invert">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  )
}

function SessionBlock({ session }) {
  const { data: d, content } = session
  return (
    <article className="border border-g800 border-l-4 border-l-[#60a5fa] overflow-hidden">
      {/* Header */}
      <div className="bg-g900 px-7 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="bg-[#60a5fa] text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5">Session</span>
            <span className="text-g500 text-sm">{d.time}</span>
          </div>
          <h3 className="text-white font-bold text-xl leading-snug">{d.title}</h3>
        </div>
        <div className="flex flex-col gap-1 sm:text-right flex-shrink-0">
          <p className="text-g300 text-sm">{d.venue}</p>
          {d.chair && (
            <p className="text-g500 text-sm">Chair: <span className="text-g300">{d.chair}</span></p>
          )}
        </div>
      </div>

      {/* Description */}
      {content?.trim() && (
        <div className="px-7 pt-4 pb-2 text-g300 text-sm leading-relaxed prose-sm prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}

      {/* Presentations */}
      {d.presentations?.length > 0 && (
        <div className="px-7 pb-4">
          <ol>
            {d.presentations.map((p, i) => (
              <PresentationItem key={p.data.id} p={p} index={i} />
            ))}
          </ol>
        </div>
      )}
    </article>
  )
}

export default function Sessions({ sessions }) {
  return (
    <section id="sessions" className="bg-ink py-20 md:py-24 border-b border-g800">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">Research</span>
          <h2 className="text-white font-bold text-3xl md:text-5xl tracking-tight">Presentations</h2>
        </div>
        {sessions.length ? (
          <div className="flex flex-col gap-6">
            {sessions.map(s => <SessionBlock key={s.data.id} session={s} />)}
          </div>
        ) : (
          <ComingSoon dark />
        )}
      </div>
    </section>
  )
}
