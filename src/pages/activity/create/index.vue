<template>
  <view class="create-page min-h-screen" style="background: #f5f7fa;">
    <view class="px-30rpx pt-30rpx">
      <!-- Title -->
      <view class="card mb-20rpx">
        <text class="label">
          活动标题
        </text>
        <u-input v-model="form.title" placeholder="给活动起个名字" border="none" />
      </view>

      <!-- Type -->
      <view class="card mb-20rpx">
        <text class="label">
          比赛类型
        </text>
        <view class="mt-16rpx flex gap-20rpx">
          <view
            v-for="t in types"
            :key="t.value"
            class="type-option"
            :class="{ active: form.type === t.value }"
            @click="form.type = t.value"
          >
            {{ t.label }}
          </view>
        </view>
      </view>

      <!-- Date & Time -->
      <view class="card mb-20rpx">
        <text class="label">
          活动时间
        </text>
        <view class="mt-16rpx flex gap-20rpx">
          <view class="flex-1">
            <u-input v-model="form.date" placeholder="日期 如 2026-03-08" border="surround" />
          </view>
        </view>
        <view class="mt-16rpx flex items-center gap-20rpx">
          <view class="flex-1">
            <u-input v-model="form.startTime" placeholder="开始 如 14:00" border="surround" />
          </view>
          <text class="text-[#999]">
            至
          </text>
          <view class="flex-1">
            <u-input v-model="form.endTime" placeholder="结束 如 16:00" border="surround" />
          </view>
        </view>
      </view>

      <!-- Venue -->
      <view class="card mb-20rpx">
        <text class="label">
          活动场地
        </text>
        <u-input v-model="form.venue" placeholder="场馆名称" border="none" class="mt-10rpx" />
        <u-input v-model="form.address" placeholder="详细地址（选填）" border="none" class="mt-10rpx" />
      </view>

      <!-- Players & Fee -->
      <view class="card mb-20rpx">
        <view class="flex items-center justify-between">
          <text class="label mb-0">
            最大人数
          </text>
          <u-number-box v-model="form.maxPlayers" :min="2" :max="20" />
        </view>
        <view class="mt-24rpx flex items-center justify-between">
          <text class="label mb-0">
            费用类型
          </text>
          <view class="flex gap-16rpx">
            <view
              v-for="f in feeTypes"
              :key="f.value"
              class="type-option small"
              :class="{ active: form.feeType === f.value }"
              @click="form.feeType = f.value"
            >
              {{ f.label }}
            </view>
          </view>
        </view>
        <view v-if="form.feeType !== 'free'" class="mt-24rpx flex items-center justify-between">
          <text class="label mb-0">
            费用(元)
          </text>
          <view style="width: 200rpx;">
            <u-input v-model="form.fee" type="number" placeholder="0" border="surround" input-align="right" />
          </view>
        </view>
      </view>

      <!-- Description -->
      <view class="card mb-20rpx">
        <text class="label">
          活动描述
        </text>
        <u-textarea v-model="form.description" placeholder="补充说明（可选）" count class="mt-16rpx" />
      </view>

      <u-button
        type="primary"
        text="发布活动"
        custom-style="margin-top: 20rpx; margin-bottom: 60rpx; height: 88rpx; border-radius: 44rpx;"
        @click="handleSubmit"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useActivityStore } from '@/store'

const activityStore = useActivityStore()

const form = reactive({
  title: '',
  type: 'doubles' as 'singles' | 'doubles' | 'mixed',
  date: '',
  startTime: '',
  endTime: '',
  venue: '',
  address: '',
  maxPlayers: 4,
  fee: 0,
  feeType: 'aa' as 'free' | 'aa' | 'fixed',
  description: '',
})

const types = [
  { label: '单打', value: 'singles' as const },
  { label: '双打', value: 'doubles' as const },
  { label: '混双', value: 'mixed' as const },
]

const feeTypes = [
  { label: '免费', value: 'free' as const },
  { label: 'AA', value: 'aa' as const },
  { label: '固定', value: 'fixed' as const },
]

function handleSubmit() {
  if (!form.title) {
    uni.$u.toast('请输入活动标题')
    return
  }
  if (!form.date || !form.startTime) {
    uni.$u.toast('请选择活动时间')
    return
  }
  if (!form.venue) {
    uni.$u.toast('请输入场地信息')
    return
  }

  activityStore.addActivity({
    id: Date.now().toString(),
    title: form.title,
    creator: { id: 'me', nickname: '球友小王', avatar: '', level: 'intermediate' },
    type: form.type,
    date: form.date,
    startTime: form.startTime,
    endTime: form.endTime || '18:00',
    venue: form.venue,
    address: form.address || form.venue,
    maxPlayers: form.maxPlayers,
    currentPlayers: [{ id: 'me', nickname: '球友小王', avatar: '', level: 'intermediate' }],
    fee: form.feeType === 'free' ? 0 : Number(form.fee),
    feeType: form.feeType,
    levelRequirement: ['beginner', 'elementary', 'intermediate', 'advanced'],
    status: 'recruiting',
    description: form.description,
    createdAt: new Date().toISOString(),
  })

  uni.$u.toast('发布成功')
  setTimeout(() => uni.navigateBack(), 500)
}
</script>

<style scoped lang="scss">
.card {
  padding: 28rpx;
  background: #fff;
  border-radius: 16rpx;
}

.label {
  display: block;
  margin-bottom: 8rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.type-option {
  padding: 12rpx 32rpx;
  font-size: 26rpx;
  color: #666;
  background: #f5f5f5;
  border: 2rpx solid transparent;
  border-radius: 30rpx;
  transition: all 0.2s;

  &.active {
    color: var(--theme-primary);
    background: rgb(33 213 157 / 10%);
    border-color: var(--theme-primary);
  }

  &.small {
    padding: 8rpx 24rpx;
    font-size: 24rpx;
  }
}
</style>
