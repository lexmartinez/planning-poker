'use strict'

const electronOauth2 = require('electron-oauth2');
const setup = require('../config/setup.js');
const {ipcMain} = require('electron')

module.exports = {
    init: () => {
        const githubOAuth = electronOauth2(setup.github, setup.window);
        const googleOAuth = electronOauth2(setup.google, setup.window);
        ipcMain.on('github-oauth', (event, arg) => {
            githubOAuth.getAccessToken({})
              .then(token => {
                event.sender.send('github-oauth-reply', token);
              }, err => {
                console.log('Error while getting token', err);
              });
        });
        
        ipcMain.on('google-oauth', (event, arg) => {
          googleOAuth.getAccessToken({scope: setup.google.scope})
            .then(token => {
              event.sender.send('google-oauth-reply', token);
            }, err => {
              console.log('Error while getting token', err);
            });
        });
    }
}