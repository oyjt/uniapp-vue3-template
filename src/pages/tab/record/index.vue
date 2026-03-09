<template>
  <view class="record-page min-h-screen" style="background: #f5f7fa;">
    <!-- Header -->
    <view class="header">
      <view class="header-content">
        <text class="text-40rpx text-white font-bold">
          我的战绩
        </text>
      </view>

      <!-- Stats cards -->
      <view class="stats-grid">
        <view class="stat-card">
          <text class="stat-value">
            {{ stats.totalMatches }}
          </text>
          <text class="stat-label">
            总场次
          </text>
        </view>
        <view class="stat-card">
          <text class="stat-value" style="color: #21d59d;">
            {{ stats.wins }}
          </text>
          <text class="stat-label">
            胜场
          </text>
        </view>
        <view class="stat-card">
          <text class="stat-value" style="color: #fa4e62;">
            {{ stats.losses }}
          </text>
          <text class="stat-label">
            负场
          </text>
        </view>
        <view class="stat-card">
          <text class="stat-value" style="color: #fe9831;">
            {{ stats.winRate }}%
          </text>
          <text class="stat-label">
            胜率
          </text>
        </view>
      </view>
    </view>

    <!-- Streak info -->
    <view class="mx-30rpx mt-90rpx">
      <view class="card flex justify-around">
        <view class="text-center">
          <text class="block text-36rpx text-primary font-bold">
            {{ stats.currentStreak }}
          </text>
          <text class="mt-4rpx block text-22rpx text-[#999]">
            当前连胜
          </text>
        </view>
        <view class="w-1rpx bg-[#eee]" />
        <view class="text-center">
          <text class="block text-36rpx font-bold" style="color: #fe9831;">
            {{ stats.bestStreak }}
          </text>
          <text class="mt-4rpx block text-22rpx text-[#999]">
            最佳连胜
          </text>
        </view>
        <view class="w-1rpx bg-[#eee]" />
        <view class="text-center">
          <text class="block text-36rpx font-bold" style="color: #3c9cff;">
            {{ stats.thisMonth }}
          </text>
          <text class="mt-4rpx block text-22rpx text-[#999]">
            本月场次
          </text>
        </view>
      </view>
    </view>

    <!-- Match history -->
    <view class="mx-30rpx mt-30rpx">
      <view class="mb-20rpx flex items-center justify-between">
        <text class="text-30rpx font-bold">
          比赛记录
        </text>
        <text class="text-24rpx text-primary" @click="toScoring">
          记一场比赛
        </text>
      </view>

      <view v-for="record in matchStore.records" :key="record.id" class="card mb-20rpx">
        <view class="mb-16rpx flex items-center justify-between">
          <view class="flex items-center gap-12rpx">
            <view class="result-badge" :class="record.winner === 'A' ? 'win' : 'lose'">
              {{ record.winner === 'A' ? '胜' : '负' }}
            </view>
            <text class="text-28rpx font-bold">
              {{ record.playerA }} vs {{ record.playerB }}
            </text>
          </view>
          <view class="type-badge">
            {{ record.type === 'singles' ? '单打' : '双打' }}
          </view>
        </view>

        <view class="mb-16rpx flex gap-16rpx">
          <view v-for="(game, gi) in record.games" :key="gi" class="score-item">
            <text class="text-22rpx text-[#999]">
              G{{ gi + 1 }}
            </text>
            <text
              class="text-26rpx font-bold"
              :style="{ color: game.playerAScore > game.playerBScore ? '#21d59d' : '#fa4e62' }"
            >
              {{ game.playerAScore }}:{{ game.playerBScore }}
            </text>
          </view>
        </view>

        <view class="flex items-center gap-20rpx text-22rpx text-[#999]">
          <view class="flex items-center gap-6rpx">
            <view class="i-mdi-calendar text-24rpx" />
            <text>{{ record.date }}</text>
          </view>
          <view class="flex items-center gap-6rpx">
            <view class="i-mdi-map-marker text-24rpx" />
            <text>{{ record.venue }}</text>
          </view>
          <view class="flex items-center gap-6rpx">
            <view class="i-mdi-clock-outline text-24rpx" />
            <text>{{ record.duration }}分钟</text>
          </view>
        </view>
      </view>

      <view v-if="matchStore.records.length === 0" class="card text-center text-[#999]">
        <text>暂无比赛记录</text>
      </view>
    </view>

    <view class="h-130rpx" />
    <custom-tabbar :current="2" />
  </view>
</template>

<script setup lang="ts">
import { useMatchStore } from '@/store'

const matchStore = useMatchStore()
const stats = computed(() => matchStore.stats)

function toScoring() {
  uni.navigateTo({ url: '/pages/activity/scoring/index' })
}
</script>

<style scoped lang="scss">
.header {
  position: relative;
  padding-bottom: 100rpx;
  background: linear-gradient(135deg, #3c9cff 0%, #2b7fd9 100%);
  border-radius: 0 0 40rpx 40rpx;
}

.header-content {
  padding: 100rpx 30rpx 0;
}

.stats-grid {
  position: absolute;
  right: 30rpx;
  bottom: -60rpx;
  left: 30rpx;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 0;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgb(0 0 0 / 6%);
}

.stat-value {
  font-size: 40rpx;
  font-weight: bold;
  color: var(--theme-main-color);
}

.stat-label {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #999;
}

.card {
  padding: 28rpx;
  background: #fff;
  border-radius: 16rpx;
}

.result-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  font-size: 22rpx;
  font-weight: bold;
  color: #fff;
  border-radius: 50%;

  &.win {
    background: #21d59d;
  }

  &.lose {
    background: #fa4e62;
  }
}

.type-badge {
  padding: 4rpx 14rpx;
  font-size: 22rpx;
  color: #666;
  background: #f5f5f5;
  border-radius: 8rpx;
}

.score-item {
  display: flex;
  gap: 8rpx;
  align-items: center;
  padding: 8rpx 16rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
}
</style>
