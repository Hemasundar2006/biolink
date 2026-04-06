import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { PublicSiteGuard } from './components/PublicSiteGuard.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import GetStartedPage from './pages/GetStartedPage.jsx'
import TemplatePreviewPage from './pages/TemplatePreviewPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import PublicBio from './pages/PublicBio.jsx'
import SuperAdminPage from './pages/SuperAdminPage.jsx'
import SuperTemplatePreviewPage from './pages/SuperTemplatePreviewPage.jsx'
import CreatorDashboard from './pages/CreatorDashboard.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicSiteGuard>
                <Landing />
              </PublicSiteGuard>
            }
          />
          <Route
            path="/get-started"
            element={
              <PublicSiteGuard>
                <GetStartedPage />
              </PublicSiteGuard>
            }
          />
          <Route
            path="/get-started/preview/:templateId"
            element={
              <PublicSiteGuard>
                <TemplatePreviewPage />
              </PublicSiteGuard>
            }
          />
          <Route
            path="/checkout"
            element={
              <PublicSiteGuard>
                <CheckoutPage />
              </PublicSiteGuard>
            }
          />
          <Route
            path="/login"
            element={
              <PublicSiteGuard>
                <Login />
              </PublicSiteGuard>
            }
          />
          <Route
            path="/register"
            element={
              <PublicSiteGuard>
                <Register />
              </PublicSiteGuard>
            }
          />
          <Route
            path="/super"
            element={
              <ProtectedRoute role="super_admin">
                <SuperAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super/templates/:templateId/preview"
            element={
              <ProtectedRoute role="super_admin">
                <SuperTemplatePreviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creator"
            element={
              <ProtectedRoute role="creator">
                <CreatorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/:slug"
            element={
              <PublicSiteGuard>
                <PublicBio />
              </PublicSiteGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
