<template>
  <view class="tabbar-wrap">
    <!-- Popup overlay -->
    <view v-if="showPopup" class="popup-overlay" @click="showPopup = false" />

    <!-- Popup menu -->
    <view v-if="showPopup" class="popup-menu">
      <view class="popup-item" @click="goToMatchType">
        <view class="popup-icon" style="background: linear-gradient(135deg, #ff9800, #f57c00);">
          <view class="i-mdi-trophy text-48rpx text-white" />
        </view>
        <text class="popup-label">
          比赛
        </text>
      </view>
      <view class="popup-item" @click="goToActivity">
        <view class="popup-icon" style="background: linear-gradient(135deg, #21d59d, #1ab389);">
          <view class="i-mdi-calendar-plus text-48rpx text-white" />
        </view>
        <text class="popup-label">
          活动
        </text>
      </view>
    </view>

    <!-- Tabbar -->
    <view class="tabbar">
      <!-- Tab 0: 首页 -->
      <view class="tabbar-item" :class="{ 'is-active': current === 0 }" @click="switchTab(0)">
        <view class="tabbar-icon" :class="current === 0 ? tabs[0].activeIcon : tabs[0].icon" />
        <text class="tabbar-label">
          {{ tabs[0].text }}
        </text>
      </view>

      <!-- Tab 1: 约球 -->
      <view class="tabbar-item" :class="{ 'is-active': current === 1 }" @click="switchTab(1)">
        <view class="tabbar-icon" :class="current === 1 ? tabs[1].activeIcon : tabs[1].icon" />
        <text class="tabbar-label">
          {{ tabs[1].text }}
        </text>
      </view>

      <!-- Center button -->
      <view class="tabbar-center" @click="togglePopup">
        <view class="center-btn" :class="{ 'is-open': showPopup }">
          <view class="center-icon i-mdi-plus text-52rpx text-white" :class="{ 'is-open': showPopup }" />
        </view>
        <text class="center-label">
          发起
        </text>
      </view>

      <!-- Tab 2: 战绩 -->
      <view class="tabbar-item" :class="{ 'is-active': current === 2 }" @click="switchTab(2)">
        <view class="tabbar-icon" :class="current === 2 ? tabs[2].activeIcon : tabs[2].icon" />
        <text class="tabbar-label">
          {{ tabs[2].text }}
        </text>
      </view>

      <!-- Tab 3: 我的 -->
      <view class="tabbar-item" :class="{ 'is-active': current === 3 }" @click="switchTab(3)">
        <view class="tabbar-icon" :class="current === 3 ? tabs[3].activeIcon : tabs[3].icon" />
        <text class="tabbar-label">
          {{ tabs[3].text }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  current: number
}

const props = defineProps<Props>()

const showPopup = ref(false)

const tabs = [
  { path: '/pages/tab/home/index', icon: 'i-mdi-home-variant-outline', activeIcon: 'i-mdi-home-variant', text: '首页' },
  { path: '/pages/tab/match/index', icon: 'i-mdi-badminton', activeIcon: 'i-mdi-badminton', text: '约球' },
  { path: '/pages/tab/record/index', icon: 'i-mdi-trophy-variant-outline', activeIcon: 'i-mdi-trophy-variant', text: '战绩' },
  { path: '/pages/tab/user/index', icon: 'i-mdi-account-circle-outline', activeIcon: 'i-mdi-account-circle', text: '我的' },
]

function switchTab(index: number) {
  if (index === props.current)
    return
  showPopup.value = false
  uni.switchTab({ url: tabs[index].path })
}

function togglePopup() {
  showPopup.value = !showPopup.value
}

function goToMatchType() {
  showPopup.value = false
  uni.navigateTo({ url: '/pages/activity/match-type/index' })
}

function goToActivity() {
  showPopup.value = false
  uni.navigateTo({ url: '/pages/activity/create/index' })
}
</script>

<style scoped lang="scss">
.tabbar-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}

.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgb(0 0 0 / 40%);
}

.popup-menu {
  position: absolute;
  bottom: calc(110rpx + env(safe-area-inset-bottom) + 60rpx);
  left: 50%;
  z-index: 1000;
  display: flex;
  gap: 60rpx;
  transform: translateX(-50%);
  animation: popup-in 0.25s ease-out;
}

@keyframes popup-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30rpx) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

.popup-item {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  align-items: center;
}

.popup-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  box-shadow: 0 8rpx 24rpx rgb(0 0 0 / 20%);
}

.popup-label {
  font-size: 26rpx;
  font-weight: bold;
  color: #fff;
}

.tabbar {
  position: relative;
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 110rpx;
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff;
  box-shadow: 0 -1px 8px rgb(0 0 0 / 6%);
}

.tabbar-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 110rpx;
  transition: all 0.2s;
}

.tabbar-icon {
  width: 44rpx;
  height: 44rpx;
  margin-bottom: 4rpx;
  font-size: 44rpx;
  color: #999;
}

.tabbar-label {
  font-size: 22rpx;
  color: #999;
}

.is-active .tabbar-icon {
  color: var(--theme-primary);
}

.is-active .tabbar-label {
  color: var(--theme-primary);
}

/* Center button */
.tabbar-center {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 110rpx;
  margin-top: -44rpx;
}

.center-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #21d59d 0%, #1ab389 100%);
  border-radius: 50%;
  box-shadow: 0 4rpx 16rpx rgb(33 213 157 / 40%);
  transition: transform 0.25s ease;

  &.is-open {
    background: linear-gradient(135deg, #ff6b6b 0%, #e55656 100%);
    box-shadow: 0 4rpx 16rpx rgb(255 107 107 / 40%);
    transform: rotate(45deg);
  }
}

.center-icon {
  transition: transform 0.25s ease;
}

.center-label {
  margin-top: 2rpx;
  font-size: 22rpx;
  color: #999;
}
</style>
