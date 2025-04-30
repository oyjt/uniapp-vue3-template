<template>
  <view class="page-wrap">
    <uv-navbar title="" placeholder left-icon="" right-icon="camera-fill" />
    <view class="flex items-center bg-white py-[30rpx] pl-[30rpx] pr-[20rpx]">
      <view class="mr-[20rpx]">
        <Avatar class="size-[140rpx]">
          <AvatarImage :src="Logo" />
          <AvatarFallback>头像</AvatarFallback>
        </Avatar>
      </view>
      <view class="flex-1">
        <view class="pb-[20rpx] text-[36rpx]">
          uni-app
        </view>
        <view class="u-tips-color text-[28rpx]" @click="toCopy">
          微信号:uni-app
        </view>
      </view>
      <view class="ml-[10rpx] p-[10rpx]">
        <view class="i-lucide-scan-line text-[#969799] text-base"></view>
      </view>
      <view class="ml-[10rpx] p-[10rpx]">
        <view class="i-lucide-chevron-right text-[#969799] text-base"></view>
      </view>
    </view>

    <view class="mt-[20rpx] bg-white u-border-y">
      <view class="flex items-center py-[26rpx] px-[30rpx] text-[#606266]" hover-class="u-hover-class">
        <view class="i-lucide-receipt-japanese-yen text-[36rpx] mr-[8rpx]"></view>
        <view class="flex-1 text-[30rpx]">支付</view>
        <view class="i-lucide-chevron-right text-[#969799] text-base ml-[8rpx]"></view>
      </view>
    </view>

    <view class="mt-[20rpx] bg-white u-border-y u-divide-y">
      <view class="flex items-center py-[26rpx] px-[30rpx] text-[#606266]" hover-class="u-hover-class">
        <view class="i-lucide-star text-[36rpx] mr-[8rpx]"></view>
        <view class="flex-1 text-[30rpx]">收藏</view>
        <view class="i-lucide-chevron-right text-[#969799] text-base ml-[8rpx]" hover-class="u-hover-class"></view>
      </view>
      <view class="flex items-center py-[26rpx] px-[30rpx] text-[#606266]">
        <view class="i-lucide-image text-[36rpx] mr-[8rpx]"></view>
        <view class="flex-1 text-[30rpx]">相册</view>
        <view class="i-lucide-chevron-right text-[#969799] text-base ml-[8rpx]"></view>
      </view>
      <view class="flex items-center py-[26rpx] px-[30rpx] text-[#606266]" hover-class="u-hover-class">
        <view class="i-lucide-ticket text-[36rpx] mr-[8rpx]"></view>
        <view class="flex-1 text-[30rpx]">卡券</view>
        <view class="i-lucide-chevron-right text-[#969799] text-base ml-[8rpx]"></view>
      </view>
      <view class="flex items-center py-[26rpx] px-[30rpx] text-[#606266]" hover-class="u-hover-class">
        <view class="i-lucide-heart text-[36rpx] mr-[8rpx]"></view>
        <view class="flex-1 text-[30rpx]">关注</view>
        <view class="i-lucide-chevron-right text-[#969799] text-base ml-[8rpx]"></view>
      </view>
    </view>

    <view class="mt-[20rpx] bg-white u-border-y">
      <view class="flex items-center py-[26rpx] px-[30rpx] text-[#606266]" hover-class="u-hover-class">
        <view class="i-lucide-settings text-[36rpx] mr-[8rpx]"></view>
        <view class="flex-1 text-[30rpx]">设置</view>
        <view class="i-lucide-chevron-right text-[#969799] text-base ml-[8rpx]"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Logo from '@/static/images/logo.png'
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
