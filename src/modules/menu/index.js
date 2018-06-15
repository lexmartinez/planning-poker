'use strict'

const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron
const path = require('path');
const translations = require('./labels')
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

const setLanguage = (lang, win) => {
  win.webContents.send('set-language-main', {lang})
}

const logout = (win, lang) => {
  win.webContents.send('logout-main')
}

const buildMenu = (lang, win, loggedIn) => {
  const labels = translations[lang || 'en']
  const menu = electron.Menu.buildFromTemplate([
        {
          label: labels.global.about,
          submenu: [
            {
              label: labels.main.about,
              click: about
            },
            {
              type:'separator'
            },
            {
              label: labels.main.language,
              submenu: [
                { 
                  label: labels.main.spanish, 
                  checked: (lang === 'es'), 
                  type: (lang === 'es') ? 'checkbox' : 'normal',
                  enabled: (lang !== 'es'),
                  click: () => {
                    setLanguage('es', win)
                  }
                },
                { 
                  label: labels.main.english, 
                  checked: (!lang || lang === 'en'), 
                  type: (!lang || lang === 'en') ? 'checkbox' : 'normal',
                  enabled: (!lang) ? false : (lang !== 'en'),
                  click: () => {
                    setLanguage('en', win)
                  }
                },
              ]
            },
            {
              type:'separator'
            },
            {
              label: labels.main.logout,
              click: () => {
                logout(win, (lang||'en'))
              },
              accelerator: 'CommandOrControl+Shift+W',
              enabled: loggedIn ? true : false
            },
            {
              type:'separator'
            },
            {
              label: labels.main.hide,
              click: app.hide,
              accelerator: 'CommandOrControl+H'
            },
            {
              label: labels.main.quit,
              role: 'quit',
              accelerator: 'CommandOrControl+Q'
            }
          ]
        },
        {
          label: labels.global.edit,
          submenu: [
            { label: labels.edit.undo, accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: labels.edit.redo, accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: labels.edit.cut, accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: labels.edit.copy, accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: labels.edit.paste, accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: labels.edit.select, accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
          ]
        }
      ])
  electron.Menu.setApplicationMenu(menu)
}

module.exports = {
    setup: (win) => {
      buildMenu('en', win);
      ipcMain.on('about-dialog', (event, arg) => {
        about();
      });

      ipcMain.on('set-language', (event, {lang, loggedIn}) => {
        buildMenu(lang, win, loggedIn);
      });
    }
}