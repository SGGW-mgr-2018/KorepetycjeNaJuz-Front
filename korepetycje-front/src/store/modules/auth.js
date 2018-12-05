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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
