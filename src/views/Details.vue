<template>
  <div class="details-wrapper">
    <header>
      <div class="top">
        8月结余
      </div>
      <SegmentControls value="-"/>
    </header>
    <main>

      <div class="detailList">
        <span class="title">今天 | 支出 ： ￥ 300.00</span>
        <ol>
          <li>
            <div class="left">
              <Icon name="shuiguo"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
          <li>
            <div class="left">
              <Icon name="huafei"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
          <li>
            <div class="left">
              <Icon name="fanyule"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
        </ol>
      </div>

      <div class="detailList">
        <span class="title">昨天 | 支出 ： ￥ 300.00</span>
        <ol>
          <li>
            <div class="left">
              <Icon name="shuiguo"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
          <li>2</li>
          <li>3</li>
        </ol>
      </div>

      <div class="detailList">
        <span class="title">前天 | 支出 ： ￥ 300.00</span>
        <ol>
          <li>
            <div class="left">
              <Icon name="shuiguo"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
          <li>2</li>
          <li>3</li>
        </ol>
      </div>

      <div class="detailList">
        <span class="title">8月10日 | 支出 ： ￥ 300.00</span>
        <ol>
          <li>
            <div class="left">
              <Icon name="shuiguo"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
          <li>2</li>
          <li>3</li>
        </ol>
      </div>

      <div class="detailList">
        <span class="title">2019年11月22日 | 支出 ： ￥ 300.00</span>
        <ol>
          <li>
            <div class="left">
              <Icon name="shuiguo"/>
            </div>
            <div class="liContent">
              <div class="liContent-left">
                <span>水果</span>
                <span>备注：无备注</span>
              </div>
              <div class="liContent-right">
                支：￥300.00
              </div>
            </div>
          </li>
          <li>2</li>
          <li>3</li>
        </ol>
      </div>

    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon, SegmentControls}
  })
  export default class Details extends Vue {

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .details-wrapper {
    @extend %displayAuto;

     header {
      display: flex; justify-content: center; flex-direction: column; width: $width; background: $color-f4;
      margin-top: $top-margin; border-radius: .5em; background: $color-highlight-thin;
      > .top { border-radius: .5em .5em 0 0; padding: .5em 0; background: #F4F4F4; }
    }
    main { width: 94%; margin-top: $top-margin/2; border-radius: .5em .5em 0 0; overflow-y: scroll;
      // 隐藏滚动条
      &::-webkit-scrollbar { width: 0 !important }   // chrome 和 Safari
      &{ overflow: -moz-scrollbars-none; }           // IE 10+
      &{ -ms-overflow-style: none; }                 // Firefox

      > .detailList {
        background: $color-f;
        border-radius: .5em;
        &:not(:first-child){
          margin-top: $top-margin/2;
        }
        > .title { padding: 12px 0; }
        > ol {
          > li {
            display: flex; justify-content: space-between; align-items: center; padding: .2em 1.2em;
            > .left { border-radius: 50%; font-size: 1.8em; background: $color-highlight; }
            > .liContent { display: flex; flex-grow: 1; align-items: center; justify-content: space-between; font-size: .8em;
              > .liContent-left {
                &:first-child {
                  padding: 0 1.2em;
                  > span {
                    &:not(:last-child) { display: flex; justify-content: flex-start; }
                  }
                  &:first-child { display: inline-block; }
                }
              }
              > .liContent-right { font-size: 1.2em; }
            }
          }
        }
      }
    }
  }

</style>