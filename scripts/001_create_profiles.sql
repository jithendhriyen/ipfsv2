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
