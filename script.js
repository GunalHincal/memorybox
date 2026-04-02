/* ════════════════════════════════════════════
   SUPABASE CONFIG
════════════════════════════════════════════ */
const SUPABASE_URL = 'https://lqimqbexaarknuabmmjf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_TmfmDmudcmSPRSz0M6M70Q_4HL7jO4P';
const BUCKET = 'memorybox-media';
const TTL_MS = 72 * 60 * 60 * 1000; // 72 saat

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ════════════════════════════════════════════
   TRANSLATIONS
════════════════════════════════════════════ */
const L = {
  tr: {
    appName:'MemoryBox', tagline:'Etkinliğinin tüm anları, bir kutuda',
    createEvent:'Etkinlik Oluştur', joinEvent:'Etkinliğe Katıl',
    eventName:'Etkinlik Adı', eventNamePH:'ör: Ayşe & Mehmet Düğünü',
    hostName:'Adınız', hostNamePH:'Medyanız bu isimle görünecek',
    create:'Oluştur', enterCode:'Etkinlik kodunu girin veya QR okutun',
    codePH:'ör: DUGN-2024', join:'Katıl', back:'Geri',
    photos:'Medya', upload:'Fotoğraf / Video Yükle',
    shareCode:'Kodu Paylaş', qrCode:'QR Kodu Okut',
    noPhotos:'Henüz medya yok', noPhotosSub:'İlk fotoğraf veya videoyu siz paylaşın!',
    uploaded:'Yüklendi!', photosAdded:'dosya eklendi!', uploading:'Yükleniyor...',
    created:'Etkinlik oluşturuldu!', shareWith:'Bu kodu misafirlerle paylaşın',
    orScanQR:'veya QR kodu okutun', all:'Tümü', mine:'Benimkiler',
    fullQ:'Orijinal Kalite', liveS:'Canlı Senkron', noApp:'Uygulama Gereksiz',
    f1:'WhatsApp\'ta kaybolmayan, sıkıştırılmamış medya',
    f2:'Çektiğin an herkesin ekranında', f3:'QR okut, tarayıcıdan kullan',
    lang:'EN', justNow:'Az önce', minAgo:'dk önce', copied:'Kopyalandı!',
    types:['Düğün','Doğum Günü','Baby Shower','Nişan','Mezuniyet','Diğer'],
    selType:'Etkinlik Türü', pCount:'medya', gCount:'misafir',
    notFound:'Bu kodla etkinlik bulunamadı!', badCode:'Geçerli bir kod girin',
    yourName:'Adınız', yourNamePH:'Medyanız bu isimle görünecek',
    recent:'Son Etkinlikler', you:'Sen', or:'veya',
    select:'Seç', cancel:'İptal',
    dlSelected:'Seçilenleri İndir', dlAll:'Tümünü İndir', dlOne:'İndir',
    selected:'seçili', selectAll:'Tümünü Seç', downloading:'İndiriliyor...',
    loading:'Yükleniyor...', uploadErr:'Yükleme hatası!', connErr:'Bağlantı hatası!',
    dlDone:'İndirildi ✓', video:'Video',
    expires:'Medya ve etkinlik 72 saat içinde otomatik silinecek',
    uploadingN:'Yükleniyor: ',
    shareEvent:'Etkinliği Paylaş', deleteEvent:'Etkinliği Sil',
    deleteConfirm:'Bu etkinliği ve tüm medyayı silmek istediğinden emin misin?',
    deleted:'Etkinlik silindi!', shareText:'MemoryBox\'ta "{name}" etkinliğine katılmak için kod: {code}\n🔗 memorybox.vercel.app',
  },
  en: {
    appName:'MemoryBox', tagline:'Every moment from your event, in one box',
    createEvent:'Create Event', joinEvent:'Join Event',
    eventName:'Event Name', eventNamePH:'e.g: Sarah & John\'s Wedding',
    hostName:'Your Name', hostNamePH:'Your media will show this name',
    create:'Create', enterCode:'Enter event code or scan QR',
    codePH:'e.g: WDNG-2024', join:'Join', back:'Back',
    photos:'Media', upload:'Upload Photo / Video',
    shareCode:'Share Code', qrCode:'Scan QR Code',
    noPhotos:'No media yet', noPhotosSub:'Be the first to share a photo or video!',
    uploaded:'Uploaded!', photosAdded:'files added!', uploading:'Uploading...',
    created:'Event created!', shareWith:'Share this code with guests',
    orScanQR:'or scan the QR code', all:'All', mine:'Mine',
    fullQ:'Full Quality', liveS:'Live Sync', noApp:'No App Needed',
    f1:'Uncompressed media, no WhatsApp quality loss',
    f2:'Instant sync to everyone\'s screen', f3:'Scan QR, use from browser',
    lang:'TR', justNow:'Just now', minAgo:'min ago', copied:'Copied!',
    types:['Wedding','Birthday','Baby Shower','Engagement','Graduation','Other'],
    selType:'Event Type', pCount:'media', gCount:'guests',
    notFound:'No event found with this code!', badCode:'Enter a valid code',
    yourName:'Your Name', yourNamePH:'Your media will show this name',
    recent:'Recent Events', you:'You', or:'or',
    select:'Select', cancel:'Cancel',
    dlSelected:'Download Selected', dlAll:'Download All', dlOne:'Download',
    selected:'selected', selectAll:'Select All', downloading:'Downloading...',
    loading:'Loading...', uploadErr:'Upload error!', connErr:'Connection error!',
    dlDone:'Downloaded ✓', video:'Video',
    expires:'Media and event will be auto-deleted after 72 hours',
    uploadingN:'Uploading: ',
    shareEvent:'Share Event', deleteEvent:'Delete Event',
    deleteConfirm:'Are you sure you want to delete this event and all media?',
    deleted:'Event deleted!', shareText:'Join "{name}" on MemoryBox! Code: {code}\n🔗 memorybox.vercel.app',
  }
};

