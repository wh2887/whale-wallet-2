<template>
  <div class="money-wrapper">
    <div class="top">
      <h2>记一笔</h2>
      <SegmentControls/>
    </div>
    <div class="middle">
      <ul>
        <li :class="{'selected':iconName === icon.iconName}" v-for="icon in iconTable" :key="icon.id" @click="selectIcon(icon.iconName)">
          <Icon :name="icon.iconName"/>
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
    iconName = '';
    iconTable = [
      {id: 1, type: '-', iconName: 'shuiguo'},
      {id: 2, type: '-', iconName: 'shuidianmei'},
      {id: 3, type: '-', iconName: 'xinyongkahuankuan'},
      {id: 4, type: '-', iconName: 'fangzu'},
      {id: 5, type: '-', iconName: 'lifa'},
      {id: 6, type: '-', iconName: 'huafei'},
      {id: 7, type: '-', iconName: 'fushi'},
      {id: 8, type: '-', iconName: 'canyinye'},
      {id: 9, type: '-', iconName: 'yule'},
      {id: 10, type: '-', iconName: 'jiaotong'},
      {id: 11, type: '-', iconName: 'youxi'}
    ];
    selectIcon(iconName: string) {
      this.iconName = iconName
      return;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .money-wrapper {
    @extend %displayAuto;

    .top {
      width: $width;
      margin-top: 1.4em;
      background: $color-highlight-thin;
      padding: 1em 2em;
      border-radius: 17px;
    }

    .middle {
      width: $width;
      height: 20vh;
      border-radius: 17px;
      margin-top: 1.4em;
      background: $color-f;
      overflow-y: auto;

      &::-webkit-scrollbar { width: 0 !important }

      // chrome 和 Safari
      & { overflow: -moz-scrollbars-none; }

      // IE 10+
      & { -ms-overflow-style: none; }

      // Firefox
      ul {
        display: flex;
        justify-content: space-between;
        padding: 1em;
        flex-wrap: wrap;

        li {
          border-radius: 4px;
          font-size: 1.8em;
          background: $color-highlight;
          margin: .3em;
          width: $icon-width;
          height: $icon-width;
          line-height: $icon-width;

          &.selected {
            color: white;
          }
        }

        i {
          width: $icon-width;
          height: $icon-width;
          margin: .3em;
          font-size: 1.8em;
        }
      }
    }
  }

</style>