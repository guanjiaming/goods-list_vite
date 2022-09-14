<template>
  <header id="searchHeadFixer" class="search-panel">
    <!--  搜索框部分  -->
    <section class="search-wrap">
      <i class="icon-back" v-show="state.isShowSearchPanel" @click="hideSearchPanel">
        <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
             viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M395.21518 513.604544l323.135538-312.373427c19.052938-18.416442 19.052938-48.273447 0-66.660212-19.053961-18.416442-49.910737-18.416442-68.964698 0L291.75176 480.290811c-19.052938 18.416442-19.052938 48.273447 0 66.660212l357.633237 345.688183c9.525957 9.207709 22.01234 13.796214 34.497699 13.796214 12.485359 0 24.971741-4.588505 34.466999-13.82896 19.052938-18.416442 19.052938-48.242747 0-66.660212L395.21518 513.604544z"></path>
        </svg>
      </i>
      <form action="javascript:" class="search-form">
        <i class="search-form__icon icon-search">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M789.804097 737.772047 742.865042 784.699846 898.765741 940.600545 945.704796 893.672746ZM456.92259 82.893942c-209.311143 0-379.582131 170.282245-379.582131 379.582131s170.270988 379.570875 379.582131 379.570875c209.287607 0 379.558595-170.270988 379.558595-379.570875S666.210197 82.893942 456.92259 82.893942zM770.128989 462.477097c0 172.721807-140.508127 313.229934-313.206398 313.229934-172.720783 0-313.229934-140.508127-313.229934-313.229934s140.508127-313.229934 313.229934-313.229934C629.620861 149.247162 770.128989 289.75529 770.128989 462.477097z"></path>
          </svg>
        </i>
        <input
            class="search-form__input"
            type="search"
            @keyup.enter="doSearch"
            @focus="onFocus"
            @blur="onBlur"
            v-model="state.keyword"
            :placeholder="state.placeholderText"
        >
        <i class="search-form__icon icon-clear">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M512 64.5C264.85 64.5 64.5 264.85 64.5 512S264.85 959.5 512 959.5 959.5 759.15 959.5 512 759.15 64.5 512 64.5z m235.21 599.09c16.06 13.81 17.89 38.03 4.08 54.09-7.59 8.83-18.31 13.36-29.1 13.36-8.85 0-17.74-3.05-24.98-9.26L512 562.59 326.79 721.78a38.22 38.22 0 0 1-24.98 9.26c-10.79 0-21.52-4.53-29.1-13.36-13.81-16.06-11.98-40.28 4.08-54.09L453.15 512 276.79 360.42c-16.06-13.81-17.89-38.03-4.08-54.09 13.81-16.07 38.01-17.89 54.09-4.1L512 461.42l185.2-159.19c16.08-13.8 40.29-11.96 54.09 4.1 13.81 16.06 11.98 40.28-4.08 54.09L570.85 512.01l176.36 151.58z"></path>
          </svg>
        </i>
      </form>
      <button v-show="state.isShowSearchPanel" class="search-btn btn-search" @click="doSearch">搜索</button>
    </section>

    <!--  history  -->
    <div class="history-search" v-if="isShowHistory">
      <div class="history-search-head">
        <p>历史搜索</p>
        <i class="search-head__icon icon-delete" @click="clearHistorySearchList">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
               viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004zM415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004zM928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123zM736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z"></path>
          </svg>
        </i>
      </div>
      <ul class="tag-list">
        <li class="tag-item" v-for="(tag, index) in state.historySearchList" v-bind:key="index">{{ tag }}</li>
      </ul>
    </div>

    <!--  hot words  -->
    <div class="hot-search" v-if="isShowHotSearch">
      <div class="hot-search-head">
        <p>搜索热词</p>
      </div>
      <ul class="tag-list">
        <li class="tag-item" v-for="(tag, index) in state.hotSearchList" v-bind:key="index">{{ tag }}</li>
      </ul>
    </div>

    <!--  filter sort bar  -->
    <FilterBar
        v-show="!state.isShowSearchPanel"
        :layout-mode="state.layoutMode"
        :sort-type="state.sortType"
        @onchangeLayoutMode="changeLayoutMode"
        @onchangeSortType="changeSort"
    />
  </header>

  <!-- 商品列表 -->
  <div class="search-result" v-show="!state.isShowSearchPanel">
    <GoodsList
        :goods-data="state.goodsList"
        :layout-mode="state.layoutMode"
        v-on:showSkuPopup="showSkuPopup"
        v-on:toGoodsDetail="toGoodsDetail"
    />
  </div>

  <!-- 商品规格弹窗 -->
  <sku-popup
      :is-show="state.skuPopupInfo.isShow"
      :goods-data="state.skuPopupInfo.currentSpuData"
  />

