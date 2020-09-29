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
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class TagEdit extends Vue {
    routerId!: number;
    routerRecordType = '';
    iconName = '';
    tagId = 0;
    iconText = '';

    created() {
      this.routerId = parseInt(this.$route.params.id);
      this.routerRecordType = this.$route.params.recordType;
      this.$store.commit('initTags');
      this.$store.commit('selectTagsDataBase', this.routerRecordType);
      console.log(this.routerId);
    }

    get currentTagDB() {
      return this.$store.state.currentTagDB;
    }


    saveTag() {
      this.$store.commit('findTag', {id: this.tagId, recordType: this.routerRecordType});
      const tagItem = this.$store.state.currentTag;
      tagItem.text = this.iconText;
      this.$store.commit('createTag', tagItem);
      this.$router.back();
    }

    selectedIcon(value: fuck) {
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