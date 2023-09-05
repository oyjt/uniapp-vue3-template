export type RoleType = '' | '*' | 'user'
export interface UserState {
  user_id?: string
  user_name?: string
  avatar?: string
  password?: string
  token?: string
}
