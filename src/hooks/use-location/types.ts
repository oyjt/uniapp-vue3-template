// 定位选项
export interface LocationOptions {
  type?: 'wgs84' | 'gcj02';
  altitude?: boolean;
  isHighAccuracy?: boolean;
  highAccuracyExpireTime?: number;
  success?: (res: UniApp.GetLocationSuccess) => void;
  fail?: (err: any) => void;
  complete?: () => void;
}

// 地址信息
export interface AddressInfo {
  nation?: string;
  province?: string;
  city?: string;
  district?: string;
  street?: string;
  streetNum?: string;
  poiName?: string;
  postalCode?: string;
  cityCode?: string;
}

// 位置信息
export interface LocationInfo extends UniApp.GetLocationSuccess {
  address?: AddressInfo;
  formatted?: string;
  timestamp?: number;
}
