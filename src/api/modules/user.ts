/**
 * 用户信息相关接口
 */
const http = uni.$u.http

// 手机号登录
export const login = (params = {}) => http.post('/phoneLogin', params)

// 手机号密码登录
export const loginByPassword = (params = {}) => http.post('/phonePasswordLogin', params)

// 微信登录
export const wxLogin = (params = {}) => http.post('/wxLogin', params)
