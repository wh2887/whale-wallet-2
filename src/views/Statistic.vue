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

    get chartOptions() {
      return {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
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