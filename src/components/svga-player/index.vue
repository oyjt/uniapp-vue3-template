<template>
  <view class="svga-player" :style="{ width, height }">
    <canvas :id="myCanvasId" class="canvas" type="2d"></canvas>
  </view>
</template>

<script>
/**
 * svga组件
 * @property {string} canvasId 画布id
 * @property {string} width 图像宽度 默认750rpx 单位rpx/px
 * @property {string} height 图像高度 默认750rpx 单位rpx/px
 * @property {string} src svga文件地址
 * @property {boolean} autoPlay 是否自动播放 默认true
 * @property {number} loops 动画循环次数，默认值为 0，表示无限循环
 * @property {boolean} clearsAfterStop 默认值为 true，表示当动画结束时，清空画布
 * @property {string} fillMode 默认值为 Forward，可选值 Forward / Backward，当 clearsAfterStop 为 false 时，Forward 表示动画会在结束后停留在最后一帧，Backward 则会在动画结束后停留在第一帧。
 * @property {boolean} isOnChange 是否开启播放进度监听 默认false false时不触发Frame Percentage监听
 * @event {Function()} loaded 监听svga文件加载完成
 * @event {Function()} finished 监听动画停止播放 loop!=0时生效
 * @event {Function()} frame 监听动画播放至某帧
 * @event {Function()} percentage 监听动画播放至某进度
 * 组件内方法统一使用 call(funName, args) 调用player实例方法 详见文档
 */
import { Parser, Player } from 'svgaplayer-weapp';
import uuid from './utils/uuid.js';

export default {
  name: 'SvgaPlayer',
  props: {
    canvasId: {
      type: String,
    },
    width: {
      type: String,
      default: '750rpx',
    },
    height: {
      type: String,
      default: '750rpx',
    },
    src: {
      type: String,
      required: true,
    },
    autoPlay: {
      // 是否自动播放
      type: Boolean,
      default: true,
    },
    loops: {
      // 动画循环次数，默认值为 0，表示无限循环。
      type: Number,
      default: 0,
    },
    clearsAfterStop: {
      // 默认值为 true，表示当动画结束时，清空画布。
      type: Boolean,
      default: true,
    },
    fillMode: {
      // 默认值为 Forward，可选值 Forward / Backward，当 clearsAfterStop 为 false 时，Forward 表示动画会在结束后停留在最后一帧，Backward 则会在动画结束后停留在第一帧。
      type: String,
      default: 'Forward',
    },
    isOnChange: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['loaded', 'finished', 'frame', 'percentage'],
  data() {
    return {
      fun: {},
    };
  },
  computed: {
    myCanvasId() {
      if (!this.canvasId) {
        return `c${uuid(18)}`;
      } else {
        return this.canvasId;
      }
    },
    svgaData() {
      return {
        myCanvasId: this.myCanvasId,
        width: this.width,
        height: this.height,
        src: this.src,
        autoPlay: this.autoPlay,
        loops: this.loops,
        clearsAfterStop: this.clearsAfterStop,
        fillMode: this.fillMode,
        isOnChange: this.isOnChange,
      };
    },
  },
  watch: {
    svgaData() {
      this.render();
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    call(name, args) {
      this.fun = { name, args };
      this.callPlayer(this.fun);
    },
    getContext() {
      return new Promise(resolve => {
        const { pixelRatio } = uni.getSystemInfoSync();
        uni
          .createSelectorQuery()
          .in(this)
          .select(`#${this.myCanvasId}`)
          .fields({
            node: true,
            size: true,
          })
          .exec(res => {
            const { width, height } = res[0];
            const canvas = res[0].node;
            resolve({
              canvas,
              width,
              height,
              pixelRatio,
            });
          });
      });
    },
    async render() {
      if (!this.player) {
        this.parser = new Parser();
        this.player = new Player();
        await this.player.setCanvas(`#${this.myCanvasId}`, this);
      }
      this.player.loops = this.loops;
      this.player.clearsAfterStop = this.clearsAfterStop;
      this.player.fillMode = this.fillMode;
      // console.time("test");
      const videoItem = await this.parser.load(this.src);
      await this.player.setVideoItem(videoItem);
      // console.timeEnd("test");
      this.$emit('loaded');
      if (this.autoPlay) {
        this.player.startAnimation();
      }
      this.player.onFinished(() => {
        // 只有在loop不为0时候触发
        // console.log('动画停止播放时回调');
        this.$emit('finished');
      });
      if (this.isOnChange) {
        this.player.onFrame(frame => {
          // 动画播放至某帧后回调
          // console.log(frame);
          try {
            this.$emit('frame', frame);
          } catch (e) {
            // TODO handle the exception
            console.error(e);
          }
        });
        this.player.onPercentage(percentage => {
          // 动画播放至某进度后回调
          // console.log(percentage);
          try {
            this.$emit('percentage', percentage);
          } catch (e) {
            // TODO handle the exception
            console.error(e);
          }
        });
      }
    },
    callPlayer(val) {
      if (!val.name) return;
      const { name, args } = val;
      // console.log(name, args);
      if (Array.isArray(args)) {
        this.player[name](...args);
      } else {
        this.player[name](args);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.svga-player {
  .canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
