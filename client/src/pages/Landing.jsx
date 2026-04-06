import { Link } from 'react-router-dom'
import { MarketingBackground } from '../components/marketing/MarketingBackground.jsx'
import { Hero3DShowcase } from '../components/marketing/Hero3DShowcase.jsx'
import { TemplatesScroll3D } from '../components/marketing/TemplatesScroll3D.jsx'

const features = [
  {
    title: 'Designer templates',
    body: 'Twenty-four polished layouts with live preview. Swap looks anytime — your public link stays the same.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'One link everywhere',
    body: 'Short paths like /A7B8C9 — perfect for bios and campaigns. Visitors never need an account.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: 'Built for teams',
    body: 'Approvals, subscriptions, and platform settings stay organized. Creators get a calm workspace.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const steps = [
  { n: '01', title: 'Pick a template', desc: 'Browse in 3D, select the design you want for your public page.' },
  { n: '02', title: 'Checkout', desc: 'Complete the demo checkout to reserve your template choice.' },
  { n: '03', title: 'Register & go live', desc: 'Apply, get approved, then edit links — updates appear instantly.' },
]

export default function Landing() {
  return (
    <MarketingBackground>
      <header className="sticky top-0 z-20 border-b border-emerald-100/90 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-slate-900">
            Biolink
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#templates"
              className="rounded-full px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 sm:px-4"
            >
              Templates
            </a>
            <Link
              to="/login"
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 sm:px-4"
            >
              Log in
            </Link>
            <Link
              to="/get-started"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:brightness-105 sm:px-5"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:pt-16">
          <div className="max-w-xl lg:pt-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Link-in-bio, elevated
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.1rem]">
              Your brand,
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                beautifully simple.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Biolink gives creators a gorgeous public page, a deep template library, and tools that feel as polished as
              the apps you already love.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
              >
                Get started
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                View templates
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-emerald-100 pt-10">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Templates</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-slate-900">24+</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live preview</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-slate-900">Yes</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your URL</dt>
                <dd className="mt-1 font-display text-2xl font-bold text-slate-900">Unique</dd>
              </div>
            </dl>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <Hero3DShowcase />
          </div>
        </section>

        <TemplatesScroll3D />

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Everything you need</h2>
            <p className="mt-4 text-slate-600">
              Clear typography, soft depth, and motion that supports your story — not distracting from it.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="tilt-card group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm"
              >
                <div className="mb-5 inline-flex rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-emerald-700">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.body}</p>
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-100/60 blur-2xl transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-emerald-100 bg-emerald-50/40 py-20 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-[90px]" />
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="text-center font-display text-3xl font-bold text-slate-900 sm:text-4xl">How Biolink works</h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="relative text-center md:text-left">
                  <span className="font-display text-5xl font-extrabold text-emerald-200">{s.n}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-10 sm:p-14">
            <div className="absolute inset-0 hero-shimmer opacity-50" />
            <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Ready to own your link?</h2>
                <p className="mt-2 max-w-lg text-slate-600">
                  Choose a template, check out, register — then share a page that matches your brand.
                </p>
              </div>
              <Link
                to="/get-started"
                className="shrink-0 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-100 bg-white/60 py-10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-slate-500 sm:flex-row sm:px-8">
          <span className="font-display font-semibold text-slate-800">Biolink</span>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#templates" className="font-medium text-emerald-800 hover:underline">
              Templates
            </a>
            <Link to="/login" className="hover:text-slate-900">
              Log in
            </Link>
            <Link to="/get-started" className="hover:text-slate-900">
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </MarketingBackground>
  )
}
