<template>
  <view class="min-h-screen bg-[#f8f8f8] pb-40rpx">
    <view class="flex items-center bg-white p-40rpx">
      <view class="mr-30rpx">
        <wd-img round width="80" height="80" src="/static/images/logo.png" />
      </view>
      <view>
        <view class="mb-10rpx text-36rpx font-500">
          用户名
        </view>
        <view class="text-28rpx text-[var(--wd-text-color-secondary)]" @click="toCopy">
          ID：123456
        </view>
      </view>
    </view>

    <view class="my-20rpx bg-white">
      <view class="flex items-center p-30rpx text-32rpx" @click="toScan">
        <wd-icon name="scan1" size="24" />
        <text class="ml-20rpx flex-1">
          扫一扫
        </text>
        <wd-icon class="text-[var(--wot-cell-arrow-color,rgba(0,0,0,0.25))]" name="arrow-right" />
      </view>
    </view>

    <wd-cell-group>
      <wd-cell title="支付" is-link>
        <template #icon>
          <wd-icon class="mr-10px" name="money-circle" size="24" />
        </template>
      </wd-cell>
    </wd-cell-group>

    <wd-cell-group>
      <wd-cell title="收藏" is-link>
        <template #icon>
          <wd-icon class="mr-10px" name="star" size="24" />
        </template>
      </wd-cell>
      <wd-cell title="相册" is-link>
        <template #icon>
          <wd-icon class="mr-10px" name="image" size="24" />
        </template>
      </wd-cell>
      <wd-cell title="卡券" is-link>
        <template #icon>
          <wd-icon class="mr-10px" name="creditcard" size="24" />
        </template>
      </wd-cell>
      <wd-cell title="关注" is-link>
        <template #icon>
          <wd-icon class="mr-10px" name="heart" size="24" />
        </template>
      </wd-cell>
    </wd-cell-group>

    <wd-cell-group>
      <wd-cell title="设置" is-link>
        <template #icon>
          <wd-icon class="mr-10px" name="setting1" size="24" />
        </template>
      </wd-cell>
    </wd-cell-group>
  </view>
</template>

<script setup lang="ts">
const toCopy = () => {
  uni.setClipboardData({
    data: '123456',
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'none',
      });
    },
  });
};

const toScan = () => {
  uni.scanCode({
    success: (res) => {
      console.log('扫码结果：', res);
    },
  });
};
</script>

<style>
:deep(.wd-cell-group) {
  margin-bottom: 20rpx;
}
</style>
