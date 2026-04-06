import { useEffect, useState } from 'react'
import api from '../lib/api.js'

export function PublicSiteGuard({ children }) {
  const [maintenance, setMaintenance] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get('/public/config')
        if (!cancelled) setMaintenance(Boolean(data?.maintenanceMode))
      } catch {
        if (!cancelled) setMaintenance(false)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Loading...
      </div>
    )
  }

  if (maintenance) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center">
        <div className="max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Maintenance mode</p>
          <h1 className="mt-3 text-2xl font-bold text-white">Website is under maintenance</h1>
          <p className="mt-2 text-sm text-slate-300">
            Public pages are temporarily unavailable. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  return children
}

