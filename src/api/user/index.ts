/**
 * 用户信息相关接口
 */
import type { LoginByCodeParams, LoginParams, LoginResult } from './types';
import { get, post } from '@/utils/request';
import type { UserState } from '@/store/modules/user/types';

enum URL {
  login = '/user/login',
  loginByCode = '/user/loginByCode',
  logout = '/user/logout',
  profile = '/user/profile',
}

export const getUserProfile = () => get<UserState>({ url: URL.profile });
export const login = (data: LoginParams) => post<LoginResult>({ url: URL.login, data });
export const loginByCode = (data: LoginByCodeParams) => post<any>({ url: URL.loginByCode, data });
export const logout = () => post<any>({ url: URL.logout });
