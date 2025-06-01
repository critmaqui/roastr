import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if we have valid credentials
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Log warning if Supabase is not configured
if (!supabase) {
  console.warn('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

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

// SQL to create tables:
/*
create table public.users (
  id uuid default gen_random_uuid() primary key,
  spotify_id text not null unique,
  display_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.playlists (
  id uuid default gen_random_uuid() primary key,
  spotify_id text not null unique,
  user_id uuid references public.users(id) not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.roasts (
  id uuid default gen_random_uuid() primary key,
  playlist_id uuid references public.playlists(id) not null,
  roast_text text not null,
  score integer default 0 not null,
  shares integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index users_spotify_id_idx on public.users(spotify_id);
create index playlists_spotify_id_idx on public.playlists(spotify_id);
create index playlists_user_id_idx on public.playlists(user_id);
create index roasts_playlist_id_idx on public.roasts(playlist_id);
create index roasts_score_idx on public.roasts(score desc);
create index roasts_created_at_idx on public.roasts(created_at desc);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.playlists enable row level security;
alter table public.roasts enable row level security;

-- Create policies
create policy "Users can read all users"
  on public.users for select
  to authenticated
  using (true);

create policy "Users can read all playlists"
  on public.playlists for select
  to authenticated
  using (true);

create policy "Users can insert their own playlists"
  on public.playlists for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can read all roasts"
  on public.roasts for select
  to authenticated
  using (true);

create policy "Users can create roasts for their playlists"
  on public.roasts for insert
  to authenticated
  with check (
    exists (
      select 1 from public.playlists
      where id = roasts.playlist_id
      and user_id = auth.uid()
    )
  );
*/