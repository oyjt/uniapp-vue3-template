<template>
  <view class="page-wrap">
    <u-navbar title="" placeholder left-icon="" right-icon="camera-fill" />
    <view class="flex items-center pb-30rpx pl-30rpx pr-20rpx">
      <view class="mr-10rpx">
        <u-avatar src="/static/images/logo.png" size="70" />
      </view>
      <view class="flex-1">
        <view class="pb-20rpx text-36rpx">
          uni-app
        </view>
        <view class="u-tips-color text-28rpx" @click="toCopy">
          微信号:uni-app
        </view>
      </view>
      <view class="ml-10rpx p-10rpx">
        <u-icon name="scan" color="#969799" />
      </view>
      <view class="ml-10rpx p-10rpx">
        <u-icon name="arrow-right" color="#969799" />
      </view>
    </view>

    <view class="mt-20rpx">
      <u-cell-group>
        <u-cell icon="rmb-circle" title="支付" is-link />
      </u-cell-group>
    </view>

    <view class="mt-20rpx">
      <u-cell-group>
        <u-cell icon="star" title="收藏" is-link />
        <u-cell icon="photo" title="相册" is-link />
        <u-cell icon="coupon" title="卡券" is-link />
        <u-cell icon="heart" title="关注" is-link />
      </u-cell-group>
    </view>

    <view class="mt-20rpx">
      <u-cell-group>
        <u-cell icon="setting" title="设置" is-link />
      </u-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useClipboard, usePermission } from '@/hooks';

const { setClipboardData, getClipboardData } = useClipboard();

// 复制
const toCopy = async () => {
  await setClipboardData({ data: '1234567890' });
  const data = await getClipboardData();
  console.log('[ data ] >', data);
};

// 登录鉴权，微信小程序端点击tabbar的底层逻辑不触发uni.switchTab，需要在页面onShow生命周期中校验权限
onShow(async () => {
  const hasPermission = await usePermission();
  console.log(hasPermission ? '已登录' : '未登录，拦截跳转');
});
</script>
