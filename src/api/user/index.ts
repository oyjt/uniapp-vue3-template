/**
 * 用户信息相关接口
 */
import { get, post } from '@/utils/request'
import type { UserState } from '@/store/modules/user/types'

enum URL {
  login = '/user/login',
  logout = '/user/logout',
  profile = '/user/profile'
}
interface LoginRes {
  token: string
}

interface LoginData {
  username: string
  password: string
}

export const getUserProfile = () => get<UserState>({ url: URL.profile })
export const login = (data: LoginData) => post<any>({ url: URL.login, data })
export const logout = () => post<LoginRes>({ url: URL.logout })
