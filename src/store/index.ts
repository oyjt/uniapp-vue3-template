import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'

const store = createPinia()
// pinia数据持久化
store.use(piniaPersist)
export default store
