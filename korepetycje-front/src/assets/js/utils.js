import _get from 'lodash.get'
import moment from 'moment'

const parseJwt = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
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

const createTeacherLesson = (payload, participantInfo = null) => {
  const startDate = _get(participantInfo, 'date', null) || payload.dateStart
  return {
    ...createBaseLesson(payload),
    userType: 2,
    studentId: _get(participantInfo, 'student.id', null),
    studentFirstName: _get(participantInfo, 'student.firstName', null),
    studentLastName: _get(participantInfo, 'student.lastName', null),
    dateStart: startDate,
    dateEnd: participantInfo ? moment(startDate).add(participantInfo.numberOfHours, 'h') : payload.dateEnd
  }
}

export {
  parseJwt,
  createTeacherContact,
  createStudentContact,
  createStudentLesson,
  createTeacherLesson
}
