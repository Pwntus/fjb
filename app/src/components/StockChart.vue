<template lang="pug">
.stock-chart(v-if="ready")
  highcharts(
    :options="chartOptions"
    :show-median="showMedian"
    ref="chart"
  )
  v-switch.mt-6(
    v-model="showMedian"
    label="Vis median"
    color="#0c2231"
    inset dark dense
    hide-details
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
    showMedian: false,
    chartOptions: {}
  }),
  computed: {
    ...mapState('App', ['list']),
    seriesAvg() {
      return this.list.map(({ timestamp, value, n }) => ({
        x: timestamp,
        y: value,
        n: n
      }))
    },
    seriesMedian() {
      return this.list
        .map(({ timestamp, median, n }) => ({
          x: timestamp,
          y: median,
          n: n
        }))
        .filter(({ y }) => y)
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
            name: 'Pris 1 FJB',
            type: 'spline',
            data: this.seriesAvg
          },
          {
            name: 'Pris 1 FJB (median)',
            type: 'spline',
            data: this.seriesMedian,
            visible: this.showMedian
          }
        ],
        plotOptions: {
          spline: {
            lineWidth: 1,
            turboThreshold: 0,
            animation: {
              duration: 4000
            },
            marker: {
              radius: 2,
              enabledThreshold: 3
            },
            dataLabels: {
              enabled: true,
              format: '{point.y} NOK',
              color: '#0c2231',
              backgroundColor: 'transparent',
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
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          hideDelay: 0,
          shadow: false,
          padding: 16,
          useHTML: true,
          borderWidth: 0,
          borderRadius: 5,
          headerFormat: '',
          pointFormat: `
            <table cellspacing="0" cellpadding="0" style="border:none;color:#000">
              <tr>
                <td style="padding-right:8px;text-align:right">{series.name}:</td>
                <td style="font-weight:bold;text-align:left;color:#0c2231">{point.y} NOK</td>
              </tr>
              <tr>
                <td style="padding:4px 8px 0 0;text-align:right">I omløp (ca):</td>
                <td style="padding-top:4px;font-weight:bold;text-align:left;color:#0c2231">{point.n}st</td>
              </tr>
            </table>`
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

  > div:not(.v-input)
    position relative
    height 100%
</style>
