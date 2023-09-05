import type { App } from 'vue'
import { showMessage } from './status'

function requestInterceptors(vm: App<Element>) {
  /**
   * 请求拦截
   * @param {Object} http
   */
  uni.$u.http.interceptors.request.use(
    (config: any) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
      config.data = config.data || {}
      // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
      // console.log(vm.$store.state);
      return config
    },
    (
      config: any // 可使用async await 做异步操作
    ) => Promise.reject(config)
  )
}
function responseInterceptors(vm: App<Element>) {
  /**
   * 响应拦截
   * @param {Object} http
   */
  uni.$u.http.interceptors.response.use(
    (response: { data: any; config: any }) => {
      /* 对响应成功做点什么 可使用async await 做异步操作 */
      const data = response.data
      // 自定义参数
      const custom = response.config?.custom
      if (data.code !== 200) {
        // 服务端返回的状态码不等于200，则reject()
        // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
        if (custom.toast !== false) {
          uni.$u.toast(data.message)
        }
        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return Promise.reject(data)
        } else {
          // 否则返回一个pending中的promise
          return new Promise(() => {})
        }
      }
      return data.data || {}
    },
    (error: any) => {
      const { response } = error
      if (response) {
        // 请求已发出，但是不在2xx的范围
        showMessage(response.status)
        return Promise.reject(response.data)
      }
      showMessage('网络连接异常,请稍后再试!')
    }
  )
}

// const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
//   const conf = config;
//   return new Promise((resolve) => {
//     service.request<any, AxiosResponse<IResponse>>(conf).then((res: AxiosResponse<IResponse>) => {
//       const {
//         data: { result },
//       } = res;
//       resolve(result as T);
//     });
//   });
// };

// export function get<T = any>(config: AxiosRequestConfig): Promise<T> {
//   return request({ ...config, method: 'GET' });
// }

// export function post<T = any>(config: AxiosRequestConfig): Promise<T> {
//   return request({ ...config, method: 'POST' });
// }

// export function put<T = any>(config: AxiosRequestConfig): Promise<T> {
//   return request({ ...config, method: 'put' });
// }

// export function del<T = any>(config: AxiosRequestConfig): Promise<T> {
//   return request({ ...config, method: 'delete' });
// }

// export default request;

export { requestInterceptors, responseInterceptors }
