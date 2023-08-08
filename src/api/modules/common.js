/**
 * 通用接口
 */
const http = uni.$u.http

// 图片上传
export const uploadImage = (imagePath) => http.upload('/common/upload', {
  filePath: imagePath, // 要上传文件资源的路径
  name: 'file'
})

// 发送验证码
export const sendcode = (params) => http.post('/sendcode', params)

// 根据字典类型查询字典数据信息
export const getDicts = (dictType) => http.get('/system/dict/data/dictdataitemlist', {
  params: {
    dictType
  }
})