import './sheet.css';
import * as React from 'react';
import _ from 'lodash';
import {
    playSemitonesAndDurations,
} from './player';

import type { SemitoneAndDuration } from './Types';

type Props = {
    note: string,
    offsetX: number,
    semitoneAndDuration: SemitoneAndDuration,
    xscale: number,
    lowestNote: number,
    highestNote: number,
    isActive: boolean,
}


export default function Note(props: Props) {
    const {
        note,
        offsetX,
        semitoneAndDuration,
        xscale,
        isActive,
        lowestNote,
        highestNote,
    } = props;

    const range = highestNote - lowestNote;
    const scaleX = (xcoord: number) => xcoord * xscale * 100 + '%';
    const scaleAndOffsetY = (semitone: number) => _.isFinite(semitone) ? (semitone - lowestNote) / range * 50 : 0;

    const style = {
        left: scaleX(offsetX),
        width: scaleX(semitoneAndDuration.duration),
        bottom: scaleAndOffsetY(semitoneAndDuration.semitone),
    };
    return <div
        className={'note ' + ((isActive) ? 'active' : '')}
        style={style}
        onClick={async (e) => await playSemitonesAndDurations(
            [[semitoneAndDuration]], num => { }
        )}
    >
        {note}
    </div>;
}
