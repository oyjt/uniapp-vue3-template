---
name: template-refs
description: Access DOM elements and child component instances directly
---

# Template Refs

Template refs provide direct access to DOM elements and child component instances.

## Basic Usage (3.5+)

Use `useTemplateRef()` for type-safe refs:

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('input')

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

## Legacy Approach (Pre-3.5)

Use a ref with matching name:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
```

## Refs in v-for

Collect multiple refs into an array:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const items = ref([1, 2, 3])
const itemRefs = ref<HTMLLIElement[]>([])
</script>

<template>
  <ul>
    <li v-for="item in items" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

> Note: ref array order is not guaranteed to match source array order.

## Function Refs

Use a function for full control:

```vue
<script setup lang="ts">
const elements = new Map<number, HTMLElement>()

function setItemRef(el: HTMLElement | null, id: number) {
  if (el) {
    elements.set(id, el)
  } else {
    elements.delete(id)
  }
}
</script>

<template>
  <div v-for="item in items" :ref="(el) => setItemRef(el, item.id)">
    {{ item.name }}
  </div>
</template>
```

## Component Refs

Access child component instance:

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

type ChildInstance = InstanceType<typeof Child>
const childRef = useTemplateRef<ChildInstance>('child')

onMounted(() => {
  // Access exposed properties/methods
  childRef.value?.someMethod()
})
</script>

<template>
  <Child ref="child" />
</template>
```

### Exposing Component Properties

By default, `<script setup>` components are closed. Use `defineExpose`:

```vue
<!-- Child.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++

// Only these are accessible via ref
defineExpose({
  count,
  increment
})
</script>
```

## Common Use Cases

### Focus Management

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const inputRef = useTemplateRef<HTMLInputElement>('input')

function focusInput() {
  inputRef.value?.focus()
}
</script>
```

### Scroll Control

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'

const containerRef = useTemplateRef<HTMLDivElement>('container')

function scrollToBottom() {
  const el = containerRef.value
  if (el) {
    el.scrollTop = el.scrollHeight
  }
}
</script>
```

### Third-Party Library Integration

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js'

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvas')
let chart: Chart | null = null

onMounted(() => {
  if (canvasRef.value) {
    chart = new Chart(canvasRef.value, {
      // options
    })
  }
})

onUnmounted(() => {
  chart?.destroy()
})
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
```

## Important Notes

1. **Refs are null before mount** - access in `onMounted` or later
2. **Conditional refs can be null** - elements with `v-if` may not exist
3. **Use optional chaining** - `ref.value?.method()` for safety
4. **Avoid overusing** - prefer declarative approaches when possible

<!-- 
Source references:
- https://vuejs.org/guide/essentials/template-refs.html
- https://vuejs.org/guide/typescript/composition-api.html#typing-template-refs
-->
