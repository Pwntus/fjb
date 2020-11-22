<template lang="pug">
.stock-chart(v-if="ready")
  highcharts(
    :options="chartOptions"
    ref="chart"
  )
</template>

<script>
import { merge } from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import Highcharts from '@/components/Highcharts'
import config from '@/config'

export default {
  name: 'StockChart',
  components: { Highcharts },
  data: () => ({
    ready: false,
    chartOptions: {}
  }),
  computed: {
    ...mapState('App', ['list']),
    seriesData() {
      return this.list.map(({ timestamp, value, n }) => ({
        x: timestamp,
        y: value,
        n: n
      }))
    }
  },
  methods: {
    ...mapActions('App', ['fetchData']),
    setOptions() {
      const localOptions = {
        title: {
          text: null
        },
        series: [
          {
            name: 'Pris',
            data: this.seriesData
          }
        ],
        plotOptions: {
          series: {
            turboThreshold: 0,
            animation: {
              duration: 250
            },
            marker: {
              radius: 2,
              enabledThreshold: 3
            },
            dataLabels: {
              enabled: true,
              format: '{point.y} NOK',
              color: '#013251',
              padding: 15,
              style: {
                textOutline: 0
                // textOutline: '1px #bbb'
              }
            }
          }
        },
        tooltip: {
          enabled: true,
          animation: false,
          backgroundColor: '#FFF',
          hideDelay: 0,
          shadow: true,
          borderWidth: 0,
          borderRadius: 0,
          headerFormat: '',
          pointFormat:
            'Pris 1 FJB: <b>{point.y}NOK</b><br/>I omløp (ca): <b>{point.n}st</b>'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Pris 1 FJB (NOK)',
            style: {
              color: '#FFF'
            }
          }
        }
      }
      this.chartOptions = merge(config.HIGHCHARTS_GLOBAL, localOptions)
    }
  },
  async mounted() {
    try {
      await this.fetchData()
      this.setOptions()
      this.ready = true
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="stylus" scoped>
.stock-chart
  width 100%
  height 300px

  > div
    position relative
    height 100%
</style>
