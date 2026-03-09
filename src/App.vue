<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { useAppStore } from '@/store'
// #ifdef MP-WEIXIN
import { mpUpdate } from '@/utils/index'
// #endif

const appStore = useAppStore()

onLaunch(() => {
  console.log('App Launch')

  // 初始化系统信息
  appStore.initSystemInfo()

  // #ifdef MP-WEIXIN
  mpUpdate()
  // #endif
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';

/* 隐藏原生 tabbar，使用自定义 tabbar */
// #ifdef H5
.uni-tabbar-bottom {
  display: none !important;
}
// #endif
</style>
