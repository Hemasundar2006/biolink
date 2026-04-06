import { useCallback, useRef, useState } from 'react'

export function TemplatePickCard({ template, previewUrl, selected, onSelect }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: py * -14, ry: px * 14 })
  }, [])

  const onLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), [])

  const p = template.palette || {}
  const price = ((template.priceCents ?? 999) / 100).toFixed(2)

  return (
    <button
      type="button"
      ref={ref}
      onClick={() => onSelect(template)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative w-full max-w-[260px] text-left transition-all duration-200 ${
        selected ? 'z-[2] scale-[1.02]' : 'z-[1] hover:z-[2]'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${selected ? 20 : 0}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className={`overflow-hidden rounded-2xl border-2 bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] transition-shadow ${
          selected
            ? 'border-emerald-500 shadow-[0_28px_60px_-12px_rgba(5,150,105,0.35)] ring-2 ring-emerald-200'
            : 'border-emerald-100 hover:border-emerald-300 hover:shadow-[0_24px_56px_-12px_rgba(5,150,105,0.2)]'
        }`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={previewUrl}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              background: `linear-gradient(135deg, ${p.primary || '#10b981'}, ${p.secondary || '#14b8a6'})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-white/20" />
          {selected ? (
            <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
              Selected
            </span>
          ) : null}
        </div>
        <div className="border-t border-emerald-50 bg-white p-4">
          <p className="font-display text-base font-bold text-slate-900">{template.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">{template.category} · Variant {template.variant}</p>
          <p className="mt-2 font-semibold text-emerald-700">${price}</p>
        </div>
      </div>
    </button>
  )
}
