<template>
  <div class="statistic-wrapper">
    <div class="statistic-top">
      <SegmentControls value="-"/>
    </div>
    <div class="statistic-middle">

    </div>
    <div class="statistic-bottom">

    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import echarts from 'echarts'


  @Component({
    components: {SegmentControls}
  })
  export default class Statistic extends Vue {

    created(){
      console.log(echarts);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .statistic-wrapper {
    @extend %displayAuto;

    .statistic-top {
      width: $width; margin-top: $top-margin/2;
      background: $color-highlight-thin;  border-radius: $bg-radius;
      padding: .8em 1em;
    }

    .statistic-middle {
      width: $width; height: 30vh; border-radius: $bg-radius; margin-top: $top-margin/2;
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