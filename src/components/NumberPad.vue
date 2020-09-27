<template>
  <div class="numberPad-wrapper">

    <div class="output-wrapper">
      <div class="output-icon">
        <Icon :name="icon"/>
      </div>
      <div class="output">
        {{output}}
      </div>
    </div>
    <div class="numberPad">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button>备注</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="clearOne" class="delete">
        <Icon name="tuige"/>
      </button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button @click="clear">清零</button>
      <button @click="done">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
  import
    Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon}
  })
  export default class NumberPad extends Vue {
    @Prop(Number) value!: number;
    @Prop() icon!: string;
    output = this.value.toString();
    result = 0

    @Watch('output')
    onOutputChanged(){
      this.$emit('update:value',this.result)
  }

    inputContent(event: MouseEvent) {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent as string;
      if (this.output.length >= 16) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          //如果是其中一个就直接替换默认的0位其中的
          this.output = input;
        } else {
          //如果输入点'.' 就直接往后加
          this.output += input;
        }
        return;
      }
      if (this.output === '.') {
        this.output = '0.';
      }

      if (this.output === '+') {
        this.output = '';
      }
      if (this.output[this.output.length - 1] === ('+')) {
        if (input === '+') {
          return;
        }
      }

      if (this.output[this.output.length - 1] === ('.')) {
        if (input === '.') { return; }
      }

      this.output += input;
    }


    done() {
      this.result = eval(this.output);
      this.output = '';
      this.$emit('submit')
    }

    clear() {
      this.output = '';
    }

    clearOne() {
      this.output = this.output.slice(0, -1);
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .numberPad-wrapper {
    display: flex;
    flex-direction: column;
    height: 90%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 12px;
    margin: 1em;

    .output-wrapper {
      width: 100%;
      height: 3em;
      border-radius: 8px;
      border: 1px solid $color-highlight;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .5em 12px;
      margin: $top-margin/2 0;

      > .output-icon {
        font-size: 1.5em;
        color: $color-highlight;
        border: none;
        border-bottom: 2px solid $color-highlight;
        flex-shrink: 0;
      }

      > .output {
        font-family: Consolas monospace;
        overflow: auto;
        flex-grow: 1;
        margin: 0 0 0 .8em;
        border-radius: 4px;
        line-height: 1.5em;
        font-size: 1.5em;
        text-align: right;
      }
    }
  }

  .numberPad {
    border-radius: 12px;
    width: 100%;
    flex: 1;

    > button {
      width: 20%;
      height: 19%;
      margin: .4em;
      border: 1px solid $color-highlight;
      background: $color-f;
      font-size: 1em;
      line-height: 1em;
      border-radius: 8px;
      user-select: none;
      text-align: center;
      font-weight: bold;

      &:active {
        color: $color-f;
        background: $color-highlight;
      }

      &:last-child {
        background: #ffaa71;

        &:active {
          background: white;
          color: black;
        }
      }
    }
  }

</style>