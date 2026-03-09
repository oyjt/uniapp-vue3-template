export type CompetitionStatus = 'draft' | 'recruiting' | 'full' | 'ongoing' | 'finished'
export type GenderLimit = 'unlimited' | 'male' | 'female' | 'mixed'
export type JoinType = 'pre-register' | 'onsite'

export interface CompetitionPlayer {
  id: string
  nickname: string
  avatar: string
}

export interface CompetitionMatch {
  id: string
  round: number
  court: string
  playerA: string
  playerB: string
  scoreA: number
  scoreB: number
  status: 'pending' | 'playing' | 'finished'
}

export interface Competition {
  id: string
  name: string
  mode: 'singles' | 'doubles'
  format: string
  formatId: string
  gender: GenderLimit
  playerCount: number
  matchesPerPlayer: number
  totalMatches: number
  scoring: string
  courtNumber: string
  description: string
  status: CompetitionStatus
  joinType: JoinType
  creator: CompetitionPlayer
  players: CompetitionPlayer[]
  matches: CompetitionMatch[]
  createdAt: string
  date: string
}

export interface CompetitionState {
  competitions: Competition[]
}
