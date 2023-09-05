import type { ProxyOptions } from 'vite'
import { API_PREFIX, API_TARGET_URL } from '../constant'

type ProxyTargetList = Record<string, ProxyOptions>

const init: ProxyTargetList = {
  // test
  [API_PREFIX]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: path => path.replace(new RegExp(`^${API_PREFIX}`), '')
  }
}

export default init
