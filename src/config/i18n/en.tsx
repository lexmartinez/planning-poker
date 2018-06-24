const en = {
  global: {
    yes: 'Yes',
    no: 'No'
  },
  login: {
    'logIn': 'Login with'
  },
  home: {
    'hello': 'Hello',
    'logout': 'Log Out',
    'about': 'About',
    'menu': 'Menu',
    lang: {
      'label': 'Switch Language to',
      'target': 'es',
      'targetName': 'Spanish (Español)'
    },
    join: {
      'title': 'Join a Session',
      'subtitle': 'Please enter the planning session ID',
      'button': 'Join',
      'error': 'Enter a valid session ID'
    },
    create: {
      'title': 'Create Session',
      'subtitle': 'Just load your backlog and start planning!',
      'button': 'Create Session'
    }
  },
  session: {
    'sid': 'Session ID',
    'copyClipboard': 'Copy Session ID',
    'copySuccess': 'Copied!',
    'addMember': 'Add Members',
    'team': 'Team',
    'backlog': 'Stories',
    'addStory': 'Add Story',
    'emptyTeam': 'No members yet,',
    'emptyBacklog': 'No stories yet,',
    'hintTeam': 'Use plus (+) button to invite members.',
    'hintBacklog': 'Use plus (+) button to include new stories on your backlog.',
    'noVoting': 'The session haven\'t been started yet, waiting for host signal',
    'completed': 'The session have been completed, voting isn\'t available anymore',
    invite: {
      'title': 'Invite your team',
      'paragraph': 'Enter emails manually or copy paste a list of emails. ' +
                   'Please separate email addresses with a space and/or comma, or enter each email on a new line.',
      'hint': 'Duplicate or invalid addresses will be ignored, also if the member already was invited',
      'button': 'Invite Team',
      'success': 'Updated!',
      'remove': 'Are you sure you want to remove this member?'
    },
    story: {
      'title': 'Add Stories',
      'paragraph': 'Enter stories as text manually or copy paste a list of stories. ' +
                   'Please separate each user story with a new line.',
      'button': 'Add Stories',
      'success': 'Updated!',
      'remove': 'Are you sure you want to remove this story?'
    }
  }
}

export default {
  translation: en
}
