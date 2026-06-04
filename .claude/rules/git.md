---
description: "辅助生成 Git 提交信息"
---

# Git 提交规范

## Commit 规范

提交模板 `type: message`，具体要求如下:

1. 英文冒号后有一个空格
2. `type` 枚举值:

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复错误 |
| `perf` | 性能优化 |
| `refactor` | 重构代码 |
| `docs` | 文档和注释 |
| `types` | 类型相关 |
| `test` | 单测相关 |
| `ci` | 持续集成、工作流 |
| `revert` | 撤销更改 |
| `chore` | 琐事（更新依赖、修改配置等） |

3. 保持 `message` 简洁明了，描述清楚变更内容

## 分支说明

- `main / master`: 主分支
- `gh-pages`: GitHub Pages 构建分支

## 其他

- 禁止自动提交，除非有明确的指示
- 提交前确保代码通过代码校验和单元测试
- 避免大型提交，尽量将变更分解为小的、相关的提交
- 提交信息通过 `scripts/verify-commit.js` 校验，pre-commit 触发 lint-staged 自动修复
- 使用 `pnpm cz` 通过交互式命令行提交
