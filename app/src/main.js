import Vue from 'vue'
import router from '@/router'
import store from '@/store'

// Styles

// Libraries
import vuetify from '@/plugins/vuetify'

// Misc.
import App from '@/App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
