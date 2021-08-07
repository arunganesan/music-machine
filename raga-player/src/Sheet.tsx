import type { SongType } from './Types';
import './sheet.css';
import * as React from 'react';
import { SHRUTI_OFFSET_MAP, RAGAS } from './database';
import {
  playSemitonesAndDurations,
  getSemitoneAndDurationForBar,
  getSemitoneAndDuration
} from './player';
import {  Card, Button, Form } from 'react-bootstrap';
import { useState, } from 'react';


import Bar from './Bar';
import Line from './Line';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

type Props = {
  songName: string,
  song: SongType,
  shruti: number,
  tempo: number,
  updateShruti: (arg: number) => void,
  updateTempo: (arg: number) => void,
}


export default function Sheet(props: Props) {
  const { song, songName, shruti, tempo, updateShruti, updateTempo } = props;
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(0);
  const [barsPerLine, setBarsPerLine] = useState<number>(4);

  const raga = RAGAS[song.raga];
  const semitonesAndDuration1 = getSemitoneAndDuration(raga[0].split(' '), shruti, tempo, {});
  const semitonesAndDuration2 = getSemitoneAndDuration(raga[1].split(' '), shruti, tempo, {});

  const lyrics = song['lyrics'];
  const notes = song['notes'];
  let lyricalBars = lyrics.split(',');
  let musicalBars = notes.split(',');
  const maxLength = Math.max(lyricalBars.length, musicalBars.length);
  for (let i = lyricalBars.length - 1; i < maxLength - 1; i++) {
    lyricalBars.push('-');
  }
  for (let i = musicalBars.length - 1; i < maxLength - 1; i++) {
    musicalBars.push('_');
  }

  if (lyricalBars.length !== musicalBars.length) {
    console.log('Bars dont match up');
    return <>Bars don't match up. Lyrics have {lyricalBars.length} and musical bars have {musicalBars.length}</>;
  }
  const ragaNotes = _.join(RAGAS[song['raga']], ' ').split(' ');
  let mapping: { [key: string]: string } = {};
  ragaNotes.forEach(note => {
    note = note.replace('^', '').replace('.', '');
    if (/\d/.test(note)) {
      const basenote = note.replace(/\d/, '');
      mapping[basenote] = note;
    }
  });

  const sandsAndNotesPerBar = musicalBars.map(bar => getSemitoneAndDurationForBar(bar, shruti, tempo, mapping));
  const sandsPerBar = sandsAndNotesPerBar.map(sandAndNote => sandAndNote.sand);
  const songAllSemitoneAndDurations = _.flatten(sandsAndNotesPerBar.map(sandPerBar => sandPerBar.sand));
  const totalNumLines = Math.ceil(musicalBars.length / barsPerLine);


  const allSemitones = songAllSemitoneAndDurations.map(sand => sand.semitone).filter(st => _.isFinite(st));
  const lowestNote = Math.min(_.min(allSemitones) ?? 0, 0);
  const highestNote = Math.max(_.max(allSemitones) ?? 12, 12);

  const playRaga = async (ragaName: string, shruti: number, speed: number) => {
    const notes = _.join(RAGAS[ragaName], ' ').split(' ');
    const semitonesAndDuration = getSemitoneAndDuration(notes, shruti, speed, {});
    const adjustedDuration = semitonesAndDuration.map(sand => {
      return {
        'semitone': sand.semitone,
        'duration': 250,
      };
    });
    await playSemitonesAndDurations([adjustedDuration], num => { });
  }

  let currentNoteIndex = 0;
  return <div className='sheet'>
    <div className='sheet-title'>{songName}</div>
    <Card key={`${song}`} className='song-card'>
      <Card.Body>
        <div className='song-row'>
          <Button
            onClick={async () =>
              await playRaga(song['raga'], shruti, tempo)
            }>
            Play Raga
          </Button>

          <Button
            onClick={async () =>
              await playSemitonesAndDurations(sandsPerBar, setActiveNoteIndex, tempo)
            }>
            Play song
          </Button>

          Shruti: <Form.Control
            className='song-shruti-input'
            as="select"
            value={shruti}
            onChange={e => updateShruti(_.parseInt(e.target.value))}>
            {_.keys(SHRUTI_OFFSET_MAP)
              .map(shrutiNum =>
                <option
                  value={shrutiNum}
                  key={`shruti map for ${song} - ${shrutiNum}`}>
                  {SHRUTI_OFFSET_MAP[shrutiNum]}
                </option>
              )}
          </Form.Control>

          Tempo per bar: <Form.Control
            type="number"
            value={tempo}
            onChange={e => updateTempo(_.parseInt(e.target.value))} />

          Bars per line: <Form.Control
            type="number"
            value={barsPerLine}
            onChange={e => setBarsPerLine(_.parseInt(e.target.value))} />
        </div>
      </Card.Body>
    </Card>

    <div className='section'>
      <div className='subtitle'>Raga: {props.song.raga}</div>
      <Line>
        <Bar
          lowestNote={lowestNote}
          highestNote={highestNote}
          notes={raga[0].split(' ')}
          lyrics='ascension'
          semitoneAndDurations={semitonesAndDuration1}
          startingNoteIndex={0}
          activeNoteIndex={-1}
        />
        <Bar
          notes={raga[1].split(' ')}
          lyrics='descension'
          semitoneAndDurations={semitonesAndDuration2}
          startingNoteIndex={0}
          activeNoteIndex={-1}
          lowestNote={lowestNote}
          highestNote={highestNote}
        />
      </Line>
    </div>

    <div className='section'>
      <div className='subtitle'>Song</div>
      {_.range(0, totalNumLines).map(lineNo => {
        return <Line key={`line ${lineNo}`}>
          {_.range(0, barsPerLine).map(barNo => {
            const barIdx = lineNo * barsPerLine + barNo;
            if (barIdx >= sandsAndNotesPerBar.length) {
              return <></>;
            }
            const sandPerBar = sandsAndNotesPerBar[barIdx];
            const totalNotesInBar = sandPerBar.notes.length;
            currentNoteIndex += totalNotesInBar;
            return <Bar
              key={`active-song-bar-${barIdx}`}
              notes={sandPerBar.notes.map(note => note.split('/')[0])}
              semitoneAndDurations={sandPerBar.sand}
              lyrics={lyricalBars[barIdx]}
              startingNoteIndex={currentNoteIndex - totalNotesInBar}
              activeNoteIndex={activeNoteIndex}
              lowestNote={lowestNote}
              highestNote={highestNote}
            />;
          })}
        </Line>
      })}
    </div>
  </div >;
}
