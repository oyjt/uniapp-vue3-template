import {
  defineStore
} from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    username: "江阳小道",
    passWord: ""
  }),
  getters: {
    getUserName() {
      return this.username
    },
    getPwd() {
      return this.passWord
    }

  },
  actions: {
    setUserName(name) {
      this.username = name
    },
    setPwd(pwd) {
      this.passWord = pwd
    }
  },
  persist: {
    enabled: true,
  }
})

export default useUserStore
