const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron
const path = require('path');
const url = require('url');
const electronOauth2 = require('electron-oauth2');
const oauth = require('./src/config/oauth.js');
const githubOAuth = electronOauth2(oauth.github, oauth.window);
const googleOAuth = electronOauth2(oauth.google, oauth.window);
const openAboutWindow = require('about-window').default;

if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname)
  require('electron-debug')({showDevTools: 'undocked'});
}

let mainWindow = undefined

const about = () => {
    openAboutWindow({
        icon_path: path.join(__dirname, '/src/assets/images/cards.svg'),
        copyright: 'Copyright (c) 2018 Lex Martinez - MIT License',
        open_devtools: false,
        css_path: path.join(__dirname, '/src/assets/about.css'),
        product_name: 'Planify',
        description: 'A Planning Poker® Tool',
        win_options : {resizable: false, maximizable: false, titleBarStyle: 'hidden', frame: false},
        bug_report_url: 'https://github.com/lexmartinez/planning-poker/issues',
        homepage: 'https://github.com/lexmartinez/planning-poker',
       })
}

const renderMenu = () => {
    const menu = electron.Menu.buildFromTemplate([
      {
       label: 'About',
       submenu: [
         {
           label: 'About Planify',
           click: about
        },
        {
          type:'separator'
        },
        /*{
          label: 'Settings...',
          click: () => about,
          accelerator: 'CommandOrControl+.'
        },{
          type:'separator'
        },*/
        {
          label: 'Hide Planify',
          click: app.hide,
          accelerator: 'CommandOrControl+H'
        },
        {
          label: 'Quit Planify',
          role: 'quit',
          accelerator: 'CommandOrControl+Q'
        }
       ]
      }
    ])
    electron.Menu.setApplicationMenu(menu)
}

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
            preload: __dirname + '/preload.js'
        }
      })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
          pathname: path.join(__dirname, './build/index.html'),
          protocol: 'file:',
          slashes: true
        });

    renderMenu();
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

ipcMain.on('github-oauth', (event, arg) => {
    githubOAuth.getAccessToken({})
      .then(token => {
        event.sender.send('github-oauth-reply', token);
      }, err => {
        console.log('Error while getting token', err);
      });
});

ipcMain.on('google-oauth', (event, arg) => {
  googleOAuth.getAccessToken({scope: oauth.google.scope})
    .then(token => {
      event.sender.send('google-oauth-reply', token);
    }, err => {
      console.log('Error while getting token', err);
    });
});

ipcMain.on('about-dialog', (event, arg) => {
   about();
});