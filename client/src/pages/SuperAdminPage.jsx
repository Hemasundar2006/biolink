import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { BioTemplate } from '../components/BioTemplate.jsx'

function errMessage(err, fallback) {
  const msg = err?.response?.data?.message
  return typeof msg === 'string' && msg ? msg : fallback
}

/** UTR may live on nested invoice or root paymentUtr (server denormalized). */
function utrFromCreator(c) {
  return String(c?.invoice?.utrNumber || c?.paymentUtr || '').trim()
}

function hasUtr(c) {
  return utrFromCreator(c).length >= 8
}

const TABS = ['dashboard', 'creators', 'templates', 'config']
const ADMIN_PANEL_MOCKS = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=900&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop&q=80',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900&h=520&fit=crop&q=80',
]
const ADMIN_PREVIEW_LINKS = [
  {
    _id: 'adm-1',
    title: 'YouTube Channel',
    url: 'https://youtube.com',
    status: 'published',
    icon: '▶️',
    order: 0,
    buttonText: 'Watch',
    category: 'content',
  },
  {
    _id: 'adm-2',
    title: 'Instagram',
    url: 'https://instagram.com',
    status: 'published',
    icon: '📸',
    order: 1,
    buttonText: 'Open',
    category: 'social',
  },
  {
    _id: 'adm-3',
    title: 'Website',
    url: 'https://example.com',
    status: 'published',
    icon: '🌐',
    order: 2,
    buttonText: 'Visit',
    category: 'useful',
  },
]

