/**
 * 用户信息相关接口
 */
const http = uni.$u.http

// 手机号登录
export const login = (params) => http.post('/phonelogin', params)

// 手机号密码登录
export const loginByPassword = (params) => http.post('/phonepasswordlogin', params)

// 微信登录
export const wxlogin = (params) => http.post('/wxlogin', params)