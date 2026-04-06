import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { MarketingBackground } from '../components/marketing/MarketingBackground.jsx'
import { TemplatePickCard } from '../components/marketing/TemplatePickCard.jsx'
import { clearCreatorFlow, writeCreatorFlow } from '../lib/creatorFlow.js'

const PREVIEW_IMAGES = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=520&h=650&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=520&h=650&fit=crop&q=80',
]

export default function GetStartedPage() {
  const nav = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const [templates, setTemplates] = useState([])
  const [loadError, setLoadError] = useState('')
  const [selected, setSelected] = useState(null)
  const [saving, setSaving] = useState(false)

  const isApprovedCreator = user?.role === 'creator' && user?.status === 'approved'

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get('/public/templates')
        if (!cancelled) setTemplates(data.templates || [])
      } catch {
        if (!cancelled) setLoadError('Could not load templates. Is the API running?')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  function handleSelect(tpl) {
    setSelected(tpl)
    if (!isApprovedCreator) {
      writeCreatorFlow({
        templateId: tpl._id,
        templateName: tpl.name,
        priceCents: tpl.priceCents ?? 999,
        checkoutPaid: false,
      })
    }
  }

  async function applyAsCreator() {
    if (!selected) return
    setSaving(true)
    try {
      await api.put('/creator/template', { templateId: selected._id })
      nav('/creator')
    } catch {
      setLoadError('Could not update template. Try again.')
    } finally {
      setSaving(false)
    }
  }

  function goCheckout() {
    if (!selected) return
    writeCreatorFlow({
      templateId: selected._id,
      templateName: selected.name,
      priceCents: selected.priceCents ?? 999,
      checkoutPaid: false,
    })
    nav('/checkout')
  }

  return (
    <MarketingBackground>
      <header className="sticky top-0 z-20 border-b border-emerald-100/90 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="font-display text-xl font-bold text-slate-900">
            Biolink
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/login" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Log in
            </Link>
            {!authLoading && !user ? (
              <Link
                to="/register"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Register
              </Link>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Step 1</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-slate-900 sm:text-5xl">
            Pick your 3D template
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Explore the library in depth. Select the design you love — then continue to checkout to secure it, or apply
            instantly if you already have an account.
          </p>
        </div>

        {loadError ? (
          <p className="mx-auto mt-8 max-w-lg text-center text-sm text-red-600">{loadError}</p>
        ) : null}

        {!authLoading && isApprovedCreator ? (
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-center text-sm text-emerald-900">
            You&apos;re signed in as a creator — choose a template and <strong>apply it to your page</strong>, or browse
            and manage everything from your dashboard.
          </div>
        ) : null}

        <div className="scene-perspective mx-auto mt-14">
          {templates.length === 0 && !loadError ? (
            <p className="text-center text-slate-500">Loading templates…</p>
          ) : (
            <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {templates.map((tpl, i) => (
                <TemplatePickCard
                  key={tpl._id}
                  template={tpl}
                  previewUrl={PREVIEW_IMAGES[i % PREVIEW_IMAGES.length]}
                  selected={selected?._id === tpl._id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {!authLoading && isApprovedCreator ? (
            <>
              <button
                type="button"
                disabled={!selected || saving}
                onClick={applyAsCreator}
                className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                {saving ? 'Saving…' : 'Apply template to my page'}
              </button>
              <Link
                to="/creator"
                className="w-full rounded-full border border-emerald-200 bg-white px-8 py-4 text-center text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 sm:w-auto"
              >
                Open dashboard
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                disabled={!selected}
                onClick={goCheckout}
                className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                Continue to checkout
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCreatorFlow()
                  setSelected(null)
                }}
                className="text-sm font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline"
              >
                Clear selection
              </button>
            </>
          )}
        </div>

        <p className="mx-auto mt-10 max-w-lg text-center text-xs text-slate-500">
          Checkout is a demo flow (no real card charge). After payment, you&apos;ll register with this template attached
          to your application.
        </p>
      </main>
    </MarketingBackground>
  )
}
