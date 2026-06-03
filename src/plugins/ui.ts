import type { App } from 'vue';
import uviewPlus from 'uview-plus';

function setupUI(app: App) {
  app.use(uviewPlus, () => {
    return {
      options: {
        // 修改$u.config对象的属性
        config: {
          // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
          unit: 'px',
        },
        props: {
          // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
          radio: {
            // size: 20
          },
        },
      },
    };
  });
}

export default setupUI;
