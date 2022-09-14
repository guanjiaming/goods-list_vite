import CookieUtil from "./CookieUtil";

/**
 * 获取url上的参数
 * @param key {string}
 */
export function getQuery(key: string): string {
  let reg: RegExp = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  let result: "" | RegExpMatchArray | null = window.location.search && window.location.search.substr(1).match(reg);
  return result && result.length > 2 ? decodeURIComponent(result[2]) : '';
}

/**
 * 获取商户ID(mid)
 */
export function getMid(): string {
  return getQuery('mid') || CookieUtil.getCookie('mid') || "";
}

/**
 * 获取机构ID(cid)
 * 优先级别：getQuery("cid") > getCookie(`cid-${getMid()}`) > getCookie("shopId")
 */
export function getCid(): string {
  return getQuery("cid") || CookieUtil.getCookie(`cid-${getMid()}`) || CookieUtil.getCookie("defaultCid") || "";
}

/**
 * 获取当前页面在哪个环境下运行
 */
export function getPageRunChannel(): string {
  let currentEnv: string = "mobile-mall";
  if(getQuery("evn") === "mini") currentEnv = "mina";
  const pathname = location.pathname;
  // 1 /subsys/search.html、H5 "/shop/search.html"、公众号 "/cp/classGoodList"
  const reg = pathname.match(/^\/shop\/|^\/subsys\/|^\/cp\//);
  if (reg) {
    const first = reg[0];
    switch (first) {
      case '/shop/':
        currentEnv = "H5";
        break;
      case '/subsys/':
        currentEnv = "H5";
        break;
    }
  }
  return currentEnv;
}

/**
 * 获取token
 */
export function getToken(): string {
  let pageRunChannel = getPageRunChannel();
  if (pageRunChannel === "mobile-mall") {
    return CookieUtil.getCookie(`token-${getMid()}`) || ""
  }
  if (pageRunChannel === "h5") {
    return CookieUtil.getCookie("token") || ""
  }
  if (pageRunChannel === "mina") {
    return getQuery("token")
  }
  return ""
}

/**
 * 动态添加登录js
 */
export function addLoginFn() {
  let loginScript = document.createElement("script");
  let version = process.env.NODE_ENV === "prod" ? process.env.LOGIN_JS_VERSION : new Date().getTime();
  let isProd = process.env.NODE_ENV === "prod" && !location.origin.includes("beta-")
  let env = isProd ? "min" : "dev3";
  loginScript.setAttribute("type", "text/javascript");
  loginScript.setAttribute("src", `//omo.aiyouyi.cn/common-static/public.login.${env}.js?v=${version}`);
  document.getElementsByTagName('head')[0].appendChild(loginScript);
  loginScript.onload = () => {
    console.log('-------登录js  onload--------');
    // @ts-ignore
    window.MallLogin = new window.addMallLogin({
      from: getPageRunChannel() === "mina" ? "mini" : getPageRunChannel(), // h5 mobile-mall mini
      env: process.env.NODE_ENV, // dev | test | pre | prod
      mid: getMid(),
      cid: getCid() || CookieUtil.getCookie("shopId"),
      appId: process.env.APPID, // omo appid
      dataApi: process.env.DATA_API // omo-aiyouyi.com
    });
  }
}


export function throttle(func: Function, delay: number) {
  var timer: any = null;
  var startTime = Date.now();
  return function() {
    var curTime: number = Date.now();
    var remaining: number = delay - (curTime - startTime);
    // @ts-ignore
    var context: any = this;
    var args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  }
}

function handle() {
  console.log(Math.random());
}