const ICONS = ['💒','🎂','👶','💍','🎓','🎉'];
const PREFIXES = ['DUGN','PRTY','BABY','NISN','MZNT','EVNT'];
const CCOLORS = ['#f97316','#ec4899','#8b5cf6','#10b981','#f59e0b','#3b82f6'];

/* ════════════════════════════════════════════
   STATE
════════════════════════════════════════════ */
let S = {
  lang: 'tr',
  screen: 'home',
  eName: '', hName: '', uName: '',
  eType: 0,
  code: '',
  jCode: '',
  filter: 'all',
  showQR: false,
  lbIdx: -1,
  role: '',
  selectMode: false,
  selected: new Set(),
  loading: false,
  photos: [],
  eventData: null,
  dlQueue: [],
  menuOpen: null, // event code of open three-dot menu
};

let realtimeChannel = null;

/* ════════════════════════════════════════════
   UTILITIES
════════════════════════════════════════════ */
function t(k) { return L[S.lang][k] || k; }
function user() { return S.role === 'host' ? (S.hName || 'Organizatör') : (S.uName || (S.lang === 'tr' ? 'Misafir' : 'Guest')); }
function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function ago(ts) { const m = Math.floor((Date.now() - ts) / 60000); return m < 1 ? t('justNow') : m + ' ' + t('minAgo'); }
function stg(i) { return `animation:fadeIn .5s ease ${i * .08}s both`; }

function genCode() {
  const p = PREFIXES[S.eType] || 'EVNT';
  const c = 'ABCDEFGHJKLMNPRSTUVWXYZ23456789';
  let r = '';
  for (let i = 0; i < 4; i++) r += c[Math.floor(Math.random() * c.length)];
  return p + '-' + r;
}

let _tt;
function toast(msg, err) {
  const el = document.getElementById('toast');
  el.textContent = (err ? '✕ ' : '✓ ') + msg;
  el.className = 'toast show ' + (err ? 'err' : 'ok');
  clearTimeout(_tt);
  _tt = setTimeout(() => el.className = 'toast', 2800);
}

// ── Gerçek QR Kod (Google Charts API) ──
function qrImg(val, sz) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${sz}x${sz}&data=${encodeURIComponent(val)}&bgcolor=ffffff&color=1a1a2e&qzone=2`;
  return `<img src="${url}" width="${sz}" height="${sz}" style="border-radius:12px;display:block" alt="QR">`;
}

/* ════════════════════════════════════════════
   LOCAL STORAGE
════════════════════════════════════════════ */
function getRecentEvents() {
  try { return JSON.parse(localStorage.getItem('mb_events') || '[]'); } catch { return []; }
}

function saveRecentEvent(ev, photoCount = 0) {
  const evs = getRecentEvents().filter(e => e.code !== ev.code);
  evs.unshift({
    code: ev.code,
    name: ev.name,
    type: ev.type || 0,
    photoCount,
    expiresAt: ev.expires_at || new Date(Date.now() + TTL_MS).toISOString(),
  });
  localStorage.setItem('mb_events', JSON.stringify(evs.slice(0, 10)));
}

function removeRecentEvent(code) {
  const evs = getRecentEvents().filter(e => e.code !== code);
  localStorage.setItem('mb_events', JSON.stringify(evs));
}

function getValidRecentEvents() {
  const now = new Date().toISOString();
  return getRecentEvents().filter(e => !e.expiresAt || e.expiresAt > now);
}

/* ════════════════════════════════════════════
   SUPABASE OPERATIONS
════════════════════════════════════════════ */
function mapMedia(row) {
  return {
    id: row.id,
    url: row.public_url,
    storagePath: row.storage_path,
    user: row.user_name,
    ts: row.ts,
    fileType: row.file_type || 'image',
    h: row.thumb_h || 200,
    expiresAt: row.expires_at,
    _new: false,
  };
}

async function loadGallery() {
  if (!S.eventData || S.eventData.code !== S.code) {
    const { data } = await sb.from('events').select('*').eq('code', S.code).single();
    S.eventData = data;
  }
  if (!S.eventData) return;

  const { data: mediaData, error } = await sb
    .from('media')
    .select('*')
    .eq('event_code', S.code)
    .gt('expires_at', new Date().toISOString())
    .order('ts', { ascending: false });

  if (!error) {
    S.photos = (mediaData || []).map(mapMedia);
    saveRecentEvent(S.eventData, S.photos.length);
  }

  subscribeToGallery();
}

function subscribeToGallery() {
  if (realtimeChannel) { sb.removeChannel(realtimeChannel); realtimeChannel = null; }

  realtimeChannel = sb.channel(`gallery-${S.code}`)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'media', filter: `event_code=eq.${S.code}` },
      (payload) => {
        const item = mapMedia(payload.new);
        item._new = true;
        if (!S.photos.find(p => p.id === item.id)) {
          S.photos.unshift(item);
          render();
          setTimeout(() => { const f = S.photos.find(p => p.id === item.id); if (f) f._new = false; }, 1500);
        }
      }
    ).subscribe();
}

function unsubscribeFromGallery() {
  if (realtimeChannel) { sb.removeChannel(realtimeChannel); realtimeChannel = null; }
}

async function getThumbHeight(file) {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { const r = img.naturalHeight / img.naturalWidth; URL.revokeObjectURL(url); resolve(Math.round(Math.min(Math.max(r * 180, 110), 300))); };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(190); };
    img.src = url;
  });
}

/* ════════════════════════════════════════════
   EVENT ACTIONS (Share / Delete)
════════════════════════════════════════════ */
async function shareEvent(code) {
  S.menuOpen = null;
  render();

  const ev = getRecentEvents().find(e => e.code === code);
  const name = ev?.name || code;
  const text = t('shareText').replace('{name}', name).replace('{code}', code);
  const url = `https://memorybox.vercel.app`;

  try {
    if (navigator.share) {
      await navigator.share({ title: 'MemoryBox — ' + name, text, url });
    } else {
      await navigator.clipboard.writeText(text + '\n' + url);
      toast(t('copied'));
    }
  } catch(e) {
    try { await navigator.clipboard.writeText(text); toast(t('copied')); } catch {}
  }
}

