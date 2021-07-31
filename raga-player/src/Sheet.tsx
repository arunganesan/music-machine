import type { SongType } from './Types';
import './sheet.css';
import * as React from 'react';
import { DEFAULT_TEMPO, DEFAULT_SHRUTI, RAGAS, SONGS } from './database';
import { getSemitonesAndDurationOfSong, getSemitoneAndDurationForBar, getSemitoneAndDuration } from './player';
import { useState } from 'react';

import Bar from './Bar';
import Line from './Line';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

type Props = {
  songName: string,
  song: SongType,
}

const BARS_PER_LINE = 4;

export default function Sheet(props: Props) {
  const { song, songName } = props;

  const raga = RAGAS[song.raga];
  const semitonesAndDuration1 = getSemitoneAndDuration(raga[0].split(' '), DEFAULT_SHRUTI, DEFAULT_TEMPO, {});
  const semitonesAndDuration2 = getSemitoneAndDuration(raga[1].split(' '), DEFAULT_SHRUTI, DEFAULT_TEMPO, {});

  const lyrics = song['lyrics'];
  const notes = song['notes'];
  if (lyrics == undefined || notes == undefined) {
    return <>'Need lyrics and notes'</>;
  }

  const lyricalBars = lyrics.split(',');
  const musicalBars = notes.split(',');
  if (lyricalBars.length !== musicalBars.length) {
    console.log('Bars dont match up');
    return <>"Bars don't match up"</>;
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
  const shruti = DEFAULT_SHRUTI;
  const speed = DEFAULT_TEMPO;
  const sandsPerBar = musicalBars.map(bar => getSemitoneAndDurationForBar(bar, shruti, speed, mapping));

  const totalNumLines = Math.ceil(musicalBars.length / BARS_PER_LINE);

  return <div className='sheet'>
    <div className='sheet-title'>{props.songName}</div>
    <div className='section'>
      <div className='subtitle'>Raga: {props.song.raga}</div>
      <Line>
        <Bar
          notes={raga[0].split(' ')}
          lyrics='ascension'
          semitoneAndDurations={semitonesAndDuration1} />
        <Bar
          notes={raga[1].split(' ')}
          lyrics='descension'
          semitoneAndDurations={semitonesAndDuration2} />
      </Line>
    </div>

    <div className='section'>
      <div className='subtitle'>Song</div>
      {_.range(0, totalNumLines).map(lineNo => {
        return <Line key={`line ${lineNo}`}>
          {_.range(0, BARS_PER_LINE).map(barNo => {
            const barIdx = lineNo * BARS_PER_LINE + barNo;
            if (barIdx >= sandsPerBar.length) {
              return <></>;
            }
            const sandPerBar = sandsPerBar[barIdx];
            return <Bar
              notes={sandPerBar.notes.map(note => note.split('/')[0])}
              semitoneAndDurations={sandPerBar.sand}
              lyrics={lyricalBars[barIdx]}
              xscale={1 / 2.5}
              yoffset={20}
            />;
          })}
        </Line>
      })}
    </div>
  </div>;
}


// given N bars total, we want X bars per line. That means we have cel (N / X) lines
