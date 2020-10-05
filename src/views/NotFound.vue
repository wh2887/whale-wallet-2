<template>
  <div class="not-found-wrapper">
    <br>
    <Icon name="not-found"/>
    <br>
    404
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';
  @Component({
    components: {Icon}
  })
  export default class NotFound extends Vue {

  }
</script>

<style lang="scss" scoped>
.not-found-wrapper{
  font-size: 4em;
}
</style>
