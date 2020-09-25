<template>
  <div class="money-wrapper">
    <div class="top">
      <h2>记一笔</h2>
      <SegmentControls />
    </div>
    <div class="middle">
      <ul>
        <li class="selected">
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <li>
          <Icon name="shuiguo"/>
        </li>
        <i></i><i></i><i></i><i></i><i></i><i></i>
      </ul>
    </div>
  </div>


</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Icon from '@/components/Icon.vue';
  @Component({
    components: {Icon, SegmentControls}
  })
  export default class Money extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .money-wrapper {
    @extend %displayAuto;
    .top{
      width: $width;
      margin-top: 1.4em;
      background: $color-highlight-thin;
      padding: 1em 2em;
      border-radius: 17px;
    }
    .middle{
      width: $width;
      height: 20vh;
      border-radius: 17px;
      margin-top: 1.4em;
      background: $color-f;
      overflow-y: auto;
      &::-webkit-scrollbar { width: 0 !important }   // chrome 和 Safari
      &{ overflow: -moz-scrollbars-none; }           // IE 10+
      &{ -ms-overflow-style: none; }                 // Firefox
      ul{
        display: flex;
        justify-content: space-around;
        padding: 1em;
        flex-wrap: wrap;
        li{
          border-radius: 4px;
          font-size: 1.8em;
          background: $color-highlight;
          margin: .4em;
          padding: 4px 5px;
          &.selected{
            color: white;
          }
        }
        i{
          margin: .4em;
          padding: .2em;
          font-size: 1.8em;
        }
      }
    }
  }

</style>