/* Created by guanjiaming on 2021/12/20 */
/**
 * 使用价格过滤
 */
export default function usePriceFilter(goodsData: Array<any>) {
  goodsData.forEach(item => {
    if(item.fansPrice) { /* 有粉丝价时 */
      if(Number(item.fansPrice) < Number(item.salePrice)) {
        let index = item.salePrice.indexOf('.');
        item.__salePriceInt = item.salePrice.substr(0, index);
        item.__salePriceFloat = item.salePrice.substr(index);
        index = item.fansPrice.indexOf('.');
        item.__vipPriceInt = item.fansPrice.substr(0, index);
        item.__vipPriceFloat = item.fansPrice.substr(index);
      } else {
        let index = item.fansPrice.indexOf('.');
        item.__salePriceInt = item.fansPrice.substr(0, index);
        item.__salePriceFloat = item.fansPrice.substr(index);
        item.__isShowVIPICon = true;
      }
    } else { /* 没有粉丝价的时候：判断是否有促销价和会员价 */
      if(item.realPrice && item.memberPrice) {
        if(item.participateActivity) {  /* 促销价和会员价叠加 */
          let index = item.realPrice.indexOf('.');
          item.__salePriceInt = item.realPrice.substr(0, index);
          item.__salePriceFloat = item.realPrice.substr(index);

          item.__referencePrice = item.salePrice;

          index = item.memberPrice.indexOf('.');
          item.__vipPriceInt = item.memberPrice.substr(0, index);
          item.__vipPriceFloat = item.memberPrice.substr(index);
        } else { /* 不叠加, 取最便宜的 */
          if(Number(item.realPrice) < Number(item.memberPrice)) {
            let index = item.realPrice.indexOf('.');
            item.__salePriceInt = item.realPrice.substr(0, index);
            item.__salePriceFloat = item.realPrice.substr(index);

            item.__referencePrice = item.salePrice;
          } else {
            let index = item.salePrice.indexOf('.');
            item.__salePriceInt = item.salePrice.substr(0, index);
            item.__salePriceFloat = item.salePrice.substr(index);

            index = item.memberPrice.indexOf('.');
            item.__vipPriceInt = item.memberPrice.substr(0, index);
            item.__vipPriceFloat = item.memberPrice.substr(index);
          }
        }
      } else {
        // 有促销价或会员价时
        if(item.realPrice) { // 促销价+参考价
          let index = item.realPrice.indexOf('.');
          item.__salePriceInt = item.realPrice.substr(0, index);
          item.__salePriceFloat = item.realPrice.substr(index);

          item.__referencePrice = item.salePrice;
        } else { // 原价
          let index = item.salePrice.indexOf('.');
          item.__salePriceInt = item.salePrice.substr(0, index);
          item.__salePriceFloat = item.salePrice.substr(index);
        }
        if(item.memberPrice) {
          let index = item.memberPrice.indexOf('.');
          item.__vipPriceInt = item.memberPrice.substr(0, index);
          item.__vipPriceFloat = item.memberPrice.substr(index);
        }
      }
    }
  })
}
