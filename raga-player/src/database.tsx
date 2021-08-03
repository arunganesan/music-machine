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

export const DEFAULT_TEMPO = 250;

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
  'darbari kanada': [
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
  'cakravakam': [
    's r1 g2 m1 p d2 n1 S',
    'S n1 d2 p m1 g2 r1 s'
  ],
  'kīravāṇī': [
    's r2 g1 m1 p d1 n2 S',
    'S n2 d1 p m1 g1 r2 s'
  ],
  'sindhubhairavī': [
    's r1 g1 m1 p d1 n1 S',
    'S n1 d1 p m1 g1 r1 s',
  ],
};


export const SONGS: { [key: string]: SongType } = {
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
      'd d m,g r,r r grg r s,s'
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
      'kṛṣṇā,...,...,...,' +
      'kṛṣṇā,...,...,...,' +
      'kṛṣṇā,...,...,...,',

    // 'paramānanda kuḷirala ākum' +
    // 'kaḷa muralīrava svaralaya rāgam' +
    // 'ozhukiyzhukiyen hṛdayataṭākam' +
    // 'niṛayaṇamē kara kaviyaṇamē... kṛṣṇā',
    'notes': 's r g p,p,dSd dp p, m2p m2p m2g g,' +
      '_,'.repeat(44),
  },
};
