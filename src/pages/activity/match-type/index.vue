<template>
  <view class="match-type-page min-h-screen" style="background: #f5f7fa;">
    <!-- Mode tabs -->
    <view class="mode-tabs">
      <view
        class="mode-tab"
        :class="{ active: currentMode === 'doubles' }"
        @click="currentMode = 'doubles'"
      >
        <text>双打</text>
      </view>
      <view
        class="mode-tab"
        :class="{ active: currentMode === 'singles' }"
        @click="currentMode = 'singles'"
      >
        <text>单打</text>
      </view>
      <view class="mode-indicator" :style="{ left: currentMode === 'doubles' ? '8rpx' : 'calc(50% + 4rpx)' }" />
    </view>

    <!-- Type cards -->
    <view class="px-30rpx pt-30rpx">
      <view class="type-grid">
        <view
          v-for="item in currentTypes"
          :key="item.id"
          class="type-card"
          @click="selectType(item)"
        >
          <view class="type-icon-wrap" :style="{ background: `${item.color}15` }">
            <text class="type-emoji">
              {{ item.emoji }}
            </text>
          </view>
          <view class="type-info">
            <text class="type-name">
              {{ item.name }}
            </text>
            <text class="type-desc">
              {{ item.desc }}
            </text>
          </view>
          <view class="type-arrow">
            <view class="i-mdi-chevron-right text-36rpx text-[#ccc]" />
          </view>
        </view>
      </view>
    </view>

    <!-- Description -->
    <view class="mx-30rpx mt-40rpx">
      <view class="desc-card">
        <view class="mb-16rpx flex items-center gap-12rpx">
          <view class="i-mdi-information-outline text-32rpx text-primary" />
          <text class="text-28rpx font-bold">
            赛制说明
          </text>
        </view>
        <text class="text-24rpx text-[#666] leading-relaxed">
          {{ currentMode === 'doubles' ? doublesDesc : singlesDesc }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface MatchTypeItem {
  id: string
  name: string
  desc: string
  emoji: string
  color: string
  players: string
}

const currentMode = ref<'doubles' | 'singles'>('doubles')

const doublesTypes: MatchTypeItem[] = [
  { id: 'ba-ren-zhuan', name: '八人转', desc: '8人循环换搭档，每轮随机配对', emoji: '🔄', color: '#ff9800', players: '8人' },
  { id: 'chao-ba-zhuan', name: '超吧转', desc: '超级吧台赛，输方下场换人', emoji: '⚡', color: '#2196f3', players: '8-12人' },
  { id: 'hun-shuang-zhuan', name: '混双转', desc: '男女搭配，循环轮转', emoji: '👫', color: '#e91e63', players: '8人' },
  { id: 'zi-you-zhuan', name: '自由转', desc: '自由组队，随机对战', emoji: '🎲', color: '#4caf50', players: '不限' },
  { id: 'jin-ji-sai', name: '晋级赛', desc: '淘汰赛制，逐轮晋级', emoji: '🏆', color: '#f44336', players: '4-16人' },
]

const singlesTypes: MatchTypeItem[] = [
  { id: 'ba-ren-zhuan', name: '八人转', desc: '8人循环单打对战', emoji: '🔄', color: '#ff9800', players: '8人' },
  { id: 'chao-ba-zhuan', name: '超吧转', desc: '输方下场，赢方守擂', emoji: '⚡', color: '#2196f3', players: '6-10人' },
  { id: 'zi-you-zhuan', name: '自由转', desc: '自由挑战，随机对手', emoji: '🎲', color: '#4caf50', players: '不限' },
  { id: 'jin-ji-sai', name: '晋级赛', desc: '单淘汰 / 双淘汰赛制', emoji: '🏆', color: '#f44336', players: '4-16人' },
]

const currentTypes = computed(() =>
  currentMode.value === 'doubles' ? doublesTypes : singlesTypes,
)

const doublesDesc = '双打模式下，参与者将按赛制规则自动分组配对。八人转和超吧转适合日常娱乐约球，混双转适合男女混合活动，晋级赛适合正式比赛。'
const singlesDesc = '单打模式下，参与者将按赛制进行一对一对战。八人转适合多人轮流对战，超吧转为守擂模式，晋级赛适合正式锦标赛。'

function selectType(item: MatchTypeItem) {
  uni.navigateTo({
    url: `/pages/activity/create-match/index?mode=${currentMode.value}&formatId=${item.id}&format=${encodeURIComponent(item.name)}&name=${encodeURIComponent(item.name)}`,
  })
}

onLoad((options: any) => {
  if (options?.mode === 'singles')
    currentMode.value = 'singles'
})
</script>

<style scoped lang="scss">
.mode-tabs {
  position: relative;
  display: flex;
  gap: 0;
  padding: 8rpx;
  margin: 20rpx 30rpx 0;
  background: #e8e8e8;
  border-radius: 40rpx;
}

.mode-tab {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 18rpx 0;
  font-size: 30rpx;
  font-weight: bold;
  color: #999;
  text-align: center;
  transition: color 0.3s;

  &.active {
    color: #fff;
  }
}

.mode-indicator {
  position: absolute;
  top: 8rpx;
  bottom: 8rpx;
  width: calc(50% - 12rpx);
  background: var(--theme-primary);
  border-radius: 32rpx;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.type-grid {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.type-card {
  display: flex;
  gap: 24rpx;
  align-items: center;
  padding: 32rpx 28rpx;
  background: #fff;
  border-radius: 20rpx;
  transition: transform 0.15s;

  &:active {
    transform: scale(0.98);
  }
}

.type-icon-wrap {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100rpx;
  height: 100rpx;
  border-radius: 24rpx;
}

.type-emoji {
  font-size: 48rpx;
}

.type-info {
  flex: 1;
  min-width: 0;
}

.type-name {
  display: block;
  margin-bottom: 8rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.type-desc {
  display: block;
  font-size: 24rpx;
  color: #999;
}

.type-arrow {
  flex-shrink: 0;
}

.desc-card {
  padding: 28rpx;
  background: #fff;
  border-radius: 16rpx;
}
</style>
