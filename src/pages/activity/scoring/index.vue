<template>
  <view class="scoring-page min-h-screen flex flex-col" style="background: #1a1a2e;">
    <!-- Header -->
    <view class="flex items-center justify-between px-30rpx pb-20rpx pt-100rpx">
      <view class="i-mdi-arrow-left text-44rpx text-white" @click="goBack" />
      <text class="text-32rpx text-white font-bold">
        比赛记分
      </text>
      <view class="i-mdi-refresh text-44rpx text-white/60" @click="handleReset" />
    </view>

    <!-- Game indicators -->
    <view class="flex items-center justify-center gap-20rpx py-20rpx">
      <view
        v-for="i in 3"
        :key="i"
        class="game-dot"
        :class="{ active: currentGame === i - 1, done: i - 1 < finishedGames.length }"
      >
        <text class="text-22rpx">
          G{{ i }}
        </text>
      </view>
      <text class="ml-16rpx text-24rpx text-white/40">
        第{{ currentGame + 1 }}局
      </text>
    </view>

    <!-- Score display -->
    <view class="flex flex-1">
      <view class="score-half" @click="addScore('A')">
        <text class="player-name">
          {{ playerA }}
        </text>
        <text class="score" :class="{ leading: scoreA > scoreB }">
          {{ scoreA }}
        </text>
        <text class="score-hint">
          点击加分
        </text>
      </view>

      <view class="score-divider">
        <text class="text-40rpx text-white/30">
          :
        </text>
      </view>

      <view class="score-half" @click="addScore('B')">
        <text class="player-name">
          {{ playerB }}
        </text>
        <text class="score" :class="{ leading: scoreB > scoreA }">
          {{ scoreB }}
        </text>
        <text class="score-hint">
          点击加分
        </text>
      </view>
    </view>

    <!-- Game history -->
    <view v-if="finishedGames.length > 0" class="px-40rpx py-20rpx">
      <view
        v-for="(game, i) in finishedGames"
        :key="i"
        class="flex justify-between border-b border-white/10 py-12rpx"
      >
        <text class="text-24rpx text-white/50">
          第{{ i + 1 }}局
        </text>
        <text
          class="text-24rpx font-bold"
          :style="{ color: game.playerAScore > game.playerBScore ? '#21d59d' : '#fa4e62' }"
        >
          {{ game.playerAScore }} : {{ game.playerBScore }}
        </text>
      </view>
    </view>

    <!-- Controls -->
    <view class="px-30rpx pb-safe">
      <view class="mb-30rpx flex gap-20rpx">
        <view class="ctrl-btn" @click="undoScore">
          <view class="i-mdi-undo text-36rpx" />
          <text class="text-24rpx">
            撤销
          </text>
        </view>
        <view class="ctrl-btn primary flex-1" @click="handleEndGame">
          <text class="text-28rpx font-bold">
            结束本局
          </text>
        </view>
        <view class="ctrl-btn" @click="handleSwap">
          <view class="i-mdi-swap-horizontal text-36rpx" />
          <text class="text-24rpx">
            换边
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { MatchGame } from '@/store/modules/match/types'
import { useMatchStore } from '@/store'

const matchStore = useMatchStore()

const playerA = ref('玩家A')
const playerB = ref('玩家B')
const scoreA = ref(0)
const scoreB = ref(0)
const currentGame = ref(0)
const finishedGames = ref<MatchGame[]>([])
const scoreHistory = ref<Array<'A' | 'B'>>([])
const startTime = ref(Date.now())

function addScore(player: 'A' | 'B') {
  if (player === 'A')
    scoreA.value++
  else
    scoreB.value++
  scoreHistory.value.push(player)

  checkAutoEnd()
}

function checkAutoEnd() {
  const a = scoreA.value
  const b = scoreB.value
  const reachedWinScore = a >= 21 || b >= 21
  const hasEnoughGap = Math.abs(a - b) >= 2
  const reachedCap = a >= 30 || b >= 30

  if (reachedWinScore && (hasEnoughGap || reachedCap))
    endCurrentGame()
}

function undoScore() {
  const last = scoreHistory.value.pop()
  if (!last)
    return
  if (last === 'A')
    scoreA.value = Math.max(0, scoreA.value - 1)
  else
    scoreB.value = Math.max(0, scoreB.value - 1)
}

