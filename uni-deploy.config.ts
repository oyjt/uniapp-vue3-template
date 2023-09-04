import { defineConfig } from '@uni-helper/uni-deploy';

export default defineConfig({
  /* 通用配置 */
  // 当前进程的工作目录，默认为执行目录
  cwd: process.cwd(),

  /* 应用平台 */
  // 微信小程序配置
  'mp-weixin': {
    appid: '',
  },
})
