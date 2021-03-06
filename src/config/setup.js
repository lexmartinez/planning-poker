module.exports = {
    github: {
        clientId: 'GITHUB_CLIENT_ID',
        clientSecret: 'GITHUB_CLIENT_SECRET',
        authorizationUrl: 'http://github.com/login/oauth/authorize',
        tokenUrl: 'https://github.com/login/oauth/access_token',
        useBasicAuthorizationHeader: false,
        redirectUri: 'http://localhost'
      },
    google: {
        clientId: 'GOOGLE_CLIENT_ID',
        clientSecret: 'GOOGLE_CLIENT_SECRET',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        tokenUrl: 'https://accounts.google.com/o/oauth2/token',
        useBasicAuthorizationHeader: false,
        redirectUri: 'http://localhost'
      },
    window: {
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: false
        }
    },
    mongodb: {
        url: 'MONGO_URL',
        model: 'MONGO_MODEL'
    },
    pusher: {
        appId: APP_ID,
        key: APP_KEY,
        secret: APP_SECRET,
        cluster: APP_CLUSTER,
        encrypted: true
    }
}