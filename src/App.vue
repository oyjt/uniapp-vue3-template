<script>
import { mpUpdate } from '@/utils/index';
export default {
  onLaunch: function () {
    console.log('App Launch');
    console.log('[ VITE_ENV ] >', process.env.VITE_ENV);
    // #ifdef MP
    mpUpdate();
    // #endif
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'uview-plus/index.scss';
@import '@/static/styles/common.scss';
</style>
