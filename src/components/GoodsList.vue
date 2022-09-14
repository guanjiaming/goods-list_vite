<template>
  <ul class="goods-list" :class="[layoutMode]">
    <li class="goods-item" v-for="(goods, index) in goodsData" :key="index">
      <div class="goods-item__inner" @click="emitToGoodsDetail">
        <div class="goods-item__cover">
          <img :src="goods.mainImage" alt="">
        </div>
        <div class="goods-item__info">
          <div class="goods__info__above">
            <p class="goods-item__title">{{goods.name}}</p>
            <p class="goods-item__description">{{goods.description}}</p>
            <div class="activities">
              <span class="word" v-for="(label, labelIndex) in goods?.promotionLabels" :key="labelIndex">{{ label.labelAbbName }}</span>
            </div>
          </div>
          <div class="goods__info__below">
            <div class="goods-item__price-info">
              <div class="price">
                <strong class="sale-price">
                  <em>¥ <span class="int"> {{ goods.__salePriceInt }}</span>{{ goods.__salePriceFloat }}</em>
                </strong>
                <strong class="reference-price" v-if="goods.__referencePrice">
                  <em>¥{{ goods.__referencePrice }}</em>
                </strong>
                <template v-if="goods.__isShowVIPICon">
                  <br>
                  <img class="vip-icon" src="https://omo.aiyouyi.cn/web-file/wx/app/images/vip9.png" alt="">
                </template>
              </div>
              <div class="vip-price" v-if="goods.__vipPriceInt">
                <strong class="sale-price">
                  <em>¥ <span class="int"> {{goods.__vipPriceInt}}</span>{{goods.__vipPriceFloat}}</em>
                </strong>
                <img class="vip-icon" src="https://omo.aiyouyi.cn/web-file/wx/app/images/vip9.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="btn-cart" v-if="goods.stock > 0" @click="emitShowSkuPopup($event, index)">
          <i class="icon icon-cart">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M363.7248 853.310464m-56.9344 0a56.9344 56.9344 0 1 0 113.8688 0 56.9344 56.9344 0 1 0-113.8688 0Z"></path><path d="M761.9584 853.310464m-56.9344 0a56.9344 56.9344 0 1 0 113.8688 0 56.9344 56.9344 0 1 0-113.8688 0Z"></path><path d="M254.7712 284.785664l42.8032 372.9408c1.6384 14.336 13.824 25.1904 28.2624 25.1904H826.368c13.7216 0 25.6-9.8304 27.9552-23.4496l61.44-341.2992c2.7648-15.4624-7.4752-30.208-22.9376-33.0752-1.6384-0.3072-3.3792-0.4096-5.0176-0.4096l-633.0368 0.1024z m-6.5536-56.9344H887.808c5.12 0 10.1376 0.4096 15.1552 1.3312 46.3872 8.3968 77.2096 52.736 68.8128 99.1232l-61.44 341.2992c-7.2704 40.6528-42.7008 70.2464-83.968 70.2464H325.7344c-43.4176 0-79.872-32.5632-84.7872-75.5712L187.2896 195.902464c-1.6384-14.336-13.824-25.1904-28.2624-25.1904H79.2576c-15.6672 0-28.4672-12.6976-28.4672-28.4672S63.488 113.777664 79.2576 113.777664h79.7696c43.4176 0 79.872 32.5632 84.7872 75.5712 0 0.1024 4.4032 38.5024 4.4032 38.5024z"></path></svg>
          </i>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'GoodsList',
  props: {
    goodsData: {
      type: Array,
      required: true
    },
    layoutMode: {
      type: String,
      required: true
    }
  },
  emits:['showSkuPopup', 'toGoodsDetail'],
  setup(props, context) {

    function emitShowSkuPopup(e: Event, index: number) {
      e.stopPropagation();
      context.emit('showSkuPopup', index)
    }

    function emitToGoodsDetail(e: Event) {
      context.emit('toGoodsDetail', e)
      // 去跳转页面
    }

    return {
      emitShowSkuPopup,
      emitToGoodsDetail
    }
  }
})

</script>

<style lang="scss">

/* 通用部分 */
.goods-list {
  .goods-item__title {
    font-size: 14px;
    word-break: break-all;
    margin-top: 8px;
    color: #333;
    line-height: 1.36;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 38px;
  }

  .goods-item__description {
    font-size: 12px;
    line-height: 1.5;
    height: 18px;
    color: #999;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .activities {
    display: flex;
    height: 20px;
    padding-top: 8px;
    overflow: hidden;
    flex-wrap: wrap;

    .word {
      display: block;
      font-size: 10px;
      line-height: 14px;
      height: 16px;
      padding: 0 4px;
      box-sizing: border-box;
      color: #ff4c29;
      border-radius: 2px;
      border: 1px solid #ff4c29;
      margin-right: 5px;
      margin-bottom: 10px;
      flex-shrink: 0;
    }
  }

  .goods-item__price-info {
    .price {
      line-height: 18px;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      margin-top: 5px;
      padding-right: 10px;
      color: $red-color;

      strong {
        margin-right: 6px;
        font-weight: 500;
        line-height: 1;
      }

      em {
        font-size: 14px;
        font-style: normal;
        display: flex;
        align-items: baseline;
      }

      .int {
        margin-left: 2px;
        font-size: 18px;
      }

      .reference-price em{
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
      }
    }

    .vip-icon {
      width: 44px;
      height: 13px;
      position: relative;
      top: 2px;
    }

    .vip-price {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      color: #333;

      strong {
        margin-right: 6px;
        font-weight: normal;
        line-height: 1;
      }

      .int {
        margin-left: 2px;
        font-size: 16px;
      }

      em {
        display: flex;
        align-items: baseline;
        font-size: 12px;
        font-style: normal;
      }
    }
  }

  .btn-cart {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 2;

    .icon-cart {
      width: 22px;
      height: 22px;
      background-color: teal;
      font-size: 16px;
      border-radius: 50%;
      color: #fff;
    }
  }
}

/* 1行1个样式 */
.goods-list.list {
  //padding: 0 10px;
  padding-bottom: 50px;

  .goods-item {
    padding: 5px 10px;
    position: relative;
    background-color: #fff;
  }

  .goods-item__inner {
    position: relative;
    width: 100%;
    height: 100%;
    padding-left: 130px;
    box-sizing: border-box;
  }

  .goods-item__cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 130px;
    height: 130px;
    overflow: hidden;

    img {
      //margin: auto;
      height: 100%;
      width: 100%;
      background: #FFFFFF;
    }
  }

  .goods-item__info {
    padding-left: 10px;
    min-height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-item__description {
      margin-top: 3px;
    }
  }
  .btn-cart {
    right: -8px;
    bottom: -8px;
  }
}

/* 1行2个样式 */
.goods-list.grid {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 10px 0;

  .goods-item {
    position: relative;
    width: 50%;
    padding-left: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .goods-item__inner {
    background: #FFF;
    border-radius: 5px;
    overflow: hidden;
  }

  .goods-item__cover {
    position: relative;
    height: 0;
    overflow: hidden;
    padding-top: 100%;

    img {
      width: 100%;
      height: auto;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .goods-item__info {
    padding: 5px;
  }

  .goods__info__below {
    height: 42px;
    display: flex;
    align-items: flex-end;
  }
}
</style>
