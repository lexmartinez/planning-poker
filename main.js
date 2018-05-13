const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path');
const url = require('url');

if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname)
}

let mainWindow

const createWindow = () => {

    let mainWindow = new BrowserWindow({
        height: 600,
        useContentSize: true,
        width: 900,
        titleBarStyle: 'hidden',
        maximizable: false
      })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
          pathname: path.join(__dirname, './build/index.html'),
          protocol: 'file:',
          slashes: true
        });

    mainWindow.loadURL(startUrl)

    mainWindow.on('closed', () => {
        mainWindow = undefined
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === undefined) {
        createWindow()
    }
});