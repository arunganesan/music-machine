import logo from './logo.svg';
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
