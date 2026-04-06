import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../lib/api.js'
import { MarketingBackground } from '../components/marketing/MarketingBackground.jsx'
import {
  clearCreatorFlow,
  readCheckoutUtrBackup,
  readCreatorFlow,
  writeCreatorFlow,
} from '../lib/creatorFlow.js'

function errMessage(err, fallback) {
  const msg = err?.response?.data?.message
  return typeof msg === 'string' && msg ? msg : fallback
}

export default function Register() {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [flow, setFlow] = useState(() => readCreatorFlow())
  const [utrInput, setUtrInput] = useState(() => String(readCreatorFlow()?.utrNumber || '').trim())

  const needsCheckout = flow?.templateId && !flow?.checkoutPaid

  useEffect(() => {
    const navUtr = location.state?.utrFromCheckout || location.state?.utrNumber
    if (navUtr && String(navUtr).trim().length >= 8) {
      const v = String(navUtr).trim()
      const cur = readCreatorFlow() || {}
      writeCreatorFlow({
        ...cur,
        utrNumber: v,
        checkoutPaid: true,
        checkoutAt: location.state?.checkoutAt || cur.checkoutAt,
      })
    }
    const f = readCreatorFlow()
    setFlow(f)
    setUtrInput(String(f?.utrNumber || readCheckoutUtrBackup() || '').trim())
  }, [location.state, location.key])

  function handleUtrChange(e) {
    const v = e.target.value.replace(/\s+/g, '')
    setUtrInput(v)
    const f = readCreatorFlow()
    if (f?.templateId && f?.checkoutPaid) {
      writeCreatorFlow({ utrNumber: v })
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    const latestFlow = readCreatorFlow()
    setFlow(latestFlow)
    const utr = String(
      utrInput || latestFlow?.utrNumber || readCheckoutUtrBackup() || location.state?.utrFromCheckout || '',
    ).trim()
    if (latestFlow?.templateId && !latestFlow?.checkoutPaid) {
      setError('Finish checkout first so we can attach your template.')
      return
    }
    if (latestFlow?.templateId && latestFlow?.checkoutPaid && utr.length < 8) {
      setError('Enter your payment UTR (at least 8 characters). It is required for admin verification.')
      return
    }
    setBusy(true)
    try {
      const payload = {
        email,
        password,
        displayName,
      }
      if (latestFlow?.templateId && latestFlow?.checkoutPaid) {
        payload.templateId = String(latestFlow.templateId).trim()
        payload.checkoutCompleted = true
        payload.utrNumber = utr
        payload.checkoutAt = latestFlow.checkoutAt || ''
      }
      const { data } = await api.post('/auth/register', payload)
      clearCreatorFlow()
      setMessage(data.message || 'Application submitted.')
    } catch (err) {
      setError(errMessage(err, 'Registration failed'))
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
            <h1 className="text-center font-display text-2xl font-bold text-slate-900">Get started</h1>
            <p className="mt-2 text-center text-sm text-slate-600">
              Create your creator application. After verification, an admin approves your space.
            </p>

            {flow?.templateId ? (
              <div
                className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                  flow.checkoutPaid
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-amber-200 bg-amber-50 text-amber-950'
                }`}
              >
                <p className="font-semibold">Template: {flow.templateName || 'Selected'}</p>
                {flow.checkoutPaid ? (
                  <p className="mt-1 text-xs text-emerald-800/90">Checkout complete — we&apos;ll attach this design.</p>
                ) : (
                  <p className="mt-2 text-xs">
                    Complete checkout to lock in this template, then return here.
                  </p>
                )}
                {flow.checkoutPaid ? (
                  <div className="mt-3 space-y-1">
                    <label className="block text-xs font-semibold text-emerald-900">Payment UTR (from checkout)</label>
                    <input
                      value={utrInput}
                      onChange={handleUtrChange}
                      placeholder="From checkout"
                      autoComplete="off"
                      className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                    />
                    <p className="text-[11px] text-emerald-800/80">
                      Pre-filled from checkout and sent with your application (you can correct it here if needed).
                    </p>
                  </div>
                ) : null}
                {!flow.checkoutPaid ? (
                  <Link
                    to="/checkout"
                    className="mt-3 inline-block font-bold text-amber-900 underline underline-offset-2 hover:text-amber-950"
                  >
                    Go to checkout →
                  </Link>
                ) : null}
              </div>
            ) : (
              <p className="mt-4 text-center text-xs text-slate-500">
                Optional:{' '}
                <Link to="/get-started" className="font-semibold text-emerald-700 hover:underline">
                  Choose a template first
                </Link>
              </p>
            )}

            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {error}
                </div>
              ) : null}
              {message ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                  {message}
                </div>
              ) : null}
              <div>
                <label className="block text-xs font-semibold text-slate-600">Display name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/30 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600">Email</label>
                <input
                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/30 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600">Password (application)</label>
                <input
                  className="mt-1 w-full rounded-xl border border-emerald-100 bg-emerald-50/30 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                />
                <p className="mt-1 text-xs text-slate-500">
                  On approval, a new password may be emailed to you (simulated in server console in dev).
                </p>
              </div>
              <button
                type="submit"
                disabled={busy || needsCheckout}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? 'Submitting…' : 'Submit application'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
              Already approved?{' '}
              <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MarketingBackground>
  )
}
