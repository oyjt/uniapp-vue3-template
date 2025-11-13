const storage = {
  set(key, value) {
    if (key !== null && value !== null)
      uni.setStorageSync(key, value);
  },
  get(key) {
    if (key === null)
      return null;

    return uni.getStorageSync(key);
  },
  setJSON(key, jsonValue) {
    if (jsonValue !== null)
      this.set(key, JSON.stringify(jsonValue));
  },
  getJSON(key) {
    const value = this.get(key);
    if (value) return JSON.parse(value);
  },
  remove(key) {
    uni.removeStorageSync(key);
  },
};

export default storage;
