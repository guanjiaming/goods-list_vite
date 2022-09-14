<template>
  <section class="filter-bar">
    <ul class="sort-list">
      <li class="sort-item" :class="{'cur': sortType === 9}">
        <a class="sort-item-a" href="javascript:" @click="sortChange(9)">
          <span class="text">综合</span>
        </a>
      </li>
      <li class="sort-item" :class="{'cur': sortType === 2}">
        <a class="sort-item-a" href="javascript:" @click="sortChange(2)">
          <span class="text">销量</span>
        </a>
      </li>
      <li class="sort-item" :class="{'cur': sortType === 3 || sortType === 4}">
        <a class="sort-item-a" href="javascript:" @click="sortChange(3)">
          <span class="text">价格</span>
          <span class="sort-icons" :class="[priceSortClass]">
              <i class="icon icon-asc">
                <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z"></path></svg>
              </i>
              <i class="icon icon-desc">
                <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z"></path></svg>
              </i>
            </span>
        </a>
      </li>
    </ul>
    <a href="javascript:" class="icon-layout" @click="layoutChange">
        <i class="icon-grid" v-show="layoutMode === 'grid'">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M179.712 501.28896h264.47872a20.48 20.48 0 0 0 20.48-20.48V216.33024a20.48 20.48 0 0 0-20.48-20.48H179.712a20.48 20.48 0 0 0-20.48 20.48v264.47872a20.48 20.48 0 0 0 20.48 20.48z m20.48-264.47872h223.51872v223.51872H200.192V236.81024zM529.63328 501.28896h264.47872a20.48 20.48 0 0 0 20.48-20.48V216.33024a20.48 20.48 0 0 0-20.48-20.48H529.63328a20.48 20.48 0 0 0-20.48 20.48v264.47872a20.48 20.48 0 0 0 20.48 20.48z m20.48-264.47872h223.51872v223.51872H550.11328V236.81024zM179.712 851.21024h264.47872a20.48 20.48 0 0 0 20.48-20.48V566.23104a20.48 20.48 0 0 0-20.48-20.48H179.712a20.48 20.48 0 0 0-20.48 20.48v264.47872a20.48 20.48 0 0 0 20.48 20.50048z m20.48-264.4992h223.51872v223.51872H200.192V586.71104zM509.15328 830.73024a20.48 20.48 0 0 0 20.48 20.48h264.47872a20.48 20.48 0 0 0 20.48-20.48V566.23104a20.48 20.48 0 0 0-20.48-20.48H529.63328a20.48 20.48 0 0 0-20.48 20.48v264.4992z m40.96-244.0192h223.51872v223.51872H550.11328V586.71104z"></path></svg>
        </i>
        <i class="icon-list" v-show="layoutMode === 'list'">
          <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M64 480h352V128H64v352z m64-288h224v224H128V192zM64 928h352V576H64v352z m64-288h224v224H128v-224zM526.848 224H928a32 32 0 1 0 0-64H526.848a32 32 0 0 0 0 64zM928 608H526.848a32 32 0 1 0 0 64H928a32 32 0 1 0 0-64zM928 384H526.848a32 32 0 0 0 0 64H928a32 32 0 1 0 0-64zM928 832H526.848a32 32 0 1 0 0 64H928a32 32 0 1 0 0-64z"></path></svg>
        </i>
      </a>
  </section>
</template>
<script lang="ts">
import {defineComponent, ref, defineProps} from "vue";
import {LayoutModeEnum} from "../interface/SearchState";

export default defineComponent({
  props: {
    sortType: {
      type: Number,
      required: true
    },
    layoutMode: {
      type: String,
      required: true
    }
  },
  setup(props, context) {

    // 使用排序功能
    let {sortChange, priceSortClass} = useSort(props, context);

    // 使用改变列表布局功能
    let {layoutChange} = useChangeLayoutMode(props, context);

    return {
      sortChange,
      priceSortClass,
      layoutChange
    }
  }
})

/**
 *
 */
function useSort(props: any, context: any) {

  const priceSortClass = ref<string>('');
  let sortType = props.sortType;

  function sortChange(val: number): void {
    if(val === 3) {
      if(sortType === 3){
        sortType = 4;
      } else {
        sortType = 3;
      }
    } else {
      sortType = val;
    }

    priceSortClass.value = '';
    if(sortType === 3) {
      priceSortClass.value = 'price-asc';
    }
    if(sortType === 4) {
      priceSortClass.value = 'price-desc';
    }

    context.emit('onchangeSortType', sortType)
  }

  return {sortChange, priceSortClass}
}

/**
 * hooks 页面布局改变
 * @param props
 */
function useChangeLayoutMode(props: any, context: any) {
  function layoutChange(): void {
    let args = LayoutModeEnum.List;
    if (props.layoutMode === LayoutModeEnum.List) {
      args = LayoutModeEnum.Grid;
    }
    context.emit('onchangeLayoutMode', args)
  }

  return {layoutChange}
}
</script>
<style lang="scss">
.filter-bar {
  display: flex;
  height: 46px;
  line-height: 46px;
}

.sort-list {
  flex: 1;
  display: flex;

}

.sort-item {
  flex: 1;
  color: #333;

  &.cur {
    font-weight: bold;

    .sort-item-a {
      color: teal;
    }
  }
}

.sort-item-a {
  display: flex;
  font-size: 14px;
  justify-content: center;
  color: #333;

  .sort-icons {
    display: flex;
    flex-direction: column;
    font-size: 10px;
    line-height: 10px;
    justify-content: center;
    color: #666;

    .icon {
      width: 8px;
      height: 8px;
      line-height: 8px;
    }

    .icon-asc {
      margin-top: -4px;
    }

    .icon-desc {
      margin-top: -2px;
    }

    &.price-asc {
      .icon-asc {
        color: teal;
      }
    }

    &.price-desc {
      .icon-desc {
        color: teal;
      }
    }
  }
}

.icon-layout {
  width: 78px;
  text-align: center;

  .icon-grid {
    font-size: 22px;
    position: relative;
    top: -3px;
  }

  .icon-list {
    font-size: 18px;
    position: relative;
    top: -2px;
  }
}
</style>
