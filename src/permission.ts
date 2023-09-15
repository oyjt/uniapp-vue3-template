import { getToken } from '@/utils/auth';

const whiteList = ['/pages/index/index'];

function hasPermission(path: string) {
  return getToken() || whiteList.includes(path);
}

export function setupPermission() {
  const { path } = uni.getLaunchOptionsSync();

  if (!hasPermission(path)) {
    uni.reLaunch({
      url: '/pages/login/index',
    });
  }
}

// navigateTo intercept
uni.addInterceptor('navigateTo', {
  invoke(args) {
    if (!hasPermission(args.url)) {
      uni.reLaunch({
        url: '/pages/login/index',
      });
    }
  },
  fail(err) {
    console.error('navigateTo fail', err);
  },
});

// switchTab intercept
uni.addInterceptor('switchTab', {
  invoke(args) {
    if (!hasPermission(args.url)) {
      uni.reLaunch({
        url: '/pages/login/index',
      });
    }
  },
  fail(err) {
    console.error('redirectTo fail', err);
  },
});
