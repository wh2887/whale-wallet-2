<template>
  <div class="tabs-wrapper">
    <ul>
      <li :class="{'selected':iconName === icon.iconName}" v-for="icon in iconTable" :key="icon.id" @click="selectIcon(icon.iconName)">
        <Icon :name="icon.iconName"/>
      </li>
      <i></i><i></i><i></i><i></i><i></i><i></i>
    </ul>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components:{Icon},

  })
  export default class Tabs extends Vue {
    iconName = 'shuiguo';
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
.tabs-wrapper{
  @extend %displayAuto;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    flex-wrap: wrap;
    background: $color-f;

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
</style>