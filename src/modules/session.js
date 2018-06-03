const {clipboard, ipcMain} = require('electron')

module.exports = {
    init: () => {
        ipcMain.on('session-auth', (event, arg) => {
            console.log(arg)
            setTimeout(() => {
              event.sender.send('session-auth-reply', {response:true});
            }, 3000);
          });
        
          ipcMain.on('copy-sid', (event, arg) => {
            clipboard.writeText(arg)
            event.sender.send('copy-sid-reply', {response:true});
          });
          
    }
}