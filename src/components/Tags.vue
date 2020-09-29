<template>
  <div class="tabs-wrapper">
    <ul>
      <li :class="{'selected':iconName === icon.iconName}" v-for="icon in currentTagList" :key="icon.id"
          @click="selectIcon(icon)">
        <Icon :name="icon.iconName"/>
      </li>
      <li @click="manageTags" class="manage">
        <Icon :name=" 'add'"/>
      </li>
      <i></i><i></i><i></i><i></i><i></i><i></i>
    </ul>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon},
  })
  export default class Tags extends Vue {
    @Prop() value!: fuck;
    @Prop(String) recordType!: string;
    iconName = this.value.iconName;

    @Watch('recordType')
    onRecordTypeChanged() {
      this.$store.commit('filtrateTagList', this.recordType);
    }

    created() {
      this.$store.commit('initTags');
      this.$store.commit('filtrateTagList', this.recordType);
    }

    get currentTagList() {
      return this.$store.state.currentTagList;
    }

    manageTags() {
      this.$router.push({path: '/tagsmanage/' + `${this.recordType}`});
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