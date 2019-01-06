import service from '@/service'
import _uniqBy from 'lodash.uniqby'
import {
  createStudentLesson,
  createTeacherLesson,
  createTeacherContact,
  createStudentContact
} from '@/assets/js/utils'

const state = {
  fetchLoading: false,
  lessons: [],
  addressBook: [],
  conversations: [],
  chatMessages: []
}

const getters = {
  getLessons () {

  },
  getAddresses (state) {
    return _uniqBy(state.addressBook, 'id')
  },
  getChatMessages (state) {

  },
  getConversations (state) {

  }
}

const mutations = {
  SET_LESSONS (state, payload) {
    state.lessons = payload.reduce((lessons, entry) => {
      if (entry.userRole === 1) {
        lessons.push(createStudentLesson(entry))
      } else {
        entry.lessons.forEach(lesson => {
          if (lesson !== null) {
            lessons.push(createTeacherLesson(lesson.student))
          }
        })
      }
      return lessons
    }, [])
  },
  SET_ADDRESS_BOOK (state, payload) {
    state.addressBook = payload.reduce((addresses, entry) => {
      if (entry.userRole === 1) {
        addresses.push(createTeacherContact(entry))
      } else {
        entry.lessons.forEach(lesson => {
          if (lesson !== null) {
            addresses.push(createStudentContact(lesson.student))
          }
        })
      }
      return addresses
    }, [])
  },
  SET_CONVERSATIONS (state, payload) {
    state.conversations = payload
  },
  SET_CHAT_MESSAGES (state, payload) {
    state.chatMessages = payload
  },
  SET_FETCH_LOADING (state, payload) {
    state.fetchLoading = payload
  }
}

const actions = {
  async fetchCalendarData ({ commit }) {
    const token = localStorage.getItem('token')
    commit('SET_FETCH_LOADING', true)
    const { data } = await service.calendar.fetchAllData(token)
    commit('SET_LESSONS', data)
    commit('SET_ADDRESS_BOOK', data)
    commit('SET_FETCH_LOADING', false)
  },
  async fetchAllConversations ({ commit }) {
    const token = localStorage.getItem('token')
    commit('SET_FETCH_LOADING', true)
    const { data } = await service.calendar.fetchAllConversations(token)
    commit('SET_CONVERSATIONS', data)
    commit('SET_FETCH_LOADING', false)
  },
  async fetchChatMessages ({ commit }, id) {
    const token = localStorage.getItem('token')
    const payload = {
      token,
      id
    }
    commit('SET_FETCH_LOADING', true)
    const { data } = await service.messages.fetchChatMessagesById(payload)
    commit('SET_FETCH_LOADING', false)
    commit('SET_CHAT_MESSAGES', data)
    console.log(data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
