import { UserApi } from '@/api';
import { clearToken, setToken } from '@/utils/auth';

import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    user_id: '',
    user_name: '江阳小道',
    avatar: '',
    token: '',
  }),
  getters: {
    userInfo(state) { return { ...state }; },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await UserApi.profile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    login(loginForm) {
      return new Promise((resolve, reject) => {
        UserApi.login(loginForm).then((res) => {
          const token = res.token;
          if (token) {
            setToken(token);
          }
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // Logout
    async logout() {
      await UserApi.logout();
      this.resetInfo();
      clearToken();
    },
    // 小程序授权登录
    authLogin(provider = 'weixin') {
      return new Promise((resolve, reject) => {
        uni.login({
          provider,
          success: async (result) => {
            if (result.code) {
              const res = await UserApi.loginByCode({ code: result.code });
              resolve(res);
            }
            else {
              reject(new Error(result.errMsg));
            }
          },
          fail: (err) => {
            console.error(`login error: ${err}`);
            reject(err);
          },
        });
      });
    },
  },
  persist: true,
});

export default useUserStore;
