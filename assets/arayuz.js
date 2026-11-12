/* Namaz Rehberi — arayüz katmanı: tema ve Arapça tercihi, görünüm paneli, konum çubuğu (tesbih). */
(()=>{'use strict';
const root=document.documentElement;
const TEMALAR=[
  {id:'zumrut',ad:'Zümrüt',renk:['#1E5A44','#A8803F']},
  {id:'iznik',ad:'İznik',renk:['#23508F','#C2412D']},
  {id:'gul',ad:'Gül kurusu',renk:['#7A2232','#A7773F']},
  {id:'gece',ad:'Gece',renk:['#0F181B','#86C7AC']}
];
const oku=(k,d)=>{try{return localStorage.getItem(k)||d}catch(e){return d}};
const yaz=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
function temaUygula(id){root.dataset.tema=TEMALAR.some(t=>t.id===id)?id:'zumrut';yaz('namaz_tema',root.dataset.tema);
  document.querySelectorAll('.tema-secim button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tema===root.dataset.tema)));}
function arapcaUygula(goster){root.dataset.arapca=goster?'goster':'gizle';yaz('namaz_arapca',root.dataset.arapca);
  document.querySelectorAll('.arapca-anahtar').forEach(i=>i.checked=goster);}
temaUygula(oku('namaz_tema','zumrut'));arapcaUygula(oku('namaz_arapca','goster')!=='gizle');

/* ---------- Görünüm paneli ---------- */
const sayfaNamaz=!!document.querySelector('.step');
const panel=document.createElement('details');panel.className='gorunum';
panel.innerHTML=`<summary aria-label="Görünüm ayarları"><span>Görünüm</span></summary><div class="gorunum-panel">
<h2>Renk teması</h2><div class="tema-secim">${TEMALAR.map(t=>`<button type="button" data-tema="${t.id}" aria-pressed="false"><span class="tema-ornek" style="background:linear-gradient(135deg,${t.renk[0]} 0 55%,${t.renk[1]} 55% 100%)"></span>${t.ad}</button>`).join('')}</div>
${document.querySelector('.recite')?`<h2>Okuma</h2><p>Okunuş ve anlam her zaman görünür.</p><label class="anahtar"><span>Arapça metni göster</span><input type="checkbox" class="arapca-anahtar" role="switch"></label>`:''}</div>`;
const yer=document.querySelector('.topbar-inner')||document.querySelector('body.home header');
if(yer){const g=yer.querySelector('.gender-toggle');if(g)g.before(panel);else yer.append(panel);}
panel.addEventListener('click',e=>{const b=e.target.closest('[data-tema]');if(b)temaUygula(b.dataset.tema);});
panel.addEventListener('change',e=>{if(e.target.classList.contains('arapca-anahtar'))arapcaUygula(e.target.checked);});
document.addEventListener('click',e=>{if(panel.open&&!panel.contains(e.target))panel.open=false;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.open){panel.open=false;panel.querySelector('summary').focus();}});
temaUygula(root.dataset.tema);arapcaUygula(root.dataset.arapca!=='gizle');

if(!sayfaNamaz||!document.querySelector('.guide-tools select'))return;

/* ---------- Adımların bölüm ve rekât bilgisi ---------- */
const wrap=document.querySelector('.wrap');const steps=[...document.querySelectorAll('.step')];
const bilgi=[];let bolum=null,bolumAd='',rekat=0;const bolumler=[];
for(const n of wrap.children){
  if(n.classList.contains('unit-divider')){bolumAd=(n.querySelector('h2')?.textContent||'').replace(/^\d+\s+Rekât\s+/,'');bolum={ad:bolumAd,ilk:null,rekatlar:[]};bolumler.push(bolum);rekat=0;}
  if(n.classList.contains('rekat-mark')){rekat=parseInt(n.textContent,10)||rekat+1;bolum&&bolum.rekatlar.push({no:rekat,ilk:null});}
  const i=steps.indexOf(n);if(i>=0&&bolum){if(bolum.ilk===null)bolum.ilk=i;const r=bolum.rekatlar[bolum.rekatlar.length-1];if(r&&r.ilk===null)r.ilk=i;bilgi[i]={b:bolumler.length-1,r:rekat};}
}
steps.forEach((s,i)=>{const k=bilgi[i];if(!k)return;const u=document.createElement('span');u.className='adim-ust';u.textContent=`${bolumler[k.b].ad} · ${k.r}. rekât`;s.querySelector('.step-body').prepend(u);});

/* Okuma etiketlerini sade cümleye çevir */
document.querySelectorAll('.step-body>.read-label').forEach(l=>{if(/KISA OTURUŞ/.test(l.textContent))l.textContent='Bu kısa oturuşta dua okunmaz';else if(/^2 ·/.test(l.textContent))l.textContent='Bu adımda söylenecekler ve okunacaklar';});

/* Kaynak notu ve kapsam notunu katlanır bölüme al */
const det=document.querySelector('.source-details'),kap=document.querySelector('.hero .scope-note');if(det&&kap)det.append(kap);

/* ---------- Konum çubuğu ---------- */
const konum=document.createElement('nav');konum.className='konum';konum.setAttribute('aria-label','Namazda bulunduğunuz yer');
konum.innerHTML=`<div class="konum-bolumler" role="list"></div><div class="konum-satir"><div class="tesbih" aria-label="Rekâtlar"></div><div class="konum-yazi" aria-live="polite"><b></b><span></span></div><div class="konum-adimlar" aria-label="Bu rekâtın adımları"></div></div><div class="konum-ilerleme" aria-hidden="true"><i></i></div>`;
const tools=document.querySelector('.guide-tools');tools.before(konum);document.body.classList.add('has-konum');
const sel=tools.querySelector('select');const ctx=document.querySelector('.guide-context');
const git=i=>{sel.value=String(i);sel.dispatchEvent(new Event('change'));};
if(bolumler.length<2)konum.querySelector('.konum-bolumler').hidden=true;
konum.querySelector('.konum-bolumler').innerHTML=bolumler.map((b,i)=>`<button type="button" role="listitem" data-bolum="${i}">${b.ad}</button>`).join('');
konum.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
  if(t.dataset.bolum)git(bolumler[+t.dataset.bolum].ilk);
  if(t.dataset.rekat){const k=bilgi[aktif()];git(bolumler[k.b].rekatlar[+t.dataset.rekat].ilk);}
  if(t.dataset.adim)git(+t.dataset.adim);});
const aktif=()=>Math.max(0,steps.findIndex(s=>s.classList.contains('lesson-active')));
const topAyarla=()=>{const tb=document.querySelector('.topbar');root.style.setProperty('--konum-top',(tb?tb.getBoundingClientRect().height:0)+'px');root.style.setProperty('--konum-h',konum.getBoundingClientRect().height+'px');};
function guncelle(){
  const i=aktif(),k=bilgi[i];if(!k)return;const b=bolumler[k.b];
  konum.querySelectorAll('[data-bolum]').forEach(x=>x.setAttribute('aria-current',String(+x.dataset.bolum===k.b)));
  const tes=konum.querySelector('.tesbih');
  tes.innerHTML=b.rekatlar.map((r,j)=>`<button type="button" data-rekat="${j}" aria-label="${r.no}. rekât" class="${r.no<k.r?'gecti':''}" aria-current="${r.no===k.r}">${r.no}</button>`).join('');
  const rIdx=b.rekatlar.findIndex(r=>r.no===k.r);const bas=b.rekatlar[rIdx].ilk;
  const son=(b.rekatlar[rIdx+1]?.ilk ?? bolumler[k.b+1]?.ilk ?? steps.length)-1;
  const ad=steps[i].querySelector('h3').textContent;
  konum.querySelector('.konum-yazi b').textContent=ad;
  konum.querySelector('.konum-yazi span').textContent=`${b.ad} · ${k.r}. rekât · ${i-bas+1}. adım / ${son-bas+1}`;
  const ad2=konum.querySelector('.konum-adimlar');let h='';
  for(let j=bas;j<=son;j++)h+=`<button type="button" data-adim="${j}" aria-label="${j-bas+1}. adım: ${steps[j].querySelector('h3').textContent}" title="${steps[j].querySelector('h3').textContent}" class="${j<i?'gecti':''}" aria-current="${j===i}"></button>`;
  ad2.innerHTML=h;
  konum.querySelector('.konum-ilerleme i').style.width=((i+1)/steps.length*100)+'%';
  if(ctx)ctx.classList.toggle('konum-gizli',i!==b.ilk);
}
new MutationObserver(guncelle).observe(wrap,{subtree:true,attributes:true,attributeFilter:['class']});
addEventListener('resize',topAyarla);guncelle();topAyarla();

/* Klavyeyle adım değiştirme: sol/sağ ok */
document.addEventListener('keydown',e=>{if(e.target.closest('input,select,textarea,dialog')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(!document.body.classList.contains('guide-mode'))return;
  if(e.key==='ArrowRight'){document.querySelector('.guide-nav [data-nav=next]')?.click();}
  if(e.key==='ArrowLeft'){document.querySelector('.guide-nav [data-nav=prev]')?.click();}});
})();
