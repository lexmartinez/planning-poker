'use strict'

const types = {
    'SESSION_UPDATED': 'session-updated'
}

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
        console.log(sid, templates.get(type,data))
    },
    types
}