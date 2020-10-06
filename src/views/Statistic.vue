<template>
  <div class="statistic-wrapper">
    <span>统计页</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Statistic extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .statistic-wrapper{
    @extend %displayAuto;
  }

</style>