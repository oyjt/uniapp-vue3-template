// 引入uView对小程序分享的mixin封装
import mpShare from 'uview-plus/libs/mixin/mpShare.js'
import type { App } from 'vue'

function initMixin(app: App<Element>) {
  // #ifdef MP
  app.mixin(mpShare)
  // #endif
}

export { initMixin }
