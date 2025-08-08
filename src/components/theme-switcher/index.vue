<template>
  <view @click="toggleTheme()">
    <view class="text-xl" :class="appStore.getIsDark ? 'i-mdi-white-balance-sunny' : 'i-mdi-moon-and-stars'" />
  </view>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';

const appStore = useAppStore();

const toggleTheme = () => {
  appStore.toggleTheme();
};
</script>
