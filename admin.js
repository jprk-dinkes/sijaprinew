// ============================================
// SIJAPRI Admin Panel – Logic
// ============================================

// ── Auth constants
const ADMIN_CREDS_KEY = 'sijapri_admin_creds';
const DEFAULT_CREDS   = { user: 'admin', pass: 'sijapri2025' };

function getCreds() {
  try {
    const s = localStorage.getItem(ADMIN_CREDS_KEY);
    return s ? JSON.parse(s) : { ...DEFAULT_CREDS };
  } catch { return { ...DEFAULT_CREDS }; }
}
function saveCreds(c) { localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(c)); }
function isLoggedIn() { return sessionStorage.getItem('sijapri_admin_auth') === '1'; }
function login()  { sessionStorage.setItem('sijapri_admin_auth', '1'); }
function logout() { sessionStorage.removeItem('sijapri_admin_auth'); location.reload(); }

// ── Toast
function showToast(msg, type = 'success') {
  const icon = { success: 'check-circle', error: 'times-circle', info: 'info-circle' };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fas fa-${icon[type] || 'check-circle'}"></i> ${msg}`;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── Sidebar navigation
function switchSection(id) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
  const sec = document.getElementById(`section-${id}`);
  const lnk = document.getElementById(`sb-${id}`);
  if (sec) sec.classList.add('active');
  if (lnk) lnk.classList.add('active');
  document.getElementById('topbarTitle').textContent = lnk?.textContent.trim() || '';
}

// ── Format stat display
function fmtStat(val, suffix) {
  const v = parseFloat(val);
  if (isNaN(v)) return val;
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + ' Jt' + (suffix || '');
  if (v >= 1_000)     return v.toLocaleString('id-ID') + (suffix || '');
  return v + (suffix || '');
}

// ── Build stats editor
const STAT_ICONS = {
  capaian_uhc:   { icon: 'chart-pie',  cls: 'sec-icon-blue',   label: 'Capaian UHC' },
  peserta:        { icon: 'users',      cls: 'sec-icon-green',  label: 'Peserta Terdaftar' },
  puskesmas:      { icon: 'hospital',   cls: 'sec-icon-blue',   label: 'Puskesmas' },
  nakes_berizin:  { icon: 'user-nurse', cls: 'sec-icon-yellow', label: 'Nakes Berizin' },
};
function buildStatsEditor(cfg) {
  const grid = document.getElementById('statsEditorGrid');
  grid.innerHTML = '';
  Object.entries(cfg.stats).forEach(([key, s]) => {
    const meta = STAT_ICONS[key] || { icon:'star', cls:'sec-icon-blue', label: key };
    const card = document.createElement('div');
    card.className = 'stat-editor-card';
    card.innerHTML = `
      <div class="sec-icon ${meta.cls}"><i class="fas fa-${meta.icon}"></i></div>
      <h3>${meta.label}</h3>
      <div class="stat-current" id="sc-${key}">${fmtStat(s.value, s.suffix)}</div>
      <div class="stat-fields">
        <div class="stat-field-row">
          <label>Nilai Angka</label>
          <input class="admin-input" id="sv-${key}" type="number" step="0.01" value="${s.value}" />
        </div>
        <div class="stat-field-row">
          <label>Satuan (suffix)</label>
          <input class="admin-input" id="ss-${key}" type="text" value="${s.suffix}" placeholder="%  /  +  /  Jt" />
        </div>
        <div class="stat-field-row">
          <label>Label Kartu</label>
          <input class="admin-input" id="sl-${key}" type="text" value="${s.label}" />
        </div>
        <div class="stat-field-row">
          <label>Deskripsi</label>
          <input class="admin-input" id="sd-${key}" type="text" value="${s.desc}" />
        </div>
      </div>
    `;
    grid.appendChild(card);
    // Live preview
    ['sv-','ss-'].forEach(pre => {
      document.getElementById(pre + key)?.addEventListener('input', () => {
        const v = document.getElementById('sv-'+key).value;
        const sx = document.getElementById('ss-'+key).value;
        document.getElementById('sc-'+key).textContent = fmtStat(v, sx);
      });
    });
  });
}

