export default {
  userInfo: (authToken: string) => {
    return fetch(`https://api.github.com/user?access_token=${authToken}`)
  }
}
