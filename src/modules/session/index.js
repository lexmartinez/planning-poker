'use strict'
const {clipboard, ipcMain, dialog} = require('electron')
const Session = require('./model')
const sync = require('../sync')
const randomstring = require('randomstring')
const moment = require('moment')
const validator = require('email-validator')

const random = (length) => {
  return randomstring.generate({
    length,
    capitalization: 'uppercase'
  })
}

const confirmDialog = (win, labels, callback) => {
  dialog.showMessageBox (win, {
    type: 'question',
    title: labels.title, message: labels.message,
    buttons: [labels.no, labels.yes],
    cancelId: 0, defaultId: 1
  }, callback);
}

module.exports = {
    init: (win) => {
        sync.init();
        
        ipcMain.on('session-auth', (event, arg) => {
            const { sid, email } = arg;
            Session.findOne({sid}, (error, session) => {
              if (error) { 
                console.error(error) 
                event.sender.send('session-auth-reply', {response: false});
              } else { 
                if (session && (session.team.indexOf(email) !== -1 || session.host === email)) {
                  const {_id, sid, host, team, backlog, status, current} = session
                  event.sender.send('session-auth-reply', {response: {id:_id, sid, host, team, backlog, status, current}});
                } else {
                  event.sender.send('session-auth-reply', {response: false});
                }
              }
            });
          });

          ipcMain.on('get-session', (event, sid) => {
            Session.findOne({sid}, (error, session) => {
              if (error) { 
                console.error(error) 
                event.sender.send('get-session-reply', {error});
              } else { 
                  const {_id, sid, host, team, backlog, status, current} = session
                  event.sender.send('get-session-reply', {session: {id:_id, sid, host, team, backlog, status, current}});
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
            const session = new Session({sid, host, team, backlog: [], status: 'CREATED', current: 0})
            session.save().then((response) => {
              const {_id, sid, host, team, backlog, status, current} = response
              event.sender.send('create-session-reply', {id:_id, sid, host, team, backlog, status, current});
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

            if (update) Session.findOneAndUpdate({sid}, {team}, (error, response) => {
              if (error) { 
                console.error(error) 
                event.sender.send('update-session-reply', {response: false});
              } else {
                event.sender.send('update-session-reply', {response: true});
                sync.emit(sid, {type: sync.types.SESSION_UPDATED})
              }
            })
            
          });

          ipcMain.on('add-stories', (event, {session, stories}) => {
            const { sid } = session
            let backlog = session.backlog.concat(stories)
            Session.findOneAndUpdate({sid}, {backlog}, (error, response) => {
              if (error) { 
                console.error(error) 
                event.sender.send('update-session-reply', {response: false});
              } else {
                event.sender.send('update-session-reply', {response: true});
                sync.emit(sid, {type: sync.types.SESSION_UPDATED})
              }
            })
          });

          ipcMain.on('remove-story', (event, {session, story, labels}) => {
            const sid = session.sid
            confirmDialog(win, labels, (response) => {
              if(Boolean(response)) {
                let i = session.backlog.indexOf(story);
                let backlog = session.backlog;
                if(i != -1) {
                  backlog.splice(i, 1);
                }
                Session.findOneAndUpdate({sid}, {backlog}, (error, response) => {
                  if (error) { 
                    console.error(error) 
                    event.sender.send('update-session-reply', {response: false});
                  } else {
                    event.sender.send('update-session-reply', {response: true});
                    sync.emit(sid, {type: sync.types.SESSION_UPDATED})
                  }
                })
              }
            })
          });

          ipcMain.on('remove-member', (event, {session, member, labels}) => {
            const sid = session.sid
            confirmDialog(win, labels, (response) => {
              if(Boolean(response)) {
                let i = session.team.indexOf(member);
                let team = session.team;
                if(i != -1) {
                  team.splice(i, 1);
                }
                Session.findOneAndUpdate({sid}, {team}, (error, response) => {
                  if (error) { 
                    console.error(error) 
                    event.sender.send('update-session-reply', {response: false});
                  } else {
                    event.sender.send('update-session-reply', {response: true});
                    sync.emit(sid, {type: sync.types.SESSION_UPDATED})
                  }
                })
              }
            })
          });
    }
}