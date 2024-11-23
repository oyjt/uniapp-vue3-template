export interface CommonReq {
  [key: string]: any;
}

export interface CommonRes {
  [key: string]: any;
}

export interface UploadRes {
  file: string;
  url: string;
}

export interface SendCodeReq {
  phone: number;
  code: number;
}

export interface SendCodeRes {
  code: number;
}
