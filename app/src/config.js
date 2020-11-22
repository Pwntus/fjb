/**
 * Highcharts options docs:
 * https://api.highcharts.com/highcharts/
 */
const HIGHCHARTS_GLOBAL = {
  chart: {
    backgroundColor: 'transparent'
  },
  boost: {
    seriesThreshold: 50
  },
  title: null,
  tooltip: { enabled: false },
  credits: { enabled: false },
  legend: {
    enabled: false,
    itemStyle: {
      fontWeight: 'normal',
      color: '#FFF'
    },
    itemHoverStyle: {
      color: '#FFF'
    }
  },
  time: {
    timezoneOffset: -60 // UTC+1
  },
  xAxis: {
    lineColor: '#c70d2c',
    gridLineColor: '#c70d2c',
    labels: {
      style: {
        color: '#FFF'
      }
    }
  },
  yAxis: {
    title: null,
    lineColor: '#c70d2c',
    gridLineColor: '#c70d2c',
    labels: {
      style: {
        color: '#FFF'
      }
    }
  },
  colors: ['#FFF']
}

const dev = {
  HIGHCHARTS_GLOBAL
}

const prod = {
  HIGHCHARTS_GLOBAL
}

const config = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  ...config
}
