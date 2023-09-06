import type {
  HttpError,
  HttpRequestConfig,
  HttpResponse,
} from 'uview-plus/libs/luch-request/index';
import { showMessage } from './status';
import { getToken } from '@/utils/auth';

function requestInterceptors() {
  /**
   * 请求拦截
   * @param {Object} http
   */
  uni.$u.http.interceptors.request.use(
    (config: HttpRequestConfig) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {};
      // token设置
      const token = getToken();
      if (token && config.header) {
        config.header.token = token;
      }
      // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
      // console.log(vm.$store.state);
      return config;
    },
    (
      config: any, // 可使用async await 做异步操作
    ) => Promise.reject(config),
  );
}
function responseInterceptors() {
  /**
   * 响应拦截
   * @param {Object} http
   */
  uni.$u.http.interceptors.response.use(
    (response: HttpResponse) => {
      /* 对响应成功做点什么 可使用async await 做异步操作 */
      const data = response.data;
      // 自定义参数
      const custom = response.config?.custom;
      if (data.code !== 200) {
        // 服务端返回的状态码不等于200，则reject()
        // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
        if (custom?.toast !== false) {
          uni.$u.toast(data.message);
        }
        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return Promise.reject(data);
        } else {
          // 否则返回一个pending中的promise
          return new Promise(() => {});
        }
      }
      return data.data || {};
    },
    (response: HttpError) => {
      if (response.statusCode) {
        // 请求已发出，但是不在2xx的范围
        showMessage(response.statusCode);
        return Promise.reject(response.data);
      }
      showMessage('网络连接异常,请稍后再试!');
    },
  );
}

export { requestInterceptors, responseInterceptors };
