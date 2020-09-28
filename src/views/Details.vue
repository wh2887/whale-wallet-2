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
          <span class="year">2020年</span>
          <span class="month">
            09月
            <Icon name="arrow-down"/>
          </span>
        </div>
        <div class="right">
          <div class="income">
            <span>收入</span>
            <span>50.00</span>
          </div>
          <div class="pay">
            <span>支出</span>
            <span>12.82</span>
          </div>
        </div>
      </div>
      <div class="receipt-wrapper">
        <div class="receipt">
          <DetailList :data-source="groupedList"/>
        </div>
      </div>
    </header>
    <footer>

    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import DetailList from '@/components/DetailList.vue';
  import Icon from '@/components/Icon.vue';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';

  @Component({
    components: {DetailList, SegmentControls, Icon}
  })
  export default class Details extends Vue {
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return []; }
      const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      type Result = { title: string; payTotal?: number; incomeTotal?: number; items: RecordItem[] }[]
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