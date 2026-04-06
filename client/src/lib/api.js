import axios from 'axios'

const defaultBase = 'https://biolink-5e35.onrender.com'
const rawBase = import.meta.env.VITE_API_BASE || defaultBase
const normalizedBase =
  typeof rawBase === 'string' ? rawBase.replace(/\/$/, '').replace(/\/api$/, '') : defaultBase

const api = axios.create({
  baseURL: `${normalizedBase}/api`,
  headers: { 'Content-Type': 'application/json' },
})

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export default api