async function deleteEvent(code) {
  S.menuOpen = null;
  render();

  if (!confirm(t('deleteConfirm'))) return;

  // Tüm medya dosyalarını storage'dan sil
  const { data: mediaRows } = await sb.from('media').select('storage_path').eq('event_code', code);
  if (mediaRows?.length) {
    const paths = mediaRows.map(r => r.storage_path);
    await sb.storage.from(BUCKET).remove(paths);
  }

  // DB'den media kayıtlarını sil
  await sb.from('media').delete().eq('event_code', code);

  // Etkinliği sil
  await sb.from('events').delete().eq('code', code);

  // LocalStorage'dan kaldır
  removeRecentEvent(code);

  toast(t('deleted'));
  render();
}

function toggleMenu(code, e) {
  e.stopPropagation();
  S.menuOpen = S.menuOpen === code ? null : code;
  render();
}

/* ════════════════════════════════════════════
   UPLOAD PROGRESS UI
════════════════════════════════════════════ */
function showUploadBar(label, pct) {
  const bar = document.getElementById('uploadBar');
  const fill = document.getElementById('uploadFill');
  const lbl = document.getElementById('uploadLabel');
  if (!bar) return;
  bar.classList.remove('hidden');
  if (fill) fill.style.width = pct + '%';
  if (lbl) lbl.textContent = label;
}

function hideUploadBar() {
  const bar = document.getElementById('uploadBar');
  if (bar) bar.classList.add('hidden');
  const fill = document.getElementById('uploadFill');
  if (fill) fill.style.width = '0';
}

/* ════════════════════════════════════════════
   DOWNLOAD LOGIC
════════════════════════════════════════════ */
function showDlSheet(queue) {
  if (!queue.length) return;
  S.dlQueue = queue;
  const allImages = queue.every(i => i.fileType === 'image');
  const compOpt = document.getElementById('dlCompressedOpt');
  if (compOpt) compOpt.style.display = allImages ? '' : 'none';
  const title = document.getElementById('dlSheetTitle');
  if (title) title.textContent = queue.length > 1
    ? `${queue.length} ${t('pCount')} ${t('dlOne')}`
    : (queue[0].fileType === 'video' ? '🎬 Video İndir' : '📷 Fotoğraf İndir');
  document.getElementById('dlSheet').classList.remove('hidden');
}

function closeDlSheet() {
  S.dlQueue = [];
  document.getElementById('dlSheet').classList.add('hidden');
}

async function dlOriginal(url, filename) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('fetch failed');
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
  } catch {
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.target = '_blank'; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
}

async function dlCompressed(url, filename) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 1920;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX || h > MAX) { const r = Math.min(MAX/w, MAX/h); w = Math.round(w*r); h = Math.round(h*r); }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl; a.download = filename.replace(/\.[^.]+$/, '_compressed.jpg');
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
        resolve();
      }, 'image/jpeg', 0.78);
    };
    img.onerror = () => { dlOriginal(url, filename).then(resolve); };
    img.src = url + (url.includes('?') ? '&' : '?') + '_dl=1';
  });
}

async function confirmDownload(quality) {
  const queue = [...S.dlQueue];
  closeDlSheet();
  if (!queue.length) return;
  toast(t('downloading'));
  for (let i = 0; i < queue.length; i++) {
    if (i > 0) await new Promise(r => setTimeout(r, 400));
    const item = queue[i];
    if (quality === 'original' || item.fileType === 'video') await dlOriginal(item.url, item.filename);
    else await dlCompressed(item.url, item.filename);
  }
  toast(queue.length > 1 ? `${queue.length} ${t('pCount')} ${t('dlDone')}` : t('dlDone'));
  if (S.selectMode) exitSel();
}

