/**
 * Site-themed 3D decorations: link pills, URL chip, chain motif, rotating cube.
 * Fixed layer; pointer-events none — purely visual.
 */
function LinkPill3D({ label, className, delayClass = '' }) {
  return (
    <div
      className={`biolink-pill-3d absolute flex items-center justify-center rounded-full border border-emerald-200/90 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-emerald-800 shadow-lg backdrop-blur-sm ${className} ${delayClass}`}
    >
      {label}
    </div>
  )
}

function ChainLink3D({ className }) {
  return (
    <div
      className={`biolink-chain-3d absolute text-emerald-600/25 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36" fill="none">
        <ellipse
          cx="48"
          cy="60"
          rx="28"
          ry="38"
          stroke="currentColor"
          strokeWidth="10"
          transform="rotate(-25 48 60)"
          className="opacity-80"
        />
        <ellipse
          cx="72"
          cy="60"
          rx="28"
          ry="38"
          stroke="currentColor"
          strokeWidth="10"
          transform="rotate(25 72 60)"
          className="opacity-80"
        />
      </svg>
    </div>
  )
}

function BiolinkCube() {
  const z = 22
  const faces = [
    { transform: `rotateY(0deg) translateZ(${z}px)`, label: 'Bio', className: 'bg-emerald-500/90' },
    { transform: `rotateY(180deg) translateZ(${z}px)`, label: 'Link', className: 'bg-teal-600/85' },
    { transform: `rotateY(90deg) translateZ(${z}px)`, label: '', className: 'bg-emerald-400/70' },
    { transform: `rotateY(-90deg) translateZ(${z}px)`, label: '', className: 'bg-teal-500/70' },
    { transform: `rotateX(90deg) translateZ(${z}px)`, label: '', className: 'bg-emerald-300/65' },
    { transform: `rotateX(-90deg) translateZ(${z}px)`, label: '', className: 'bg-teal-400/65' },
  ]
  return (
    <div className="biolink-cube-wrap scene-perspective flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
      <div
        className="biolink-cube-inner preserve-3d relative h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            className={`absolute flex h-[44px] w-[44px] items-center justify-center border border-white/30 text-[10px] font-black text-white shadow-inner sm:h-[52px] sm:w-[52px] ${f.className}`}
            style={{
              transform: f.transform,
              backfaceVisibility: 'hidden',
            }}
          >
            {f.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function PageStack3D({ className }) {
  return (
    <div className={`biolink-page-stack scene-perspective absolute ${className}`} aria-hidden>
      <div className="preserve-3d relative h-20 w-14 sm:h-24 sm:w-16">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-0 top-0 h-full w-full rounded-lg border border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/80 shadow-md"
            style={{
              transform: `translateZ(${-i * 6}px) translateY(${i * 5}px) translateX(${i * 4}px) rotateY(-12deg) rotateX(4deg)`,
              opacity: 1 - i * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function Biolink3DDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <ChainLink3D className="biolink-chain-a -right-4 top-[12%] sm:right-[6%]" />
      <ChainLink3D className="biolink-chain-b bottom-[18%] left-[-3%] scale-75 opacity-40 sm:left-[4%]" />

      <div className="absolute left-[4%] top-[22%] sm:left-[6%] sm:top-[26%]">
        <BiolinkCube />
      </div>

      <PageStack3D className="right-[6%] top-[38%] hidden opacity-70 sm:block" />

      <LinkPill3D
        label="One URL"
        className="right-[5%] top-[20%] sm:right-[10%]"
        delayClass="biolink-pill-delay-a"
      />
      <LinkPill3D
        label="All links"
        className="left-[8%] bottom-[32%] sm:left-[12%]"
        delayClass="biolink-pill-delay-b"
      />
      <LinkPill3D
        label="Templates"
        className="right-[12%] bottom-[28%] hidden sm:flex"
        delayClass="biolink-pill-delay-c"
      />

      <div
        className="biolink-url-chip-3d absolute left-1/2 top-[8%] -translate-x-1/2 rounded-xl border border-emerald-200 bg-white/95 px-4 py-2 font-mono text-xs font-bold text-slate-700 shadow-lg backdrop-blur-sm sm:top-[10%] sm:text-sm"
      >
        <span className="text-emerald-600">/</span>
        <span className="tracking-widest">A7B8C9</span>
      </div>

      <div className="biolink-ring-orbit scene-perspective absolute bottom-[12%] right-[20%] hidden h-16 w-16 sm:block">
        <div className="preserve-3d relative h-full w-full">
          <div
            className="absolute inset-0 rounded-full border-[3px] border-dashed border-emerald-400/40"
            style={{ transform: 'rotateX(72deg) translateZ(0)' }}
          />
          <div
            className="absolute inset-1 rounded-full bg-emerald-400/20 blur-sm"
            style={{ transform: 'translateZ(8px)' }}
          />
        </div>
      </div>
    </div>
  )
}
