import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
    return autoImport({
        imports: [
            'vue',
            'uni-app',
            'pinia'
        ],
        dts: true,
        eslintrc: {
          enabled: true,
          globalsPropValue: true
        },
        vueTemplate: true,
    })
}
