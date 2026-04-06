import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { MarketingBackground } from '../components/marketing/MarketingBackground.jsx'
import { BioTemplate } from '../components/BioTemplate.jsx'
import { writeCreatorFlow } from '../lib/creatorFlow.js'

const DEMO_LINKS = [
  { _id: 'l1', title: 'Instagram', url: 'https://instagram.com', icon: '📸', category: 'social', status: 'published', order: 0, buttonText: 'Open' },
  { _id: 'l2', title: 'YouTube', url: 'https://youtube.com', icon: '▶️', category: 'content', status: 'published', order: 1, buttonText: 'Watch' },
  { _id: 'l3', title: 'Portfolio', url: 'https://example.com', icon: '🌐', category: 'useful', status: 'published', order: 2, buttonText: 'Visit' },
]

export default function TemplatePreviewPage() {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [templates, setTemplates] = useState([])
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)

  const isApprovedCreator = user?.role === 'creator' && user?.status === 'approved'

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get('/public/templates')
        if (!cancelled) setTemplates(data.templates || [])
      } catch {
        if (!cancelled) setLoadError('Could not load template preview.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const tpl = useMemo(() => templates.find((t) => t._id === templateId), [templates, templateId])

  const previewPayload = useMemo(() => {
    if (!tpl) return null
    return {
      slug: 'demo-preview',
      displayName: 'Nani Creator',
      bio: 'This is a live preview for the selected template.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=320&h=320&fit=crop&q=80',
      links: DEMO_LINKS,
      template: tpl,
    }
  }, [tpl])

  async function applyAsCreator() {
    if (!tpl) return
    setSaving(true)
    try {
      await api.put('/creator/template', { templateId: tpl._id })
      navigate('/creator')
    } catch {
      setLoadError('Could not apply this template. Try again.')
    } finally {
      setSaving(false)
    }
  }

  function continueToCheckout() {
    if (!tpl) return
    writeCreatorFlow({
      templateId: tpl._id,
      templateName: tpl.name,
      priceCents: tpl.priceCents ?? 999,
      checkoutPaid: false,
    })
    navigate('/checkout')
  }

  return (
    <MarketingBackground>
      <header className="sticky top-0 z-20 border-b border-emerald-100/90 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="font-display text-xl font-bold text-slate-900">Biolink</Link>
          <Link to="/get-started" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
            Back to templates
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {loadError ? <p className="mb-4 text-sm text-red-600">{loadError}</p> : null}

        {!tpl ? (
          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-8 text-center text-slate-600">
            Loading template preview...
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-white/30 bg-white/80 p-4 shadow-xl">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <BioTemplate data={previewPayload} preview />
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Template Preview</p>
              <h1 className="mt-2 font-display text-2xl font-bold text-slate-900">{tpl.name}</h1>
              <p className="mt-1 text-sm text-slate-600">{tpl.category} · Variant {tpl.variant}</p>
              <p className="mt-4 text-sm text-slate-600">{tpl.description || 'Preview this template before selecting it.'}</p>
              <p className="mt-3 text-lg font-bold text-emerald-700">${((tpl.priceCents ?? 999) / 100).toFixed(2)}</p>

              <div className="mt-6 flex flex-col gap-3">
                {!authLoading && isApprovedCreator ? (
                  <button
                    type="button"
                    disabled={saving}
                    onClick={applyAsCreator}
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 disabled:opacity-50"
                  >
                    {saving ? 'Applying...' : 'Apply this template'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={continueToCheckout}
                    className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30"
                  >
                    Continue to checkout
                  </button>
                )}
                <Link
                  to="/get-started"
                  className="rounded-full border border-emerald-200 bg-white px-5 py-3 text-center text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  Choose another template
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>
    </MarketingBackground>
  )
}

