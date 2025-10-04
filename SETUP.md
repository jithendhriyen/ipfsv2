# IPFS++ Setup Guide

## Database Configuration Issue

The user data is not storing because the Supabase database is not properly configured. Here's how to fix it:

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

### 2. Get Supabase Credentials

1. In your Supabase dashboard, go to **Settings > API**
2. Copy your **Project URL** and **anon public** key

### 3. Create Environment File

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Replace the values with your actual Supabase credentials.

### 4. Create Database Tables

Run these SQL scripts in your Supabase SQL Editor:

#### Script 1: Create Profiles Table
```sql
-- Enable extension for UUIDs if needed
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  website text,
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- Read own profile
create policy "Profiles are viewable by owner"
on public.profiles
for select
to authenticated
using (id = auth.uid());

-- Upsert/update own profile
create policy "Profiles are updatable by owner"
on public.profiles
for update
to authenticated
using (id = auth.uid());

create policy "Profiles are insertable by owner"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());
```

#### Script 2: Create Saved Items Table
```sql
create extension if not exists pgcrypto;

create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cid text not null,
  title text,
  created_at timestamp with time zone default now(),
  unique (user_id, cid)
);

alter table public.saved_items enable row level security;

-- Only the owner can see their items
create policy "Saved items are viewable by owner"
on public.saved_items
for select
to authenticated
using (user_id = auth.uid());

-- Only the owner can insert their items
create policy "Saved items are insertable by owner"
on public.saved_items
for insert
to authenticated
with check (user_id = auth.uid());

-- Only the owner can delete their items
create policy "Saved items are deletable by owner"
on public.saved_items
for delete
to authenticated
using (user_id = auth.uid());
```

### 5. Test the Application

1. Restart your development server: `npm run dev`
2. Try to save a profile or add a saved item
3. Check the browser console for any errors

### Common Issues

- **"Failed to save" errors**: Check if Supabase credentials are correct
- **Authentication errors**: Make sure you're logged in
- **Database errors**: Verify the SQL scripts were run successfully

### Debugging

Open browser developer tools and check the Console tab for any error messages when trying to save data.
