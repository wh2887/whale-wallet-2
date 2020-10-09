<template>
  <div class="echarts-wrapper" ref="wrapper">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import echarts, {EChartOption, ECharts} from 'echarts';
  import {Component, Prop, Watch} from 'vue-property-decorator';

  @Component
  export default class Chart extends Vue {
    @Prop() options?: EChartOption;
    chart?: ECharts;


    mounted() {
      if (this.options === undefined) {
        return console.error('options 为空');
      }
      this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
      this.chart.setOption(this.options);
    }

    @Watch('options')
    onOptionsChanged(newValue: EChartOption){
      this.chart?.setOption(newValue)
    }

  }
</script>

<style lang="scss" scoped>
  .echarts-wrapper {
    height: 200px;
  }

</style>