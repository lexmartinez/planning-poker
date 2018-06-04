'use strict'
const {clipboard, ipcMain} = require('electron')
const model = require('./model')

module.exports = {
    init: () => {
        ipcMain.on('session-auth', (event, arg) => {
            const { sid, email } = arg;
            model.findOne({sid}, (error, session) => {
              if (error) { 
                console.error(error) 
                event.sender.send('session-auth-reply', {response: false});
              } else { 
                if (session.team.indexOf(email) !== -1) {
                  event.sender.send('session-auth-reply', {response:session});
                } else {
                  event.sender.send('session-auth-reply', {response: false});
                }
              }
            });
          });
        
          ipcMain.on('copy-sid', (event, arg) => {
            clipboard.writeText(arg)
            event.sender.send('copy-sid-reply', {response:true});
          });
          
    }
}