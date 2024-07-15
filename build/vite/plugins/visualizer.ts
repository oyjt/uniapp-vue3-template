/**
 * @name VisualizerPlugin
 * @description 打包视图分析
 */
import { visualizer } from 'rollup-plugin-visualizer';

export const VisualizerPlugin = () => {
  return visualizer({
    emitFile: false,
    filename: 'stats.html', // 分析图生成的文件名
    open: true, // 如果存在本地服务端口，将在打包后自动展示
  });
};
