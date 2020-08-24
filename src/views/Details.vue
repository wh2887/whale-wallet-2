<template>
  <div class="details-wrapper">
    <header>
      <div class="top">
        8月结余
      </div>
      <SegmentControls />
    </header>

    <div class="detailList">
      <ol>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  @Component({
    components: {SegmentControls}
  })
  export default class Details extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .details-wrapper {
    @extend %displayAuto;

    > header {
      margin-top: 1em;
      width: 94%;
      background: $color-f4;
      border-radius: .5em;

      > .top {
        padding: .5em 0;
      }

    }
    .detailList{
      background: $color-f;
      width: 94%;
      border-radius: .5em;
      margin-top: 1.4em;
    }
  }

</style>