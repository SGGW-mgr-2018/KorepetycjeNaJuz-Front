import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import GridContainer from './components/GridContainer'
import VueFormFactory from 'vue-form-factory'
import Multiselect from 'vue-multiselect'

Vue.config.productionTip = false

Vue.component('GridContainer', GridContainer)
Vue.use(VueFormFactory)
Vue.component('multiselect', Multiselect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
