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
      <button @click="clearOne" class="delete">
        <Icon name="tuige"/>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="add">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="done" class="done">完成</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button @click="clear">清零</button>
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
    result = 0;
    arr = ['0'];

    @Watch('output')
    onOutputChanged() {
      this.$emit('update:value', this.result);
    }

    inputContent(event: MouseEvent) {
      const button = event.target as HTMLButtonElement;
      const input = button.textContent as string;
      if (this.output.length >= 16) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
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
        if (input === '+') { return; }
      }
      if (this.output[this.output.length - 1] === ('.')) {
        if (input === '.') { return; }
      }
      for (let i = 0; i < Array.from(this.output).length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let addFlag = 0;
        if (this.output[i] === '+') {
          addFlag = i;  // 假如第一次 + 下标是 3
        }
        if (this.output[i] === '.') {
          if (input === '.' && this.output.indexOf('+') < 0) {
            return;
          }
        }
      }

      this.output += input;
    }

    add() {
      // 点击 + ，就将 output 的值增加到数组中，之前的不能被覆盖
      this.arr.push(this.output);
      this.output = '0';
    }

    done() {
      this.arr.push(this.output);
      for (let i = 0; i < this.arr.length; i++) {
        this.result += parseFloat(this.arr[i]);
      }
      this.$emit('submit', this.result);
      this.output = '0';
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
    flex-wrap: nowrap;
    border-radius: 12px;
    margin: .5em;

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
    @extend %clearFix;

    > button {
      width: 25%;
      height: 25%;
      border: 1px solid $color-highlight;
      background: $color-f;
      font-size: 1em;
      line-height: 1em;
      user-select: none;
      text-align: center;
      font-weight: bold;
      &:first-child{
        border-top-left-radius: 8px;
      }
      &:nth-child(4){
        border-top-right-radius: 8px;
      }
      &:nth-child(13){
        border-bottom-left-radius: 8px;
      }
      &:nth-child(12){
        border-bottom-right-radius: 8px;
      }

      &.done {
        height: 50%;
        float: right;
        background: #ffaa71;

        &:active {
          background: white;
          color: black;
        }
      }

      &:active {
        color: $color-f;
        background: $color-highlight;
      }

    }
  }

</style>