/* ════════════════════════════════════════════
   DELETE MEDIA (kendi medyası)
════════════════════════════════════════════ */
async function deleteMedia(id) {
  const p = S.photos.find(ph => ph.id === id);
  if (!p || p.user !== user()) return;
  if (!confirm('Bu medyayı silmek istediğinden emin misin?')) return;
  await sb.storage.from(BUCKET).remove([p.storagePath]);
  await sb.from('media').delete().eq('id', id);
  S.photos = S.photos.filter(ph => ph.id !== id);
  if (S.lbIdx >= S.photos.length) S.lbIdx = S.photos.length - 1;
  toast('Silindi ✓');
  render();
}

function dlOne(idx) {
  const p = S.photos[idx];
  if (!p) return;
  const ext = p.fileType === 'video' ? '.mp4' : '.jpg';
  showDlSheet([{ url: p.url, filename: `memorybox_${S.code}_${idx + 1}${ext}`, fileType: p.fileType }]);
}

function dlSelected() {
  const items = S.photos.filter(p => S.selected.has(p.id)).map((p, i) => {
    const ext = p.fileType === 'video' ? '.mp4' : '.jpg';
    return { url: p.url, filename: `memorybox_${S.code}_sel_${i+1}${ext}`, fileType: p.fileType };
  });
  showDlSheet(items);
}

function dlAll() {
  const items = S.photos.map((p, i) => {
    const ext = p.fileType === 'video' ? '.mp4' : '.jpg';
    return { url: p.url, filename: `memorybox_${S.code}_${i+1}${ext}`, fileType: p.fileType };
  });
  showDlSheet(items);
}

/* ════════════════════════════════════════════
   RENDER ENGINE
════════════════════════════════════════════ */
function render() {
  document.getElementById('app').innerHTML = ({
    home: pgHome, create: pgCreate, created: pgCreated,
    join: pgJoin, joinName: pgJoinName, gallery: pgGallery,
  }[S.screen] || pgHome)();
  bind();
}

/* ── HOME ── */
function pgHome() {
  const evs = getValidRecentEvents();

  const recent = evs.length ? `
    <div style="margin-bottom:28px">
      <div class="label">${t('recent')}</div>
      ${evs.slice(0, 5).map(e => `
        <div class="ev-item" onclick="openEv('${esc(e.code)}')" style="position:relative">
          <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0">
            <span style="font-size:24px;flex-shrink:0">${ICONS[e.type || 0]}</span>
            <div style="min-width:0">
              <div style="font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(e.name)}</div>
              <div style="font-size:11px;color:var(--text-soft)">${e.code} · ${e.photoCount || 0} ${t('pCount')}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:4px;flex-shrink:0">
            <button class="ev-menu-btn" onclick="toggleMenu('${e.code}',event)" title="Seçenekler">⋯</button>
          </div>
          ${S.menuOpen === e.code ? `
            <div class="ev-menu" onclick="event.stopPropagation()">
              <div class="ev-menu-item" onclick="shareEvent('${e.code}')">📤 ${t('shareEvent')}</div>
              <div class="ev-menu-item ev-menu-del" onclick="deleteEvent('${e.code}')">🗑 ${t('deleteEvent')}</div>
            </div>` : ''}
        </div>`).join('')}
    </div>` : '';

  return `<div class="page" style="padding:0 24px;position:relative;z-index:1" onclick="S.menuOpen=null;render()">
    <div class="orb orb-1"></div><div class="orb orb-2"></div>
    <div style="display:flex;justify-content:flex-end;padding-top:20px;position:relative;z-index:2">
      <button class="btn-icon" onclick="S.lang=S.lang==='tr'?'en':'tr';render()" style="font-size:12px;font-weight:700;width:auto;padding:6px 14px">${t('lang')}</button>
    </div>
    <div style="text-align:center;padding:${evs.length ? 36 : 52}px 0 ${evs.length ? 32 : 48}px;position:relative;z-index:2">
      <div style="font-size:56px;margin-bottom:8px;animation:float 3s ease infinite;filter:drop-shadow(0 4px 24px rgba(249,115,22,.3))">📸</div>
      <h1 class="hero-title">${t('appName')}</h1>
      <p style="font-size:16px;color:var(--text-soft);line-height:1.5;max-width:280px;margin:0 auto">${t('tagline')}</p>
    </div>
    <div class="features">
      ${[{i:'💎',tt:t('fullQ'),d:t('f1')},{i:'⚡',tt:t('liveS'),d:t('f2')},{i:'🔗',tt:t('noApp'),d:t('f3')}].map((f,n)=>`
        <div class="fpill" style="${stg(n)}">
          <div style="font-size:24px;margin-bottom:6px">${f.i}</div>
          <div style="font-size:11px;font-weight:700;margin-bottom:4px">${f.tt}</div>
          <div style="font-size:10px;color:var(--text-soft);line-height:1.4">${f.d}</div>
        </div>`).join('')}
    </div>
    ${recent}
    <div style="display:flex;flex-direction:column;gap:12px;padding-bottom:48px;position:relative;z-index:2">
      <button class="btn-primary" onclick="nav('create')">${t('createEvent')}</button>
      <button class="btn-secondary" onclick="nav('join')">${t('joinEvent')}</button>
    </div>
  </div>`;
}

