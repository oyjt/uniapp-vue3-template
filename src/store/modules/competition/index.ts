import type { Competition, CompetitionPlayer, CompetitionState } from './types'
import { defineStore } from 'pinia'

const mockCompetitions: Competition[] = [
  {
    id: 'c1',
    name: '周末八人转友谊赛',
    mode: 'doubles',
    format: '八人转',
    formatId: 'ba-ren-zhuan',
    gender: 'unlimited',
    playerCount: 8,
    matchesPerPlayer: 7,
    totalMatches: 14,
    scoring: '一局定胜负，21分制',
    courtNumber: '3号场',
    description: '欢迎各位球友参加，打完聚餐！',
    status: 'recruiting',
    joinType: 'pre-register',
    creator: { id: 'me', nickname: '球友小王', avatar: '' },
    players: [
      { id: 'me', nickname: '球友小王', avatar: '' },
      { id: 'p1', nickname: '老王', avatar: '' },
      { id: 'p2', nickname: '小明', avatar: '' },
      { id: 'p3', nickname: '小红', avatar: '' },
      { id: 'p4', nickname: '张总', avatar: '' },
    ],
    matches: [],
    createdAt: '2026-03-06T10:00:00Z',
    date: '2026-03-08',
  },
  {
    id: 'c2',
    name: '单打晋级赛',
    mode: 'singles',
    format: '晋级赛',
    formatId: 'jin-ji-sai',
    gender: 'male',
    playerCount: 8,
    matchesPerPlayer: 3,
    totalMatches: 7,
    scoring: '三局两胜，21分制',
    courtNumber: '',
    description: '高手对决，按实力分组',
    status: 'recruiting',
    joinType: 'pre-register',
    creator: { id: 'u2', nickname: '羽神', avatar: '' },
    players: [
      { id: 'u2', nickname: '羽神', avatar: '' },
      { id: 'u3', nickname: '老王', avatar: '' },
    ],
    matches: [],
    createdAt: '2026-03-05T14:00:00Z',
    date: '2026-03-09',
  },
]

const useCompetitionStore = defineStore('competition', {
  state: (): CompetitionState => ({
    competitions: mockCompetitions,
  }),
  getters: {
    recruitingList(): Competition[] {
      return this.competitions.filter(c => c.status === 'recruiting')
    },
    getById() {
      return (id: string) => this.competitions.find(c => c.id === id)
    },
    recentCompetitions(): Competition[] {
      return this.competitions
        .filter(c => c.status !== 'draft')
        .slice(0, 3)
    },
  },
  actions: {
    addCompetition(comp: Competition) {
      this.competitions.unshift(comp)
    },
    joinCompetition(compId: string, player: CompetitionPlayer) {
      const comp = this.competitions.find(c => c.id === compId)
      if (!comp || comp.players.some(p => p.id === player.id))
        return
      comp.players.push(player)
      if (comp.players.length >= comp.playerCount)
        comp.status = 'full'
    },
    startCompetition(compId: string) {
      const comp = this.competitions.find(c => c.id === compId)
      if (comp)
        comp.status = 'ongoing'
    },
  },
  persist: true,
})

export type { Competition, CompetitionPlayer }
export default useCompetitionStore
