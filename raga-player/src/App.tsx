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
  'arikil indenkilum': [
    'p. d2. s r2 g1 g1 g1 r2 g1 r2 s d2. s s s s'.split(' '),
    's r2 g1 p p g1 r2 g1 p g1 r2 s'.split(' '),
    'r2 g1 r2 s d2. d2. d2. d2. s s r2 s d2. d2. p.'.split(' '),
    'p. d2. s r2 g1 r2 s s r2 g1 r2 r2 s s d2. d2.'.split(' '),
    'p. d2. s r2 g1 r2 s'.split(' '),
  ],
  'darbari kanada': [
    'n1. s r2 g1 s m1 p d1 n1 s^'.split(' '),
    's^ d1 n1 p m1 p g1 m1 r2 s'.split(' ')
  ]
};

const NOTE_LENGTH = 500;

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

async function playRaga(ragaName: string, shruti: number) {
  const synth = new Tone.AMSynth().toMaster();
  const raga = _.flatten(RAGAS[ragaName]);
  const semitones = ragaToSemitone(raga);
  // @ts-ignore
  const frequencies = semitones.map(note => Tone.Frequency('C4').transpose(shruti + note));

  console.log(raga);
  console.log(semitones);

  for (let i = 0; i < frequencies.length; i++) {
    synth.triggerAttackRelease(frequencies[i], NOTE_LENGTH);
    await sleep(NOTE_LENGTH);
  }
  synth.triggerRelease();
}


export default function App() {
  const [shruti, setShruti] = useState(-3);
  return (
    <div className="App">
      <Form.Control type="range" min={-8} max={8} value={shruti} onChange={e => setShruti(parseInt(e.target.value))} />
      {
        _.keys(RAGAS).map(raga =>
          <Button
            style={{ height: '50px' }}
            key={`button: ${raga}`}
            onClick={async () => await playRaga(raga, shruti)}
            block>{raga}</Button>
        )
      }
    </div>
  );
}