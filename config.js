// ============================================
// SIJAPRI – Config Module
// Data terpusat: dibaca semua halaman, diubah via Admin Panel
// ============================================

const SIJAPRI_KEY = 'sijapri_config';

const DEFAULT_CONFIG = {
  // ---------- STATISTIK ----------
  stats: {
    capaian_uhc:    { value: 98.03, suffix: '%',  label: 'Capaian UHC',       desc: 'Target Nasional ≥ 95%' },
    peserta:        { value: 2540000, suffix: '',   label: 'Peserta Terdaftar', desc: 'Jiwa terdaftar JKN' },
    puskesmas:      { value: 80,    suffix: '',    label: 'Puskesmas',         desc: 'Faskes Tingkat Pertama' },
    nakes_berizin:  { value: 1240,  suffix: '+',   label: 'Nakes Berizin',     desc: 'Tenaga kesehatan aktif' },
  },

  // ---------- HERO ----------
  hero: {
    badge:    'Seksi Jaminan Pembiayaan Regulasi Kesehatan (JPRK)',
    title1:   'Sistem Informasi',
    title2:   'JPRK Dinas Kesehatan',
    title3:   'Kota Bandung',
    subtitle: 'Mengintegrasikan layanan jaminan kesehatan masyarakat (UHC) dan perizinan tenaga & sarana kesehatan dalam satu akses terpadu.',
  },

  // ---------- PENGUMUMAN ----------
  announcements: [
    {
      id: 1,
      badge: 'Baru',
      date: '1 April 2025',
      title: 'Pembaruan Sistem Perizinan Online Nakes 2025',
      content: 'Proses pengajuan STR dan SIP kini sepenuhnya dilakukan melalui sistem OSS-RBA. Pastikan dokumen Anda lengkap sebelum mengajukan permohonan.',
      link: 'perizinan.html',
      linkText: 'Selengkapnya',
      featured: true,
    },
    {
      id: 2,
      badge: '',
      date: '20 Maret 2025',
      title: 'Jadwal Konsultasi Perizinan April 2025',
      content: 'Jadwal konsultasi online via Zoom untuk perizinan nakes dan sarana kesehatan bulan April 2025 telah tersedia.',
      link: 'perizinan.html#jadwal',
      linkText: 'Lihat Jadwal',
      featured: false,
    },
    {
      id: 3,
      badge: '',
      date: '10 Maret 2025',
      title: 'Capaian UHC Kota Bandung Tembus 98%',
      content: 'Kota Bandung berhasil mencapai tingkat UHC sebesar 98.03%, melampaui target nasional sebesar 95%.',
      link: 'uhc.html',
      linkText: 'Info UHC',
      featured: false,
    },
  ],

  // ---------- KONTAK ----------
  contact: {
    whatsapp:  '+62 813-9340-0700',
    wa_number: '6281393400700',
    email:     'jprk@dinkes.bandung.go.id',
    instagram: '@dinkeskotabandung',
    address:   'Jl. Supratman No.73, Cibeunying Kidul, Kota Bandung 40122',
    maps_url:  'https://maps.google.com/?q=Dinas+Kesehatan+Kota+Bandung',
    ig_url:    'https://instagram.com/dinkeskotabandung',
    yt_url:    'https://youtube.com/@dinkeskotabandung',
  },

  // ---------- JAM OPERASIONAL ----------
  jam_ops: [
    { hari: 'Senin – Kamis', jam: '07.30 – 16.00 WIB', libur: false },
    { hari: 'Jumat',         jam: '07.30 – 16.30 WIB', libur: false },
    { hari: 'Sabtu – Minggu',jam: 'Libur',              libur: true  },
  ],

  // ---------- JADWAL KONSULTASI ----------
  jadwal: {
    zoom: [
      { hari: 'Selasa', jam: '09.00 – 11.00 WIB', topik: 'Perizinan Nakes (STR/SIP)' },
      { hari: 'Kamis',  jam: '09.00 – 11.00 WIB', topik: 'Perizinan Sarana Kesehatan' },
    ],
    langsung: [
      { hari: 'Senin – Kamis', jam: '08.00 – 15.00 WIB', topik: 'Loket JPRK – Lantai 2' },
      { hari: 'Jumat',         jam: '08.00 – 15.30 WIB', topik: 'Loket JPRK – Lantai 2' },
    ],
    zoom_note:     'Pendaftaran konsultasi melalui WhatsApp minimal H-1 sebelum jadwal',
    langsung_note: 'Jl. Supratman No.73, Cibeunying Kidul, Kota Bandung 40122',
  },


  // ---------- JADWAL KONSULTASI DARING ----------
  jadwal_daring: {
    items: [
      { label: 'KLINIK',       jadwal: 'Senin, 09.00 - 10.30 WIB' },
      { label: 'KEFARMASIAN',  jadwal: 'Rabu, 09.00 - 10.30 WIB' },
    ],
    zoom_link: '#',
  },

  // ---------- DOKUMEN PERIZINAN ----------
  dokumen_perizinan: [
    {
      title: 'Dokumen Perizinan Umum',
      icon: 'ph-duotone ph-folder-open',
      categories: [
        { name: 'FORMULIR PERIZINAN', items: [
          { name: 'Formulir Izin Kesehatan', link: '#' },
          { name: 'Formulir Pencabutan Izin Sarana', link: '#' },
        ]},
      ],
    },
    {
      title: 'Fasilitas Kefarmasian',
      icon: 'ph-duotone ph-pen',
      categories: [
        { name: 'MATERI & FASILITASI', items: [
          { name: 'Materi Fasilitasi Fasyanfar', link: '#' },
        ]},
        { name: 'APOTEK', items: [
          { name: 'Perbaikan Visitasi Apotek', link: '#' },
        ]},
        { name: 'TOKO OBAT', items: [
          { name: 'Perbaikan Visitasi Toko Obat', link: '#' },
        ]},
      ],
    },
    {
      title: 'Klinik & Rumah Sakit',
      icon: 'ph-duotone ph-buildings',
      categories: [
        { name: 'KLINIK', items: [
          { name: 'Materi Fasilitasi Klinik', link: '#' },
          { name: 'Persyaratan Klinik', link: '#' },
          { name: 'Perbaikan Visitasi Klinik', link: '#' },
        ]},
        { name: 'RUMAH SAKIT', items: [
          { name: 'Materi Fasilitasi Rumah Sakit', link: '#' },
        ]},
      ],
    },
    {
      title: 'Puskesmas & Griya Sehat',
      icon: 'ph-duotone ph-chart-line-up',
      categories: [
        { name: 'PUSKESMAS', items: [
          { name: 'Perbaikan Visitasi Puskesmas', link: '#' },
        ]},
        { name: 'GRIYA SEHAT', items: [
          { name: 'Persyaratan Griya Sehat', link: '#' },
        ]},
      ],
    },
    {
      title: 'Sertifikat Laik Sehat & Higiene',
      icon: 'ph-duotone ph-shield-check',
      categories: [
        { name: 'SERTIFIKAT LAIK SEHAT (SLS)', items: [
          { name: 'Persyaratan SLS', link: '#' },
          { name: 'Materi SLS', link: '#' },
        ]},
        { name: 'SERTIFIKAT LAIK HIGIENE SANITASI (SLHS)', items: [
          { name: 'Persyaratan SLHS', link: '#' },
          { name: 'Materi SLHS', link: '#' },
        ]},
        { name: 'PENGENDALIAN VEKTOR', items: [
          { name: 'Syarat PB Pengendalian Vektor', link: '#' },
          { name: 'Materi PB Pengendalian Vektor', link: '#' },
        ]},
        { name: 'SERTIFIKAT LAIK HIGIENE SANITASI SPPG (MBG)', items: [
          { name: 'Materi SLHS SPPG (MBG)', link: '#' },
        ]},
      ],
    },
  ],

  // ---------- META ----------
  site: {
    nama: 'SIJAPRI',
    instansi: 'Dinas Kesehatan Kota Bandung',
    seksi: 'Seksi JPRK',
    tahun: '2025',
  },
};

