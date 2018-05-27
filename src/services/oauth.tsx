export default {
  githubInfo: (authToken: string) => {
    return fetch(`https://api.github.com/user?access_token=${authToken}`)
  },
  googleInfo: (authToken: string) => {
    return fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${authToken}`)
  }
}
