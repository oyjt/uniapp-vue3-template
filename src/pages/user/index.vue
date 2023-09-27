<template>
  <view class="page-wrap">
    <u-navbar title="" placeholder left-icon="" right-icon="camera-fill"></u-navbar>
    <view class="flex items-center bg-white pb-30rpx pl-30rpx pr-20rpx">
      <view class="mr-10rpx">
        <u-avatar src="/static/logo.png" size="70"></u-avatar>
      </view>
      <view class="flex-1">
        <view class="pb-20rpx font-size-18rpx">uni-app</view>
        <view class="u-tips-color font-size-14rpx">微信号:uni-app</view>
      </view>
      <view class="ml-10rpx p-10rpx">
        <u-icon name="scan" color="#969799"></u-icon>
      </view>
      <view class="ml-10rpx p-10rpx">
        <u-icon name="arrow-right" color="#969799"></u-icon>
      </view>
    </view>

    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="rmb-circle" title="支付" is-link></u-cell>
      </u-cell-group>
    </view>

    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="star" title="收藏" is-link></u-cell>
        <u-cell icon="photo" title="相册" is-link></u-cell>
        <u-cell icon="coupon" title="卡券" is-link></u-cell>
        <u-cell icon="heart" title="关注" is-link></u-cell>
      </u-cell-group>
    </view>

    <view class="mt-20rpx bg-white">
      <u-cell-group>
        <u-cell icon="setting" title="设置" is-link></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>
