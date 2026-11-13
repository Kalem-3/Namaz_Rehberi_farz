/* Namaz Rehberi — uygulama: ekranlar, adım geçişleri, ses, ayarlar. */
(() => {
'use strict';
const R = window.REHBER;
const root = document.documentElement;
const app = document.getElementById('uygulama');
const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];
const oku = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } };
const yaz = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- Simgeler ---------- */
const I = {
  geri: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  ileri: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  oynat: '<svg viewBox="0 0 24 24" aria-hidden="true" class="dolu"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  durdur: '<svg viewBox="0 0 24 24" aria-hidden="true" class="dolu"><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>',
  kulak: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="6.5" rx="1.6"/><rect x="16.5" y="14" width="4.5" height="6.5" rx="1.6"/></svg>',
  liste: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1.2" class="dolu"/><circle cx="4.5" cy="12" r="1.2" class="dolu"/><circle cx="4.5" cy="18" r="1.2" class="dolu"/></svg>',
  kapat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  tamam: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  bilgi: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/></svg>',
  buyut: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>'
};
/* Ana sayfa kartlarının resimleri */
const RESIM = {
  abdest: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 18h16a6 6 0 0 1 6 6v3" fill="none" stroke="#c98a2c" stroke-width="5" stroke-linecap="round"/><rect x="10" y="12" width="9" height="12" rx="3" fill="#e2a33f"/><rect x="18" y="9" width="12" height="5" rx="2.5" fill="#c98a2c"/><path d="M36 33c0 0-7 8.5-7 13.2a7 7 0 0 0 14 0C43 41.5 36 33 36 33z" fill="#4aa3c9"/><path d="M33.5 46.5a3 3 0 0 0 2.6 2.6" stroke="#dff2fa" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="36" cy="58" rx="12" ry="2.2" fill="#000" opacity=".08"/></svg>`,
  namaz: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 56V30a16 16 0 0 1 32 0v26z" fill="#2f7a5c"/><path d="M21 56V31a11 11 0 0 1 22 0v25z" fill="#f4ead2"/><path d="M27 56V44a5 5 0 0 1 10 0v12z" fill="#2f7a5c"/><circle cx="32" cy="12" r="2.4" fill="#e2a33f"/><path d="M32 14v2" stroke="#e2a33f" stroke-width="2"/><rect x="11" y="55" width="42" height="4" rx="2" fill="#e2a33f"/></svg>`,
  dualar: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 22c8-3 16-2 24 3v29c-8-5-16-6-24-3z" fill="#f4ead2" stroke="#2f7a5c" stroke-width="3" stroke-linejoin="round"/><path d="M56 22c-8-3-16-2-24 3v29c8-5 16-6 24-3z" fill="#f4ead2" stroke="#2f7a5c" stroke-width="3" stroke-linejoin="round"/><path d="M14 31l12 3M14 38l12 3M38 34l12-3M38 41l12-3" stroke="#8fb9a5" stroke-width="2.4" stroke-linecap="round"/><circle cx="46" cy="11" r="2.6" fill="#e2a33f"/><path d="M50.5 7.5a6 6 0 0 1 0 7M54 5a10 10 0 0 1 0 12" stroke="#e2a33f" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`,
  kaynak: `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="12" width="40" height="42" rx="5" fill="#f4ead2" stroke="#c98a2c" stroke-width="3"/><rect x="9" y="9" width="46" height="8" rx="4" fill="#e2a33f"/><rect x="9" y="50" width="46" height="8" rx="4" fill="#e2a33f"/><path d="M20 26h24M20 33h24M20 40h14" stroke="#8fb9a5" stroke-width="2.6" stroke-linecap="round"/><circle cx="46" cy="44" r="7" fill="#2f7a5c"/><path d="M46 42v6M46 39.6v.1" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>`
};

/* ---------- Ayarlar ---------- */
const OLCEK = [0.9, 1, 1.12, 1.25, 1.4];
const A = {
  cins: root.dataset.cins === 'kadin' ? 'kadin' : 'erkek',
  tema: root.dataset.tema === 'gunduz' ? 'gunduz' : 'gece',
  yazi: Math.max(0, Math.min(4, parseInt(oku('namaz_yazi', '1'), 10) || 0)),
  arapca: oku('namaz_arapca', 'goster') !== 'gizle'
};
function ayarUygula() {
  root.dataset.cins = A.cins;
  root.dataset.tema = A.tema;
  root.dataset.arapca = A.arapca ? 'goster' : 'gizle';
  root.style.setProperty('--olcek', OLCEK[A.yazi]);
  $('meta[name=theme-color]').content = A.tema === 'gunduz' ? '#f5f0e3' : '#131b2c';
  yaz('namaz_gender', A.cins); yaz('namaz_tema3', A.tema); yaz('namaz_yazi', String(A.yazi));
  yaz('namaz_arapca', A.arapca ? 'goster' : 'gizle');
}
ayarUygula();
const cinsAdi = () => A.cins === 'kadin' ? 'Bacı' : 'Er';

/* ---------- Ses ----------
   Tek bir ses çalar kullanılır; dosya yalnızca düğmeye basılınca indirilir.
   Hangi kaydın var olduğu veri.js'teki OKUNUS_SESLERI / ANLAM_SESLERI listelerinde yazılıdır. */
