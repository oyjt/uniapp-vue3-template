import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import useActivityStore from './modules/activity'
import useAppStore from './modules/app'
import useCompetitionStore from './modules/competition'
import useMatchStore from './modules/match'
import useUserStore from './modules/user'

function setupStore(app: App) {
  const store = createPinia()

  const piniaPersist = createPersistedState({
    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  })
  store.use(piniaPersist)

  app.use(store)
}

export { useActivityStore, useAppStore, useCompetitionStore, useMatchStore, useUserStore }
export default setupStore