// ── Get config (merge default + saved)
function getConfig() {
  try {
    const saved = localStorage.getItem(SIJAPRI_KEY);
    if (!saved) return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    return deepMerge(JSON.parse(JSON.stringify(DEFAULT_CONFIG)), JSON.parse(saved));
  } catch (e) {
    console.error('Config load error:', e);
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }
}

// ── Save config
function saveConfig(cfg) {
  try {
    localStorage.setItem(SIJAPRI_KEY, JSON.stringify(cfg));
    return true;
  } catch (e) {
    console.error('Config save error:', e);
    return false;
  }
}

// ── Reset to defaults
function resetConfig() {
  localStorage.removeItem(SIJAPRI_KEY);
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

// ── Deep merge helper
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// ── Apply config to page elements
function applyConfig() {
  const cfg = getConfig();

  // Hero
  _setText('[data-cfg="hero.badge"]',    cfg.hero.badge);
  _setText('[data-cfg="hero.title1"]',   cfg.hero.title1);
  _setText('[data-cfg="hero.title2"]',   cfg.hero.title2);
  _setText('[data-cfg="hero.title3"]',   cfg.hero.title3);
  _setText('[data-cfg="hero.subtitle"]', cfg.hero.subtitle);

  // Stats
  Object.entries(cfg.stats).forEach(([key, s]) => {
    _setText(`[data-cfg="stats.${key}.label"]`, s.label);
    _setText(`[data-cfg="stats.${key}.desc"]`,  s.desc);
    // data-target for counter animation
    const valEl = document.querySelector(`[data-cfg-stat="${key}"]`);
    if (valEl) {
      valEl.dataset.target  = s.value;
      valEl.dataset.suffix  = s.suffix;
    }
  });

  // Stats bar (UHC page)
  _setText('[data-cfg="stats.capaian_uhc.bar"]',  formatStatBar(cfg.stats.capaian_uhc));
  _setText('[data-cfg="stats.peserta.bar"]',       formatStatBar(cfg.stats.peserta));
  _setText('[data-cfg="stats.puskesmas.bar"]',     formatStatBar(cfg.stats.puskesmas));

  // Contact
  const c = cfg.contact;
  _setText('[data-cfg="contact.whatsapp"]',  c.whatsapp);
  _setText('[data-cfg="contact.email"]',     c.email);
  _setText('[data-cfg="contact.instagram"]', c.instagram);
  _setText('[data-cfg="contact.address"]',   c.address);
  _setHref('[data-href="contact.wa"]',       `https://wa.me/${c.wa_number}`);
  _setHref('[data-href="contact.email"]',    `mailto:${c.email}`);
  _setHref('[data-href="contact.ig"]',       c.ig_url);
  _setHref('[data-href="contact.maps"]',     c.maps_url);

  // Announcements (render if container present)
  renderAnnouncements(cfg.announcements);

  // Jam Operasional
  renderJamOps(cfg.jam_ops);

  // Jadwal
  renderJadwal(cfg.jadwal);

  // Dokumen Perizinan
  renderDokumenPerizinan(cfg.dokumen_perizinan, cfg.jadwal_daring);

  // WhatsApp float buttons
  document.querySelectorAll('.whatsapp-float, [data-wa-link]').forEach(el => {
    el.setAttribute('href', `https://wa.me/${c.wa_number}`);
  });

  // Site info
  _setText('[data-cfg="site.tahun"]', cfg.site.tahun);
}

function formatStatBar(s) {
  const v = s.value;
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(2) + ' Jt' + s.suffix;
  if (v >= 1_000)     return v.toLocaleString('id-ID') + s.suffix;
  return v + s.suffix;
}

function _setText(sel, val) {
  document.querySelectorAll(sel).forEach(el => { el.textContent = val; });
}
function _setHref(sel, val) {
  document.querySelectorAll(sel).forEach(el => { el.setAttribute('href', val); });
}

function renderAnnouncements(list) {
  const container = document.getElementById('announcements-container');
  if (!container || !list) return;
  container.innerHTML = list.map((a, i) => `
    <div class="announcement-card ${a.featured ? 'featured' : ''}" id="ann-${i+1}">
      ${a.badge ? `<div class="ann-badge ann-badge-new">${a.badge}</div>` : ''}
      <div class="ann-date"><i class="ph-duotone ph-calendar-blank"></i> ${a.date}</div>
      <h3>${a.title}</h3>
      <p>${a.content}</p>
      <a href="${a.link}" class="ann-link">${a.linkText} <i class="ph ph-arrow-right"></i></a>
    </div>
  `).join('');
}

function renderJamOps(list) {
  document.querySelectorAll('[data-jam-ops]').forEach(container => {
    if (!list) return;
    container.innerHTML = list.map(j => `
      <div class="hour-row ${j.libur ? 'closed' : ''}">
        <span>${j.hari}</span><span>${j.jam}</span>
      </div>
    `).join('');
  });
}

function renderJadwal(jdwl) {
  if (!jdwl) return;
  const zoomContainer = document.getElementById('jadwal-zoom-rows');
  if (zoomContainer) {
    zoomContainer.innerHTML = (jdwl.zoom || []).map(j => `
      <div class="sched-row">
        <div class="sched-day">${j.hari}</div>
        <div class="sched-time">${j.jam}</div>
        <div class="sched-topic">${j.topik}</div>
      </div>
    `).join('');
  }
  const langsungContainer = document.getElementById('jadwal-langsung-rows');
  if (langsungContainer) {
    langsungContainer.innerHTML = (jdwl.langsung || []).map(j => `
      <div class="sched-row">
        <div class="sched-day">${j.hari}</div>
        <div class="sched-time">${j.jam}</div>
        <div class="sched-topic">${j.topik}</div>
      </div>
    `).join('');
  }
  _setText('[data-cfg="jadwal.zoom_note"]',     jdwl.zoom_note || '');
  _setText('[data-cfg="jadwal.langsung_note"]', jdwl.langsung_note || '');
}

// ── Render Dokumen Perizinan cards
function renderDokumenPerizinan(cards, daring) {
  const container = document.getElementById('dokumen-perizinan-container');
  if (!container || !cards) return;

  function itemIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('formulir'))    return 'ph-duotone ph-file-text';
    if (n.includes('persyaratan') || n.includes('syarat')) return 'ph-duotone ph-file-arrow-up';
    if (n.includes('materi'))      return 'ph-duotone ph-notebook';
    if (n.includes('perbaikan') || n.includes('visitasi')) return 'ph-duotone ph-check-circle';
    return 'ph-duotone ph-file-text';
  }

  let daringHtml = '';
  if (daring) {
    const schedItems = (daring.items || []).map(d => `
      <div class="daring-sched-item">
        <div class="daring-sched-label">${d.label}</div>
        <div class="daring-sched-time"><i class="ph-duotone ph-calendar-blank"></i> ${d.jadwal}</div>
      </div>
    `).join('');
    daringHtml = `
      <div class="daring-bar">
        <div class="daring-info">
          <div class="daring-icon"><i class="ph-duotone ph-headset"></i></div>
          <div>
            <h4>Jadwal Konsultasi Daring</h4>
            <p>Layanan konsultasi teknis via Zoom Meeting</p>
          </div>
        </div>
        <div class="daring-schedules">${schedItems}</div>
        <a href="${daring.zoom_link || '#'}" target="_blank" class="daring-join-btn">
          <i class="ph-duotone ph-video-camera"></i> Join Zoom
        </a>
      </div>
    `;
  }

  const cardsHtml = cards.map(card => {
    const catsHtml = (card.categories || []).map(cat => {
      const itemsHtml = (cat.items || []).map(item => `
        <a href="${item.link || '#'}" class="doc-item" target="_blank">
          <i class="${itemIcon(item.name)}"></i>
          <span>${item.name}</span>
        </a>
      `).join('');
      return `
        <div class="doc-category">
          <div class="doc-category-label">${cat.name}</div>
          ${itemsHtml}
        </div>
      `;
    }).join('');
    return `
      <div class="doc-card">
        <div class="doc-card-header">
          <div class="doc-card-icon"><i class="${card.icon || 'ph-duotone ph-folder-open'}"></i></div>
          <h3>${card.title}</h3>
        </div>
        <div class="doc-card-body">
          ${catsHtml}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = daringHtml + '<div class="doc-cards-grid">' + cardsHtml + '</div>';
}
