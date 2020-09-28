<template>
  <div class="detailList">
    <ul v-for="(group,index) in dataSource" :key="index">
      <li>
        <span>{{group.title}}</span>
        <span>支: 156.00</span>
      </li>
      <li class="daily-record" v-for="item in group.items" :key="item.id">
        <div class="li-left">
          <Icon name="shuiguo"/>
          <span>水果</span>
        </div>
        <span class="li-right">{{item.amount}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon},
  })
  export default class DetailList extends Vue {
    @Prop() dataSource!: {}[];

    created(){
      console.log(this.dataSource);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .detailList {
    position: absolute;
    top: 0;
    width: 96%;
    height: 70vh;
    overflow-y: auto;

    &::-webkit-scrollbar { width: 0 !important }

    & { overflow: -moz-scrollbars-none; }

    & { -ms-overflow-style: none; }

    background: $color-f;
    box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
    border: 1px solid #ddd;

    ul {
      position: relative;
      margin: .5em;
      border-top: 1px dashed #dddddd;
      display: flex;
      flex-direction: column;
      align-items: center;

      > :first-child {
        width: 95%;
        color: #888888;
        font-size: .8em;
        border: none;
        padding-bottom: 1em;
      }

      li {
        width: 90%;
        border-bottom: 1px solid #dddddd;
        padding-bottom: .5em;
        padding-top: .5em;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > .li-left {
          display: flex;
          justify-content: center;
          align-items: center;

          > :first-child {
            font-size: 1.5em;
            background: $color-highlight;
            border-radius: 50%;
          }

          > :last-child {
            padding-left: .4em;
          }
        }

        > .li-right {

        }
      }

    }
  }
</style>