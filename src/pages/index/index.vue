<template>
  <view class="content">
    <up-image class="logo" src="/static/logo.png" width="200rpx" height="200rpx"></up-image>
    <view class="text-area">
      <up-text class="title" :text="title"></up-text>
    </view>
  </view>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';

const title = ref<string>('');
title.value = import.meta.env.VITE_APP_TITLE;

const store = useUserStore();
console.log('store.user_name', store.user_name);
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  margin: 200rpx auto 50rpx;
  width: 200rpx;
  height: 200rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
