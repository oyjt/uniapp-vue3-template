import { getToken } from '@/utils/auth';

// 登录页面
const loginPage = '/pages/common/login/index';
// 页面白名单
const whiteList = ['/', '/pages/common/login/index', '/pages/tab/home/index'];

// 检查地址白名单
function checkWhite(url: string) {
  const path = url.split('?')[0];
  return whiteList.includes(path);
}

// 页面跳转验证拦截器
const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];
list.forEach((item) => {
  uni.addInterceptor(item, {
    invoke(to) {
      if (getToken()) {
        if (to.url === loginPage)
          uni.reLaunch({ url: '/' });

        return true;
      }
      else {
        if (checkWhite(to.url))
          return true;

        uni.reLaunch({ url: loginPage });
        return false;
      }
    },
    fail(err) {
      console.log(err);
    },
  });
});