function endCurrentGame() {
  finishedGames.value.push({
    playerAScore: scoreA.value,
    playerBScore: scoreB.value,
  })

  const aWins = finishedGames.value.filter(g => g.playerAScore > g.playerBScore).length
  const bWins = finishedGames.value.filter(g => g.playerBScore > g.playerAScore).length

  if (aWins >= 2 || bWins >= 2 || finishedGames.value.length >= 3) {
    finishMatch(aWins, bWins)
    return
  }

  scoreA.value = 0
  scoreB.value = 0
  scoreHistory.value = []
  currentGame.value++
}

function handleEndGame() {
  if (scoreA.value === 0 && scoreB.value === 0) {
    uni.$u.toast('还未开始计分')
    return
  }
  endCurrentGame()
}

function finishMatch(aWins: number, bWins: number) {
  const winner = aWins > bWins ? 'A' : 'B'
  const duration = Math.round((Date.now() - startTime.value) / 60000) || 1

  matchStore.addRecord({
    id: Date.now().toString(),
    type: 'singles',
    playerA: playerA.value,
    playerB: playerB.value,
    games: [...finishedGames.value],
    winner: winner as 'A' | 'B',
    duration,
    date: new Date().toISOString().split('T')[0],
    venue: '',
  })

  const winnerName = winner === 'A' ? playerA.value : playerB.value
  uni.showModal({
    title: '比赛结束',
    content: `${winnerName} 获胜！(${aWins}:${bWins})`,
    showCancel: false,
    success: () => uni.navigateBack(),
  })
}

function handleReset() {
  uni.showModal({
    title: '重置比赛',
    content: '确定要重置当前比赛吗？',
    success: (res) => {
      if (res.confirm) {
        scoreA.value = 0
        scoreB.value = 0
        currentGame.value = 0
        finishedGames.value = []
        scoreHistory.value = []
        startTime.value = Date.now()
      }
    },
  })
}

function handleSwap() {
  const tmpName = playerA.value
  playerA.value = playerB.value
  playerB.value = tmpName
  const tmpScore = scoreA.value
  scoreA.value = scoreB.value
  scoreB.value = tmpScore
}

function goBack() {
  if (scoreA.value > 0 || scoreB.value > 0 || finishedGames.value.length > 0) {
    uni.showModal({
      title: '提示',
      content: '比赛进行中，确定退出吗？',
      success: res => res.confirm && uni.navigateBack(),
    })
  }
  else {
    uni.navigateBack()
  }
}

onLoad((options: any) => {
  if (options?.playerA)
    playerA.value = options.playerA
  if (options?.playerB)
    playerB.value = options.playerB
})
</script>

<style scoped lang="scss">
.game-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
  color: rgb(255 255 255 / 30%);
  border: 2rpx solid rgb(255 255 255 / 20%);
  border-radius: 50%;

  &.active {
    color: #fff;
    background: var(--theme-primary);
    border-color: var(--theme-primary);
  }

  &.done {
    color: rgb(255 255 255 / 60%);
    background: rgb(255 255 255 / 10%);
    border-color: rgb(255 255 255 / 30%);
  }
}

.score-half {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.1s;

  &:active {
    background: rgb(255 255 255 / 5%);
  }
}

.score-divider {
  display: flex;
  align-items: center;
  padding: 0 10rpx;
}

.player-name {
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: rgb(255 255 255 / 60%);
}

.score {
  font-size: 160rpx;
  font-weight: bold;
  line-height: 1;
  color: rgb(255 255 255 / 80%);
  transition: color 0.2s;

  &.leading {
    color: #21d59d;
  }
}

.score-hint {
  margin-top: 20rpx;
  font-size: 22rpx;
  color: rgb(255 255 255 / 25%);
}

.ctrl-btn {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  align-items: center;
  justify-content: center;
  padding: 20rpx 30rpx;
  color: rgb(255 255 255 / 70%);
  background: rgb(255 255 255 / 10%);
  border-radius: 16rpx;

  &.primary {
    color: #fff;
    background: var(--theme-primary);
  }
}
</style>
