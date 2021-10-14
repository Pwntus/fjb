// import * as t from '@/store/types'
import config from '@/config'
import list from '@/list'

const actions = {
  async fetchData() {
    try {
      const result = await fetch(config.FILE_ENDPOINT)
      const text = await result.text()
      const arr = text
        .split('\n')
        .filter((_, i) => {
          return (i + 1) % 60 === 0
        })
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
      list.setList(arr)
    } catch (e) {
      console.log(e)
    }
  }
}

const getters = {}

export default {
  namespaced: true,
  actions,
  getters
}
