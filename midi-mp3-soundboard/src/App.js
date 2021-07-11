import keyboard from './keyboard.jpg';
import './App.css';
import WebMidi from "webmidi";
import React, { useState, useRef, useEffect } from 'react';
import isElectron from 'is-electron';
import _ from 'lodash';

import spell from './sounds/battle/spell.wav';
import swing from './sounds/battle/swing.wav';
import sword_unsheath from './sounds/battle/sword-unsheathe.wav';
import bottle from './sounds/inventory/bottle.wav';
import bubble from './sounds/inventory/bubble3.wav';
import chainmail from './sounds/inventory/chainmail1.wav';
import cloth from './sounds/inventory/cloth.wav';
import coin from './sounds/inventory/coin2.wav';
import growl from './sounds/misc/growl.wav';
import bite from './sounds/NPC/beetle/bite-small3.wav';
import giant from './sounds/NPC/giant/giant2.wav';
import monster1 from './sounds/NPC/gutteral beast/mnstr5.wav';
import monster2 from './sounds/NPC/gutteral beast/mnstr4.wav';
import monster3 from './sounds/NPC/gutteral beast/mnstr12.wav';
import monster4 from './sounds/NPC/gutteral beast/mnstr14.wav';
import ogre from './sounds/NPC/ogre/ogre4.wav';
import shade from './sounds/NPC/shade/shade8.wav';
import slime from './sounds/NPC/slime/slime10.wav';
import door from './sounds/world/door.wav';
import { openStreamDeck } from 'elgato-stream-deck';

const path = require('path');

// import streamDeck from



const DefaultSounds = {
  'C3': spell,
  'C#3': swing,
  'D3': sword_unsheath,
  'D#3': bottle,
  'E3': bubble,
  'F3': chainmail,
  'F#3': cloth,
  'G3': coin,
  'G#3': growl,
  'A3': bite,
  'A#3': giant,
  'B3': monster1,
  'C4': monster2,
  'C#4': monster3,
  'D4': monster4,
  'D#4': ogre,
  'E4': shade,
  'F4': slime,
  'F#4': door,
  'G4': null,
  'G#4': null,
  'A4': null,
  'A#4': null,
  'B4': null,
  'C5': null,

}