const Ses = (() => {
  const el = new Audio();
  el.preload = 'none';
  let aktif = null, kuyruk = [];
  const yol = k => `assets/ses/${k}.mp3`;
  function baslat(k) { aktif = k; el.src = yol(k); el.play().catch(() => {}); guncelle(); }
  function cal(k, sonrakiler = []) {
    if (aktif === k && el.src) { el.paused ? el.play() : el.pause(); return; }
    kuyruk = sonrakiler.slice();
    baslat(k);
  }
  function dur() { el.pause(); aktif = null; kuyruk = []; guncelle(); }
  function guncelle() {
    const calis = !!aktif && !el.paused;
    $$('[data-ses]').forEach(b => {
      const on = b.dataset.ses === aktif;
      b.classList.toggle('caliyor', on && calis);
      b.setAttribute('aria-pressed', String(on && calis));
      if (!on) b.style.setProperty('--p', '0%');
      if (b.matches('.dinle') && b.querySelector('span')) b.querySelector('span').textContent = on && calis ? 'Durdur' : 'Dinle';
    });
    $$('[data-ses-hap]').forEach(b => b.closest('.hap').classList.toggle('caliyor', calis && b.dataset.sesHap === aktif));
    $$('[data-ses-hepsi]').forEach(b => {
      const liste = b.dataset.sesHepsi.split(',');
      const on = calis && liste.includes(aktif) && (kuyruk.length > 0 || liste[liste.length - 1] === aktif);
      b.classList.toggle('caliyor', on);
      b.querySelector('span').textContent = on ? 'Durdur' : 'Sırayla dinle';
    });
    $$('.dua').forEach(k => {
      const okunus = calis && aktif === sesYolu('okunus', k.dataset.dua);
      const anlam = calis && aktif === sesYolu('anlam', k.dataset.dua);
      k.classList.toggle('okunuyor', okunus || anlam);
      k.querySelector('.okunus')?.classList.toggle('okunuyor', okunus);
      k.querySelector('.anlam')?.classList.toggle('okunuyor', anlam);
    });
  }
  el.addEventListener('play', guncelle);
  el.addEventListener('pause', guncelle);
  el.addEventListener('ended', () => {
    if (kuyruk.length) { const n = kuyruk.shift(); setTimeout(() => baslat(n), 450); }
    else { aktif = null; guncelle(); }
  });
  el.addEventListener('timeupdate', () => {
    const p = el.duration ? (el.currentTime / el.duration * 100) : 0;
    $$(`[data-ses="${aktif}"]`).forEach(b => b.style.setProperty('--p', p + '%'));
  });
  function hazirla() { guncelle(); }
  function hepsi(liste) {
    if (aktif && liste.includes(aktif) && !el.paused) { dur(); return; }
    cal(liste[0], liste.slice(1));
  }
  return { cal, dur, hazirla, hepsi, guncelle };
})();

/* ---------- Ortak parçalar ---------- */
function cinsSecici(kucuk = false) {
  return `<div class="cins ${kucuk ? 'kucuk' : ''}" role="group" aria-label="Görünüm">
    <button type="button" data-cins="erkek" aria-pressed="${A.cins === 'erkek'}">Er</button>
    <button type="button" data-cins="kadin" aria-pressed="${A.cins === 'kadin'}">Bacı</button>
  </div>`;
}
function ustCubuk({ geri, ust, alt, ayar = true }) {
  return `<header class="ust-cubuk">
    <a class="yuvarlak" href="${geri}" aria-label="Geri">${I.geri}</a>
    <div class="ust-orta"><small>${esc(ust)}</small>${alt ? `<b>${esc(alt)}</b>` : ''}</div>
    <div class="ust-sag">${cinsSecici(true)}${ayar ? `<button type="button" class="yuvarlak aa" data-ac="ayarlar" aria-label="Görünüm ayarları">Aa</button>` : ''}</div>
  </header>`;
}
/* Kaydın yolu: tur 'okunus' (Arapça) ya da 'anlam' (Türkçe).
   Er görünümünde er sesi, Bacı görünümünde bacı sesi; biri yoksa diğeri, ikisi de yoksa null. */
function sesYolu(tur, k) {
  const L = (tur === 'okunus' ? R.OKUNUS_SESLERI : R.ANLAM_SESLERI) || {};
  const sira = A.cins === 'kadin' ? ['baci', 'er'] : ['er', 'baci'];
  const c = sira.find(x => (L[x] || []).includes(k));
  return c ? `${tur}/${c}/${k}` : null;
}
function dinleDugmesi(tur, k, kisa = false) {
  const yol = sesYolu(tur, k);
  if (!yol) return '';
  const ne = tur === 'okunus' ? 'Okunuşunu' : 'Anlamını';
  return `<button type="button" class="dinle ${kisa ? 'kisa' : ''}" data-ses="${yol}" aria-label="${ne} dinle">${I.oynat}${I.durdur}${kisa ? '' : '<span>Dinle</span>'}</button>`;
}
function satirlar(dizi, cls) { return dizi.map(s => `<span class="${cls}">${esc(s)}</span>`).join(''); }

