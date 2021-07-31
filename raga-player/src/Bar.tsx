import './sheet.css';
import * as React from 'react';
import _ from 'lodash';
import Note from './Note';

import type { SemitoneAndDuration } from './Types';

type Props = {
    notes: string[],
    lyrics: string,
    semitoneAndDurations: SemitoneAndDuration[]
    xscale?: number,
    yoffset?: number,
}

export default function Bar(props: Props) {
    const {
        notes,
        lyrics,
        semitoneAndDurations,
        xscale = 1 / 20,
        yoffset = 0,
    } = props;
    if (notes.length !== semitoneAndDurations.length) {
        return <div className='bar'>Note and duration lengths dont match up!</div>
    }

    let offsetX = 0;

    return <div className='bar'>
        <div className='notes'>
            {notes.map((note, idx) => {
                const sAndD = semitoneAndDurations[idx];
                offsetX += sAndD.duration;
                return <Note
                    note={note}
                    offsetX={offsetX - sAndD.duration}
                    key={`note ${idx}`}
                    xscale={xscale}
                    yoffset={yoffset}
                    semitoneAndDuration={semitoneAndDurations[idx]} />
            })}
        </div>
        <div className='lyrics'>{lyrics}</div>
    </div>
}
