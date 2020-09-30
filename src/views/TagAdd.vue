<template>
  <div class="tag-add-wrapper">
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
        <li @click="selectedIcon(icon)" v-for="icon in totalTagList" :key="icon.id"
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
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  import tagListDB from '@/dataBase/tagListDB';

  @Component({
    components: {Icon}
  })
  export default class TagAdd extends Vue {
    type!: string;
    totalTagList: myTag[] = [];

    getCurrentTagList(type: string) {
      if (type === '-') {
        this.totalTagList = tagListDB.filter(item => item.type === '-');
      } else {
        this.totalTagList = tagListDB.filter(item => item.type === '+');
      }
      return;
    }
    created() {
      // 页面出现的时候就需要初始化到 taglist  // 这个 tagList 应该是能提供的所有图标（按 type 输出）！
      // 那不就是 tagListDB 吗？
      // this.$store.commit('initTag');
      this.type = this.$route.params.type;
      this.getCurrentTagList(this.type);
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
