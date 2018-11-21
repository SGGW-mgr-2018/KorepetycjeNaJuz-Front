import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'

import GridContainer from './components/GridContainer'

Vue.config.productionTip = false
Vue.component('GridContainer', GridContainer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
