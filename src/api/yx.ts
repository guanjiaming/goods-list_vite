/* Created by guanjiaming on 2021/12/17 */

import {AxiosPromise} from "axios";
import request from "./request";

class YxService {
  private baseURL: string = "//pre-yx.aiyouyi.cn";

  /**
   * 商品促销信息、标签、会员权益
   * @param data
   */
  fetchPromotionLabelsBySkuIds(data: Array<string>): Promise<any> {
    return request.post({
      baseURL: this.baseURL,
      url: `/mkt-api/v1/c/promotion/labels`,
      data: {
        skuIds: data
      }
    });
  }

  // 商品的活动
  fetchSkuActivity(skuId: string): Promise<any> {
    return request.get({
      baseURL: this.baseURL,
      url: `/mkt-api/v1/c/promotion/starting/${skuId}`
    })
  }
}

export default new YxService();
