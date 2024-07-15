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
