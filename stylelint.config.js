export default {
  // 继承规则
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
  ],
  // 忽略文件
  ignoreFiles: [
    'dist/**',
    'src/uni_modules/**',
    'node_modules/**',
  ],
  rules: {
    // --- 基础规则优化 ---
    'no-empty-source': null,
    'no-descending-specificity': null,
    'comment-no-empty': true,
    'comment-empty-line-before': null,
    'color-hex-length': null,
    'import-notation': 'string',

    // --- UniApp & 小程序适配 ---
    // 允许 rpx 单位
    'unit-no-unknown': [true, {
      ignoreUnits: ['rpx'],
    }],
    // 允许小程序特有标签
    'selector-type-no-unknown': [true, {
      ignoreTypes: [
        'page',
        'view',
        'text',
        'image',
        'scroll-view',
        'swiper',
        'swiper-item',
        'navigator',
        'button',
        'radio',
        'checkbox',
        'label',
        'form',
        'picker',
        'picker-view',
      ],
    }],

    // --- UnoCSS 兼容 (关键) ---
    'scss/at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'apply',
        'variants',
        'responsive',
        'screen',
        'unocss',
        'theme',
      ],
    }],
    'function-no-unknown': [true, {
      ignoreFunctions: ['theme', 'v-bind'],
    }],

    // --- Vue3 深度选择器适配 ---
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
    }],
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['deep', 'global'],
    }],

    // --- 声明值校验优化 (针对 v-bind 和 rpx) ---
    'declaration-property-value-no-unknown': [true, {
      ignoreProperties: {
        '/.+/': [
          /v-bind\(.+\)/,
          /(\d+(\.\d+)?rpx)/,
        ],
      },
    }],

    // --- SCSS 规则微调 (配合 @antfu 风格) ---
    'scss/load-partial-extension': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/at-import-partial-extension': null, // 允许不写下划线和后缀

    // 禁用标准 CSS 中不支持 SCSS 函数的报错
    'at-rule-no-deprecated': null,
  },
};
