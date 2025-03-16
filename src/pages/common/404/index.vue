<template>
  <view class="container">
    <wd-navbar left-icon="arrow-left" @click-left="handleBack" />
    <wd-empty image="/static/images/404.png" description="页面不存在" />
  </view>
</template>

<script setup lang="ts">
const handleBack = () => {
  uni.switchTab({
    url: '/pages/tab/home/index',
  });
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}
</style>
