import type { AcceptedPlugin } from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import cssMacro from 'weapp-tailwindcss/css-macro/postcss';

const plugins: AcceptedPlugin[] = [tailwindcss(), autoprefixer()];

// 可以使用 postcss-pxtransform 来进行 px 转 rpx 的功能

plugins.push(cssMacro);

export default plugins;
