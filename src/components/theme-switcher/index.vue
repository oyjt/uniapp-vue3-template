<template>
  <view @click="themeStore.toggleTheme()">
    <view v-if="themeStore.theme === 'light'" class="i-mdi-moon-and-stars text-xl" />
    <view v-else class="i-mdi-white-balance-sunny text-xl" />
  </view>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store';

const themeStore = useThemeStore();
</script>
