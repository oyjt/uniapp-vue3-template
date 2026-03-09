<template>
  <view class="match-detail min-h-screen" style="background: #f5f7fa;">
    <view v-if="comp">
      <!-- Header card -->
      <view class="header-card">
        <view class="mb-16rpx flex items-center justify-between">
          <text class="text-36rpx text-white font-bold">
            {{ comp.name }}
          </text>
          <view class="header-badge">
            {{ statusText }}
          </view>
        </view>
        <view class="flex items-center gap-24rpx text-24rpx text-white/70">
          <text>{{ comp.format }} · {{ comp.mode === 'singles' ? '单打' : '双打' }}</text>
          <text>{{ comp.players.length }}/{{ comp.playerCount }}人</text>
        </view>
      </view>

      <!-- Tabs -->
      <view class="tab-bar">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: currentTab === tab.key }"
          @click="currentTab = tab.key"
        >
          <text>{{ tab.label }}</text>
        </view>
      </view>

      <!-- Tab: 比赛 -->
      <view v-if="currentTab === 'info'" class="px-30rpx pt-20rpx">
        <view class="card mb-20rpx">
          <view class="info-grid">
            <view class="info-item">
              <view class="info-icon i-mdi-badminton" />
              <text class="info-label">
                赛制
              </text>
              <text class="info-val">
                {{ comp.format }}
              </text>
            </view>
            <view class="info-item">
              <view class="info-icon i-mdi-account-group" />
              <text class="info-label">
                人数
              </text>
              <text class="info-val">
                {{ comp.playerCount }}人
              </text>
            </view>
            <view class="info-item">
              <view class="info-icon i-mdi-counter" />
              <text class="info-label">
                场次
              </text>
              <text class="info-val">
                每人{{ comp.matchesPerPlayer }}场
              </text>
            </view>
            <view class="info-item">
              <view class="info-icon i-mdi-scoreboard" />
              <text class="info-label">
                计分
              </text>
              <text class="info-val">
                {{ comp.scoring }}
              </text>
            </view>
          </view>
        </view>

        <!-- 详细信息 -->
        <view class="card mb-20rpx">
          <view class="detail-row">
            <text class="detail-label">
              组织方式
            </text>
            <text class="detail-val">
              {{ comp.joinType === 'pre-register' ? '预报名' : '现场组织' }}
            </text>
          </view>
          <view class="detail-row">
            <text class="detail-label">
              性别限制
            </text>
            <text class="detail-val">
              {{ genderLabel }}
            </text>
          </view>
          <view v-if="comp.courtNumber" class="detail-row">
            <text class="detail-label">
              场地号
            </text>
            <text class="detail-val">
              {{ comp.courtNumber }}
            </text>
          </view>
          <view class="detail-row">
            <text class="detail-label">
              发起人
            </text>
            <text class="detail-val">
              {{ comp.creator.nickname }}
            </text>
          </view>
          <view v-if="comp.description" class="detail-row" style="flex-direction: column; gap: 8rpx; align-items: flex-start;">
            <text class="detail-label">
              补充说明
            </text>
            <text class="text-26rpx text-[#666]">
              {{ comp.description }}
            </text>
          </view>
        </view>

        <!-- 已报名选手 -->
        <view class="card mb-20rpx">
          <text class="mb-20rpx block text-28rpx font-bold">
            已报名 ({{ comp.players.length }}/{{ comp.playerCount }})
          </text>
          <view class="flex flex-wrap gap-24rpx">
            <view v-for="(p, i) in comp.players" :key="p.id" class="player-slot">
              <u-avatar :src="p.avatar" size="40" />
              <text class="mt-6rpx text-22rpx">
                {{ p.nickname }}
              </text>
              <text v-if="i === 0" class="creator-tag">
                发起人
              </text>
            </view>
            <view
              v-for="i in Math.max(0, comp.playerCount - comp.players.length)"
              :key="`e-${i}`"
              class="player-slot"
            >
              <view class="empty-avatar">
                <view class="i-mdi-plus text-28rpx text-[#ccc]" />
              </view>
              <text class="mt-6rpx text-22rpx text-[#ccc]">
                空位
              </text>
            </view>
          </view>
        </view>

        <!-- Actions -->
        <view class="flex gap-20rpx pb-40rpx">
          <u-button
            text="分享给好友"
            plain
            type="primary"
            custom-style="flex: 1; height: 88rpx; border-radius: 44rpx;"
            open-type="share"
            @click="handleShare"
          />
          <u-button
            v-if="comp.status === 'recruiting' && !hasJoined"
            type="primary"
            text="立即加入"
            custom-style="flex: 1; height: 88rpx; border-radius: 44rpx;"
            @click="handleJoin"
          />
          <u-button
            v-else-if="comp.status === 'full' && isCreator"
            type="warning"
            text="开始比赛"
            custom-style="flex: 1; height: 88rpx; border-radius: 44rpx;"
            @click="handleStart"
          />
          <u-button
            v-else-if="hasJoined"
            type="success"
            text="已报名"
            disabled
            custom-style="flex: 1; height: 88rpx; border-radius: 44rpx;"
          />
        </view>
      </view>

      <!-- Tab: 排名 -->
      <view v-if="currentTab === 'ranking'" class="px-30rpx pt-20rpx">
        <view class="card">
          <view v-if="comp.status === 'recruiting'" class="py-60rpx text-center text-[#999]">
            <view class="i-mdi-trophy-outline mx-auto mb-16rpx text-80rpx text-[#ddd]" />
            <text>比赛尚未开始，报满即可开赛</text>
          </view>
          <view v-else>
            <view v-for="(p, i) in comp.players" :key="p.id" class="rank-row">
              <text class="rank-num" :class="{ gold: i === 0, silver: i === 1, bronze: i === 2 }">
                {{ i + 1 }}
              </text>
              <u-avatar :src="p.avatar" size="32" />
              <text class="flex-1 text-28rpx">
                {{ p.nickname }}
              </text>
              <text class="text-24rpx text-[#999]">
                -- 胜 -- 负
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- Tab: 对阵 -->
      <view v-if="currentTab === 'matchup'" class="px-30rpx pt-20rpx">
        <view class="card">
          <view v-if="comp.matches.length === 0" class="py-60rpx text-center text-[#999]">
            <view class="i-mdi-view-list-outline mx-auto mb-16rpx text-80rpx text-[#ddd]" />
            <text>对阵表将在比赛开始后生成</text>
          </view>
          <view v-else>
            <view v-for="m in comp.matches" :key="m.id" class="matchup-row">
              <text class="matchup-player">
                {{ m.playerA }}
              </text>
              <view class="matchup-score">
                <text class="text-28rpx font-bold">
                  {{ m.scoreA }} : {{ m.scoreB }}
                </text>
              </view>
              <text class="matchup-player text-right">
                {{ m.playerB }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- Tab: 裁判 -->
      <view v-if="currentTab === 'referee'" class="px-30rpx pt-20rpx">
        <view class="card">
          <view class="py-60rpx text-center text-[#999]">
            <view class="i-mdi-whistle mx-auto mb-16rpx text-80rpx text-[#ddd]" />
            <text>裁判功能开发中</text>
          </view>
        </view>
      </view>
    </view>

    <view v-else class="min-h-screen center">
      <text class="text-[#999]">
        比赛不存在
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useCompetitionStore } from '@/store'

