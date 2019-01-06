import service from '@/service'

const state = {
  searchQuery: '',
  lastSearch: null,
  subjects: [],
  lessons: [],
  markers: [],
  createdLesson: null
}

const getters = {}

const mutations = {
  SET_SEARCH_QUERY (state, payload) {
    state.searchQuery = payload
  },
  SET_MARKERS (state, payload) {
    state.markers = []
    state.markers = payload
  },
  SET_CREATED_LESSON (state, payload) {
    state.createdLesson = payload
  },
  SET_SUBJECTS (state, payload) {
    // var data = payload
    // for (var i = 0; i < data.length; i++) {
    //   const subject = {
    //     'id': data[i].id,
    //     'name': data[i].name
    //   }
    //   state.subjects.push(subject)
    // }
  },
  SET_SUBJECTS_BY_FILTER (state, payload) {
    var data = payload
    state.subjects = []
    for (var i = 0; i < data.length; i++) {
      const subject = {
        'id': data[i].id,
        'name': data[i].name
      }
      state.subjects.push(subject)
    }
  },
  SET_LAST_SEARCH (state, payload) {
    state.lastSearch = payload
  }
}

const actions = {
  async subjects ({ commit, dispatch }, payload) {
    const { data } = await service.get.subjects(payload)
    commit('SET_SUBJECTS', data)
    return data
  },
  async subjectsFilter ({ commit, dispatch }, payload) {
    const { data } = await service.get.subjectsFilter(payload)
    commit('SET_SUBJECTS_BY_FILTER', data)
    return data
  },
  async lessonsFilter ({ commit, dispatch }, payload) {
    const response = await service.get.lessonsFilter(payload)
    commit('SET_MARKERS', response)
  },
  async createLesson ({ commit, dispatch }, payload) {
    const response = await service.get.createLesson(payload)
    commit('SET_MARKERS', response)
  },
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
