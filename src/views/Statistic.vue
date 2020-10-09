<template>
  <div class="statistic-wrapper">
    <div class="statistic-top">
      <SegmentControls :value="recordType" :statistic-type.sync="recordType"/>
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <div class="statistic-bottom">
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import SegmentControls from '@/components/SegmentControls.vue';
  import Chart from '@/components/Chart.vue';
  import dayjs from 'dayjs';
  import _ from 'lodash';
  import clone from '@/lib/clone';
  import defaultRecordList from '@/constants/defaultRecordList';

  @Component({
    components: {Chart, SegmentControls}
  })
  export default class Statistic extends Vue {
    recordType = defaultRecordList.type;

    created() {
      this.$store.commit('fetchRecords');
    }

    mounted() {
      const div = (this.$refs.chartWrapper as HTMLDivElement);
      div.scrollLeft = div.scrollWidth;
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return []; }
      const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      const result: Result[] = [
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

    getKeyValueList(type: string) {
      const today = new Date();
      const payArray = [];
      const incomeArray = [];
      for (let i = 0; i <= 29; i++) {
        const dateString = dayjs(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
        const found = _.find(this.groupedList, {
          title: dateString
        });
        if (type === '-') {
          payArray.push({
            key: dateString, value: found ? found.payTotal : 0
          });
          payArray.sort((a, b) => {
            if (a.key > b.key) {
              return 1;
            } else if (a.key === b.key) {
              return 0;
            } else {
              return -1;
            }
          });
        } else {
          incomeArray.push({
            key: dateString, value: found ? found.incomeTotal : 0
          });
          incomeArray.sort((a, b) => {
            if (a.key > b.key) {
              return 1;
            } else if (a.key === b.key) {
              return 0;
            } else {
              return -1;
            }
          });
        }
      }
      if (type === '-') {
        return payArray;
      } else {
        return incomeArray;
      }
    }

    @Watch('recordType')
    onTypeChanged(value: string) {
      this.recordType = value;
    }


    get chartOptions() {
      const keys = this.getKeyValueList(this.recordType).map(item => item.key);
      const values = this.getKeyValueList(this.recordType).map(item => item.value);
      return {
        tooltip: {
          show: true,
        },
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {
            alignWithLabel: true
          },
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            name: '月',
            data: values,
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {borderWidth: 1, color: '#68B0AB', borderColor: '#68B0AB'},
          },
        ]
      };
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .statistic-wrapper {
    @extend %displayAuto;

    .echarts {
      max-width: 100%;
      height: $chart-height
    }

    .statistic-top {
      width: $width; margin-top: $top-margin/2;
      background: $color-highlight-thin; border-radius: $bg-radius;
      padding: .8em 1em;
    }

    .chart-wrapper {
      width: $width; height: $chart-height; border-radius: $bg-radius; margin-top: $top-margin/2;
      background: $color-f;
      overflow: auto;

      .chart {
        width: 430%;
      }
    }

    .statistic-bottom {
      flex: 1;
      background: $color-f;
      width: $width;
      margin-top: $top-margin/2;
      margin-bottom: $top-margin/4;
      border-radius: $bg-radius;
    }

  }

</style>