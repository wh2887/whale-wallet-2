<template>
  <div class="echarts-wrapper" ref="wrapper">
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import echarts, {EChartOption, ECharts} from 'echarts';
  import {Component, Prop} from 'vue-property-decorator';

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
      const div = (this.$refs.wrapper as HTMLDivElement)
      div.style.width = div.offsetWidth + 'px'
      div.style.height = div.offsetHeight + 'px'

    }

  }
</script>

<style lang="scss" scoped>
  .echarts-wrapper {
    height: 400px;
  }

</style>