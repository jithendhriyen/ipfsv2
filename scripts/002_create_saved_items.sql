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
