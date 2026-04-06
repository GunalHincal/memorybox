# MemoryPocket — CLAUDE.md

## Proje Özeti

Vanilla HTML/CSS/JS SPA. Build adımı yok — statik dosyalar doğrudan Vercel'e deploy edilir.
Backend: Supabase (PostgreSQL + Storage + Realtime).

## Domain

```
APP_URL = 'https://memorypocket.vercel.app'
```

`APP_URL` sabiti `script.js` dosyasının en üstünde tanımlıdır. Tüm paylaşım linkleri, QR kodları ve realtime URL'leri bu sabitten üretilir. Vercel'de domain değişirse sadece bu satırı güncelle.

## Dosya Yapısı

```
index.html       — HTML iskeleti, CDN scriptleri
style.css        — Tüm stiller (CSS variables, animasyonlar)
script.js        — Tüm uygulama mantığı (state, render, Supabase)
supabase-setup.sql — DB şeması, RLS politikaları, temizleme fonksiyonu
```

## Mimari: State → Render Döngüsü

Tek bir global `S` nesnesi tüm state'i tutar. Her state değişikliğinde `render()` çağrılır:

```js
S.screen // aktif ekran: 'home' | 'create' | 'created' | 'join' | 'joinName' | 'gallery'
S.lang   // 'tr' | 'en'
S.photos // yüklenen medya listesi
S.lbIdx  // lightbox index (-1 = kapalı)
```

`render()` → `S.screen`'e göre ilgili `pg*()` fonksiyonunu çağırır → `#app` innerHTML'ini günceller → `bind()` ile event handler'ları yeniden bağlar.

**Önemli:** `bind()` her render'da çalışır. `document.getElementById('fileInput').onchange` ve `document.onkeydown` burada atanır.

## i18n Sistemi

Tüm kullanıcıya görünen metinler `L.tr` / `L.en` nesnelerinde tanımlanır, `t('key')` ile çekilir.

**Kural:** Hiçbir zaman JS'e hardcoded Türkçe/İngilizce string yazma. Her yeni metin her iki dilde `L` nesnesine eklenmelidir.

## Supabase

```js
const SUPABASE_URL = '...'
const SUPABASE_KEY = '...'  // publishable key — güvenli
const BUCKET = 'memorypocket-media'
const TTL_MS = 72 * 60 * 60 * 1000
```

- **events** tablosu: code (PK), name, host, type, expires_at
- **media** tablosu: id, event_code, user_name, storage_path, public_url, file_type, thumb_h, ts, expires_at
- Realtime: `gallery-{code}` channel üzerinden INSERT dinlenir
- `cleanup_expired()` SQL fonksiyonu + isteğe bağlı pg_cron ile 72 saat sonra otomatik temizlik

## Önemli Fonksiyonlar

| Fonksiyon         | Ne yapar                                                  |
| ----------------- | --------------------------------------------------------- |
| `render()`      | Tüm UI'yi yeniden çizer                                 |
| `nav(screen)`   | Ekran geçişi — gallery'de realtime kanalını yönetir |
| `loadGallery()` | Supabase'den medyaları çeker, realtime'ı başlatır    |
| `user()`        | Aktif kullanıcı adını döndürür (host veya guest)   |
| `t(key)`        | Aktif dile göre çeviri döndürür                      |
| `genCode()`     | Etkinlik tipi prefix + 4 rastgele karakter                |
| `bind()`        | fileInput ve klavye event'lerini bağlar                  |

## Önemli Kısıtlamalar

- **QR Scanner yok:** Join ekranındaki QR alanı şu an placeholder'dır (kamera simgesi), gerçek scanner entegrasyonu yapılmadı.
- **URL routing:** QR kodlar `?join=CODE` query param kullanır. Init'te otomatik parse edilir → `doJoin()` çağrılır. `/join/CODE` path routing yok, Vercel'de wildcard redirect gerekir.
- **Compression sadece görselde çalışır:** Video için "sıkıştırılmış" seçeneği gösterilmez, doğrudan original indirilir.
- **Supabase Realtime DELETE:** `payload.old` üzerinden `id` ile çalışır. Media tablosunda `REPLICA IDENTITY` varsayılan (PRIMARY KEY) olmalı — Supabase default'u budur.

## Kimlik Yönetimi

Kullanıcı isimleri `localStorage`'da `mb_saved_name` key'i altında saklanır. Uygulama açıldığında `S.hName` ve `S.uName` bu değerle başlatılır. Böylece aynı cihazda tekrar girişte isim otomatik doldurulur. İsim kaydı:

- `doCreate()` sonrası (host adı)
- `enterGuest()` çağrısında (misafir adı)

## Geliştirme

```bash
npx serve .   # local server — Live Server (VS Code) da çalışır
```

Build adımı yok. Değişiklikler Vercel'e otomatik deploy olur (git push ile).

## Roadmap

- [ ] Stripe ödeme entegrasyonu (etkinlik süresi uzatma)
- [ ] PWA desteği
- [ ] Gerçek QR scanner
- [ ] URL routing (`/join/{code}`)
