const TokenKey = 'admin-token';
const TokenPrefix = 'Bearer ';
function isLogin() {
  return !!uni.getStorageSync(TokenKey);
}
function getToken() {
  return uni.getStorageSync(TokenKey);
}
function setToken(token) {
  uni.setStorageSync(TokenKey, token);
}
function clearToken() {
  uni.removeStorageSync(TokenKey);
}
export { clearToken, getToken, isLogin, setToken, TokenPrefix };
