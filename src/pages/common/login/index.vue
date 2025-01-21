<template>
  <view>
    <view class="login-form-wrap">
      <view class="title">
        欢迎登录
      </view>
      <input v-model="tel" class="u-border-bottom" type="number" placeholder="请输入手机号">
      <view class="u-border-bottom my-40rpx flex">
        <input v-model="code" class="flex-1" type="number" placeholder="请输入验证码">
        <view>
          <u-code ref="uCodeRef" @change="codeChange" />
          <u-button :text="tips" type="success" size="mini" @click="getCode" />
        </view>
      </view>
      <button class="login-btn" :style="[inputStyle]" @tap="submit">
        登录 <text class="i-mdi-login" />
      </button>

      <view class="alternative">
        <view class="password">
          密码登录
        </view>
        <view class="issue flex items-center">
          遇到问题 <text class="i-mdi-help" />
        </view>
      </view>
    </view>
    <view class="login-type-wrap">
      <view class="item wechat">
        <view class="icon">
          <u-icon size="35" name="weixin-fill" color="rgb(83,194,64)" />
        </view>
        微信
      </view>
      <view class="item QQ">
        <view class="icon">
          <u-icon size="35" name="qq-fill" color="rgb(17,183,233)" />
        </view>
        QQ
      </view>
    </view>
    <view class="hint">
      登录代表同意
      <text class="link">
        用户协议、隐私政策，
      </text>
      并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
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

const inputStyle = computed<CSSProperties>(() => {
  const style = {} as CSSProperties;
  if (tel.value && code.value) {
    style.color = '#fff';
    style.backgroundColor = uni.$u.color.warning;
  }
  return style;
});

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
      uni.$u.toast('验证码已发送');
      // 通知验证码组件内部开始倒计时
      uCodeRef.value?.start();
    }, 1000);
  }
  else {
    uni.$u.toast('倒计时结束后再发送');
  }
}
async function submit() {
  if (!uni.$u.test.mobile(Number(tel.value))) {
    uni.$u.toast('请输入正确的手机号');
    return;
  }
  if (!code.value) {
    uni.$u.toast('请输入验证码');
    return;
  }
  // 登录请求
  // const res = await userStore.login({ phone: tel.value, code: code.value }).catch(() => {
  //   uni.$u.toast('登录失败');
  // });
  // if (!res) return;
  setToken('1234567890');
  setTimeout(() => {
    uni.$u.route({
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

<style lang="scss" scoped>
.login-form-wrap {
  @apply mt-80rpx mx-auto mb-0 w-600rpx;

  .title {
    @apply mb-100rpx text-60rpx text-left font-500;
  }

  input {
    @apply pb-6rpx mb-10rpx text-left;
  }

  .tips {
    @apply mt-8rpx mb-60rpx;

    color: $u-info;
  }

  .login-btn {
    @apply flex items-center justify-center py-12rpx px-0 text-30rpx bg-#fdf3d0 border-none;

    color: $u-tips-color;

    &::after {
      @apply border-none;
    }
  }

  .alternative {
    @apply flex justify-between mt-30rpx;

    color: $u-tips-color;
  }
}

.login-type-wrap {
  @apply flex justify-between pt-350rpx px-150rpx pb-150rpx;

  .item {
    @apply flex items-center flex-col text-28rpx;

    color: $u-content-color;
  }
}

.hint {
  @apply px-40rpx py-20rpx text-24rpx;

  color: $u-tips-color;

  .link {
    color: $u-warning;
  }
}
</style>
