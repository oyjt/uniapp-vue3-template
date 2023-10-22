import { defineStore } from 'pinia';
import type { UserState, providerType } from './types';
import {
  getUserProfile,
  loginByCode,
  login as userLogin,
  logout as userLogout,
} from '@/api/user/index';
import { clearToken, setToken } from '@/utils/auth';
import type { LoginParams } from '@/api/user/types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_id: '',
    user_name: '江阳小道',
    avatar: '',
    token: '',
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    async info() {
      const result = await getUserProfile();
      this.setInfo(result);
    },
    // 异步登录并存储token
    login(loginForm: LoginParams) {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await userLogin(loginForm);
          const token = result?.token;
          if (token) {
            setToken(token);
          }
          resolve(result);
        } catch (error) {
          reject(error)
        }
      });
    },
    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
    },
    // 小程序授权登录
    authLogin(provider: providerType = 'weixin') {
      return new Promise((resolve, reject) => {
        uni.login({
          provider,
          success: async (result: UniApp.LoginRes) => {
            if (result.code) {
              const res = await loginByCode({ code: result.code });
              resolve(res);
            } else {
              reject(new Error(result.errMsg));
            }
          },
          fail: (err: any) => {
            console.error(`login error: ${err}`);
            reject(err);
          },
        });
      });
    },
  },
});

export default useUserStore;
