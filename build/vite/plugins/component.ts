import Components from 'unplugin-vue-components/vite'

export default function createAutoComponents() {
  return Components({
    dts: 'types/components.d.ts'
  })
}
