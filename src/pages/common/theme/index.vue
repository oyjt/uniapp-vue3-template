<template>
  <view class="min-h-screen theme-bg p-5">
    <view class="mx-auto max-w-750rpx">
      <!-- 页面标题 -->
      <view class="py-10 text-center">
        <text class="text-36rpx theme-text font-bold">
          主题设置
        </text>
      </view>

      <!-- 主题模式选择 -->
      <view class="mb-10">
        <view class="mb-5 px-5 text-28rpx theme-text-content font-medium">
          主题模式
        </view>
        <view class="overflow-hidden rounded-12rpx theme-bg-secondary">
          <view
            v-for="option in themeOptions" :key="option.value"
            class="flex items-center border-b px-5 py-7.5 transition-all duration-300"
            :class="{ 'theme-bg-secondary': themeMode === option.value }" @click="setThemeMode(option.value)"
          >
            <view class="mr-5">
              <view class="text-48rpx" :class="option.icon" />
            </view>
            <view class="flex-1">
              <text class="mb-2 block text-28rpx theme-text font-medium">
                {{ option.label }}
              </text>
              <text class="block text-24rpx theme-text-tips">
                {{ option.description }}
              </text>
            </view>
            <view v-if="themeMode === option.value" class="ml-5">
              <u-icon name="checkmark" color="var(--theme-primary)" size="20" />
            </view>
          </view>
        </view>
      </view>

      <!-- 主题预览 -->
      <view class="mb-10">
        <view class="mb-5 px-5 text-28rpx theme-text-content font-medium">
          主题预览
        </view>
        <view class="rounded-12rpx theme-bg-secondary p-7.5">
          <view class="mb-7.5">
            <text class="text-28rpx theme-text font-medium">
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
            <text class="text-28rpx theme-text font-medium">
              主要文字颜色
            </text>
            <text class="text-26rpx theme-text-content">
              内容文字颜色
            </text>
            <text class="text-24rpx theme-text-tips">
              提示文字颜色
            </text>
          </view>
        </view>
      </view>

      <!-- 快速切换按钮 -->
      <view class="py-10 text-center">
        <u-button :text="isDark ? '切换到浅色模式' : '切换到深色模式'" type="primary" @click="toggleTheme" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ThemeMode } from '@/utils/theme/types';
import { useTheme } from '@/hooks';

const { themeMode, isDark, setThemeMode, toggleTheme } = useTheme();

// 主题选项
const themeOptions = [
  {
    label: '浅色模式',
    value: 'light' as ThemeMode,
    icon: 'i-mdi-white-balance-sunny',
    description: '适合明亮环境使用',
  },
  {
    label: '深色模式',
    value: 'dark' as ThemeMode,
    icon: 'i-mdi-moon-and-stars',
    description: '适合暗光环境使用',
  },
  {
    label: '跟随系统',
    value: 'auto' as ThemeMode,
    icon: 'i-mdi-settings',
    description: '自动跟随系统主题',
  },
];
</script>