function collectStats(cfg) {
  Object.keys(cfg.stats).forEach(key => {
    const v = document.getElementById('sv-'+key)?.value;
    const sx = document.getElementById('ss-'+key)?.value;
    const l  = document.getElementById('sl-'+key)?.value;
    const d  = document.getElementById('sd-'+key)?.value;
    if (v  !== undefined) cfg.stats[key].value  = parseFloat(v) || 0;
    if (sx !== undefined) cfg.stats[key].suffix  = sx;
    if (l  !== undefined) cfg.stats[key].label   = l;
    if (d  !== undefined) cfg.stats[key].desc    = d;
  });
  return cfg;
}

// ── Hero editor
function initHeroEditor(cfg) {
  const h = cfg.hero;
  ['badge','title1','title2','title3','subtitle'].forEach(f => {
    const el = document.getElementById(`hero-${f}`);
    if (el) el.value = h[f] || '';
  });
  updateHeroPreview();
  document.querySelectorAll('#hero-badge,#hero-title1,#hero-title2,#hero-title3,#hero-subtitle')
    .forEach(el => el.addEventListener('input', updateHeroPreview));
}
function updateHeroPreview() {
  document.getElementById('prev-badge').textContent = document.getElementById('hero-badge')?.value || '';
  document.getElementById('prev-t1').textContent    = document.getElementById('hero-title1')?.value || '';
  document.getElementById('prev-t2').textContent    = document.getElementById('hero-title2')?.value || '';
  document.getElementById('prev-t3').textContent    = document.getElementById('hero-title3')?.value || '';
  document.getElementById('prev-sub').textContent   = document.getElementById('hero-subtitle')?.value || '';
}
function collectHero(cfg) {
  ['badge','title1','title2','title3','subtitle'].forEach(f => {
    const el = document.getElementById(`hero-${f}`);
    if (el) cfg.hero[f] = el.value;
  });
  return cfg;
}

