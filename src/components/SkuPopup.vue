<!-- 将来会有人拆分成1个通用的组件，这边就不继续写了 -->

<template>
  <Popup
      v-model:show="isShowPopup"
      position="bottom"
      class="sku-popup"
  >
    <div class="sku-popup-inner">
      <section class="sku-popup_header">
        <div class="sku-popup_header_img">
          <img class="picture"
               src="https://pre-omo.aiyouyi.cn/thumbnail/270x270/999/image/33911/f3dcf67eccaa4d6fa12c68910bf88e29.jpg"
               alt="">
        </div>
        <div class="sku-popup_header_info">
          <div class="price">
            <div class="red-price">
              <strong>
                <em><small>¥ </small><span class="int">999</span>.99</em>
              </strong>
            </div>

            <div class="black-price">
              <strong>
                <em><small>¥ </small><span class="int">999</span>.99</em>
              </strong>
            </div>
          </div>
          <div class="info__below">
            <div class="stock">
              剩余9993米
            </div>
            <div class="selected-sku-attr">
              已选:默认规格
            </div>
          </div>
        </div>
      </section>

      <section class="sku-popup_body">
        <ul class="sku-attr-group_list">
          <li class="sku-attr-group_item">
            <h4 class="sku-attr-group-heading">颜色</h4>
            <ul class="sku-attr_list">
              <li class="sku-attr_item cur">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
            </ul>
          </li>
          <li class="sku-attr-group_item">
            <h4 class="sku-attr-group-heading">颜色</h4>
            <ul class="sku-attr_list">
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
            </ul>
          </li>
          <li class="sku-attr-group_item">
            <h4 class="sku-attr-group-heading">颜色</h4>
            <ul class="sku-attr_list">
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
              <li class="sku-attr_item">
                <a href="javascript:;" class="sku-attr_item_a">黄色</a>
              </li>
            </ul>
          </li>
        </ul>


      </section>

      <Stepper></Stepper>

      <section class="sku-popup_footer">
        <button class="footer-btn btn-add-to-cart" @click="emitAddToCart">加入购物车</button>
        <button class="footer-btn btn-buy-now" @click="emitBuyNow">立即购买</button>
      </section>
    </div>
  </Popup>
</template>

<script>
import {Popup, Stepper} from 'vant';
import {defineComponent, reactive, ref, watch} from 'vue';

export default defineComponent({
  components: {
    Popup,
    Stepper
  },
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    goodsData: {}
  },
  setup(props) {
    let isShowPopup = ref(false);
    let currentSku = reactive({});

    console.log('popup');

    watch(() => props.isShow,
        (newVal) => {
          isShowPopup.value = !!newVal;
        });

    function emitAddToCart() {

    }

    function emitBuyNow() {

    }

    return {
      isShowPopup,
      emitBuyNow,
      emitAddToCart
    };
  }
});
</script>

<style scoped lang="scss">
.sku-popup {
  max-height: 80% !important;
  display: flex;
  flex-direction: column;
}

/*----sku header----*/

.sku-popup_header {
  padding: 0 15px;
  min-height: 6rem;
  font-size: 14px;
}

.sku-popup_header_img {
  position: absolute;
  box-sizing: border-box;
  top: 0.5rem;
  width: 5rem;
  height: 5rem;

  .picture {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
  }
}

.sku-popup_header_info {
  min-height: 5.5rem;
  margin-left: 5.5rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  .price {
    .red-price {
      color: #ff4c29;
      font-size: 17px;
      height: 20px;
    }

    .black-price {
      height: 20px;
      color: #333;
    }

    strong {
      display: inline-block;
      margin-right: 6px;
      font-weight: 500;
      line-height: 1;
    }

    small {
      font-size: 13px;
    }

    em {
      font-size: 14px;
      font-style: normal;
      display: flex;
      align-items: baseline;
    }

    .int {
      margin-left: 2px;
      font-size: 20px;
    }
  }

  .stock {
    font-size: 12px;
    color: #999;
  }

  .selected-sku-attr {
    color: #333;
    font-size: 14px;
  }

}

/*---sku body---*/
.sku-popup_body {
  padding-left: 15px;
  margin-top: 24px;
  height: 200px;
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.sku-attr-group_list {
  display: flex;
  flex-direction: column;
}

.sku-attr-group-heading {
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.sku-attr-group_item {
  margin-bottom: 14px;

  .sku-attr_list {
    display: flex;
  }

  .sku-attr_item {
    display: block;
    padding: 0 10px 10px 0;

    &.cur {
      .sku-attr_item_a {
        position: relative;
        //background: #fff;
        border: 1px solid var(--theme-color);
        color: var(--theme-color);
        background-color: var(--theme-color-pct10);
      }
    }
  }

  .sku-attr_item_a {
    position: relative;
    display: block;
    min-width: 90px;
    max-width: 100%;
    padding: 0 12px;
    height: 26px;
    line-height: 26px;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 400;
    background: #F2F2F2;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    color: #333;
  }
}

/*---sku footer---*/
.sku-popup_footer {
  display: flex;
  padding: 0 15px 15px;

  .footer-btn {
    flex: 1;
    height: 40px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    background-color: var(--theme-color);
  }

  .footer-btn + .footer-btn {
    margin-left: 15px;
  }

  .btn-add-to-cart {
    color: #fff;
    background: #FB9B31;
  }
}
</style>
