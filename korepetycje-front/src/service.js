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
  register: payload => axios.post('/api/Authorization/Create', payload).then(responseData).catch(handleErrors)
}

export default {
  auth
}
