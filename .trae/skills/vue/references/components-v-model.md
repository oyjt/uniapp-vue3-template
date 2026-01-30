---
name: component-v-model
description: Implement two-way data binding on custom components
---

# Component v-model

Create two-way bindings between parent and child components.

## defineModel() (3.4+, Recommended)

The simplest way to implement v-model:

```vue
<!-- Child.vue -->
<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
  <input v-model="model" />
</template>
```

```vue-html
<!-- Parent.vue -->
<Child v-model="searchText" />
```

`defineModel()` returns a ref that:
- Syncs with parent's bound value
- Emits `update:modelValue` when mutated

### With Options

```ts
// Required model
const model = defineModel<string>({ required: true })

// With default
const model = defineModel<number>({ default: 0 })
```

## Named v-model

Use arguments for multiple v-models:

```vue
<!-- UserName.vue -->
<script setup lang="ts">
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
</script>

<template>
  <input v-model="firstName" />
  <input v-model="lastName" />
</template>
```

```vue-html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

## v-model Modifiers

Access and handle modifiers:

```vue-html
<MyComponent v-model.capitalize="text" />
```

```vue
<script setup lang="ts">
const [model, modifiers] = defineModel<string>()

console.log(modifiers) // { capitalize: true }
</script>
```

### Transform with Modifiers

Use `get` and `set` options:

```vue
<script setup lang="ts">
const [model, modifiers] = defineModel<string>({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input v-model="model" />
</template>
```

### Modifiers with Named v-model

```vue-html
<MyComponent v-model:title.capitalize="title" />
```

```ts
const [title, titleModifiers] = defineModel<string>('title')
console.log(titleModifiers) // { capitalize: true }
```

## Manual Implementation (Pre-3.4)

Understanding what `defineModel` does under the hood:

```vue
<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
```

For named v-model `v-model:title`:

```ts
defineProps<{ title: string }>()
defineEmits<{ 'update:title': [value: string] }>()
```

## Typing defineModel

```ts
// Basic
const model = defineModel<string>()
//    ^? Ref<string | undefined>

// Required (removes undefined)
const model = defineModel<string>({ required: true })
//    ^? Ref<string>

// With modifiers
const [model, modifiers] = defineModel<string, 'trim' | 'capitalize'>()
//            ^? Record<'trim' | 'capitalize', true | undefined>
```

## Warning: Default Values

Having a default in `defineModel` without providing a value from parent causes desync:

```vue
<!-- Child: model is 1 -->
<script setup>
const model = defineModel({ default: 1 })
</script>

<!-- Parent: myRef is undefined -->
<script setup>
const myRef = ref()
</script>
<Child v-model="myRef" />
```

<!-- 
Source references:
- https://vuejs.org/guide/components/v-model.html
- https://vuejs.org/api/sfc-script-setup.html#definemodel
-->
