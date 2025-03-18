<template>
  <view class="box-border min-h-screen bg-white px-60rpx">
    <view class="pt-200rpx">
      <view class="mb-100rpx text-48rpx font-600">
        登录
      </view>
      <view>
        <wd-input v-model="tel" type="number" placeholder="请输入手机号" />
        <view class="my-40rpx">
          <wd-input v-model="code" type="number" placeholder="请输入验证码">
            <template #suffix>
              <wd-button type="success" size="small" @click="getCode">
                {{ tips }}
              </wd-button>
            </template>
          </wd-input>
        </view>
      </view>
      <view class="my-20rpx mb-60rpx text-24rpx text-gray-400">
        未注册的手机号验证后将自动注册
      </view>
      <wd-button block type="primary" @click="login">
        登录
      </wd-button>
      <view class="fixed bottom-80rpx left-0 w-full text-center text-24rpx text-gray-600">
        登录代表你已同意
        <text class="text-orange-500" @click="toAgreement('user')">
          《用户协议》
        </text>
        和
        <text class="text-orange-500" @click="toAgreement('privacy')">
          《隐私政策》
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router';
// import { useUserStore } from '@/store';
import { setToken } from '@/utils/auth';

// const userStore = useUserStore();

const tel = ref('');
const code = ref('');
const tips = ref('获取验证码');
const seconds = ref(60);
const timer = ref<NodeJS.Timer>();

let canGetCode = true;
let redirect = HOME_PATH;

// 获取验证码
const getCode = () => {
  if (!canGetCode) return;
  if (!tel.value) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    });
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(tel.value)) {
    uni.showToast({
      title: '手机号格式不正确',
      icon: 'none',
    });
    return;
  }
  canGetCode = false;
  timer.value = setInterval(() => {
    seconds.value--;
    tips.value = `${seconds.value}秒后重新获取`;
    if (seconds.value <= 0) {
      clearInterval(timer.value);
      tips.value = '获取验证码';
      seconds.value = 60;
      canGetCode = true;
    }
  }, 1000);
};

// 登录
const login = async () => {
  if (!tel.value) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none',
    });
    return;
  }
  if (!code.value) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none',
    });
    return;
  }
  // 登录请求
  // const res = await userStore.login({ phone: tel.value, code: code.value }).catch(() => {
  //   uni.$u.toast('登录失败');
  // });
  // if (!res) return;
  setToken('1234567890');
  setTimeout(() => {
    if (isTabBarPath(redirect)) {
      uni.switchTab({ url: redirect });
    }
    else {
      uni.redirectTo({ url: redirect });
    }
  }, 800);
};

// 查看协议
const toAgreement = (type: string) => {
  uni.navigateTo({
    url: `/pages/common/webview/index?type=${type}`,
  });
};

onLoad((options: any) => {
  if (options.redirect && removeQueryString(options.redirect) !== LOGIN_PATH) {
    redirect = decodeURIComponent(options.redirect);
  }
});
</script>
