/**
 * 用户信息相关接口
 */
import { get, post } from '@/utils/request';

/** 获取用户信息 */
export const profile = params => get('/user/profile', { params });

/** 登录 */
export const login = data => post('/user/login', { data, custom: { auth: false } });

/** 验证码登录 */
export const loginByCode = data => post('/user/loginByCode', { data });

/** 退出登录 */
export const logout = () => post('/user/logout');
