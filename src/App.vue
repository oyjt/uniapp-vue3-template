<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { mpUpdate } from '@/utils/index';
import { setupPermission } from '@/permission';

onLaunch(() => {
  console.log('App Launch');
  console.log('[ VITE_APP_ENV ] >', import.meta.env.VITE_APP_ENV);
  // #ifdef MP
  mpUpdate();
  // #endif

  setupPermission();
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
/* 每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