function duaKarti(k) {
  const d = R.DUALAR[k];
  const amin = d.amin ? `<div class="amin">
      <span class="amin-ok">${esc(d.amin.ok)}</span>
      <span class="amin-an">${esc(d.amin.an)}</span>
      <span class="amin-ar" lang="ar" dir="rtl">${d.amin.ar}</span>
      <p>${esc(d.amin.not)}</p>
    </div>` : '';
  return `<article class="dua" id="dua-${k}" data-dua="${d.ses}">
    <header class="dua-bas">
      <h3>${esc(d.ad)}</h3>
      ${d.tekrar ? `<span class="rozet">${esc(d.tekrar)}</span>` : ''}
    </header>
    <div class="okunus"><div class="etiket-satir"><small class="dua-etiket">Okunuşu</small>${dinleDugmesi('okunus', d.ses)}</div>${satirlar(d.ok, 'okunus-satir')}</div>
    <div class="anlam"><div class="etiket-satir"><small class="dua-etiket">Anlamı</small>${dinleDugmesi('anlam', d.ses)}</div>${satirlar(d.an, 'anlam-satir')}${d.kaynak ? `<small class="kaynak">${esc(d.kaynak)}</small>` : ''}</div>
    <div class="arapca"><small class="dua-etiket">Arapçası</small><div lang="ar" dir="rtl">${satirlar(d.ar, 'arapca-satir')}</div></div>
    ${amin}
    ${d.not ? `<p class="dua-not">${esc(d.not)}</p>` : ''}
  </article>`;
}
function kisaSoz(k) {
  const d = R.DUALAR[k];
  return `<div class="kisa-soz">
    <div><b class="kisa-okunus">${esc(d.ok.join(' '))}${dinleDugmesi('okunus', k, true)}</b><span class="kisa-anlam">${esc(d.an.join(' '))}${dinleDugmesi('anlam', k, true)}</span></div>
    <span class="kisa-ar" lang="ar" dir="rtl">${d.ar.join(' ')}</span>
  </div>`;
}
/* Dua hapı: dokununca karta gider; okunuş kaydı varsa çalar */
function hap(k) {
  const yol = sesYolu('okunus', R.DUALAR[k].ses);
  return `<span class="hap ${yol ? 'sesli' : ''}" role="listitem"><button type="button" data-git="dua-${k}" ${yol ? `data-ses-hap="${yol}"` : ''}>`;
}
function soyleBolumu(dualar, { duaYok, kisaTekbir = true } = {}) {
  const tam = dualar.filter(k => !(kisaTekbir && k === 'tekbir'));
  if (!tam.length) return duaYok ? `<section class="soyle"><h2 class="bolum-baslik">Ne söylüyorum?</h2><p class="bos-not">${esc(duaYok)}</p></section>` : '';
  const sesler = tam.map(k => sesYolu('okunus', R.DUALAR[k].ses)).filter(Boolean);
  return `<section class="soyle">
    <div class="bolum-ust"><h2 class="bolum-baslik">Ne söylüyorum?</h2>
      ${tam.length > 1 ? `<button type="button" class="hepsini-dinle" data-ses-hepsi="${sesler.join(',')}" ${sesler.length < 2 ? 'hidden' : ''}>${I.kulak}<span>Sırayla dinle</span></button>` : ''}
    </div>
    ${tam.length > 1 ? `<div class="hap-satir" role="list">${tam.map((k, i) => `${hap(k)}<i>${I.oynat}</i>${i + 1}. ${esc(R.DUALAR[k].ad)}</button></span>`).join('')}</div>` : ''}
    ${tam.map(k => duaKarti(k)).join('')}
  </section>`;
}
function bilgiKutusu(metin) {
  if (!metin) return '';
  if (metin.length > 170) return `<details class="bilgi"><summary>${I.bilgi}<span>Bilmekte fayda var</span></summary><p>${esc(metin)}</p></details>`;
  return `<div class="bilgi acik">${I.bilgi}<p>${esc(metin)}</p></div>`;
}
function abdestKaresi(n) {
  return `<span class="kare" style="--x:${(n % 3) * 50}%;--y:${Math.floor(n / 3) * 100 / 3}%"></span>`;
}

/* Akış: 'abdest' ya da bir vaktin kimliği (sabah, ogle, ikindi, aksam, yatsi) */
const VAKIT = Object.fromEntries(R.VAKITLER.map(v => [v.id, v]));
function akis(tur) {
  if (tur === 'abdest') return { liste: R.ABDEST, ad: 'Abdest', vakit: null };
  const v = VAKIT[tur];
  return v ? { liste: v.adimlar, ad: `${v.ad} Namazı`, vakit: v } : null;
}
function vakitKartlari() {
  return R.VAKITLER.map(v => `<a class="rekat-kart v-${v.id}" href="#/${v.id}">
      <div><b>${esc(v.ad)} Namazı</b><span class="cipler"><span>${v.rekat} rekât farz</span><span>${v.adimlar.length} adım</span></span></div>
      <div class="sayi"><strong>${v.rekat}</strong><span>rekât</span></div>
    </a>`).join('');
}