// ── Announcements editor
function buildAnnEditor(cfg) {
  const list = document.getElementById('ann-editor-list');
  list.innerHTML = '';
  (cfg.announcements || []).forEach((a, i) => {
    const card = document.createElement('div');
    card.className = 'ann-card-editor';
    card.innerHTML = `
      <div class="ann-card-header">
        <h3>
          <i class="fas fa-newspaper text-blue"></i>
          Pengumuman ${i+1}
          ${a.featured ? '<span class="ann-featured-badge">Utama</span>' : ''}
        </h3>
      </div>
      <div class="ann-card-body">
        <div class="stat-field-row">
          <label>Tanggal Tampil</label>
          <input class="admin-input" id="ann-date-${i}" type="text" value="${a.date}" />
        </div>
        <div class="stat-field-row">
          <label>Badge (kosongkan jika tidak ada)</label>
          <input class="admin-input" id="ann-badge-${i}" type="text" value="${a.badge}" placeholder="Baru / Penting" />
        </div>
        <div class="stat-field-row full">
          <label>Judul Pengumuman</label>
          <input class="admin-input" id="ann-title-${i}" type="text" value="${a.title}" />
        </div>
        <div class="stat-field-row full">
          <label>Isi / Deskripsi</label>
          <textarea class="admin-textarea" id="ann-content-${i}" rows="3">${a.content}</textarea>
        </div>
        <div class="stat-field-row">
          <label>URL Tautan</label>
          <input class="admin-input" id="ann-link-${i}" type="text" value="${a.link}" placeholder="uhc.html / perizinan.html" />
        </div>
        <div class="stat-field-row">
          <label>Teks Tombol Tautan</label>
          <input class="admin-input" id="ann-linktext-${i}" type="text" value="${a.linkText}" placeholder="Selengkapnya" />
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}
function collectAnn(cfg) {
  (cfg.announcements || []).forEach((a, i) => {
    a.date     = document.getElementById(`ann-date-${i}`)?.value     ?? a.date;
    a.badge    = document.getElementById(`ann-badge-${i}`)?.value    ?? a.badge;
    a.title    = document.getElementById(`ann-title-${i}`)?.value    ?? a.title;
    a.content  = document.getElementById(`ann-content-${i}`)?.value  ?? a.content;
    a.link     = document.getElementById(`ann-link-${i}`)?.value     ?? a.link;
    a.linkText = document.getElementById(`ann-linktext-${i}`)?.value ?? a.linkText;
  });
  return cfg;
}

// ── Jadwal editor
function buildJadwalEditor(cfg) {
  const z = cfg.jadwal;
  buildSchedEditor('zoom-schedule-editor',     z.zoom || []);
  buildSchedEditor('langsung-schedule-editor', z.langsung || []);
  document.getElementById('zoom-note').value     = z.zoom_note || '';
  document.getElementById('langsung-note').value = z.langsung_note || '';
}
function buildSchedEditor(containerId, rows) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = `
    <div class="sched-editor-row" style="margin-bottom:4px">
      <div><label>Hari</label></div>
      <div><label>Jam</label></div>
      <div><label>Topik / Loket</label></div>
    </div>
  ` + rows.map((r, i) => `
    <div class="sched-editor-row">
      <input class="admin-input" data-sched="${containerId}-hari-${i}" type="text" value="${r.hari}" />
      <input class="admin-input" data-sched="${containerId}-jam-${i}"  type="text" value="${r.jam}"  />
      <input class="admin-input" data-sched="${containerId}-topik-${i}" type="text" value="${r.topik}" />
    </div>
  `).join('');
}
function collectJadwal(cfg) {
  ['zoom','langsung'].forEach(type => {
    const cid = type === 'zoom' ? 'zoom-schedule-editor' : 'langsung-schedule-editor';
    cfg.jadwal[type].forEach((_, i) => {
      cfg.jadwal[type][i].hari  = document.querySelector(`[data-sched="${cid}-hari-${i}"]`)?.value  ?? _;
      cfg.jadwal[type][i].jam   = document.querySelector(`[data-sched="${cid}-jam-${i}"]`)?.value   ?? _;
      cfg.jadwal[type][i].topik = document.querySelector(`[data-sched="${cid}-topik-${i}"]`)?.value ?? _;
    });
  });
  cfg.jadwal.zoom_note     = document.getElementById('zoom-note')?.value     || '';
  cfg.jadwal.langsung_note = document.getElementById('langsung-note')?.value || '';
  return cfg;
}

// ── Kontak editor
function initKontakEditor(cfg) {
  const c = cfg.contact;
  document.getElementById('contact-wa-number').value  = c.wa_number   || '';
  document.getElementById('contact-whatsapp').value   = c.whatsapp    || '';
  document.getElementById('contact-email').value      = c.email       || '';
  document.getElementById('contact-instagram').value  = c.instagram   || '';
  document.getElementById('contact-ig-url').value     = c.ig_url      || '';
  document.getElementById('contact-yt-url').value     = c.yt_url      || '';
  document.getElementById('contact-address').value    = c.address     || '';
  document.getElementById('contact-maps-url').value   = c.maps_url    || '';
}
function collectKontak(cfg) {
  cfg.contact.wa_number  = document.getElementById('contact-wa-number').value;
  cfg.contact.whatsapp   = document.getElementById('contact-whatsapp').value;
  cfg.contact.email      = document.getElementById('contact-email').value;
  cfg.contact.instagram  = document.getElementById('contact-instagram').value;
  cfg.contact.ig_url     = document.getElementById('contact-ig-url').value;
  cfg.contact.yt_url     = document.getElementById('contact-yt-url').value;
  cfg.contact.address    = document.getElementById('contact-address').value;
  cfg.contact.maps_url   = document.getElementById('contact-maps-url').value;
  return cfg;
}

// ── Jam operasional editor
function buildJamEditor(cfg) {
  const c = document.getElementById('jam-ops-editor');
  if (!c) return;
  c.innerHTML = (cfg.jam_ops || []).map((j, i) => `
    <div class="jam-row-editor">
      <div class="stat-field-row">
        <label>Hari</label>
        <input class="admin-input" id="jam-hari-${i}" type="text" value="${j.hari}" />
      </div>
      <div class="stat-field-row">
        <label>Jam</label>
        <input class="admin-input" id="jam-jam-${i}" type="text" value="${j.jam}" />
      </div>
      <div>
        <label class="check-label">
          <input type="checkbox" id="jam-libur-${i}" ${j.libur ? 'checked' : ''} />
          Hari Libur
        </label>
      </div>
    </div>
  `).join('');
}
function collectJam(cfg) {
  (cfg.jam_ops || []).forEach((_, i) => {
    cfg.jam_ops[i].hari  = document.getElementById(`jam-hari-${i}`)?.value  ?? _.hari;
    cfg.jam_ops[i].jam   = document.getElementById(`jam-jam-${i}`)?.value   ?? _.jam;
    cfg.jam_ops[i].libur = document.getElementById(`jam-libur-${i}`)?.checked ?? false;
  });
  return cfg;
}

// ── Password change
function initPassChange() {
  document.getElementById('changePass')?.addEventListener('click', () => {
    const old     = document.getElementById('old-pass').value;
    const newP    = document.getElementById('new-pass').value;
    const confirm = document.getElementById('confirm-pass').value;
    const errEl   = document.getElementById('passError');
    const creds   = getCreds();

    if (old !== creds.pass) {
      errEl.textContent = 'Password lama salah!';
      errEl.classList.add('show'); return;
    }
    if (newP.length < 6) {
      errEl.textContent = 'Password baru minimal 6 karakter!';
      errEl.classList.add('show'); return;
    }
    if (newP !== confirm) {
      errEl.textContent = 'Konfirmasi password tidak cocok!';
      errEl.classList.add('show'); return;
    }
    errEl.classList.remove('show');
    saveCreds({ user: creds.user, pass: newP });
    document.getElementById('old-pass').value = '';
    document.getElementById('new-pass').value = '';
    document.getElementById('confirm-pass').value = '';
    showToast('Password berhasil diubah!', 'success');
  });
}

// ── Dokumen Perizinan editor
function buildDokumenEditor(cfg) {
  const container = document.getElementById('dokumen-editor-container');
  if (!container) return;
  const cards = cfg.dokumen_perizinan || [];
  container.innerHTML = cards.map((card, ci) => `
    <div class="dok-card-editor" data-card="${ci}">
      <div class="dok-card-header">
        <i class="fas fa-grip-vertical" style="color:#9ca3af;cursor:grab"></i>
        <input class="admin-input" id="dok-title-${ci}" value="${card.title}" placeholder="Judul Kartu" />
        <button class="btn-delete-card" onclick="deleteDokCard(${ci})"><i class="fas fa-trash"></i> Hapus</button>
      </div>
      ${(card.categories || []).map((cat, ki) => `
        <div class="dok-cat-editor" data-cat="${ki}">
          <div class="dok-cat-header">
            <input class="admin-input" id="dok-cat-${ci}-${ki}" value="${cat.name}" placeholder="Nama Kategori" />
            <button class="btn-delete-cat" onclick="deleteDokCat(${ci},${ki})"><i class="fas fa-times"></i> Hapus</button>
          </div>
          ${(cat.items || []).map((item, ii) => `
            <div class="dok-item-row">
              <input class="admin-input" id="dok-item-name-${ci}-${ki}-${ii}" value="${item.name}" placeholder="Nama Item" />
              <input class="admin-input" id="dok-item-link-${ci}-${ki}-${ii}" value="${item.link}" placeholder="URL Link" />
              <button class="btn-del-item" onclick="deleteDokItem(${ci},${ki},${ii})" title="Hapus item"><i class="fas fa-times"></i></button>
            </div>
          `).join('')}
          <div class="dok-add-row">
            <button onclick="addDokItem(${ci},${ki})"><i class="fas fa-plus"></i> Tambah Item</button>
          </div>
        </div>
      `).join('')}
      <div class="dok-card-footer">
        <button onclick="addDokCat(${ci})"><i class="fas fa-plus"></i> Tambah Kategori</button>
      </div>
    </div>
  `).join('');
}

function collectDokumen(cfg) {
  const cards = cfg.dokumen_perizinan || [];
  cards.forEach((card, ci) => {
    card.title = document.getElementById(`dok-title-${ci}`)?.value || card.title;
    (card.categories || []).forEach((cat, ki) => {
      cat.name = document.getElementById(`dok-cat-${ci}-${ki}`)?.value || cat.name;
      (cat.items || []).forEach((item, ii) => {
        item.name = document.getElementById(`dok-item-name-${ci}-${ki}-${ii}`)?.value || item.name;
        item.link = document.getElementById(`dok-item-link-${ci}-${ki}-${ii}`)?.value || item.link;
      });
    });
  });
  return cfg;
}

function addDokCard() {
  let cfg = getConfig();
  if (!cfg.dokumen_perizinan) cfg.dokumen_perizinan = [];
  cfg.dokumen_perizinan.push({ title: 'Kartu Baru', icon: 'ph-duotone ph-folder-open', categories: [{ name: 'KATEGORI BARU', items: [{ name: 'Item Baru', link: '#' }] }] });
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kartu baru ditambahkan', 'info');
}

function deleteDokCard(ci) {
  if (!confirm('Hapus kartu ini dan semua isinya?')) return;
  let cfg = getConfig();
  cfg.dokumen_perizinan.splice(ci, 1);
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kartu dihapus', 'info');
}

function addDokCat(ci) {
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories.push({ name: 'KATEGORI BARU', items: [{ name: 'Item Baru', link: '#' }] });
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kategori baru ditambahkan', 'info');
}

function deleteDokCat(ci, ki) {
  if (!confirm('Hapus kategori ini?')) return;
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories.splice(ki, 1);
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kategori dihapus', 'info');
}

function addDokItem(ci, ki) {
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories[ki].items.push({ name: 'Item Baru', link: '#' });
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Item baru ditambahkan', 'info');
}

function deleteDokItem(ci, ki, ii) {
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories[ki].items.splice(ii, 1);
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Item dihapus', 'info');
}


// ── Dokumen Perizinan editor
function buildDokumenEditor(cfg) {
  const container = document.getElementById('dokumen-editor-container');
  if (!container) return;
  const cards = cfg.dokumen_perizinan || [];
  container.innerHTML = cards.map((card, ci) => `
    <div class="dok-card-editor" data-card="${ci}">
      <div class="dok-card-header">
        <i class="fas fa-grip-vertical" style="color:#9ca3af;cursor:grab"></i>
        <input class="admin-input" id="dok-title-${ci}" value="${card.title}" placeholder="Judul Kartu" />
        <button class="btn-delete-card" onclick="deleteDokCard(${ci})"><i class="fas fa-trash"></i> Hapus</button>
      </div>
      ${(card.categories || []).map((cat, ki) => `
        <div class="dok-cat-editor" data-cat="${ki}">
          <div class="dok-cat-header">
            <input class="admin-input" id="dok-cat-${ci}-${ki}" value="${cat.name}" placeholder="Nama Kategori" />
            <button class="btn-delete-cat" onclick="deleteDokCat(${ci},${ki})"><i class="fas fa-times"></i> Hapus</button>
          </div>
          ${(cat.items || []).map((item, ii) => `
            <div class="dok-item-row">
              <input class="admin-input" id="dok-item-name-${ci}-${ki}-${ii}" value="${item.name}" placeholder="Nama Item" />
              <input class="admin-input" id="dok-item-link-${ci}-${ki}-${ii}" value="${item.link}" placeholder="URL Link" />
              <button class="btn-del-item" onclick="deleteDokItem(${ci},${ki},${ii})" title="Hapus item"><i class="fas fa-times"></i></button>
            </div>
          `).join('')}
          <div class="dok-add-row">
            <button onclick="addDokItem(${ci},${ki})"><i class="fas fa-plus"></i> Tambah Item</button>
          </div>
        </div>
      `).join('')}
      <div class="dok-card-footer">
        <button onclick="addDokCat(${ci})"><i class="fas fa-plus"></i> Tambah Kategori</button>
      </div>
    </div>
  `).join('');
}

function collectDokumen(cfg) {
  const cards = cfg.dokumen_perizinan || [];
  cards.forEach((card, ci) => {
    card.title = document.getElementById(`dok-title-${ci}`)?.value || card.title;
    (card.categories || []).forEach((cat, ki) => {
      cat.name = document.getElementById(`dok-cat-${ci}-${ki}`)?.value || cat.name;
      (cat.items || []).forEach((item, ii) => {
        item.name = document.getElementById(`dok-item-name-${ci}-${ki}-${ii}`)?.value || item.name;
        item.link = document.getElementById(`dok-item-link-${ci}-${ki}-${ii}`)?.value || item.link;
      });
    });
  });
  return cfg;
}

window.addDokCard = function() {
  let cfg = getConfig();
  if (!cfg.dokumen_perizinan) cfg.dokumen_perizinan = [];
  cfg.dokumen_perizinan.push({ title: 'Kartu Baru', icon: 'ph-duotone ph-folder-open', categories: [{ name: 'KATEGORI BARU', items: [{ name: 'Item Baru', link: '#' }] }] });
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kartu baru ditambahkan', 'info');
}

window.deleteDokCard = function(ci) {
  if (!confirm('Hapus kartu ini dan semua isinya?')) return;
  let cfg = getConfig();
  cfg.dokumen_perizinan.splice(ci, 1);
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kartu dihapus', 'info');
}

window.addDokCat = function(ci) {
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories.push({ name: 'KATEGORI BARU', items: [{ name: 'Item Baru', link: '#' }] });
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kategori baru ditambahkan', 'info');
}

window.deleteDokCat = function(ci, ki) {
  if (!confirm('Hapus kategori ini?')) return;
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories.splice(ki, 1);
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Kategori dihapus', 'info');
}

window.addDokItem = function(ci, ki) {
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories[ki].items.push({ name: 'Item Baru', link: '#' });
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Item baru ditambahkan', 'info');
}

window.deleteDokItem = function(ci, ki, ii) {
  let cfg = getConfig();
  cfg.dokumen_perizinan[ci].categories[ki].items.splice(ii, 1);
  saveConfig(cfg);
  buildDokumenEditor(cfg);
  showToast('Item dihapus', 'info');
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Check auth
  if (isLoggedIn()) {
    document.getElementById('loginScreen').style.display  = 'none';
    document.getElementById('adminPanel').style.display   = 'flex';
    initAdmin();
  }

  // Login form
  document.getElementById('loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('admin-user').value.trim();
    const pass = document.getElementById('admin-pass').value;
    const creds = getCreds();
    const errEl = document.getElementById('loginError');
    if (user === creds.user && pass === creds.pass) {
      login();
      document.getElementById('loginScreen').style.display = 'none';
      document.getElementById('adminPanel').style.display  = 'flex';
      initAdmin();
    } else {
      errEl.textContent = 'Username atau password salah. Coba lagi.';
      errEl.classList.add('show');
      setTimeout(() => errEl.classList.remove('show'), 3000);
    }
  });

  // Password toggle
  document.getElementById('passToggle')?.addEventListener('click', () => {
    const input = document.getElementById('admin-pass');
    const icon  = document.querySelector('#passToggle i');
    if (input.type === 'password') {
      input.type = 'text';
      icon.className = 'fas fa-eye-slash';
    } else {
      input.type = 'password';
      icon.className = 'fas fa-eye';
    }
  });
});

function initAdmin() {
  let cfg = getConfig();

  // Build editors
  buildStatsEditor(cfg);
  initHeroEditor(cfg);
  buildAnnEditor(cfg);
  buildJadwalEditor(cfg);
  initKontakEditor(cfg);
  buildJamEditor(cfg);
  buildDokumenEditor(cfg);
  initPassChange();

  // Username display
  document.getElementById('topbarUser').textContent = getCreds().user || 'Administrator';

  // Sidebar nav
  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sec = link.dataset.section;
      switchSection(sec);
      if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });

  // Toggle sidebar (mobile)
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', logout);

  // ── SAVE handlers ──
  document.getElementById('saveStats')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectStats(c);
    if (saveConfig(c)) showToast('Statistik berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('resetStats')?.addEventListener('click', () => {
    if (!confirm('Reset statistik ke nilai default?')) return;
    let c = getConfig();
    const def = resetConfig();
    c.stats = def.stats;
    saveConfig(c);
    buildStatsEditor(c);
    showToast('Statistik direset ke default', 'info');
  });

  document.getElementById('saveHero')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectHero(c);
    if (saveConfig(c)) showToast('Teks hero berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('saveAnn')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectAnn(c);
    if (saveConfig(c)) showToast('Pengumuman berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('saveJadwal')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectJadwal(c);
    if (saveConfig(c)) showToast('Jadwal berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('saveKontak')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectKontak(c);
    if (saveConfig(c)) showToast('Info kontak berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('saveJam')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectJam(c);
    if (saveConfig(c)) showToast('Jam operasional berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('saveDokumen')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectDokumen(c);
    if (saveConfig(c)) showToast('Dokumen perizinan berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('addDokCard')?.addEventListener('click', window.addDokCard);

  document.getElementById('saveDokumen')?.addEventListener('click', () => {
    let c = getConfig();
    c = collectDokumen(c);
    if (saveConfig(c)) showToast('Dokumen perizinan berhasil disimpan!');
    else showToast('Gagal menyimpan!', 'error');
  });

  document.getElementById('addDokCard')?.addEventListener('click', addDokCard);
}
