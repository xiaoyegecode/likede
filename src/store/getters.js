const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.userName,
  hrsaasTime: state => state.user.hrsaasTime
}
export default getters
