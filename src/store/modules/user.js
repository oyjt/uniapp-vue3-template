import {
  defineStore
} from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    userName: "",
    userPassWord: ""
  }),
  getters: {
    getUserName() {
      return this.userName
    },
    getPwd() {
      return this.userPassWord
    }

  },
  actions: {
    setUserName(name) {
      uni.setStorageSync('userName', name)
      this.userName = name
    },
    setPwd(pwd) {
      this.userPassWord = pwd
    }
  },
})

export default useUserStore