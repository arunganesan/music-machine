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
    yoffset?: number,
    isActive: boolean,
}


export default function Note(props: Props) {
    const {
        note,
        offsetX,
        semitoneAndDuration,
        xscale,
        yoffset = 0,
        isActive
    } = props;

    const scaleX = (xcoord: number) => xcoord * xscale * 100 + '%';
    const scaleY = (ycoord: number) => ycoord * 4 + yoffset;

    const style = {
        left: scaleX(offsetX),
        width: scaleX(semitoneAndDuration.duration),
        bottom: scaleY(semitoneAndDuration.semitone),
    };
    return <div
        className={'note ' + ((isActive) ? 'active' : '')}
        style={style}
        onClick={async (e) => await playSemitonesAndDurations(
            [semitoneAndDuration], num => { }
        )}
    >
        {note}
    </div>;
}
