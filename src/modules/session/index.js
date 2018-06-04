'use strict'
const {clipboard, ipcMain} = require('electron')
const model = require('./model')

module.exports = {
    init: () => {
        ipcMain.on('session-auth', (event, arg) => {
            console.log(arg);
            const { sid, email } = arg;
            model.find({sid}, (error, session) => {
              if (error) { 
                console.error(error) 
                event.sender.send('session-auth-reply', {response: false});
              } else {
                event.sender.send('session-auth-reply', {response:session});
              }
            });
          });
        
          ipcMain.on('copy-sid', (event, arg) => {
            clipboard.writeText(arg)
            event.sender.send('copy-sid-reply', {response:true});
          });
          
    }
}