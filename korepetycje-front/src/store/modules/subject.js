import service from '@/service'

const state = {
  subjects: []
}

const getters = {}

const mutations = {
  SET_SUBJECTS (state, payload) {
    var data = payload
    for (var i = 0; i < data.length; i++) {
      const subject = {
        'id': data[i].id,
        'name': data[i].name
      }
      state.subjects.push(subject)
    }
  }
}

const actions = {
  async getAllSubjects ({ commit }) {
    const { data } = await service.get.subjects()
    commit('SET_SUBJECTS', data)
    return data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
