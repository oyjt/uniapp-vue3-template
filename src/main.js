import App from "@/App.vue";
import store from "@/store"
// 引入全局uview-plus
import uviewPlus from "uview-plus";
// 引入mixin封装
import {
  initMixin
} from '@/common/mixin'

// #ifdef VUE3
import {
  createSSRApp
} from "vue";
// 引入请求封装
import {
  initRequest
} from './utils/request/index'
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  app.use(store)

  initRequest(app)
  initMixin(app)
  return {
    app
  };
}