</template>

<script lang="ts">
import {computed, defineComponent, reactive} from "vue";
import SearchBar from '../../components/SearchBar.vue'
import FilterBar from '../../components/FilterBar.vue'
import GoodsList from '../../components/GoodsList.vue'
import skuPopup from '../../components/SkuPopup.vue'
import {State, LayoutModeEnum} from '../../interface/SearchState'

import navigateUtil from "../../utils/NavigateUtil";
import {getQuery} from "../../utils/Base";
import useHistorySearchList from "../../hooks/useHistorySearchList";
import usePageScrollFn from "../../hooks/usePageScrollFn";
import usePriceFilter from "../../hooks/usePriceFilter";
import itemApis from "../../api/item"
import yxApis from "../../api/yx"
import {Toast} from "vant";

export default defineComponent({
  components: {
    SearchBar,
    FilterBar,
    GoodsList,
    skuPopup
  },
  setup() {
    let cid = '2';
    const state = reactive<State>({
      placeholderText: '请输入要搜索的关键词',
      categoryId: '',
      keyword: '',
      isShowSearchPanel: false,
      historySearchList: [],
      hotSearchList: [],

      // ∆ 列表相关
      layoutMode: LayoutModeEnum.List,
      sortType: 9,
      startIndex: 1,
      total: 0,
      pageSize: 20,
      goodsList: [],
      isLoading: false,
      scrollTop: 0,

      // ∆ ≤≥skus相关
      skuPopupInfo: {
        isShow: false,
        currentSpuData: null
      }
    })

    state.categoryId = getQuery('categoryId');
    state.placeholderText = state.hotSearchList[0] || '';

    Toast("111")

    /* hook */

    // 搜索历史
    const {
      getHistorySearchList,
      addHistorySearchListItem,
      clearHistorySearchList
    } = useHistorySearchList(state, cid);
    getHistorySearchList();

    // 使用商品列表hook

    /**
     * 搜索
     */
    function doSearch() {
      console.log('enter...on press')
      // 1. 关键字非空判断
      state.keyword = state.keyword || state.hotSearchList[0] || ''
      if (!state.keyword) {
        alert('请输入搜索关键词')
        return
      }

      Toast.loading({
        message: "Vant 3",
        forbidClick: true,
        duration: 0
      })

      // 2. 添加历史搜索 tag
      addHistorySearchListItem(state.keyword)
    }

    // usePageScrollFn();
    // onMounted(() => {
    //   console.log("onMounted");
    //   usePageScrollFn();
    // })

    // onMounted(() => {
    //   console.log('Component is mounted!')
    // })

    function onFocus() {
      if (state.categoryId) { // 如果是分类里的商品列表页面
        // 跳转到 搜索页面
        navigateUtil.navigateTo("search");
      }
      state.isShowSearchPanel = true;
    }

    function onBlur() {
      // state.isShowSearchPanel = false;
    }

    /* 收起搜索面板 */
    function hideSearchPanel() {
      state.isShowSearchPanel = false;
    }

    /**
     * 改变页面布局
     * @param layoutMode list grid
     */
    function changeLayoutMode(layoutMode: LayoutModeEnum) {
      state.layoutMode = layoutMode
    }

    function changeSort(val: number) {
      if (state.sortType === val) return;
      state.sortType = val;
      // todo 获取商品列表
      console.log('todo getGoodsLIst')
    }

    const isShowHistory = computed(() => state.isShowSearchPanel && state.historySearchList.length);

    const isShowHotSearch = computed(() => state.isShowSearchPanel && state.hotSearchList.length);

    function showSkuPopup(index: number) {
      const goodsDetail = state.goodsList[index];
      // 单规格且不是虚拟商品的， 直接加入购物车
      if (goodsDetail && goodsDetail.goodsInfos && goodsDetail.goodsInfos.length === 1 && goodsDetail.type !== 1) {
        // todo addToCart()  buyNow
        alert("直接加入购物车")
      } else {
        // todo 打开sku pop
        alert("Sku Popup")
        // state.skuPopupInfo.isShow = true
        // state.skuPopupInfo.currentSpuData = goodsDetail
      }
    }

    function toGoodsDetail() {
      console.log("去商品详情")
    }

    function onRefresh() {
      console.log("刷新")
    }

    /**
     * 获取商品列表
     */
    async function getGoodsListData(): Promise<void> {
      try {
        Toast.loading({
          duration: 0,
          message: "加载中..."
        })

        const {data: productData, msg: productMsg, code: productCode} = await itemApis.fetchProductList({
          keyword: state.keyword,
          startIndex: state.startIndex,
          pageSize: state.pageSize,
          sortType: state.sortType,
          status: 1
        })

        if (productCode !== 200 || !productData.list) {
          Toast(productMsg)
          return
        }

        // 获取商品促销标签
        try {
          const skuIds = productData?.list.map((item: any) => item.goodsInfos[0].id);
          if (skuIds.length) {
            const {data: labels, code} = await yxApis.fetchPromotionLabelsBySkuIds(skuIds);
            if (code === "SYS0000") {

              const map: Map<string, any> = new Map<string, any>();

              for (let i = 0; i < labels.length; i++) {
                map.set(labels[i].skuId, labels[i].labelList);
              }

              for (let i = 0; i < productData.list.length; i++) {
                productData.list[i].promotionLabels = map.get(productData.list[i].goodsInfos[0].id)
              }

              // for (let i = 0; i < labels.length; i++) {
              //   if (!labels[i].labelList.length) continue;
              //   for (let j = 0; j < productData.list.length; j++) {
              //     if (labels[i].skuId === productData.list[j].goodsInfos[0].id) {
              //       if (!productData.list[j].promotionLabels) {
              //         productData.list[j].promotionLabels = {labelAbbName: [], labelName: []}
              //       }
              //
              //       labels[i].lab
              //       elList.forEach((item: any) => {
              //         productData.list[j].promotionLabels.labelAbbName.push(item.labelAbbName)
              //         productData.list[j].promotionLabels.labelName.push(item.labelName)
              //       })
              //     }
              //   }
              // }
            }
          }
        } catch (e) {
          console.error("促销接口错误")
        }

        // todo 替换图片路径

        // 设置列表数据
        // todo 合并列表数据 [...preList]
        state.goodsList = productData.list;
        console.log(productData.list);
        usePriceFilter(state.goodsList);

        // 清除loading
        Toast.clear();
      } catch (err: any) {
        Toast(err)
      }
    }

    return {
      state,
      isShowHistory,
      isShowHotSearch,
      hideSearchPanel,
      doSearch,
      onFocus,
      onBlur,
      changeSort,
      changeLayoutMode,
      showSkuPopup,
      toGoodsDetail,
      clearHistorySearchList,
      onRefresh,
      getGoodsListData
    }
  },
  mounted() {
    usePageScrollFn(function () {
      console.log("LoadMore")
    })
    this.getGoodsListData();
  }
})