/* ── CREATE ── */
function pgCreate() {
  const ok = S.eName.trim().length > 0;
  return `<div class="page" style="padding:20px 24px">
    <button class="btn-back" onclick="nav('home')">← ${t('back')}</button>
    <h2 style="font-size:28px;font-weight:800;font-family:'Outfit',sans-serif;margin:32px 0;letter-spacing:-.02em">${t('createEvent')}</h2>
    <label class="label">${t('selType')}</label>
    <div class="type-grid">
      ${t('types').map((tp,i)=>`<button class="type-btn ${S.eType===i?'active':''}" onclick="S.eType=${i};render()">
        <span style="font-size:22px">${ICONS[i]}</span>${tp}</button>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:18px">
      <div><label class="label">${t('eventName')}</label>
        <input type="text" id="ie" value="${esc(S.eName)}" placeholder="${t('eventNamePH')}" oninput="S.eName=this.value;updC()"></div>
      <div><label class="label">${t('hostName')}</label>
        <input type="text" id="ih" value="${esc(S.hName)}" placeholder="${t('hostNamePH')}" oninput="S.hName=this.value"></div>
    </div>
    <button class="btn-primary" id="cb" style="margin-top:32px;${ok?'':'opacity:.4;cursor:not-allowed'}" onclick="doCreate()" ${ok?'':'disabled'}>
      ${S.loading ? '<span class="spinner" style="display:inline-block;margin-right:8px"></span>' : ''}${S.loading ? t('loading') : t('create')}
    </button>
  </div>`;
}

/* ── CREATED ── */
function pgCreated() {
  const ev = S.eventData;
  const conf = Array.from({length:14},(_,i)=>`<div style="position:absolute;top:-20px;left:${5+i*7}%;width:8px;height:8px;background:${CCOLORS[i%6]};border-radius:${i%2?'2px':'50%'};animation:confetti ${2+Math.random()*2}s ease ${Math.random()*.6}s forwards;pointer-events:none"></div>`).join('');
  const qrUrl = `https://memorybox.vercel.app/join/${S.code}`;
  return `<div class="page" style="padding:20px 24px;text-align:center;position:relative;overflow:hidden">
    ${conf}
    <div style="font-size:48px;margin-top:40px;margin-bottom:16px;animation:scaleIn .5s ease">🎉</div>
    <h2 style="font-size:24px;font-weight:800;font-family:'Outfit',sans-serif;margin-bottom:8px">${t('created')}</h2>
    <p style="color:var(--text-soft);font-size:14px;margin-bottom:32px">${t('shareWith')}</p>
    <div class="card" style="margin-bottom:16px">
      <div style="font-size:14px;color:var(--text-soft);margin-bottom:4px">${ICONS[ev?.type||0]} ${t('types')[ev?.type||0]}</div>
      <div style="font-size:20px;font-weight:700;margin-bottom:20px">${esc(ev?.name||'')}</div>
      <div class="code-display" onclick="cpCode()">
        <div class="code-text">${S.code}</div>
        <div style="font-size:11px;color:var(--text-soft);margin-top:6px">${t('shareCode')} 📋</div>
      </div>
      <p style="font-size:13px;color:var(--text-soft);margin:20px 0 16px">${t('orScanQR')}</p>
      <div class="qr-wrap">${qrImg(qrUrl, 160)}</div>
    </div>
    <div style="font-size:11px;color:var(--text-soft);margin-bottom:12px;opacity:0.7">⏱ ${t('expires')}</div>
    <button class="btn-secondary" style="margin-bottom:12px" onclick="shareEvent('${S.code}')">📤 ${t('shareEvent')}</button>
    <button class="btn-primary" onclick="nav('gallery')">${t('photos')} →</button>
  </div>`;
}

/* ── JOIN ── */
function pgJoin() {
  const ok = S.jCode.trim().length > 0;
  return `<div class="page" style="padding:20px 24px">
    <button class="btn-back" onclick="nav('home')">← ${t('back')}</button>
    <h2 style="font-size:28px;font-weight:800;font-family:'Outfit',sans-serif;margin:32px 0 12px">${t('joinEvent')}</h2>
    <p style="color:var(--text-soft);font-size:14px;margin-bottom:32px">${t('enterCode')}</p>
    <div style="background:var(--card);border:2px dashed var(--card-border);border-radius:20px;padding:40px;text-align:center;margin-bottom:24px">
      <div style="font-size:40px;margin-bottom:12px">📷</div>
      <div style="font-size:14px;color:var(--text-soft)">${t('qrCode')}</div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;color:var(--text-soft);font-size:13px;margin-bottom:24px">
      <div style="flex:1;height:1px;background:var(--card-border)"></div><span>${t('or')}</span><div style="flex:1;height:1px;background:var(--card-border)"></div>
    </div>
    <input type="text" id="ij" value="${esc(S.jCode)}" placeholder="${t('codePH')}"
      oninput="S.jCode=this.value.toUpperCase();this.value=this.value.toUpperCase();updJ()"
      style="text-align:center;font-size:22px;font-weight:700;letter-spacing:.12em;font-family:'Outfit',monospace">
    <button class="btn-primary" id="jb" style="margin-top:24px;${ok?'':'opacity:.4;cursor:not-allowed'}" onclick="doJoin()" ${ok?'':'disabled'}>
      ${S.loading ? t('loading') : t('join')}
    </button>
  </div>`;
}

