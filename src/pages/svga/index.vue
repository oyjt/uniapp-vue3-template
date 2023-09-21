<template>
  <view class="w-screen of-x-hidden">
    <SvgaPlayer
      ref="svgaPlayerRef"
      :canvas-id="canvasId"
      :src="src"
      :loops="0"
      :auto-play="true"
      @frame="onFrame"
      @finished="onFinished"
      @percentage="onPercentage"
      @loaded="loaded"
    ></SvgaPlayer>
    <view class="p-20rpx font-size-28rpx">
      <view>切换图像</view>
      <view class="mb-30rpx mt-20rpx flex items-center">
        <button
          size="mini"
          @click="
            src =
              'https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/b3875bda-8de0-476d-8f55-d10b24f16d98.svg'
          "
        >
          小汽车
        </button>
        <button
          size="mini"
          @click="
            src =
              'https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/eebed809-b03e-4b90-88f8-5d6811b65f86.svg'
          "
        >
          玫瑰花
        </button>
      </view>
      <view>播放暂停</view>
      <view class="btnBox">
        <button size="mini" @click="svgaPlayerRef.call('startAnimation')">播放</button>
        <button size="mini" @click="svgaPlayerRef.call('startAnimation', true)">反向播放</button>
        <button size="mini" @click="svgaPlayerRef.call('pauseAnimation')">暂停播放</button>
        <button size="mini" @click="svgaPlayerRef.call('stopAnimation')">停止播放</button>
      </view>
      <view>设置动画的拉伸模式</view>
      <view class="btnBox">
        <button size="mini" @click="svgaPlayerRef.call('setContentMode', 'Fill')">Fill</button>
        <button size="mini" @click="svgaPlayerRef.call('setContentMode', 'AspectFill')">
          AspectFill
        </button>
        <button size="mini" @click="svgaPlayerRef.call('setContentMode', 'AspectFit')">
          AspectFit
        </button>
      </view>
      <view>强制清空画布</view>
      <view class="btnBox">
        <button size="mini" @click="svgaPlayerRef.call('clear')">清空画布</button>
      </view>
      <view>跳到指定帧/百分比</view>
      <view class="btnBox">
        <button size="mini" @click="svgaPlayerRef.call('stepToFrame', [40, true])">跳到40帧</button>
        <button size="mini" @click="svgaPlayerRef.call('stepToPercentage', [60, true])">
          跳到60%
        </button>
      </view>
      <view>设定动态图像/动态文本</view>
      <view class="btnBox">
        <button
          size="mini"
          @click="svgaPlayerRef.call('setImage', ['/static/index/logo.png', '06'])"
        >
          动态图像
        </button>
        <button
          size="mini"
          @click="svgaPlayerRef.call('setText', [{ text: 'Hello, World!' }, '08'])"
        >
          动态文本
        </button>
        <button size="mini" @click="svgaPlayerRef.call('clearDynamicObjects')">
          清空动态图像和文本
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import SvgaPlayer from '@/components/svga-player/index.vue';

const svgaPlayerRef = ref();
const canvasId = 'myCanvas';
const src = ref(
  'https://mp-eeab6da6-80cd-4e80-844a-66b2a7203834.cdn.bspapp.com/cloudstorage/b3875bda-8de0-476d-8f55-d10b24f16d98.svg',
);

const onFinished = () => {
  console.log('动画停止播放时回调');
};
const onFrame = (frame: any) => {
  // 动画播放至某帧后回调
  console.log(frame);
};
const onPercentage = (percentage: any) => {
  // 动画播放至某进度后回调
  console.log(percentage);
};
const loaded = () => {
  console.log('加载完成');
};
</script>
