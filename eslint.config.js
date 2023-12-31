import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
  },
  {
    ignores: ['uni_modules'],
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': [
        "error",
        {
          "order": ["template", "script", "style"]
        }
      ],
    },
  },
  {
    rules: {
      // 需要尾随逗号
      // "comma-dangle": ["error", "always"]
      // 允许console
      "no-console": "off",
      // 需要尾随分号
      "semi": ["error", "always"],
      // 分号位置
      "style/semi": "off",
      // 块内的空行
      "padded-blocks": ["error", "never"]
    },
  },
)
