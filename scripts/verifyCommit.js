/**
 * 提交信息校验
 * @link https://github.com/toplenboren/simple-git-hooks
 * @see 参考：https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import pico from 'picocolors';

const msgPath = path.resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const commitRE
    = /^(?:revert: )?(?:feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|mod|release|strengthen)(?:\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log(pico.yellow(`\n提交的信息: ${msg}\n`));
  console.error(
    `  ${pico.white(pico.bgRed(' 格式错误 '))} ${pico.red(
      '无效的提交信息格式.',
    )}\n\n${
      pico.red('  正确的提交消息格式. 例如:\n\n')
    }    ${pico.green('feat: add a new feature')}\n`
    + `    ${pico.green('fix: fixed an bug')}`,
  );
  process.exit(1);
}
