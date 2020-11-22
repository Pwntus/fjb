import Vue from 'vue'
import Vuex from 'vuex'

// Vuex modules
import App from '@/store/modules/App'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    App
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
