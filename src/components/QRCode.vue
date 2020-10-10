<template>
  <div class="qrcode-wrapper" @click="hidden" v-show="toggle">
    <div class="qrcode" @click.stop="">
      <img src="../../public/img/qrCode.png" alt="">
      <span> 为保证最好的用户体验
        <br>建议使用手机扫描二维码使用 </span>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class QRCode extends Vue {
    @Prop({required: true}) toggle!: boolean;

    hidden() {
      this.$emit('update:toggle', !this.toggle);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .qrcode-wrapper {
    width: 100vw;
    height: 100vh;
    z-index: 6;
    font-size: .8em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .6);

    .qrcode {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: $color-f;
      padding-bottom: 1em;
    }
  }
</style>