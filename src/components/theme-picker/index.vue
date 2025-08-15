<template>
  <view class="flex flex-wrap gap-3">
    <view
      v-for="(item, index) in colors"
      :key="index"
      class="mb-10rpx h-40rpx w-40rpx center cursor-pointer border-4rpx border-gray-300 rounded-4rpx border-solid"
      :class="{ 'border-white': primaryColor === item }"
      :style="{ backgroundColor: item }"
      @click="changeTheme(item)"
    >
      <view v-if="primaryColor === item" class="i-mdi-check text-32rpx c-#fff" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';

const appStore = useAppStore();

const colors = ['#21d59d', '#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'];

const primaryColor = computed(() => appStore.getTheme.primary);

function changeTheme(color: string) {
  appStore.setTheme({
    primary: color,
  });
}
</script>
