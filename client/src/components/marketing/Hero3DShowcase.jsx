/**
 * Light-theme 3D showcase: mint accents, readable dark text on inner UI.
 */
export function Hero3DShowcase() {
  return (
    <div className="relative mx-auto flex h-[min(540px,75vh)] w-full max-w-[420px] items-center justify-center sm:max-w-[480px]">
      <div
        className="animate-orb pointer-events-none absolute left-[8%] top-[12%] h-44 w-44 rounded-full bg-emerald-300/35 blur-3xl"
        aria-hidden
      />
      <div
        className="animate-orb pointer-events-none absolute bottom-[18%] right-[5%] h-52 w-52 rounded-full bg-teal-200/40 blur-3xl [animation-delay:-2s]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200/30 blur-[80px]"
        aria-hidden
      />

      <div className="scene-perspective relative z-[1] h-full w-full">
        <div className="preserve-3d animate-hero-float absolute left-1/2 top-1/2 flex h-[340px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-[380px] sm:w-[320px]">
          {/* Back card — image strip */}
          <div
            className="preserve-3d absolute h-[270px] w-[190px] overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl sm:h-[290px] sm:w-[210px]"
            style={{
              transform: 'translateZ(-115px) translateX(38px) rotateY(8deg) rotateX(4deg)',
              opacity: 0.88,
            }}
            aria-hidden
          >
            <img
              src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=520&fit=crop&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
          </div>

          {/* Mid card — second image */}
          <div
            className="preserve-3d animate-hero-drift absolute h-[250px] w-[200px] overflow-hidden rounded-3xl border border-emerald-200/80 bg-white shadow-[0_0_50px_-12px_rgba(5,150,105,0.25)]"
            style={{
              transform: 'translateZ(-52px) translateX(-34px) rotateY(-6deg) rotateX(2deg)',
            }}
            aria-hidden
          >
            <div className="absolute inset-0 hero-shimmer opacity-60" />
            <img
              src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=500&fit=crop&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-emerald-50/40" />
          </div>

          {/* Front — phone frame (light) */}
          <div
            className="preserve-3d relative z-10 w-[min(260px,72vw)] rounded-[2.2rem] border border-emerald-100 bg-white p-1.5 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12),0_0_0_1px_rgba(16,185,129,0.08)_inset]"
            style={{
              transform: 'translateZ(22px) rotateY(-4deg)',
            }}
          >
            <div className="absolute left-1/2 top-2 h-5 w-16 -translate-x-1/2 rounded-full bg-slate-200/90" aria-hidden />
            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-emerald-50 bg-gradient-to-b from-white to-emerald-50/40">
              <div className="relative px-5 pb-8 pt-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(16,185,129,0.12),transparent_55%)]" />
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-lg font-bold text-white shadow-lg ring-4 ring-emerald-100">
                  B
                </div>
                <p className="relative mt-4 text-center font-display text-lg font-semibold text-slate-900">Your name</p>
                <p className="relative mt-1 text-center text-xs font-medium text-emerald-800/80">yoursite.com/A7B8C9</p>
                <div className="relative mt-6 space-y-2.5">
                  {['Portfolio', 'YouTube', 'Instagram', 'Shop'].map((label, i) => (
                    <div
                      key={label}
                      className="rounded-xl border border-emerald-100/90 bg-white/90 px-4 py-3 text-center text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-sm"
                      style={{ transform: `translateZ(${4 + i}px)` }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-36 w-[min(120%,520px)] -translate-x-1/2 grid-floor opacity-50"
        aria-hidden
      />
    </div>
  )
}
