import './sheet.css';
import * as React from 'react';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
}

export default function Line(props: Props) {
    return <div className='line'>{props.children}</div>
}
