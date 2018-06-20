'use strict'
const Pusher = require('pusher');
const setup = require('../config/setup.js');

const types = {
    'SESSION_UPDATED': 'session-updated'
}

const pusher = new Pusher(setup.pusher);

const templates = {
    get: (type, data) => {
        switch(type) {
            case types.SESSION_UPDATED:
                return {type}
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
    types
}