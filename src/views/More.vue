<template>
  <div class="more-wrapper">
    <span>更多页</span>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class More extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .more-wrapper{
    @extend %displayAuto;
  }

</style>