import './sheet.css';
import * as React from 'react';
import _ from 'lodash';

import type { SemitoneAndDuration } from './Types';

type Props = {
    note: string,
    offsetX: number,
    semitoneAndDuration: SemitoneAndDuration,
    xscale?: number,
    yoffset?: number,
}


export default function Note(props: Props) {
    const {
        note,
        offsetX,
        semitoneAndDuration,
        xscale = 1 / 20,
        yoffset = 0,
    } = props;

    const scaleX = (xcoord: number) => xcoord * xscale + '%';
    const scaleY = (ycoord: number) => ycoord * 4 + yoffset;

    const style = {
        left: scaleX(offsetX),
        width: scaleX(semitoneAndDuration.duration),
        bottom: scaleY(semitoneAndDuration.semitone),
    };
    return <div className='note' style={style}>
        {note}
    </div>;
}
