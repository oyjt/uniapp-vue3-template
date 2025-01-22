<template>
  <view class="flex flex-col items-center justify-center">
    <image
      class="mb-50rpx mt-200rpx h-200rpx w-200rpx"
      src="@/static/images/logo.png"
      width="200rpx"
      height="200rpx"
    />
    <view class="px-30rpx text-center">
      <view class="font-size-36rpx color-gray-700">
        uniapp 团队协作开发实践模板(Vue3)
      </view>
      <view class="mt-20rpx color-gray-500">
        使用 uniapp+vite+vue3+typescript+uview-plus+unocss 搭建的适合团队协作的快速开发模版
      </view>
    </view>
    <view class="mt-50rpx">
      <view center cursor-pointer @click="toGithub">
        <up-text mode="link" text="点击跳转项目地址" :href="githubLink" />
        <view class="i-mdi-github text-40rpx" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';

const githubLink = 'https://github.com/oyjt/uniapp-vue3-template';

const userStore = useUserStore();
console.log('userStore.user_name', userStore.user_name);

// 打开github
function toGithub() {
  if (window?.open) {
    window.open(githubLink);
  }
  else {
    uni.$u.toast('请使用浏览器打开');
  }
}
</script>
