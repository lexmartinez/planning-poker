const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron
const path = require('path');
const url = require('url');
const modules = require('./src/modules');

if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname)
  require('electron-debug')({showDevTools: 'undocked'});
}

let mainWindow = undefined

const createWindow = () => {
    const {width, height} = electron.screen.getPrimaryDisplay().size
    mainWindow = new BrowserWindow({
        height: height * 0.8,
        useContentSize: true,
        width: width * 0.8,
        titleBarStyle: 'hidden',
        frame: false,
        maximizable: false,
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/src/modules/preload.js'
        }
      })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
          pathname: path.join(__dirname, './build/index.html'),
          protocol: 'file:',
          slashes: true
        });

    modules.menu.setup()
    mainWindow.loadURL(startUrl)

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createWindow()
    }
});

modules.oauth.init();
modules.session.init();