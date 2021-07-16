import type { Line } from './Types';

import './App.css';
import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

type Props = {
    line: Line,
    offsetNoteIndex: number,
    activeNoteIndex: number,
    lowestNoteIndex: number,
    highestNoteIndex: number,
    playIndividualNote: (arg: number) => Promise<void>,
}

export default function LineDisplay(props: Props) {
    const lineNotes = props.line.notes.split(' ');
    let noteIndex = props.offsetNoteIndex;
    let renderedLineNotes: JSX.Element[] = [];
    for (let noteIdx = 0; noteIdx < lineNotes.length; noteIdx++) {
        let className = 'note';
        if (props.activeNoteIndex === noteIndex) {
            className += ' active';
        }

        if (noteIndex === props.lowestNoteIndex) {
            className += ' lowest';
        } else if (noteIndex === props.highestNoteIndex) {
            className += ' highest';
        }

        const newFullSongIndex = noteIndex;
        renderedLineNotes.push(<div
            className={className}
            onClick={async () => await props.playIndividualNote(newFullSongIndex)}
            key={`note index ${newFullSongIndex}`}>
            {lineNotes[noteIdx]}
        </div>)
        noteIndex += 1;
    }
    return <div className='line' >
        {/* <button onClick={() => { }}>Play line</button> */}
        {renderedLineNotes}
    </div >;
}
