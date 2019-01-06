import service from '@/service'
import moment from 'moment'
import _get from 'lodash.get'
import _uniqBy from 'lodash.uniqby'

const state = {
  fetchLoading: false,
  lessons: [],
  addressBook: []
}

const getters = {
  getLessons () {

  },
  getAddresses (state) {
    return _uniqBy(state.addressBook, 'id')
  }
}

const createTeacherContact = payload => ({
  id: payload.coachId,
  firstName: payload.coachFirstName,
  lastName: payload.coachLastName,
  userType: 2
})

const createStudentContact = payload => ({
  id: payload.id,
  firstName: payload.firstName,
  lastName: payload.lastName,
  userType: 1
})

const createBaseLesson = payload => ({
  lessonSubject: payload.lessonSubject,
  description: payload.description,
  lessonLevels: payload.lessonLevels,
  time: payload.time,
  dateStart: payload.dateStart,
  dateEnd: payload.dateEnd,
  ratePerHour: payload.ratePerHour
})

const createStudentLesson = payload => ({
  ...createBaseLesson(payload),
  userType: 1,
  coachId: payload.coachId,
  coachFirstName: payload.coachFirstName,
  coachLastName: payload.coachLastName
})

const createTeacherLesson = (payload, participantInfo = null) => ({
  ...createBaseLesson(payload),
  userType: 2,
  studentId: _get(participantInfo, 'student.id', null),
  studentFirstName: _get(participantInfo, 'student.firstName', null),
  studentLastName: _get(participantInfo, 'student.lastName', null),
  dateStart: _get(participantInfo, 'date', null) || payload.dateStart,
  dateEnd: participantInfo ? moment(this.dateStart).add(participantInfo.numberOfHours, 'h') : payload.dateEnd
})

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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
