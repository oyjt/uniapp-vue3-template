import Components from 'unplugin-vue-components/vite'

export default function createAutoComponents() {
    return Components({
      dts: 'src/components.d.ts',
    })
}
