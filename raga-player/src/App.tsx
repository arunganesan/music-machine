import { useState } from 'react';
import './App.css';
import * as React from 'react';

// import Tone from 'tone'
import * as Tone from 'tone'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

import _ from 'lodash';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const NOTE_RAGA_MAP: string[] = [
  's', 'r1', 'r2', 'g1',
  'g2', 'm1', 'm2', 'p',
  'd1', 'd2', 'n1', 'n2'
];

const RAGAS: {[key: string]: string[][]} = {
  'sivaranjini': [
    's r2 g1 p d2 s^'.split(' '),
    's^ d2 p g1 r2 s'.split(' ')
  ],
  'darbari kanada': [
    'n1. s r2 g1 s m1 p d1 n1 s^'.split(' '),
    's^ d1 n1 p m1 p g1 m1 r2 s'.split(' ')
  ]
};

type Song = {
  raga: string,
  notes: string[],
};

const SONGS: { [key: string]: Song } = {
  'arikil undenkilum':  {
    'raga': 'sivaranjini',
    'notes': [
      'p. d. s r g*3 r g/2 r/2 s/2 d./2 s*4',
      's r g p p*4 g r/2 g/4 p/4 g/2 r/2 s*2',
      'r/2 g/4 r/4 s d. d.*2 d. d./2 s/2 s/2 r*4 s d. d. p.*2',
      'p. d. s r g*4 r s*2 s/2 r/4 g/4 r/2 s/2 d.*3',
      'p. d. s r g*4 r s*4',

      'd d p d d s^ d/3 p/3 g*2 g g r/2 g/2 s s*2',
      'p d d d/2 s^/2 s^/2 r^/2 d/2 p*4',
      'd/2 s^/2 r^ s^ d p*3 d*3 d/3 p/3 g/3 g g*2',
      'r g g g r r g g r*4 r/2 r/2 s/2 d./4 p.',
      'p. d. s s s r g*4 r s'
    ]
  }
};


async function playSong(song: Song, shruti: number, speed: number) {
  // Find the mapping from each note
  const raga = RAGAS[song['raga']];
  let mapping: {[key: string]: string} = {};
  _.flatten(raga).forEach(note => {
    note = note.replace('^', '').replace('.', '');
    if (/\d/.test(note)) {
      const basenote = note.replace(/\d/, '');
      mapping[basenote] = note;
    }
  });

  // Convert notes to a time and something in the note raga map
  // eventually to frequencies
  const notes = _.join(song['notes'], ' ').split(' ');
  const synth = new Tone.AMSynth().toMaster();

  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    // remove any time signature.
    let duration = speed;
    if (note.includes('/')) {
      duration /= parseInt(note.slice(-1));
      note = note.slice(0, note.indexOf('/'));
    } else if (note.includes('*')) {
      duration *= parseInt(note.slice(-1));
      note = note.slice(0, note.indexOf('*'));
    }

    let octave = 0;
    if (note.includes('^')) {
      note = note.replace('^', '');
      octave = 1;
    } else if (note.includes('.')) {
      note = note.replace('.', '');
      octave = -1;
    }


    const mappednote = _.has(mapping, note) ? mapping[note] : note;
    const semitone = NOTE_RAGA_MAP.indexOf(mappednote) + octave * 12;
    // @ts-ignore
    const frequency = Tone.Frequency('C4').transpose(shruti + semitone);
    synth.triggerAttackRelease(frequency, duration);
    await sleep(duration);
  }
  synth.triggerRelease();
}


function ragaToSemitone(raga: string[]) {
  return Array.from(raga).map((note: string) => {
    let octave = 0;
    if (note.includes('^')) {
      note = note.replace('^', '');
      octave = 1;
    } else if (note.includes('.')) {
      note = note.replace('.', '');
      octave = -1;
    }
    return NOTE_RAGA_MAP.indexOf(note) + octave * 12;
  });
}

async function playRaga(ragaName: string, shruti: number, speed: number) {
  const synth = new Tone.AMSynth().toMaster();
  const raga = _.flatten(RAGAS[ragaName]);
  const semitones = ragaToSemitone(raga);
  // @ts-ignore
  const frequencies = semitones.map(note => Tone.Frequency('C4').transpose(shruti + note));
  for (let i = 0; i < frequencies.length; i++) {
    synth.triggerAttackRelease(frequencies[i], speed);
    await sleep(speed);
  }
  synth.triggerRelease();
}


function getShrutiName(shruti: number): string {
  switch (shruti) {
    case -5: return 'G4';
    case -4: return 'G#4';
    case -3: return 'A4';
    case -2: return 'A#4';
    case -1: return 'B4';
    case 0: return 'C4';
    case 1: return 'C#4';
    case 2: return 'D4';
    case 3: return 'D#4';
    case 4: return 'E4';
    case 5: return 'F4';
  }
  return '';
}


export default function App() {
  const [shruti, setShruti] = useState(-3);
  const [speed, setSpeed] = useState(250);
  return (
    <div className="App">
      Shruti: {getShrutiName(shruti)}
      <Form.Control type="range" min={-5} max={5} value={shruti} onChange={e => setShruti(parseInt(e.target.value))} />

      Speed
      <Form.Control type="number" value={speed} onChange={e => setSpeed(parseInt(e.target.value))} />
      {
        _.keys(RAGAS).map(raga =>
          <Button
            style={{ height: '50px' }}
            key={`button: ${raga}`}
            onClick={async () => await playRaga(raga, shruti, speed)}
            block>{raga}</Button>
        )
      }

      {
        _.keys(SONGS).map(song =>
          <Button
            style={{ height: '50px' }}
            key={`button: ${song}`}
            variant="warning"
            onClick={async () => await playSong(SONGS[song], shruti, speed)}
            block>{song}</Button>
        )
      }
    </div>
  );
}
