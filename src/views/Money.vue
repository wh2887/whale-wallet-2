<template>
  <div class="money-wrapper">
    <div class="top">
      <a-date-picker v-model="time" placeholder="Select Time" @change="onChange">
        <h3>
          {{ time ? time : today}}
          <Icon name="calendar"/>
        </h3>
      </a-date-picker>
      <SegmentControls :value.sync="record.type"/>
    </div>
    <div class="middle">
      <Tabs :value.sync="record.tags"/>
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
  import Tabs from '@/components/Tabs.vue';
  import NumberPad from '@/components/NumberPad.vue';
  import defaultRecordList from '@/constants/defaultRecordList';
  import {DatePicker} from 'ant-design-vue';
  import 'ant-design-vue/dist/antd.css';
  import {Moment} from 'moment';
  import Icon from '@/components/Icon.vue';
  import dayjs from 'dayjs';

  Vue.component(DatePicker.name, DatePicker);

  @Component({
    components: {Icon, NumberPad, Tabs, SegmentControls}
  })
  export default class Money extends Vue {
    record = defaultRecordList;
    time = '';
    today = dayjs(new Date()).format('YYYY-MM-DD');

    get recordList() {
      return this.$store.state.recordList as RecordItem[];
    }

    created() {
      this.$store.commit('fetchRecords');
      this.record.createdAt = this.today;
    }


    onChange(date: Moment | string, dateString: string) {
      this.time = dateString;
      this.record.createdAt = this.time;
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
      console.log('保存一次记账！');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .money-wrapper {
    @extend %displayAuto;

    .top {
      width: $width; margin-top: $top-margin; background: $color-highlight-thin; padding: 1em 2em; border-radius: $bg-radius;
    }

    .middle {
      width: $width; height: 20vh; border-radius: $bg-radius; margin-top: $top-margin/2; overflow-y: auto;

      &::-webkit-scrollbar { width: 0 !important }

      & { overflow: -moz-scrollbars-none; }

      & { -ms-overflow-style: none; }
    }

    .bottom {
      background: $color-f;
      width: $width;
      height: 50vh;
      margin-top: $top-margin/2;
      border-radius: $bg-radius;
    }
  }

</style>