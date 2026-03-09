import type { MatchRecord, MatchState, MatchStats } from './types'
import { defineStore } from 'pinia'

const mockRecords: MatchRecord[] = [
  {
    id: '1',
    type: 'singles',
    playerA: '我',
    playerB: '老王',
    games: [
      { playerAScore: 21, playerBScore: 18 },
      { playerAScore: 21, playerBScore: 15 },
    ],
    winner: 'A',
    duration: 45,
    date: '2026-03-05',
    venue: '星空羽毛球俱乐部',
  },
  {
    id: '2',
    type: 'singles',
    playerA: '我',
    playerB: '小明',
    games: [
      { playerAScore: 21, playerBScore: 19 },
      { playerAScore: 18, playerBScore: 21 },
      { playerAScore: 21, playerBScore: 17 },
    ],
    winner: 'A',
    duration: 68,
    date: '2026-03-04',
    venue: '阳光羽毛球馆',
  },
  {
    id: '3',
    type: 'doubles',
    playerA: '我 & 小红',
    playerB: '老王 & 李四',
    games: [
      { playerAScore: 15, playerBScore: 21 },
      { playerAScore: 21, playerBScore: 19 },
      { playerAScore: 18, playerBScore: 21 },
    ],
    winner: 'B',
    duration: 72,
    date: '2026-03-03',
    venue: '国家体育中心',
  },
  {
    id: '4',
    type: 'singles',
    playerA: '我',
    playerB: '张总',
    games: [
      { playerAScore: 21, playerBScore: 8 },
      { playerAScore: 21, playerBScore: 12 },
    ],
    winner: 'A',
    duration: 28,
    date: '2026-03-02',
    venue: '社区体育馆',
  },
  {
    id: '5',
    type: 'singles',
    playerA: '我',
    playerB: '羽神',
    games: [
      { playerAScore: 12, playerBScore: 21 },
      { playerAScore: 15, playerBScore: 21 },
    ],
    winner: 'B',
    duration: 35,
    date: '2026-03-01',
    venue: '冠军羽毛球馆',
  },
  {
    id: '6',
    type: 'singles',
    playerA: '我',
    playerB: '小菜',
    games: [
      { playerAScore: 21, playerBScore: 10 },
      { playerAScore: 21, playerBScore: 14 },
    ],
    winner: 'A',
    duration: 25,
    date: '2026-02-28',
    venue: '社区体育馆',
  },
]

const useMatchStore = defineStore('match', {
  state: (): MatchState => ({
    records: mockRecords,
  }),
  getters: {
    stats(): MatchStats {
      const total = this.records.length
      const wins = this.records.filter(r => r.winner === 'A').length
      const losses = total - wins

      let currentStreak = 0
      for (const record of this.records) {
        if (record.winner === 'A')
          currentStreak++
        else break
      }

      let bestStreak = 0
      let tempStreak = 0
      for (const record of this.records) {
        if (record.winner === 'A') {
          tempStreak++
          bestStreak = Math.max(bestStreak, tempStreak)
        }
        else {
          tempStreak = 0
        }
      }

      const now = new Date()
      const thisMonth = this.records.filter((r) => {
        const d = new Date(r.date)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      }).length

      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      const thisWeek = this.records.filter(r => new Date(r.date) >= weekStart).length

      return {
        totalMatches: total,
        wins,
        losses,
        winRate: total > 0 ? Math.round((wins / total) * 100) : 0,
        currentStreak,
        bestStreak,
        thisMonth,
        thisWeek,
      }
    },
    recentRecords(): MatchRecord[] {
      return this.records.slice(0, 5)
    },
  },
  actions: {
    addRecord(record: MatchRecord) {
      this.records.unshift(record)
    },
  },
  persist: true,
})

export default useMatchStore
