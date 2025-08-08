export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-vue',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: [
    'dist/**',
    'src/uni_modules/**',
    'node_modules/**',
    'src/static/styles/theme.scss', // 忽略主题文件，因为包含 CSS 自定义属性
  ],
  rules: {
    // 禁止空代码
    'no-empty-source': null,
    // 禁止在覆盖高特异性选择器之后出现低特异性选择器
    'no-descending-specificity': null,
    // 不允许未知单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 禁止空注释
    'comment-no-empty': true,
    // @import 规则必须始终使用字符串表示法。
    'import-notation': 'string',
    // 未知的 @ 规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'plugin',
          'apply',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'extend',
          'content',
          'use',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'selector-type-no-unknown': [true, { ignoreTypes: ['page', 'radio', 'checkbox', 'scroll-view'] }],
    'at-rule-no-deprecated': null,
  },
};
