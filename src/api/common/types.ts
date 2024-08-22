export interface CommonParams {
  [key: string]: any;
}

export interface CommonResult {
  [key: string]: any;
}

export interface UploadImageResult {
  file: string;
  url: string;
}

export interface SendCodeParams {
  phone: number;
  code: number;
}

export interface SendCodeResult {
  code: number;
}
