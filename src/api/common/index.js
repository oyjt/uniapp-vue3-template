/**
 * 通用接口
 */
import { post, upload } from '@/utils/request';

// 文件上传
export const uploadFile = filePath =>
  upload('/common/upload', { filePath, name: 'file' });

// 发送验证码
export const sendCode = data => post('/sendCode', { data });