/* ---------- Ekranlar ---------- */
function anaSayfa() {
  const devam = (() => {
    const son = oku('namaz_son', '');
    const ak = akis(son);
    const n = parseInt(oku('namaz_son_' + son, ''), 10);
    if (!ak || !(n > 0) || !ak.liste[n]) return null;
    return { href: `#/${son}/${n + 1}`, ad: ak.ad, adim: `Adım ${n + 1} / ${ak.liste.length} · ${ak.liste[n].ad}` };
  })();
  return `<main class="ekran ana" id="icerik">
    <header class="ana-bas">
      <div><h1 class="dev-baslik">Namaz Rehberi</h1><p class="altin-alt">Adım Adım Öğrenin</p></div>
      ${cinsSecici()}
    </header>

    <a class="karsilama" href="${devam ? devam.href : '#/abdest'}">
      <span class="figur" aria-hidden="true"></span>
      <span class="karsilama-yazi">
        ${devam
          ? `<small>Kaldığınız yerden devam edin</small><b>${esc(devam.ad)}</b><span>${esc(devam.adim)}</span>`
          : `<small>Namaz kılmayı öğrenirken</small><b>Önce abdest, sonra beş vaktin farzı</b><span>Duruş fotoğrafları, okunuşlar ve sesli dualarla.</span>`}
        <em class="dugme-altin">${devam ? 'Devam et' : 'Başla'} ${I.ileri}</em>
      </span>
    </a>

    <p class="bolum-etiket">5 Vakit Farz</p>
    ${vakitKartlari()}

    <p class="bolum-etiket">Rehber</p>
    <div class="izgara">
      <a class="karo" href="#/abdest">${RESIM.abdest}<b>Abdest</b><span>Önce hazırlık · ${R.ABDEST.length} aşama</span></a>
      <a class="karo" href="#/namaz">${RESIM.namaz}<b>Namazlar</b><span>5 vaktin farzı</span></a>
      <a class="karo" href="#/dualar">${RESIM.dualar}<b>Sure ve Dualar</b><span>${R.DUA_SIRASI.length} okuma · sesli</span></a>
      <a class="karo" href="#/kaynaklar">${RESIM.kaynak}<b>Kaynaklar</b><span>Hanefî usulü · Diyanet</span></a>
    </div>

    <section class="cam-kart">
      <h2>Rehberden nasıl yararlanabilirsiniz?</h2>
      <p>Bu rehberi, namaz kılmayı öğrenmek veya bildiklerini hatırlamak isteyenlere yardımcı olması niyetiyle hazırladık. Burada beş vaktin farz namazları yer alır. Her adımda önce duruş fotoğrafı ve <b>Ne yapıyorum?</b> açıklaması, ardından <b>Ne söylüyorum?</b> bölümünde okunacak dualar yer alır.</p>
      <p>Er veya bacı görünümünü üstteki düğmeden seçebilirsiniz. Fotoğraflara dokunarak büyütebilir, ekranı sağa sola kaydırarak adımlar arasında geçebilirsiniz.</p>
      <p class="soluk">Türkiye’de bu usulle namaz kılındığı için rehberimiz, İmam-ı Âzam Ebû Hanîfe Efendimizin usulüne göre hazırlanmıştır.</p>
    </section>
  </main>`;
}

function vakitListesi() {
  return `<main class="ekran" id="icerik">
    ${ustCubuk({ geri: '#/', ust: 'Namaz Rehberi', alt: '' })}
    <div class="giris-bas"><h1 class="dev-baslik">Namazlar</h1><p class="altin-alt">Beş vaktin farzı</p></div>
    ${vakitKartlari()}
    <section class="cam-kart"><p class="soluk">Bu bölüm, namazı tek başına kılan kişi için hazırlanmıştır. İmama uyulduğunda kıraat uygulaması farklıdır.</p></section>
  </main>`;
}

function namazGiris(v) {
  const gruplar = Array.from({ length: v.rekat }, (_, k) => k + 1).map(r => {
    const adimlar = v.adimlar.map((s, i) => ({ s, i })).filter(x => x.s.rekat === r);
    const kisa = [...new Set(adimlar.map(x => x.s.kisa))];
    return `<a class="rekat-kart r${r}" href="#/${v.id}/${adimlar[0].i + 1}">
      <div><b>${r}. Rekât</b><span class="cipler">${kisa.map(k => `<span>${esc(k)}</span>`).join('')}</span></div>
      <div class="sayi"><strong>${adimlar.length}</strong><span>adım</span></div>
    </a>`;
  }).join('');
  const sureNotu = v.rekat > 2 ? `<p>1. ve 2. rekâtlarda Fâtiha'dan sonra sûre okunur; ${v.rekat === 3 ? '3. rekâtta' : '3. ve 4. rekâtlarda'} Fâtiha'dan sonra sûre okunmaz.</p>` : '';
  return `<main class="ekran" id="icerik">
    ${ustCubuk({ geri: '#/namaz', ust: 'Namazlar', alt: '' })}
    <div class="giris-bas"><h1 class="dev-baslik">${esc(v.ad)} Namazı</h1><p class="altin-alt">${v.rekat} rekât farz</p></div>
    <section class="niyet-kart"><small>Niyet</small><p>“${esc(v.adimlar[0].niyet)}”</p></section>
    ${gruplar}
    <a class="dugme-altin genis" href="#/${v.id}/1">Adım adım başla ${I.ileri}</a>
    <section class="cam-kart">
      <p>Farz, Allah'ın kesin olarak emrettiği, kılınması zorunlu namazdır.</p>
      ${sureNotu}
      <p class="soluk">Bu bölüm, namazı tek başına kılan kişi için hazırlanmıştır. İmama uyulduğunda kıraat uygulaması farklıdır.</p>
    </section>
  </main>`;
}

