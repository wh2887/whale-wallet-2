<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href=" `#icon-${name}` "></use>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Icon extends Vue {
    @Prop({default: 'tupian', type: String}) readonly name!: string;

  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>