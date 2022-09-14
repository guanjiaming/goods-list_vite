/* Created by guanjiaming on 2021/12/17 */
import wx from 'weixin-js-sdk';
export default {
  /**
   * 向小程序发送消息
   */
  postMessage() {
    wx.miniProgram.postMessage()
  },

  /**
   * 解析小程序发来的参数
   */
  parseMessage() {

  }
}
