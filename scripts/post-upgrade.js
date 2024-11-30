// # 执行 `pnpm upgrade` 后会升级 `uniapp` 相关依赖
// # 在升级完后，会自动添加很多无用依赖，这需要删除以减小依赖包体积
// # 只需要执行下面的命令即可

import { exec } from 'node:child_process';

// 定义要执行的命令
const dependencies = [
  '@dcloudio/uni-app-harmony',
  // TODO: 如果需要某个平台的小程序，请手动删除或注释掉
  '@dcloudio/uni-mp-alipay',
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-jd',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-lark',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-toutiao',
  '@dcloudio/uni-mp-xhs',
  '@dcloudio/uni-quickapp-webview',
];

// 使用exec执行命令
exec(`pnpm un ${dependencies.join(' ')}`, (error, stdout, stderr) => {
  if (error) {
    // 如果有错误，打印错误信息
    console.error(`执行出错: ${error}`);
    return;
  }
  // 打印正常输出
  console.log(`stdout: ${stdout}`);
  // 如果有错误输出，也打印出来
  console.error(`stderr: ${stderr}`);
});
