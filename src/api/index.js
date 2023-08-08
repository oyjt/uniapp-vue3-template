// 引入配置
import * as common from './modules/common.js';
import * as user from './modules/user.js';

// api 接口管理
const install = (Vue, vm) => {
  Vue.prototype.$api = {
    // modules import
    common,
    user,
  };
}

export default {
  install
}