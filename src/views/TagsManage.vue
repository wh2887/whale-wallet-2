<template>
  <div class="tags-manage-wrapper">
    <div class="top">
      <div class="top-buttons">
        <Icon name="back" @click.native="$router.go(-1)"/>
        <Icon name="add" @click.native="addTag"/>
      </div>
      <h3>分类管理</h3>
      <SegmentControls :value.sync="$route.params.recordType"/>
    </div>
    <main>
      <ol>
        <li @click="addTag">
          <div class="li-left">
            <Icon name="shuiguo"/>
            <span>水果</span>
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
    created() {
      this.$store.commit('initTags');
      console.log(this.tagList);
    }

    get tagList() {
      return this.$store.state.tagList;
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

    .top {
      width: 100vw; background: $color-highlight-thin;
      padding-top: .5em;
      height: 20vh;

      .top-buttons {
        padding: 0 .5em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.5em;
      }
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