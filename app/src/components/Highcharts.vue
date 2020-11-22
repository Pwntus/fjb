<script>
import Highcharts from 'highcharts'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

export default {
  name: 'Highcharts',
  template: '<div ref="chart"></div>',
  render: createElement => createElement('div', { ref: 'chart' }),
  props: {
    constructorType: {
      type: String,
      default: 'chart'
    },
    options: {
      type: Object,
      required: true
    },
    callback: Function,
    updateArgs: {
      type: Array,
      default: () => [true, true]
    }
  },
  data: () => ({
    resizeSensor: null
  }),
  watch: {
    options: {
      handler(newValue) {
        this.chart.update(Object.assign({}, newValue), ...this.updateArgs)
      },
      deep: true
    }
  },
  methods: {
    onResize() {
      if (this.$refs.chart.chart) this.$refs.chart.chart.reflow()
    }
  },
  mounted() {
    // Check wheather the chart configuration object is passed, as well as the constructor is valid
    if (this.options && Highcharts[this.constructorType]) {
      this.chart = Highcharts[this.constructorType](
        this.$refs.chart,
        Object.assign({}, this.options),
        this.callback ? this.callback : null
      )
    }

    this.resizeSensor = new ResizeSensor(this.$el, this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    if (this.chart) this.chart.destroy()
    this.resizeSensor.detach()
  }
}
</script>
