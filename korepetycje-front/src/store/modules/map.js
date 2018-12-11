import service from '@/service'
// import router from '@/router'
// import { parseJwt } from '@/assets/js/utils'

const state = {
  searchQuery: '',
  subjects: []
}

const getters = {}

const mutations = {
  SET_SEARCH_QUERY (state, payload) {
    state.searchQuery = payload
  },
  SET_SUBJECTS (state, payload) {
    var data = payload
    for (var i = 0; i < data.length; i++) {
      const subject = {
        'id': data[i].id,
        'name': data[i].name
      }
      state.subjects.push(subject)
    }
  },
  SET_SUBJECTS_BY_FILTER (state, payload) {
    var data = payload
    console.log(data)
    // for (var i = 0; i < data.length; i++) {
    //   const subject = {
    //     'id': data[i].id,
    //     'name': data[i].name
    //   }
    //   state.subjects.push(subject)
    // }
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
