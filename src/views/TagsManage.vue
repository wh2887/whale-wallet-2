<template>
  <div class="tags-manage-wrapper">
    <header>
      <Icon name="back" @click.native="$router.go(-1)"/>
      <span>分类管理</span>
      <Icon name="add" @click.native="addTag"/>
    </header>

    <div class="top">
      <SegmentControls :value.sync="$route.params.recordType" @updateSegmentType="onTypeChanged"/>
    </div>

    <main>
      <ol>
        <li @click="jumpToUpdateTag(icon)" v-for="icon in currentTagList" :key="icon.id">
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

  @Component({
    components: {SegmentControls, Icon}
  })
  export default class TagsManage extends Vue {
    segmentType!: string;

    created() {
      this.$store.commit('initTags');
      this.$store.commit('filtrateTagList', this.$route.params.recordType);
    }

    get currentTagList() {
      return this.$store.state.currentTagList;
    }

    onTypeChanged(type: string) {
      this.segmentType = type;
      this.$store.commit('filtrateTagList', this.segmentType);
    }

    jumpToUpdateTag(icon: fuck) {
      const tagId = icon.id;
      const recordType = this.$route.params.recordType;
      // 修改 Tag
      // 需要的信息 修改的当前的 Tag
      this.$store.commit('findTag', {id: tagId, recordType: recordType});
      const tagItem = this.$store.state.currentTag;

      this.$router.push({path: `${this.$route.params.recordType}/` + 'tagedit' + `/${tagId}`});
    }

    addTag() {
      this.$router.push({path: `${this.$route.params.recordType}/` + 'tagedit'});
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
      width: 100vw; background: $color-highlight-thin;
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