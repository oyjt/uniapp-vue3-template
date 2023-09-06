/**
 * 通用接口
 */
import { post, upload } from '@/utils/request'

enum URL {
  upload = '/common/upload',
  sendCode = '/sendCode'
}

interface SendCodeData {
  phone: string | number
  code: string | number
}

// 图片上传
export const uploadImage = (imagePath: string) =>
  upload({ url: URL.upload, filePath: imagePath, name: 'file' })

// 发送验证码
export const sendCode = (data: SendCodeData) => post<any>({ url: URL.sendCode, data })
