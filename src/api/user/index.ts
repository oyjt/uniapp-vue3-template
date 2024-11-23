/**
 * 用户信息相关接口
 */
import type { CommonRes } from '@/api/common/types';
import type { LoginByCodeReq, LoginByCodeRes, LoginReq, LoginRes, ProfileReq, ProfileRes } from './types';
import { get, post } from '@/utils/request';

/** 获取用户信息 */
export const profile = (params?: ProfileReq) => get<ProfileRes>('/user/profile', { params });

/** 登录 */
export const login = (data: LoginReq) => post<LoginRes>('/user/login', { data, custom: { auth: false } });

/** 验证码登录 */
export const loginByCode = (data: LoginByCodeReq) => post<LoginByCodeRes>('/user/loginByCode', { data });

/** 退出登录 */
export const logout = () => post<CommonRes>('/user/logout');
