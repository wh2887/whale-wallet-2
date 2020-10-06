<template>
  <div class="money-wrapper">
    <div class="top">
      <a-date-picker v-model="time" placeholder="Select Time" @change="onChange">
        <h3>
          {{ time ? time : beautify}}
          <Icon name="calendar"/>
        </h3>
      </a-date-picker>
      <SegmentControls :value.sync="record.type"/>
    </div>
    <div class="middle">
      <Tags :value.sync="record.tags" :record-type="record.type"/>
    </div>
    <div class="bottom">
      <NumberPad :value.sync="record.amount" :icon="record.tags.iconName" @submit="saveRecord"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Tags from '@/components/Tags.vue';
  import NumberPad from '@/components/NumberPad.vue';
  import defaultRecordList from '@/constants/defaultRecordList';
  import {DatePicker} from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  import {Moment} from 'moment';
  import Icon from '@/components/Icon.vue';
  import dayjs from 'dayjs';

  Vue.component(DatePicker.name, DatePicker);

  @Component({
    components: {Icon, NumberPad, Tags, SegmentControls}
  })
  export default class Money extends Vue {
    record = defaultRecordList;
    time = '';
    today = new Date().toISOString();

    get recordList() {
      return this.$store.state.recordList as RecordItem[];
    }

    created() {
      this.$store.commit('fetchRecords');
      this.record.createdAt = this.today;
    }

    destroyed() {
      this.record.amount = 0;
    }

    get beautify() {
      return dayjs(this.today).format('YYYY-MM-DD');
    }

    onChange(date: Moment | string, dateString: string) {
      this.time = new Date(dateString).toISOString();
      this.record.createdAt = this.time;
      this.time = dateString;
    }

    saveRecord(value: number) {
      this.record.amount = value;
      try {
        this.$store.commit('createRecord', this.record);
      } catch (error) {
        if (error.message === 'icon empty') {
          window.alert('分类图标不能为空！');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .money-wrapper {
    @extend %displayAuto;

    .top {
      width: $width; margin-top: $top-margin/2; background: $color-highlight-thin; padding: .8em 2em; border-radius: $bg-radius;
    }

    .middle {
      background: $color-f;
      width: $width; height: 18vh; border-radius: $bg-radius; margin-top: $top-margin/2;
      overflow-y: auto;
      &::-webkit-scrollbar { width: 0 !important }
      & { overflow: -moz-scrollbars-none; }
      & { -ms-overflow-style: none; }
    }

    .bottom {
      flex: 1;
      background: $color-f;
      width: $width;
      margin-top: $top-margin/2;
      margin-bottom: $top-margin/4;
      border-radius: $bg-radius;
    }
  }

</style>