</script>

<style lang="scss">
//@import "../src/assets/styles/reset.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $main-color;
}

// 搜索面板
.search-panel {
  max-height: 100%;
  padding-top: 10px;
  position: relative;
  z-index: 2;
  background-color: bisque;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  .search-wrap {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 0 10px;
    box-sizing: border-box;

    .icon-back {
      width: 30px;
      line-height: 28px;
      cursor: pointer;
    }
  }

  .search-form {
    flex: 1;
    position: relative;
    padding: 0 40px 0 30px;
    background-color: #eee;
  }

  .search-form__input {
    display: block;
    width: 100%;
    position: relative;
    height: 30px;
    border: 0;
    outline: none;
    border-radius: 0;
    font-size: 14px;
    color: #333;
    background: #eee;
  }

  .search-btn {
    width: 46px;
    line-height: 30px;
    margin-left: 5px;
    font-size: 12px;
    border-radius: 5px;
    outline: none;
    border: none;
    color: #fff;
    background-color: teal;
  }

  .search-form__icon.icon-search {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    font-size: 16px;
    z-index: 1;
    line-height: 30px;
    text-align: center;
  }

  .search-form__icon.icon-clear {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 30px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 8px;
    line-height: 30px;
    z-index: 2;
    font-size: 16px;
  }

  // 历史搜索和热搜
  .history-search, .hot-search {
    padding-left: 10px;
  }

  .history-search-head, .hot-search-head {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    line-height: 52px;
    font-weight: 700;
    color: #333;
  }

  .search-head__icon.icon-delete {
    width: 40px;
    font-size: 18px;
    text-align: right;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
  }

  .tag-item {
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 1em;
    background-color: #f7f7f7;
  }
}

.search-result {
  background-color: #f5f6f6;
}

</style>