/* ── JOIN NAME ── */
function pgJoinName() {
  const ev = S.eventData;
  return `<div class="page" style="padding:20px 24px">
    <button class="btn-back" onclick="nav('join')">← ${t('back')}</button>
    <div style="text-align:center;margin:32px 0">
      <div style="font-size:40px;margin-bottom:12px">${ICONS[ev?.type||0]}</div>
      <h2 style="font-size:22px;font-weight:800;font-family:'Outfit',sans-serif;margin-bottom:6px">${esc(ev?.name||'')}</h2>
      <div style="font-size:13px;color:var(--accent);font-weight:600">${S.code}</div>
    </div>
    <div style="margin-bottom:24px">
      <label class="label">${t('yourName')}</label>
      <input type="text" id="iu" value="${esc(S.uName)}" placeholder="${t('yourNamePH')}" oninput="S.uName=this.value">
    </div>
    <button class="btn-primary" onclick="enterGuest()">${t('join')} →</button>
  </div>`;
}

/* ── GALLERY ── */
function pgGallery() {
  if (S.loading || !S.eventData) {
    return `<div class="page">
      <div class="gal-header">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="btn-icon" onclick="nav('home')" style="width:34px;height:34px;font-size:14px">←</button>
          <div style="font-size:15px;font-weight:700">${t('loading')}</div>
        </div>
      </div>
      <div class="loading-wrap"><div class="spinner"></div><div class="loading-text">${t('loading')}</div></div>
    </div>`;
  }

  const ev = S.eventData;
  const u = user();
  const all = S.photos;
  const list = S.filter === 'mine' ? all.filter(p => p.user === u) : all;
  const c1 = list.filter((_,i) => i%2===0);
  const c2 = list.filter((_,i) => i%2===1);
  const selCount = S.selected.size;
  const guests = new Set(all.map(p => p.user)); guests.add(u);

  const pc = (p, i) => {
    const me = p.user === u;
    const idx = all.indexOf(p);
    const chosen = S.selected.has(p.id);
    const isVideo = p.fileType === 'video';
    const thumb = isVideo
      ? `<video src="${p.url}#t=0.001" preload="metadata" style="height:${p.h||200}px" class="video-thumb" playsinline muted></video>
         <div class="play-overlay"><div class="play-btn">▶</div></div>`
      : `<img src="${p.url}" style="height:${p.h||200}px" loading="lazy" draggable="false">`;
    const overlay = `<div class="photo-overlay">
      <span>${me?`<span class="badge badge-you">${t('you')}</span> `:''}${esc(p.user)}</span>
      <span>${isVideo?'🎬 ':''}${ago(p.ts)}</span>
    </div>`;

    if (S.selectMode) {
      return `<div class="photo-card sel-mode ${chosen?'chosen':''} ${p._new?'fresh':''}" style="${stg(i)}" onclick="toggleSel('${p.id}')">
        <div class="sel-check ${chosen?'on':''}">${chosen?'✓':''}</div>
        ${thumb}${overlay}
      </div>`;
    }
    return `<div class="photo-card ${p._new?'fresh':''}" style="${stg(i)}" onclick="S.lbIdx=${idx};render()">
      ${thumb}${overlay}
      ${me ? `<button class="del-btn" onclick="event.stopPropagation();deleteMedia('${p.id}')" title="Sil">🗑</button>` : ''}
    </div>`;
  };

  const qrUrl = `https://memorybox.vercel.app/join/${S.code}`;
  const qr = S.showQR ? `<div class="qr-panel">
    <div class="qr-wrap">${qrImg(qrUrl, 140)}</div>
    <div onclick="cpCode()" style="margin-top:12px;font-size:22px;font-weight:800;color:var(--accent);letter-spacing:.12em;cursor:pointer;font-family:'Outfit',monospace">${S.code}</div>
    <div style="font-size:11px;color:var(--text-soft);margin-top:4px">${t('shareCode')}</div>
  </div>` : '';

  const empty = !list.length ? `<div style="text-align:center;padding:60px 24px">
    <div style="font-size:48px;margin-bottom:16px">📷</div>
    <div style="font-size:18px;font-weight:700;margin-bottom:8px">${t('noPhotos')}</div>
    <div style="font-size:14px;color:var(--text-soft)">${t('noPhotosSub')}</div>
  </div>` : '';

  const grid = list.length ? `<div class="masonry" style="padding-bottom:${S.selectMode?'140':'100'}px">
    <div class="masonry-col">${c1.map(pc).join('')}</div>
    <div class="masonry-col">${c2.map(pc).join('')}</div>
  </div>` : '';

  const lb = S.lbIdx >= 0 && all[S.lbIdx] ? (() => {
    const p = all[S.lbIdx], me = p.user===u, n = all.length;
    const isVideo = p.fileType==='video';
    const media = isVideo
      ? `<video src="${p.url}" controls playsinline style="max-width:92%;max-height:65vh;border-radius:12px" onclick="event.stopPropagation()"></video>`
      : `<img src="${p.url}" style="max-width:92%;max-height:65vh;border-radius:12px;object-fit:contain" onclick="event.stopPropagation()" draggable="false">`;
    return `<div class="lightbox" onclick="S.lbIdx=-1;render()">
      <button class="lb-close" onclick="event.stopPropagation();S.lbIdx=-1;render()">×</button>
      <div class="lb-counter">${S.lbIdx+1} / ${n}</div>
      ${media}
      <div class="lb-info">
        <div style="font-size:14px;font-weight:600">${me?'📱 ':''}${esc(p.user)}${me?` <span class="badge badge-you">${t('you')}</span>`:''}</div>
        <div style="font-size:12px;margin-top:4px;opacity:.7">${isVideo?'🎬 Video · ':''}${ago(p.ts)}</div>
      </div>
      <div class="lb-nav">
        ${S.lbIdx>0?`<button class="btn-small" onclick="event.stopPropagation();S.lbIdx--;render()">←</button>`:''}
        <button class="dl-btn" onclick="event.stopPropagation();dlOne(${S.lbIdx})">⬇ ${t('dlOne')}</button>
        ${me?`<button class="btn-small" style="background:rgba(239,68,68,0.2);color:#ef4444" onclick="event.stopPropagation();deleteMedia('${p.id}')">🗑 Sil</button>`:''}
        ${S.lbIdx<n-1?`<button class="btn-small" onclick="event.stopPropagation();S.lbIdx++;render()">→</button>`:''}
      </div>
    </div>`;
  })() : '';

  const selBar = S.selectMode ? `<div class="select-bar">
    <div>
      <span class="count">${selCount} ${t('selected')}</span>
      <button class="dl-btn-ghost" style="margin-left:8px;padding:6px 12px;font-size:11px" onclick="selAll()">${t('selectAll')}</button>
    </div>
    <div class="actions">
      <button class="dl-btn-ghost" onclick="exitSel()">${t('cancel')}</button>
      <button class="dl-btn" onclick="dlSelected()" ${selCount===0?'disabled':''}>⬇ ${t('dlSelected')}</button>
    </div>
  </div>` : '';

  const fabArea = S.selectMode ? '' : `<div class="fab-wrap" style="display:flex;gap:10px">
    <button class="fab" onclick="document.getElementById('fileInput').click()">📷 ${t('upload')}</button>
    ${all.length > 0 ? `
      <button class="fab" onclick="enterSel()" style="background:rgba(255,255,255,0.12);box-shadow:0 4px 16px rgba(0,0,0,.3);padding:16px" title="${t('select')}">☑</button>
      <button class="fab" onclick="dlAll()" style="background:rgba(255,255,255,0.12);box-shadow:0 4px 16px rgba(0,0,0,.3);padding:16px" title="${t('dlAll')}">⬇</button>
    ` : ''}
  </div>`;

  return `<div class="page">
    <div class="gal-header">
      <div style="display:flex;align-items:center;gap:12px">
        <button class="btn-icon" onclick="${S.selectMode?'exitSel()':"nav('home')"}" style="width:34px;height:34px;font-size:14px">${S.selectMode?'✕':'←'}</button>
        <div>
          <div style="font-size:15px;font-weight:700">${S.selectMode?t('select'):esc(ev.name)}</div>
          <div style="font-size:11px;color:var(--accent);font-weight:600">${S.selectMode?selCount+' '+t('selected'):S.code+' · '+(S.role==='host'?'Organizatör':u)}</div>
        </div>
      </div>
      ${S.selectMode?'':`<button class="btn-icon" onclick="S.showQR=!S.showQR;render()" style="${S.showQR?'background:rgba(249,115,22,.15);color:var(--accent)':''}">${S.showQR?'✕':'⊞'}</button>`}
    </div>
    ${qr}
    <div style="display:flex;padding:12px 20px;gap:10px;flex-wrap:wrap">
      <div class="stat-pill">🖼 ${all.length} ${t('pCount')}</div>
      <div class="stat-pill">👥 ${guests.size} ${t('gCount')}</div>
      <div class="stat-pill" style="background:rgba(16,185,129,.1);color:var(--success)"><span class="live-dot"></span> Live</div>
    </div>
    <div style="display:flex;padding:8px 20px 4px;gap:8px">
      <button class="ftab ${S.filter==='all'?'on':''}" onclick="S.filter='all';render()">${t('all')}</button>
      <button class="ftab ${S.filter==='mine'?'on':''}" onclick="S.filter='mine';render()">${t('mine')}</button>
    </div>
    ${empty}${grid}${fabArea}${selBar}${lb}
  </div>`;
}

