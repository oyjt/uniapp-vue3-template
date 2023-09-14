export interface LoginParams {
  phone: string;
  code: string;
}

export interface LoginByCodeParams {
  code: string;
}

export interface LoginResult {
  token: string;
}
