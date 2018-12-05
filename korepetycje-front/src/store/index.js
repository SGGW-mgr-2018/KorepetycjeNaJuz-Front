import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import global from './modules/global'
import map from './modules/map'

Vue.use(Vuex)

export default () => (
  new Vuex.Store({
    strict: 'true',
    modules: {
      auth,
      global,
      map
    }
  })
)
