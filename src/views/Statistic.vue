<template>
  <div class="statistic-wrapper">
    <div class="statistic-top">
      <SegmentControls value="-"/>
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <div class="statistic-bottom">

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Chart from '@/components/Chart.vue';

  @Component({
    components: {Chart, SegmentControls}
  })
  export default class Statistic extends Vue {

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    get chartOptions() {

      const keys = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
      ];

      const values = [
        '1', '2', '0', '56', '15', '126', '7', '8', '29', '30',
        '110', '120', '19', '14', '15', '21', '18', '1', '9', '20',
        '5', '22', '3', '121', '125', '260', '217', '8', '95', '30', '365'
      ];
      return {
        tooltip: {
          show: true,
        },
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true
          },
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            name: '月',
            data: values,
            type: 'line',
            symbol: 'circle',
            symbolSize: 12,
            itemStyle: {borderWidth: 1, color: '#68B0AB', borderColor: '#68B0AB'},
          },
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .statistic-wrapper {
    @extend %displayAuto;

    .echarts {
      max-width: 100%;
      height: $chart-height
    }

    .statistic-top {
      width: $width; margin-top: $top-margin/2;
      background: $color-highlight-thin; border-radius: $bg-radius;
      padding: .8em 1em;
    }

    .chart-wrapper {
      width: $width; height: $chart-height; border-radius: $bg-radius; margin-top: $top-margin/2;
      background: $color-f;
      overflow: auto;

      .chart {
        width: 430%;
      }
    }

    .statistic-bottom {
      flex: 1;
      background: $color-f;
      width: $width;
      margin-top: $top-margin/2;
      margin-bottom: $top-margin/4;
      border-radius: $bg-radius;
    }

  }

</style>