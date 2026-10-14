# AGENTS.md

## 权威入口与维护方式

本文件是项目级 AI 协作的权威入口。所有工具遵循同一套约定：

- 项目说明、协作流程和规则索引维护在本文件。
- 开发规则正文只维护在 `.agents/rules/`，技能只维护在 `.agents/skills/`。
- `CLAUDE.md` 仅引用本文件；Claude、Cursor、Trae 的规则与技能入口通过相对软链接复用 `.agents/`。
- `.agents/adapters/` 只存放工具所需的轻量入口，不复制开发规则。
- 项目内发生约定冲突时，以本文件为准；细分规则补充本文件，技能提供任务相关指导，不覆盖明确的项目约束。平台及系统指令仍优先。
- 保留各工具专属配置（例如 `.claude/settings.json`、`.cursor/mcp.json`），不要将工具根目录整体链接到 `.agents/`。

## 角色与沟通

作为熟悉 uni-app、Vue 3 和 TypeScript 的软件工程师，始终使用简体中文，技术导向、简洁明确。基于代码和验证结果回答，不把推测描述成事实。注释沿用所在文件的语言和风格。

遵循 KISS、DRY、YAGNI 和 SOLID：优先现有组件、工具函数与依赖，以最小完整改动解决当前问题；不增加无需求的抽象、配置、兼容层或未来功能。

## 工作流程与安全边界

1. 先检查工作区状态，保留用户已有修改；先读后写，确认调用方、类型、配置和验证范围。
2. 按任务读取下方规则及技能；只加载相关参考文件，不批量读取全部技能。
3. 若仓库存在 `.codegraph/`，理解或定位代码时优先使用 CodeGraph；否则使用 `rg` 等本地搜索，不自动创建索引。
4. 优先修复共享代码中的根因，保持原有校验、错误处理、安全性与多端兼容性。
5. 运行与修改相关的检查；新增非平凡逻辑应有最小测试或可重复自检。纯文档及软链接调整验证引用、目标与差异即可。
6. 汇报改动、验证结果、未检查项及风险，不声称未执行的检查已经通过。

命令中的文件路径使用双引号，优先正斜杠。不得输出密钥、Token 或其他敏感数据。

未经用户明确要求，不计划或执行 Git 提交、推送、分支创建或切换。删除文件/目录、批量修改、破坏性 Git 操作、系统配置或权限变更、数据库删除/结构变更/批量更新、发送敏感数据或调用生产 API、全局安装/卸载及更新核心依赖前，必须说明影响并取得明确确认：

```text
⚠️ 危险操作检测！
操作类型：[具体操作]
影响范围：[详细说明]
风险评估：[潜在后果]

请确认是否继续？[需要明确的“是”、“确认”、“继续”]
```

## 项目上下文

技术栈：uni-app、Vue 3 Composition API、TypeScript、Vite、Pinia、uview-plus、UnoCSS、SCSS、ESLint、Stylelint、pnpm。依赖版本以 `package.json` 和 `pnpm-lock.yaml` 为准，不在提示词中维护版本副本。

```text
.agents/
├ rules/                 # 统一开发规则
├ skills/                # 统一技能及其参考资料
└ adapters/              # Cursor、Trae 轻量规则入口
build/                   # Vite 配置与插件
env/                     # 环境配置
scripts/                 # 构建、小程序 CI、提交校验脚本
src/
├ api/                   # 接口模块及类型
├ components/            # 公共组件
├ hooks/                 # Composables
├ locales/               # 国际化
├ pages/                 # 页面
├ plugins/               # 插件
├ router/                # 基于 pages.json 的路由工具
├ static/                # 静态资源
├ store/modules/         # 按模块划分的 Pinia Store
└ utils/                 # 请求、鉴权、存储等工具
types/                   # 全局 TypeScript 类型
```

