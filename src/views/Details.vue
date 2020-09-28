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
          <div class="detailList">
            <ul>
              <li>
                <span>9月12日</span>
                <span>支: 156.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>9月12日</span>
                <span>支: 156.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
            </ul>
            <ul>
              <li>
                <span>9月12日</span>
                <span>支: 156.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
              <li class="daily-record">
                <div class="li-left">
                  <Icon name="shuiguo"/>
                  <span>水果</span>
                </div>
                <span class="li-right">-22.00</span>
              </li>
            </ul>
          </div>
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
  import Icon from '@/components/Icon.vue';

  @Component({
    components: {Icon, SegmentControls}
  })
  export default class Details extends Vue {

    beforeCreate() {
      this.$store.commit('fetchRecords');
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

          .detailList {
            position: absolute;
            top: 0;
            width: 96%;
            height: 70vh;
            overflow-y: auto;

            &::-webkit-scrollbar { width: 0 !important }

            & { overflow: -moz-scrollbars-none; }

            & { -ms-overflow-style: none; }

            background: $color-f;
            box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.2);
            border: 1px solid #ddd;

            ul {
              position: relative;
              margin: .5em;
              border-top: 1px dashed #dddddd;
              display: flex;
              flex-direction: column;
              align-items: center;

              > :first-child {
                width: 95%;
                color: #888888;
                font-size: .8em;
                border: none;
                padding-bottom: 1em;
              }

              li {
                width: 90%;
                border-bottom: 1px solid #dddddd;
                padding-bottom: .5em;
                padding-top: .5em;
                display: flex;
                justify-content: space-between;
                align-items: center;

                > .li-left {
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  > :first-child {
                    font-size: 1.5em;
                    background: $color-highlight;
                    border-radius: 50%;
                  }

                  > :last-child {
                    padding-left: .4em;
                  }
                }

                > .li-right {

                }
              }

            }
          }
        }
      }
    }

    footer {
      height: 79.5%;
    }
  }

</style>