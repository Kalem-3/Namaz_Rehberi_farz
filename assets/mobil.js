/* Namaz Rehberi — okuma kolaylığı ve telefon düzeni:
   yazı boyutu, satır satır dualar, "Ne yapıyorum / Ne söylüyorum" kutuları,
   kısa sözlerin kartları, telefonda kaydırarak adım değiştirme ve küçülen konum çubuğu. */
(()=>{'use strict';
const root=document.documentElement;
const oku=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}};
const yaz=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};

/* ---------- Yazı boyutu ---------- */
const OLCEK=['0.9','1','1.12','1.25','1.4'];
function yaziUygula(i){i=Math.max(0,Math.min(OLCEK.length-1,i));root.style.setProperty('--yazi',OLCEK[i]);root.dataset.yazi=String(i);yaz('namaz_yazi',String(i));
  document.querySelectorAll('[data-yazi-btn]').forEach(b=>b.disabled=(b.dataset.yaziBtn==='-'&&i===0)||(b.dataset.yaziBtn==='+'&&i===OLCEK.length-1));
  const g=document.querySelector('.yazi-gosterge');if(g)g.textContent=Math.round(OLCEK[i]*100)+'%';}
const panel=document.querySelector('.gorunum-panel');
if(panel&&document.querySelector('.recite')){
  const d=document.createElement('div');d.className='yazi-ayar';
  d.innerHTML='<h2>Yazı boyutu</h2><div class="yazi-satir"><button type="button" data-yazi-btn="-" aria-label="Yazıyı küçült">A−</button><span class="yazi-gosterge" aria-live="polite"></span><button type="button" data-yazi-btn="+" aria-label="Yazıyı büyüt">A+</button></div>';
  panel.prepend(d);
  d.addEventListener('click',e=>{const b=e.target.closest('[data-yazi-btn]');if(!b)return;yaziUygula(+root.dataset.yazi+(b.dataset.yaziBtn==='+'?1:-1));});
}
yaziUygula(parseInt(oku('namaz_yazi','1'),10)||1);
const tumBtn=document.querySelector('.guide-toggle');
const satir=document.querySelector('.konum-satir');
if(tumBtn&&satir){const b=document.createElement('button');b.type='button';b.className='gorunum-degis';
  const ad=()=>{const adim=document.body.classList.contains('guide-mode');
    b.innerHTML=adim?'<span class="ikon ikon-liste" aria-hidden="true"></span><span class="uzun">Tüm adımları göster</span><span class="kisa">Tüm adımlar</span>':'<span class="ikon ikon-tek" aria-hidden="true"></span><span class="uzun">Adım adım göster</span><span class="kisa">Adım adım</span>';
    b.setAttribute('aria-label',adim?'Tüm adımları tek sayfada göster':'Adım adım görünüme dön');b.setAttribute('aria-pressed',String(!adim));};
  ad();b.onclick=()=>{tumBtn.click();ad();};satir.append(b);}

const steps=[...document.querySelectorAll('.step')];if(!steps.length)return;

