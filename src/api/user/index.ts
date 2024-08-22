/**
 * 用户信息相关接口
 */
import type { LoginByCodeParams, LoginByCodeResult, LoginParams, LoginResult, ProfileParams } from './types';
import { get, post } from '@/utils/request';
import type { UserState } from '@/store/modules/user/types';
import type { CommonResult } from '@/api/common/types';

enum URL {
  login = '/user/login',
  loginByCode = '/user/loginByCode',
  logout = '/user/logout',
  profile = '/user/profile',
}

export const getUserProfile = (params?: ProfileParams) => get<UserState>({ url: URL.profile, params });
export const login = (data: LoginParams) => post<LoginResult>({ url: URL.login, data });
export const loginByCode = (data: LoginByCodeParams) => post<LoginByCodeResult>({ url: URL.loginByCode, data });
export const logout = () => post<CommonResult>({ url: URL.logout });
