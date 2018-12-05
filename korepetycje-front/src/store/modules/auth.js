import service from '@/service'

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
    state.token = payload
  },
  CLEAR_AUTH () {
    state.token = null
  }
}

const actions = {
  async login ({ commit, dispatch }, payload) {
    const { data } = await service.auth.login(payload)
    if (data.token) {
      commit('SET_AUTH_TOKEN', data.token)
      localStorage.setItem('token', data.token)
      this.$router.push({ name: 'moje-konto' })
    } else {
      return data
    }
  },
  logout ({ commit }) {
    commit('CLEAR_AUTH')
    localStorage.removeItem('token')
    this.$router.replace('/logowanie')
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
