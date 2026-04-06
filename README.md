# 📸 MemoryPocket

**🇹🇷 Türkçe** | [🇬🇧 English](#-english)

---

## 🇹🇷 Türkçe

### Etkinliğinin tüm anları, bir kutuda.

MemoryPocket, düğün, doğum günü, mezuniyet gibi özel etkinliklerde herkesin çektiği fotoğraf ve videoları tek bir paylaşımlı galeride toplar. Uygulama indirmeye gerek yok — sadece QR okut veya kodu gir, yükle, indir.

### 🚀 Canlı Uygulama

**[memorypocket.vercel.app](https://memorypocket.vercel.app)**

---

### ✨ Özellikler

- **📷 Fotoğraf & Video Yükleme** — Orijinal kalitede, sıkıştırma olmadan
- **⚡ Canlı Senkron** — Birisi yüklediği anda herkesin ekranında görünür
- **⬇️ Esnek İndirme** — Tek tek, seçerek veya tümünü indir; orijinal kalite veya sıkıştırılmış seçeneği
- **🗑️ Kendi Medyasını Sil** — Yanlış yükleme olursa sadece kendi medyasını silebilirsin
- **📤 Kolay Paylaşım** — Etkinlik kodunu veya QR kodu misafirlerle paylaş
- **⏱️ Otomatik Temizlik** — Medya ve etkinlik 72 saat sonra otomatik silinir, storage şişmez
- **🔒 Gizlilik** — Etkinliğe sadece kod veya QR ile erişilir, herkes göremez
- **🌐 Uygulama Gereksiz** — Tarayıcıdan direkt kullanılır, iOS & Android uyumlu
- **🇹🇷 Türkçe / 🇬🇧 English** — Dil desteği

---

### 🛠️ Teknolojiler

| Katman   | Teknoloji                                                       |
| -------- | --------------------------------------------------------------- |
| Frontend | Vanilla HTML, CSS, JavaScript                                   |
| Backend  | [Supabase](https://supabase.com) (PostgreSQL + Storage + Realtime) |
| Deploy   | [Vercel](https://vercel.com)                                       |
| QR Kod   | [QR Server API](https://goqr.me/api/)                              |

---

### 📁 Dosya Yapısı

```
memorybox/
├── index.html        # Ana HTML yapısı
├── style.css         # Tüm stiller
├── script.js         # Uygulama mantığı + Supabase entegrasyonu
└── README.md
```

---

### 🚦 Nasıl Çalışır?

1. **Etkinlik Oluştur** → Etkinlik adını ve türünü seç, kod otomatik oluşturulur
2. **Kodu Paylaş** → QR veya kod ile misafirleri davet et
3. **Herkes Yükler** → Kendi telefonundan fotoğraf ve video yükler
4. **Herkes İndirir** → İstediğini seçerek ya da tümünü indirir
5. **72 Saat Sonra** → Her şey otomatik silinir

---

### ⚙️ Kurulum (Local)

```bash
# Repo'yu klonla
git clone https://github.com/KULLANICI_ADIN/memorybox.git
cd memorybox

# Live Server ile aç (VS Code extension)
# veya:
npx serve .
```

Supabase kurulumu için `supabase-setup.sql` dosyasını Supabase SQL Editor'da çalıştır.

---

### 🗺️ Yol Haritası

- [ ] Etkinlik süresi uzatma (ücretli — 24 saat +$10, 36 saat +$12.99)
- [ ] Stripe ödeme entegrasyonu
- [ ] PWA desteği (ana ekrana ekle)
- [ ] Fotoğraf filtreleri
- [ ] Etkinlik şifresi / erişim kısıtlaması

---

---

## 🇬🇧 English

### Every moment from your event, in one box.

MemoryPocket is a shared photo and video gallery for special events — weddings, birthdays, graduations and more. No app download needed. Just scan the QR or enter the code, upload and download.

### 🚀 Live App

**[memorypocket.vercel.app](https://memorypocket.vercel.app)**

---

### ✨ Features

- **📷 Photo & Video Upload** — Original quality, zero compression
- **⚡ Live Sync** — Appears on everyone's screen the moment someone uploads
- **⬇️ Flexible Download** — Single, selected or all at once; original or compressed
- **🗑️ Delete Your Own Media** — Made a mistake? Delete only your own uploads
- **📤 Easy Sharing** — Share event code or QR with guests
- **⏱️ Auto Cleanup** — Media and event auto-deleted after 72 hours, no storage bloat
- **🔒 Private** — Only accessible via code or QR, not publicly listed
- **🌐 No App Needed** — Works directly from the browser, iOS & Android compatible
- **🇹🇷 Turkish / 🇬🇧 English** — Language support

---

### 🛠️ Tech Stack

| Layer    | Technology                                                      |
| -------- | --------------------------------------------------------------- |
| Frontend | Vanilla HTML, CSS, JavaScript                                   |
| Backend  | [Supabase](https://supabase.com) (PostgreSQL + Storage + Realtime) |
| Deploy   | [Vercel](https://vercel.com)                                       |
| QR Code  | [QR Server API](https://goqr.me/api/)                              |

---

### 📁 File Structure

```
memorybox/
├── index.html        # Main HTML structure
├── style.css         # All styles
├── script.js         # App logic + Supabase integration
└── README.md
```

---

### 🚦 How It Works

1. **Create Event** → Choose event name and type, code is auto-generated
2. **Share Code** → Invite guests via QR or event code
3. **Everyone Uploads** → Each guest uploads from their own phone
4. **Everyone Downloads** → Pick and choose or download everything
5. **After 72 Hours** → Everything is automatically deleted

---

### ⚙️ Local Setup

```bash
# Clone the repo
git clone https://github.com/KULLANICI_ADIN/memorybox.git
cd memorybox

# Open with Live Server (VS Code extension)
# or:
npx serve .
```

Run `supabase-setup.sql` in your Supabase SQL Editor to set up the database.

---

### 🗺️ Roadmap

- [ ] Event duration extension (paid — 24hrs +$10, 36hrs +$12.99)
- [ ] Stripe payment integration
- [ ] PWA support (add to home screen)
- [ ] Photo filters
- [ ] Event password / access restriction

---

### 📄 License

© 2025 Günal Hıncal. All rights reserved.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/GunalHincal">Günal Hıncal</a>
</div>
