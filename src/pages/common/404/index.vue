<template>
  <div class="not-found">
    <u-navbar left-icon-size="40rpx" @left-click="handleBack" />
    <u-empty
      mode="page"
      text-size="20"
      text="页面不存在"
      icon="/static/images/404.png"
      width="380"
      height="380"
    />
  </div>
</template>

<script lang="ts" setup>
import { HOME_PATH } from '@/router';

function handleBack() {
  uni.$u.route({
    type: 'switchTab',
    url: HOME_PATH,
  });
}
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;
}
</style>
