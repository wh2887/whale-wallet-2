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
      {id: 1, type: '-', iconName: 'shuiguo',text:'水果'},
      {id: 2, type: '-', iconName: 'shuidianmei',text:'水果'},
      {id: 3, type: '-', iconName: 'xinyongkahuankuan',text:'水果'},
      {id: 4, type: '-', iconName: 'fangzu',text:'水果'},
      {id: 5, type: '-', iconName: 'lifa',text:'水果'},
      {id: 6, type: '-', iconName: 'huafei',text:'水果'},
      {id: 7, type: '-', iconName: 'fushi',text:'水果'},
      {id: 8, type: '-', iconName: 'canyinye',text:'水果'},
      {id: 9, type: '-', iconName: 'yule',text:'水果'},
      {id: 10, type: '-', iconName: 'jiaotong',text:'水果'},
      {id: 11, type: '-', iconName: 'youxi',text:'水果'}
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