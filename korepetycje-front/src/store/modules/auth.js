import service from '@/service'
import router from '@/router'

const state = () => ({
  token: null
})

const getters = {
  isAuthenticated (state) {
    return !!state.token
  }
}

const mutations = {
  SET_AUTH (state, payload) {
    // todo: convert from base64 to object
    state.token = payload
  },
  CLEAR_AUTH (state) {
    state.token = null
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
