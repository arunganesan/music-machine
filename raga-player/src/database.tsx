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
      'd d m,g r,r r grg r s,s,' +


      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +

      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +

      '_,_,_,_,' +
      '_,_,_,_,' +
      '_,_,_,_,' +

      '_,_,_,_',
    'lines': [],
  },
  'Etayō Tēṭi': {
    'raga': 'kīravāṇī',
    'lyrics': 'etayō tēṭi, alaintu inṭru, unai tēṭuki,rēn,' +
      'kaṇmaṇiyē, karuṇaimazhayē, iruppiṭam tanai, sol',
    // 'maunattil lakṣam, pāṭhankaḷ tantāy,' +
    // 'purintatellām, appōt,' +
    // 'sūzhnilai vantāl, ellām marantēn,' +
    // 'iggati toṭarntāl, narggatiyuṇḍō?',
    'notes': 'p p m g r, r mpm g rg r s n., n. n. s g r, r,'
      + 'r m m g r, r g r s, n. p. n. n. s g, r s s s s',
    'lines': [],
  },
  'jhilam jhilam': {
    'raga': 'mohanam',
    'lyrics': 'jhilam jhilam,padam bhaveh',
    'notes': 'rgg rgg rgg rgg, sgg rgg rgg rgg' +
      'srr srr srr srr,rrr grr sss sss' +
      'gpp dSS SSS SSS,SSS SSS SSS RSS, S, ds d' +
      'd S d p, p p d p, g g r g, r s s s',
    'lines': [],
  },
  'nalancu naleykku': {
    'raga': 'cakravakam',
    'lines': [
      { lyrics: '', notes: 'n. s r m g r g r s n.' },
      { lyrics: '', notes: 'n. s r m g r g r n. s' },
      { lyrics: '', notes: 'm/2 p/2 d n d d d d n R S' },
      { lyrics: '', notes: 'n/4 S/4 n/4 R/4 S n d/3 p/3 m/3 m m g/6 m/6 p/6 g/6 m/6 r n. s' },
      { lyrics: '', notes: 'd n d p/2 m/2 m m g m p d' },
      { lyrics: '', notes: 'm d n R R R S R/2 S/2 n R S' },
      { lyrics: '', notes: 'n S R G R S R S n n' },
      { lyrics: '', notes: 'n/4 S/4 n/4 R/4 S n d/3 p/3 m/3 m m g/6 m/6 p/6 g/6 m/6 r n. s' },
    ]
  },
  'ente kannunir': {
    'raga': 'mayamalavagaula',
    'lyrics': 'ente, kannunir, etra kan,dalum,' +
      'manasali,yuka il,le, amme nin,' +
      'manasali,yuka il,le,...,' +
      'etrayo, naliukalai, nin padam, alayunnu,' +
      'ennitum, angulil, prasadam il,le' +
      'am,me,...,' +
      'angulil, prasadam il,le,...',
    'notes': '_ n S, nSnS n dpdm, m p m, grr s,' +
      'gm m pm m, g r gm, p, mpdp mp g,' +
      'g m p m, g r r, s,s,' +
      'm m m, m m m m, mp g m, p p p dpdm,' +
      'pd S S, nS d d, S SnS d d, p' +
      'p, S, nS ndpdpm,' +
      'mp d p, m grg r, r s, _',
    'lines': [],
  },
  'kezhunnen manasam amma': {
    'raga': 'darbari kanada',
    'lines': [
      { lyrics: '', notes: 'g*2 r s d.*2 n. s s*4 m m' },
      { lyrics: '', notes: 'p/2 S/2 S/4 n/4 R/4 S/4 n/2 p/2 m p g m r*4 s/2 r/2 m/2 g' },
      { lyrics: '', notes: 'm r s d. n. n. g/6 r/6 s/6 r/6 g/6 m/6 g/2 s*4' },
      { lyrics: '', notes: 'm*3 p*3 n/2 d/2 n/2 S/3 n/3 d/3 n/2 S/2 n S S*3' },
      { lyrics: '', notes: 'R*3 S/2 n/2 d n n/2 S/2 S*4' },
      { lyrics: '', notes: 'G*3 R*2 S/2 n/2 n/2 S/2 R*2 S*2 d/2 n/2 m p' },
      { lyrics: '', notes: 'm/2 p/2 n p g r s r r s/2 r/2 m/2 g/2' },
      { lyrics: '', notes: 'm r s d. n. n. g/6 r/6 s/6 r/6 g/6 m/6 g/2 s*4' },
    ]
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
      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,' +

      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,' +
      's,s,s,s,',
    'lines': [],
  },
  'arikil undenkilum': {
    'raga': 'śivaranjinī',
    'lines': [
      { lyrics: '', notes: 'p. d. s r g*3 r g/2 r/2 s/2 d./2 s*4' },
      { lyrics: '', notes: 's r g p p*4 g r/2 g/4 p/4 g/2 r/2 s*2' },
      { lyrics: '', notes: 'r/2 g/4 r/4 s d. d.*2 d. d./2 s/2 s/2 r*4 s d. d. p.*2' },
      { lyrics: '', notes: 'p. d. s r g*4 r s*2 s/2 r/4 g/4 r/2 s/2 d.*3' },
      { lyrics: '', notes: 'p. d. s r g*4 r s*4' },

      { lyrics: '', notes: 'd d p d d S d/3 p/3 g*2 g g r/2 g/2 s s*2' },
      { lyrics: '', notes: 'p d d d/2 S/2 S/2 R/2 d/2 p*4' },
      { lyrics: '', notes: 'd/2 S/2 R S d p*3 d*3 d/3 p/3 g/3 g g*2' },
      { lyrics: '', notes: 'r g g g r r g g r*4 r/2 r/2 s/2 d./4 p.' },
      { lyrics: '', notes: 'p. d. s s s r g*4 r s' }
    ]
  },
  'isvari jagadisvari': {
    'raga': 'mohanam',
    'lines': [
      { lyrics: '', notes: 'g*5 r g r/2 g/s s*3' },
      { lyrics: '', notes: 's r s/2 d./2 p. d.*2 s r/2 g*2' },
      { lyrics: '', notes: 'g p p p p p d p/2 g/2 g r' },
      { lyrics: '', notes: 's r g/2 r/2 s d. d. s r/2 s*2' }
    ]
  },
  'azhikkulil': {
    'raga': 'mohanam',
    'lines': [
      { lyrics: '', notes: 'g g g g r g d p g r s/4 r/4 s/4 d./4' },
      { lyrics: '', notes: 'd. d. r r r r g/3 r/3 s/3 d./4 s/4 d./4 s s s s s' },
      { lyrics: '', notes: 'g/3 r/3 s/3 r g p p p p d d S/2 d/2 S/2 d/2 p' },
      { lyrics: '', notes: 'p d/3 p/3 d/3 p g/2 r/2 r s s r g p/3 d/3 p/3 g/2 r/3 s/3' },
      { lyrics: '', notes: 's r r r g/2 r/2 s/2 d./2 d. d. s s s*3' },

      { lyrics: '', notes: 'g g g r g g g g d/3 p/3 d/3 p g/2 r/2 r/2 s/2' },
      { lyrics: '', notes: 's r r g/3 r/3 s/3 s g/6 r/6 s/6 r/6 g/6 p/6 g*3' },
      { lyrics: '', notes: 'g p d S S S S S/3 S/3 R/3 S/2 d/2 p d d d' },
      { lyrics: '', notes: 'p d p/2 g/2 g/2 r/2 r s s r g/6 p/6 p/6 d/6 p/6 g*3' },

      { lyrics: '', notes: 'g g r g g g p/2 g/2 r s d. d./2 p./2' },
      { lyrics: '', notes: 'd. r r g/3 r/3 s/3 s r g g g p p' },
      { lyrics: '', notes: 'g p p d/4 p/4 d/4 p/4 g r g g' },
      { lyrics: '', notes: 'p/2 d/2 d/2 p/2 d d p d/2 p/2 g p S d' },
      { lyrics: '', notes: 'g/2 p/2 d/2 S/2 S S/2 d/2 S R R R*3' }
    ]
  }
};