/* ════════════════════════════════════════════
   ACTIONS
════════════════════════════════════════════ */
async function nav(s) {
  if (S.screen === 'gallery' && s !== 'gallery') unsubscribeFromGallery();
  S.screen = s; S.lbIdx = -1; S.showQR = false; S.filter = 'all';
  S.selectMode = false; S.selected = new Set(); S.menuOpen = null;

  if (s === 'gallery') {
    S.loading = true;
    S.photos = S.eventData?.code === S.code ? S.photos : [];
    render(); scrollTo(0, 0);
    await loadGallery();
    S.loading = false; render();
  } else { render(); scrollTo(0, 0); }
}

function cpCode() {
  try { navigator.clipboard.writeText(S.code); } catch(e) {}
  toast(t('copied'));
}

function updC() { const b=document.getElementById('cb'); if(!b)return; b.disabled=!S.eName.trim(); b.style.opacity=S.eName.trim()?'1':'.4'; }
function updJ() { const b=document.getElementById('jb'); if(!b)return; b.disabled=!S.jCode.trim(); b.style.opacity=S.jCode.trim()?'1':'.4'; }

function enterSel() { S.selectMode=true; S.selected=new Set(); render(); }
function exitSel()  { S.selectMode=false; S.selected=new Set(); render(); }
function toggleSel(id) { if(S.selected.has(id)) S.selected.delete(id); else S.selected.add(id); render(); }
function selAll() {
  const list = S.filter==='mine' ? S.photos.filter(p=>p.user===user()) : S.photos;
  if(S.selected.size===list.length) S.selected=new Set(); else S.selected=new Set(list.map(p=>p.id));
  render();
}