const competitionStore = useCompetitionStore()
const compId = ref('')
const comp = computed(() => competitionStore.getById(compId.value))
const currentTab = ref('info')

const tabs = [
  { key: 'info', label: '比赛' },
  { key: 'ranking', label: '排名' },
  { key: 'matchup', label: '对阵' },
  { key: 'referee', label: '裁判' },
]

const statusMap: Record<string, string> = {
  draft: '草稿',
  recruiting: '报名中',
  full: '已满员',
  ongoing: '进行中',
  finished: '已结束',
}

const genderMap: Record<string, string> = {
  unlimited: '不限',
  male: '仅限男性',
  female: '仅限女性',
  mixed: '男女混合',
}

const statusText = computed(() => statusMap[comp.value?.status ?? ''] ?? '')
const genderLabel = computed(() => genderMap[comp.value?.gender ?? ''] ?? '不限')
const hasJoined = computed(() => comp.value?.players.some(p => p.id === 'me'))
const isCreator = computed(() => comp.value?.creator.id === 'me')

function handleJoin() {
  competitionStore.joinCompetition(compId.value, {
    id: 'me',
    nickname: '球友小王',
    avatar: '',
  })
  uni.$u.toast('报名成功！')
}

function handleStart() {
  competitionStore.startCompetition(compId.value)
  uni.$u.toast('比赛已开始')
}

function handleShare() {
  // #ifdef H5
  uni.$u.toast('请在微信小程序中分享')
  // #endif
}

// #ifdef MP-WEIXIN
onShareAppMessage(() => ({
  title: comp.value?.name ?? '羽毛球比赛',
  path: `/pages/activity/match-detail/index?id=${compId.value}`,
}))
// #endif

onLoad((options: any) => {
  compId.value = options?.id ?? ''
})
</script>

<style scoped lang="scss">
.header-card {
  padding: 100rpx 30rpx 30rpx;
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  border-radius: 0 0 32rpx 32rpx;
}

.header-badge {
  padding: 6rpx 20rpx;
  font-size: 22rpx;
  color: #fff;
  background: rgb(255 255 255 / 25%);
  border-radius: 20rpx;
}

.tab-bar {
  display: flex;
  background: #fff;
  box-shadow: 0 2rpx 8rpx rgb(0 0 0 / 4%);
}

.tab-item {
  flex: 1;
  padding: 24rpx 0;
  font-size: 28rpx;
  color: #999;
  text-align: center;
  border-bottom: 4rpx solid transparent;
  transition: all 0.2s;

  &.active {
    font-weight: bold;
    color: #ff9800;
    border-bottom-color: #ff9800;
  }
}

.card {
  padding: 28rpx;
  background: #fff;
  border-radius: 16rpx;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  align-items: center;
  padding: 20rpx 0;
  background: #fafafa;
  border-radius: 12rpx;
}

.info-icon {
  font-size: 36rpx;
  color: #ff9800;
}

.info-label {
  font-size: 22rpx;
  color: #999;
}

.info-val {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
}

.detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.detail-label {
  font-size: 26rpx;
  color: #999;
}

.detail-val {
  font-size: 26rpx;
  color: #333;
}

.player-slot {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100rpx;
}

.empty-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  background: #f5f5f5;
  border: 2rpx dashed #ddd;
  border-radius: 50%;
}

.creator-tag {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  padding: 2rpx 10rpx;
  font-size: 18rpx;
  color: #fff;
  background: #ff9800;
  border-radius: 10rpx;
}

.rank-row {
  display: flex;
  gap: 16rpx;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.rank-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  font-size: 26rpx;
  font-weight: bold;
  color: #999;
  background: #f5f5f5;
  border-radius: 50%;

  &.gold { color: #fff; background: #ffd700; }
  &.silver { color: #fff; background: #c0c0c0; }
  &.bronze { color: #fff; background: #cd7f32; }
}

.matchup-row {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.matchup-player {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.matchup-score {
  padding: 8rpx 24rpx;
  background: #fafafa;
  border-radius: 8rpx;
}
</style>
