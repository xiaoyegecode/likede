import router from '@/router'
import { loginAPI } from '@/api/login'
import { Message } from 'element-ui'
const state = {
  token: null
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = null
  }
}
const actions = {
  async loginActions({ commit }, data) {
    try {
      const res = await loginAPI(data)
      console.log(res)
      if (!res.data.success) return Message.error(res.data.msg)
      Message.success(res.data.msg)
      commit('SET_TOKEN', res.data.token)
      router.push('/')
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
