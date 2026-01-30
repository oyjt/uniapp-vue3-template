---
name: component-events-emits
description: Emit and handle custom events from child to parent components
---

# Component Events

Components emit custom events to communicate with parent components.

## Emitting Events

Use `$emit` in templates or `defineEmits` in script:

```vue
<script setup lang="ts">
const emit = defineEmits(['inFocus', 'submit'])

function handleClick() {
  emit('submit')
}
</script>

<template>
  <button @click="$emit('inFocus')">Focus</button>
  <button @click="handleClick">Submit</button>
</template>
```

## Type-Based Declaration (Recommended)

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

// Usage
emit('change', 123)
emit('update', 'hello')
</script>
```

## Event Arguments

Pass additional arguments to events:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  increaseBy: [amount: number]
}>()

function increase() {
  emit('increaseBy', 5)
}
</script>
```

Parent receives arguments:

```vue-html
<!-- Inline handler -->
<MyButton @increase-by="(n) => count += n" />

<!-- Method handler -->
<MyButton @increase-by="increaseCount" />
```

```ts
function increaseCount(n: number) {
  count.value += n
}
```

## Event Validation

Validate event payloads with object syntax:

```vue
<script setup lang="ts">
const emit = defineEmits({
  // No validation
  click: null,
  
  // Validate submit event
  submit: ({ email, password }: { email: string; password: string }) => {
    if (email && password) {
      return true
    }
    console.warn('Invalid submit payload!')
    return false
  }
})
</script>
```

## Listening to Events

Use `v-on` or `@` shorthand:

```vue-html
<MyComponent @some-event="handleEvent" />

<!-- With .once modifier -->
<MyComponent @some-event.once="handleOnce" />
```

## Event Name Casing

- Emit in camelCase
- Listen in kebab-case

```ts
emit('someEvent')
```

```vue-html
<MyComponent @some-event="handler" />
```

## Important Notes

- Component events do NOT bubble (unlike DOM events)
- Only direct child events can be listened to
- For sibling/deeply nested communication, use provide/inject or state management

<!-- 
Source references:
- https://vuejs.org/guide/components/events.html
- https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
-->
