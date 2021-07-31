import { useState } from 'react';
import './App.css';
import { push as Menu } from 'react-burger-menu';
import * as React from 'react';
import {  SONGS } from './database';
import Sheet from './Sheet';

import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default function App() {
  const [activeSongName, setActiveSongName] = useState<string>('Etayō Tēṭi');
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
      {activeSongName != '' && <Sheet songName={activeSongName} song={SONGS[activeSongName]} />}
    </main>
  </div>;
}
