import type { ShrutiMap, TempoMap, SemitoneAndDuration } from './Types';

import { getSemitonesAndDurationOfSong, getSemitoneAndDurationForBar, getSemitoneAndDuration } from './player';
import { useState } from 'react';
import './App.css';
import { push as Menu } from 'react-burger-menu';
import * as React from 'react';
import { SHRUTI_OFFSET_MAP, DEFAULT_SHRUTI, DEFAULT_TEMPO, RAGAS, SONGS } from './database';
import Tone from 'tone'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import LineDisplay from './Line';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function App() {
  return <div id="outer-container">
    <Menu isOpen={true} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
      {_.keys(SONGS).map(song => <a key={`menu button ${song}`} href="/">{song}</a>)}
    </Menu>
    <main id="page-wrap">
      <AppOld />
    </main>
  </div>;
}

function AppOld() {
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

  const playRaga = async (ragaName: string, shruti: number, speed: number) => {
    const notes = _.join(RAGAS[ragaName], ' ').split(' ');
    const semitonesAndDuration = getSemitoneAndDuration(notes, shruti, speed, {});
    await playSemitonesAndDurations(semitonesAndDuration);
  }

  const parseSong = async (songname: string) => {
    const song = SONGS[songname];
    const lyrics = song['lyrics'];
    const notes = song['notes'];
    if (lyrics == undefined || notes == undefined) {
      return;
    }

    const lyricalBars = lyrics.split(',');
    const musicalBars = notes.split(',');
    if (lyricalBars.length !== musicalBars.length) {
      console.log('Bars dont match up');
      return
    }

    _.zip(lyricalBars, musicalBars).map(obj => console.log(obj));
    const ragaNotes = _.join(RAGAS[song['raga']], ' ').split(' ');
    let mapping: { [key: string]: string } = {};
    ragaNotes.forEach(note => {
      note = note.replace('^', '').replace('.', '');
      if (/\d/.test(note)) {
        const basenote = note.replace(/\d/, '');
        mapping[basenote] = note;
      }
    });
    const shruti = shrutiMap[songname] ?? DEFAULT_SHRUTI;
    const speed = tempoMap[songname] ?? DEFAULT_TEMPO;
    const allSemitoneAndDurations = _.flatten(musicalBars.map(bar => getSemitoneAndDurationForBar(bar, shruti, speed, mapping)));
    await playSemitonesAndDurations(allSemitoneAndDurations);
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
      if (semitonesAndDuration[i].semitone !== Infinity) {
        // @ts-ignore
        const frequency = Tone.Frequency('C4').transpose(semitonesAndDuration[i].semitone);
        synth.triggerAttackRelease(frequency, semitonesAndDuration[i].duration);
      }
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


  const renderNotesV2 = () => {
    let renderedLines: JSX.Element[] = [];
    if (activeSong == null) return renderedLines;
    let fullSongNoteIndex = 0;

    for (let lineIdx = 0; lineIdx < SONGS[activeSong].lines.length; lineIdx++) {
      const line = SONGS[activeSong].lines[lineIdx];
      const lineNotes = line.notes.split(' ');
      renderedLines.push(<LineDisplay
        line={line}
        offsetNoteIndex={fullSongNoteIndex}
        activeNoteIndex={activeNoteIndex}
        lowestNoteIndex={lowestNoteIndex}
        highestNoteIndex={highestNoteIndex}
        key={`line index ${lineIdx}`}
        playIndividualNote={playIndividualNote}
      />);
      fullSongNoteIndex += lineNotes.length;
    }
    return renderedLines;
  }


  const renderNotes = () => {
    let renderedLines: JSX.Element[] = [];
    if (activeSong == null) return renderedLines;
    let fullSongNoteIndex = 0;

    for (let lineIdx = 0; lineIdx < SONGS[activeSong].lines.length; lineIdx++) {
      const line = SONGS[activeSong].lines[lineIdx];
      const lineNotes = line.notes.split(' ');
      renderedLines.push(<LineDisplay
        line={line}
        offsetNoteIndex={fullSongNoteIndex}
        activeNoteIndex={activeNoteIndex}
        lowestNoteIndex={lowestNoteIndex}
        highestNoteIndex={highestNoteIndex}
        key={`line index ${lineIdx}`}
        playIndividualNote={playIndividualNote}
      />);
      fullSongNoteIndex += lineNotes.length;
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

                    <Button
                      onClick={async () => await parseSong(song)}>
                      Parse Song
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