function abdestGiris() {
  return `<main class="ekran" id="icerik">
    ${ustCubuk({ geri: '#/', ust: 'Namaz Rehberi', alt: '' })}
    <div class="giris-bas"><h1 class="dev-baslik">Abdest</h1><p class="altin-alt">Namazdan önce · ${cinsAdi()} görünümü</p></div>
    <section class="kart"><h2 class="kart-baslik">Başlamadan önce</h2><p>${esc(R.ABDEST_GIRIS)}</p></section>
    <section class="kart"><h2 class="kart-baslik">Abdestin dört farzı</h2>
      <div class="cipler koyu"><span>Yüzü yıkamak</span><span>Kolları dirseklerle yıkamak</span><span>Başın dörtte birini mesh etmek</span><span>Ayakları topuklarla yıkamak</span></div>
      <p class="soluk kucuk-yazi">${esc(R.ABDEST_FARZ)}</p>
    </section>
    <p class="bolum-etiket">${R.ABDEST.length} aşama</p>
    <div class="abdest-izgara">
      ${R.ABDEST.map((s, i) => `<a href="#/abdest/${i + 1}" class="${s.farz ? 'farz' : ''}">${abdestKaresi(s.tile)}<span><b>${i + 1}</b>${esc(s.ad)}</span></a>`).join('')}
    </div>
    <a class="dugme-altin genis" href="#/abdest/1">Adım adım başla ${I.ileri}</a>
  </main>`;
}

