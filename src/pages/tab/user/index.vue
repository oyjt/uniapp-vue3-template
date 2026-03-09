<template>
  <view class="user-page min-h-screen" style="background: #f5f7fa;">
    <!-- Profile header -->
    <view class="profile-header">
      <view class="profile-content">
        <view class="flex items-center gap-24rpx">
          <u-avatar src="" size="70" />
          <view>
            <text class="block text-36rpx text-white font-bold">
              球友小王
            </text>
            <view class="mt-8rpx flex items-center gap-12rpx">
              <view class="level-badge">
                中级
              </view>
              <text class="text-24rpx text-white/70">
                球龄 3年
              </text>
            </view>
          </view>
        </view>

        <view class="profile-stats">
          <view class="text-center" @click="toRecord">
            <text class="block text-36rpx text-white font-bold">
              {{ stats.totalMatches }}
            </text>
            <text class="text-22rpx text-white/70">
              场次
            </text>
          </view>
          <view class="text-center">
            <text class="block text-36rpx text-white font-bold">
              {{ stats.winRate }}%
            </text>
            <text class="text-22rpx text-white/70">
              胜率
            </text>
          </view>
          <view class="text-center">
            <text class="block text-36rpx text-white font-bold">
              3年
            </text>
            <text class="text-22rpx text-white/70">
              球龄
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- Menu -->
    <view class="mt-20rpx">
      <u-cell-group>
        <u-cell title="我的活动" is-link @click="toMatch">
          <template #icon>
            <view class="i-mdi-calendar-check mr-16rpx text-36rpx text-primary" />
          </template>
        </u-cell>
        <u-cell title="比赛记录" is-link @click="toRecord">
          <template #icon>
            <view class="i-mdi-trophy mr-16rpx text-36rpx" style="color: #fe9831;" />
          </template>
        </u-cell>
        <u-cell title="我的球友" is-link>
          <template #icon>
            <view class="i-mdi-account-group mr-16rpx text-36rpx" style="color: #3c9cff;" />
          </template>
        </u-cell>
      </u-cell-group>
    </view>

    <view class="mt-20rpx">
      <u-cell-group>
        <u-cell title="装备管理" is-link>
          <template #icon>
            <view class="i-mdi-badminton mr-16rpx text-36rpx" style="color: #f56c6c;" />
          </template>
        </u-cell>
        <u-cell title="个人资料" is-link>
          <template #icon>
            <view class="i-mdi-card-account-details mr-16rpx text-36rpx" style="color: #909399;" />
          </template>
        </u-cell>
      </u-cell-group>
    </view>

    <view class="mt-20rpx">
      <u-cell-group>
        <u-cell title="主题设置" is-link @click="toTheme">
          <template #icon>
            <view class="i-mdi-palette mr-16rpx text-36rpx" style="color: #e040fb;" />
          </template>
        </u-cell>
        <u-cell title="关于" is-link>
          <template #icon>
            <view class="i-mdi-information mr-16rpx text-36rpx text-[#999]" />
          </template>
        </u-cell>
      </u-cell-group>
    </view>

    <view class="h-130rpx" />
    <custom-tabbar :current="3" />
  </view>
</template>

<script setup lang="ts">
import { usePermission } from '@/hooks'
import { useMatchStore } from '@/store'

const matchStore = useMatchStore()
const stats = computed(() => matchStore.stats)

function toRecord() {
  uni.switchTab({ url: '/pages/tab/record/index' })
}

function toMatch() {
  uni.switchTab({ url: '/pages/tab/match/index' })
}

function toTheme() {
  uni.navigateTo({ url: '/pages/common/theme/index' })
}

onShow(async () => {
  const hasPermission = await usePermission()
  console.log(hasPermission ? '已登录' : '未登录')
})
</script>

<style scoped lang="scss">
.profile-header {
  background: linear-gradient(135deg, #21d59d 0%, #1ab389 100%);
  border-radius: 0 0 40rpx 40rpx;
}

.profile-content {
  padding: 120rpx 30rpx 40rpx;
}

.level-badge {
  display: inline-block;
  padding: 2rpx 16rpx;
  font-size: 22rpx;
  color: #fff;
  background: rgb(255 255 255 / 30%);
  border-radius: 20rpx;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 40rpx;
  margin-top: 40rpx;
  border-top: 1rpx solid rgb(255 255 255 / 20%);
}
</style>
