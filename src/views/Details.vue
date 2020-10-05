<template>
  <div class="details-wrapper">
    <header>
      <div class="title">
        <div class="logo">
          <Icon name="whale"/>
        </div>
        <span>鲸鱼记账</span>
      </div>
      <div class="details">
        <div class="left">
          <a-month-picker v-model="time" placeholder="Select Time" @change="onChange">
            <div>
              <span class="year">{{year}}年</span>
              <span class="month">
              {{month}}月
              <Icon name="arrow-down"/>
            </span>
            </div>
          </a-month-picker>
        </div>

        <div class="right">
          <div class="income">
            <span>收入</span>
            <span>{{monthIncome.toFixed(2)}}</span>
          </div>
          <div class="pay">
            <span>支出</span>
            <span>{{monthPay.toFixed(2)}}</span>
          </div>
        </div>
      </div>
      <div class="receipt-wrapper">
        <div class="receipt">
          <DetailList :data-source="selectedMonthList"/>
        </div>
      </div>
    </header>
    <footer>

    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import DetailList from '@/components/DetailList.vue';
  import Icon from '@/components/Icon.vue';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  import 'ant-design-vue/dist/antd.css';
  import {Moment} from 'moment';
  import { DatePicker } from 'ant-design-vue';
  Vue.use(DatePicker)

  @Component({
    components: {DetailList, SegmentControls, Icon}
  })
  export default class Details extends Vue {
    monthIncome = 0;
    monthPay = 0;
    time = '';
    year = dayjs(new Date()).format('YYYY');
    month = dayjs(new Date()).format('MM');
    selectedMonthList!: Result;

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    created() {
      this.monthTotal(this.year, this.month);
    }

    @Watch('time')
    onTimeChanged() {
      this.year = dayjs(this.time).format('YYYY');
      this.month = dayjs(this.time).format('MM');
      this.monthTotal(this.year, this.month);
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    onChange(date: Moment | string, dateString: string) {
      this.time = new Date(dateString).toISOString();
    }

    monthTotal(x: string, y: string) {
      this.monthPay = 0;
      this.monthIncome = 0;
      const total = this.groupedList;
      this.selectedMonthList = total.filter(item => dayjs(item.title).format('MM') === y);
      for (let i = 0; i < this.selectedMonthList.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.monthPay += this.selectedMonthList[i].payTotal!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.monthIncome += this.selectedMonthList[i].incomeTotal!;
      }
      return '';
    }

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return []; }
      const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      const result: Result = [
        {
          title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
          payTotal: 0,
          incomeTotal: 0,
          items: [newList[0]]
        }
      ];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.payTotal = group.items.reduce((sum, item) => {
          if (item.type === '-') {
            sum += item.amount;
          }
          return sum;
        }, 0);
        group.incomeTotal = group.items.reduce((sum, item) => {
          if (item.type === '+') {
            sum += item.amount;
          }
          return sum;
        }, 0);
      });
      return result;
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .details-wrapper {
    width: 100%;

    header {
      height: 24.5%;
      background: $color-highlight;

      .title {
        display: flex;
        font-size: 1.5em;
        justify-content: center;
        align-items: center;
        padding-top: 1em;
        padding-bottom: .5em;
        position: relative;

        .logo {
          position: absolute;
          top: 1em;
          left: 1em;
        }
      }

      .details {
        height: 2.5em;
        display: flex;

        .left {
          width: 30%;
          height: 100%;
          font-size: .8em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;

          &:after {
            content: "";
            position: absolute;
            right: 0;
            display: block;
            border-right: 2px solid black;
            height: 60%;
          }

          .year {
            font-size: .5em;
          }

          .month {
            font-size: 1.2em;
            font-weight: bold;
          }
        }

        .right {
          width: 70%;
          height: 100%;
          display: flex;
          justify-content: start;
          align-items: center;
          font-size: .8em;

          .income {
            padding-left: 1.5em;

            > :first-child {
              font-size: .8em;
              text-align: left;
            }

            > :last-child {
              font-size: 1.2em;
              font-weight: bold;
            }
          }

          .pay {
            padding-left: 4em;

            > :first-child {
              font-size: .8em;
              text-align: left;
            }

            > :last-child {
              font-size: 1.2em;
              font-weight: bold;
            }
          }
        }
      }

      .receipt-wrapper {
        display: flex;
        justify-content: center;
        padding-top: .5em;

        .receipt {
          width: 90%;
          border: 6px solid darken($color-highlight, 25%);
          border-radius: 4px;
          margin-top: 10px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }

    footer {
      height: 79.5%;
    }
  }

</style>