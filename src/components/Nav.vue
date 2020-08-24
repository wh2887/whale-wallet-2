<template>

  <nav>
    <router-link to="/statistic" class="item" active-class="selected">
      <Icon name="statistics" class="circleBg"></Icon>
      <span>统计</span>
    </router-link>
    <router-link to="/details" class="item" active-class="selected">
      <Icon name="huankuanmingxi" class="circleBg"></Icon>
      <span>明细</span>
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="tianjia" class="circleBg"></Icon>
      <span>记账</span>
    </router-link>
    <router-link to="/more" class="item" active-class="selected">
      <Icon name="more" class="circleBg"></Icon>
      <span>更多</span>
    </router-link>
  </nav>

</template>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  nav {
    background: $color-f4;
    display: flex;
    justify-content: center;
    align-items: center;

    > .item {
      width: 25%;
      padding: 3px 0;

      > :nth-child(1) {
        font-size: 2em;
      }

      > :nth-child(2) {
        display: block;
        font-size: 0.6em;
      }

      &.selected {
        > :nth-child(1) {
          color: darken($color-highlight, 0.5);

          &.circleBg {
            padding: .1em;
            border-radius: .5em;
            color: $color-f;
            background: $color-highlight;
          }
        }

        > :nth-child(2) {
          color: $color-highlight;
        }
      }

    }
  }
</style>

<script lang="ts">
  import Icon from '@/components/Icon.vue';

  export default {
    name: 'Nav',
    components: {Icon}
  };
</script>
