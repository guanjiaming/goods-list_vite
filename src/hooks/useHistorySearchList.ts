import {State} from "../interface/SearchState";

export default function useHistorySearchList(state: State, cid: string) {
  // 添加历史搜索 tag
  function addHistorySearchListItem(name: string) {
    if (!name) return
    const findIndex: number = state.historySearchList.findIndex(tag => tag === name)
    console.log('findIndex', findIndex)
    if (findIndex > -1) {
      state.historySearchList.splice(findIndex, 1)
    }
    state.historySearchList.unshift(name)

    if (state.historySearchList.length > 10) {
      state.historySearchList.splice(state.historySearchList.length - 1, 1)
    }
    localStorage.setItem('searchKeyword' + cid, state.historySearchList.join(','))
  }

  /**
   * 设置搜索列表
   */
  function getHistorySearchList() {
    if (localStorage.getItem('searchKeyword' + cid)) {
      let searchKeyword = (window as any).localStorage.getItem('searchKeyword' + cid);
      state.historySearchList = searchKeyword.split(',')
    }
  }


  /**
   *  清空历史搜索
   */
  function clearHistorySearchList() {
    state.historySearchList = []
    localStorage.removeItem('searchKeyword' + cid)
  }

  return {
    getHistorySearchList,
    addHistorySearchListItem,
    clearHistorySearchList
  }
}
