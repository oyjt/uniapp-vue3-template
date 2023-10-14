import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu({
  {ignores: ['uni_modules'],}
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
      "comma-dangle": ["error", "always"]
    },
  },
  unocss.configs.flat,
})
