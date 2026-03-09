<template>
  <view class="create-match min-h-screen" style="background: #f5f7fa;">
    <view class="px-30rpx pb-40rpx pt-20rpx">
      <!-- 名称 -->
      <view class="form-card">
        <view class="form-row">
          <text class="form-label">
            名称
          </text>
          <view class="form-value">
            <u-input v-model="form.name" placeholder="输入比赛名称" border="none" input-align="right" />
          </view>
        </view>
      </view>

      <!-- 类型 / 性别 / 人数 -->
      <view class="form-card">
        <view class="form-row">
          <text class="form-label">
            类型
          </text>
          <text class="form-text">
            {{ form.format }}
          </text>
        </view>
        <view class="form-divider" />
        <view class="form-row">
          <text class="form-label">
            性别
          </text>
          <view class="form-chips">
            <view
              v-for="g in genderOptions"
              :key="g.value"
              class="chip"
              :class="{ active: form.gender === g.value }"
              @click="form.gender = g.value"
            >
              {{ g.label }}
            </view>
          </view>
        </view>
        <view class="form-divider" />
        <view class="form-row">
          <text class="form-label">
            人数
          </text>
          <view class="form-value">
            <u-number-box v-model="form.playerCount" :min="4" :max="20" :step="2" />
          </view>
        </view>
      </view>

      <!-- 赛制 -->
      <view class="form-card">
        <view class="form-row">
          <text class="form-label">
            赛制
          </text>
          <text class="form-text-sm">
            {{ formatSummary }}
          </text>
        </view>
        <view class="form-divider" />
        <view class="form-row">
          <text class="form-label">
            计分
          </text>
          <view class="form-chips">
            <view
              v-for="s in scoringOptions"
              :key="s.value"
              class="chip"
              :class="{ active: form.scoring === s.value }"
              @click="form.scoring = s.value"
            >
              {{ s.label }}
            </view>
          </view>
        </view>
      </view>

      <!-- 场地号 -->
      <view class="form-card">
        <view class="form-row">
          <text class="form-label">
            场地号
          </text>
          <view class="form-value">
            <u-input v-model="form.courtNumber" placeholder="选填" border="none" input-align="right" />
          </view>
        </view>
      </view>

      <!-- 组织方式 -->
      <view class="form-card">
        <view class="form-row">
          <text class="form-label">
            组织方式
          </text>
          <view class="form-chips">
            <view
              class="chip"
              :class="{ active: form.joinType === 'pre-register' }"
              @click="form.joinType = 'pre-register'"
            >
              预报名
            </view>
            <view
              class="chip"
              :class="{ active: form.joinType === 'onsite' }"
              @click="form.joinType = 'onsite'"
            >
              现场组织
            </view>
          </view>
        </view>
      </view>

      <!-- 补充说明 -->
      <view class="form-card">
        <view class="mb-16rpx flex items-center justify-between">
          <text class="form-label mb-0">
            补充
          </text>
          <text class="text-24rpx text-primary" @click="showFullInput = true">
            全屏输入
          </text>
        </view>
        <u-textarea v-model="form.description" placeholder="补充说明（可选）" :height="120" count :maxlength="200" />
      </view>

      <!-- Buttons -->
      <view class="mt-40rpx flex gap-20rpx">
        <u-button
          text="清空"
          custom-style="flex: 1; height: 88rpx; border-radius: 44rpx;"
          @click="handleClear"
        />
        <u-button
          text="保存"
          type="warning"
          plain
          custom-style="flex: 1; height: 88rpx; border-radius: 44rpx;"
          @click="handleSave"
        />
      </view>
      <u-button
        type="primary"
        text="发布"
        custom-style="margin-top: 24rpx; height: 88rpx; border-radius: 44rpx;"
        @click="handlePublish"
      />
    </view>

    <!-- 全屏输入弹层 -->
    <u-popup :show="showFullInput" mode="bottom" round="20" @close="showFullInput = false">
      <view class="px-30rpx py-40rpx">
        <view class="mb-24rpx flex items-center justify-between">
          <text class="text-32rpx font-bold">
            补充说明
          </text>
          <text class="text-28rpx text-primary" @click="showFullInput = false">
            完成
          </text>
        </view>
        <u-textarea v-model="form.description" placeholder="请输入补充说明" :height="400" count :maxlength="500" />
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import type { GenderLimit, JoinType } from '@/store/modules/competition/types'
import { useCompetitionStore } from '@/store'

const competitionStore = useCompetitionStore()

