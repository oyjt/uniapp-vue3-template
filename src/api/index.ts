// 引入配置
import type { App } from 'vue'
import * as common from './modules/common'
import * as user from './modules/user'

// api 接口管理
function initApi(app: App<Element>) {
  app.config.globalProperties.$api = {
    // modules import
    common,
    user
  }
}

export default initApi
