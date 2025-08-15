<template>
  <view class="min-h-screen flex flex-col items-center">
    <image class="mb-50rpx mt-200rpx h-200rpx w-200rpx" src="@/static/images/logo.png" width="200rpx" height="200rpx" />
    <view class="flex justify-center">
      <text class="font-size-36rpx">
        {{ $t('home.intro') }}
      </text>
    </view>
    <view class="mt-100rpx flex gap-30rpx">
      <lang-select />
      <view class="cursor-pointer" @click="toGithub">
        <view class="i-mdi-github text-40rpx" />
      </view>
    </view>

    <!-- 主题预览 -->
    <view class="mt-100rpx">
      <view class="rounded-12rpx bg-#f8f9fa p-30rpx shadow-md">
        <theme-picker class="mb-10rpx" />
        <view class="u-border-top pt-20rpx">
          主题预览
        </view>
        <view class="flex flex-col gap-10rpx py-20rpx">
          <view class="flex items-center">
            图标：<text class="i-mdi-yin-yang text-36rpx color-primary" />
          </view>
          <view class="flex items-center">
            文字：<up-text type="primary" text="主要文字" size="18" />
          </view>
          <view class="flex items-center">
            按钮：<view><u-button type="primary" text="主要按钮" shape="circle" /></view>
          </view>
        </view>
      </view>
    </view>

    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <agree-privacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
// #ifdef MP-WEIXIN
import { useShare } from '@/hooks';
// #endif
import { useUserStore } from '@/store';

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

const showAgreePrivacy = ref(false);

const userStore = useUserStore();
console.log('userStore.user_name', userStore.user_name);

// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}

// 打开github
function toGithub() {
  if (window?.open) {
    window.open('https://github.com/oyjt/uniapp-vue3-template');
  }
  else {
    uni.$u.toast('请使用浏览器打开');
  }
}
</script>
