import keyboard from './keyboard.jpg';
import './App.css';
import WebMidi from "webmidi";
import React, { useState, useRef, useEffect } from 'react';
import isElectron from 'is-electron';


function App() {
  // const midiInput = useRef(null);
  const audioSrc = '/Users/arunganesan/repos/music-machine/midi-mp3-soundboard/audio/cricket.mp3';
  let midiInput = null;
  const sound = new Audio(audioSrc);

  useEffect(() => {
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        midiInput = WebMidi.inputs[0];
        midiInput.addListener('noteon', 'all',
          () => {
            if (isElectron()) {
              sound.play();
            }
          }
        );
        midiInput.addListener('noteoff', 'all',
          () => {
            if (isElectron()) {
              sound.pause();
              sound.currentTime = 0;
            }
          }
        );
      }
    });
    return () => {
      if (midiInput != null) {
        midiInput.removeListener();
      }
    };
  });

  const drawKeys = (row, startX, numKeys) => {
    let keys = [];
    for (let nthKey = 0; nthKey < numKeys; nthKey++) {
      keys.push(<Key
        row={row}
        startX={startX}
        nthKey={nthKey} />);
    }
    return keys;
  }


  return (
    <div className='container' style={{ background: `url(${keyboard}) no-repeat center` }}>
      {drawKeys(2, 304, 2)}
      {drawKeys(2, 413, 3)}
      {drawKeys(2, 557, 2)}
      {drawKeys(2, 665, 3)}
      {drawKeys(1, 286, 15)}
    </div>
  );
}

function Key(props) {
  const { row, startX, nthKey } = props;
  const startY = (row === 1) ? 203 : 128;
  const offsetX = nthKey * 36.1;
  const keyName = `key-${row}-${nthKey}-${startX}`;

  const [filepath, setFilepath] = useState(localStorage.getItem(keyName));

  const getBasename = (path) => {
    if (path == null) {
      return 'Not set';
    }

    const parts = path.split('/');
    return parts[parts.length - 1];
  }

  return <div
    className='key'
    key={keyName}
    onDragOver={e => e.preventDefault()}
    onDrop={ev => {
      const newFilepath = ev.dataTransfer.files[0].path;
      localStorage.setItem(keyName, newFilepath);
      setFilepath(newFilepath);
      ev.preventDefault()
    }}
    style={{ top: startY, left: startX + offsetX }}>
    {getBasename(filepath)}
    </div>
}

export default App;
