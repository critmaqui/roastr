import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Some features may not work properly.');
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey
    }
  }
}) : null;

// Table types
export type User = {
  id: string;
  spotify_id: string;
  display_name: string;
  created_at: string;
};

export type Playlist = {
  id: string;
  spotify_id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export type Roast = {
  id: string;
  playlist_id: string;
  roast_text: string;
  score: number;
  shares: number;
  created_at: string;
};