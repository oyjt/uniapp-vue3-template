---
globs: "*.vue"
---

# Vue 开发规范

## 代码风格

- 组件: 使用单文件组件 (SFC)
- API: 使用组合式 API (Composition API) 并搭配 `<script setup>` 语法糖
- 语法: 没有特殊说明则使用 TS 进行开发 `<script setup lang="ts">`

## 命名

- 组件 (Component): PascalCase，避免与 HTML 元素冲突。示例: `@/components/lang-select/index.vue`
- 页面 (Page): kebab-case。示例: `@/pages/tab/home/index.vue`
- 组合式函数 (Composable): camelCase。示例: `@/hooks/use-clipboard/index.ts`
- Props: 声明时 camelCase，模板中 kebab-case。示例: `defineProps<{ isActive: boolean }>()` / `<Demo :is-active="true" />`
- TS/JS 文件: kebab-case。示例: `@/utils/index.ts`

## API

- 定义响应式变量时优先使用 `ref` 而非 `reactive`
- 复杂的模板表达式则应该重构为计算属性或方法
- 尽量避免侦听器的循坏触发，防止进入死循环

## Props

- Prop 定义应该尽量详细，包括类型、必传、默认值
- 使用基于类型的声明: `const props = defineProps<Props>()`

## 状态管理

- 使用 Pinia，Store 按模块划分在 `@/store/modules/`
- 优先使用 Setup Store 语法
- 避免无脑使用全局状态管理

## 样式

- 优先使用 UnoCSS 内联样式
- 其次使用 Scoped CSS: `<style scoped lang="scss">`
- 尽可能避免使用 `!important`

## 其他

- 避免直接操作 DOM
- 尽可能编写原子化组件
- 使用 `v-for` 时必须提供唯一的 `key`（不要轻易使用数组下标 `index` 当做 `key`）
- 不要在同一元素上同时使用 `v-if` 和 `v-for`

## 参考示例

`@/pages/tab/home/index.vue`
