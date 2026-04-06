import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { BioTemplate } from '../components/BioTemplate.jsx'

const PREVIEW_PHOTOS = [
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=600&h=1000&fit=crop&q=80',
]

export default function CreatorDashboard() {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [templates, setTemplates] = useState([])
  const [linkDraft, setLinkDraft] = useState([])
  const [selectedTemplateId, setSelectedTemplateId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const loadAll = useCallback(async () => {
    const [{ data: p }, { data: t }] = await Promise.all([
      api.get('/creator/profile'),
      api.get('/creator/templates'),
    ])
    setProfile(p.profile)
    setTemplates(t.templates)
    setSelectedTemplateId((prev) => prev ?? p.profile.selectedTemplate?._id ?? null)
    setLinkDraft(
      (p.profile.links || []).map((l, i) => ({
        ...l,
        order: l.order ?? i,
      })),
    )
  }, [])

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  const publicPath = useMemo(() => {
    if (!profile?.publicSlug) return ''
    return `${window.location.origin}/${profile.publicSlug}`
  }, [profile?.publicSlug])

  const activeTemplate = useMemo(
    () => templates.find((t) => t._id === selectedTemplateId) || profile?.selectedTemplate || null,
    [templates, selectedTemplateId, profile?.selectedTemplate],
  )

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const categoryMatch = activeCategory === 'all' || t.category === activeCategory
      const q = query.trim().toLowerCase()
      const searchMatch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.variant).includes(q)
      return categoryMatch && searchMatch
    })
  }, [templates, activeCategory, query])

  const previewPayload = useMemo(() => {
    if (!profile || !activeTemplate) return null
    return {
      slug: profile.publicSlug || 'creator',
      displayName: profile.displayName || user?.email || 'Creator',
      bio: profile.bio || '',
      avatarUrl: profile.avatarUrl || '',
      links: linkDraft,
      template: activeTemplate,
    }
  }, [profile, activeTemplate, linkDraft, user?.email])

  const categories = useMemo(() => {
    const unique = new Set(templates.map((t) => t.category).filter(Boolean))
    return ['all', ...Array.from(unique)]
  }, [templates])

  const draftStats = useMemo(() => {
    const published = linkDraft.filter((l) => l.status !== 'draft')
    const drafts = linkDraft.length - published.length
    return { total: linkDraft.length, published: published.length, drafts }
  }, [linkDraft])

  async function saveProfile(e) {
    e.preventDefault()
    if (!profile) return
    setSaving(true)
    setNotice('')
    try {
      await api.put('/creator/profile', {
        displayName: profile.displayName,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
      })
      setNotice('Profile saved.')
      await loadAll()
    } finally {
      setSaving(false)
    }
  }

  async function saveLinks(e) {
    e.preventDefault()
    setSaving(true)
    setNotice('')
    try {
      await api.put('/creator/links', { links: linkDraft })
      setNotice('Links saved.')
      await loadAll()
    } finally {
      setSaving(false)
    }
  }

  async function applyTemplate() {
    if (!selectedTemplateId) return
    setSaving(true)
    setNotice('')
    try {
      await api.put('/creator/template', { templateId: selectedTemplateId })
      setNotice('Template updated.')
      await loadAll()
    } finally {
      setSaving(false)
    }
  }

  function updateLink(i, field, value) {
    setLinkDraft((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  function addLink() {
    setLinkDraft((prev) => [...prev, { title: 'New link', url: 'https://', order: prev.length }])
  }

  function removeLink(i) {
    setLinkDraft((prev) => prev.filter((_, idx) => idx !== i))
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading workspace…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-300">Creator</p>
            <h1 className="text-lg font-semibold text-white">Creator Studio - {profile.displayName || user?.email}</h1>
            {publicPath ? (
              <p className="text-xs text-slate-500">
                Public URL:{' '}
                <a href={publicPath} className="text-indigo-300 hover:underline">
                  {publicPath}
                </a>
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link
              to="/get-started"
              className="rounded-lg px-3 py-2 text-emerald-300 hover:bg-white/5 hover:text-emerald-200"
            >
              Explore template gallery
            </Link>
            <Link to="/" className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5">
              Home
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          {notice ? (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {notice}
            </div>
          ) : null}

          <section className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Total links</p>
              <p className="mt-2 text-2xl font-bold text-white">{draftStats.total}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Published</p>
              <p className="mt-2 text-2xl font-bold text-emerald-300">{draftStats.published}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Drafts</p>
              <p className="mt-2 text-2xl font-bold text-amber-300">{draftStats.drafts}</p>
            </div>
          </section>

          <section className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-sm font-semibold text-white">Profile</h2>
            <form className="mt-4 space-y-3" onSubmit={saveProfile}>
              <div>
                <label className="text-xs text-slate-400">Display name</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Bio</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Avatar URL</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Save profile
              </button>
            </form>
          </section>

          <section className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-white">Links</h2>
              <button
                type="button"
                onClick={addLink}
                className="text-xs font-semibold text-indigo-300 hover:underline"
              >
                + Add link
              </button>
            </div>
            <form className="mt-4 space-y-3" onSubmit={saveLinks}>
              {linkDraft.map((l, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-lg border border-white/5 p-3 sm:flex-row sm:items-end"
                >
                  <div className="flex-1">
                    <label className="text-xs text-slate-400">Title</label>
                    <input
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                      value={l.title}
                      onChange={(e) => updateLink(i, 'title', e.target.value)}
                    />
                  </div>
                  <div className="flex-2">
                    <label className="text-xs text-slate-400">URL</label>
                    <input
                      className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                      value={l.url}
                      onChange={(e) => updateLink(i, 'url', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    className="text-xs text-red-300 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 disabled:opacity-50"
              >
                Save links
              </button>
            </form>
          </section>

          <section className="rounded-xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-sm font-semibold text-white">Template library</h2>
            <p className="mt-1 text-xs text-slate-500">
              Click any template to instantly preview it on the right in mobile view. Save only when ready.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs"
                placeholder="Search templates..."
              />
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full px-3 py-1 text-xs capitalize ${
                    c === activeCategory ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-4 grid max-h-[420px] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
              {filteredTemplates.map((t, i) => {
                const active = selectedTemplateId === t._id
                return (
                  <button
                    key={t._id}
                    type="button"
                    onClick={() => setSelectedTemplateId(t._id)}
                    className={`rounded-lg border p-2 text-left text-xs transition ${
                      active ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      className="mb-2 h-20 overflow-hidden rounded-md"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${t.palette.primary}, ${t.palette.secondary})`,
                      }}
                    >
                      <img
                        src={PREVIEW_PHOTOS[i % PREVIEW_PHOTOS.length]}
                        alt=""
                        className="h-full w-full object-cover opacity-70 mix-blend-soft-light"
                      />
                    </div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-500">{t.category}</div>
                    <div className="text-[10px] text-slate-500">Variant {t.variant}</div>
                  </button>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Selected: <span className="font-semibold text-slate-300">{activeTemplate?.name || 'None'}</span>
              </p>
              <button
                type="button"
                disabled={saving || !selectedTemplateId}
                onClick={applyTemplate}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Apply selected template
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
            <h2 className="text-sm font-semibold text-white">User-side mobile preview</h2>
            <p className="text-xs text-slate-500">Tap template on left and watch this screen update instantly.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {PREVIEW_PHOTOS.slice(0, 3).map((src) => (
                <img key={src} src={src} alt="" className="h-24 w-full rounded-lg object-cover" />
              ))}
            </div>
          </div>
          <div className="rounded-4xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
            <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-slate-800" />
            <div className="h-[72vh] overflow-auto rounded-[1.6rem] border border-white/5 bg-black">
              {previewPayload ? (
                <BioTemplate data={previewPayload} preview />
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-500">
                  Select a template to preview.
                </div>
              )}
            </div>
            <div className="mx-auto mt-3 h-1.5 w-28 rounded-full bg-slate-700" />
          </div>
          {previewPayload ? (
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-xs text-slate-400">
              <p>
                <span className="text-slate-300">Previewing:</span> {activeTemplate?.name}
              </p>
              <p className="mt-1">
                <span className="text-slate-300">Links shown:</span> {linkDraft.length}
              </p>
            </div>
          ) : null}
          <div>
            {publicPath ? (
              <a
                href={publicPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-white/15 px-3 py-2 text-xs text-indigo-200 hover:bg-white/5"
              >
                Open live public page ↗
              </a>
            ) : (
              <div className="text-xs text-slate-500">Public URL will appear after slug is set.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
