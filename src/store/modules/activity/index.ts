import type { Activity, ActivityState, ActivityStatus } from './types'
import { defineStore } from 'pinia'

const mockActivities: Activity[] = [
  {
    id: '1',
    title: '周末双打约起来',
    creator: { id: '1', nickname: '小明', avatar: '', level: 'intermediate' },
    type: 'doubles',
    date: '2026-03-07',
    startTime: '14:00',
    endTime: '16:00',
    venue: '阳光羽毛球馆',
    address: '朝阳区建国路88号',
    maxPlayers: 4,
    currentPlayers: [
      { id: '1', nickname: '小明', avatar: '', level: 'intermediate' },
      { id: '2', nickname: '小红', avatar: '', level: 'elementary' },
    ],
    fee: 30,
    feeType: 'aa',
    levelRequirement: ['elementary', 'intermediate'],
    status: 'recruiting',
    description: '周末来打球，欢迎新手和中级选手参加！场地已预订，来了直接打。',
    createdAt: '2026-03-06T08:00:00Z',
  },
  {
    id: '2',
    title: '晚间单打练习',
    creator: { id: '3', nickname: '老王', avatar: '', level: 'advanced' },
    type: 'singles',
    date: '2026-03-06',
    startTime: '19:00',
    endTime: '21:00',
    venue: '星空羽毛球俱乐部',
    address: '海淀区中关村大街1号',
    maxPlayers: 2,
    currentPlayers: [
      { id: '3', nickname: '老王', avatar: '', level: 'advanced' },
    ],
    fee: 0,
    feeType: 'free',
    levelRequirement: ['intermediate', 'advanced'],
    status: 'recruiting',
    description: '找一个中级以上的球友切磋，免费场地。',
    createdAt: '2026-03-05T18:00:00Z',
  },
  {
    id: '3',
    title: '公司团建羽毛球赛',
    creator: { id: '4', nickname: '张总', avatar: '', level: 'beginner' },
    type: 'doubles',
    date: '2026-03-08',
    startTime: '10:00',
    endTime: '12:00',
    venue: '国家体育中心',
    address: '东城区体育馆路1号',
    maxPlayers: 8,
    currentPlayers: [
      { id: '4', nickname: '张总', avatar: '', level: 'beginner' },
      { id: '5', nickname: '李四', avatar: '', level: 'beginner' },
      { id: '6', nickname: '王五', avatar: '', level: 'elementary' },
      { id: '7', nickname: '赵六', avatar: '', level: 'intermediate' },
      { id: '8', nickname: '钱七', avatar: '', level: 'beginner' },
    ],
    fee: 50,
    feeType: 'fixed',
    levelRequirement: ['beginner', 'elementary', 'intermediate', 'advanced'],
    status: 'recruiting',
    description: '公司团建活动，所有水平都欢迎，费用公司报销！',
    createdAt: '2026-03-04T10:00:00Z',
  },
  {
    id: '4',
    title: '高手过招',
    creator: { id: '9', nickname: '羽神', avatar: '', level: 'advanced' },
    type: 'singles',
    date: '2026-03-05',
    startTime: '20:00',
    endTime: '22:00',
    venue: '冠军羽毛球馆',
    address: '朝阳区望京街10号',
    maxPlayers: 2,
    currentPlayers: [
      { id: '9', nickname: '羽神', avatar: '', level: 'advanced' },
      { id: '10', nickname: '球王', avatar: '', level: 'advanced' },
    ],
    fee: 40,
    feeType: 'aa',
    levelRequirement: ['advanced'],
    status: 'full',
    description: '只找高级选手切磋，不服来战！',
    createdAt: '2026-03-03T15:00:00Z',
  },
  {
    id: '5',
    title: '新手友谊赛',
    creator: { id: '11', nickname: '小白', avatar: '', level: 'beginner' },
    type: 'doubles',
    date: '2026-03-04',
    startTime: '09:00',
    endTime: '11:00',
    venue: '社区体育馆',
    address: '西城区广安门内大街10号',
    maxPlayers: 4,
    currentPlayers: [
      { id: '11', nickname: '小白', avatar: '', level: 'beginner' },
      { id: '12', nickname: '小菜', avatar: '', level: 'beginner' },
      { id: '13', nickname: '入门', avatar: '', level: 'beginner' },
      { id: '14', nickname: '新手', avatar: '', level: 'beginner' },
    ],
    fee: 20,
    feeType: 'aa',
    levelRequirement: ['beginner'],
    status: 'finished',
    description: '新手一起练球，互相进步',
    createdAt: '2026-03-02T08:00:00Z',
  },
]

const useActivityStore = defineStore('activity', {
  state: (): ActivityState => ({
    activities: mockActivities,
    myActivities: [],
  }),
  getters: {
    recruitingList(): Activity[] {
      return this.activities.filter(a => a.status === 'recruiting')
    },
    filteredList() {
      return (status?: ActivityStatus) => {
        if (!status)
          return this.activities
        return this.activities.filter(a => a.status === status)
      }
    },
    getById() {
      return (id: string) => this.activities.find(a => a.id === id)
    },
    recentActivities(): Activity[] {
      return this.activities
        .filter(a => a.status === 'recruiting')
        .slice(0, 3)
    },
  },
  actions: {
    joinActivity(activityId: string, player: { id: string; nickname: string; avatar: string; level: string }) {
      const activity = this.activities.find(a => a.id === activityId)
      if (!activity)
        return
      if (activity.currentPlayers.length >= activity.maxPlayers)
        return
      if (activity.currentPlayers.some(p => p.id === player.id))
        return
      activity.currentPlayers.push(player as any)
      if (activity.currentPlayers.length >= activity.maxPlayers)
        activity.status = 'full'
    },
    leaveActivity(activityId: string, playerId: string) {
      const activity = this.activities.find(a => a.id === activityId)
      if (!activity)
        return
      activity.currentPlayers = activity.currentPlayers.filter(p => p.id !== playerId)
      if (activity.status === 'full')
        activity.status = 'recruiting'
    },
    addActivity(activity: Activity) {
      this.activities.unshift(activity)
    },
  },
  persist: true,
})

export default useActivityStore
