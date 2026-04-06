import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MarketingBackground } from '../components/marketing/MarketingBackground.jsx'
import { readCreatorFlow, writeCreatorFlow } from '../lib/creatorFlow.js'

export default function CheckoutPage() {
  const nav = useNavigate()
  const [flow, setFlow] = useState(() => readCreatorFlow())
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [utrNumber, setUtrNumber] = useState('')
  const upiQrUrl =
    'https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=upi://pay?pa=marothihemasundar03-1@okaxis&pn=Biolink%20Templates&cu=INR'

  const price = useMemo(() => {
    const cents = flow?.priceCents ?? 999
    return (cents / 100).toFixed(2)
  }, [flow])

  useEffect(() => {
    if (!readCreatorFlow()?.templateId) {
      nav('/get-started', { replace: true })
    }
  }, [nav])

  async function completeCheckout() {
    const cleaned = utrNumber.trim()
    if (cleaned.length < 8) return
    setBusy(true)
    await new Promise((r) => setTimeout(r, 600))
    // Merge from storage + component state so we never drop templateId / price when React state is stale
    const stored = readCreatorFlow() || {}
    const next = {
      ...stored,
      ...flow,
      checkoutPaid: true,
      utrNumber: cleaned,
      checkoutAt: new Date().toISOString(),
    }
    if (!next.templateId && stored.templateId) next.templateId = stored.templateId
    writeCreatorFlow(next)
    setFlow(next)
    setDone(true)
    setBusy(false)
    nav('/register', {
      state: { utrFromCheckout: cleaned, checkoutAt: next.checkoutAt },
    })
  }

  if (!flow?.templateId) {
    return null
  }

  return (
    <MarketingBackground>
      <header className="border-b border-emerald-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="font-display text-xl font-bold text-slate-900">
            Biolink
          </Link>
          <Link to="/get-started" className="text-sm font-semibold text-emerald-800 hover:underline">
            ← Back to templates
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 py-14 sm:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Step 2</p>
        <h1 className="mt-3 text-center font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">Checkout</h1>
        <p className="mt-3 text-center text-slate-600">Confirm your template and complete the demo purchase.</p>

        <div
          className="scene-perspective mx-auto mt-10"
          style={{ perspective: '900px' }}
        >
          <div
            className="rounded-3xl border-2 border-emerald-100 bg-white p-6 shadow-[0_24px_60px_-12px_rgba(5,150,105,0.2)]"
            style={{
              transform: 'rotateX(4deg) translateZ(0)',
              transformStyle: 'preserve-3d',
            }}
          >
            <h2 className="font-display text-lg font-bold text-slate-900">Order summary</h2>
            <ul className="mt-4 space-y-3 border-t border-emerald-50 pt-4 text-sm">
              <li className="flex justify-between text-slate-700">
                <span>Template · {flow.templateName || 'Selected'}</span>
                <span className="font-semibold">${price}</span>
              </li>
              <li className="flex justify-between text-slate-600">
                <span>Platform access</span>
                <span className="font-semibold text-emerald-700">Included</span>
              </li>
              <li className="flex justify-between border-t border-emerald-100 pt-3 font-display text-base font-bold text-slate-900">
                <span>Total (demo)</span>
                <span>${price}</span>
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Scan & Pay</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-emerald-200 bg-white p-3">
                <img src={upiQrUrl} alt="Payment scanner QR" className="mx-auto h-56 w-56 rounded-lg object-cover" />
              </div>
              <p className="mt-3 text-xs text-slate-600">
                After payment, enter the UTR number below. Super Admin will verify this UTR and then approve + send credentials.
              </p>
              <label className="mt-3 block text-xs font-semibold text-slate-700">UTR number</label>
              <input
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.replace(/\s+/g, ''))}
                placeholder="e.g. 123456789012"
                className="mt-1 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {done ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center text-sm text-emerald-900">
                <p className="font-semibold">You&apos;re all set.</p>
                <p className="mt-2 text-emerald-800/90">Next, create your account so we can attach this template.</p>
                <Link
                  to="/register"
                  className="mt-4 inline-flex w-full justify-center rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Get started — Register
                </Link>
              </div>
            ) : (
              <button
                type="button"
                disabled={busy}
                onClick={completeCheckout}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-105 disabled:opacity-60"
              >
                {busy ? 'Processing…' : 'I paid - Continue to register'}
              </button>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          No payment processor connected — this simulates a successful checkout for your product demo.
        </p>
      </main>
    </MarketingBackground>
  )
}
