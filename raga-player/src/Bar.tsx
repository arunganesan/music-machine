import './sheet.css';
import * as React from 'react';
import _ from 'lodash';
import Note from './Note';
import { playSemitonesAndDurations, } from './player';

import type { SemitoneAndDuration } from './Types';

type Props = {
    notes: string[],
    lyrics: string,
    semitoneAndDurations: SemitoneAndDuration[]
    activeNoteIndex: number,
    startingNoteIndex: number,
    lowestNote: number,
    highestNote: number,
}

export default function Bar(props: Props) {
    const {
        notes,
        lyrics,
        semitoneAndDurations,
        activeNoteIndex,
        startingNoteIndex,
        lowestNote,
        highestNote,
    } = props;
    if (notes.length !== semitoneAndDurations.length) {
        return <div className='bar'>Note and duration lengths dont match up!</div>
    }

    let offsetX = 0;

    const totalDuration = _.sum(semitoneAndDurations.map(sand => sand.duration));

    return <div className='bar'>
        <div className='notes'>
            {notes.map((note, idx) => {
                const sAndD = semitoneAndDurations[idx];
                offsetX += sAndD.duration;
                return <Note
                    note={note}
                    offsetX={offsetX - sAndD.duration}
                    key={`note ${idx}`}
                    xscale={1 / totalDuration}
                    semitoneAndDuration={semitoneAndDurations[idx]}
                    isActive={startingNoteIndex + idx === activeNoteIndex}
                    lowestNote={lowestNote}
                    highestNote={highestNote}
                />
            })}
        </div>
        <div onClick={async (e) => await playSemitonesAndDurations(
            semitoneAndDurations, num => { })} className='lyrics'>{lyrics}</div>
    </div>
}
