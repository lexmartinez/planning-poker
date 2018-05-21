module.exports = {
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        authorizationUrl: 'http://github.com/login/oauth/authorize',
        tokenUrl: 'https://github.com/login/oauth/access_token',
        useBasicAuthorizationHeader: false,
        redirectUri: 'http://localhost'
    },
    window: {
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: false
        }
    }
}
