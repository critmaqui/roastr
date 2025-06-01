# Roastr Setup Guide

## Environment Variables Setup

1. **Create a `.env` file** in the root directory of the project (same level as `package.json`)

2. **Add the following environment variables:**

```env
# Spotify API Credentials (REQUIRED)
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# For local development with Netlify CLI, also add (without VITE_ prefix):
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
OPENAI_API_KEY=your_openai_api_key_here

# OpenAI API Key (REQUIRED for roast generation)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Supabase (OPTIONAL - for database features)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_KEY=your_supabase_service_key_here

# Google Analytics (OPTIONAL)
VITE_GA_ID=your_google_analytics_id_here
```

## Getting Spotify Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - App name: `Roastr`
   - App description: `AI-powered playlist roasting`
   - Redirect URI: **IMPORTANT - Use IP address, not localhost!**
     - For development: `http://127.0.0.1:5173/callback`
     - If using different ports, add multiple URIs:
       - `http://127.0.0.1:5173/callback`
       - `http://127.0.0.1:5174/callback`
       - `http://127.0.0.1:5175/callback`
       - `http://127.0.0.1:5176/callback`
       - `http://127.0.0.1:5177/callback`
   - Check "Web API" under APIs used
5. Click "Save"
6. Copy your `Client ID` and `Client Secret`
7. Add them to your `.env` file

## ⚠️ Important: Spotify Redirect URI Requirements

As of April 2025, Spotify enforces these requirements:
- **`localhost` is NOT allowed** - Use `127.0.0.1` instead
- Use HTTPS for production (HTTP is only allowed for loopback addresses)
- The redirect URI must match EXACTLY what you register

**Correct Examples:**
- ✅ `http://127.0.0.1:5173/callback`
- ✅ `http://[::1]:5173/callback` (IPv6)
- ✅ `https://your-domain.com/callback` (production)

**Wrong Examples:**
- ❌ `http://localhost:5173/callback` (localhost not allowed)
- ❌ `http://127.0.0.1:5173` (missing /callback)
- ❌ `http://127.0.0.1:5173/callback/` (extra slash)

## Getting OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy and add it to your `.env` file

## Important Notes

- **Never commit your `.env` file to Git!** It's already in `.gitignore`
- The `.env` file should be in the root directory, not in `src/`
- All Vite environment variables must start with `VITE_`
- Restart the development server after changing `.env` file
- **Access your app via `http://127.0.0.1:5173` instead of `http://localhost:5173`**

## Running Locally with Netlify Functions

Since this app uses Netlify Functions for the backend, you need to run it with Netlify CLI:

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Run the development server**:
   ```bash
   netlify dev
   ```
   This will start both the Vite dev server and the Netlify Functions.

3. **Access the app** at `http://127.0.0.1:8888` (Netlify CLI default port)

**Note**: The serverless functions (token exchange, roast generation) require the environment variables without the `VITE_` prefix.

## Troubleshooting

If you see an error like "Invalid Client ID":
1. Check that your `.env` file exists in the root directory
2. Make sure there are no quotes around the values in `.env`
3. Ensure there are no spaces around the `=` sign
4. Restart the development server: `npm run dev`

Example of correct `.env` format:
```
VITE_SPOTIFY_CLIENT_ID=1234567890abcdef
```

NOT:
```
VITE_SPOTIFY_CLIENT_ID="1234567890abcdef"
VITE_SPOTIFY_CLIENT_ID = 1234567890abcdef
``` 