<template>
  <view class="match-page min-h-screen" style="background: #f5f7fa;">
    <!-- Filter tabs -->
    <view class="filter-bar">
      <view
        v-for="tab in filterTabs"
        :key="tab.value"
        class="filter-tab"
        :class="{ active: currentFilter === tab.value }"
        @click="setFilter(tab.value)"
      >
        <text>{{ tab.label }}</text>
      </view>
    </view>

    <!-- Activity list -->
    <z-paging ref="pagingRef" v-model="dataList" @query="queryList">
      <view class="px-30rpx pt-20rpx">
        <view
          v-for="activity in dataList"
          :key="activity.id"
          class="card mb-20rpx"
          @click="toDetail(activity.id)"
        >
          <view class="mb-16rpx flex items-center justify-between">
            <view class="flex items-center gap-12rpx">
              <u-avatar :src="activity.creator.avatar" size="32" />
              <text class="text-26rpx">
                {{ activity.creator.nickname }}
              </text>
            </view>
            <view
              class="status-tag"
              :style="{ background: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }"
            >
              {{ getStatusText(activity.status) }}
            </view>
          </view>

          <text class="mb-16rpx block text-30rpx font-bold">
            {{ activity.title }}
          </text>

          <view class="flex flex-col gap-12rpx text-24rpx text-[#666]">
            <view class="flex items-center gap-8rpx">
              <view class="i-mdi-calendar-clock text-28rpx text-primary" />
              <text>{{ activity.date }} {{ activity.startTime }}-{{ activity.endTime }}</text>
            </view>
            <view class="flex items-center gap-8rpx">
              <view class="i-mdi-map-marker text-28rpx text-primary" />
              <text>{{ activity.venue }}</text>
            </view>
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-20rpx">
                <view class="info-badge">
                  {{ typeLabels[activity.type] }}
                </view>
                <view class="info-badge">
                  {{ activity.currentPlayers.length }}/{{ activity.maxPlayers }}人
                </view>
              </view>
              <text class="text-28rpx text-primary font-bold">
                {{ activity.feeType === 'free' ? '免费' : `¥${activity.fee}${activity.feeType === 'aa' ? '/人' : ''}` }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </z-paging>

    <!-- FAB -->
    <view class="fab" @click="toCreate">
      <view class="i-mdi-plus text-48rpx text-white" />
    </view>

    <view class="h-130rpx" />
    <custom-tabbar :current="1" />
  </view>
</template>

<script setup lang="ts">
import type { Activity, ActivityStatus, ActivityType } from '@/store/modules/activity/types'
import { useActivityStore } from '@/store'

const activityStore = useActivityStore()

const currentFilter = ref<ActivityStatus | ''>('')
const pagingRef = ref<ZPagingRef<Activity> | null>(null)
const dataList = ref<Activity[]>([])

const typeLabels: Record<ActivityType, string> = {
  singles: '单打',
  doubles: '双打',
  mixed: '混双',
}

const filterTabs = [
  { label: '全部', value: '' as const },
  { label: '报名中', value: 'recruiting' as ActivityStatus },
  { label: '已满', value: 'full' as ActivityStatus },
  { label: '已结束', value: 'finished' as ActivityStatus },
]

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

function setFilter(value: ActivityStatus | '') {
  currentFilter.value = value
  pagingRef.value?.reload()
}

function queryList(pageNo: number, _pageSize: number) {
  setTimeout(() => {
    const filtered = activityStore.filteredList(currentFilter.value || undefined)
    pagingRef.value?.complete(pageNo === 1 ? filtered : [])
  }, 300)
}

function toDetail(id: string) {
  uni.navigateTo({ url: `/pages/activity/detail/index?id=${id}` })
}

function toCreate() {
  uni.navigateTo({ url: '/pages/activity/create/index' })
}
</script>

<style scoped lang="scss">
.filter-bar {
  display: flex;
  gap: 0;
  padding: 16rpx 30rpx;
  background: #fff;
}

.filter-tab {
  flex: 1;
  padding: 16rpx 0;
  font-size: 26rpx;
  color: #666;
  text-align: center;
  border-radius: 30rpx;
  transition: all 0.2s;

  &.active {
    font-weight: bold;
    color: #fff;
    background: var(--theme-primary);
  }
}

.card {
  padding: 28rpx;
  background: #fff;
  border-radius: 16rpx;
}

.info-badge {
  padding: 4rpx 14rpx;
  font-size: 22rpx;
  color: #666;
  background: #f5f5f5;
  border-radius: 8rpx;
}

.status-tag {
  padding: 4rpx 16rpx;
  font-size: 22rpx;
  border-radius: 20rpx;
}

.fab {
  position: fixed;
  right: 40rpx;
  bottom: 200rpx;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  height: 100rpx;
  background: var(--theme-primary);
  border-radius: 50%;
  box-shadow: 0 6rpx 20rpx rgb(33 213 157 / 40%);
}
</style>
