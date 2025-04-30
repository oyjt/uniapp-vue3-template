<template>
  <view>
    <view class="mx-auto mb-0 mt-[80rpx] w-[600rpx]">
      <view class="mb-[100rpx] text-left text-[60rpx] font-medium">
        欢迎登录
      </view>
      <view class="u-border-b py-[16rpx]">
        <input v-model="tel" type="number" placeholder="请输入手机号">
      </view>
      <view class="u-border-b py-[16rpx] mt-[30rpx] flex items-center">
        <input v-model="code" class="flex-1 pb-[6rpx] text-left" type="number" placeholder="请输入验证码">
        <view>
          <uv-code ref="uCodeRef" @change="codeChange" />
          <Button variant="ghost" size="xs" @click="getCode">{{ tips }}</Button>
        </view>
      </view>

      <Button class="w-full mt-[40rpx]" size="lg" @click="submit">登录 <text class="i-lucide-arrow-right-to-line" /></Button>

      <view class="mt-[30rpx] flex justify-between text-[var(--u-tips-color)]">
        <view class="password">
          密码登录
        </view>
        <view class="issue flex items-center">
          遇到问题 <text class="i-lucide-circle-help" />
        </view>
      </view>
    </view>
    <view class="flex justify-between px-[150rpx] pb-[150rpx] pt-[350rpx]">
      <view class="flex flex-col items-center text-[28rpx] text-[var(--u-content-color)]">
        <view class="icon">
          <uv-icon size="35" name="weixin-fill" color="rgb(83,194,64)" />
        </view>
        微信
      </view>
      <view class="flex flex-col items-center text-[28rpx] text-[var(--u-content-color)]">
        <view class="icon">
          <uv-icon size="35" name="qq-fill" color="rgb(17,183,233)" />
        </view>
        QQ
      </view>
    </view>
    <view class="px-[40rpx] py-[20rpx] text-[24rpx] text-[var(--u-tips-color)]">
      登录代表同意
      <text class="text-[var(--u-warning)]">
        用户协议、隐私政策，
      </text>
      并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
    </view>
  </view>
</template>

<script setup lang="ts">
import { HOME_PATH, isTabBarPath, LOGIN_PATH, removeQueryString } from '@/router';
import { setToken } from '@/utils/auth';
import uCode from 'uview-plus/components/u-code/u-code.vue';
// import { useUserStore } from '@/store';

// const userStore = useUserStore();
const tel = ref<string>('18502811111');
const code = ref<string>('1234');
const tips = ref<string>();
const uCodeRef = ref<InstanceType<typeof uCode> | null>(null);
let redirect = HOME_PATH;

function codeChange(text: string) {
  tips.value = text;
}

function getCode() {
  if (uCodeRef.value?.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码',
    });
    setTimeout(() => {
      uni.hideLoading();
      uni.$uv.toast('验证码已发送');
      // 通知验证码组件内部开始倒计时
      uCodeRef.value?.start();
    }, 1000);
  }
  else {
    uni.$uv.toast('倒计时结束后再发送');
  }
}
async function submit() {
  if (!uni.$uv.test.mobile(Number(tel.value))) {
    uni.$uv.toast('请输入正确的手机号');
    return;
  }
  if (!code.value) {
    uni.$uv.toast('请输入验证码');
    return;
  }
  // 登录请求
  // const res = await userStore.login({ phone: tel.value, code: code.value }).catch(() => {
  //   uni.$uv.toast('登录失败');
  // });
  // if (!res) return;
  setToken('1234567890');
  setTimeout(() => {
    uni.$uv.route({
      type: isTabBarPath(redirect) ? 'switchTab' : 'redirectTo',
      url: redirect,
    });
  }, 800);
}

onLoad((options: any) => {
  if (options.redirect && removeQueryString(options.redirect) !== LOGIN_PATH) {
    redirect = decodeURIComponent(options.redirect);
  }
});
</script>
