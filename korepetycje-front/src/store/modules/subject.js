import service from '@/service'

const state = () => ({
  lessons: []
})

const getters = {

}

const mutations = {

}

const actions = {
  async getAll () {
    const { data } = await service.get.subjects()
    return data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