function adimEkrani(tur, i) {
  const ak = akis(tur);
  const namaz = !!ak.vakit;
  const liste = ak.liste;
  const s = liste[i];
  const toplam = liste.length;
  const son = i === toplam - 1;
  const ust = namaz ? `${s.rekat}. Rekât` : 'Abdest';
  const yuzde = ((i + 1) / toplam) * 100;
  return `<div class="ekran adim-ekran" id="icerik">
    ${ustCubuk({ geri: `#/${tur}`, ust: namaz ? ak.ad : 'Namaz Rehberi', alt: ust })}
    <button type="button" class="ilerleme" data-ac="adimlar" aria-label="Adım listesini aç">
      <span class="ilerleme-yazi">Adım ${i + 1} / ${toplam}</span>
      <span class="ilerleme-cubuk"><i style="width:${yuzde}%"></i></span>
      ${I.liste}
    </button>
    <article class="adim" data-yon="">
      ${namaz ? namazAdimi(ak.vakit, s) : abdestAdimi(s)}
    </article>
    <nav class="alt-cubuk" aria-label="Adımlar arası geçiş">
      <a class="yuvarlak buyuk ${i === 0 ? 'pasif' : ''}" href="#/${tur}/${Math.max(1, i)}" aria-label="Önceki adım" ${i === 0 ? 'aria-disabled="true" tabindex="-1"' : ''}>${I.geri}</a>
      <a class="dugme-altin sonraki" href="#/${tur}/${son ? 'bitti' : i + 2}">${son ? `Tamamla ${I.tamam}` : `Sonraki adım ${I.ileri}`}</a>
    </nav>
  </div>`;
}

function namazAdimi(v, s) {
  const c = A.cins;
  const ana = R.foto(v, c, s.rekat, s.poz);
  const yakin = R.yakinlar(v, c, s);
  const tekbirKisa = s.dualar.includes('tekbir') && s.poz !== 'tekbir';
  return `
    <h1 class="adim-baslik" tabindex="-1">${esc(s.ad)}</h1>
    <figure class="foto-kart">
      <button type="button" class="foto-ana" data-buyut="${esc(ana)}" data-baslik="${esc(s.ad)}">
        <img src="${esc(ana)}" alt="${esc(s.ad)} — ${cinsAdi()} görünümü" decoding="async">
        <span class="buyut-ipucu">${I.buyut}</span>
      </button>
      ${yakin.length ? `<div class="yakin-serit">${yakin.map(([src, b, t]) => {
        return `<button type="button" class="yakin" data-buyut="${esc(src)}" data-baslik="${esc(b)}"><img src="${esc(src)}" alt="" loading="lazy" decoding="async"><span><b>${esc(b)}</b>${esc(t)}</span></button>`;
      }).join('')}</div>` : ''}
    </figure>
    ${s.niyet ? `<section class="niyet-kart"><small>Niyet</small><p>“${esc(s.niyet)}”</p></section>` : ''}
    <section class="kart">
      <h2 class="kart-baslik">Ne yapıyorum?</h2>
      <p>${esc(s.yap.ortak)}</p>
      ${s.yap[c] ? `<p class="cins-not">${esc(s.yap[c])}</p>` : ''}
      ${tekbirKisa ? kisaSoz('tekbir') : ''}
    </section>
    ${bilgiKutusu(s.niyet ? '' : s.bilgi)}
    ${soyleBolumu(s.dualar, { duaYok: s.duaYok, kisaTekbir: tekbirKisa })}
  `;
}

function abdestAdimi(s) {
  return `
    <h1 class="adim-baslik" tabindex="-1">${esc(s.ad)}</h1>
    <figure class="foto-kart">
      <button type="button" class="foto-ana kareli" data-kare="${s.tile}" data-baslik="${esc(s.ad)}" aria-label="${esc(s.ad)} — büyüt">
        ${abdestKaresi(s.tile)}<span class="buyut-ipucu">${I.buyut}</span>
      </button>
      <div class="yakin-serit">
        <button type="button" class="yakin" data-kare="${s.zoom ?? s.tile}" data-baslik="${esc(s.detay)}">${abdestKaresi(s.zoom ?? s.tile)}<span><b>${esc(s.detay)}</b>${esc(s.not)}</span></button>
      </div>
    </figure>
    <div class="cipler rozetler"><span>${esc(s.sayi)}</span><span class="${s.farz ? 'farz' : ''}">${esc(s.tur)}</span></div>
    <section class="kart"><h2 class="kart-baslik">Ne yapıyorum?</h2><p>${esc(s.metin)}</p></section>
    ${s.dua ? soyleBolumu([s.dua], { kisaTekbir: false }) : ''}
  `;
}

function bitti(tur) {
  const ak = akis(tur);
  const namaz = !!ak.vakit;
  const sonraki = namaz ? R.VAKITLER[R.VAKITLER.indexOf(ak.vakit) + 1] : null;
  return `<main class="ekran bitti" id="icerik">
    ${ustCubuk({ geri: `#/${tur}`, ust: ak.ad, alt: '', ayar: false })}
    <div class="bitti-kutu">
      <span class="bitti-isaret">${I.tamam}</span>
      <h1 class="dev-baslik">${namaz ? `${esc(ak.vakit.ad)} namazı tamamlandı` : 'Abdest tamamlandı'}</h1>
      <p>${namaz ? `${esc(ak.vakit.ad)} namazının farzının bütün adımlarını incelediniz. Allah kabul etsin.` : 'Abdest adımlarını tamamladınız. Şimdi bir vakit seçerek farz namazın kılınışını adım adım inceleyebilirsiniz.'}</p>
      ${namaz
        ? (sonraki ? `<a class="dugme-altin genis" href="#/${sonraki.id}">${esc(sonraki.ad)} namazına geç ${I.ileri}</a>` : `<a class="dugme-altin genis" href="#/dualar">Duaları tekrar dinle ${I.ileri}</a>`)
        : `<a class="dugme-altin genis" href="#/namaz">Namaza geç ${I.ileri}</a>`}
      <a class="dugme-cam genis" href="#/${tur}/1">Baştan incele</a>
      <a class="dugme-cam genis" href="#/">Ana sayfa</a>
    </div>
  </main>`;
}

function dualarSayfasi() {
  return `<main class="ekran" id="icerik">
    ${ustCubuk({ geri: '#/', ust: 'Namaz Rehberi', alt: '' })}
    <div class="giris-bas"><h1 class="dev-baslik">Sure ve Dualar</h1><p class="altin-alt">Namazda okunanlar · okunuş, anlam ve ses</p></div>
    <div class="hap-satir yapiskan" role="list">${R.DUA_SIRASI.map(k => `${hap(k)}<i>${I.oynat}</i>${esc(R.DUALAR[k].ad)}</button></span>`).join('')}</div>
    ${R.DUA_SIRASI.map(k => duaKarti(k)).join('')}
  </main>`;
}

function kaynaklar() {
  return `<main class="ekran" id="icerik">
    ${ustCubuk({ geri: '#/', ust: 'Namaz Rehberi', alt: '', ayar: false })}
    <div class="giris-bas"><h1 class="dev-baslik">Kaynaklar</h1><p class="altin-alt">Rehberin dayandığı kaynaklar</p></div>
    <section class="kart"><p>${esc(R.KAYNAK_NOTU)}</p><p class="soluk">Türkiye’de bu usulle namaz kılındığı için rehberimiz, İmam-ı Âzam Ebû Hanîfe Efendimizin usulüne göre hazırlanmıştır.</p></section>
    <section class="kart"><h2 class="kart-baslik">Bağlantılar</h2>
      <ul class="baglantilar">${R.KAYNAKLAR.map(([ad, url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener">${esc(ad)}${I.ileri}</a></li>`).join('')}</ul>
    </section>
    <section class="kart"><h2 class="kart-baslik">Abdestin farzları</h2><p>${esc(R.ABDEST_FARZ)}</p></section>
  </main>`;
}

/* ---------- Alt pencereler ---------- */
const pencere = document.createElement('dialog');
pencere.className = 'pencere';
document.body.append(pencere);
function pencereAc(icerik, cls = '') {
  pencere.className = 'pencere ' + cls;
  pencere.innerHTML = icerik;
  pencere.showModal();
  requestAnimationFrame(() => pencere.classList.add('acik'));
}
function pencereKapat() {
  if (!pencere.open) return;
  pencere.classList.remove('acik');
  setTimeout(() => pencere.close(), 220);
}
pencere.addEventListener('click', e => {
  if (e.target === pencere || e.target.closest('[data-kapat]')) pencereKapat();
});
pencere.addEventListener('cancel', e => { e.preventDefault(); pencereKapat(); });

function ayarlarPenceresi() {
  pencereAc(`<div class="sayfa-tutamak"></div>
    <header class="pencere-bas"><h2>Görünüm</h2><button type="button" class="yuvarlak" data-kapat aria-label="Kapat">${I.kapat}</button></header>
    <div class="ayar-satir"><span>Duruş fotoğrafları</span>${cinsSecici()}</div>
    <div class="ayar-satir"><span>Tema</span><div class="cins" role="group" aria-label="Tema">
      <button type="button" data-tema="gece" aria-pressed="${A.tema === 'gece'}">Gece</button>
      <button type="button" data-tema="gunduz" aria-pressed="${A.tema === 'gunduz'}">Gündüz</button></div></div>
    <div class="ayar-satir"><span>Yazı boyutu</span><div class="yazi-ayar">
      <button type="button" data-yazi="-1" aria-label="Yazıyı küçült" ${A.yazi === 0 ? 'disabled' : ''}>A−</button>
      <output>${Math.round(OLCEK[A.yazi] * 100)}%</output>
      <button type="button" data-yazi="1" aria-label="Yazıyı büyüt" ${A.yazi === 4 ? 'disabled' : ''}>A+</button></div></div>
    <label class="ayar-satir"><span>Arapça metni göster</span><input type="checkbox" role="switch" data-anahtar="arapca" ${A.arapca ? 'checked' : ''}></label>`, 'alt');
}
function adimlarPenceresi(tur, aktif) {
  const ak = akis(tur);
  const namaz = !!ak.vakit;
  const liste = ak.liste;
  let grup = null;
  const satir = liste.map((s, i) => {
    let bas = '';
    if (namaz && s.rekat !== grup) { grup = s.rekat; bas = `<li class="grup">${grup}. Rekât</li>`; }
    return `${bas}<li><a href="#/${tur}/${i + 1}" data-kapat class="${i === aktif ? 'aktif' : i < aktif ? 'gecti' : ''}"><span class="no">${i < aktif ? I.tamam : i + 1}</span>${esc(s.ad)}</a></li>`;
  }).join('');
  pencereAc(`<div class="sayfa-tutamak"></div>
    <header class="pencere-bas"><h2>${esc(ak.ad)}</h2><button type="button" class="yuvarlak" data-kapat aria-label="Kapat">${I.kapat}</button></header>
    <ol class="adim-liste">${satir}</ol>`, 'alt');
  $('.adim-liste .aktif', pencere)?.scrollIntoView({ block: 'center' });
}
function buyutPenceresi(baslik, icerik) {
  pencereAc(`<header class="pencere-bas"><h2>${esc(baslik)}</h2><button type="button" class="yuvarlak" data-kapat aria-label="Kapat">${I.kapat}</button></header>
    <div class="buyuk-gorsel">${icerik}</div>
    <p class="pencere-not">Sağ ve sol yönleri, namaz kılan ya da abdest alan kişinin kendi sağı ve soludur.</p>`, 'buyutme');
}

/* ---------- Yönlendirme ---------- */
let onceki = { tur: '', i: -1 };
let ilkCizim = true;
function cozumle() {
  const p = location.hash.replace(/^#\/?/, '').split('/');
  const tur = p[0] || '';
  const ak = akis(tur);
  if (ak) {
    if (p[1] === 'bitti') return { tur, bitti: true };
    const n = parseInt(p[1], 10);
    if (n >= 1) return { tur, i: Math.min(n, ak.liste.length) - 1 };
    return { tur };
  }
  if (tur === 'namaz' || tur === 'dualar' || tur === 'kaynaklar') return { tur };
  return { tur: '' };
}
function ciz(animasyon = true) {
  const r = cozumle();
  Ses.dur();
  let html;
  if (r.bitti) html = bitti(r.tur);
  else if (r.i !== undefined) html = adimEkrani(r.tur, r.i);
  else if (r.tur === 'namaz') html = vakitListesi();
  else if (VAKIT[r.tur]) html = namazGiris(VAKIT[r.tur]);
  else if (r.tur === 'abdest') html = abdestGiris();
  else if (r.tur === 'dualar') html = dualarSayfasi();
  else if (r.tur === 'kaynaklar') html = kaynaklar();
  else html = anaSayfa();

  const ayniAkis = r.i !== undefined && onceki.tur === r.tur && onceki.i >= 0;
  /* İlk açılışta animasyon yok: sayfa hemen tam görünür */
  const yon = ilkCizim ? '' : ayniAkis ? (r.i > onceki.i ? 'ileri' : r.i < onceki.i ? 'geri' : '') : 'yeni';
  ilkCizim = false;
  app.innerHTML = html;
  if (animasyon && yon) {
    const hedef = ayniAkis ? $('.adim', app) : $('.ekran', app);
    hedef?.classList.add('gir-' + yon);
  }
  if (r.i !== undefined) {
    yaz('namaz_son', r.tur);
    yaz('namaz_son_' + r.tur, String(r.i));
    onPreload(r.tur, r.i + 1);
  }
  if (r.bitti) { yaz('namaz_son', ''); }
  onceki = { tur: r.tur, i: r.i ?? -1 };
  Ses.hazirla(app);
  if (animasyon) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    ($('.adim-baslik', app) || null)?.focus({ preventScroll: true });
  }
  document.title = (akis(r.tur) ? akis(r.tur).ad + ' · ' : r.tur === 'namaz' ? 'Namazlar · ' : r.tur === 'dualar' ? 'Dualar · ' : '') + 'Namaz Rehberi';
}
function onPreload(tur, i) {
  const v = VAKIT[tur];
  if (!v || !v.adimlar[i]) return;
  const s = v.adimlar[i];
  const img = new Image();
  img.src = R.foto(v, A.cins, s.rekat, s.poz);
}
window.addEventListener('hashchange', () => { pencereKapat(); ciz(); });

/* ---------- Etkileşim ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const cins = t.closest('button[data-cins]');
  if (cins) {
    A.cins = cins.dataset.cins; ayarUygula();
    $$('button[data-cins]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cins === A.cins)));
    const y = scrollY; ciz(false); window.scrollTo({ top: y, behavior: 'instant' });
    return;
  }
  const tema = t.closest('button[data-tema]');
  if (tema) {
    A.tema = tema.dataset.tema; ayarUygula();
    $$('button[data-tema]', pencere).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tema === A.tema)));
    return;
  }
  const yazi = t.closest('[data-yazi]');
  if (yazi) {
    A.yazi = Math.max(0, Math.min(4, A.yazi + Number(yazi.dataset.yazi))); ayarUygula();
    $('output', pencere).textContent = Math.round(OLCEK[A.yazi] * 100) + '%';
    $$('[data-yazi]', pencere).forEach(b => b.disabled = (b.dataset.yazi === '-1' && A.yazi === 0) || (b.dataset.yazi === '1' && A.yazi === 4));
    return;
  }
  const ac = t.closest('[data-ac]');
  if (ac) {
    if (ac.dataset.ac === 'ayarlar') ayarlarPenceresi();
    if (ac.dataset.ac === 'adimlar') { const r = cozumle(); adimlarPenceresi(r.tur, r.i); }
    return;
  }
  const ses = t.closest('[data-ses]');
  if (ses) { Ses.cal(ses.dataset.ses); return; }
  const hepsi = t.closest('[data-ses-hepsi]');
  if (hepsi) {
    Ses.hepsi(hepsi.dataset.sesHepsi.split(','));
    return;
  }
  const git = t.closest('[data-git]');
  if (git) {
    const hedef = document.getElementById(git.dataset.git);
    if (git.closest('.hap')?.classList.contains('sesli')) Ses.cal(git.dataset.sesHap);
    hedef?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  const buyut = t.closest('[data-buyut]');
  if (buyut) { buyutPenceresi(buyut.dataset.baslik, `<img src="${esc(buyut.dataset.buyut)}" alt="${esc(buyut.dataset.baslik)}">`); return; }
  const kare = t.closest('[data-kare]');
  if (kare) { buyutPenceresi(kare.dataset.baslik, abdestKaresi(Number(kare.dataset.kare))); return; }
  const pasif = t.closest('.pasif');
  if (pasif) e.preventDefault();
});
document.addEventListener('change', e => {
  const k = e.target.dataset?.anahtar;
  if (!k) return;
  A[k] = e.target.checked; ayarUygula();
});
/* Klavye: sol/sağ ok ile adım değiştirme */
document.addEventListener('keydown', e => {
  if (pencere.open || e.altKey || e.ctrlKey || e.metaKey) return;
  if (/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName)) return;
  if (e.key === 'ArrowRight') $('.alt-cubuk .sonraki')?.click();
  if (e.key === 'ArrowLeft') { const g = $('.alt-cubuk .yuvarlak'); if (g && !g.classList.contains('pasif')) g.click(); }
});

/* Dokunmatik: sağa/sola kaydırarak adım değiştirme */
let dokun = null;
app.addEventListener('touchstart', e => {
  if (!$('.adim-ekran', app) || e.touches.length > 1) { dokun = null; return; }
  if (e.target.closest('.yakin-serit,.hap-satir,.arapca,.ust-cubuk,.alt-cubuk')) { dokun = null; return; }
  dokun = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
}, { passive: true });
app.addEventListener('touchend', e => {
  if (!dokun) return;
  const dx = e.changedTouches[0].clientX - dokun.x, dy = e.changedTouches[0].clientY - dokun.y;
  const hizli = Date.now() - dokun.t < 600;
  dokun = null;
  if (!hizli || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
  if (dx < 0) $('.alt-cubuk .sonraki')?.click();
  else { const g = $('.alt-cubuk .yuvarlak'); if (g && !g.classList.contains('pasif')) g.click(); }
}, { passive: true });

ciz();
})();
