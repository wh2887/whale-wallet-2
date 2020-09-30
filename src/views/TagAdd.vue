<template>
  <div class="tag-add-wrapper">
    <header>
      <Icon name="back" @click.native="$router.go(-1)"/>
      <span>编辑分类</span>
      <span @click="createOneTag">保存</span>
    </header>
    <main>
      <div class="input-wrapper">
        <Icon :name="iconName"/>
        <label>
          <input type="text" v-model="text" placeholder="输入字符不得超过 3 个">
        </label>
      </div>
    </main>
    <footer>
      <ol>
        <li @click="selectedIcon(icon)" v-for="icon in totalTagList" :key="icon.id"
            :class="{'selected': tagId === icon.id}"
        >
          <Icon :name="icon.iconName"/>
        </li>
      </ol>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import tagListDB from '@/dataBase/tagListDB';
  import defaultPayTag from '@/constants/defaultPayTag';
  import defaultIncomeTag from '@/constants/defaultIncomeTag';

  @Component({
    components: {Icon}
  })
  export default class TagAdd extends Vue {
    type!: string;
    // TODO
    // 这两个默认值有点问题？
    tagId = 0;
    iconName = '';
    text = '';

    totalTagList: myTag[] = [];

    getCurrentTagList(type: string) {
      if (type === '-') {
        this.totalTagList = tagListDB.filter(item => item.type === '-');
        this.iconName = defaultPayTag.iconName;
        this.tagId = defaultPayTag.id;
      } else if (type === '+') {
        this.totalTagList = tagListDB.filter(item => item.type === '+');
        this.iconName = defaultIncomeTag.iconName;
        this.tagId = defaultIncomeTag.id;
      }
      return;
    }

    selectedIcon(tag: myTag) {
      this.tagId = tag.id;
      this.iconName = tag.iconName;
    }

    created() {
      // this.$store.commit('initTag');
      this.type = this.$route.params.type;
      this.getCurrentTagList(this.type);
    }

    updated() {
      console.log('ID:', this.tagId);
      console.log(this.text);
    }

    createOneTag() {
      const {type, iconName, text} = this;
      const tag: myTag = {id: this.tagId, type, iconName, text};
      this.$store.commit('createTag', tag);
      console.log('保存');
    }


  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .tag-add-wrapper {
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
