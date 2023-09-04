/**
 * 通用接口
 */
const http = uni.$u.http

// 图片上传
export const uploadImage = (imagePath:string) => http.upload('/common/upload', {
  filePath: imagePath, // 要上传文件资源的路径
  name: 'file'
})

// 发送验证码
export const sendCode = (params = {}) => http.post('/sendCode', params)
