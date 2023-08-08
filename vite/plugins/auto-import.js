import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
    return autoImport({
        imports: [
            'vue'
        ],
        dts: false
    })
}
