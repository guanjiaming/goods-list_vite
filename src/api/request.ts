/* Created by guanjiaming on 2021/12/17 */
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosError } from "axios";
import { Toast } from "vant";
import {getCid, getMid, getToken} from "../utils/Base";
import SessionStorageUtil from "../utils/SessionStorageUtil";

/**
 * 通过自定义request
 * @param config
 * @constructor
 */
function Request(config: AxiosRequestConfig): AxiosPromise {
  const $axios: AxiosInstance = axios.create();

  // @ts-ignore
  config.baseURL = import.meta.env.VITE_SOME_KEY

  serRequestHeader(config);
  interceptors($axios);

  // 设置请求头
  function serRequestHeader(config: AxiosRequestConfig) {
    const mid: string = getMid();
    const cid: string = getCid();
    const merchantId: string = cid; // cid
    const token: string = getToken();

    if(config.method?.toUpperCase() === "GET") {
      config.params.cid = cid;
      config.params.mid = mid;
    }

    if(config.method?.toUpperCase() === "POST") {
      config.data.cid = cid;
      config.data.mid = mid;
    }

    config.headers = {
      businessId: "1",
      merchantId: cid,
      cid,
      mid,
      token,
      accessToken: getToken(),
      ...config.headers
    };
  }

  // 拦截器
  function interceptors(instance: AxiosInstance): void {
    // 添加请求拦截器
    instance.interceptors.request.use(
      config => {
        return config;
      },
      (error: AxiosError) => {
        // 对请求错误做些什么
        Toast("请求参数错误");
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    instance.interceptors.response.use(
      response => {
        // 对响应数据做点什么
        const { data } = response;
        return data;
      },
      (error: AxiosError) => {
        console.log(error);
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  return $axios(config);
}

Request.get = function get(config: AxiosRequestConfig): AxiosPromise {
  config.method = "GET";
  return Request(config);
};

Request.post = function post(config: AxiosRequestConfig): AxiosPromise {
  config.method = "POST";
  return Request(config);
};

export default Request;
