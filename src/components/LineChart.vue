// 參考以前的文章可能產生版本不支持問題

<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,

  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    chartColorOptions: {
      type: Object,
    },
  },

  mounted() {
    const dates=this.chartData.map((d) => d.date)
    const totals=this.chartData.map((d) => d.suffer)
    console.log(dates)
    console.log(totals)
    this.renderChart(
      {
        labels:dates,
        datasets: [
          {
            label: this.label,
            data: totals,
            ...this.chartColorOptions
          },
        ],
      },
      this.options
    )
  },
}
</script>

