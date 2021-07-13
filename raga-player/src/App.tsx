import type { Song } from './database';

import { useState } from 'react';
import './App.css';
import * as React from 'react';
import { NOTE_RAGA_MAP, RAGAS, SONGS } from './database';
import Tone from 'tone'
import { Dropdown, DropdownButton, Card, Button, Form } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import { setConstantValue } from 'typescript';

type ShrutiMap = { [key: string]: number };
type TempoMap = { [key: string]: number };
type SemitoneAndDuration = {
  semitone: number,
  duration: number,
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playRaga(ragaName: string, shruti: number, speed: number) {
  const notes = _.join(RAGAS[ragaName], ' ').split(' ');
  const semitonesAndDuration = getSemitoneAndDuration(notes, shruti, speed, {});
  await playSemitonesAndDurations(semitonesAndDuration);
}

function getSemitonesAndDurationOfSong(song: Song, shruti: number, speed: number):  SemitoneAndDuration[] {
  const ragaNotes = _.join(RAGAS[song['raga']], ' ').split(' ');
  let mapping: { [key: string]: string } = {};
  ragaNotes.forEach(note => {
    note = note.replace('^', '').replace('.', '');
    if (/\d/.test(note)) {
      const basenote = note.replace(/\d/, '');
      mapping[basenote] = note;
    }
  });
  const notes = _.join(song['notes'], ' ').split(' ');
  return getSemitoneAndDuration(notes, shruti, speed, mapping);
}

async function playSong(song: Song, shruti: number, speed: number) {
  const semitonesAndDuration = getSemitonesAndDurationOfSong(song, shruti, speed);
  await playSemitonesAndDurations(semitonesAndDuration);
}


async function playStartingNote(song: Song, shruti: number) {
  const semitonesAndDuration = getSemitonesAndDurationOfSong(song, shruti, 1000);
  await playSemitonesAndDurations(semitonesAndDuration.slice(0, 1));
}

async function playLowestNote(song: Song, shruti: number) {
  const semitonesAndDuration = getSemitonesAndDurationOfSong(song, shruti, 1000);
  const lowest = _.minBy(semitonesAndDuration, semitoneAndDuration => semitoneAndDuration.semitone);
  if (lowest !== undefined) {
    await playSemitonesAndDurations([lowest]);
  }
}


async function playHighestNote(song: Song, shruti: number) {
  const semitonesAndDuration = getSemitonesAndDurationOfSong(song, shruti, 1000);
  const lowest = _.maxBy(semitonesAndDuration, semitoneAndDuration => semitoneAndDuration.semitone);
  if (lowest !== undefined) {
    await playSemitonesAndDurations([lowest]);
  }
}


function getSemitoneAndDuration(
  notes: string[],
  shruti: number,
  speed: number,
  mapping: { [key: string]: string }
): SemitoneAndDuration[] {
  let semitoneAndDurations: SemitoneAndDuration[] = [];

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
    const semitone = NOTE_RAGA_MAP.indexOf(mappednote) + octave * 12 + shruti;
    semitoneAndDurations.push({
      'semitone': semitone,
      'duration': duration
    });
  }

  return semitoneAndDurations;
}

async function playSemitonesAndDurations(
  semitonesAndDuration: SemitoneAndDuration[]
) {
  // const semitonesAndDuration = getSemitoneAndDuration(notes, shruti, speed, mapping);
  const synth = new Tone.AMSynth().toMaster();
  for (let i = 0; i < semitonesAndDuration.length; i++) {
    // @ts-ignore
    const frequency = Tone.Frequency('C4').transpose(semitonesAndDuration[i].semitone);
    synth.triggerAttackRelease(frequency, semitonesAndDuration[i].duration);
    await sleep(semitonesAndDuration[i].duration);
  }
  synth.triggerRelease();
}


const SHRUTI_OFFSET_MAP: { [key: string]: string } = {
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

const DEFAULT_TEMPO = 250;
const DEFAULT_SHRUTI = 0;

export default function App() {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [shrutiMap, setShrutiMap] = useState<ShrutiMap>(
    JSON.parse(localStorage.getItem('shruti') ?? '{}'));
  const [tempoMap, setTempoMap] = useState<TempoMap>(
    JSON.parse(localStorage.getItem('tempo') ?? '{}'));

  const updateShrutiMap = (song: string, newShruti: string) => {
    shrutiMap[song] = _.parseInt(newShruti);
    localStorage.setItem('shruti', JSON.stringify(shrutiMap));
    setShrutiMap(shrutiMap);
    setForceUpdate(forceUpdate + 1);
  }

  const updateTempoMap = (song: string, newTempo: string) => {
    tempoMap[song] = _.parseInt(newTempo);
    localStorage.setItem('tempo', JSON.stringify(tempoMap));
    setTempoMap(tempoMap);
    setForceUpdate(forceUpdate + 1);
  }

  return (
    <div className="App">
      {
        _.keys(SONGS).map(song =>
          <Card key={`${song}`} className='song-card'>
            <Card.Body>
              <div className='song-row'>
                <div className='song-title'>{song}</div>

                <Button
                  onClick={async () =>
                    await playRaga(
                      SONGS[song]['raga'],
                      shrutiMap[song] ?? DEFAULT_SHRUTI,
                      tempoMap[song] ?? DEFAULT_TEMPO)}>
                  {SONGS[song]['raga']}
                </Button>

                <Button
                  onClick={async () =>
                    await playSong(
                      SONGS[song],
                      shrutiMap[song] ?? DEFAULT_SHRUTI,
                      tempoMap[song] ?? DEFAULT_TEMPO)}>
                  Play song
                </Button>

                <Button
                  onClick={async () => await playStartingNote(SONGS[song],
                    shrutiMap[song] ?? DEFAULT_SHRUTI,)
                  }>
                  Starting note
                </Button>


                <Button
                   onClick={async () => await playLowestNote(SONGS[song],
                    shrutiMap[song] ?? DEFAULT_SHRUTI,)
                  }>
                  Lowest note
                </Button>


                <Button
                  onClick={async () => await playHighestNote(SONGS[song],
                    shrutiMap[song] ?? DEFAULT_SHRUTI,)
                  }>
                  Highest note
                </Button>


                <Form.Control
                  className='song-shruti-input'
                  as="select"
                  value={shrutiMap[song] ?? DEFAULT_SHRUTI}
                  onChange={e => updateShrutiMap(song, e.target.value)}>
                  {_.keys(SHRUTI_OFFSET_MAP)
                    .map(shrutiNum =>
                      <option
                        value={shrutiNum}
                        key={`shruti map for ${song} - ${shrutiNum}`}>
                        {SHRUTI_OFFSET_MAP[shrutiNum]}
                      </option>
                    )}
                </Form.Control>

                <Form.Control
                  type="number"
                  value={tempoMap[song] ?? DEFAULT_TEMPO}
                  onChange={e => updateTempoMap(song, e.target.value)} />
              </div>
            </Card.Body>
          </Card>
        )
      }
    </div>
  );
}
