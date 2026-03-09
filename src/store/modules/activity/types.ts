export type ActivityStatus = 'recruiting' | 'full' | 'ongoing' | 'finished' | 'cancelled'
export type ActivityType = 'singles' | 'doubles' | 'mixed'
export type PlayerLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced'

export interface Player {
  id: string
  nickname: string
  avatar: string
  level: PlayerLevel
}

export interface Activity {
  id: string
  title: string
  creator: Player
  type: ActivityType
  date: string
  startTime: string
  endTime: string
  venue: string
  address: string
  maxPlayers: number
  currentPlayers: Player[]
  fee: number
  feeType: 'free' | 'aa' | 'fixed'
  levelRequirement: PlayerLevel[]
  status: ActivityStatus
  description: string
  createdAt: string
}

export interface ActivityState {
  activities: Activity[]
  myActivities: Activity[]
}
