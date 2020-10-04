<template>
  <div class="tag-edit-wrapper">
    <header>
      <Icon name="back" @click.native="$router.go(-1)"/>
      <span>编辑分类</span>
      <span @click="updateOneTag">保存</span>
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
        <li @click="selectedIcon(icon)" v-for="(icon,index) in currentTagList()" :key="index"
            :class="{'selected':iconName === icon.iconName}"
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
  import clone from '@/lib/clone';

  @Component({
    components: {Icon}
  })
  export default class TagEdit extends Vue {
    tag!: myTag;
    iconName = '';
    id = 0;
    text = '';
    _iconName = '';
    _text = '';
    _id = 0;

    created() {
      this.currentTagList();
      this.id = this.tag.id;
      this.iconName = this.tag.iconName;
      this.text = this.tag.text;
      this._id = clone(this.id);
      this._iconName = clone(this.iconName);
      this._text = clone(this.text);
    }

    get tagList() {
      return this.$store.state.tagList as myTag[];
    }

    currentTagList() {
      const currentTag = this.tagList.filter(item => item.id.toString() === this.$route.params.tagid)[0];
      this.tag = currentTag;
      return tagListDB.filter(item => item.type === currentTag.type);
    }

    updateOneTag() {
      try {
        this.$store.commit('updateTag', {
          id: this.id,
          iconName: this.iconName,
          text: this.text,
          clonedTag: {id: this._id, iconName: this._iconName, text: this._text}
        });
        this.$router.back();
      } catch (message) {
        if (message === 'text duplicated') {
          window.alert('标签名称重复，请重新输入名称！');
        } else if (message === 'icon duplicated') {
          window.alert('标签图标重复，请重新选择图标！');
        } else {
          return;
        }
      }
    }

    selectedIcon(value: myTag) {
      this.iconName = value.iconName;
      this.id = value.id;
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