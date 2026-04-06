import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function errMessage(err, fallback) {
  const msg = err?.response?.data?.message
  return typeof msg === 'string' && msg ? msg : fallback
}

const TABS = ['dashboard', 'creators', 'templates', 'config']

export default function SuperAdminPage() {
  const { logout } = useAuth()
  const [tab, setTab] = useState('dashboard')
  const [creators, setCreators] = useState([])
  const [templates, setTemplates] = useState([])
  const [config, setConfig] = useState({})
  const [platformName, setPlatformName] = useState('')
  const [maintenance, setMaintenance] = useState(false)
  const [busyId, setBusyId] = useState(null)
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
    void loadAll()
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
      (c.publicSlug || '').toLowerCase().includes(q)
    const stateMatch = statusFilter === 'all' || c.status === statusFilter
    return textMatch && stateMatch
  })

  async function approve(id) {
    setBusyId(id)
    setNotice('')
    try {
      const { data } = await api.patch(`/super/creators/${id}/approve`, {})
      setNotice(
        (data.message || '') +
          (data.devTemporaryPassword ? ` Dev password: ${data.devTemporaryPassword}` : ''),
      )
      await loadAll()
    } finally {
      setBusyId(null)
    }
  }

  async function reject(id) {
    setBusyId(id)
    setNotice('')
    try {
      await api.patch(`/super/creators/${id}/reject`, { notes: 'Rejected from admin panel' })
      await loadAll()
    } finally {
      setBusyId(null)
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-300">Super Admin</p>
            <h1 className="text-lg font-semibold text-white">Biolink control center</h1>
          </div>
          <div className="flex gap-2 text-sm">
            <Link to="/" className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/5">
              Site home
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

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-sm">
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 capitalize ${
                  tab === t ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void loadAll()}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5"
          >
            Refresh all data
          </button>
        </div>

        {notice ? (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            {notice}
          </div>
        ) : null}

        {tab === 'dashboard' ? (
          <div className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Creators</p>
                <p className="mt-2 text-2xl font-bold text-white">{stats.creatorsTotal}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Pending approval</p>
                <p className="mt-2 text-2xl font-bold text-amber-300">{stats.pending}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Approved creators</p>
                <p className="mt-2 text-2xl font-bold text-emerald-300">{stats.approved}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Templates active</p>
                <p className="mt-2 text-2xl font-bold text-indigo-300">
                  {stats.templatesActive} / {stats.templatesTotal}
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="text-sm font-semibold text-white">Recent creators</h3>
                <div className="mt-4 space-y-3">
                  {creators.slice(0, 6).map((c) => (
                    <div key={c._id} className="flex items-center justify-between rounded-lg border border-white/5 p-3">
                      <div>
                        <p className="text-sm font-medium text-white">{c.displayName || c.email}</p>
                        <p className="text-xs text-slate-500">{c.email}</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs capitalize text-slate-300">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="text-sm font-semibold text-white">Template variants snapshot</h3>
                <div className="mt-4 max-h-72 overflow-auto space-y-2">
                  {templates.slice(0, 12).map((t) => (
                    <div key={t._id} className="flex items-center justify-between rounded-lg border border-white/5 p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="h-8 w-8 rounded-md"
                          style={{
                            background: `linear-gradient(135deg, ${t.palette.primary}, ${t.palette.secondary})`,
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{t.name}</p>
                          <p className="text-xs text-slate-500">{t.category}</p>
                        </div>
                      </div>
                      <span className="text-xs text-indigo-200">V{t.variant}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {tab === 'creators' ? (
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <input
                className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                placeholder="Search creators..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {['all', 'pending', 'approved', 'rejected'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-full px-3 py-1 text-xs capitalize ${
                    statusFilter === s ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Creator</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Public slug</th>
                  <th className="px-4 py-3">Subscription</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreators.map((c) => (
                  <tr key={c._id} className="border-t border-white/5">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{c.displayName || '—'}</div>
                      <div className="text-xs text-slate-500">{c.email}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-slate-300">{c.status}</td>
                    <td className="px-4 py-3 font-mono text-xs text-indigo-200">{c.publicSlug || '—'}</td>
                    <td className="px-4 py-3">{c.subscription?.active ? 'Active' : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {c.status === 'pending' ? (
                          <button
                            type="button"
                            disabled={busyId === c._id}
                            onClick={() => approve(c._id)}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                          >
                            Approve
                          </button>
                        ) : null}
                        {c.status !== 'rejected' ? (
                          <button
                            type="button"
                            disabled={busyId === c._id}
                            onClick={() => reject(c._id)}
                            className="rounded-lg border border-red-500/40 px-3 py-1 text-xs text-red-200 hover:bg-red-500/10 disabled:opacity-50"
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
          </div>
        ) : null}

        {tab === 'templates' ? (
          <div className="mt-6 space-y-8">
            <form
              className="max-w-xl space-y-3 rounded-xl border border-white/10 bg-slate-900/50 p-6"
              onSubmit={createTemplate}
            >
              <h3 className="text-sm font-semibold text-white">Add template</h3>
              <p className="text-xs text-slate-500">
                Unique key (slug), display name, layout variant (1-36), and category.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder="key (e.g. midnight-pro)"
                  className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  value={newTpl.key}
                  onChange={(e) => setNewTpl({ ...newTpl, key: e.target.value })}
                />
                <input
                  required
                  placeholder="Display name"
                  className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  value={newTpl.name}
                  onChange={(e) => setNewTpl({ ...newTpl, name: e.target.value })}
                />
                <input
                  placeholder="Category"
                  className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  value={newTpl.category}
                  onChange={(e) => setNewTpl({ ...newTpl, category: e.target.value })}
                />
                <input
                  type="number"
                  min={1}
                  max={36}
                  className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                  value={newTpl.variant}
                  onChange={(e) => setNewTpl({ ...newTpl, variant: Number(e.target.value) })}
                />
              </div>
              <input
                placeholder="Description"
                className="w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm"
                value={newTpl.description}
                onChange={(e) => setNewTpl({ ...newTpl, description: e.target.value })}
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
              >
                Create template
              </button>
            </form>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <div key={t._id} className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                  <div
                    className="mb-3 h-20 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${t.palette.primary}, ${t.palette.secondary})`,
                    }}
                  />
                  <h3 className="font-semibold text-white">{t.name}</h3>
                  <p className="text-xs text-slate-500">
                    {t.category} · Variant {t.variant}
                  </p>
                  <p className="mt-2 text-sm text-slate-400">{t.description}</p>
                  <p className="mt-2 text-xs text-slate-500">${((t.priceCents ?? 0) / 100).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === 'config' ? (
          <form
            className="mt-6 max-w-lg space-y-4 rounded-xl border border-white/10 bg-slate-900/50 p-6"
            onSubmit={saveConfig}
          >
            <div>
              <label className="text-xs font-medium text-slate-400">Platform name</label>
              <input
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />
              Maintenance mode (public pages return 503)
            </label>
            <button
              type="submit"
              disabled={busyGlobal}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
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
