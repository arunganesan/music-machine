import type { SongType } from './Types';

export const SHRUTI_OFFSET_MAP: { [key: string]: string } = {
  '-5': 'G3',
  '-4': 'G#3',
  '-3': 'A4',
  '-2': 'A#4',
  '-1': 'B4',
  '0': 'C4',
  '1': 'C#4',
  '2': 'D4',
  '3': 'D#4',
  '4': 'E4',
  '5': 'F4',
};

export const DEFAULT_TEMPO = 1500;

export const DEFAULT_SHRUTI = 0;

export const NOTE_RAGA_MAP: string[] = [
  's', 'r1', 'r2', 'g1',
  'g2', 'm1', 'm2', 'p',
  'd1', 'd2', 'n1', 'n2'
];

export const RAGAS: { [key: string]: string[] } = {
  'śivaranjinī': [
    's r2 g1 p d2 S',
    'S d2 p g1 r2 s'
  ],
  'darbāri kānaḍa': [
    'n1. s r2 g1 s m1 p d1 n1 S',
    'S d1 n1 p m1 p g1 m1 r2 s'
  ],
  'mayamalavagaula': [
    's r1 g2 m1 p d1 n2 S',
    'S n2 d1 p m1 g2 r1 s',
  ],
  'mohanam': [
    's r2 g2 p d2 S',
    'S d2 p g2 r2 s',
  ],
  'cakravākam': [
    's r1 g2 m1 p d2 n1 S',
    'S n1 d2 p m1 g2 r1 s'
  ],
  'sēnāvati': [
    's r1 g2 m1 p d1 n1 S',
    'S n1 d1 p m1 g2 r1 s'
  ],
  'kīravāṇī': [
    's r2 g1 m1 p d1 n2 S',
    'S n2 d1 p m1 g1 r2 s'
  ],
  'sindhubhairavī': [
    's r1 g1 m1 p d1 n1 S',
    'S n1 d1 p m1 g1 r1 s',
  ],
  'bēgaḍa': [
    's g2 r2 g2 m1 p d2 p S',
    'S n1 d2 p m1 g2 r2 s'
  ]
};


