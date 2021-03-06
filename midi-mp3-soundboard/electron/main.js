const { app,globalShortcut, BrowserWindow, ipcRenderer } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const electronLocalshortcut = require('electron-localshortcut');


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:1000,
        height:400,
      show: false,
        frame: false,
        webPreferences: {
          sandbox: false,
          nodeIntegration: true,
          enableRemoteModule: true,
        }
    });
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainWindow.loadURL(startURL);
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}


app.on('ready', createWindow);


app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
  electronLocalshortcut.unregisterAll(mainWindow);
})
