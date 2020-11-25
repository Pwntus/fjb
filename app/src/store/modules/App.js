import * as t from '@/store/types'
import config from '@/config'

const state = {
  list: []
}

const mutations = {
  [t.APP_SET_LIST](state, payload) {
    state.list = payload
  }
}

const actions = {
  async fetchData({ commit }) {
    try {
      const result = await fetch(config.FILE_ENDPOINT)
      const text = await result.text()
      const list = text
        .split('\n')
        .map(line => {
          const [timestamp, value, n, median] = line.split(' ')
          return {
            timestamp: parseInt(timestamp) || '',
            value: parseFloat(value) || undefined,
            n: parseInt(n) || undefined,
            median: parseInt(median) || undefined
          }
        })
        .filter(({ timestamp, value, n }) => {
          return timestamp !== '' && value !== undefined && n !== undefined
        })
      commit(t.APP_SET_LIST, list)
    } catch (e) {
      console.log(e)
    }
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
