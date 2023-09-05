import { defineStore } from 'pinia'
import type { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user_name: '江阳小道',
    avatar: ''
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state }
    }
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    }
    // // 重置用户信息
    // resetInfo() {
    //   this.$reset();
    // },
    // // 获取用户信息
    // async info() {
    //   const result = await getUserProfile();
    //   this.setInfo(result);
    // },
    // // 异步登录并存储token
    // async login(loginForm: LoginData) {
    //   const result = await userLogin(loginForm);
    //   const token = result?.token;
    //   if (token) {
    //     setToken(token);
    //   }
    //   return result;
    // },
    // // Logout
    // async logout() {
    //   await userLogout();
    //   this.resetInfo();
    //   clearToken();
    // },
  },
  persist: {
    enabled: true
  }
})

export default useUserStore
