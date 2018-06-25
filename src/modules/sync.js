'use strict'
const Pusher = require('pusher');
const setup = require('../config/setup.js');
const {ipcMain} = require('electron')

const types = {
    'SESSION_UPDATED': 'session-updated',
    'VOTE': 'vote-event'
}

const pusher = new Pusher(setup.pusher);

const templates = {
    get: (type, data) => {
        switch(type) {
            case types.SESSION_UPDATED:
                return {type}
            case types.VOTE:
                return {type, data}
            default:
                return {
                    type,
                    data
                }
        }
    }
}

module.exports = {
    emit: (sid, {type, data}) => {
        pusher.trigger(sid, type, templates.get(type,data));
    },
    init: () => {
        ipcMain.on('pusher-data', (event, arg) => {
            event.sender.send('pusher-data-reply', {
                pusher: setup.pusher
            });
        });
    },
    types
}