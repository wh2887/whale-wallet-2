<template>
  <div class="segment-controls-wrapper">
    <ul>
      <li :class="{selected: type === '-'}" @click="selectType('-')">支出</li>
      <li :class="{selected:type === '+'}" @click="selectType('+')">收入</li>
    </ul>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class SegmentControls extends Vue {
    type = '-';

    selectType(value: string) {
      this.type = value;
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

   .segment-controls-wrapper {
    > ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: .5em 0 ;

      > li {
        padding: .3em 0;
        border: 1px solid $color-highlight;
        width: 40%;

        &.selected {
          background: $color-highlight;
          color: $color-f;
        }

        &:first-child {
          border-radius: 4.5px 0 0 4.5px;
        }

        &:last-child {
          border-radius: 0 4.5px 4.5px 0;
        }

        &:not(:first-child) {
          margin-left: -1px;
        }
      }
    }
  }


</style>