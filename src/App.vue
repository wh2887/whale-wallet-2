<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
      <Nav/>
    </div>
  </a-config-provider>
</template>

<script>
  import Nav from '@/components/Nav'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import {DatePicker,ConfigProvider} from 'ant-design-vue'
  import Vue from 'vue'
  import moment from 'moment'
  import 'moment/locale/zh-cn'

  moment.locale('zh-cn')
  Vue.use(DatePicker)
  Vue.component( ConfigProvider.name, ConfigProvider);

  export default {
    components: {Nav},
    data() {
      return {
        locale: zhCN
      }
    }

  }
</script>

<style lang="scss">
  @import "~@/assets/styles/helper.scss";
  @import "assets/styles/reset.scss";

  #app {
    max-width: 500px;
    margin: 0 auto;
    font-family: $font-hei;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-nearblack;
    display: flex;
    flex-direction: column;
    display: -webkit-flex;
    height: 100%;

    > :first-child {
      flex-grow: 1;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      height: auto;
      &::-webkit-scrollbar { width: 0 !important }   // chrome 和 Safari
      &{ overflow: -moz-scrollbars-none; }           // IE 10+
      &{ -ms-overflow-style: none; }                 // Firefox
    }

    @media (max-width: 320px) {
      font-size: 14px;
    }
  }

</style>
