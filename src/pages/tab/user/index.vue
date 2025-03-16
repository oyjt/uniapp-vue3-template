<template>
  <view class="container">
    <view class="user-info">
      <view class="avatar-wrap">
        <wd-img round width="80" height="80" src="/static/images/logo.png" />
      </view>
      <view class="info">
        <view class="name">
          用户名
        </view>
        <view class="id" @click="toCopy">
          ID：123456
        </view>
      </view>
    </view>

    <view class="menu-group">
      <view class="menu-item" @click="toScan">
        <wd-icon name="scan1" size="24" />
        <text>扫一扫</text>
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

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  padding-bottom: 40rpx;
  background-color: #f8f8f8;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 40rpx;
  background-color: #fff;

  .avatar-wrap {
    margin-right: 30rpx;
  }

  .info {
    .name {
      margin-bottom: 10rpx;
      font-size: 36rpx;
      font-weight: 500;
    }

    .id {
      font-size: 28rpx;
      color: var(--wd-text-color-secondary);
    }
  }
}

.menu-group {
  margin: 20rpx 0;
  background-color: #fff;

  .menu-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    font-size: 32rpx;

    text {
      flex: 1;
      margin-left: 20rpx;
    }
  }
}

:deep(.wd-cell-group) {
  margin-bottom: 20rpx;
}
</style>
