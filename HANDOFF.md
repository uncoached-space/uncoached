# Project Handoff — Uncoached (React)

> Read this first. It tells you where the project lives, what it is, how it's wired together, and what state we're in right now. Then read `README.md` for setup details.

---

## 1. Where the project lives

**Main project folder (Windows path):**
```
C:\Users\boyev\.gemini\antigravity\scratch\uncoached-react
```

**Currently working in a git worktree (isolated branch workspace):**
```
C:\Users\boyev\.gemini\antigravity\scratch\uncoached-react\.claude\worktrees\hardcore-wilbur
```

- The worktree above is what the current Claude session has been editing.
- Branch in the worktree: `claude/hardcore-wilbur`
- Main branch: `main`
- GitHub remote: https://github.com/dexmart/uncoached.git

If you want to keep working in this worktree, `cd` into the worktree path. If you want a clean state, `cd` into the main project folder and check out `main`.

---

## 2. What this project is

**Uncoached** — a wellness / personal-development membership platform.

Members sign up, subscribe via Stripe, and get access to a member portal with tools:
- **Field** — entry dashboard
- **Audio Breaths** — guided breathing audio sessions
- **Guided Shifts** — multi-part audio series (15 series total, e.g. "Body Return", "Boundaries", "Identity Leap", "Pressure Release", etc.)
- **Pocket Prompts** — short text prompts; split into Free tier + Premium tier (Premium is behind a blurred paywall)
- **Clarity Cards** — visual cards with detail pages and PDF download
- **Afformations** — questions phrased as affirmations (note the spelling: "Afformations", with the "for" syllable italicized in the UI)
- **Voice Notes** — short audio messages

There's also a full **Admin CMS** at `/admin` for managing every content type (audio families, breaths, shift categories/shifts, prompt categories/prompts, clarity cards, affirmation categories/affirmations, voice notes).

---

## 3. Tech stack

### Frontend (root of repo)
- **React 19** + **Vite 7**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **React Router 7**
- **Supabase JS** (`@supabase/supabase-js`) — auth + database client
- **recharts** — admin dashboard charts
- **sharp**, **ffmpeg-static**, **pdfjs-dist**, **pdf-parse** — used for content processing scripts

### Backend (`server/` folder)
- **Node.js + Express**
- **Stripe** SDK — checkout sessions + webhooks
- **Supabase Admin SDK** (service role) — server-side DB ops
- **cors**, **dotenv**

### Data / Infra
- **Supabase** is the database + auth + storage provider. Schema is defined in the `.sql` files at the repo root (see section 6).
- **Stripe** handles all subscription billing (monthly / quarterly / biannual / annual price IDs in env vars).

---

## 4. Project structure

```
uncoached-react/
├── HANDOFF.md                 ← you are here
├── README.md                  ← setup instructions, env vars, scripts
├── package.json               ← frontend deps + scripts (dev, build, lint, preview)
├── vite.config.js
├── tailwind.config.js, postcss.config.js
├── .env.example, .env.local   ← frontend env (Vite vars)
│
├── public/
│   ├── images/                ← brand images, hero backgrounds, logo, field icons
│   └── (other static assets)
│
├── server/                    ← Express API server (separate package.json)
│   ├── package.json
│   ├── index.js               ← server entry
│   ├── supabaseAdmin.js       ← Supabase service-role client
│   ├── routes/
│   │   ├── stripe.js          ← Stripe checkout + webhook routes
│   │   └── audio.js           ← audio content routes
│   ├── .env.example, .env     ← backend env (Stripe secret, Supabase service key)
│
├── src/
│   ├── main.jsx, App.jsx      ← App.jsx defines ALL routes (public, member, admin)
│   ├── index.css, App.css
│   ├── lib/
│   │   └── supabase.js        ← Supabase browser client (anon key)
│   ├── context/
│   │   └── AuthContext.jsx    ← auth state, user profile, subscription status
│   ├── components/
│   │   ├── Navbar, Footer, HeroSection, TrustBar, ProtectedRoute, AdminProtectedRoute, AdminLayout
│   │   ├── Landing-page sections: ServicesSection, HowItWorksSection, DeeperWorkSection,
│   │   │     MeetFieldSection, IntegrationSection, SubscribeSection, GiftSection, TestimonialsSection
│   │   └── about/             ← About page sections (Hero, Why, Gap, Shift, Philosophy, Quote, Closing)
│   ├── pages/
│   │   ├── LandingPage, AboutPage, PricingPage, SignInPage, SignUpPage
│   │   ├── member/
│   │   │   ├── DashboardPage, FieldPage, ProfilePage
│   │   │   ├── AudioBreathsPage, AudioBreathPlayerPage
│   │   │   ├── GuidedShiftsPage, GuidedShiftPlayerPage
│   │   │   ├── PocketPromptsPage
│   │   │   ├── ClarityCardsPage, ClarityCardDetailPage
│   │   │   ├── AfformationsPage
│   │   │   └── VoiceNotesPage
│   │   └── admin/
│   │       ├── AdminDashboardPage
│   │       ├── AdminAudioFamiliesPage, AdminAudioBreathsPage
│   │       ├── AdminGuidedShiftCategoriesPage, AdminGuidedShiftsPage
│   │       ├── AdminPocketPromptCategoriesPage, AdminPocketPromptsPage
│   │       ├── AdminClarityCardsPage
│   │       ├── AdminAffirmationCategoriesPage, AdminAffirmationsPage
│   │       └── AdminVoiceNotesPage
│
└── *.sql                      ← Supabase schema + seed scripts (see section 6)
```

