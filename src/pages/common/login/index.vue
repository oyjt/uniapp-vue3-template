<template>
  <view class="container">
    <view class="login-box">
      <view class="title">
        登录
      </view>
      <view class="form">
        <input v-model="tel" class="border-bottom" type="number" placeholder="请输入手机号">
        <view class="border-bottom my-40rpx flex">
          <input v-model="code" class="flex-1" type="number" placeholder="请输入验证码">
          <wd-button type="success" size="small" @click="getCode">
            {{ tips }}
          </wd-button>
        </view>
      </view>
      <view class="tips">
        未注册的手机号验证后将自动注册
      </view>
      <wd-button block type="primary" @click="login">
        登录
      </wd-button>
      <view class="agreement">
        登录代表你已同意
        <text class="link" @click="toAgreement('user')">
          《用户协议》
        </text>
        和
        <text class="link" @click="toAgreement('privacy')">
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

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 0 60rpx;
  background-color: #fff;
}

.login-box {
  padding-top: 200rpx;

  .title {
    margin-bottom: 100rpx;
    font-size: 48rpx;
    font-weight: 600;
  }

  .form {
    input {
      height: 88rpx;
      font-size: 32rpx;
    }
  }

  .tips {
    margin: 20rpx 0 60rpx;
    font-size: 24rpx;
    color: #909399;
  }
}

.other-login {
  margin-top: 120rpx;

  .title {
    margin-bottom: 60rpx;
    font-size: 28rpx;
    color: #595959;
    text-align: center;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 40rpx;

    text {
      margin-top: 20rpx;
      font-size: 24rpx;
      color: #595959;
    }
  }
}

.agreement {
  position: fixed;
  bottom: 80rpx;
  left: 0;
  width: 100%;
  font-size: 24rpx;
  color: #595959;
  text-align: center;

  .link {
    color: #f0883a;
  }
}

.border-bottom {
  border-bottom: solid 0.5px #d9d9d9
}

.my-40rpx {
  margin: 40rpx 0;
}

.flex {
  display: flex;
  align-items: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
