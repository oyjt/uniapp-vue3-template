// 返回res.data的interface
export interface IResponse<T = any> {
  code: number | string;
  result: T;
  message: string;
  status: string | number;
}
