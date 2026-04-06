-- ═══════════════════════════════════════════════════════
-- MemoryPocket — Supabase SQL Setup
-- Supabase SQL Editor'da bu dosyayı çalıştır
-- ═══════════════════════════════════════════════════════

-- 0) Gerekli extension
create extension if not exists pgcrypto;

-- 1) EVENTS tablosu
create table if not exists events (
  code       text primary key,
  name       text not null,
  host       text not null,
  type       int default 0,
  expires_at timestamptz default now() + interval '72 hours',
  created_at timestamptz default now()
);

-- 2) MEDIA tablosu
create table if not exists media (
  id           uuid default gen_random_uuid() primary key,
  event_code   text not null references events(code) on delete cascade,
  user_name    text not null,
  storage_path text not null unique,
  public_url   text not null,
  file_type    text not null default 'image', -- image | video
  thumb_h      int default 200,
  ts           bigint not null,
  expires_at   timestamptz not null,
  created_at   timestamptz default now()
);

-- 3) RLS aktif et
alter table events enable row level security;
alter table media enable row level security;

-- 4) Eski tablo policy'lerini temizle
drop policy if exists "mb_events_select" on events;
drop policy if exists "mb_events_insert" on events;
drop policy if exists "mb_events_delete" on events;

drop policy if exists "mb_media_select" on media;
drop policy if exists "mb_media_insert" on media;
drop policy if exists "mb_media_delete" on media;

-- 5) EVENTS tablo policy'leri
create policy "mb_events_select"
on events
for select
to public
using (true);

create policy "mb_events_insert"
on events
for insert
to public
with check (true);

create policy "mb_events_delete"
on events
for delete
to public
using (true);

-- 6) MEDIA tablo policy'leri
create policy "mb_media_select"
on media
for select
to public
using (expires_at > now());

create policy "mb_media_insert"
on media
for insert
to public
with check (true);

create policy "mb_media_delete"
on media
for delete
to public
using (true);

-- 7) Performans indexleri
create index if not exists idx_media_event_code on media(event_code);
create index if not exists idx_media_expires_at on media(expires_at);
create index if not exists idx_media_ts on media(ts desc);
create index if not exists idx_events_expires on events(expires_at);

-- 8) Temizleme fonksiyonu
create or replace function cleanup_expired()
returns int
language plpgsql
security definer
as $$
declare
  deleted_count int;
begin
  delete from media where expires_at < now();
  delete from events where expires_at < now();
  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

-- 9) Eski storage policy'lerini temizle
drop policy if exists "allow_public_uploads" on storage.objects;
drop policy if exists "allow_public_reads" on storage.objects;
drop policy if exists "allow_public_updates" on storage.objects;
drop policy if exists "allow_public_deletes" on storage.objects;

-- 10) STORAGE policy'leri
create policy "allow_public_uploads"
on storage.objects
for insert
to public
with check (bucket_id = 'memorypocket-media');

create policy "allow_public_reads"
on storage.objects
for select
to public
using (bucket_id = 'memorypocket-media');

create policy "allow_public_updates"
on storage.objects
for update
to public
using (bucket_id = 'memorypocket-media')
with check (bucket_id = 'memorypocket-media');

create policy "allow_public_deletes"
on storage.objects
for delete
to public
using (bucket_id = 'memorypocket-media');

-- 11) İsteğe bağlı: saatlik cron
-- Önce Supabase Dashboard > Database > Extensions > pg_cron aktif et
-- Sonra bunu ayrıca çalıştır:
-- select cron.schedule('mp-cleanup', '0 * * * *', 'select cleanup_expired()');

-- ═══════════════════════════════════════════════════════
-- DASHBOARD'DAN YAPILACAKLAR
-- ═══════════════════════════════════════════════════════

-- STORAGE BUCKET
-- Storage → New Bucket
-- Bucket adı: memorypocket-media
-- Public bucket: AÇIK

-- REALTIME
-- Database → Publications → supabase_realtime
-- "events" ve "media" tablolarını ekle / aktif et

-- TEST
-- select count(*) from events;
-- select count(*) from media;
-- select cleanup_expired();