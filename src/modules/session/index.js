'use strict'
const {clipboard, ipcMain} = require('electron')
const Session = require('./model')
const sync = require('../sync')
const randomstring = require('randomstring')
const moment = require('moment')
const validator = require("email-validator")

const random = (length) => {
  return randomstring.generate({
    length,
    capitalization: 'uppercase'
  })
}

const onSessionUpdated = (error, response) => {
  if (error) { 
    console.error(error) 
    event.sender.send('update-session-reply', {response: false});
  } else {
    event.sender.send('update-session-reply', {response: true});
    sync.emit(sid, {type: sync.types.SESSION_UPDATED})
  }
}

module.exports = {
    init: () => {
        ipcMain.on('session-auth', (event, arg) => {
            const { sid, email } = arg;
            Session.findOne({sid}, (error, session) => {
              if (error) { 
                console.error(error) 
                event.sender.send('session-auth-reply', {response: false});
              } else { 
                if (session && (session.team.indexOf(email) !== -1 || session.host === email)) {
                  const {_id, sid, host, team, backlog} = session
                  event.sender.send('session-auth-reply', {response: {id:_id, sid, host, team, backlog}});
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

          ipcMain.on('create-session', (event, host) => {
            const sid= `${random(4)}-${random(4)}-${random(2)}${moment().format('DD-MMYY')}`
            const team = [host]
            const session = new Session({sid, host, team, backlog: []})
            session.save().then((response) => {
              const {_id, sid, host, team, backlog} = response
              event.sender.send('create-session-reply', {id:_id, sid, host, team, backlog});
            });
          });

          ipcMain.on('add-members', (event, {session, list}) => {
            const { team, sid } = session
            let update = false

            list.forEach((item) => {
              if (team.indexOf(item) === -1 && validator.validate(item)) {
                team.push(item)
                update = true
              }
            })

            if (update) Session.findOneAndUpdate({sid}, {team}, onSessionUpdated)
            
          });

          ipcMain.on('add-stories', (event, {session, stories}) => {
            const { backlog, sid } = session
            backlog = backlog.concat(stories)
            /*stories.forEach((item) => {
                backlog.push(item)
            })*/
            Session.findOneAndUpdate({sid}, {backlog}, onSessionUpdated)
          });
    }
}