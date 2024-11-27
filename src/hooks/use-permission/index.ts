import { hasPerm } from '@/plugins/permission';
import { currentRoute } from '@/router';

// 对某些特殊场景需要在页面onShow生命周期中校验权限:
// 1.微信小程序端点击tabbar的底层逻辑不触发uni.switchTab
// 2.h5在浏览器地址栏输入url后跳转不触发uni的路由api
// 3.首次启动加载的页面不触发uni的路由api
export default async function usePermission() {
  return hasPerm(currentRoute());
}