export default function SuperAdminPage() {
  const { logout } = useAuth()
  const [tab, setTab] = useState('dashboard')
  const [creators, setCreators] = useState([])
  const [templates, setTemplates] = useState([])
  const [config, setConfig] = useState({})
  const [platformName, setPlatformName] = useState('')
  const [maintenance, setMaintenance] = useState(false)
  const [busyGlobal, setBusyGlobal] = useState(false)
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [newTpl, setNewTpl] = useState({
    key: '',
    name: '',
    category: 'General',
    variant: 1,
    description: '',
  })

  function adminMockForTemplate(tpl) {
    const idx = Math.max(0, (Number(tpl?.variant) || 1) - 1) % ADMIN_PANEL_MOCKS.length
    return ADMIN_PANEL_MOCKS[idx]
  }

  const loadAll = useCallback(async () => {
    const [cr, tp, cf] = await Promise.all([
      api.get('/super/creators'),
      api.get('/super/templates'),
      api.get('/super/config'),
    ])
    setCreators(cr.data.creators)
    setTemplates(tp.data.templates)
    const data = cf.data
    setConfig(data.config)
    setPlatformName(String(data.config.platformName ?? ''))
    setMaintenance(Boolean(data.config.maintenanceMode))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadAll()
    }, 0)
    return () => clearTimeout(timer)
  }, [loadAll])

  const stats = {
    creatorsTotal: creators.length,
    pending: creators.filter((c) => c.status === 'pending').length,
    approved: creators.filter((c) => c.status === 'approved').length,
    rejected: creators.filter((c) => c.status === 'rejected').length,
    templatesTotal: templates.length,
    templatesActive: templates.filter((t) => t.isActive !== false).length,
  }

  const filteredCreators = creators.filter((c) => {
    const q = query.trim().toLowerCase()
    const textMatch =
      !q ||
      (c.displayName || '').toLowerCase().includes(q) ||
      (c.email || '').toLowerCase().includes(q) ||
      (c.publicSlug || '').toLowerCase().includes(q) ||
      (c.creatorId || '').toLowerCase().includes(q) ||
      utrFromCreator(c).toLowerCase().includes(q) ||
      (c.invoice?.invoiceNumber || '').toLowerCase().includes(q)
    const stateMatch = statusFilter === 'all' || c.status === statusFilter
    return textMatch && stateMatch
  })

  async function reject(id) {
    setNotice('')
    try {
      await api.patch(`/super/creators/${id}/reject`, { notes: 'Rejected from admin panel' })
      await loadAll()
    } catch (err) {
      setNotice(errMessage(err, 'Failed to reject creator'))
    }
  }

  async function createTemplate(e) {
    e.preventDefault()
    setNotice('')
    try {
      await api.post('/super/templates', {
        key: newTpl.key.trim(),
        name: newTpl.name.trim(),
        category: newTpl.category,
        variant: Number(newTpl.variant),
        description: newTpl.description,
        palette: {
          primary: '#6366f1',
          secondary: '#a855f7',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          muted: '#94a3b8',
        },
        priceCents: 999,
        isActive: true,
        sortOrder: templates.length + 1,
      })
      setNewTpl({ key: '', name: '', category: 'General', variant: 1, description: '' })
      setNotice('Template created.')
      await loadAll()
    } catch (err) {
      setNotice(errMessage(err, 'Failed to create template'))
    }
  }

  async function saveConfig(e) {
    e.preventDefault()
    setBusyGlobal(true)
    await api.patch('/super/config', { platformName, maintenanceMode: maintenance })
    await loadAll()
    setBusyGlobal(false)
    setNotice('Configuration saved.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-800">
      <header className="border-b border-emerald-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-700">Super Admin</p>
            <h1 className="text-lg font-semibold text-slate-900">Biolink control center</h1>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm sm:flex">
            <Link to="/" className="rounded-lg px-3 py-2 text-center text-slate-600 hover:bg-emerald-50">
              Site home
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-lg px-3 py-2 text-slate-600 hover:bg-emerald-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 border-b border-emerald-100 pb-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 capitalize ${
                  tab === t ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-emerald-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void loadAll()}
            className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs text-emerald-700 hover:bg-emerald-50 sm:w-auto sm:py-1.5"
          >
            Refresh all data
          </button>
        </div>

        {notice ? (
          <div className="mt-4 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {notice}
          </div>
        ) : null}

        {tab === 'dashboard' ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Creators</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{stats.creatorsTotal}</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Pending approval</p>
                <p className="mt-2 text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Approved creators</p>
                <p className="mt-2 text-2xl font-bold text-emerald-700">{stats.approved}</p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-wide text-slate-500">Templates active</p>
                <p className="mt-2 text-2xl font-bold text-emerald-700">
                  {stats.templatesActive} / {stats.templatesTotal}
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2 sm:gap-6">
              <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Recent creators</h3>
                <div className="mt-4 space-y-3">
                  {creators.slice(0, 6).map((c) => (
                    <div key={c._id} className="flex items-center justify-between rounded-lg border border-emerald-100 p-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{c.displayName || c.email}</p>
                        <p className="text-xs text-slate-500">{c.email}</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs capitalize text-emerald-700">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Template variants snapshot</h3>
                <div className="mt-4 max-h-72 overflow-auto space-y-2">
                  {templates.slice(0, 12).map((t) => (
                    <div key={t._id} className="flex items-center justify-between rounded-lg border border-emerald-100 p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-md"
                          style={{
                            background: `linear-gradient(135deg, ${t.palette.primary}, ${t.palette.secondary})`,
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-900">{t.name}</p>
                          <p className="text-xs text-slate-500">{t.category}</p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-700">V{t.variant}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {tab === 'creators' ? (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <input
                className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm sm:w-auto sm:min-w-[230px]"
                placeholder="Search creators..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'approved', 'rejected'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-full px-3 py-1 text-xs capitalize ${
                      statusFilter === s ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-emerald-100 bg-white shadow-sm md:block">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-emerald-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Creator ID</th>
                  <th className="px-4 py-3">Public slug</th>
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">UTR</th>
                  <th className="px-4 py-3">Template</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreators.map((c) => (
                  <tr key={c._id} className="border-t border-emerald-100">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{c.displayName || '—'}</div>
                      <div className="text-xs text-slate-500">{c.email}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-700">{c.status}</td>
                    <td className="px-4 py-3 font-mono text-xs text-emerald-700">{c.creatorId || '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs text-emerald-700">{c.publicSlug || '—'}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">
                      <div>{c.invoice?.invoiceNumber || '—'}</div>
                      <div className="text-slate-500">
                        {c.invoice?.amountCents ? `$${(c.invoice.amountCents / 100).toFixed(2)}` : '$0.00'}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">
                      {utrFromCreator(c) || '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-700">
                      <div>{c.selectedTemplate?.name || c.invoice?.templateName || '—'}</div>
                      <div className="text-slate-500">
                        {c.subscription?.active ? 'Active subscription' : 'No active subscription'}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {c.status === 'pending' ? (
                          <button
                            type="button"
                            disabled={!hasUtr(c)}
                            onClick={async () => {
                              try {
                                const { data } = await api.patch(`/super/creators/${c._id}/approve`, {})
                                setNotice(
                                  (data.message || 'Approved and email sent.') +
                                    (data.devTemporaryPassword ? ` Dev password: ${data.devTemporaryPassword}` : ''),
                                )
                                await loadAll()
                              } catch (err) {
                                setNotice(errMessage(err, 'Failed to approve and send email'))
                              }
                            }}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Verify UTR + Approve + Send Email
                          </button>
                        ) : null}
                        {c.status !== 'rejected' ? (
                          <button
                            type="button"
                            onClick={() => reject(c._id)}
                            className="rounded-lg border border-red-300 px-3 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <div className="grid gap-3 md:hidden">
              {filteredCreators.map((c) => (
                <div key={c._id} className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{c.displayName || '—'}</p>
                      <p className="text-xs text-slate-500">{c.email}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] capitalize text-emerald-700">
                      {c.status}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <p><span className="font-semibold text-slate-500">Creator ID:</span> {c.creatorId || '—'}</p>
                    <p><span className="font-semibold text-slate-500">Slug:</span> {c.publicSlug || '—'}</p>
                    <p><span className="font-semibold text-slate-500">Invoice:</span> {c.invoice?.invoiceNumber || '—'}</p>
                    <p><span className="font-semibold text-slate-500">UTR:</span> {utrFromCreator(c) || '—'}</p>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">
                    Template: {c.selectedTemplate?.name || c.invoice?.templateName || '—'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.status === 'pending' ? (
                      <button
                        type="button"
                        disabled={!hasUtr(c)}
                        onClick={async () => {
                          try {
                            const { data } = await api.patch(`/super/creators/${c._id}/approve`, {})
                            setNotice(
                              (data.message || 'Approved and email sent.') +
                                (data.devTemporaryPassword ? ` Dev password: ${data.devTemporaryPassword}` : ''),
                            )
                            await loadAll()
                          } catch (err) {
                            setNotice(errMessage(err, 'Failed to approve and send email'))
                          }
                        }}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        Verify UTR + Approve
                      </button>
                    ) : null}
                    {c.status !== 'rejected' ? (
                      <button
                        type="button"
                        onClick={() => reject(c._id)}
                        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === 'templates' ? (
          <div className="mt-6 space-y-8">
            <form
              className="max-w-xl space-y-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6"
              onSubmit={createTemplate}
            >
              <h3 className="text-sm font-semibold text-slate-900">Add template</h3>
              <p className="text-xs text-slate-500">
                Unique key (slug), display name, layout variant (1-36), and category.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="key (e.g. midnight-pro)"
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900"
                  value={newTpl.key}
                  onChange={(e) => setNewTpl({ ...newTpl, key: e.target.value })}
                />
                <input
                  required
                  placeholder="Display name"
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900"
                  value={newTpl.name}
                  onChange={(e) => setNewTpl({ ...newTpl, name: e.target.value })}
                />
                <input
                  placeholder="Category"
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900"
                  value={newTpl.category}
                  onChange={(e) => setNewTpl({ ...newTpl, category: e.target.value })}
                />
                <input
                  type="number"
                  min={1}
                  max={36}
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900"
                  value={newTpl.variant}
                  onChange={(e) => setNewTpl({ ...newTpl, variant: Number(e.target.value) })}
                />
              </div>
              <input
                placeholder="Description"
                className="w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900"
                value={newTpl.description}
                onChange={(e) => setNewTpl({ ...newTpl, description: e.target.value })}
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Create template
              </button>
            </form>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <div key={t._id} className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                  <div className="mb-3 overflow-hidden rounded-lg border border-emerald-100">
                    <img
                      src={adminMockForTemplate(t)}
                      alt={`${t.name} admin panel design`}
                      className="h-28 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="border-t border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                      Admin panel design mock
                    </div>
                  </div>
                  <div className="mb-3 overflow-hidden rounded-lg border border-emerald-100 bg-slate-950">
                    <div className="pointer-events-none origin-top scale-[0.42]">
                      <BioTemplate
                        data={{
                          slug: 'preview',
                          displayName: 'Creator Preview',
                          bio: 'Admin panel preview for this specific template.',
                          avatarUrl:
                            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&q=80',
                          links: ADMIN_PREVIEW_LINKS,
                          template: t,
                        }}
                        preview
                      />
                    </div>
                    <div className="mt-[-230px] h-[230px]" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{t.name}</h3>
                  <p className="text-xs text-slate-500">
                    {t.category} · Variant {t.variant}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{t.description}</p>
                  <p className="mt-2 text-xs text-slate-500">${((t.priceCents ?? 0) / 100).toFixed(2)}</p>
                  <Link
                    to={`/super/templates/${t._id}/preview`}
                    className="mt-3 inline-block rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                  >
                    Open template admin preview
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === 'config' ? (
          <form
            className="mt-6 max-w-lg space-y-4 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6"
            onSubmit={saveConfig}
          >
            <div>
              <label className="text-xs font-medium text-slate-400">Platform name</label>
              <input
                className="mt-1 w-full rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />
              Maintenance mode (public pages return 503)
            </label>
            <button
              type="submit"
              disabled={busyGlobal}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              {busyGlobal ? 'Saving...' : 'Save configuration'}
            </button>
            <p className="text-xs text-slate-500">
              Raw config keys loaded: {Object.keys(config).join(', ') || '—'}
            </p>
          </form>
        ) : null}
      </div>
    </div>
  )
}
