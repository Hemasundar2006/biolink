import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { MarketingBackground } from '../components/marketing/MarketingBackground.jsx'

function errMessage(err, fallback) {
  const msg = err?.response?.data?.message
  return typeof msg === 'string' && msg ? msg : fallback
}

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const user = await login(email, password)
      if (user.role === 'super_admin') nav('/super')
      else nav('/creator')
    } catch (err) {
      setError(errMessage(err, 'Login failed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <MarketingBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link
          to="/"
          className="mb-8 font-display text-lg font-bold tracking-tight text-slate-900 transition hover:text-emerald-800"
        >
          Biolink
        </Link>
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-emerald-100 bg-white p-[1px] shadow-[0_24px_60px_-12px_rgba(5,150,105,0.18)]">
          <div className="rounded-[1.4rem] bg-white p-8">
            <h1 className="text-center font-display text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-center text-sm text-slate-600">
              Creators and Super Admins ·{' '}
              <Link to="/" className="font-semibold text-emerald-700 hover:underline">
                Home
              </Link>
            </p>
            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {error}
                </div>
              ) : null}
              <div>
                <label className="block text-xs font-semibold text-slate-600">Email</label>
                <input
                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/30 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600">Password</label>
                <input
                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/30 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:brightness-105 disabled:opacity-60"
              >
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
              New creator?{' '}
              <Link to="/register" className="font-semibold text-emerald-700 hover:underline">
                Apply here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MarketingBackground>
  )
}
