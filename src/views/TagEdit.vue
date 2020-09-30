<template>
  <div class="tag-edit-wrapper">
    <header>
      <Icon name="back" @click.native="$router.go(-1)"/>
      <span>编辑分类</span>
      <span @click="saveTag">保存</span>
    </header>
    <main>
      <div class="input-wrapper">
        <Icon :name="iconName"/>
        <label>
          <input type="text" v-model="iconText" placeholder="输入字符不得超过 3 个">
        </label>
      </div>
    </main>
    <footer>
      <ol>
        <li @click="selectedIcon(icon)" v-for="icon in currentTagDB" :key="icon.id"
            :class="{'selected':tagId === icon.id}"
        >
          <Icon :name="icon.iconName"/>
        </li>
      </ol>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class TagEdit extends Vue {
    tag!: myTag;
    routerId!: number;
    routerRecordType = '';
    iconName = '';
    tagId = 0;
    iconText = '';

    @Watch('iconName')
    onIconNameChanged() {
      console.log(this.tag);
      console.log('x');
    }

    created() {
      this.routerId = parseInt(this.$route.params.id);
      this.routerRecordType = this.$route.params.recordType;
      this.$store.commit('initTags');
      this.$store.commit('selectTagsDataBase', this.routerRecordType);
      if (this.routerId !== 999) {
        // 这边要寻找的目标是 在 tagList 中的，而不是 currentTagDB中的 list
        // 那么有个问题 ID 在两个表之间可能重复， 怎么办？
        // 我现在拿到的 id 不能在 taglist 中得到正确的答案！
        // 想要解决这个问题需要做什么？==>将两个数据库的表合并为一个表，然后根据图标的 type 不同而显示相应的图标！
        this.$store.commit('findTag', {id: this.routerId, recordType: this.routerRecordType});
        this.tag = this.$store.state.currentTag;
        this.iconName = this.tag.iconName;
        this.iconText = this.tag.text;
      } else {
        console.log('进入到了新增页面！');
      }
    }

    updated() {
      console.log('更新的图标ID：', this.tagId);
      console.log('更新的图标类型：', this.routerRecordType);
      console.log('更新的图标：', this.iconName);
      console.log('更新的图表描述', this.iconText);
    }

    get currentTagDB() {
      return this.$store.state.currentTagDB;
    }

    saveTag() {
      if (this.routerId !== 999) {
        console.log('我是需要更新函数的地方！');
        // 更新Tag 信息 ： 1. 图标 iconName 2. 文本 text  ==> 同样需要得到 当前的那个 tag  (需要双向绑定的数据：实时更新的！)
        const tag2: myTag = {
          id: this.tagId,
          type: this.routerRecordType,
          iconName: this.iconName,
          text: this.iconText
        };
        this.$store.commit('updateTag', tag2);
      } else {
        this.$store.commit('findTag', {id: this.tagId, recordType: this.routerRecordType});
        const tagItem = this.$store.state.currentTag;
        tagItem.text = this.iconText;
        this.$store.commit('createTag', tagItem);
      }
      this.$router.back();
    }

    selectedIcon(value: myTag) {
      this.iconName = value.iconName;
      this.tagId = value.id;
    }


  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tag-edit-wrapper {
    background: $color-highlight;

    header {
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

    main {
      background: $color-f4;
      height: 3em;
      display: flex;
      align-items: center;

      .input-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;

        > :first-child {
          color: $color-highlight;
          font-size: 2em;
          margin-left: 1em;
        }

        label {
          display: flex;
          margin-left: .5em;

          input {
            background: inherit;
            border: none;
          }
        }
      }
    }

    footer {
      ol {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 1em;

        li {
          padding: 0 .5em;
          font-size: 2.5em;

          &.selected {
            background: $color-f4;
            border-radius: $bg-radius;
          }
        }
      }

    }
  }
</style>