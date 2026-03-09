export interface MatchGame {
  playerAScore: number
  playerBScore: number
}

export interface MatchRecord {
  id: string
  type: 'singles' | 'doubles'
  playerA: string
  playerB: string
  games: MatchGame[]
  winner: 'A' | 'B' | null
  duration: number
  date: string
  venue: string
}

export interface MatchStats {
  totalMatches: number
  wins: number
  losses: number
  winRate: number
  currentStreak: number
  bestStreak: number
  thisMonth: number
  thisWeek: number
}

export interface MatchState {
  records: MatchRecord[]
}
