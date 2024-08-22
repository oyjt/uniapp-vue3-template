export interface ProfileParams {
  user_id?: string;
}

export interface LoginParams {
  phone: string;
  code: string;
}

export interface LoginByCodeParams {
  code: string;
}

export interface LoginByCodeResult {
  [key: string]: any;
}

export interface LoginResult {
  token: string;
  user_id: number;
  user_name: string;
  avatar: string;
}
