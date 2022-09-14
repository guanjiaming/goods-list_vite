/* Created by guanjiaming on 2021/12/20 */

export default function usePageScrollFn(cb: Function) {

  let isOnBottom: boolean = false;
  let timerId: number | null = null; // ReturnType<typeof setTimeout>
  let startTime: number = Date.now();
  let scrollTop = 0;
  let bottom: number = 120;
  let windowHeight: number = window.innerHeight;

  // @ts-ignore
  let $searchHeadFixer: HTMLElement = document.querySelector('#searchHeadFixer')
  let isSearchHeadFixed: boolean = false;
  let searchInputHeight: number = 30;
  let lastScrollTop: number = 0;

  /**
   * 添加监听触底事件
   */
  window.addEventListener("scroll", listener)

  function listener() {
    let delay = 300
    let curTime = Date.now()
    let remaining = delay - (curTime - startTime)
    if (timerId) clearTimeout(timerId)
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (remaining <= 0) {
      scrollFnCommon()
    } else {
      timerId = window.setTimeout(scrollFnCommon, remaining)
    }
  }

  function scrollFnCommon() {
    /* 1. 触底事件 */
    if (!isOnBottom) {
      let bodyHeight = document.body.offsetHeight;
      let currentScrollTop: number = document.documentElement.scrollTop || document.body.scrollTop;
      if (bodyHeight <= windowHeight + currentScrollTop + bottom) {
        console.log("到底部了")
        isOnBottom = true;
        cb();
      }
    }

    /* 2. 滑动过程中的收起head和tab bar动画部分 */

    const $tabBar: HTMLElement | null = document.querySelector('#mobileNav .tab-bar-wrap')
    if (scrollTop <= 50) {
      isSearchHeadFixed = false
      $searchHeadFixer.classList.remove('fixer-transition')
    }
    if (scrollTop >= searchInputHeight) {
      isSearchHeadFixed = true
      if (!$searchHeadFixer.classList.contains('fixer-transition')) {
        setTimeout(function () {
          $searchHeadFixer.classList.add('fixer-transition')
        }, 100)
      }
    }

    // 上滑
    if (scrollTop > lastScrollTop && isSearchHeadFixed) {
      console.log("向上滑动")
      // 滑动过程中隐藏 搜索框
      $searchHeadFixer.style.transform = `translate3d(0px, -${searchInputHeight}px, 0px)`
      // 滑动过程中隐藏tab bar nav
      if($tabBar) {
        $tabBar.style.transition = 'transform 0.2s ease'
        $tabBar.style.transform = `translate3d(0,6.5vh,0)`
      }
    }

    // 下滑
    if (scrollTop < lastScrollTop) {
      console.log("向下")
      // 显示 搜索框 和 tab bar nav
      $searchHeadFixer.style.transform = `translate3d(0,0,0)`
      if($tabBar) {
        $tabBar.style.transform = `translate3d(0,0,0)`
      }
    }

    lastScrollTop = scrollTop
    startTime = Date.now();
  }

  function loadMoreEnd() {
    isOnBottom = false;
  }

  return {
    pageScrollListenerFn: listener,
    loadMoreEnd: loadMoreEnd
  }
}
