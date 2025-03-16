// 通用响应格式
export interface IResponse<T = any> {
  code: number | string;
  result: T;
  message: string;
  status: string | number;
}

// 分页请求参数
export interface PageParams {
  page: number;
  pageSize: number;
  [key: string]: any;
}

// 分页响应数据
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