const form = reactive({
  name: '',
  mode: 'singles' as 'singles' | 'doubles',
  format: '八人转',
  formatId: 'ba-ren-zhuan',
  gender: 'unlimited' as GenderLimit,
  playerCount: 8,
  scoring: 'one-set-21',
  courtNumber: '',
  description: '',
  joinType: 'pre-register' as JoinType,
})

const showFullInput = ref(false)

const genderOptions = [
  { label: '不限', value: 'unlimited' as const },
  { label: '男', value: 'male' as const },
  { label: '女', value: 'female' as const },
  { label: '混合', value: 'mixed' as const },
]

const scoringOptions = [
  { label: '一局定胜负·21分', value: 'one-set-21' },
  { label: '三局两胜·21分', value: 'three-set-21' },
  { label: '一局定胜负·11分', value: 'one-set-11' },
]

const formatRules: Record<string, (n: number) => { perPlayer: number; total: number }> = {
  'ba-ren-zhuan': n => ({ perPlayer: n - 1, total: (n * (n - 1)) / 2 }),
  'chao-ba-zhuan': n => ({ perPlayer: n - 1, total: n * 2 }),
  'hun-shuang-zhuan': n => ({ perPlayer: n - 1, total: (n * (n - 1)) / 2 }),
  'zi-you-zhuan': n => ({ perPlayer: n, total: n * 2 }),
  'jin-ji-sai': n => ({ perPlayer: Math.ceil(Math.log2(n)), total: n - 1 }),
}

const computedMatches = computed(() => {
  const calc = formatRules[form.formatId]
  return calc ? calc(form.playerCount) : { perPlayer: 0, total: 0 }
})

const formatSummary = computed(() => {
  const { perPlayer, total } = computedMatches.value
  const scoringText = scoringOptions.find(s => s.value === form.scoring)?.label ?? ''
  return `预计${form.playerCount}人，每人${perPlayer}场，共${total}场\n${scoringText}`
})

function handleClear() {
  form.name = ''
  form.gender = 'unlimited'
  form.playerCount = 8
  form.scoring = 'one-set-21'
  form.courtNumber = ''
  form.description = ''
  form.joinType = 'pre-register'
}

function validate(): boolean {
  if (!form.name.trim()) {
    uni.$u.toast('请输入比赛名称')
    return false
  }
  return true
}

function buildCompetition(status: 'draft' | 'recruiting') {
  const { perPlayer, total } = computedMatches.value
  return {
    id: Date.now().toString(),
    name: form.name,
    mode: form.mode,
    format: form.format,
    formatId: form.formatId,
    gender: form.gender,
    playerCount: form.playerCount,
    matchesPerPlayer: perPlayer,
    totalMatches: total,
    scoring: scoringOptions.find(s => s.value === form.scoring)?.label ?? '',
    courtNumber: form.courtNumber,
    description: form.description,
    status,
    joinType: form.joinType,
    creator: { id: 'me', nickname: '球友小王', avatar: '' },
    players: [{ id: 'me', nickname: '球友小王', avatar: '' }],
    matches: [],
    createdAt: new Date().toISOString(),
    date: new Date().toISOString().split('T')[0],
  }
}

function handleSave() {
  if (!validate())
    return
  competitionStore.addCompetition(buildCompetition('draft'))
  uni.$u.toast('已保存为草稿')
  setTimeout(() => uni.navigateBack(), 500)
}

function handlePublish() {
  if (!validate())
    return
  const comp = buildCompetition('recruiting')
  competitionStore.addCompetition(comp)
  uni.$u.toast('发布成功')
  setTimeout(() => {
    uni.redirectTo({ url: `/pages/activity/match-detail/index?id=${comp.id}` })
  }, 500)
}

onLoad((options: any) => {
  if (options?.mode)
    form.mode = options.mode
  if (options?.format)
    form.format = decodeURIComponent(options.format)
  if (options?.formatId)
    form.formatId = options.formatId
  if (options?.name)
    form.name = decodeURIComponent(options.name)
})
</script>

<style scoped lang="scss">
.form-card {
  padding: 0 28rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 16rpx;
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100rpx;
}

.form-label {
  flex-shrink: 0;
  margin-bottom: 0;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.form-value {
  flex: 1;
  text-align: right;
}

.form-text {
  font-size: 28rpx;
  color: #666;
}

.form-text-sm {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  white-space: pre-line;
}

.form-divider {
  height: 1rpx;
  background: #f5f5f5;
}

.form-chips {
  display: flex;
  gap: 16rpx;
}

.chip {
  padding: 10rpx 28rpx;
  font-size: 24rpx;
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
}
</style>
