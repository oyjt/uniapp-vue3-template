/**
 * 用户信息相关接口
 */
// import { UserState } from '/@/store/modules/user/types'
const http = uni.$u.http
enum URL {
  login = '/user/login',
  logout = '/user/logout',
  profile = '/user/profile'
}
interface LoginRes {
  token: string
}

export interface LoginData {
  username: string
  password: string
}

export const getUserProfile = () => http.get(URL.profile)
export const login = (data: LoginData) => http.post(URL.login, data)
export const logout = () => http.post(URL.logout)
