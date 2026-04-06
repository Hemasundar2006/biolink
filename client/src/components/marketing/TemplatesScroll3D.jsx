import { useEffect, useRef, useState } from 'react'

const TEMPLATE_PREVIEWS = [
  {
    name: 'Aurora',
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=480&h=640&fit=crop&q=80',
  },
  {
    name: 'Forest',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=640&fit=crop&q=80',
  },
  {
    name: 'Minimal',
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=480&h=640&fit=crop&q=80',
  },
  {
    name: 'Sunset',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=480&h=640&fit=crop&q=80',
  },
  {
    name: 'Studio',
    src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=480&h=640&fit=crop&q=80',
  },
]

export function TemplatesScroll3D() {
  const sectionRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollUpBoostRef = useRef(0)
  const [transform, setTransform] = useState({ rx: 0, ry: 0 })

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const update = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y

      if (delta < -0.5) {
        scrollUpBoostRef.current = Math.min(16, scrollUpBoostRef.current + 2.4)
      } else if (delta > 0.5) {
        scrollUpBoostRef.current = Math.max(0, scrollUpBoostRef.current - 0.6)
      }
      scrollUpBoostRef.current *= 0.985

      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const mid = rect.top + rect.height / 2
      const t = (mid - vh * 0.5) / (vh * 0.9)
      const clamped = Math.max(-1, Math.min(1, t))
      const baseRy = clamped * 16
      const baseRx = -clamped * 5
      const ry = baseRy + scrollUpBoostRef.current * 0.45
      const rx = baseRx - scrollUpBoostRef.current * 0.08

      setTransform((prev) => (prev.rx === rx && prev.ry === ry ? prev : { rx, ry }))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section
      id="templates"
      ref={sectionRef}
      className="scroll-mt-20 border-t border-emerald-100/80 bg-white/50 py-20 backdrop-blur-sm sm:scroll-mt-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Templates</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">See your page in 3D</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Each card uses a real preview image. Move through the page — scrolling up adds extra tilt so the gallery
            feels alive.
          </p>
        </div>

        <div className="scene-perspective mx-auto mt-14 max-w-5xl overflow-visible pb-10 pt-4">
          <div
            className="preserve-3d flex flex-wrap items-center justify-center gap-5 sm:gap-6 md:flex-nowrap"
            style={{
              transform: `rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
              transition: 'transform 0.08s ease-out',
            }}
          >
            {TEMPLATE_PREVIEWS.map((item, i) => {
              const z = (i - (TEMPLATE_PREVIEWS.length - 1) / 2) * 16
              const yRot = (i - 2) * 4.5
              return (
                <div
                  key={item.name}
                  className="preserve-3d w-[42%] max-w-[200px] shrink-0 sm:w-[30%] sm:max-w-[220px] md:w-[18%]"
                  style={{
                    transform: `translateZ(${z}px) rotateY(${yRot}deg)`,
                  }}
                >
                  <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-[0_24px_60px_-14px_rgba(5,150,105,0.22)] ring-1 ring-emerald-50/80">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-emerald-50">
                      <img
                        src={item.src}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-white/15" />
                    </div>
                    <div className="border-t border-emerald-50 bg-white px-3 py-2.5">
                      <p className="text-center font-display text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-center text-[10px] font-medium uppercase tracking-wider text-emerald-700">
                        Template
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
