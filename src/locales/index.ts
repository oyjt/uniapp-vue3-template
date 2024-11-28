import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import en from './langs/en';
import zhHans from './langs/zh-Hans';

const i18n = createI18n({
  legacy: false, // 必须设置false才能使用Composition API
  globalInjection: true, // 为每个组件注入$为前缀的全局属性和函数
  locale: uni.getLocale(),
  messages: {
    en,
    'zh-Hans': zhHans,
  },
});

function setupI18n(app: App) {
  app.use(i18n);
}

export { i18n };
export default setupI18n;
