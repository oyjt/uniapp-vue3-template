<template>
  <view class="min-h-screen flex flex-col bg-white">
    <wd-navbar left-arrow @click-left="handleBack" />
    <wd-status-tip image="/static/images/404.png" tip="页面不存在" image-size="380" />
  </view>
</template>

<script setup lang="ts">
import { HOME_PATH } from '@/router';

function handleBack() {
  uni.$u.route({
    type: 'switchTab',
    url: HOME_PATH,
  });
}
</script>
