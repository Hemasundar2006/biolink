import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../lib/api.js'
import { BioTemplate } from '../components/BioTemplate.jsx'

const ADMIN_PANEL_MOCKS = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&h=700&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&h=700&fit=crop&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=700&fit=crop&q=80',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=700&fit=crop&q=80',
]

const ADMIN_PREVIEW_LINKS = [
  { _id: 'a1', title: 'Dashboard', url: '#', icon: '📊', status: 'published', order: 0, buttonText: 'Open' },
  { _id: 'a2', title: 'Orders', url: '#', icon: '🧾', status: 'published', order: 1, buttonText: 'View' },
  { _id: 'a3', title: 'Profile', url: '#', icon: '👤', status: 'published', order: 2, buttonText: 'Manage' },
]

export default function SuperTemplatePreviewPage() {
  const { templateId } = useParams()
  const [templates, setTemplates] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get('/super/templates')
        if (!cancelled) setTemplates(data.templates || [])
      } catch {
        if (!cancelled) setError('Could not load template preview.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const template = useMemo(() => templates.find((t) => t._id === templateId), [templates, templateId])

  const previewData = useMemo(() => {
    if (!template) return null
    return {
      slug: 'admin-preview',
      displayName: 'Admin Preview',
      bio: 'Super Admin specific preview route',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=180&h=180&fit=crop&q=80',
      links: ADMIN_PREVIEW_LINKS,
      template,
    }
  }, [template])

  const adminImage = useMemo(() => {
    if (!template) return ADMIN_PANEL_MOCKS[0]
    const idx = Math.max(0, (Number(template.variant) || 1) - 1) % ADMIN_PANEL_MOCKS.length
    return ADMIN_PANEL_MOCKS[idx]
  }, [template])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-300">Super Admin</p>
            <h1 className="text-lg font-semibold text-white">{template?.name || 'Template'} preview</h1>
          </div>
          <Link to="/super" className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5">
            Back to super admin
          </Link>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[1fr_340px]">
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-4">
          {error ? (
            <p className="text-sm text-red-300">{error}</p>
          ) : previewData ? (
            <BioTemplate data={previewData} preview />
          ) : (
            <p className="text-sm text-slate-400">Loading preview...</p>
          )}
        </section>
        <aside className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
          <h2 className="text-sm font-semibold text-white">Template details</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <img src={adminImage} alt={`${template?.name || 'Template'} admin panel design`} className="h-36 w-full object-cover" />
            <div className="border-t border-white/10 bg-slate-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
              Admin panel design image
            </div>
          </div>
          {template ? (
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              <p><span className="text-slate-500">Name:</span> {template.name}</p>
              <p><span className="text-slate-500">Category:</span> {template.category}</p>
              <p><span className="text-slate-500">Variant:</span> {template.variant}</p>
              <p><span className="text-slate-500">Price:</span> ${((template.priceCents ?? 0) / 100).toFixed(2)}</p>
              <p className="pt-2 text-xs text-slate-400">
                This route is super-admin only and does not use public pages.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-400">Loading template...</p>
          )}
        </aside>
      </main>
    </div>
  )
}