---

## 5. Routes (from `src/App.jsx`)

### Public
- `/` LandingPage
- `/about` AboutPage
- `/pricing` PricingPage
- `/signin` SignInPage
- `/signup` SignUpPage

### Member (require auth via `ProtectedRoute`; most also `requireSubscription={true}`)
- `/dashboard` — DashboardPage (auth only, no sub required)
- `/dashboard/field` — FieldPage
- `/dashboard/audio-breaths`, `/dashboard/audio-breaths/:id`
- `/dashboard/guided-shifts`, `/dashboard/guided-shifts/:id`
- `/dashboard/pocket-prompts` (auth only, no sub required — Premium tier is paywalled inside the page itself)
- `/dashboard/clarity-cards`, `/dashboard/clarity-cards/:id`
- `/dashboard/afformations`
- `/dashboard/voice-notes`
- `/dashboard/profile` (auth only, no sub required)

### Admin (require admin role via `AdminProtectedRoute`, wrapped in `AdminLayout`)
- `/admin` — AdminDashboardPage
- `/admin/audio-families`, `/admin/audio-breaths`
- `/admin/guided-shift-categories`, `/admin/guided-shifts`
- `/admin/pocket-prompt-categories`, `/admin/pocket-prompts`
- `/admin/clarity-cards`
- `/admin/affirmation-categories`, `/admin/affirmations`
- `/admin/voice-notes`

---

## 6. Database (Supabase) — SQL files at repo root

These are the SQL scripts that were run (or need to be run) against the Supabase project. They are NOT applied automatically — they're hand-run via the Supabase SQL editor when schema changes.

**Core schema / setup:**
- `supabase-setup.sql` — initial DB setup
- `setup-storage.sql`, `setup-avatars.sql`, `setup-clarity-cards-storage.sql`, `increase-storage-size.sql` — storage buckets + RLS
- `setup-guided-shifts.sql`, `setup-remaining-services.sql`, `setup-pocket-prompts-tiers.sql` — feature-specific tables
- `update-breaths-table.sql`, `schema-pocket-prompts-updates.sql` — schema migrations
- `make-johanna-admin.sql` — grants admin role to a user (Johanna is the product owner)

**Seed data (content):**
- `seed-families.sql`, `seed-breaths.sql` — audio breath families + breaths
- `seed-guided-shifts.sql` + 15 `seed-*-series.sql` files (one per shift series: between-sessions, body-return, boundaries, creativity-switch, downshift, energy-recalibration, identity-leap, inner-child-repair, loss-softening, morning-reentry, nervous-system-reset, night-unraveling, pattern-breaker, permission, pressure-release)
- `seed-pocket-prompts-10.sql`, `seed-pocket-prompts-real.sql`
- `seed-voice-notes.sql`
- `seed-remaining-services.sql`
- `add-field-integration-prompt.sql`

If you change the schema, write a new `.sql` script, commit it, and the user will run it in Supabase manually.

---

## 7. Environment variables

### Frontend (`.env.local` at repo root)
| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key |
| `VITE_API_URL` | Backend API URL (e.g. `http://localhost:3001`) |
| `VITE_STRIPE_MONTHLY_PRICE_ID` | Stripe price ID — monthly |
| `VITE_STRIPE_QUARTERLY_PRICE_ID` | Stripe price ID — quarterly |
| `VITE_STRIPE_BIANNUAL_PRICE_ID` | Stripe price ID — biannual |
| `VITE_STRIPE_ANNUAL_PRICE_ID` | Stripe price ID — annual |

### Backend (`server/.env`)
| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only, do NOT expose) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `FRONTEND_URL` | Frontend URL for redirects after checkout |
| `PORT` | Server port (default `3001`) |

`.env.example` files exist for both frontend and backend — copy them to `.env.local` / `server/.env` and fill in real values.

---

## 8. How to run locally

