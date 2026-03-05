export default function Footer({ conf }) {
  const sm = conf.socialMedia ?? {}
  return (
    <footer className="py-16">
      <div className="max-w-5xl mx-auto px-5 md:px-8 flex flex-col items-center gap-6 text-center">
        <img src="/oxai_logo_text.png" alt="OxAI" className="w-48 h-auto brightness-110" />
        <p className="text-g500 text-xs tracking-[0.15em] uppercase">Oxford Artificial Intelligence Society</p>
        <div className="flex flex-wrap justify-center gap-6">
          {sm.twitter   && <a href={`https://twitter.com/${sm.twitter}`}   target="_blank" rel="noreferrer" className="text-g300 text-xs tracking-widest uppercase hover:text-mint transition-colors">Twitter / X</a>}
          {sm.linkedin  && <a href={`https://linkedin.com/company/${sm.linkedin}`} target="_blank" rel="noreferrer" className="text-g300 text-xs tracking-widest uppercase hover:text-mint transition-colors">LinkedIn</a>}
          {sm.instagram && <a href={`https://instagram.com/${sm.instagram}`} target="_blank" rel="noreferrer" className="text-g300 text-xs tracking-widest uppercase hover:text-mint transition-colors">Instagram</a>}
          {conf.codeOfConductUrl && <a href={conf.codeOfConductUrl} target="_blank" rel="noreferrer" className="text-g300 text-xs tracking-widest uppercase hover:text-mint transition-colors">Code of Conduct</a>}
          {conf.contactEmail && <a href={`mailto:${conf.contactEmail}`} className="text-g300 text-xs tracking-widest uppercase hover:text-mint transition-colors">{conf.contactEmail}</a>}
        </div>
        <p className="text-g500 text-xs">© {new Date().getFullYear()} Oxford AI Society</p>
      </div>
    </footer>
  )
}
