<template>
  <view class="mb-20rpx flex items-center gap-2">
    <view>
      请选择主题颜色：
    </view>
    <view
      v-for="color in colors"
      :key="color"
      class="h-32rpx w-32rpx cursor-pointer border border-gray-200 rounded-full"
      :style="{ backgroundColor: color }"
      @click="changeTheme(color)"
    />
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';

const appStore = useAppStore();

const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];

function changeTheme(color: string) {
  appStore.setTheme(color);
}
</script>
