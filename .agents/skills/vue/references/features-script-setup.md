---
name: script-setup
description: Compile-time syntactic sugar for Composition API in SFCs
---

# Script Setup

`<script setup>` is the recommended syntax for Composition API in Single-File Components.

## Basic Syntax

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

## Benefits

- Less boilerplate (no `export default`, no `return`)
- TypeScript type inference
- Better runtime performance
- Better IDE support

## Top-Level Bindings

All top-level bindings are automatically available in template:

```vue
<script setup lang="ts">
// Variables
const msg = 'Hello'

// Imports
import { capitalize } from './helpers'
import MyComponent from './MyComponent.vue'

// Functions
function greet() {
  console.log(msg)
}
</script>

<template>
  <MyComponent />
  <p>{{ capitalize(msg) }}</p>
  <button @click="greet">Greet</button>
</template>
```

## Compiler Macros

These are available without import:

- `defineProps()` - declare props
- `defineEmits()` - declare emits
- `defineModel()` - declare v-model (3.4+)
- `defineExpose()` - expose public instance properties
- `defineOptions()` - declare component options (3.3+)
- `defineSlots()` - type slot props (3.3+)
- `withDefaults()` - provide prop defaults

## Using Components

Import and use directly without registration:

```vue
<script setup lang="ts">
import MyComponent from './MyComponent.vue'
import { MyButton } from './components'
</script>

<template>
  <MyComponent />
  <MyButton />
</template>
```

### Dynamic Components

```vue
<script setup lang="ts">
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="condition ? Foo : Bar" />
</template>
```

### Recursive Components

SFCs can reference themselves by filename:

```vue
<!-- FooBar.vue can use <FooBar/> in its template -->
```

## Custom Directives

Variables starting with `v` are available as directives:

```vue
<script setup lang="ts">
const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

## defineExpose()

Components are closed by default. Use `defineExpose` to expose properties:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const publicMethod = () => console.log('called')

defineExpose({
  count,
  publicMethod
})
</script>
```

Parent can access via template ref:

```ts
const childRef = ref()
childRef.value.count // accessible
childRef.value.publicMethod() // accessible
```

## defineOptions() (3.3+)

Declare component options without separate `<script>` block:

```vue
<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
  name: 'CustomName'
})
</script>
```

## defineSlots() (3.3+)

Type slot props for IDE support:

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
  header(props: { title: string }): any
}>()
</script>
```

## useSlots() & useAttrs()

Access slots and attrs in script:

```vue
<script setup lang="ts">
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

## Top-Level await

Async setup with Suspense:

```vue
<script setup lang="ts">
const data = await fetch('/api/data').then(r => r.json())
</script>
```

> Note: Requires `<Suspense>` boundary in parent.

## Generic Components (TypeScript)

```vue
<script setup lang="ts" generic="T extends string | number">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

Multiple generics with constraints:

```vue
<script setup lang="ts" generic="T extends Item, U extends string">
import type { Item } from './types'

defineProps<{
  item: T
  label: U
}>()
</script>
```

## Alongside Normal Script

For advanced cases like named exports or one-time side effects:

```vue
<script lang="ts">
// Runs once when module is imported
runSideEffect()

export const exportedValue = 'hello'
</script>

<script setup lang="ts">
// Runs for each component instance
</script>
```

<!-- 
Source references:
- https://vuejs.org/api/sfc-script-setup.html
-->
