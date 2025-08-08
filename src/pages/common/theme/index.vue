<template>
  <view class="theme-page theme-bg">
    <view class="container">
      <!-- 页面标题 -->
      <view class="header">
        <text class="title theme-text">
          主题设置
        </text>
      </view>

      <!-- 主题模式选择 -->
      <view class="section">
        <view class="section-title theme-text-content">
          主题模式
        </view>
        <view class="theme-options">
          <view
            v-for="option in themeOptions"
            :key="option.value"
            class="theme-option"
            :class="{ active: themeMode === option.value }"
            @click="setThemeMode(option.value)"
          >
            <view class="option-icon">
              <u-icon :name="option.icon" size="24" />
            </view>
            <view class="option-content">
              <text class="option-title theme-text">
                {{ option.label }}
              </text>
              <text class="option-desc theme-text-tips">
                {{ option.description }}
              </text>
            </view>
            <view v-if="themeMode === option.value" class="option-check">
              <u-icon name="checkmark" color="var(--theme-primary)" size="20" />
            </view>
          </view>
        </view>
      </view>

      <!-- 主题预览 -->
      <view class="section">
        <view class="section-title theme-text-content">
          主题预览
        </view>
        <view class="theme-preview theme-border theme-bg-secondary">
          <view class="preview-header">
            <text class="preview-title theme-text">
              示例内容
            </text>
          </view>
          <view class="preview-content">
            <view class="preview-item">
              <u-button type="primary" text="主要按钮" />
            </view>
            <view class="preview-item">
              <u-button type="success" text="成功按钮" />
            </view>
            <view class="preview-item">
              <u-button type="warning" text="警告按钮" />
            </view>
            <view class="preview-item">
              <u-button type="error" text="错误按钮" />
            </view>
          </view>
          <view class="preview-text">
            <text class="text-main theme-text">
              主要文字颜色
            </text>
            <text class="text-content theme-text-content">
              内容文字颜色
            </text>
            <text class="text-tips theme-text-tips">
              提示文字颜色
            </text>
          </view>
        </view>
      </view>

      <!-- 快速切换按钮 -->
      <view class="quick-toggle">
        <u-button
          :icon="isDark ? 'sun' : 'moon'"
          :text="isDark ? '切换到浅色模式' : '切换到深色模式'"
          type="primary"
          @click="toggleTheme"
        />
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
    icon: 'sun',
    description: '适合明亮环境使用',
  },
  {
    label: '深色模式',
    value: 'dark' as ThemeMode,
    icon: 'moon',
    description: '适合暗光环境使用',
  },
  {
    label: '跟随系统',
    value: 'auto' as ThemeMode,
    icon: 'settings',
    description: '自动跟随系统主题',
  },
];
</script>

<style lang="scss" scoped>
.theme-page {
  min-height: 100vh;
  padding: 20rpx;
}

.container {
  max-width: 750rpx;
  margin: 0 auto;
}

.header {
  padding: 40rpx 0;
  text-align: center;

  .title {
    font-size: 36rpx;
    font-weight: bold;
  }
}

.section {
  margin-bottom: 40rpx;

  .section-title {
    font-size: 28rpx;
    font-weight: 500;
    margin-bottom: 20rpx;
    padding: 0 20rpx;
  }
}

.theme-options {
  background: var(--theme-bg-color);
  border-radius: 12rpx;
  overflow: hidden;
  border: 1px solid var(--theme-border-color);
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 30rpx 20rpx;
  border-bottom: 1px solid var(--theme-border-color-light);
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &.active {
    background: var(--theme-bg-color-secondary);
  }

  .option-icon {
    margin-right: 20rpx;
  }

  .option-content {
    flex: 1;

    .option-title {
      font-size: 28rpx;
      font-weight: 500;
      display: block;
      margin-bottom: 8rpx;
    }

    .option-desc {
      font-size: 24rpx;
      display: block;
    }
  }

  .option-check {
    margin-left: 20rpx;
  }
}

.theme-preview {
  padding: 30rpx;
  border-radius: 12rpx;
  border: 1px solid var(--theme-border-color);

  .preview-header {
    margin-bottom: 30rpx;

    .preview-title {
      font-size: 28rpx;
      font-weight: 500;
    }
  }

  .preview-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 30rpx;

    .preview-item {
      flex: 1;
      min-width: 120rpx;
    }
  }

  .preview-text {
    display: flex;
    flex-direction: column;
    gap: 10rpx;

    .text-main {
      font-size: 28rpx;
      font-weight: 500;
    }

    .text-content {
      font-size: 26rpx;
    }

    .text-tips {
      font-size: 24rpx;
    }
  }
}

.quick-toggle {
  padding: 40rpx 0;
  text-align: center;
}
</style>