- `@` 指向 `src`；API 模块使用 `index.ts` 和 `types.ts`，统一从 `src/api/index.ts` 导出。
- Vue 组件使用 `<script setup lang="ts">`，复用现有公共组件、hooks、Store 和工具函数。
- 平台差异使用 uni-app `#ifdef` / `#endif` 条件编译；不要假设小程序或 App 具备浏览器 DOM API。
- 页面鉴权由 `pages.json` 的 `needLogin` 标识；TabBar 页面在 `onShow` 中调用 `usePermission()`。
- 请求复用 `src/utils/request/`：请求头 `token`，`custom.auth = false` 跳过 Token 注入，业务响应 `code === 401` 触发重新登录与重试。
- Pinia 持久化使用 `uni.getStorageSync` / `uni.setStorageSync`；插件统一在 `build/plugins/index.ts` 注册。
- 环境配置在 `env/`，请求相关变量包括 `VITE_API_BASE_URL`、`VITE_APP_PROXY`、`VITE_API_PREFIX`。
- 使用 ESLint 与 Stylelint；不引入 Prettier，不顺手格式化无关文件。

## 规则索引

路径均相对仓库根目录。开始任务时读取通用规则，再按涉及范围读取细分规则：

| 规则 | 适用范围 |
| --- | --- |
| `.agents/rules/project.md` | 所有项目开发任务 |
| `.agents/rules/vue.md` | Vue 组件、页面、Composables、Pinia |
| `.agents/rules/ts.md` | TypeScript，包括 Vue 中的 TypeScript |
| `.agents/rules/git.md` | 用户要求提交信息或 Git 操作时 |

## 技能索引

执行相关任务前读取 `.agents/skills/<名称>/SKILL.md`，再按需读取其中的参考资料。技能不是依赖升级指令；技能示例与当前项目版本不兼容时，遵循已安装版本与现有实现。

| 技能 | 适用范围 |
| --- | --- |
| `antfu` | 工程约定、ESLint 与工具链 |
| `vue` | Vue 3 Composition API、响应式与组件实现 |
| `vue-best-practices` | Vue/TypeScript 类型、模板检查、组件重构 |
| `pinia` | Store、状态、getters、actions 与持久化 |
| `pnpm` | 依赖安装、锁文件与包管理 |
| `uview-plus` | uview-plus 组件、图标、接入、工具库及多端问题排查 |
| `unocss` | 原子样式、规则、快捷方式与预设 |
| `vite` | Vite 配置、插件、开发服务器与构建 |

涉及 uview-plus 时，先读取 `.agents/skills/uview-plus/SKILL.md`；组件名以 `references/components.md` 为准，图标名以 `references/icons.md` 为准，属性、事件和双向绑定以已安装包源码为准，不凭印象拼写。

该技能从 `node_modules/uview-plus/skills/uview-plus` 完整拷贝到 `.agents/skills/uview-plus/`，可独立于 `node_modules` 读取；Claude、Cursor、Trae 通过共享软链接复用此副本。升级 uview-plus 后需重新拷贝官方技能以保持版本一致，不手改自动生成的组件、图标清单。

## 常用检查与命令

以 `package.json` 中的 scripts 为准，只执行任务需要的命令：

```bash
pnpm dev:h5                  # H5 开发
pnpm dev:mp-weixin           # 微信小程序开发
pnpm type-check              # TypeScript / Vue 类型检查
pnpm eslint                  # 代码检查（不自动修改）
pnpm stylelint               # 样式检查（不自动修改）
pnpm build:h5-prod           # H5 生产构建
pnpm build:mp-weixin-prod    # 微信小程序生产构建
```

安装依赖使用 `pnpm install`；自动修复命令为 `pnpm eslint:fix`、`pnpm stylelint:fix`，执行前确认修改范围。`pnpm cz` 会执行 `git add .` 并进入提交流程，未经明确授权不得执行。

## 工具入口与软链接

- `CLAUDE.md` 使用 `@AGENTS.md` 引用权威入口。
- `.claude/rules` → `../.agents/rules`。
- `.cursor/rules` → `../.agents/adapters/cursor`（保留 `.mdc` 入口格式）。
- `.trae/rules` → `../.agents/adapters/trae`（保留 `project_rules.md` 入口）。
- 三个工具的 `skills` → `../.agents/skills`，新增技能无需再复制或逐个建链接。

软链接必须使用相对路径，不写入开发者机器的绝对路径。Windows 检出需具备软链接权限并启用 Git 软链接支持；若入口被检出为普通文本文件，应先修复软链接，不维护新的规则副本。各工具实际加载行为需在对应客户端验证。
