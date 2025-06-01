# roastr
# 🧠 Cursor Project Brief – Roastr

**Roastr** is a fun, Gen Z–targeted SaaS app that lets users connect their Spotify account, select a playlist, and receive a brutally honest AI-generated roast about their music taste.

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/critmaqui/roastr.git
   cd roastr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - See [SETUP.md](./SETUP.md) for detailed instructions on getting API keys
   - Required variables:
     ```env
     VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
     VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
     VITE_OPENAI_API_KEY=your_openai_api_key
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open http://127.0.0.1:5173**
   
   ⚠️ **Important**: Do NOT use `http://localhost:5173` - Spotify no longer allows localhost in redirect URIs!

---

## 🧩 Core Features

1. **Spotify OAuth2 Login**
   - Uses Authorization Code Flow
   - User is redirected back to `/callback` with access_token
   - Fetches user playlists via Spotify Web API

2. **Roast Generator (OpenAI GPT-4)**
   - Sends playlist's track names to OpenAI API
   - Receives 1 roast paragraph
   - Displays roast dynamically in UI
   - Optionally stores roast in Supabase

3. **CMS / Storage (Supabase)**
   - Table: `roasts`
     - `id`, `playlist_name`, `tracks[]`, `roast`, `created_at`
   - Used for saving roast history and leaderboard

---

## 🧑‍💻 Frontend Tech Stack

- ⚡ **Bolt.dev** with Vite, React, TypeScript
- 🎨 TailwindCSS for styling
- 🧠 Anton font (bold editorial aesthetic)
- Responsive layout (Framer-inspired hero → features → pricing → CTA → footer)

---

## ⚙️ API Endpoints

- `POST /api/generate-roast`
  - Receives `{ playlistName, tracks[] }`
  - Returns `{ roast }`
  - Calls OpenAI and inserts into Supabase

- `GET /api/get-playlists`
  - Requires Spotify access_token
  - Returns playlists

- `GET /api/get-roasts` *(optional)*
  - Returns roast history from Supabase

---

## 🔥 Design Brief

- Bold black/white color scheme, brutalist vibe
- Anton font for hero H1
- Animated CTA buttons
- Fun, meme-friendly tone in roasts and microcopy

---

## 🧪 Cursor Dev Goals

- Implement route protection via token check
- Write a type-safe Supabase client wrapper
- Animate roast generation with a typewriter effect
- Optional: add serverless cron to auto-roast top tracks weekly

---

## 🚧 TODOs for Cursor

- [ ] Secure and refresh Spotify tokens
- [ ] Validate track data and sanitize inputs
- [ ] Add fallback if OpenAI API fails
- [ ] Implement "Share Roast" to clipboard or social


[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/critmaqui/roastr)