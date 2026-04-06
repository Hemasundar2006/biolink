import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Loading…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role === 'super_admin' && user.role !== 'super_admin') {
    return <Navigate to="/creator" replace />
  }

  if (role === 'creator' && user.role !== 'creator') {
    return <Navigate to="/super" replace />
  }

  return children
}
