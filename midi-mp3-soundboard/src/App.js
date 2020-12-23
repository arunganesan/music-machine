import keyboard from './keyboard.jpg';
import './App.css';
import WebMidi from "webmidi";
import React, { useState, useRef, useEffect } from 'react';
import isElectron from 'is-electron';
import _ from 'lodash';

import swing from './sounds/battle/swing.wav';

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
            const audioSrc = localStorage.getItem(note) ?? swing;
            sound.current = new Audio(audioSrc);

            if (isElectron()) {
              sound.current.play();
            }
          }
        );
        midiInput.current.addListener('noteoff', 'all',
          () => {
            if (isElectron()) {
              sound.current.pause();
              sound.current.currentTime = 0;
            }
          }
        );
      }
    });
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


  const DefaultSounds = {
    'C3': './sounds/battle/spell.wav',
    'C#3': './sounds/battle/swing.wav',
    'D3': './sounds/battle/sword-unsheathe.wav',
    'D#3': './sounds/inventory/bottle.wav',
    'E3': './sounds/inventory/bubble3.wav',
    'F3': './sounds/inventory/chainmail1.wav',
    'F#3': './sounds/inventory/cloth.wav',
    'G3': './sounds/inventory/coin2.wav',
    'G#3': './sounds/misc/growl.wav',
    'A3': './sounds/NPC/beetle/bite-small3.wav',
    'A#3': './sounds/NPC/giant/giant2.wav',
    'B3': './sounds/NPC/gutteral beast/mnstr5.wav',
    'C4': './sounds/NPC/gutteral beast/mnstr4.wav',
    'C#4': './sounds/NPC/gutteral beast/mnstr12.wav',
    'D4': './sounds/NPC/gutteral beast/mnstr14.wav',
    'D#4': './sounds/NPC/ogre/ogre4.wav',
    'E4': './sounds/NPC/shade/shade8.wav',
    'F4': './sounds/NPC/slime/slime10.wav',
    'F#4': './sounds/world/door.wav',
    'G4': './sounds//.wav',
    'G#4': './sounds//.wav',
    'A4': './sounds//.wav',
    'A#4': './sounds//.wav',
    'B4': './sounds//.wav',
    'C5': './sounds//.wav',

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
    if (path == null) {
      return 'Not set';
    }

    const parts = path.split('/');
    return parts[parts.length - 1];
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
    style={{ top: startY, left: startX + offsetX }}>
    {getBasename(filepath)}
  </div>
}

export default App;