```bash
# Frontend (from repo root)
npm install
npm run dev          # Vite dev server on http://localhost:5173

# Backend (in a separate terminal)
cd server
npm install
npm run dev          # Express on http://localhost:3001
```

Other scripts:
- `npm run build` — production build → `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — ESLint

---

## 9. Current state of this branch

**Branch:** `claude/hardcore-wilbur` (in the worktree). NOT yet merged to `main`. NOT yet pushed.

**Uncommitted modifications (from `git status`):**
- `src/components/HeroSection.jsx`
- `src/pages/admin/AdminDashboardPage.jsx`
- `src/pages/member/AfformationsPage.jsx`
- `src/pages/member/AudioBreathsPage.jsx`
- `src/pages/member/ClarityCardsPage.jsx`
- `src/pages/member/DashboardPage.jsx`
- `src/pages/member/FieldPage.jsx`
- `src/pages/member/GuidedShiftsPage.jsx`
- `src/pages/member/PocketPromptsPage.jsx`
- `src/pages/member/VoiceNotesPage.jsx`

**Untracked files:**
- `.claude/launch.json`, `.claude/settings.local.json` — local Claude Code config
- `public/images/Uncoached Logo Primary Lora Font (3).png` — new logo asset

Before doing anything destructive (reset, checkout, branch switch), `git diff` these files first — they contain in-progress work.

### Recent commit history (most recent first)
```
66214e3 feat: redesign admin dashboard with glassmorphism, add recharts, seed content for all 15 guided shift series, bulk upload audio files, replace bg images with logo-free versions
50fa6d0 style: update Pocket Prompts hero section to use the branded background image and typography system
6ec4dd5 feat: split Pocket Prompts into Free and Premium tiers with a blurred subscription paywall
4515565 style: italicize the 'for' syllable in Afformations across the UI for emphasis
8740d87 feat: rename Affirmations to Afformations and fully redesign the member portal page with accordion layout and category filters
9a74d56 feat: redesign Clarity Card detail page to match new brand guidelines and add PDF download support
1bc72ad style: refine Clarity Cards layout based on feedback
eb61d5f feat: redesign Clarity Cards page to match new brand guidelines (linen, sage, gold, editorial typography)
ec8454d feat: add avatars storage bucket setup SQL with proper RLS policies for profile image uploads
59aeb16 fix: rewrite GuidedShiftPlayerPage to fix React error 60
```

The recent direction has been **brand redesign across member pages** (linen/sage/gold palette, editorial typography, glassmorphism on the admin dashboard) plus **CMS completion** for all content types.

---

## 10. Brand / design notes worth knowing

- **"Afformations"** — intentional spelling, not a typo. The "for" syllable is italicized in display copy.
- **Pocket Prompts** has two tiers: Free (visible) + Premium (blurred behind a subscription paywall inside the page).
- **Color palette** (used in recent redesigns): linen, sage, gold, editorial-style typography.
- **Background images**: there's been a deliberate move to logo-free background variants (see commit `66214e3`). New logo file `Uncoached Logo Primary Lora Font (3).png` is in `public/images/` (untracked).
- **Admin dashboard** uses glassmorphism styling + recharts for analytics.

---

## 11. Things to be careful about

- **SQL files are NOT auto-applied.** They're hand-run in the Supabase SQL editor. Read commit messages — there are several `fix(sql):` commits where past SQL had bugs (typos like `user_roles.user_id` vs `user_roles.id`, missing columns, legacy tables not dropped before recreating).
- **The worktree** at `.claude/worktrees/hardcore-wilbur` is a real git worktree of this repo. Don't delete it without confirming with the user — it has uncommitted work.
- **Stripe webhooks** need the secret in `server/.env`. Without it, subscription status won't sync to Supabase and `requireSubscription={true}` routes will lock users out.
- **Two `package.json`s** — frontend at root, backend in `server/`. Run `npm install` in both.
- **GuidedShiftPlayerPage** has had React-error-60 crashes from `dangerouslySetInnerHTML` mixed with children, and crashes from jsonb columns being returned as strings instead of arrays — be cautious when editing player pages (see commits `59aeb16`, `3cc98de`).

---

## 12. Pointers for the next Claude

- Start by reading [README.md](README.md) for setup, then [src/App.jsx](src/App.jsx) to understand routing, then [src/context/AuthContext.jsx](src/context/AuthContext.jsx) for the auth/subscription model.
- For content schema, open the relevant `setup-*.sql` and `seed-*.sql` files at the repo root.
- The user (`valentinaakpan@gmail.com`, working under git user `dexmart`) is the product owner. The admin user referenced in SQL is "Johanna" (see `make-johanna-admin.sql`).
- Today's date is **2026-06-06**.
- If you need to verify a UI change, use the preview tools (`preview_start`, `preview_screenshot`) — don't ask the user to check manually.
