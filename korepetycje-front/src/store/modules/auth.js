import service from '@/service'
import router from '@/router'
import { parseJwt } from '@/assets/js/utils'

const state = () => ({
  token: null,
  user: {}
})

const getters = {
  isAuthenticated (state) {
    return !!state.token
  }
}

const mutations = {
  SET_AUTH (state, payload) {
    state.token = payload
    const tokenData = parseJwt(payload)
    state.user.id = tokenData.UserId
    state.user.uniqueName = tokenData.unique_name
  },
  CLEAR_AUTH (state) {
    state.token = null
    state.user = null
  }
}

const actions = {
  async login ({ commit, dispatch }, payload) {
    const { data } = await service.auth.login(payload)
    if (data.token) {
      commit('SET_AUTH', data.token)
      localStorage.setItem('token', data.token)
      router.push({ name: 'moje-konto' })
    } else {
      return data
    }
  },
  async register ({ commit, dispatch }, payload) {
    const { data } = await service.auth.register(payload)
    if (data.token) {
      commit('SET_AUTH', data.token)
      localStorage.setItem('token', data.token)
      router.push({ name: 'moje-konto' })
    } else {
      return data
    }
  },
  logout ({ commit }) {
    commit('CLEAR_AUTH')
    localStorage.removeItem('token')
    router.push({ name: 'home' })
  },
  tryAutoLogin ({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) return
    commit('SET_AUTH', token)
  },
  async getUserData () {
    const token = localStorage.getItem('token')
    const user = this.state.auth.user
    const payload = {
      token: token,
      user: user
    }
    const userData = await service.auth.getUserData(payload)
    return userData
  },
  async setUserData (userData) {
    const payload = {
      token: localStorage.getItem('token'),
      userData: userData,
      user: this.state.auth.user
    }
    const response = await service.auth.setUserData(payload)
    console.log(response)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
