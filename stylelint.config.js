export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: [
    'dist/**',
    'src/uni_modules/**',
    'node_modules/**',
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
    // 忽略属性值未知校验
    'declaration-property-value-no-unknown': [
      true,
      {
        ignoreProperties: {
          '/.*/': [
            /v-bind\(.+\)/, // 匹配所有 v-bind(变量)、v-bind('--css-var') 等
            /(^|\s)\d+(\.\d+)?rpx($|\s)/, // 匹配所有 rpx
            /(^|\s)-\d+(\.\d+)?rpx($|\s)/, // 匹配所有 -rpx
          ],
        },
      },
    ],
    // 忽略伪元素未知校验
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    // 忽略伪类未知校验
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    // 忽略类型未知校验
    'selector-type-no-unknown': [true, { ignoreTypes: ['page', 'radio', 'checkbox', 'scroll-view'] }],
    // 忽略规则未知校验
    'at-rule-no-deprecated': null,
    // 忽略颜色十六进制长度校验
    'color-hex-length': null,
    // 忽略scss文件后缀校验
    'scss/load-partial-extension': null,
    // 忽略scss注释校验
    'scss/double-slash-comment-empty-line-before': null,
    // 忽略scss注释空格校验
    'scss/double-slash-comment-whitespace-inside': null,
  },
};
