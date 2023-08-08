// 引入uView对小程序分享的mixin封装
import mpShare from 'uview-plus/libs/mixin/mpShare.js';

const initMixin = (app) => {
  // #ifdef MP
  app.mixin(mpShare)
  // #endif
}

export {
  initMixin
}
