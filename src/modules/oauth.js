const electronOauth2 = require('electron-oauth2');
const oauth = require('../config/oauth.js');
const {ipcMain} = require('electron')

module.exports = {
    init: () => {

        const githubOAuth = electronOauth2(oauth.github, oauth.window);
        const googleOAuth = electronOauth2(oauth.google, oauth.window);
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
    }
}