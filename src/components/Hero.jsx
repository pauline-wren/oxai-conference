export default function Hero({ conf }) {
  return (
    <section id="top" className="relative min-h-svh flex flex-col justify-center px-5 md:px-8 pt-24 pb-16 border-b border-g800 overflow-hidden">

      {/* Line grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(31,255,182,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(31,255,182,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Abstract geometric outlines — rotated squares, not circles */}
      <div className="absolute right-[-6%] top-[10%] w-[420px] h-[420px] border border-mint/[0.05] rotate-12 pointer-events-none" />
      <div className="absolute right-[9%] top-[30%] w-[200px] h-[200px] border border-mint/[0.08] rotate-45 pointer-events-none" />
      <div className="absolute left-[-3%] bottom-[8%] w-[280px] h-[280px] border border-mint/[0.04] -rotate-8 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full flex flex-col gap-8">

        <img src="/oxai_logo_text.png" alt="OxAI" className="w-full max-w-xs sm:max-w-sm md:max-w-lg h-auto" />

        <div>
          <p className="text-mint text-sm sm:text-base tracking-widest uppercase font-bold">
            {conf.edition ?? '3rd'} OxAI Conference
          </p>
          <p className="text-g300 text-sm mt-1">Oxford Artificial Intelligence Society</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 border border-g700">
          <div className="flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-g700">
            <span className="text-g300 text-[11px] tracking-widest uppercase mb-1">Date</span>
            <span className="text-white text-sm font-bold">{conf.date}</span>
          </div>
          <div className="flex flex-col px-5 py-4 border-b sm:border-b-0 sm:border-r border-g700">
            <span className="text-g300 text-[11px] tracking-widest uppercase mb-1">Time</span>
            <span className="text-white text-sm font-bold">{conf.time}</span>
          </div>
          <div className="flex flex-col px-5 py-4">
            <span className="text-g300 text-[11px] tracking-widest uppercase mb-1">Venue</span>
            <span className="text-white text-sm font-bold leading-snug">{conf.venue}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={conf.registrationUrl ?? '#'}
            target="_blank" rel="noreferrer"
            className="bg-mint text-ink font-bold text-sm tracking-widest uppercase px-8 py-4 text-center border border-mint hover:bg-transparent hover:text-mint transition-colors"
          >
            Register Now
          </a>
          <a
            href="#schedule"
            className="text-white text-sm tracking-widest uppercase px-8 py-4 text-center border border-g700 hover:border-mint hover:text-mint transition-colors"
          >
            View Schedule
          </a>
        </div>

      </div>
    </section>
  )
}
