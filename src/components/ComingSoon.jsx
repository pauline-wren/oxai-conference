export default function ComingSoon({ dark = false }) {
  return (
    <div className={`border ${dark ? 'border-g800' : 'border-[#e5e5e5]'} px-8 py-16 flex flex-col items-center gap-3 text-center`}>
      <p className={`text-xs font-bold tracking-[0.25em] uppercase ${dark ? 'text-g500' : 'text-[#bbb]'}`}>
        Updates coming soon
      </p>
    </div>
  )
}
