/* Created by guanjiaming on 2021/12/17 */

/**
 * sessionStorage工具类
 */
export default class SessionStorageUtil {
  static setItem(key: string, value: any) {
    let data = {
      value: value
    };
    sessionStorage[key] = JSON.stringify(data);
  }

  static getItem(key: string) {
    let data = sessionStorage[key];
    if (!data || data === 'null') {
      return null;
    }
    return JSON.parse(data).value;
  }
};
