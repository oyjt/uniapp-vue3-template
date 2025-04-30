<template>
  <view class="flex flex-col items-center justify-center">
    <image class="mb-[50rpx] mt-[200rpx] size-[200rpx]" src="@/static/images/logo.png" width="200rpx" height="200rpx" />
    <view class="px-[30rpx] text-center">
      <view class="fs-[36rpx] color-gray-700">
        uniapp 团队协作开发实践模板(Vue3)
      </view>
      <view class="mt-20rpx color-gray-500">
        使用 uniapp+vite+vue3+typescript+uv-ui+tailwindcss 搭建的适合团队协作的快速开发模版
      </view>

      <view class="flex flex-wrap items-center justify-center gap-2 py-4">
        <Button>按钮</Button>
        <Button variant="secondary">
          次要按钮
        </Button>
        <Button variant="destructive">
          危险操作
        </Button>
        <Button variant="outline">
          轮廓
        </Button>
        <Button variant="ghost">
          幽灵按钮
        </Button>
        <Button variant="link">
          链接
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight class="size-4" />
        </Button>
        <Button>
          <MailOpen class="mr-2 size-4" /> 使用邮箱登录
        </Button>
        <Button disabled>
          <Loader2 class="mr-2 size-4 animate-spin" />
          请稍等
        </Button>
        <Button as-child>
          <navigator url="/pages/common/login/index">
            跳转登录
          </navigator>
        </Button>
      </view>
    </view>
    <view class="mt-[50rpx]">
      <view class="flex cursor-pointer items-center underline-offset-4 underline text-[#3c9cff]" @click="toGithub">
        <text>点击跳转项目地址</text>
        <text class="i-lucide-github text-[40rpx]" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { ChevronRight, Loader2, MailOpen } from 'lucide-vue-next'

const githubLink = 'https://github.com/oyjt/uniapp-vue3-template'

const userStore = useUserStore()
console.log('userStore.user_name', userStore.user_name)

// 打开github
function toGithub() {
  if (window?.open) {
    window.open(githubLink)
  }
  else {
    uni.$uv.toast('请使用浏览器打开')
  }
}
</script>
