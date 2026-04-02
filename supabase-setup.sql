-- ═══════════════════════════════════════════════════════
-- MemoryBox — Supabase SQL Setup
-- Supabase SQL Editor'da bu dosyayı çalıştır
-- ═══════════════════════════════════════════════════════

-- 1. EVENTS tablosu
create table if not exists events (
  code       text primary key,
  name       text not null,
  host       text not null,
  type       int  default 0,
  expires_at timestamptz default now() + interval '72 hours',
  created_at timestamptz default now()
);

-- 2. MEDIA tablosu
create table if not exists media (
  id           uuid default gen_random_uuid() primary key,
  event_code   text not null references events(code) on delete cascade,
  user_name    text not null,
  storage_path text not null unique,
  public_url   text not null,
  file_type    text not null default 'image',  -- 'image' | 'video'
  thumb_h      int  default 200,
  ts           bigint not null,
  expires_at   timestamptz not null,
  created_at   timestamptz default now()
);

-- 3. RLS aktif et
alter table events enable row level security;
alter table media  enable row level security;

-- 4. RLS Politikaları
create policy "mb_events_select" on events
  for select using (true);

create policy "mb_events_insert" on events
  for insert with check (true);

create policy "mb_events_delete" on events
  for delete using (true);

create policy "mb_media_select" on media
  for select using (expires_at > now());

create policy "mb_media_insert" on media
  for insert with check (true);

create policy "mb_media_delete" on media
  for delete using (true);

-- 5. Performans için index
create index if not exists idx_media_event_code on media(event_code);
create index if not exists idx_media_expires_at on media(expires_at);
create index if not exists idx_media_ts         on media(ts desc);
create index if not exists idx_events_expires   on events(expires_at);

-- 6. Temizleme fonksiyonu (events + media birlikte)
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

-- 7. pg_cron ile saatlik temizleme (opsiyonel)
-- Supabase Dashboard > Database > Extensions > pg_cron aktif et
-- Sonra bu satırı çalıştır:
-- select cron.schedule('mb-cleanup', '0 * * * *', 'select cleanup_expired()');

-- ═══════════════════════════════════════════════════════
-- STORAGE BUCKET (Dashboard'dan yapılacak)
-- ═══════════════════════════════════════════════════════
-- Supabase Dashboard → Storage → New Bucket
-- Bucket adı : memorybox-media
-- Public bucket: AÇIK
-- Save

-- ═══════════════════════════════════════════════════════
-- STORAGE RLS (SQL Editor'da çalıştır)
-- ═══════════════════════════════════════════════════════
-- create policy "allow_public_uploads" on storage.objects
--   for insert with check (bucket_id = 'memorybox-media');
-- create policy "allow_public_reads" on storage.objects
--   for select using (bucket_id = 'memorybox-media');
-- create policy "allow_public_updates" on storage.objects
--   for update using (bucket_id = 'memorybox-media');
-- create policy "allow_public_deletes" on storage.objects
--   for delete using (bucket_id = 'memorybox-media');

-- ═══════════════════════════════════════════════════════
-- REALTIME (Dashboard'dan)
-- ═══════════════════════════════════════════════════════
-- Database → Publications → supabase_realtime
-- "media" ve "events" tablolarını ON yap

-- ═══════════════════════════════════════════════════════
-- TEST
-- ═══════════════════════════════════════════════════════
-- select count(*) from events;  -- 0
-- select count(*) from media;   -- 0
-- select cleanup_expired();     -- 0
