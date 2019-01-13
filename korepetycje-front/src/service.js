import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

const handleErrors = err => {
  if (!err.response || err.response.status === 500) {
    return
  }

  if (err.response.status === 401) {
    return
  }

  return err.response
}

const responseData = res => res

const auth = {
  login: payload => axios.post('/api/Authorization/Login', payload).then(responseData).catch(handleErrors),
  register: payload => axios.post('/api/Users/Create', payload).then(responseData).catch(handleErrors),
  getUserData: payload => axios.get('/api/Users/Get/' + payload.user.id, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors),
  setUserData: payload => axios.put('/api/Users/Update/', payload.userData, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors)
}

const map = {
  getLocationByQuery: payload => axios({
    baseURL: `https://nominatim.openstreetmap.org/search/${ payload }?format=json&addressdetails=1&limit=1`
  }).then(responseData).catch(handleErrors)
}

const get = {
  subjects: payload => axios.get('/api/LessonSubjects/GetAll', payload).then(responseData).catch(handleErrors),
  subjectsFilter: payload => axios.post('/api/LessonSubjects/GetByFilter', payload).then(responseData).catch(handleErrors),
  lessonsFilter: payload => axios.get('/api/CoachLesson/CoachLessonsByFilters', payload).then(responseData).catch(handleErrors),
  createLesson: payload => axios.post('/api/Lesson/Create', payload, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors),
  history: token => axios.get('/api/CoachLesson/History', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(responseData).catch(handleErrors)
}

const create = {
  lesson: payload => axios.post('/api/CoachLesson/Create', payload.lessonData, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors)
}

const calendar = {
  fetchAllData: token => axios.get('/api/CoachLesson/Calendar', {
    params: {
      DateFrom: '2019-01-01',
      DateTo: '2020-01-01'
    },
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(responseData).catch(handleErrors)
}

const messages = {
  fetchAllConversations: token => axios.get('/api/Messages', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(responseData).catch(handleErrors),
  fetchChatMessagesById: payload => axios.get(`/api/Messages/${ payload.id }`, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors),
  sendMessage: payload => axios.post('/api/Messages', payload.data, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors),
  deleteMessage: payload => axios.delete(`/api/Messages/${ payload.id }`, {
    headers: {
      Authorization: 'Bearer ' + payload.token
    }
  }).then(responseData).catch(handleErrors)
}

export default {
  auth,
  map,
  get,
  create,
  calendar,
  messages
}
