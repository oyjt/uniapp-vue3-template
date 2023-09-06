const TokenKey = 'admin-token';
const TokenPrefix = 'Bearer ';
const isLogin = () => {
  return !!uni.getStorageSync(TokenKey);
};
const getToken = () => {
  return uni.getStorageSync(TokenKey);
};
const setToken = (token: string) => {
  uni.setStorageSync(TokenKey, token);
};
const clearToken = () => {
  uni.removeStorageSync(TokenKey);
};
export { TokenPrefix, isLogin, getToken, setToken, clearToken };
