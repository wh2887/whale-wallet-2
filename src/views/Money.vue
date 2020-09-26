<template>
  <div class="money-wrapper">
    <div class="top">
      <h2>记一笔</h2>
      <SegmentControls />
    </div>
    <div class="middle">
      <Tabs />
    </div>
    <div class="bottom">
      <NumberPad />
    </div>
  </div>


</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Tabs from '@/components/Tabs.vue';
  import NumberPad from '@/components/NumberPad.vue';

  @Component({
    components: {NumberPad, Tabs, SegmentControls}
  })
  export default class Money extends Vue {
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .money-wrapper {
    @extend %displayAuto;

    .top {
      width: $width; margin-top: $top-margin; background: $color-highlight-thin; padding: 1em 2em; border-radius: $bg-radius;
    }

    .middle {
      width: $width; height: 20vh; border-radius: $bg-radius; margin-top: $top-margin/2; overflow-y: auto;
      &::-webkit-scrollbar { width: 0 !important }
      & { overflow: -moz-scrollbars-none; }
      & { -ms-overflow-style: none; }
    }

    .bottom{
      background: $color-f;
      width: $width;
      height: 50vh;
      margin-top:  $top-margin/2;
      border-radius: $bg-radius;
    }
  }

</style>