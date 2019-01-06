import service from '@/service'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  async createLesson ({ commit }, lessonData) {
    const payload = {
      token: localStorage.getItem('token'),
      lessonData: lessonData
    }

    const response = await service.create.lesson(payload)
    return response
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
