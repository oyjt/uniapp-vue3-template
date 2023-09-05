// 引入配置
import type { App } from 'vue'
import { requestInterceptors, responseInterceptors } from './interceptors'

// 引入拦截器配置
//  初始化请求配置
function initRequest(vm: App<Element>) {
  uni.$u.http.setConfig((defaultConfig: { baseURL: string }) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = import.meta.env.VITE_APP_BASE_API
    return defaultConfig
  })
  requestInterceptors(vm)
  responseInterceptors(vm)
}
export { initRequest }
