import axios from 'axios'

const rawBase = import.meta.env.VITE_API_BASE
const baseURL = typeof rawBase === 'string' ? rawBase.replace(/\/$/, '') : ''

const api = axios.create({
  baseURL: baseURL ? `${baseURL}/api` : '/api',
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
