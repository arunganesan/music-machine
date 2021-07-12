export const NOTE_RAGA_MAP: string[] = [
    's', 'r1', 'r2', 'g1',
    'g2', 'm1', 'm2', 'p',
    'd1', 'd2', 'n1', 'n2'
  ];

export const RAGAS: { [key: string]: string[] } = {
  'sivaranjini': [
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
  ]
};

export type Song = {
  raga: string,
  notes: string[],
};

export const SONGS: { [key: string]: Song } = {
  'ente kannunir': {
    'raga': 'mayamalavagaula',
    'notes': [
      'n S*2 n/4 S/4 n/4 S/4 n*2 d/4 p/4 d/4 m/4 m p m g/3 r/3 r/3 s*2',
      'g m p m g r g/2 m/2 p m/4 p/4 d/4 p/4 m/2 p/2 g',
      'g m p m g r r s*4',
      'm*7 m/2 p/2 g m p p p d/4 p/4 d/4 m/4',
      'p/2 d/2 S S n/2 S/2 d d S S/3 n/3 S/3 d d p*3',
      'p S*3 n/2 S/2 n/6 d/6 p/6 d/6 p/6 m/6',
      'm/2 p/2 d p m g/3 r/3 g/3 r r s*2'
    ]
  },
  'kezhunnen manasam amma': {
    'raga': 'darbari kanada',
    'notes': [
      'g*2 r s d.*2 n. s s*4 m m',
      'p/2 S/2 S/4 n/4 R/4 S/4 n/2 p/2 m p g m r*4 s/2 r/2 m/2 g',
      'm r s d. n. n. g/6 r/6 s/6 r/6 g/6 m/6 g/2 s*4',
      'm*3 p*3 n/2 d/2 n/2 S/3 n/3 d/3 n/2 S/2 n S S*3',
      'R*3 S/2 n/2 d n n/2 S/2 S*4',
      'G*3 R*2 S/2 n/2 n/2 S/2 R*2 S*2 d/2 n/2 m p',
      'm/2 p/2 n p g r s r r s/2 r/2 m/2 g/2',
      'm r s d. n. n. g/6 r/6 s/6 r/6 g/6 m/6 g/2 s*4',
    ]
  },
  'arikil undenkilum': {
    'raga': 'sivaranjini',
    'notes': [
      'p. d. s r g*3 r g/2 r/2 s/2 d./2 s*4',
      's r g p p*4 g r/2 g/4 p/4 g/2 r/2 s*2',
      'r/2 g/4 r/4 s d. d.*2 d. d./2 s/2 s/2 r*4 s d. d. p.*2',
      'p. d. s r g*4 r s*2 s/2 r/4 g/4 r/2 s/2 d.*3',
      'p. d. s r g*4 r s*4',

      'd d p d d S d/3 p/3 g*2 g g r/2 g/2 s s*2',
      'p d d d/2 S/2 S/2 R/2 d/2 p*4',
      'd/2 S/2 R S d p*3 d*3 d/3 p/3 g/3 g g*2',
      'r g g g r r g g r*4 r/2 r/2 s/2 d./4 p.',
      'p. d. s s s r g*4 r s'
    ]
  },
  'isvari jagadisvari': {
    'raga': 'mohanam',
    'notes': [
      'g*5 r g r/2 g/s s*3',
      's r s/2 d./2 p. d.*2 s r/2 g*2',
      'g p p p p p d p/2 g/2 g r',
      's r g/2 r/2 s d. d. s r/2 s*2'
    ]
  },
  'azhikkulil': {
    'raga': 'mohanam',
    'notes': [
      'g g g g r g d p g r s/4 r/4 s/4 d./4',
      'd. d. r r r r g/3 r/3 s/3 d./4 s/4 d./4 s s s s s',
      'g/3 r/3 s/3 r g p p p p d d S/2 d/2 S/2 d/2 p',
      'p d/3 p/3 d/3 p g/2 r/2 r s s r g p/3 d/3 p/3 g/2 r/3 s/3',
      's r r r g/2 r/2 s/2 d./2 d. d. s s s*3',

      'g g g r g g g g d/3 p/3 d/3 p g/2 r/2 r/2 s/2',
      's r r g/3 r/3 s/3 s g/6 r/6 s/6 r/6 g/6 p/6 g*3',
      'g p d S S S S S/3 S/3 R/3 S/2 d/2 p d d d',
      'p d p/2 g/2 g/2 r/2 r s s r g/6 p/6 p/6 d/6 p/6 g*3',

      'g g r g g g p/2 g/2 r s d. d./2 p./2',
      'd. r r g/3 r/3 s/3 s r g g g p p',
      'g p p d/4 p/4 d/4 p/4 g r g g',
      'p/2 d/2 d/2 p/2 d d p d/2 p/2 g p S d',
      'g/2 p/2 d/2 S/2 S S/2 d/2 S R R R*3'
    ]
  }
};
