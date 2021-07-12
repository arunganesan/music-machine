import type { Song } from './database';

import { useState } from 'react';
import './App.css';
import * as React from 'react';
import { NOTE_RAGA_MAP, RAGAS, SONGS } from './database';
import * as Tone from 'tone'
import { Button, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playRaga(ragaName: string, shruti: number, speed: number) {
  const notes = _.join(RAGAS[ragaName], ' ').split(' ');
  await playNotes(notes, shruti, speed, {});
}

async function playSong(song: Song, shruti: number, speed: number) {
  // Find the mapping from each note
  const ragaNotes = _.join(RAGAS[song['raga']], ' ').split(' ');
  let mapping: {[key: string]: string} = {};
  ragaNotes.forEach(note => {
    note = note.replace('^', '').replace('.', '');
    if (/\d/.test(note)) {
      const basenote = note.replace(/\d/, '');
      mapping[basenote] = note;
    }
  });
  const notes = _.join(song['notes'], ' ').split(' ');
  await playNotes(notes, shruti, speed, mapping);
}

async function playNotes(notes: string[], shruti: number, speed: number, mapping: { [key: string]: string }) {
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
    if (note.includes('.')) {
      note = note.replace('.', '');
      octave = -1;
    } else if (note.toLowerCase() !== note) {
      note = note.toLowerCase();
      octave = 1;
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


function getShrutiName(shruti: number): string {
  switch (shruti) {
    case -5: return 'G3';
    case -4: return 'G#3';
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
