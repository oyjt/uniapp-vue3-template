<template>
  <view class="home min-h-screen" style="background: #f5f7fa;">
    <!-- Header -->
    <view class="header">
      <view class="header-content">
        <view class="flex items-center justify-between">
          <view>
            <text class="text-40rpx text-white font-bold">
              羽毛球助手
            </text>
            <text class="mt-8rpx block text-24rpx text-white/70">
              今天也要运动哦
            </text>
          </view>
        </view>
      </view>

      <!-- Stats card -->
      <view class="stats-card">
        <view class="flex justify-around">
          <view class="text-center">
            <text class="stats-value">
              {{ stats.thisWeek }}
            </text>
            <text class="stats-label">
              本周场次
            </text>
          </view>
          <view class="stats-divider" />
          <view class="text-center">
            <text class="stats-value">
              {{ stats.winRate }}%
            </text>
            <text class="stats-label">
              胜率
            </text>
          </view>
          <view class="stats-divider" />
          <view class="text-center">
            <text class="stats-value">
              {{ stats.currentStreak }}
            </text>
            <text class="stats-label">
              连胜
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- Quick actions -->
    <view class="mx-30rpx mt-80rpx">
      <view class="card">
        <view class="flex justify-around">
          <view v-for="action in quickActions" :key="action.text" class="action-item" @click="action.handler">
            <view class="action-icon" :style="{ background: action.bgColor }">
              <view :class="action.icon" class="text-40rpx text-white" />
            </view>
            <text class="action-text">
              {{ action.text }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- Recent competitions -->
    <view v-if="competitionStore.recentCompetitions.length > 0" class="mx-30rpx mt-30rpx">
      <view class="mb-20rpx flex items-center justify-between">
        <text class="text-30rpx font-bold">
          近期比赛
        </text>
      </view>
      <view
        v-for="comp in competitionStore.recentCompetitions"
        :key="comp.id"
        class="comp-card mb-20rpx"
        @click="toCompDetail(comp.id)"
      >
        <view class="mb-12rpx flex items-center justify-between">
          <text class="text-28rpx font-bold">
            {{ comp.name }}
          </text>
          <view
            class="status-tag"
            :style="{ background: comp.status === 'recruiting' ? '#ff980020' : '#99999920', color: comp.status === 'recruiting' ? '#ff9800' : '#999' }"
          >
            {{ comp.status === 'recruiting' ? '报名中' : comp.status === 'full' ? '已满' : comp.status === 'ongoing' ? '进行中' : '已结束' }}
          </view>
        </view>
        <view class="flex items-center gap-16rpx text-24rpx text-[#999]">
          <text>{{ comp.format }}</text>
          <text>·</text>
          <text>{{ comp.mode === 'singles' ? '单打' : '双打' }}</text>
          <text>·</text>
          <text>{{ comp.players.length }}/{{ comp.playerCount }}人</text>
        </view>
        <view class="mt-12rpx flex items-center justify-between">
          <text class="text-22rpx text-[#bbb]">
            {{ comp.creator.nickname }} 发起
          </text>
          <text class="text-24rpx font-bold" style="color: #ff9800;">
            查看详情 →
          </text>
        </view>
      </view>
    </view>

    <!-- Recent activities -->
    <view class="mx-30rpx mt-30rpx">
      <view class="mb-20rpx flex items-center justify-between">
        <text class="text-30rpx font-bold">
          近期活动
        </text>
        <text class="text-24rpx text-primary" @click="toMatchTab">
          查看更多
        </text>
      </view>
      <view
        v-for="activity in activityStore.recentActivities"
        :key="activity.id"
        class="card mb-20rpx"
        @click="toDetail(activity.id)"
      >
        <view class="mb-16rpx flex items-center justify-between">
          <text class="text-28rpx font-bold">
            {{ activity.title }}
          </text>
          <view
            class="status-tag"
            :style="{ background: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }"
          >
            {{ getStatusText(activity.status) }}
          </view>
        </view>
        <view class="flex items-center gap-20rpx text-24rpx text-[#999]">
          <view class="flex items-center gap-6rpx">
            <view class="i-mdi-calendar-outline text-28rpx" />
            <text>{{ activity.date }} {{ activity.startTime }}</text>
          </view>
          <view class="flex items-center gap-6rpx">
            <view class="i-mdi-map-marker-outline text-28rpx" />
            <text>{{ activity.venue }}</text>
          </view>
        </view>
        <view class="mt-16rpx flex items-center justify-between">
          <view class="flex items-center gap-8rpx">
            <view class="i-mdi-account-group-outline text-28rpx text-[#999]" />
            <text class="text-24rpx text-[#999]">
              {{ activity.currentPlayers.length }}/{{ activity.maxPlayers }}人
            </text>
          </view>
          <text class="text-24rpx text-primary font-bold">
            {{ activity.feeType === 'free' ? '免费' : `¥${activity.fee}${activity.feeType === 'aa' ? '/人' : ''}` }}
          </text>
        </view>
      </view>

      <view v-if="activityStore.recentActivities.length === 0" class="card text-center text-[#999]">
        <text>暂无活动，快去发起约球吧</text>
      </view>
    </view>

    <view class="h-130rpx" />
    <custom-tabbar :current="0" />
  </view>
</template>

<script setup lang="ts">
import type { ActivityStatus } from '@/store/modules/activity/types'
import { useActivityStore, useCompetitionStore, useMatchStore } from '@/store'

const activityStore = useActivityStore()
const competitionStore = useCompetitionStore()
const matchStore = useMatchStore()
const stats = computed(() => matchStore.stats)

const statusMap: Record<ActivityStatus, { text: string; color: string }> = {
  recruiting: { text: '报名中', color: '#21d59d' },
  full: { text: '已满', color: '#fe9831' },
  ongoing: { text: '进行中', color: '#3c9cff' },
  finished: { text: '已结束', color: '#999' },
  cancelled: { text: '已取消', color: '#fa4e62' },
}

function getStatusText(status: ActivityStatus) {
  return statusMap[status]?.text ?? status
}

function getStatusColor(status: ActivityStatus) {
  return statusMap[status]?.color ?? '#999'
}

const quickActions = [
  {
    icon: 'i-mdi-calendar-plus',
    text: '发起约球',
    bgColor: '#21d59d',
    handler: () => uni.navigateTo({ url: '/pages/activity/create/index' }),
  },
  {
    icon: 'i-mdi-counter',
    text: '快速记分',
    bgColor: '#3c9cff',
    handler: () => uni.navigateTo({ url: '/pages/activity/scoring/index' }),
  },
  {
    icon: 'i-mdi-trophy',
    text: '我的战绩',
    bgColor: '#fe9831',
    handler: () => uni.switchTab({ url: '/pages/tab/record/index' }),
  },
  {
    icon: 'i-mdi-account-group',
    text: '约球大厅',
    bgColor: '#f56c6c',
    handler: () => uni.switchTab({ url: '/pages/tab/match/index' }),
  },
]

function toMatchTab() {
  uni.switchTab({ url: '/pages/tab/match/index' })
}

function toDetail(id: string) {
  uni.navigateTo({ url: `/pages/activity/detail/index?id=${id}` })
}

function toCompDetail(id: string) {
  uni.navigateTo({ url: `/pages/activity/match-detail/index?id=${id}` })
}
</script>

<style scoped lang="scss">
.header {
  position: relative;
  padding-bottom: 80rpx;
  background: linear-gradient(135deg, #21d59d 0%, #1ab389 100%);
  border-radius: 0 0 40rpx 40rpx;
}

.header-content {
  padding: 100rpx 30rpx 0;
}

.stats-card {
  position: absolute;
  right: 30rpx;
  bottom: -50rpx;
  left: 30rpx;
  padding: 36rpx 20rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgb(0 0 0 / 8%);
}

.stats-value {
  display: block;
  font-size: 44rpx;
  font-weight: bold;
  color: var(--theme-main-color);
}

.stats-label {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #999;
}

.stats-divider {
  width: 1rpx;
  height: 60rpx;
  margin: auto 0;
  background: #eee;
}

.card {
  padding: 28rpx;
  background: #fff;
  border-radius: 16rpx;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
}

.action-text {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #333;
}

.status-tag {
  padding: 4rpx 16rpx;
  font-size: 22rpx;
  border-radius: 20rpx;
}

.comp-card {
  padding: 28rpx;
  background: #fff;
  border-left: 6rpx solid #ff9800;
  border-radius: 16rpx;
}
</style>
