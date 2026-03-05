import LinkedInIcon from './LinkedInIcon'
import ComingSoon from './ComingSoon'

function MemberCard({ member: m }) {
  const initials = m.name?.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div className="bg-g900 border border-g800 p-6 flex flex-col items-center text-center gap-3 hover:border-g700 transition-colors">
      {m.photo ? (
        <img
          src={m.photo}
          alt={m.name}
          className="w-20 h-20 object-cover border-2 border-g700"
        />
      ) : (
        <div className="w-20 h-20 bg-g800 border-2 border-g700 text-g300 font-bold text-lg flex items-center justify-center tracking-wider">
          {initials}
        </div>
      )}
      <div>
        <p className="text-white font-bold text-sm">{m.name}</p>
        <p className="text-mint text-xs tracking-widest uppercase mt-1">{m.role}</p>
      </div>
      {m.linkedin && (
        <a href={m.linkedin} target="_blank" rel="noreferrer" className="text-g500 hover:text-mint transition-colors" aria-label="LinkedIn">
          <LinkedInIcon className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}

export default function Committee({ groups }) {
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {group.members?.map((m, i) => <MemberCard key={i} member={m} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ComingSoon dark />
        )}
      </div>
    </section>
  )
}
