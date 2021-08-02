import type { ShrutiMap, TempoMap } from './Types';
import { useState } from 'react';
import './App.css';
import { push as Menu } from 'react-burger-menu';
import * as React from 'react';
import { DEFAULT_TEMPO, DEFAULT_SHRUTI, SONGS } from './database';
import Sheet from './Sheet';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function App() {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [activeSongName, setActiveSongName] = useState<string>('Karuna Sindho Bhairavi');
  const [shrutiMap, setShrutiMap] = useState<ShrutiMap>(
    JSON.parse(localStorage.getItem('shruti') ?? '{}'));
  const [tempoMap, setTempoMap] = useState<TempoMap>(
    JSON.parse(localStorage.getItem('tempo') ?? '{}'));

  const updateShrutiMap = (song: string, newShruti: number) => {
    shrutiMap[song] = newShruti;
    localStorage.setItem('shruti', JSON.stringify(shrutiMap));
    setShrutiMap(shrutiMap);
    setForceUpdate(forceUpdate + 1);
  }

  const updateTempoMap = (song: string, newTempo: number) => {
    tempoMap[song] = newTempo;
    localStorage.setItem('tempo', JSON.stringify(tempoMap));
    setTempoMap(tempoMap);
    setForceUpdate(forceUpdate + 1);
  }


  return <div id="outer-container">
    <Menu isOpen={false} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
      {_.keys(SONGS).map(song => {
        return <div
          className={'song-menu-item ' + ((song === activeSongName) ? 'active' : '')}
          key={`menu button ${song}`}
          onClick={() => {
            setActiveSongName(song);
          }}>
          {song}
        </div>
      })}
    </Menu>
    <main id="page-wrap">
      {activeSongName != '' && <Sheet
        songName={activeSongName}
        song={SONGS[activeSongName]}
        shruti={shrutiMap[activeSongName] ?? DEFAULT_SHRUTI}
        tempo={tempoMap[activeSongName] ?? DEFAULT_TEMPO}
        updateShruti={shruti => updateShrutiMap(activeSongName, shruti)}
        updateTempo={tempo => updateTempoMap(activeSongName, tempo)}
      />}
    </main>
  </div>;
}
