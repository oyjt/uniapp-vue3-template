<template>
  <view class="theme-bg min-h-screen p-5" :class="themeClass">
    <!-- 主题模式选择 -->
    <view class="mb-5">
      <view class="theme-text-content mb-5 px-5 text-28rpx font-medium">
        主题模式
      </view>
      <view class="theme-bg-secondary overflow-hidden rounded-12rpx">
        <view
          v-for="option in themeOptions" :key="option.value"
          class="flex items-center border-b px-5 py-7.5 transition-all duration-300"
          :class="{ 'theme-bg-secondary': theme === option.value }" @click="setTheme(option.value)"
        >
          <view class="mr-5">
            <view class="text-48rpx c-primary" :class="option.icon" />
          </view>
          <view class="flex-1">
            <text class="theme-text mb-2 block text-28rpx font-medium">
              {{ option.label }}
            </text>
            <text class="theme-text-tips block text-24rpx">
              {{ option.description }}
            </text>
          </view>
          <view v-if="theme === option.value" class="ml-5">
            <u-icon name="checkmark" color="var(--theme-primary)" size="20" />
          </view>
        </view>
      </view>
    </view>

    <!-- 主题预览 -->
    <view class="mb-5">
      <view class="theme-text-content mb-5 px-5 text-28rpx font-medium">
        主题预览
      </view>
      <view class="theme-bg-secondary rounded-12rpx p-7.5">
        <view class="mb-7.5">
          <text class="theme-text text-28rpx font-medium">
            示例内容
          </text>
        </view>
        <view class="mb-7.5 flex flex-wrap gap-5">
          <view class="min-w-120rpx flex-1">
            <u-button type="primary" text="主要按钮" />
          </view>
          <view class="min-w-120rpx flex-1">
            <u-button type="success" text="成功按钮" />
          </view>
          <view class="min-w-120rpx flex-1">
            <u-button type="warning" text="警告按钮" />
          </view>
          <view class="min-w-120rpx flex-1">
            <u-button type="error" text="错误按钮" />
          </view>
        </view>
        <view class="flex flex-col gap-2.5">
          <text class="theme-text text-28rpx font-medium">
            主要文字颜色
          </text>
          <text class="theme-text-content text-26rpx">
            内容文字颜色
          </text>
          <text class="theme-text-tips text-24rpx">
            提示文字颜色
          </text>
        </view>
      </view>
    </view>

    <!-- 快速切换按钮 -->
    <view class="py-5 text-center">
      <u-button :text="isDark ? '切换到亮色主题' : '切换到暗色主题'" type="primary" @click="toggleTheme" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ThemeMode } from '@/store/modules/app/types';
import { useTheme } from '@/hooks';
import { useAppStore } from '@/store';

const { theme, isDark, setTheme, toggleTheme } = useTheme();

const appStore = useAppStore();
const themeClass = computed(() => `theme-${appStore.theme}`);

// 主题选项
const themeOptions = [
  {
    label: '亮色主题',
    value: 'light' as ThemeMode,
    icon: 'i-mdi-white-balance-sunny',
    description: '适合明亮环境使用',
  },
  {
    label: '暗色主题',
    value: 'dark' as ThemeMode,
    icon: 'i-mdi-moon-and-stars',
    description: '适合暗光环境使用',
  },
];
</script>