// ṣṭḥṇḷṛṅḍ
export const SONGS: { [key: string]: SongType } = {
  'Manassoru Māyā': {
    'raga': 'mohanam',
    'lyrics': 'Manassoru, māyā, marīci,ka,' +
      'atirezh,ātta, marīci,ka,' +
      'ariyā,tirikke, nizhalpōl,tuṭarum,' +
      'ariyum,bōl verum, marīci,ka,' +
      'manassoru, māyā, marīci,ka,' +

      'Vṛthayuṇar,ttīṭum, sukhamuṇar,ttīṭum,' +
      'āyiram, anubhava,tika yuṇar,ttīṭum,' +
      'viṣayamal,lēlum, viṣayiyum,allanām,' +
      'ariyum,bōl varu, marīci,ka,' +
      'manassoru, māyā, marīci,ka,' +

      'Bhōga ra,saṅgalil, vīṇu na,śikkum,' +
      'tyāgata,pagniyil, nīri jva,likum,' +
      'bandha vi,dhāyajam, mōkṣasa,hāyam,' +
      'ariyum,bōl varu, marīci,ka,' +
      'manassoru, māyā, marīci,ka,',
      // ṣṭḥṇḷṛṅḍ

    'notes': ''
  },
  'Arivāyi Amṛitāyi': {
    'raga': 'bēgaḍa',
    'lyrics': 'aṛivāyi, amṛtāyi, akamala,ril ciram,' +
      'amarunn,akhila ca,rācara, janani,' +
      'azhakin, niṛavē, - aṛivin, tikavē,' +
      'amṛtā,nandama,yi bhava, śamanē,' +

      'uṣassāyi, uṇarvāyi, ulaka, poruḷāyi,' +
      'maruvum, sura muni, sēvita, caraṇē,' +
      'uṣassāyi, uṇarvāyi, ulaka, poruḷāyi,' +
      'maruvum, sura muni, sēvita, caraṇē,' +
      'karuṇārṇ,avamē, praṇav,āmṛtamē,' +
      'sakalāma,ya duri,tāpaha, nayanē,' +

      'śrutiyāyi, layamāyi, teḷinīr, kuḷirāyi,' +
      'sirakaḷil, unarvāy,ozhukum, taṭinī,' +
      'karaḷin, oḷiyē, kavit,āmṛtamē,' +
      'kadana, smṛtikaḷe, māikkuka, jananī,' +

      'kanivāyi, tuṇayāyi, anavara,tam hṛdi,' +
      'tanalaru,ḷum sura, taru val,lari nī,' +
      'pularit,tēn malar, kānti, katiroḷi,' +
      'vitaṛum, bhuvana ma,nōhara, vadanē',

    'notes': 's s d.p., s s g g, g m d d, p m g,' +
      'g m p, g r s, s s d. d., d. r s,' +
      'g m d, p p mg, g m d Sn, SnS p mg,' +
      'g m d, p g r, rs d.p., d. r s,' +

      'p p dp, S S S, p d p, d R S,' +
      'd S G, R S S S, pd p p, d R S,' +
      'n n dp, S S S, p d p, d R S,' +
      'd S G, R S S S, pd p p, d R S,' +
      'd S GR, G G G, G M R, d dR S,' +
        'r m d, g p S S, p g r, r s s,' +


      ('p p dp, S S S, p d p, d R S,' +
        'd S G, R S S S, pd p p, d R S,' +
        'd S GR, G G G, G M R, d dR S,' +
        'r m d, g p S S, p g r, r s s,').repeat(2),
  },
  'Āṭalarasē': {
    'raga': 'sēnāvati',
    'lyrics': 'āṭalarasē, āṭalarasē,' +
      'āṭumivarai, pārumarasē,' +
      'tattuvankaḷ, kēṭṭarintār,' +
      'tannil atanai, uṇarvatenṭrō?',
    'notes': 's r m m m, m gg r s s, _ d. n. s g1 r, r s ss s,' +
      's sr m m, m m m pm, g gm pp pn, dd dp p p',
    'tracks': [
      { 'file': 'keherewa', 'from': 0, 'end': -1 }
    ]
  },
  'Karuna Sindho Bhairavi': {
    'raga': 'sindhubhairavī',
    'lyrics': 'Karuna, sindho, bhaira,vi,' +
      'amṛtā,nanda,mayī de,vī,' +
      'Karuna, sindho, bhaira,vi,' +

      'Pūṛṇa, brahma sva,rūpiṇ,yai,' +
      'saccidā,nanda, mūrtta,ye,' +
      'ātmā, rāmāgra, gaṇyā,yai,' +
      'amṛte,śvaryai, namo na,maḥ,' +

      'Sarva, mangaḷa, māngal,ye' +
      ',śive sa,rvartha, sādhi,ke' +
      ',sarṇye, trayamba,ke gau,ri' +
      ',nārā,yaṇi, namostu, te' +
      ',Amṛte,śvari, namos,tu te' +

      ',Tvameva, mata, ca pītā, tvameva' +
      ',tvameva, bandhus, ca sakhā, tvameva' +
      ',Tvameva, vidyā, dravinam, tvameva' +
      ',tvameva, sarvam, amṛteśvari, mā' +
      ',tvameva, sarvam, amṛteśvari, mā' +

      ',Śaraṇ,āgata, dīnār,tha, pari,trāṇa, paraya,ṇē' +
      ',sarva,syārthi ha,re de,vī' +
      ',nār,āyani, namostu, te' +
      ',Amṛt,eśvari, namostu, te' +

      ',Śrīmā,tā śrī, mahārāj,ñī, śrīmat, simhāsan’,eśva,ri' +
      ',cidagni, kuṇda, sambhū,tā, deva, kārya, samudya,tā' +
      ',Amṛt,eṣvariyai, namo, namaḥ' +

      ',Karuna, sindho, bhaira,vi, amṛtā,nanda,mayī, devī' +
      ',Karuna, sindho, karuna, sindho, karuna, sindho, bhaira,vi',

    'notes': 's r m,g rss,n.d. n. s,s,' +
      'p d Sn,d p,m g gp,m,' +
      's g mpd,m r,rg r,s,' +

      'm m,m m g,p p,p,' +
      'n n n,d2 m,pd1n d1,p,' +
      'd d,d d p,mg gp,m,' +
      'd d d,mg r,r g r,s,' +

      'S S,S S S,Sn nR,S,' +
      'n n n,d2 m,pd1n d1,p,' +
      'd d d,d p,mg gp,m,' +
      'sg mpd,m g,r rg,r s,' +
      'n. n. g,g g,r g,r s,' +

      's m m,mp mg,g g p,ndd m m,' +
      'd d m,g r,r r grg,r s s,' +
      'p pS S,S S,S R GRG,R S RSn,' +
      'n n d2,pd2 d2m,p d1 nd1n d1 p,p,' +
      'd d m,g r,r r grg r s,s,' +

      ('S S,S S S,Sn nR,S,' +
        'n n n,d2 m,pd1n d1,p,' +
        'd d d,d p,mg gp,m,' +
        'sg mpd,m g,r rg,r s,' +
        'n. n. g,g g,r g,r s,').repeat(2),
  },
  'Kēzhunnen Mānasam Ammā': {
    'raga': 'darbāri kānaḍa',
    'tracks': [
      // if not specified, just paste it once
      // if -1, go until end
      // if length is longer than file, repeat file
      // if length is shorter, then crop file
      { 'file': 'keherewa', 'from': 1, 'to': -1 },
      { 'file': 'kezhunnen manasam 07.10.2021', 'from': 0 },


      // Resample file to a uniform speed (e.g. 1000 per bar)
      // Then just split it into bars and save it
      // At each line you just have to play that bar sped up or slowed down
      // Take song, split it up into bars. Individual files
      // Then just resample them to the bar width. When you get to bar, just play that one
      // Take some random music file, just rescale and test it out
    ],
    'lyrics': 'kēzhunnen, mānasam, ammā, - kēlkkān,' +
      'kātillē, ninakken,ammā, - ammā,' +
      'kezhunnen, mānasam, ammā,...,' +

      'piṭayum, hṛdayavumāyi, ninne, tēṭi,' +
      'nāṭāke, alaññu ñān, ammā,,' +
      'en munnil, varuvān, entini, tāmasam,' +
      'entiha, ñān cheyvū, ammā, - ammā,' +
      'entiha, ñan cheyvū, ammā,...,' +

      'aśaktanām, ennōṭī, alambhāvam, kāṭṭuvān,' +
      'aparādham, ñān entu, cheytu...,?,' +
      'chūṭu kaṇṇī,rāl ñān, nin malar,aṭikaḷ,' +
      'kazhukīṭām, ennennum, ammā, ammā,' +
      'kazhukīṭām, ennennum, ammā,...,' +

      'dussaha, māmī, prārabdha, bhārattāl,' +
      'kuzhayunnu, ñān en, ammā,,' +
      'taḷarumī, aṭiyanu, tāngu nal,kīṭuvān,' +
      'tāmasam, arutē, ammā, - ammā,' +
      'tāmasam, arutē, ammā,...,',
    'notes': 'g r s, d. n. n., s s, m m,' +
      'pS SnRS np, m p g, m r, sr mg,' +
      'm r s, d. n. n., grsrgm gs,_,' +

      ('m m m, p p p nd n_Snd, nS n, S S,' +
        'R R R, Sn d n nS, S S,_,' +
        'G G G, R R S_n, nS R S, dn m p,' +
        'mp n p, g r s, r r, sr mg,' +
        'm r s, d. n. n., grsrgm gs,_,').repeat(3),
  },
  'Etayō Tēṭi': {
    'raga': 'kīravāṇī',
    'lyrics': 'etayō tēṭi, alaintu inṭru, unai tēṭuki,rēn,' +
      'kaṇmaṇiyē, karuṇaimazhayē, iruppiṭam tanai, sol' +
      'maunattil lakṣam, pāṭhankaḷ tantāy,' +
      'purintatellām, appōt,' +
      'sūzhnilai vantāl, ellām marantēn,' +
      'iggati toṭarntāl, narggatiyuṇḍō?',
    'notes': 'p p m g r, r mpm g rg r s n., n. n. s g r, r,'
      + 'r m m g r, r g r s, n. p. n. n. s g, r s s s s',
  },
  'Jhilam Jhilam': {
    'raga': 'mohanam',
    'lyrics': 'jhilam jhilam,padam bhaveh,',
    'notes': 'rgg rgg rgg rgg, sgg rgg rgg rgg,' +
      'srr srr srr srr,r grr s s,' +
      'gpp dSS S S,S S S RSS, S, dS d,' +
      'd S d p, p p d p, g g r g, r s s s',
  },
  'Ente Kaṇṇunīr': {
    'raga': 'mayamalavagaula',
    'lyrics': 'ente, kaṇṇunīr, etra kan,dālum,' +
      'manasali,yuka il,lē, ammē nin,' +
      'manasali,yuka il,lē,?,' +

      'etrayō, nāḷukaḷāyi, nin pādam, aṇayunnu,' +
      'enniṭṭum, anguḷḷil, prasādam il,lē ' +
      'am,mē,...,' +
      'anguḷḷil, prasādam il,lē,?,' +

      'nin bhakta, dāsarkku, manaḥśānti, eṅkilum,' +
      'nalkuvān, entinammē, maṭi kāṭṭu,nu ' +
      'am,mē,...,' +
      'entinu, maṭi kāṭṭu,nu,' +

      'nin pāda, śaraṇārttham, aṇayumī, aṭiyane,' +
      'śaraṇam, nalki, anugrahik,kū ' +
      'am,mē,...,' +
      'śaraṇam, nalki,anugrahik,kū,',

    'notes': '_n S, nSnS n dpdm, m mpm m, grr s,' +
      'gmpm, g r gm, p, mpdp mp g,' +
      'gmpm, grr, s,s,' +

      ('m, m, mp g m, p p p dpdm,' +
        'pd S S, nS d d, S SnS d d, p' +
        'p, S, nS ndpdpm,' +
        'mp d p, m grg r, r s, _,').repeat(3).slice(0, -1),
  },
  'Muralī Ninadam Kātil': {
    'raga': 'śivaranjinī',
    'lyrics': 'muralī, ninadam, kātil, muzhangān,' +
      'mazha muki,loli varnnam, mizhiyil, teḷiyān,' +
      'karalin, kadanak,kanalukaḷ, anayān,' +
      'varumō, kuvalaya, nayanā... ,kṛṣṇā,' +
      'varumō, kuvalaya, nayanā,...,' +

      'kilukile, naṭayum, naṛu puñ,ciriyum,' +
      'karuṇāmṛta, rasam, ozhukum, mizhiyum,' +
      'karaḷil, kaṇikand,azhalā,ṛīṭān,' +
      'varumō, kuvalaya, nayanā,...,' +
      'kṛṣṇā,...,...,...,'.repeat(3) +

      'paramā,nanda, kuḷira,la ākum,' +
      'kaḷa mura,līrava, svaralaya, rāgam,' +
      'ozhukiy,zhukiyen, hṛdayata,ṭākam,' +
      'niṛayaṇa,mē kara, kaviyaṇa,mē...' +
      'kṛṣṇā,...,...,...,'.repeat(3),
    'notes': 's r g p,p,dSd dp p, m2p m2p m2g g,'
  },
};
