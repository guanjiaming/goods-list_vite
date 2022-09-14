/* Created by guanjiaming on 2021/12/21 */
import SKU from "./SKU";

// SPU
export default interface Item {
  id: string;
  goodsInfos: Array<SKU>;
  images: string;
  isAfterSaleService: number;
  isAllowOversold: number;
  isCashOnDelivery: number;
  isFreeFreight: number;
  isGiveScore: number;
  isJoinDiscount: number;
  isNeedSend: number;
  isRecommend: number;
  isShowRelationProduct: number;
  isShowSaleCount: number;
  isShowStock: number;
  isSupportInvoice: number;
  isSyncProduct: number;
  mainImage: string;
  memberPrice: null;
  mid: string;
  name: string;
  participateActivity: boolean;
  placeOrderType: number;
  productBrandInfoId: null;
  productCatalogInfoId: string | null;
  productCatalogInfoIds: null;
  productCatalogInfoName: null;
  productCategoryInfoId: string;
  productCategoryInfoName: null;
  productDetail: null;
  productInfoFlag: string;
  productInfoFlags: null;
  productLabelId: string;
  productLabelInfo: null;
  productSpecs: string;
  productUnit: string;
  promotionLabels: promotionLabel;
  purchaseLimitPeriod: null;
  purchaseRestrictionNum: null;
  purchaseRestrictionType: number;
  realPrice: string | null;
  relationProductInfoIds: null;
  saleChannel: number;
  saleCount: number;
  salePrice: string;
  saleRange: null;
  saleType: number;
  selfSaleCount: number;
  sendType: number;
  shopExtractType: number;
  shopName: null;
  sortId: string;
  specsType: number;
  starNum: null;
  startSaleNum: number;
  status: number;
  stock: number;
  stockReductionStrategy: number;
  stockStatus: null;
  stockThreshold: null;
  tagId: null;
  templateProductInfoId: null;
  tid: null;
  type: number;
  useDesc: string;
  useShopType: number;
  useShops: string;
  useWay: number;
  userCache: null;
  validityDays: null;
  validityType: number;
  videoUrl: string;
}

interface promotionLabel {
  labelAbbName: string[];
  labelName: string[];
}
