import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist-uni'
import useUserStore from './modules/user'

const pinia = createPinia()
pinia.use(piniaPersist)

export { useUserStore }
export default pinia