async function doCreate() {
  if (!S.eName.trim() || S.loading) return;
  S.code = genCode(); S.role = 'host'; S.loading = true; render();

  const { data, error } = await sb.from('events').insert({
    code: S.code, name: S.eName.trim(),
    host: S.hName.trim() || 'Organizatör', type: S.eType,
  }).select().single();

  S.loading = false;
  if (error) { toast(t('connErr'), true); render(); return; }
  S.eventData = data; S.photos = [];
  saveRecentEvent(data, 0);
  nav('created'); toast(t('created'));
}

async function doJoin() {
  const c = S.jCode.trim().toUpperCase();
  if (!c || S.loading) return;
  S.loading = true; render();

  const { data, error } = await sb.from('events').select('*').eq('code', c).single();
  S.loading = false;

  if (error || !data) {
    toast(t('notFound'), true);
    const el = document.getElementById('ij');
    if (el) { el.classList.add('shake'); setTimeout(()=>el.classList.remove('shake'),400); }
    render(); return;
  }
  S.code = c; S.role = 'guest'; S.eventData = data;
  nav('joinName');
}

function enterGuest() { nav('gallery'); }

async function openEv(code) {
  S.code = code; S.role = 'host';
  S.hName = getRecentEvents().find(e=>e.code===code)?.host || '';
  S.eventData = null;
  await nav('gallery');
}

function bind() {
  const fi = document.getElementById('fileInput');
  if (fi) {
    fi.onchange = async function(e) {
      const files = Array.from(e.target.files);
      e.target.value = '';
      if (!files.length) return;
      const total = files.length; let done = 0;

      for (const file of files) {
        const fileType = file.type.startsWith('video/') ? 'video' : 'image';
        const rawExt = file.name.split('.').pop().toLowerCase();
        const ext = rawExt || (fileType==='video'?'mp4':'jpg');
        const path = `${S.code}/${Date.now()}_${Math.random().toString(36).substr(2,6)}.${ext}`;

        showUploadBar(`${t('uploadingN')}${done+1}/${total}`, Math.round((done/total)*80));

        const { error: upErr } = await sb.storage.from(BUCKET).upload(path, file, {
          contentType: file.type||(fileType==='video'?'video/mp4':'image/jpeg'),
          cacheControl: '3600', upsert: false,
        });

        if (upErr) { toast(t('uploadErr')+'('+upErr.message+')',true); hideUploadBar(); continue; }

        const { data: urlData } = sb.storage.from(BUCKET).getPublicUrl(path);
        const thumbH = fileType==='video' ? 220 : await getThumbHeight(file);
        const now = Date.now();

        const { data: newRow, error: dbErr } = await sb.from('media').insert({
          event_code: S.code, user_name: user(),
          storage_path: path, public_url: urlData.publicUrl,
          file_type: fileType, thumb_h: thumbH,
          ts: now, expires_at: new Date(now+TTL_MS).toISOString(),
        }).select().single();

        if (!dbErr && newRow) {
          const item = mapMedia(newRow); item._new = true;
          S.photos.unshift(item);
          setTimeout(()=>{ item._new=false; }, 1500);
        }
        done++;
        showUploadBar(`${t('uploadingN')}${done}/${total}`, Math.round((done/total)*100));
      }

      hideUploadBar();
      saveRecentEvent(S.eventData, S.photos.length);
      if (done>0) { toast(done>1?done+' '+t('photosAdded'):t('uploaded')); render(); }
    };
  }

  document.onkeydown = e => {
    if (S.lbIdx<0) return;
    const n = S.photos.length;
    if (e.key==='Escape')                           { S.lbIdx=-1; render(); }
    else if (e.key==='ArrowLeft'  && S.lbIdx>0)    { S.lbIdx--; render(); }
    else if (e.key==='ArrowRight' && S.lbIdx<n-1)  { S.lbIdx++; render(); }
  };
}

/* ════════════════════════════════════════════
   INIT
════════════════════════════════════════════ */
render();
