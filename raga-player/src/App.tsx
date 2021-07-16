import type { Song } from './database';

import { useState } from 'react';
import './App.css';
import * as React from 'react';
import { NOTE_RAGA_MAP, RAGAS, SONGS } from './database';
import Tone from 'tone'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

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
  const [activeSong, setActiveSong] = useState<string>();
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [lowestNoteIndex, setLowestNoteIndex] = useState<number>(0);
  const [highestNoteIndex, setHighestNoteIndex] = useState<number>(0);
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


  const playRaga = async (ragaName: string, shruti: number, speed: number) => {
    const notes = _.join(RAGAS[ragaName], ' ').split(' ');
    const semitonesAndDuration = getSemitoneAndDuration(notes, shruti, speed, {});
    await playSemitonesAndDurations(semitonesAndDuration);
  }

  const getSemitonesAndDurationOfSong = (song: Song, shruti: number, speed: number): SemitoneAndDuration[] => {
    const ragaNotes = _.join(RAGAS[song['raga']], ' ').split(' ');
    let mapping: { [key: string]: string } = {};
    ragaNotes.forEach(note => {
      note = note.replace('^', '').replace('.', '');
      if (/\d/.test(note)) {
        const basenote = note.replace(/\d/, '');
        mapping[basenote] = note;
      }
    });
    const notes = _.join(song.lines.map(line => line.notes), ' ').split(' ')
    return getSemitoneAndDuration(notes, shruti, speed, mapping);
  }

  const loadSong = (songname: string) => {
    setActiveSong(songname);
    const song = SONGS[songname];
    const semitonesAndDuration = getSemitonesAndDurationOfSong(song, 0, 1);
    let lowestIndex = 0;
    let highestIndex = 0;
    for (let i = 0; i < semitonesAndDuration.length; i++) {
      if (semitonesAndDuration[i].semitone < semitonesAndDuration[lowestIndex].semitone) {
        lowestIndex = i;
      }

      if (semitonesAndDuration[i].semitone > semitonesAndDuration[highestIndex].semitone) {
        highestIndex = i;
      }
    }
    setLowestNoteIndex(lowestIndex);
    setHighestNoteIndex(highestIndex);
  }

  const playSong = async (songname: string) => {
    loadSong(songname);
    const song = SONGS[songname];
    const shruti = shrutiMap[songname] ?? DEFAULT_SHRUTI;
    const speed = tempoMap[songname] ?? DEFAULT_TEMPO;
    const semitonesAndDuration = getSemitonesAndDurationOfSong(song, shruti, speed);
    await playSemitonesAndDurations(semitonesAndDuration);
  }

  const playSemitonesAndDurations = async (
    semitonesAndDuration: SemitoneAndDuration[],
  ) => {
    const synth = new Tone.AMSynth().toMaster();
    for (let i = 0; i < semitonesAndDuration.length; i++) {
      setActiveNoteIndex(i);
      // @ts-ignore
      const frequency = Tone.Frequency('C4').transpose(semitonesAndDuration[i].semitone);
      synth.triggerAttackRelease(frequency, semitonesAndDuration[i].duration);
      await sleep(semitonesAndDuration[i].duration);
      synth.triggerRelease();
      await sleep(50);
    }
    synth.triggerRelease();
  }


  const playIndividualNote = async (noteIndex: number) => {
    if (activeSong == null) {
      return;
    }
    const semitonesAndDuration = getSemitonesAndDurationOfSong(
      SONGS[activeSong],
      shrutiMap[activeSong] ?? DEFAULT_SHRUTI,
      1000);
    await playSemitonesAndDurations([semitonesAndDuration[noteIndex]]);
  };

  const renderNotes = () => {
    let renderedLines: JSX.Element[] = [];
    if (activeSong == null) return renderedLines;
    let fullSongNoteIndex = 0;
    for (let lineIdx = 0; lineIdx < SONGS[activeSong].lines.length; lineIdx++) {
      const lineNotes = SONGS[activeSong].lines[lineIdx].notes.split(' ');
      let renderedLineNotes: JSX.Element[] = [];
      for (let noteIdx = 0; noteIdx < lineNotes.length; noteIdx++) {
        let className = 'note';
        if (activeNoteIndex === fullSongNoteIndex) {
          className += ' active';
        }

        if (fullSongNoteIndex === lowestNoteIndex) {
          className += ' lowest';
        } else if (fullSongNoteIndex === highestNoteIndex) {
          className += ' highest';
        }

        const newFullSongIndex = fullSongNoteIndex;

        renderedLineNotes.push(<div
          className={className}
          onClick={async () => await playIndividualNote(newFullSongIndex)}
          key={`note index ${newFullSongIndex}`}>
          {lineNotes[noteIdx]}
        </div>)
        fullSongNoteIndex += 1;
      }
      renderedLines.push(<div
        className='line'
        key={`line index ${lineIdx}`}>
        {/* <button onClick={() => { }}>Play line</button> */}
        {renderedLineNotes}
      </div>);
    }
    return renderedLines;
  }

  return (
    <Container>
      <Row>
        <Col>
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
                        await playSong(song)}>
                      Play song
                    </Button>

                    <Button
                      onClick={() => loadSong(song)}>
                      Load
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
        </Col>
        <Col>
          {activeSong != null && renderNotes()}
        </Col>
      </Row>
    </Container>
  );
}
