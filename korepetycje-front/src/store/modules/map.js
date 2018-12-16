import service from '@/service'

const state = {
  searchQuery: '',
  lastSearch: null
}

const getters = {}

const mutations = {
  SET_SEARCH_QUERY (state, payload) {
    state.searchQuery = payload
  },
  SET_LAST_SEARCH (state, payload) {
    state.lastSearch = payload
  }
}

const actions = {
  async getLocation ({ commit }, payload) {
    const searchQuery = payload || 'Warszawa Centrum'
    const { data } = await service.map.getLocationByQuery(searchQuery)

    if (!data.length) return {}

    const location = {
      latitude: data[0].lat,
      longitude: data[0].lon,
      city: data[0].address.city,
      street: data[0].address.road
    }
    commit('SET_LAST_SEARCH', location)
    return location
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
