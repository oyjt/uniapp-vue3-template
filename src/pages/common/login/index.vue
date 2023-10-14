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
      <button :style="[inputStyle]" class="login-btn" @tap="submit">
        登录
      </button>

      <view class="alternative">
        <view class="password">
          密码登录
        </view>
        <view class="issue">
          遇到问题
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
import uCode from 'uview-plus/components/u-code/u-code.vue';
import { setToken } from '@/utils/auth';

const tel = ref<string>('18502811111');
const code = ref<string>('1234');
const tips = ref<string>();
const uCodeRef = ref<InstanceType<typeof uCode> | null>(null);

const inputStyle = computed<CSSStyleDeclaration>(() => {
  const style = {} as CSSStyleDeclaration;
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

function submit() {
  if (uni.$u.test.mobile(tel.value)) {
    setToken('1234567890');
    uni.reLaunch({ url: '/pages/tab/home/index' });
  }
}
</script>

<style lang="scss" scoped>
.login-form-wrap {
  margin: 80rpx auto 0;
  width: 600rpx;

  .title {
    margin-bottom: 100rpx;
    font-size: 60rpx;
    text-align: left;
    font-weight: 500;
  }

  input {
    padding-bottom: 6rpx;
    margin-bottom: 10rpx;
    text-align: left;
  }

  .tips {
    margin-top: 8rpx;
    margin-bottom: 60rpx;
    color: $u-info;
  }

  .login-btn {
    padding: 12rpx 0;
    font-size: 30rpx;
    color: $u-tips-color;
    background-color: rgb(253 243 208);
    border: none;

    &::after {
      border: none;
    }
  }

  .alternative {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
    color: $u-tips-color;
  }
}

.login-type-wrap {
  display: flex;
  justify-content: space-between;
  padding: 350rpx 150rpx 150rpx;

  .item {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: $u-content-color;
    flex-direction: column;
  }
}

.hint {
  padding: 20rpx 40rpx;
  font-size: 20rpx;
  color: $u-tips-color;

  .link {
    color: $u-warning;
  }
}
</style>
