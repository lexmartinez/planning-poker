'use strict'

const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron
const path = require('path');
const openAboutWindow = require('about-window').default;

const about = () => {
  openAboutWindow({
      icon_path: path.join(__dirname, '../assets/images/cards.svg'),
      copyright: 'Copyright (c) 2018 Lex Martinez - MIT License',
      open_devtools: false,
      css_path: path.join(__dirname, '../assets/about.css'),
      product_name: 'Planify',
      description: 'A Planning Poker® Tool',
      win_options : {resizable: false, maximizable: false, titleBarStyle: 'hidden', frame: false},
      bug_report_url: 'https://github.com/lexmartinez/planning-poker/issues',
      homepage: 'https://github.com/lexmartinez/planning-poker',
     })
}
module.exports = {
    setup: () => {
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

            ipcMain.on('about-dialog', (event, arg) => {
              about();
           });
    }
}