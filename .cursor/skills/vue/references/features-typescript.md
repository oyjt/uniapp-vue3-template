---
name: typescript-integration
description: Type Vue components with TypeScript in Composition API
---

# TypeScript with Vue

Vue provides excellent TypeScript support in Composition API.

## Typing Props

### Type-based declaration (recommended)

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: string[]
  user: { name: string; age: number }
}

const props = defineProps<Props>()
```

### With defaults (3.5+)

```vue
<script setup lang="ts">
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one'] } = defineProps<Props>()
```

### With withDefaults (3.4 and below)

```vue
<script setup lang="ts">
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

### Complex prop types

```vue
<script setup lang="ts">
interface Book {
  title: string
  author: string
  year: number
}

const props = defineProps<{
  book: Book
  callback: (id: number) => void
}>()
```

## Typing Emits

```vue
<script setup lang="ts">
// Call signature syntax
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// Named tuple syntax (3.3+, more concise)
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

## Typing ref()

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

// Inferred
const count = ref(0) // Ref<number>

// Explicit generic
const name = ref<string>() // Ref<string | undefined>

// Type annotation
const id: Ref<string | number> = ref('abc')
```

## Typing reactive()

```ts
import { reactive } from 'vue'

interface State {
  count: number
  name: string
}

// Use interface on variable
const state: State = reactive({
  count: 0,
  name: 'Vue'
})
```

## Typing computed()

```ts
import { computed } from 'vue'

// Inferred from getter
const double = computed(() => count.value * 2) // ComputedRef<number>

// Explicit generic
const result = computed<string>(() => {
  return String(value.value)
})
```

## Typing Event Handlers

```vue
<script setup lang="ts">
function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  console.log(target.value)
}
</script>

<template>
  <input @change="handleChange" />
</template>
```

## Typing Template Refs

### useTemplateRef (3.5+)

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

### Legacy ref approach

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

## Typing Component Refs

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyComponent from './MyComponent.vue'

type MyComponentInstance = InstanceType<typeof MyComponent>
const compRef = useTemplateRef<MyComponentInstance>('comp')
</script>

<template>
  <MyComponent ref="comp" />
</template>
```

## Typing Provide/Inject

```ts
import { provide, inject } from 'vue'
import type { InjectionKey, Ref } from 'vue'

// Define typed key
const countKey = Symbol() as InjectionKey<Ref<number>>

// Provider
provide(countKey, ref(0))

// Injector
const count = inject(countKey) // Ref<number> | undefined

// With default
const count = inject(countKey, ref(0)) // Ref<number>

// String key with explicit type
const foo = inject<string>('foo')
```

## Typing defineModel (3.4+)

```ts
// Basic
const model = defineModel<string>()
//    ^? Ref<string | undefined>

// Required
const model = defineModel<string>({ required: true })
//    ^? Ref<string>

// With modifiers
const [model, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                ^? Record<'trim' | 'uppercase', true | undefined>
```

## Global Custom Properties

Extend `ComponentCustomProperties` for global properties:

```ts
// types/vue.d.ts
declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

## Generic Components

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()

defineEmits<{
  select: [item: T]
}>()
</script>
```

<!-- 
Source references:
- https://vuejs.org/guide/typescript/composition-api.html
- https://vuejs.org/guide/typescript/overview.html
-->
