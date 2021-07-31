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
    yoffset?: number,
    activeNoteIndex: number,
    startingNoteIndex: number,
}

export default function Bar(props: Props) {
    const {
        notes,
        lyrics,
        semitoneAndDurations,
        yoffset = 0,
        activeNoteIndex,
        startingNoteIndex
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
                    yoffset={yoffset}
                    semitoneAndDuration={semitoneAndDurations[idx]}
                    isActive={startingNoteIndex + idx === activeNoteIndex}
                />
            })}
        </div>
        <div onClick={async (e) => await playSemitonesAndDurations(
            semitoneAndDurations, num => { })} className='lyrics'>{lyrics}</div>
    </div>
}
