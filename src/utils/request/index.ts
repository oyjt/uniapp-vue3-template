import type { IResponse } from './type';
import { getToken } from '@/utils/auth';
import type { uniappRequestAdapter } from '@alova/adapter-uniapp';
import AdapterUniapp from '@alova/adapter-uniapp';
import { createAlova } from 'alova';
import { showMessage } from './status';
import VueHook from 'alova/vue';
import { createServerTokenAuthentication } from 'alova/client';
import { useUserStore } from '@/store';

/**
 * @description: 请求结果设置
 */
export enum ResultEnum {
  SUCCESS = 10000,
  FAIL = 10001,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

const ContentType = {
  'Content-Type': ContentTypeEnum.JSON,
  'Accept': 'application/json, text/plain, */*',
};
const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<typeof VueHook, typeof uniappRequestAdapter>({
  refreshTokenOnError: {
    // 响应时触发，可获取到error和method，并返回boolean表示token是否过期
    // 当服务端返回401时，表示token过期
    isExpired: (error) => {
      return error.response.status === 401;
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async () => {
      try {
        await useUserStore().authLogin();
      }
      catch (error) {
        // token刷新失败，跳转回登录页
        uni.reLaunch({ url: '/pages/common/login/index' });
        // 并抛出错误
        throw error;
      }
    },
  },
});

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  ...AdapterUniapp(),
  timeout: 5000,
  statesHook: VueHook,
  beforeRequest: onAuthRequired((method) => {
    method.config.headers = Object.assign(method.config.headers, ContentType);
    const { config } = method;
    const ignoreAuth = !config.meta?.ignoreAuth;
    const authorization = ignoreAuth ? getToken() : null;
    if (ignoreAuth && !authorization) {
      throw new Error('[请求错误]：未登录');
    }
    method.config.headers.token = getToken();
  }),
  responded: onResponseRefreshToken((response, method) => {
    const { config } = method;
    const { requestType } = config;
    const { statusCode, data: rawData, errMsg } = response as UniNamespace.RequestSuccessCallbackResult;
    if (statusCode === 200) {
      if (requestType) {
        return response;
      }
      const { code, message, result } = rawData as IResponse;
      if (code === ResultEnum.SUCCESS) {
        return result as any;
      }

      // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
      if (config.meta?.toast !== false)
        uni.$u.toast(message);
      throw new Error(`请求错误[${code}]：${message}`);
    }
    // 处理http状态错误
    setTimeout(() => {
      uni.$u.toast(showMessage(statusCode));
    }, 500);
    throw new Error(`HTTP请求错误[${statusCode}]：${errMsg}`);
  }),
});

export const request = alovaInstance;

export function get<T>({ url = '', params = {}, config = {} }): Promise<T> {
  return request.Get<T>(url, { ...params, ...config });
}

export function post<T>({ url = '', data = {}, config = {} }): Promise<T> {
  return request.Post<T>(url, data, config);
}

export function upload<T>({ url = '', data = {}, config = {} }): Promise<T> {
  return request.Post<T>(url, data, {
    // 设置请求方式为上传，适配器内将调用uni.uploadFile
    requestType: 'upload',
    ...config,
  });
}

export function download<T>({ url = '', params = {}, config = {} }): Promise<T> {
  return request.Get<T>(url, {
    // 设置请求方式为下载，适配器内将调用uni.downloadFile
    requestType: 'download',
    ...params,
    ...config,
  });
}
