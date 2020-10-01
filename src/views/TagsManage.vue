<template>
  <div class="tags-manage-wrapper">
    <header>
      <Icon name="back" @click.native="$router.go(-1)"/>
      <span>分类管理</span>
      <Icon name="add" @click.native="addTag"/>
    </header>
    <div class="top">
      <SegmentControls :value.sync="manageType" @update:manageType="onTypeChanged"/>
    </div>
    <main>
      <ol>
        <li @click="jumpToUpdateTag(icon)" v-for="icon in currentTagList()" :key="icon.id">
          <div class="li-left">
            <Icon :name="icon.iconName"/>
            <span>{{icon.text}}</span>
          </div>
          <Icon name="forward"/>
        </li>
      </ol>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Icon from '@/components/Icon.vue';
  import defaultRecordList from '@/constants/defaultRecordList';

  @Component({
    components: {SegmentControls, Icon}
  })
  export default class TagsManage extends Vue {
    manageType = defaultRecordList.type;


    created() {
      this.$store.commit('initTag');
    }

    get tagList() {
      return this.$store.state.tagList as myTag[];
    }

    currentTagList() {
      return this.tagList.filter(item => item.type === this.manageType);
    }

    onTypeChanged(value: string) {
      this.manageType = value;
    }

    jumpToUpdateTag(icon: myTag) {
      const tagId = icon.id;
      // 修改 Tag
      // 需要的信息 修改的当前的 Tag
      this.$router.push({path: `/tagsmanage/tagedit/${tagId}`});
    }

    addTag() {
      // TODO
      // 跳转之前需要的信息 ： 仅仅是 ！！ segmentControls 组件的 type响应。
      this.$router.push({path: `/tagsmanage/${this.manageType}/tagAdd`});
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tags-manage-wrapper {
    background: $color-highlight;
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .2em .5em;
      background: $color-highlight-thin;

      > :nth-child(2) {
        font-size: 1.2em;
        font-weight: bold;
      }
    }

    .top {
      width: 100%; background: $color-highlight-thin;
      padding-top: .5em;
    }

    main {
      margin-top: 1em;
      height: 60vh;
      width: $width;
      overflow-y: auto;

      ol {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #dddddd;
          padding-top: .5em;
          padding-bottom: .5em;

          > .li-left {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
</style>
