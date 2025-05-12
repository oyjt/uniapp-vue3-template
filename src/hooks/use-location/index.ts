import type { AddressInfo, LocationInfo, LocationOptions } from './types';

/**
 * 定位hooks，提供定位相关功能
 * - 获取位置
 * - 位置监听
 * - 地址解析
 * - 距离计算
 */
export default function useLocation() {
  // 当前位置信息
  const location = ref<LocationInfo | null>(null);

  // 定位状态
  const isLocating = ref(false);

  // 是否正在监听位置
  const isWatching = ref(false);

  // 定位错误信息
  const error = ref<any>(null);

  // 历史位置
  const historyLocations = ref<LocationInfo[]>([]);

  // 监听位置的定时器ID
  let watchId: number | null = null;

  /**
   * 获取当前位置
   * @param options 定位选项
   */
  const getLocation = (options: LocationOptions = {}) => {
    isLocating.value = true;
    error.value = null;

    const defaultOptions: LocationOptions = {
      type: 'gcj02',
      altitude: false,
      isHighAccuracy: false,
    };

    const finalOptions = { ...defaultOptions, ...options };

    return new Promise<LocationInfo>((resolve, reject) => {
      uni.getLocation({
        type: finalOptions.type,
        altitude: finalOptions.altitude,
        isHighAccuracy: finalOptions.isHighAccuracy,
        highAccuracyExpireTime: finalOptions.highAccuracyExpireTime,
        success: (res) => {
          // 更新当前位置
          const locationData: LocationInfo = {
            ...res,
            timestamp: Date.now(),
          };

          location.value = locationData;

          // 添加到历史记录
          historyLocations.value.push(locationData);

          // 只保留最近的20条记录
          if (historyLocations.value.length > 20) {
            historyLocations.value.shift();
          }

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

  /**
   * 使用地理编码获取地址信息
   * @param latitude 纬度
   * @param longitude 经度
   */
  const getAddress = (latitude: number, longitude: number) => {
    return new Promise<AddressInfo>((resolve, reject) => {
      // #ifdef APP-PLUS
      uni.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=YOUR_KEY`,
        success: (res: any) => {
          if (res.data && res.data.status === 0) {
            const addressComponent = res.data.result.address_component;
            const formattedAddress = res.data.result.formatted_addresses.recommend;

            const addressInfo: AddressInfo = {
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
        fail: (err) => {
          reject(err);
        },
      });
      // #endif

      // #ifndef APP-PLUS
      // 其他平台可以使用uni.getLocation的geocode参数获取（仅App和微信小程序支持）
      // 或者使用其他地图服务的API
      reject(new Error('当前平台不支持地址解析'));
      // #endif
    });
  };

  /**
   * 停止监听位置
   */
  const stopWatchLocation = () => {
    if (watchId !== null) {
      clearInterval(watchId);
      watchId = null;
    }

    isWatching.value = false;
  };

  /**
   * 开始监听位置变化
   * @param options 定位选项
   * @param interval 监听间隔，单位毫秒
   */
  const watchLocation = (options: LocationOptions = {}, interval: number = 5000) => {
    // 已经在监听，先停止
    if (isWatching.value) {
      stopWatchLocation();
    }

    isWatching.value = true;

    // 首次定位
    getLocation(options).catch((err) => {
      console.error('监听位置首次定位失败', err);
    });

    // 定时获取位置
    watchId = window.setInterval(() => {
      if (isWatching.value) {
        getLocation(options).catch((err) => {
          console.error('监听位置更新失败', err);
        });
      }
    }, interval);

    return watchId;
  };

  /**
   * 计算两点间距离（米）
   * @param lat1 第一个点的纬度
   * @param lon1 第一个点的经度
   * @param lat2 第二个点的纬度
   * @param lon2 第二个点的经度
   * @returns 距离，单位：米
   */
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // 地球半径，单位米
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a
      = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.cos((lat1 * Math.PI) / 180)
        * Math.cos((lat2 * Math.PI) / 180)
        * Math.sin(dLon / 2)
        * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  /**
   * 获取当前位置到目标位置的距离
   * @param targetLat 目标位置纬度
   * @param targetLon 目标位置经度
   * @returns 距离，单位：米，如果当前没有位置信息则返回-1
   */
  const getDistanceFromCurrent = (targetLat: number, targetLon: number): number => {
    if (!location.value) {
      return -1;
    }

    return calculateDistance(
      location.value.latitude,
      location.value.longitude,
      targetLat,
      targetLon,
    );
  };

  /**
   * 格式化距离显示
   * @param distance 距离，单位：米
   * @returns 格式化后的距离字符串
   */
  const formatDistance = (distance: number): string => {
    if (distance < 0) {
      return '未知距离';
    }
    else if (distance < 1000) {
      return `${Math.round(distance)}米`;
    }
    else {
      return `${(distance / 1000).toFixed(1)}公里`;
    }
  };

  /**
   * 打开导航
   * @param latitude 目标纬度
   * @param longitude 目标经度
   * @param name 目标名称
   * @param address 目标地址
   */
  const openLocation = (
    latitude: number,
    longitude: number,
    name: string = '',
    address: string = '',
  ) => {
    return new Promise<void>((resolve, reject) => {
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

  /**
   * 选择位置
   */
  const chooseLocation = () => {
    return new Promise<UniApp.ChooseLocationSuccess>((resolve, reject) => {
      uni.chooseLocation({
        success: (res) => {
          // 更新当前位置
          if (res.latitude && res.longitude) {
            const locationData: LocationInfo = {
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

  // 自动清理
  onUnmounted(() => {
    stopWatchLocation();
  });

  return {
    // 状态
    location,
    isLocating,
    isWatching,
    error,
    historyLocations,

    // 方法
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
