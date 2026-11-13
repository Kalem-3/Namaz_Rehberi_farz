/* Namaz Rehberi — içerik.
   Dua metinleri, açıklamalar ve görsel eşleşmeleri farz sürümünden alınmıştır.
   Ses dosyaları: assets/ses/<ses>.mp3 — dosya yoksa ses düğmesi görünmez. */
window.REHBER = (() => {
'use strict';

/* ---------- Dualar ---------- */
const DUALAR = {
  tekbir: {
    ad: 'Tekbir', ses: 'tekbir',
    ar: ['اَللّٰهُ أَكْبَرُ'],
    ok: ['Allâhü ekber.'],
    an: ['Allah en büyüktür.']
  },
  subhaneke: {
    ad: 'Sübhâneke', ses: 'subhaneke',
    ar: ['سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ', 'وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ', 'وَلَا إِلَٰهَ غَيْرُكَ'],
    ok: ['Sübhânekellâhümme ve bi hamdik', 've tebârakesmük ve teâlâ ceddük', 've lâ ilâhe ğayruk.'],
    an: ["Allah'ım! Sen eksik sıfatlardan pak ve uzaksın.", 'Seni daima böyle tenzih eder ve överim.', 'Senin adın mübarektir.', 'Varlığın her şeyden üstündür.', 'Senden başka ilah yoktur.']
  },
  euzu: {
    ad: 'Eûzü–Besmele', ses: 'euzu-besmele',
    ar: ['أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ', 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'],
    ok: ['Eûzü billâhi mineş-şeytânir-racîm.', 'Bismillâhir-rahmânir-rahîm.'],
    an: ["Kovulmuş şeytanın şerrinden Allah'a sığınırım.", "Rahmân ve Rahîm olan Allah'ın adıyla."]
  },
  besmele: {
    ad: 'Besmele', ses: 'besmele',
    ar: ['بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'],
    ok: ['Bismillâhir-rahmânir-rahîm.'],
    an: ["Rahmân ve Rahîm olan Allah'ın adıyla."]
  },
  fatiha: {
    ad: 'Fâtiha', ses: 'fatiha', kaynak: 'Meal: Prof. Dr. Ömer Çelik',
    ar: ['الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 'الرَّحْمَٰنِ الرَّحِيمِ', 'مَالِكِ يَوْمِ الدِّينِ', 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ', 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'],
    ok: ["Elhamdü lillâhi rabbil'âlemîn.", "Errahmânir'rahîm.", 'Mâliki yevmiddîn.', "İyyâke na'büdü ve iyyâke nesteîn.", 'İhdinessırâtal müstakîm.', "Sırâtallezîne en'amte aleyhim", 'ğayril mağdûbi aleyhim ve leddâllîn.'],
    an: ["Hamd, âlemlerin Rabbi Allah'a mahsustur.", "O, Rahmân ve Rahîm'dir.", 'O, hesap ve ceza gününün tek sahibidir.', 'Rabbimiz! Sadece sana kulluk eder ve sadece senden yardım isteriz.', 'Bizi dosdoğru yola eriştir;', 'kendilerine nimet verdiklerinin yoluna.', 'Gazaba uğrayanların ve azıp sapanların yoluna değil.'],
    amin: {
      ar: 'آمِين',
      ok: 'Âmîn.',
      an: "Allah'ım, kabul eyle.",
      not: "Fâtiha bitince içinden (sessizce) “Âmîn” denir. Âmîn, Fâtiha'nın bir âyeti değildir."
    }
  },
  ihlas: {
    ad: 'İhlâs', ses: 'ihlas', kaynak: 'Meal: Prof. Dr. Ömer Çelik',
    ar: ['قُلْ هُوَ اللَّهُ أَحَدٌ', 'اللَّهُ الصَّمَدُ', 'لَمْ يَلِدْ وَلَمْ يُولَدْ', 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ'],
    ok: ['Kul hüvallâhü ehad.', 'Allâhüssamed.', 'Lem yelid ve lem yûled.', 'Ve lem yekün lehû küfüven ehad.'],
    an: ['De ki: O Allah birdir.', "Her şey O Allah'a muhtaçken O hiçbir şeye muhtaç değildir.", 'O, doğurmamış ve doğmamıştır.', "Hiçbir şey O'na denk değildir."]
  },
  ruku: {
    ad: 'Rükû tesbihi', ses: 'ruku', tekrar: '3 kere',
    ar: ['سُبْحَانَ رَبِّيَ الْعَظِيمِ'],
    ok: ['Sübhâne rabbiyel azîm.'],
    an: ['Yüce Rabbimi her türlü noksanlıktan tenzih ederim.']
  },
  kavme: {
    ad: 'Doğrulurken', ses: 'kavme',
    ar: ['سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ', 'رَبَّنَا لَكَ الْحَمْدُ'],
    ok: ["Semi'allâhü limen hamideh.", 'Rabbenâ lekel hamd.'],
    an: ['Allah, kendisine hamd edeni işitir.', 'Rabbimiz, hamd yalnızca sanadır.'],
    not: 'İlk cümle rükûdan doğrulurken, ikincisi tam doğrulunca söylenir.'
  },
  secde: {
    ad: 'Secde tesbihi', ses: 'secde', tekrar: '3 kere',
    ar: ['سُبْحَانَ رَبِّيَ الْأَعْلَى'],
    ok: ["Sübhâne rabbiyel a'lâ."],
    an: ['En yüce Rabbimi her türlü noksanlıktan tenzih ederim.']
  },
  ettehiyyatu: {
    ad: 'Ettehiyyâtü', ses: 'ettehiyyatu',
    ar: ['التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ', 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ', 'السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ', 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ', 'وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ'],
    ok: ['Ettehiyyâtü lillâhi vessalevâtü vettayyibât.', 'Esselâmü aleyke eyyühen-Nebiyyü ve rahmetullâhi ve berakâtüh.', 'Esselâmü aleynâ ve alâ ibâdillâhis-sâlihîn.', 'Eşhedü en lâ ilâhe illallâh', 've eşhedü enne Muhammeden abdühû ve rasûlüh.'],
    an: ["Dil ile, beden ve mal ile yapılan bütün ibadetler Allah'adır.", "Ey Peygamber! Allah'ın selâmı, rahmeti ve bereketleri senin üzerine olsun.", "Selâm bizim üzerimize ve Allah'ın bütün iyi kulları üzerine olsun.", "Şahitlik ederim ki Allah'tan başka ilah yoktur;", "yine şahitlik ederim ki Muhammed, O'nun kulu ve Peygamberidir."]
  },
  salli: {
    ad: 'Allâhümme Salli', ses: 'salli',
    ar: ['اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', 'كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ', 'إِنَّكَ حَمِيدٌ مَجِيدٌ'],
    ok: ['Allâhümme salli alâ Muhammedin ve alâ âli Muhammed,', 'kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm,', 'inneke hamîdün mecîd.'],
    an: ["Allah'ım! Muhammed'e ve Muhammed'in ümmetine rahmet eyle, şerefini yücelt;", "İbrahim'e ve İbrahim'in ümmetine rahmet ettiğin gibi.", 'Şüphesiz övülmeye lâyık yalnız sensin, şan ve şeref sahibi de sensin.']
  },
  barik: {
    ad: 'Allâhümme Bârik', ses: 'barik',
    ar: ['اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', 'كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ', 'إِنَّكَ حَمِيدٌ مَجِيدٌ'],
    ok: ['Allâhümme bârik alâ Muhammedin ve alâ âli Muhammed,', 'kemâ bârekte alâ İbrâhîme ve alâ âli İbrâhîm,', 'inneke hamîdün mecîd.'],
    an: ["Allah'ım! Muhammed'e ve Muhammed'in ümmetine hayır ve bereket ver;", "İbrahim'e ve İbrahim'in ümmetine verdiğin gibi.", 'Şüphesiz övülmeye lâyık yalnız sensin, şan ve şeref sahibi de sensin.']
  },
  rabbena: {
    ad: 'Rabbenâ Âtinâ', ses: 'rabbena-atina', kaynak: 'Bakara 2:201 · Meal: Prof. Dr. Ömer Çelik',
    ar: ['رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', 'وَفِي الْآخِرَةِ حَسَنَةً', 'وَقِنَا عَذَابَ النَّارِ'],
    ok: ['Rabbenâ âtinâ fid-dünyâ haseneten', 've fil-âhirati haseneten', 've kınâ azâbennâr.'],
    an: ['Rabbimiz, bize dünyada da iyilik ver,', 'âhirette de iyilik ver', 've bizi cehennem azâbından koru.']
  },
  rabbenagfirli: {
    ad: 'Rabbenâğfirlî', ses: 'rabbenagfirli', kaynak: 'İbrahim 14:41 · Meal: Prof. Dr. Ömer Çelik',
    ar: ['رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ', 'يَوْمَ يَقُومُ الْحِسَابُ'],
    ok: ['Rabbenâğfirlî ve li vâlideyye ve lil mü\'minîne', 'yevme yekûmül hisâb.'],
    an: ['Rabbimiz! Hesapların görüleceği o gün', 'beni, ana-babamı ve bütün mü\'minleri bağışla!']
  },
  selam: {
    ad: 'Selâm', ses: 'selam',
    ar: ['اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ'],
    ok: ['Esselâmü aleyküm ve rahmetullâh.'],
    an: ["Allah'ın selâmı ve rahmeti üzerinize olsun."],
    not: 'Önce sağa, sonra sola başı çevirerek söylenir.'
  }
};

/* ---------- Beş vaktin farzları ---------- */
const VAKITLER = [
  { id: 'sabah', ad: 'Sabah', rekat: 2, foto: 'SABAH_FOTOGRAFLARI' },
  { id: 'ogle', ad: 'Öğle', rekat: 4, foto: 'OGLE_FOTOGRAFLARI' },
  { id: 'ikindi', ad: 'İkindi', rekat: 4, foto: 'IKINDI_FOTOGRAFLARI' },
  { id: 'aksam', ad: 'Akşam', rekat: 3, foto: 'AKSAM_FOTOGRAFLARI' },
  { id: 'yatsi', ad: 'Yatsı', rekat: 4, foto: 'YATSI_FOTOGRAFLARI' }
];
const SIRA = ['', 'Birinci', 'İkinci', 'Üçüncü', 'Dördüncü'];
const SIRA_E = ['', 'birinci', 'ikinci', 'üçüncü', 'dördüncü'];

const SURE_NOTU = 'Burada İhlâs sûresi örnek olarak gösterilmiştir. Farz namazda başka bir sûre bilen kişinin, ilk rekâtta okuduğu sûreyi ikinci rekâtta bilerek tekrarlaması mekruh kabul edilir. Başka sûre bilmeyen kişi bildiği sûreyi tekrar edebilir. Bu durum namazın geçersiz olduğu anlamına gelmez.';
const PARMAK_NOTU = 'Ettehiyyâtü okunurken sağ elin işaret parmağı, “Lâ ilâhe” denildiğinde kaldırılır; “illallâh” denildiğinde indirilir.';
const OTURUS_YAP = {
  erkek: 'Sol ayak yatırılır ve üzerine oturulur; sağ ayak dik, parmakları kıbleye dönük tutulur.',
  kadin: 'İki ayak kişinin kendi sağına çıkarılır; yere oturulur.'
};

const ruku = {
  ad: 'Rükû', kisa: 'Rükû', poz: 'ruku',
  yap: {
    ortak: '“Allâhü ekber” diyerek eğilinir.',
    erkek: 'Sırt düz tutulur, baş sırtla aynı hizada olur, eller dizleri tam kavrar, dirsekler bedenden açık, parmaklar ayrık.',
    kadin: 'Sırt tam düz değil, hafifçe eğik tutulur; eller dizlere hafifçe konur, dizler hafif bükülü, dirsekler bedene yakın tutulur.'
  },
  dualar: ['tekbir', 'ruku']
};
const kavme = {
  ad: 'Doğrulma (Kavme)', kisa: 'Kavme', poz: 'kavme',
  yap: { ortak: 'Rükûdan tam doğrulup dikilirken “Semi\'allâhü limen hamideh” denir; tam doğrulunca “Rabbenâ lekel hamd” denir. Kısa bir an sakin biçimde beklenir.' },
  dualar: ['kavme']
};
const secde1 = {
  ad: '1. Secde', kisa: 'Secde', poz: 'secde1',
  yap: {
    ortak: '“Allâhü ekber” diyerek secdeye varılır.',
    erkek: 'Önce dizler, sonra eller, sonra burun ve alın yere konur; kollar gövdeden ve karından ayrık tutulur, dirsekler yerden kalkık durur.',
    kadin: 'Vücut toplu tutulur, kollar yanlara yakın durur, karın uyluklara değecek şekilde yere yakın durulur.'
  },
  dualar: ['tekbir', 'secde']
};
const celse = {
  ad: 'İki secde arası oturuş (Celse)', kisa: 'Celse', poz: 'celse',
  yap: {
    ortak: '“Allâhü ekber” diyerek doğrulup kısaca oturulur.',
    erkek: 'Sol ayak yatık şekilde altına alınıp üzerine oturulur, sağ ayağın parmakları kıbleye dönük dik tutulur.',
    kadin: 'Her iki ayak da sağ tarafa yatık şekilde yere yaslanır, bu şekilde oturulur.'
  },
  bilgi: 'Bu, iki secde arasındaki kısa oturuştur. Bu oturuşta Ettehiyyâtü, Salli–Bârik ve Rabbenâ duaları okunmaz. Ardından ikinci secdeye gidilir.',
  dualar: ['tekbir'],
  duaYok: 'Bu kısa oturuşta dua okunmaz.'
};
const secde2 = {
  ad: '2. Secde', kisa: 'Secde', poz: 'secde2',
  yap: { ortak: '“Allâhü ekber” diyerek tekrar secdeye varılır, aynı duruşla.' },
  dualar: ['tekbir', 'secde']
};

/* Bir vaktin farzını adım adım kurar. Sıra bütün vakitlerde aynıdır:
   1. rekât Sübhâneke–Eûzü–Fâtiha–sûre; 2. rekât Besmele–Fâtiha–sûre;
   3. ve 4. rekât yalnızca Besmele–Fâtiha; 2. rekât sonunda (3–4 rekâtlıda) birinci oturuş. */
function adimlar(v) {
  const n = v.rekat, a = [];
  const rekatSonu = r => [ruku, kavme, secde1, celse, secde2].forEach(x => a.push({ rekat: r, ...x }));
  a.push({ rekat: 1, ad: 'Niyet', kisa: 'Niyet', poz: 'hazirlik',
    yap: { ortak: 'Kıbleye dönülür, ayakta durulur. Kalpten niyet edilir; dil ile de söylenebilir.' },
    niyet: `Niyet ettim Allah rızası için ${v.ad.toLocaleLowerCase('tr')} namazının farzını kılmaya.`,
    dualar: [] });
  a.push({ rekat: 1, ad: 'İftitah Tekbiri', kisa: 'Tekbir', poz: 'tekbir',
    yap: {
      ortak: '“Allâhü ekber” diyerek eller kaldırılır.',
      erkek: 'Başparmaklar kulak yumuşağına değecek şekilde, avuç içleri kıbleye dönük. Sonra sağ el, sol elin üzerine konup göbek altında birleştirilir; sağ elle sol bilek hafifçe kavranır.',
      kadin: 'Eller omuz hizasına kadar kaldırılır, avuç içleri kıbleye dönük. Sonra sağ el, sol elin üzerine konarak göğüs hizasında birleştirilir; kavramadan, eller üst üste durur.'
    },
    dualar: ['tekbir'] });
  a.push({ rekat: 1, ad: 'Kıyam: Sübhâneke, Eûzü–Besmele, Fâtiha, Sûre', kisa: 'Kıyam', poz: 'kiyam',
    yap: { ortak: 'Ayakta sırasıyla şu dualar okunur: Sübhâneke → Eûzü–Besmele → Fâtiha (sonunda içinden “Âmîn”) → İhlâs veya bildiğiniz başka bir sûre.' },
    bilgi: SURE_NOTU,
    dualar: ['subhaneke', 'euzu', 'fatiha', 'ihlas'] });
  rekatSonu(1);
  for (let r = 2; r <= n; r++) {
    if (r === 2) {
      a.push({ rekat: 2, ad: 'İkinci rekâta kalkış: Besmele, Fâtiha, Sûre', kisa: 'Kıyam', poz: 'kiyam',
        yap: { ortak: '“Allâhü ekber” diyerek ikinci rekâta kalkılır ve eller bağlanır. Sübhâneke ve Eûzü tekrar edilmez. Besmele çekilir; ardından Fâtiha (sonunda içinden “Âmîn”) ve bir sûre okunur.' },
        bilgi: SURE_NOTU,
        dualar: ['tekbir', 'besmele', 'fatiha', 'ihlas'] });
    } else {
      a.push({ rekat: r, ad: `${SIRA[r]} rekâta kalkış: Besmele, Fâtiha`, kisa: 'Kıyam', poz: 'kiyam',
        yap: { ortak: `“Allâhü ekber” diyerek ${SIRA_E[r]} rekâta kalkılır ve eller bağlanır. Farzın 3. ve 4. rekâtlarında yalnızca Besmele ve Fâtiha (sonunda içinden “Âmîn”) okunur; ayrıca bir sûre eklenmez.` },
        dualar: ['tekbir', 'besmele', 'fatiha'] });
    }
    rekatSonu(r);
    if (r === 2 && n > 2) {
      a.push({ rekat: 2, ad: 'Birinci Oturuş', kisa: 'Oturuş', poz: 'oturus',
        yap: { ortak: '“Allâhü ekber” diyerek ikinci secdeden doğrulup oturulur. Burada yalnızca Ettehiyyâtü okunur.', ...OTURUS_YAP },
        bilgi: 'Bu, ikinci rekâtın ikinci secdesinden sonraki birinci oturuştur. Yalnızca Ettehiyyâtü okunur; Salli–Bârik ve Rabbenâ duaları okunmaz. Ettehiyyâtü bitince “Allâhü ekber” diyerek üçüncü rekâta kalkılır. ' + PARMAK_NOTU,
        dualar: ['tekbir', 'ettehiyyatu'] });
    }
  }
  a.push({ rekat: n, ad: 'Son Oturuş', kisa: 'Oturuş', poz: 'oturus',
    yap: { ortak: '“Allâhü ekber” diyerek son oturuşa geçilir. Ettehiyyâtü, ardından Salli–Bârik ve Rabbenâ duaları okunur.', ...OTURUS_YAP },
    bilgi: `Bu, ${n}. rekâtın ikinci secdesinden sonraki son oturuştur. Ettehiyyâtü, Salli–Bârik ve Rabbenâ duaları burada okunur. ` + PARMAK_NOTU,
    dualar: ['tekbir', 'ettehiyyatu', 'salli', 'barik', 'rabbena', 'rabbenagfirli'] });
  a.push({ rekat: n, ad: 'Sağa Selâm', kisa: 'Selâm', poz: 'selamSag',
    yap: { ortak: 'Baş, kişinin kendi sağına çevrilerek “Esselâmü aleyküm ve rahmetullâh” denir.' },
    dualar: ['selam'] });
  a.push({ rekat: n, ad: 'Sola Selâm', kisa: 'Selâm', poz: 'selamSol',
    yap: { ortak: `Baş, kişinin kendi soluna çevrilerek yine “Esselâmü aleyküm ve rahmetullâh” denir. ${v.ad} namazının farzı tamamlanmış olur.` },
    dualar: ['selam'] });
  return a;
}
VAKITLER.forEach(v => { v.adimlar = adimlar(v); });

/* Duruşların yakın planları: [aday anahtarlar, başlık, açıklama]. Vakitlerin fotoğraf
   adları biraz farklı olduğu için ilk bulunan anahtar kullanılır. */
const YAKIN = {
  erkek: {
    hazirlik: [],
    tekbir: [[['tekbirDetay'], 'Ellerin yüksekliği', 'Başparmaklar kulak yumuşaklarına gelecek kadar kaldırılır.'], [['kiyamDetay'], 'Sonra eller bağlanır', 'Sağ el, sol elin üzerine konur; sol bilek hafifçe kavranır. Göbek altında tutulur.']],
    kiyam: [[['kiyamDetay'], 'Sağ el, sol elin üzerinde', 'Eller göbek altında bağlanır; sağ el sol bileği kavrar.'], [['kiyamYan'], 'Ayakta duruş', 'Vücut dik tutulur. Dua ve sûreler bu duruşta okunur.']],
    ruku: [[['rukuDetay'], 'Sırt ve baş', 'Sırt düz, baş sırtla aynı hizada tutulur.'], [['rukuEl'], 'Eller ve dizler', 'Eller dizleri kavrar; parmaklar ayrık, dizler dik tutulur.']],
    kavme: [[['kavmeKol'], 'Kolların konumu', 'Doğrulmuş duruşta kollar yanlarda serbest bırakılır.']],
    secde1: [[['secdeBas'], 'Baş ve eller', 'Alın ve burun yere konur; eller başın iki yanında durur.'], [['secde1Detay'], 'Ayakların arkadan görünümü', 'Ayak parmakları kıbleye dönük olarak yere basar.']],
    secde2: [[['secdeBas'], 'Baş ve eller', 'Alın ve burun yere konur; eller başın iki yanında durur.'], [['secde2Detay'], 'Ayakların arkadan görünümü', 'Ayak parmakları kıbleye dönük olarak yere basar.']],
    celse: [[['celseDetay', 'celseAyak', 'oturusAyak'], 'Ayakların yerleşimi', 'Sol ayak yatırılır ve üzerine oturulur. Sağ ayak dik, parmakları kıbleye dönük tutulur.'], [['oturusYan'], 'Yandan görünüş', 'Eller uylukların üzerinde, dizlere yakın durur.']],
    oturus: [[['oturusAyak'], 'Ayakların yerleşimi', 'Sol ayak yatırılır ve üzerine oturulur. Sağ ayak dik, parmakları kıbleye dönük tutulur.'], [['oturusYan'], 'Yandan görünüş', 'Eller uylukların üzerinde, dizlere yakın durur.']],
    selamSag: [[['selamSagDetay'], 'Başın çevrilmesi', 'Kişinin kendi sağına dönüşü.'], [['oturusAyak'], 'Oturuş korunur', 'Sol ayak üzerinde oturulur; sağ ayak dik tutulur.']],
    selamSol: [[['selamSolDetay'], 'Başın çevrilmesi', 'Kişinin kendi soluna dönüşü.'], [['oturusAyak'], 'Oturuş korunur', 'Sol ayak üzerinde oturulur; sağ ayak dik tutulur.']]
  },
  kadin: {
    hazirlik: [],
    tekbir: [[['tekbirDetay'], 'Ellerin yüksekliği', 'Parmak uçları omuz hizasına gelecek kadar kaldırılır.'], [['kiyamDetay'], 'Sonra eller bağlanır', 'Sağ el, sol el üzerine göğüs hizasında konur; bilek kavranmaz.']],
    kiyam: [[['kiyamDetay'], 'Sağ el, sol elin üzerinde', 'Eller göğüs hizasında üst üste durur.']],
    ruku: [[['rukuSirt'], 'Sırt ve baş', 'Sırt hafif meyilli tutulur; erkeklerdeki kadar düzleştirilmez.'], [['rukuEl'], 'Eller ve dizler', 'Eller dizlere hafifçe konur; dizler hafif bükülü, dirsekler bedene yakındır.']],
    kavme: [[['kavmeKol'], 'Kolların konumu', 'Doğrulmuş duruşta kollar yanlarda serbest bırakılır.']],
    secde1: [[['secdeBas'], 'Baş ve eller', 'Alın ve burun yere konur; eller başın iki yanında durur.']],
    secde2: [[['secdeBas'], 'Baş ve eller', 'Alın ve burun yere konur; eller başın iki yanında durur.']],
    celse: [[['celseDetay'], 'Ayakların yerleşimi', 'İki ayak kişinin kendi sağına çıkarılır; yere oturulur.'], [['oturEl'], 'Eller dizlerde', 'Eller uylukların üzerinde, dizlere yakın durur.']],
    oturus: [[['oturusAyak'], 'Ayakların yerleşimi', 'İki ayak kişinin kendi sağına çıkarılır; yere oturulur. Sağ ayak dik tutulmaz.'], [['oturEl'], 'Eller dizlerde', 'Eller uylukların üzerinde, dizlere yakın durur.']],
    selamSag: [[['selamSagYuz'], 'Başın çevrilmesi', 'Kişinin kendi sağına dönüşü.'], [['oturusAyak'], 'Oturuş korunur', 'Ayaklar kişinin kendi sağ yanında yatık kalır.']],
    selamSol: [[['selamSolYuz'], 'Başın çevrilmesi', 'Kişinin kendi soluna dönüşü.'], [['oturusAyak'], 'Oturuş korunur', 'Ayaklar kişinin kendi sağ yanında yatık kalır.']]
  }
};

function foto(v, cins, rekat, anahtar) {
  const set = window[v.foto + (cins === 'kadin' ? '_KADIN' : '')] || {};
  return (set['farz-' + rekat] || {})[anahtar] || (set['farz-1'] || {})[anahtar] || null;
}
/* Bir adımın yakın planları: [görsel, başlık, açıklama] — bulunamayan veya ana görselle aynı olanlar atlanır */
function yakinlar(v, cins, s) {
  const ana = foto(v, cins, s.rekat, s.poz);
  const goruldu = new Set([ana]);
  return (YAKIN[cins][s.poz] || []).map(([adaylar, b, t]) => {
    for (const k of adaylar) {
      const src = foto(v, cins, s.rekat, k);
      if (src && !goruldu.has(src)) { goruldu.add(src); return [src, b, t]; }
    }
    return null;
  }).filter(Boolean);
}

/* ---------- Abdest ---------- */
const ABDEST = [
  { ad: 'Niyet ve ellerin yıkanması', tile: 0, zoom: 11, sayi: '3 defa', tur: 'Başlangıç ve sünnet', metin: 'Abdest almaya niyet edilir, besmele çekilir. İki el bileklere kadar yıkanır.', detay: 'Parmak araları', not: 'Parmak aralarını ovuşturarak suyun her yere ulaşmasını sağlayın.', dua: 'besmele' },
  { ad: 'Ağza su verilmesi', tile: 1, sayi: '3 defa', tur: 'Sünnet', metin: 'Sağ elle ağza su alınır. Ağız çalkalanır ve su dışarı çıkarılır.', detay: 'Sağ el kullanılır', not: 'Her çalkalamada yeniden su alınır; su yutulmaz.' },
  { ad: 'Burna su verilmesi', tile: 2, sayi: '3 defa', tur: 'Sünnet', metin: 'Sağ elle burna su alınır, ardından burun sol elle temizlenir.', detay: 'Nazikçe temizleyin', not: 'Oruçluyken ağza ve burna su verirken aşırıya kaçılmaz.' },
  { ad: 'Yüzün yıkanması', tile: 3, sayi: '3 defa', tur: '1 defa farz · 3 defa sünnet', farz: true, metin: 'Alında saçın başladığı yerden çene altına ve iki kulak arasına kadar yüz yıkanır.', detay: 'Yüzün sınırları', not: 'Kuru yer bırakmayın; suyu gözlerin içine sokmak gerekmez.' },
  { ad: 'Sağ kolun yıkanması', tile: 5, sayi: '3 defa', tur: '1 defa farz · 3 defa sünnet', farz: true, metin: 'Sağ kol, elden dirseğe kadar yıkanır. Dirsek de yıkamaya dâhildir.', detay: 'Dirseği de yıkayın', not: 'Suyu kolun her tarafına ulaştırın. Sağ ve sol, abdest alan kişinin kendi yönleridir.' },
  { ad: 'Sol kolun yıkanması', tile: 4, sayi: '3 defa', tur: '1 defa farz · 3 defa sünnet', farz: true, metin: 'Aynı şekilde sol kol, dirsek dâhil yıkanır.', detay: 'Kolun tamamı', not: 'Kolun iç ve dış tarafında, dirsek çevresinde kuru yer bırakmayın.' },
  { ad: 'Başın mesh edilmesi', tile: 6, sayi: '1 defa', tur: 'En az dörtte biri farz', farz: true, metin: 'Islak el başa sürülerek mesh edilir. Hanefî uygulamasında başın en az dörtte biri mesh edilir; tamamının mesh edilmesi sünnettir.', detay: 'El doğrudan başa temas eder', not: 'Takke veya başörtüsünün üzerinden silmek yeterli değildir. Bacılar ellerini örtünün altına sokarak başlarını mesh edebilirler.' },
  { ad: 'Kulakların mesh edilmesi', tile: 7, sayi: '1 defa', tur: 'Sünnet', metin: 'Islak parmaklarla kulakların iç kıvrımları ve arkaları mesh edilir.', detay: 'İç ve dış kısım', not: 'İşaret parmakları iç kıvrımlara, başparmaklar kulakların arkasına sürülür. Kulaklar nazikçe mesh edilir.' },
  { ad: 'Boynun mesh edilmesi', tile: 8, sayi: '1 defa', tur: 'Âdâb (müstehap)', metin: 'İki elin arkasıyla ense ve boynun arka kısmı mesh edilir.', detay: 'Elin arkası kullanılır', not: 'Avuç içiyle boğaz sıvazlanmaz. Bu adım abdestin dört farzından biri değildir.' },
  { ad: 'Sağ ayağın yıkanması', tile: 9, sayi: '3 defa', tur: '1 defa farz · 3 defa sünnet', farz: true, metin: 'Sağ ayak, parmaklardan başlayarak topuk ve aşık kemikleri dâhil yıkanır.', detay: 'Parmak araları ve topuk', not: 'Suyu parmak aralarına, ayağın altına ve topuğa ulaştırın. Ayak yalnızca ıslak elle silinmez; yıkanır.' },
  { ad: 'Sol ayağın yıkanması', tile: 10, sayi: '3 defa', tur: '1 defa farz · 3 defa sünnet', farz: true, metin: 'Sol ayak da topuk ve aşık kemikleri dâhil yıkanır.', detay: 'Kuru yer bırakmayın', not: 'Parmak aralarını ve ayağın her tarafını kontrol edin. Böylece yıkama sırası tamamlanır.' }
];

const ABDEST_GIRIS = 'Kolları dirseklerin üstüne kadar sıvayın. Suyun deriye ulaşmasına engel olan maddeleri temizleyin; dar yüzüğün altına da su ulaştırın. Temiz su kullanın, suyu boşa akıtmayın.';
const ABDEST_FARZ = 'Abdestte yüzü, dirseklerle birlikte iki kolu ve aşık kemikleriyle birlikte iki ayağı birer defa yıkamak; başın en az dörtte birini mesh etmek farzdır. Yıkanacak uzuvların üçer defa yıkanması sünnettir; mesh bir defa yapılır. Yıkama, suyun uzva ulaştırılmasıdır; mesh ise ıslak elle silmektir.';

const KAYNAKLAR = [
  ['Din İşleri Yüksek Kurulu — Abdestin alınışı', 'https://kurul.diyanet.gov.tr/tr/fetva/abdest-nedir-ve-nasil-alinir/0193c42d-4493-7cd5-0d48-874d6be1a7d3'],
  ['Diyanet Haber — Abdestle ilgili bilgiler', 'https://www.diyanethaber.com.tr/abdest-ile-ilgili-bilinmesi-gerekenler'],
  ['Din İşleri Yüksek Kurulu — Başörtüsü ve mesh', 'https://kurul.diyanet.gov.tr/tr/video/abdest-alirken-basortusunun-uzerinden-bas-mesh-edilebilir-mi/019d0027-3362-7114-ad16-483fffece9e6'],
  ['Diyanet — Er ve bacı duruşları', 'https://kurul.diyanet.gov.tr/tr/fetva/kilinis-bakimindan-kadinlarin-namazi-ile-erkeklerin-namazi-arasinda-ne-gibi-farklar-bulunmaktadir/0193c42d-64a5-7ba1-9af3-f9f4a7f97245'],
  ['Diyanet — Namazda besmele', 'https://kurul.diyanet.gov.tr/tr/fetva/namazda-fatihadan-sonra-okunacak-ayet-veya-sureler-icin-besmele-cekilir-mi/0193c42d-4fd1-7daa-1cd8-e3e31c2535c1'],
  ['Diyanet — Secdede ayakların yerleşimi', 'https://www.diyanet.gov.tr/icerik/10151']
];
const KAYNAK_NOTU = "Kur'an-ı Kerim âyetlerinin Türkçe meali Prof. Dr. Ömer Çelik mealinden alınmıştır. Sübhâneke, Ettehiyyâtü, Salli–Bârik ve Rabbenâ dualarının Arapça metni ve anlamı Millî Eğitim Bakanlığı'nın “Namaz Duaları ve Sureleri” kaynağına dayanmaktadır. Kadın–erkek duruş farkları Diyanet İşleri Başkanlığı'nın resmî açıklamasından alınmıştır.";

/* Anlamların sesli okunuşu: assets/ses/anlam/er/<ad>.mp3 ve assets/ses/anlam/baci/<ad>.mp3.
   Yeni kayıt eklenirse adını buraya da yazın (sayfa açılırken ses dosyası yoklanmaz). */
const ANLAM_SESLERI = {
  er: ['tekbir', 'subhaneke', 'euzu-besmele', 'besmele', 'fatiha', 'ihlas', 'ruku', 'kavme', 'secde', 'ettehiyyatu', 'salli', 'barik', 'rabbena-atina', 'rabbenagfirli', 'selam'],
  baci: ['tekbir', 'subhaneke', 'euzu-besmele', 'besmele', 'fatiha', 'ihlas', 'ruku', 'kavme', 'secde', 'ettehiyyatu', 'salli', 'barik', 'rabbena-atina', 'rabbenagfirli', 'selam']
};

/* Dualar sayfasındaki sıra */
const DUA_SIRASI = ['subhaneke', 'euzu', 'fatiha', 'ihlas', 'ruku', 'kavme', 'secde', 'ettehiyyatu', 'salli', 'barik', 'rabbena', 'rabbenagfirli', 'selam', 'tekbir', 'besmele'];

return { DUALAR, VAKITLER, foto, yakinlar, ABDEST, ABDEST_GIRIS, ABDEST_FARZ, KAYNAKLAR, KAYNAK_NOTU, DUA_SIRASI, ANLAM_SESLERI };
})();