function App() {
  const midiInput = useRef(null);
  const sound = useRef(null);

  useEffect(() => {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        midiInput.current = WebMidi.inputs[0];
        midiInput.current.addListener('noteon', 'all',
          (e) => {
            const note = `${e.note.name}${e.note.octave}`;
            const audioSrc = localStorage.getItem(note) ?? DefaultSounds[note];
            sound.current = new Audio(audioSrc);
            sound.current.play();
          }
        );
      }
    });



    // const streamDeck = new StreamDeck();
    const myStreamDeck = openStreamDeck()

    myStreamDeck.on('down', keyIndex => {
      console.log('key %d down', keyIndex)
    })

    myStreamDeck.on('up', keyIndex => {
      console.log('key %d up', keyIndex)
    })

    // Fired whenever an error is detected by the `node-hid` library.
    // Always add a listener for this event! If you don't, errors will be silently dropped.
    myStreamDeck.on('error', error => {
      console.error(error)
    })

    // Fill the first button form the left in the first row with a solid red color. This is synchronous.
    myStreamDeck.fillColor(4, 255, 0, 0)
    console.log('Successfully wrote a red square to key 4.')

    // streamDeck.on('down', keyIndex => {
    //   console.log('key %d down', keyIndex);
    // });

    // streamDeck.on('up', keyIndex => {
    //   console.log('key %d up', keyIndex);
    // });

    // streamDeck.on('error', error => {
    //   console.error(error);
    // });

    // // // Fill the second button from the left in the first row with an image of the GitHub logo.
    // // // This is asynchronous and returns a promise.
    // streamDeck.fillImageFromFile(3, path.resolve(__dirname, 'keyboard.jpg')).then(() => {
    //   console.log('Successfully wrote a GitHub logo to key 3.');
    // });

    // // // Fill the first button form the left in the first row with a solid red color. This is synchronous.
    // streamDeck.fillColor(4, 255, 0, 0);
    // console.log('Successfully wrote a red square to key 4.');
    // console.log(streamDeck);

    return () => {
      if (midiInput != null) {
        midiInput.current.removeListener();
      }
    };
  }, []);


  const KeyLocations = {
    'C3': { row: 1, offsetX: 286, nthKey: 0 },
    'D3': { row: 1, offsetX: 286, nthKey: 1 },
    'E3': { row: 1, offsetX: 286, nthKey: 2 },
    'F3': { row: 1, offsetX: 286, nthKey: 3 },
    'G3': { row: 1, offsetX: 286, nthKey: 4 },
    'A3': { row: 1, offsetX: 286, nthKey: 5 },
    'B3': { row: 1, offsetX: 286, nthKey: 6 },
    'C4': { row: 1, offsetX: 286, nthKey: 7 },
    'D4': { row: 1, offsetX: 286, nthKey: 8 },
    'E4': { row: 1, offsetX: 286, nthKey: 9 },
    'F4': { row: 1, offsetX: 286, nthKey: 10 },
    'G4': { row: 1, offsetX: 286, nthKey: 11 },
    'A4': { row: 1, offsetX: 286, nthKey: 12 },
    'B4': { row: 1, offsetX: 286, nthKey: 13 },
    'C5': { row: 1, offsetX: 286, nthKey: 14 },

    'C#3': { row: 2, offsetX: 304, nthKey: 0 },
    'D#3': { row: 2, offsetX: 304, nthKey: 1 },
    'F#3': { row: 2, offsetX: 413, nthKey: 0 },
    'G#3': { row: 2, offsetX: 413, nthKey: 1 },
    'A#3': { row: 2, offsetX: 413, nthKey: 2 },
    'C#4': { row: 2, offsetX: 557, nthKey: 0 },
    'D#4': { row: 2, offsetX: 557, nthKey: 1 },
    'F#4': { row: 2, offsetX: 665, nthKey: 0 },
    'G#4': { row: 2, offsetX: 665, nthKey: 1 },
    'A#4': { row: 2, offsetX: 665, nthKey: 2 },
  }




  return (
    <div className='container' style={{ background: `url(${keyboard}) no-repeat center` }}>
      {_.toPairs(KeyLocations).map(noteLocation => {
        const [note, location] = noteLocation;
        return <Key
          key={note}
          note={note}
          row={location.row}
          startX={location.offsetX}
          nthKey={location.nthKey}
        />
      })}
    </div>
  );
}

function Key(props) {
  const { note, row, startX, nthKey } = props;
  const startY = (row === 1) ? 203 : 128;
  const offsetX = nthKey * 36.1;

  const [filepath, setFilepath] = useState(localStorage.getItem(note));

  const getBasename = (path) => {
    console.log(path);
    if (path == null) {
      return 'Not set';
    }
    const parts = path.split('/');
    const basename = parts[parts.length - 1];
    return basename.split('.')[0];
  }

  return <div
    className='key'
    onDragOver={e => e.preventDefault()}
    onDrop={ev => {
      const newFilepath = ev.dataTransfer.files[0].path;
      localStorage.setItem(note, newFilepath);
      setFilepath(newFilepath);
      ev.preventDefault()
    }}
    onClick={e => {
      if (e.shiftKey) {
        const newFilepath = DefaultSounds[note];
        localStorage.setItem(note, newFilepath);
        setFilepath(newFilepath);
      } else {
        let file = filepath ?? DefaultSounds[note];
        const sound = new Audio(file);
        sound.play();
      }
    }}
    style={{ top: startY, left: startX + offsetX }}>
    <span>{getBasename(filepath ?? DefaultSounds[note])}</span>
  </div>
}

export default App;
