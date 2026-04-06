import { useCallback, useRef, useState } from 'react'
import { BioTemplate } from '../BioTemplate.jsx'

const DEMO_LINKS = [
  { _id: 'tp1', title: 'Instagram', url: 'https://instagram.com', icon: '📸', status: 'published', order: 0, buttonText: 'Open' },
  { _id: 'tp2', title: 'YouTube', url: 'https://youtube.com', icon: '▶️', status: 'published', order: 1, buttonText: 'Watch' },
  { _id: 'tp3', title: 'Website', url: 'https://example.com', icon: '🌐', status: 'published', order: 2, buttonText: 'Visit' },
]

export function TemplatePickCard({ template, selected, onSelect }) {
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

  const price = ((template.priceCents ?? 999) / 100).toFixed(2)
  const previewData = {
    slug: 'preview',
    displayName: 'Nani Creator',
    bio: 'Preview the exact template design before choosing.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=320&h=320&fit=crop&q=80',
    links: DEMO_LINKS,
    template,
  }

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
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-950">
          <div className="pointer-events-none absolute inset-0 scale-[0.82] origin-top rounded-xl shadow-xl transition duration-500 group-hover:scale-[0.86]">
            <BioTemplate data={previewData} preview />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent" />
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
