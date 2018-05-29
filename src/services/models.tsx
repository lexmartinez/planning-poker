export default {
  user: (model: any) => {
    const { name, email, avatar_url, picture } = model
    return {
      name,
      email,
      avatar: avatar_url || picture
    }
  }
}
