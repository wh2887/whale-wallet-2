<template>
  <div class="statistic-wrapper">
    <div class="statistic-top">
      <SegmentControls :value="recordType" :statistic-type.sync="recordType"/>
    </div>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <div class="statistic-bottom">
      <h3>
        近 30 天<span v-if="recordType==='-'">支出</span><span v-else>收入</span>占比前五
      </h3>
      <Chart class="chart2" :options="chartOptions2"/>
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
            key: dateString,
            value: found ? found.payTotal : 0,
            items: found ? found.items : []
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
            key: dateString,
            value: found ? found.incomeTotal : 0,
            items: found ? found.items : []
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
      } else if (type === '+') {
        return incomeArray;
      } else {
        return;
      }
    }


    get leaderboard() {
      const items = this.getKeyValueList(this.recordType)!.map(item => item.items);
      let total = 0;
      const array = [];
      const newArray: { variety: string; amount: number }[] = [];
      for (let i = 0; i <= 29; i++) {
        if (items[i].length !== 0) {
          for (let j = 0; j < items[i].length; j++) {
            if (items[i][j].type === this.recordType) {
              total += items[i][j].amount;
              array.push({
                variety: items[i][j].tags.text,
                amount: items[i][j].amount
              });
            }
          }
        }
      }
      array.forEach(el => {
        const result = newArray.findIndex(ol => {return el.variety === ol.variety;});
        if (result !== -1) {
          newArray[result].amount = newArray[result].amount + el.amount;
        } else {
          newArray.push(el);
        }
      });
      newArray.sort((a, b) => {
        if (b.amount > a.amount) {
          return 1;
        } else if (a.amount === b.amount) {
          return 0;
        } else {
          return -1;
        }
      });
      return newArray.slice(0, 5);
    }

    @Watch('recordType')
    onTypeChanged(value: string) {
      this.recordType = value;
    }


    get chartOptions() {
      const keys = this.getKeyValueList(this.recordType)?.map(item => item.key);
      const values = this.getKeyValueList(this.recordType)?.map(item => item.value);
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

    get chartOptions2() {
      const keys = this.leaderboard.map(item => item.variety);
      const values = this.leaderboard.map(item => item.amount);
      const array = [];
      for (let i = 0; i < keys.length; i++) {
        array.push({value: values[i], name: keys[i]});
      }
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: keys
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: array
          }
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

      > h3{
        padding-top: .5em;
        span{
          display: inline-block;
        }
      }
    }

  }

</style>