import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api.js'
import { BioTemplate } from '../components/BioTemplate.jsx'

export default function PublicBio() {
  const { slug } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return undefined
    let cancelled = false
    ;(async () => {
      try {
        const { data: payload } = await api.get(`/public/${slug}`)
        if (!cancelled) setData(payload)
      } catch {
        if (!cancelled) setError('This page is not available.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-300">
        <div>
          <p className="text-lg font-medium text-white">Not found</p>
          <p className="mt-2 text-sm text-slate-400">{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading…
      </div>
    )
  }

  return <BioTemplate data={data} />
}
