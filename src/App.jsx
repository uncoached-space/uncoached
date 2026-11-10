import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SiteCopyProvider } from './context/SiteCopyContext'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AuthConfirmPage from './pages/AuthConfirmPage'
import PricingPage from './pages/PricingPage'
// import PractitionersPage from './pages/PractitionersPage'
import GiftPage from './pages/GiftPage'
import RedeemPage from './pages/RedeemPage'
import PartnershipPage from './pages/PartnershipPage'
import PartnershipApplyPage from './pages/PartnershipApplyPage'
import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import BillingPage from './pages/legal/BillingPage'
import ScrollToTop from './components/ScrollToTop'
import StickyMobileCTA from './components/StickyMobileCTA'
import NotFoundPage from './pages/NotFoundPage'
import { Analytics } from '@vercel/analytics/react'
import ProtectedRoute from './components/ProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import AdminLayout from './components/AdminLayout'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminAudioFamiliesPage from './pages/admin/AdminAudioFamiliesPage'
import AdminAudioBreathsPage from './pages/admin/AdminAudioBreathsPage'
import AdminGuidedShiftCategoriesPage from './pages/admin/AdminGuidedShiftCategoriesPage'
import AdminGuidedShiftsPage from './pages/admin/AdminGuidedShiftsPage'
import AdminPocketPromptCategoriesPage from './pages/admin/AdminPocketPromptCategoriesPage'
import AdminPocketPromptsPage from './pages/admin/AdminPocketPromptsPage'
import AdminClarityCardsPage from './pages/admin/AdminClarityCardsPage'
import AdminAffirmationCategoriesPage from './pages/admin/AdminAffirmationCategoriesPage'
import AdminAffirmationsPage from './pages/admin/AdminAffirmationsPage'
import AdminAfformationsPage from './pages/admin/AdminAfformationsPage'
import AdminVoiceNotesPage from './pages/admin/AdminVoiceNotesPage'
import AdminPractitionersPage from './pages/admin/AdminPractitionersPage'
import AdminSiteCopyPage from './pages/admin/AdminSiteCopyPage'
import AdminAgreementRecordsPage from './pages/admin/AdminAgreementRecordsPage'
import AdminBackupPage from './pages/admin/AdminBackupPage'

// Member Pages
import DashboardPage from './pages/member/DashboardPage'
import FieldPage from './pages/member/FieldPage'
import AudioBreathsPage from './pages/member/AudioBreathsPage'
import AudioBreathPlayerPage from './pages/member/AudioBreathPlayerPage'
import GuidedShiftsPage from './pages/member/GuidedShiftsPage'
import GuidedShiftPlayerPage from './pages/member/GuidedShiftPlayerPage'
import PocketPromptsPage from './pages/member/PocketPromptsPage'
import ClarityCardsPage from './pages/member/ClarityCardsPage'
import ClarityCardDetailPage from './pages/member/ClarityCardDetailPage'
import AfformationsPage from './pages/member/AfformationsPage'
import VoiceNotesPage from './pages/member/VoiceNotesPage'
import ProfilePage from './pages/member/ProfilePage'
import MemberBillingPage from './pages/member/BillingPage'

function App() {
  return (
    <AuthProvider>
      <SiteCopyProvider>
      <BrowserRouter>
        <ScrollToTop />
        <StickyMobileCTA />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/confirm" element={<AuthConfirmPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {/* Hidden while it holds sample profiles (Johanna, 10 Nov 2026): the
              address goes to the home page. To bring the page back, restore the
              import above, this route, and the menu link in Navbar.jsx:
              <Route path="/practitioners" element={<PractitionersPage />} /> */}
          <Route path="/practitioners" element={<Navigate to="/" replace />} />
          <Route path="/gift" element={<GiftPage />} />
          <Route path="/redeem" element={<RedeemPage />} />
          {/* Practitioner Partnership — intentionally not linked in the nav;
              Johanna shares this link directly with practitioners. */}
          <Route path="/partnership" element={<PartnershipPage />} />
          <Route path="/partnership/apply" element={<PartnershipApplyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/billing" element={<BillingPage />} />

          {/* Protected Routes (require auth) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireSubscription={true}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/field"
            element={
              <ProtectedRoute requireSubscription={true}>
                <FieldPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/audio-breaths"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AudioBreathsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/audio-breaths/:id"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AudioBreathPlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guided-shifts"
            element={
              <ProtectedRoute requireSubscription={true}>
                <GuidedShiftsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/guided-shifts/:id"
            element={
              <ProtectedRoute requireSubscription={true}>
                <GuidedShiftPlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/pocket-prompts"
            element={
              <ProtectedRoute requireSubscription={true}>
                <PocketPromptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/clarity-cards"
            element={
              <ProtectedRoute requireSubscription={true}>
                <ClarityCardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/clarity-cards/:id"
            element={
              <ProtectedRoute requireSubscription={true}>
                <ClarityCardDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/afformations"
            element={
              <ProtectedRoute requireSubscription={true}>
                <AfformationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/voice-notes"
            element={
              <ProtectedRoute requireSubscription={true}>
                <VoiceNotesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/billing"
            element={
              <ProtectedRoute>
                <MemberBillingPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="audio-families" element={<AdminAudioFamiliesPage />} />
            <Route path="audio-breaths" element={<AdminAudioBreathsPage />} />
            <Route path="guided-shift-categories" element={<AdminGuidedShiftCategoriesPage />} />
            <Route path="guided-shifts" element={<AdminGuidedShiftsPage />} />

            <Route path="pocket-prompt-categories" element={<AdminPocketPromptCategoriesPage />} />
            <Route path="pocket-prompts" element={<AdminPocketPromptsPage />} />

            <Route path="clarity-cards" element={<AdminClarityCardsPage />} />

            <Route path="affirmation-categories" element={<AdminAffirmationCategoriesPage />} />
            <Route path="affirmations" element={<AdminAffirmationsPage />} />
            <Route path="afformations" element={<AdminAfformationsPage />} />

            <Route path="voice-notes" element={<AdminVoiceNotesPage />} />

            <Route path="practitioners" element={<AdminPractitionersPage />} />
            <Route path="site-copy" element={<AdminSiteCopyPage />} />
            <Route path="agreement-records" element={<AdminAgreementRecordsPage />} />
            <Route path="backup" element={<AdminBackupPage />} />
          </Route>
          {/* 404 — any unknown URL */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
      </SiteCopyProvider>
    </AuthProvider>
  )
}

export default App
