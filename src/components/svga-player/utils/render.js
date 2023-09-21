import SVGA from 'svgaplayerweb';

export default {
  data() {
    return {
      player: null,
      parser: null,
      pdata: {},
    };
  },
  methods: {
    dataURLtoBlob(dataURL) {
      // 获取 Data URL 的数据部分，去掉头信息
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];

      // 将 Data URL 转换为 Blob 对象
      const byteString = atob(raw);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      return new Blob([arrayBuffer], { type: contentType });
    },
    async render(val, oldValue, vm) {
      this.$nextTick(async () => {
        let data, player, parser;
        if (val) {
          data = val;
          this.pdata = data;
        } else {
          data = this.pdata;
        }
        if (!data.src) {
          console.error('缺少src');
          return;
        }
        if (!this.player) {
          player = new SVGA.Player(`#${data.myCanvasId}`);
          parser = new SVGA.Parser();
        } else {
          player = this.player;
          parser = this.parser;
        }
        player.loops = data.loops;
        player.clearsAfterStop = data.clearsAfterStop;
        player.fillMode = data.fillMode;
        // console.time("test");
        parser.load(
          videoItem => {
            player.setVideoItem(videoItem);

            // console.log(player,videoItem);
            // let {audios,images} = videoItem
            // let audioFile="data:audio/x-mpeg;base64," + images[audios[0].audioKey]
            // console.log(URL.createObjectURL(this.dataURLtoBlob(audioFile)));
            // console.timeEnd("test");

            this.$ownerInstance.callMethod('receiveRenderData', { name: 'loaded' });
            if (data.autoPlay) {
              player.startAnimation();
            }
          },
          err => {
            console.error(err);
          },
        );

        player.onFinished(() => {
          // 只有在loop不为0时候触发
          // console.log('动画停止播放时回调');
          vm.callMethod('receiveRenderData', { name: 'finished' });
        });
        if (data.isOnChange) {
          player.onFrame(frame => {
            // 动画播放至某帧后回调
            // console.log(frame);
            vm.callMethod('receiveRenderData', { name: 'frame', val: frame });
          });
          player.onPercentage(percentage => {
            // 动画播放至某进度后回调
            // console.log(percentage);
            vm.callMethod('receiveRenderData', { name: 'percentage', val: percentage });
          });
        }
        this.player = player;
        this.parser = parser;
      });
    },
    async callPlayer(val) {
      if (!val.name) return;
      const { name, args } = val;
      // console.log(name, args);
      if (name === 'clearDynamicObjects') {
        const parser = new SVGA.Parser();
        parser.load(this.pdata.src, videoItem => {
          this.player.setVideoItem(videoItem);
          this.player.startAnimation();
        });
      }
      if (Array.isArray(args)) {
        this.player[name](...args);
      } else {
        this.player[name](args);
      }
    },
  },
  mounted() {},
};
