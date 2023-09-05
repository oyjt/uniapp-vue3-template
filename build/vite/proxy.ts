import type { ProxyOptions } from 'vite'
import { API_BASE_URL, API_TARGET_URL } from '../constant'

type ProxyTargetList = Record<string, ProxyOptions>

const init: ProxyTargetList = {
  // test
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: path => path.replace(new RegExp(`^${API_BASE_URL}`), '')
  }
}

export default init
