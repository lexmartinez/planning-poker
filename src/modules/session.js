module.exports = {
    init: (ipcMain) => {
        ipcMain.on('session-auth', (event, arg) => {
            console.log(arg)
            setTimeout(() => {
              event.sender.send('session-auth-reply', {response:false});
            }, 3000);
          });
          
    }
}