/* ---------- Satır satır dualar ---------- */
function satirla(el,ayir){
  const parcalar=[];let etiket=null;const sonEk=[];
  [...el.childNodes].forEach(n=>{
    if(n.nodeType===1&&n.classList.contains('meal-label')){etiket=n;return;}
    if(n.nodeType===1&&n.classList.contains('tesbih-count')){sonEk.push(n);return;}
    parcalar.push(n.nodeType===3?n.textContent:n.outerHTML);});
  const metin=parcalar.join('').trim();if(!metin)return;
  const satirlar=ayir(metin).filter(s=>s.trim());if(satirlar.length<2&&!sonEk.length)return;
  el.textContent='';if(etiket)el.append(etiket);
  satirlar.forEach((s,i)=>{const sp=document.createElement('span');sp.className='satir';sp.innerHTML=s.trim();
    if(i===satirlar.length-1)sonEk.forEach(x=>{sp.append(' ');sp.append(x);});el.append(sp);});
  el.classList.add('satirli');
}
const cumle=t=>t.split(/(?<=[.!?;])\s+(?=[A-ZÂÎÛÇĞİÖŞÜa-zâîûçğıöşü"“'])/);
const arapca=t=>t.split(/\s*۝\s*|(?<=،)\s+/);
document.querySelectorAll('.recite .okunus').forEach(e=>satirla(e,cumle));
document.querySelectorAll('.recite .meal').forEach(e=>satirla(e,cumle));
document.querySelectorAll('.recite .arabic').forEach(e=>satirla(e,arapca));

/* ---------- Kısa sözlerin kartları (tekbir, kavme, selâm) ---------- */
const KART={
  tekbir:{ar:'اَللّٰهُ أَكْبَرُ',ok:'Allâhü ekber.',an:'Allah en büyüktür.'},
  kavme:{ar:'سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا لَكَ الْحَمْدُ',ok:'Semi\'allâhü limen hamideh. Rabbenâ lekel hamd.',an:'Allah, kendisine hamd edeni işitir. Rabbimiz, hamd yalnızca sanadır.',not:'İlk cümle rükûdan doğrulurken, ikincisi tam doğrulunca söylenir.'},
  selam:{ar:'اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ',ok:'Esselâmü aleyküm ve rahmetullâh.',an:'Allah\'ın selâmı ve rahmeti üzerinize olsun.',not:'Önce sağa, sonra sola başı çevirerek söylenir.'}
};
function kart(k){const x=KART[k];const d=document.createElement('div');d.className='recite kisa-kart';
  d.innerHTML=`<p class="okunus">${x.ok}</p><p class="meal"><span class="meal-label">Anlamı:</span> ${x.an}</p><p class="arabic">${x.ar}</p>`+(x.not?`<p class="kart-not">${x.not}</p>`:'');
  satirla(d.querySelector('.okunus'),cumle);satirla(d.querySelector('.meal'),cumle);satirla(d.querySelector('.arabic'),arapca);return d;}
function kartTuru(step){const t=step.querySelector('h3').textContent;
  if(/Selâm/.test(t))return 'selam';if(/Kavme|Doğrulma/.test(t))return 'kavme';if(/Tekbir/.test(t))return 'tekbir';return null;}

/* ---------- Ne yapıyorum / Ne söylüyorum ---------- */
steps.forEach(step=>{
  const body=step.querySelector('.step-body');const celse=step.dataset.readingRole==='celse';
  const yap=document.createElement('section');yap.className='kutu kutu-yap';yap.innerHTML='<h4 class="kutu-baslik">Ne yapıyorum?</h4>';
  const soyle=document.createElement('section');soyle.className='kutu kutu-soyle';soyle.innerHTML=`<h4 class="kutu-baslik">${celse?'Ne söylüyorum? Bu kısa oturuşta dua okunmaz.':'Ne söylüyorum?'}</h4>`;
  let okumaBasladi=false;
  [...body.children].forEach(c=>{
    if(c.matches('.adim-ust,h3,.pose-icon'))return;
    if(c.matches('.recite,.supplement'))okumaBasladi=true;
    if(c.matches('.read-label')){c.remove();return;}
    if(c.matches('.pose-block,.movement-sequence')||(c.matches('p.posture')&&!c.matches('.audit-note')&&!okumaBasladi))yap.append(c);
    else soyle.append(c);
  });
  if(!celse&&!soyle.querySelector('.recite')){const k=kartTuru(step);if(k)soyle.append(kart(k));}
  body.append(yap,soyle);
});

/* ---------- Telefonda kaydırarak adım değiştirme ---------- */
let sx=0,sy=0,st=0,izle=false;
document.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;const t=e.target;
  izle=document.body.classList.contains('guide-mode')&&!t.closest('.pose-details,.konum,.movement-cards,.gorunum,dialog,input,select,button');
  sx=e.touches[0].clientX;sy=e.touches[0].clientY;st=Date.now();},{passive:true});
document.addEventListener('touchend',e=>{if(!izle)return;izle=false;const t=e.changedTouches[0];const dx=t.clientX-sx,dy=t.clientY-sy;
  if(Date.now()-st>700||Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.8)return;
  const b=document.querySelector(`.guide-nav [data-nav=${dx<0?'next':'prev'}]`);if(b&&!b.disabled)b.click();},{passive:true});

/* ---------- Konum çubuğu aşağı kayınca küçülür ---------- */
let sonY=scrollY;
addEventListener('scroll',()=>{const y=scrollY;if(Math.abs(y-sonY)<12)return;
  document.body.classList.toggle('konum-kucuk',y>sonY&&y>260);sonY=y;},{passive:true});
})();
