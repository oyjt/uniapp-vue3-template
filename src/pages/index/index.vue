<template>
  <view class="content">
    <up-image class="logo" src="/static/logo.png" width="200rpx" height="200rpx"></up-image>
    <view class="text-area">
      <up-text class="title" :text="title"></up-text>
    </view>
  </view>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'

const title = ref('Hello')

const store = useUserStore()
console.log('store.username', store.username)

console.log('[ VITE_APP_BASE_API ] >', import.meta.env.VITE_APP_BASE_API)
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
