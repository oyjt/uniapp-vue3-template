<template>
  <view class="flex flex-col items-center justify-center">
    <image
      class="mb-50rpx mt-200rpx h-200rpx w-200rpx"
      src="@/static/images/logo.png"
      width="200rpx"
      height="200rpx"
    />
    <view class="flex justify-center">
      <text class="font-size-36rpx color-gray-700">
        {{ title }}
      </text>
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <agree-privacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
// #ifdef MP-WEIXIN
import { useShare } from '@/hooks';
// #endif

// #ifdef MP-WEIXIN
// 分享使用示例
const { onShareAppMessage, onShareTimeline } = useShare({
  title: '首页',
  path: 'pages/tab/home/index',
  imageUrl: '',
});
onShareAppMessage();
onShareTimeline();
// #endif

const title = ref<string>();
title.value = import.meta.env.VITE_APP_TITLE;

const store = useUserStore();
console.log('store.user_name', store.user_name);

const showAgreePrivacy = ref(false);
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}
</script>
