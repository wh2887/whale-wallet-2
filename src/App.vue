<template>
  <div id="app">
    <router-view/>
    <Nav/>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/styles/helper.scss";
  @import "assets/styles/reset.scss";

  #app {
    max-width: 500px;
    height: 100vh;
    margin: 0 auto;
    font-family: $font-hei;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $color-nearblack;
    display: flex;
    flex-direction: column;

    > :first-child {
      flex-grow: 1;
    }
  }

</style>
<script>
  import Nav from '@/components/Nav'

  export default {
    components: {Nav}
  }
</script>