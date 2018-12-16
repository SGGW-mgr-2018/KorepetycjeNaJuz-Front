import service from '@/service'

const state = () => ({
  lessons: []
})

const getters = {

}

const mutations = {

}

const actions = {
  getAll ({ commit }) {
    const { data } = service.subject.getAll()
    return data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
