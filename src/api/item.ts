/* Created by guanjiaming on 2021/12/17 */
import request from "./request";

class ItemService {

  private baseURL: string = "//pre-item.aiyouyi.cn";

  fetchProductInfo(data: productInfoParameter): Promise<any> {
    return request.post({
      baseURL: this.baseURL,
      url: "/item/c/item/getProductInfo",
      data: data
    })
  }

  // 通过分类id或商品名查找商品列表
  fetchProductList(data: productListParameter): Promise<any> {
    return request.post({
      baseURL: this.baseURL,
      url: '/item/c/item/pageProductInfoList',
      data: data,
    });
  }

}

export default new ItemService();

/*---- 参数类型 ---*/
interface productInfoParameter {

}

interface productListParameter {
  productCatalogInfoId?: string;
  keyword?: string;
  pageSize: number;
  sortType: number;
  startIndex: number;
  status: number;
}
