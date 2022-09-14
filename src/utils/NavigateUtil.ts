import wx from 'weixin-js-sdk';
import {getPageRunChannel, getQuery} from "./Base";

const pageRunChannel: string = getPageRunChannel();

interface pageUrlImpl {

}

const miniProgramPageUrl = {
  "category": "/pages/classifyPage/goodDetail/goodDetail",
  "goodsDetail": "",
  "home": "/pages/index/index",
  "cart": "/pages/cart/cart",
  "my": "/pages/my/my",
};
const h5PageUrl = {
  "category": "/shop/category.html",
  "goodsDetail": "/shop/item.html",
};
const mobileMallPageUrl = {
  "category": "",
  "goodsDetail": "",
};

function getPageUrl(pageName: string, query: any): string {
  if(pageRunChannel === "h5") {
    // @ts-ignore
    return h5PageUrl[pageName]
  }
  if(pageRunChannel === "mina") {
    // @ts-ignore
    return h5PageUrl[pageName]
  }
  if(pageRunChannel === "mobile-mall") {
    // @ts-ignore
    return h5PageUrl[pageName]
  }
  return "undefined";
}

// 给H5地址添加cid
function addQueryTempCidToH5(url: string) {
  if (pageRunChannel === "h5" && getQuery("cid")) {
    let indexOf: number = url.indexOf("?");
    if (indexOf > -1) url = `${url}&cid=${getQuery("cid")}`;
    else url = `${url}?cid=${getQuery("cid")}`
  }
  return url
}

class NavigateUtil {
  static navigateTo(pageName: string, query: any = {}) {

    const url: string = getPageUrl(pageName, query);
    if (pageRunChannel === 'h5' || "mobile-mall") {
      window.location.href = url
    }

    if (getPageRunChannel() === 'mina') {
      wx.miniProgram.navigateTo({url})
    }
  }

  static redirectTo() {

  }

  static switchTab() {

  }

  static reLaunch() {

  }
}

export default NavigateUtil;
