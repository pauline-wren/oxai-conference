import LinkedInIcon from './LinkedInIcon'
import ComingSoon from './ComingSoon'

function MemberCard({ member: m }) {
  const initials = m.name?.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="bg-g900 border border-g800 p-6 flex flex-col items-center text-center gap-4 hover:border-mint transition-colors">
      {m.photo ? (
        <img
          src={m.photo}
          alt={m.name}
          className="w-24 h-24 object-cover rounded-full ring-2 ring-g700"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-g800 ring-2 ring-g700 text-g300 font-bold text-xl flex items-center justify-center tracking-wider">
          {initials}
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <p className="text-white font-bold text-sm leading-snug">{m.name}</p>
        <p className="text-mint text-[10px] tracking-widest uppercase">{m.role}</p>
      </div>
      {m.linkedin && (
        <a href={m.linkedin} target="_blank" rel="noreferrer" className="text-g500 hover:text-mint transition-colors mt-auto" aria-label="LinkedIn">
          <LinkedInIcon className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}

export default function Committee({ groups, thanks, thanksPeople }) {
  return (
    <section id="committee" className="bg-ink py-20 md:py-24 border-b border-g800">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <span className="inline-block bg-g800 text-mint text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 mb-4">People</span>
          <h2 className="text-white font-bold text-3xl md:text-5xl tracking-tight">Team</h2>
        </div>
        {groups?.length ? (
          <div className="flex flex-col gap-14">
            {groups.map((group) => (
              <div key={group.name}>
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-g300 text-xs tracking-[0.2em] uppercase flex-shrink-0">{group.name}</h3>
                  <div className="flex-1 h-px bg-g800" />
                </div>
                {group.members?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {group.members.map((m, i) => <MemberCard key={i} member={m} />)}
                  </div>
                ) : group.note ? (
                  <div className="flex items-center gap-6">
                    <img src="/oxai_logo_text.png" alt="Oxford AI Society" className="h-10 w-auto opacity-70" />
                    <p className="text-g400 text-sm italic">{group.note}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <ComingSoon dark />
        )}

        {thanks?.length > 0 && (
          <div className="mt-16 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-g300 text-xs tracking-[0.2em] uppercase mb-6">Special Thanks to</p>
            <div className="flex flex-wrap gap-3">
              {thanks.map((org, i) => (
                <span key={i} className="text-g400 text-sm border border-g800 px-4 py-2">
                  {org}
                </span>
              ))}
            </div>
          </div>
        )}

        {thanksPeople?.length > 0 && (
          <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-g300 text-xs tracking-[0.2em] uppercase mb-4">With special thanks to</p>
            <p className="text-g400 text-sm">{thanksPeople.join(' · ')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
