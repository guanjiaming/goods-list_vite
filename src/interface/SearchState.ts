import Item from "./Item";
import SKU from "./SKU";

export interface State {
  placeholderText: string;
  categoryId: string,
  keyword: string;
  isShowSearchPanel: boolean;
  historySearchList: string[];
  hotSearchList: string[];
  sortType: number,
  layoutMode: LayoutModeEnum,
  startIndex: number,
  total: number,
  pageSize: number,
  goodsList: Array<any>,
  isLoading: boolean,
  scrollTop: number,
  skuPopupInfo: skuPopupInfo
}

export enum LayoutModeEnum {
  List = 'list',
  Grid = 'grid'
}

interface skuPopupInfo {
  isShow: boolean;
  currentSpuData: Item | null;
}

