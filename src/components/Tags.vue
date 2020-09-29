<template>
  <div class="tabs-wrapper">
    <ul>
<!--      <li :class="{'selected':iconName === icon.iconName}" v-for="icon in getCurrentTagList(recordType)" :key="icon.id"-->
<!--          @click="selectIcon(icon)">-->
<!--        <Icon :name="icon.iconName"/>-->
<!--      </li>-->
      <li @click="manageTags" class="manage">
        <Icon :name=" 'add'"/>
      </li>
      <i></i><i></i><i></i><i></i><i></i><i></i>
    </ul>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon},
  })
  export default class Tags extends Vue {
    @Prop() value!: fuck;
    @Prop(String) recordType!: string;
    iconName = this.value.iconName;
    iconTable = [
      {id: 1, type: '-', iconName: 'shuiguo', text: '水果'},
      {id: 2, type: '-', iconName: 'shuidianmei', text: '水电'},
      {id: 3, type: '-', iconName: 'xinyongkahuankuan', text: '信用卡还款'},
      {id: 4, type: '-', iconName: 'fangzu', text: '房租'},
      {id: 5, type: '-', iconName: 'lifa', text: '理发'},
      {id: 6, type: '+', iconName: 'huafei', text: '话费'},
      {id: 7, type: '-', iconName: 'fushi', text: '服饰'},
      {id: 8, type: '-', iconName: 'canyinye', text: '餐饮'},
      {id: 9, type: '-', iconName: 'yule', text: '娱乐'},
      {id: 10, type: '-', iconName: 'jiaotong', text: '交通'},
      {id: 11, type: '-', iconName: 'youxi', text: '水游戏'}
    ];

    manageTags() {
      this.$router.push({path: '/tagsmanage/' + `${this.recordType}`});
    }

    getCurrentTagList(type: string) {
      const incomeTagList: fuck[] = [];
      const payTagList: fuck[] = [];
      this.iconTable.forEach(item => {
        if (item.type === '+') {
          incomeTagList.push(item);
        } else {
          payTagList.push(item);
        }
      });
      if (type === '+') {
        return incomeTagList;
      } else {
        return payTagList;
      }
    }

    selectIcon(icon: fuck) {
      this.iconName = icon.iconName;
      this.$emit('update:value', icon);
      return;
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tabs-wrapper {

    ul {
      display: flex;
      justify-content: space-between;
      padding: 1em;
      flex-wrap: wrap;
      background: $color-f;
      border-radius: $bg-radius;

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

        &.manage {
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