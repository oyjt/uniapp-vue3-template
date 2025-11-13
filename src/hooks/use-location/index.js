export default function useLocation() {
  const location = ref(null);
  const isLocating = ref(false);
  const isWatching = ref(false);
  const error = ref(null);
  const historyLocations = ref([]);
  let watchId = null;

  const getLocation = (options = {}) => {
    isLocating.value = true;
    error.value = null;
    const defaultOptions = { type: 'gcj02', altitude: false, isHighAccuracy: false };
    const finalOptions = { ...defaultOptions, ...options };
    return new Promise((resolve, reject) => {
      uni.getLocation({
        type: finalOptions.type,
        altitude: finalOptions.altitude,
        isHighAccuracy: finalOptions.isHighAccuracy,
        highAccuracyExpireTime: finalOptions.highAccuracyExpireTime,
        success: (res) => {
          const locationData = { ...res, timestamp: Date.now() };
          location.value = locationData;
          historyLocations.value.push(locationData);
          if (historyLocations.value.length > 20) historyLocations.value.shift();
          finalOptions.success && finalOptions.success(res);
          resolve(locationData);
        },
        fail: (err) => {
          error.value = err;
          finalOptions.fail && finalOptions.fail(err);
          reject(err);
        },
        complete: () => {
          isLocating.value = false;
          finalOptions.complete && finalOptions.complete();
        },
      });
    });
  };

  const getAddress = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      // #ifdef APP-PLUS
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=YOUR_KEY`,
        success: (res) => {
          if (res.data && res.data.status === 0) {
            const addressComponent = res.data.result.address_component;
            const formattedAddress = res.data.result.formatted_addresses.recommend;
            const addressInfo = {
              nation: addressComponent.nation,
              province: addressComponent.province,
              city: addressComponent.city,
              district: addressComponent.district,
              street: addressComponent.street,
              streetNum: addressComponent.street_number,
              poiName: res.data.result.poi_count > 0 ? res.data.result.pois[0].title : '',
              cityCode: res.data.result.ad_info.city_code,
            };
            if (location.value) {
              location.value.address = addressInfo;
              location.value.formatted = formattedAddress;
            }
            resolve(addressInfo);
          }
          else {
            reject(new Error('获取地址信息失败'));
          }
        },
        fail: err => reject(err),
      });
      // #endif
      // #ifndef APP-PLUS
      reject(new Error('当前平台不支持地址解析'));
      // #endif
    });
  };

  const stopWatchLocation = () => {
    if (watchId !== null) {
      clearInterval(watchId);
      watchId = null;
    }
    isWatching.value = false;
  };

  const watchLocation = (options = {}, interval = 5000) => {
    if (isWatching.value) stopWatchLocation();
    isWatching.value = true;
    getLocation(options).catch((err) => {
      console.error('监听位置首次定位失败', err);
    });
    watchId = window.setInterval(() => {
      if (isWatching.value) {
        getLocation(options).catch((err) => {
          console.error('监听位置更新失败', err);
        });
      }
    }, interval);
    return watchId;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos((lat1 * Math.PI) / 180)
      * Math.cos((lat2 * Math.PI) / 180)
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getDistanceFromCurrent = (targetLat, targetLon) => {
    if (!location.value) return -1;
    return calculateDistance(
      location.value.latitude,
      location.value.longitude,
      targetLat,
      targetLon,
    );
  };

  const formatDistance = (distance) => {
    if (distance < 0) return '未知距离';
    if (distance < 1000) return `${Math.round(distance)}米`;
    return `${(distance / 1000).toFixed(1)}公里`;
  };

  const openLocation = (latitude, longitude, name = '', address = '') => {
    return new Promise((resolve, reject) => {
      uni.openLocation({
        latitude,
        longitude,
        name,
        address,
        success: () => resolve(),
        fail: err => reject(err),
      });
    });
  };

  const chooseLocation = () => {
    return new Promise((resolve, reject) => {
      uni.chooseLocation({
        success: (res) => {
          if (res.latitude && res.longitude) {
            const locationData = {
              latitude: res.latitude,
              longitude: res.longitude,
              accuracy: 0,
              verticalAccuracy: 0,
              horizontalAccuracy: 0,
              altitude: 0,
              speed: 0,
              timestamp: Date.now(),
              address: {
                province: '',
                city: '',
                district: '',
                street: '',
                poiName: res.name,
              },
              formatted: res.address,
            };
            location.value = locationData;
          }
          resolve(res);
        },
        fail: err => reject(err),
      });
    });
  };

  onUnmounted(() => { stopWatchLocation(); });

  return {
    location,
    isLocating,
    isWatching,
    error,
    historyLocations,
    getLocation,
    getAddress,
    watchLocation,
    stopWatchLocation,
    calculateDistance,
    getDistanceFromCurrent,
    formatDistance,
    openLocation,
    chooseLocation,
  };
}
