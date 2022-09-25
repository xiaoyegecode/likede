import { loginAPI } from '@/api/login'
import { Message } from 'element-ui'
const state = {
  token: null
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}
const actions = {
  async loginActions({ commit }, data) {
    try {
      const res = await loginAPI(data)
      if (!res.data.success) return Message.error(res.data.msg)
      Message.success(res.data.msg)
      commit('SET_TOKEN', res.data.token)
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
