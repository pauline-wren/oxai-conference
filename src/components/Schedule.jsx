import ComingSoon from './ComingSoon'

const colors = {
  keynote:  { dot: 'bg-mint',      badge: 'bg-mint text-ink' },
  featured: { dot: 'bg-mint',      badge: 'bg-mint text-ink' },
  panel:    { dot: 'bg-[#a78bfa]', badge: 'bg-[#a78bfa] text-white' },
  session:  { dot: 'bg-[#60a5fa]', badge: 'bg-[#60a5fa] text-white' },
  workshop: { dot: 'bg-[#fb923c]', badge: 'bg-[#fb923c] text-white' },
  social:   { dot: 'bg-mint',      badge: 'bg-mint text-ink' },
  logistics:{ dot: 'bg-g700',      badge: null },
}
const label = { keynote: 'Keynote', featured: 'Featured Talk', panel: 'Panel', session: 'Session', workshop: 'Workshop', social: 'Social' }

export default function Schedule({ conf }) {
  const items = conf.schedule ?? []
  return (
    <section id="schedule" className="bg-white py-20 md:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-mint text-ink text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">Programme</span>
          <h2 className="text-ink font-bold text-3xl md:text-5xl tracking-tight">Schedule</h2>
        </div>

        {!items.length ? <ComingSoon /> : (
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[5.75rem] top-4 bottom-4 w-px bg-[#e8e8e8] hidden sm:block" />

          <div className="flex flex-col">
            {items.map((item, i) => {
              const c = colors[item.type] ?? colors.logistics
              return (
                <div key={i} className="flex gap-0 sm:gap-4 relative">

                  {/* Time */}
                  <div className="hidden sm:flex w-24 flex-shrink-0 flex-col items-end pt-[1.35rem] pr-4">
                    <p className="text-[#1a1a1a] text-sm font-bold tabular-nums leading-none">{item.time}</p>
                    {item.endTime && <p className="text-[#888] text-[11px] mt-1 tabular-nums">{item.endTime}</p>}
                  </div>

                  {/* Square dot — pixel aesthetic (no rounded-full) */}
                  <div className="hidden sm:flex flex-col items-center pt-[1.35rem] flex-shrink-0">
                    <div className={`w-3 h-3 ring-4 ring-white relative z-10 ${c.dot}`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 py-5 pl-4 sm:pl-5 ${i < items.length - 1 ? 'border-b border-[#f2f2f2] sm:border-0' : ''}`}>
                    <p className="sm:hidden text-[#666] text-[11px] font-bold tabular-nums mb-1">{item.time}</p>
                    <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                      <p className="font-bold text-base leading-snug text-ink">
                        {item.event}
                      </p>
                      {c.badge && label[item.type] && (
                        <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 mt-0.5 flex-shrink-0 ${c.badge}`}>
                          {label[item.type]}
                        </span>
                      )}
                    </div>
                    {item.detail && <p className="text-[#555] text-sm mt-1 italic">{item.detail}</p>}
                    {item.location && <p className="text-[#777] text-xs mt-1.5 tracking-wide">{item.location}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
