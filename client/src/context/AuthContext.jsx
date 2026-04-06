import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import api, { setAuthToken } from '../lib/api.js'

const AuthContext = createContext(undefined)

const STORAGE_KEY = 'biolink_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [loading, setLoading] = useState(true)

  const refreshMe = useCallback(async () => {
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    setAuthToken(token)
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.user)
    } catch {
      setUser(null)
      setToken(null)
      localStorage.removeItem(STORAGE_KEY)
      setAuthToken(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void refreshMe()
  }, [refreshMe])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    localStorage.setItem(STORAGE_KEY, data.token)
    setAuthToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
    setAuthToken(null)
  }, [])

  const value = useMemo(
    () => ({ user, token, loading, login, logout, refreshMe }),
    [user, token, loading, login, logout, refreshMe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
