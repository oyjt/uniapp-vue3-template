---
name: composables
description: Encapsulate and reuse stateful logic with the Composition API
---

# Composables

Composables are functions that encapsulate and reuse stateful logic using Composition API.

## What is a Composable?

A composable is a function that:
- Uses Composition API functions (ref, computed, onMounted, etc.)
- Manages reactive state
- Returns reactive state and/or functions
- Name starts with "use" by convention

## Basic Example

```ts
// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
```

Usage:

```vue
<script setup lang="ts">
import { useMouse } from '@/composables/useMouse'

const { x, y } = useMouse()
</script>

<template>
  Mouse: {{ x }}, {{ y }}
</template>
```

## Async Composable

Handle async data fetching:

```ts
// composables/useFetch.ts
import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue'

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(toValue(url))
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  })

  return { data, error, isLoading }
}
```

Usage with reactive URL:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch'

const userId = ref(1)
const { data, error, isLoading } = useFetch(() => `/api/users/${userId.value}`)

// Changing userId triggers refetch
function nextUser() {
  userId.value++
}
</script>
```

## Composable Conventions

### Naming

- Always start with `use` (useMouse, useFetch, useCounter)
- Use camelCase

### Input Arguments

Accept refs or getters for reactivity:

```ts
import { toValue, type MaybeRefOrGetter } from 'vue'

function useFeature(input: MaybeRefOrGetter<string>) {
  // toValue handles ref, getter, or plain value
  const value = toValue(input)
  
  // For reactive tracking, call toValue inside watchEffect/computed
  watchEffect(() => {
    console.log(toValue(input))
  })
}
```

### Return Values

Return a plain object with refs (not reactive):

```ts
// ✅ Good - refs can be destructured
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { count, increment }
}

// Usage - maintains reactivity
const { count, increment } = useCounter()
```

```ts
// ❌ Avoid - reactive loses connection on destructure
export function useCounter() {
  const state = reactive({ count: 0 })
  return state
}

// Loses reactivity
const { count } = useCounter()
```

## Composing Composables

Composables can use other composables:

```ts
// composables/useEventListener.ts
import { onMounted, onUnmounted, type MaybeRefOrGetter, toValue } from 'vue'

export function useEventListener(
  target: MaybeRefOrGetter<EventTarget>,
  event: string,
  callback: EventListener
) {
  onMounted(() => toValue(target).addEventListener(event, callback))
  onUnmounted(() => toValue(target).removeEventListener(event, callback))
}
```

```ts
// composables/useMouse.ts - using useEventListener
import { ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  useEventListener(window, 'mousemove', (event) => {
    x.value = (event as MouseEvent).pageX
    y.value = (event as MouseEvent).pageY
  })

  return { x, y }
}
```

## Side Effects

### SSR Considerations

Run DOM-specific code only in browser:

```ts
export function useWindowSize() {
  const width = ref(0)
  const height = ref(0)

  onMounted(() => {
    // Only runs in browser
    width.value = window.innerWidth
    height.value = window.innerHeight
  })
  
  return { width, height }
}
```

### Cleanup

Always clean up side effects:

```ts
export function useInterval(callback: () => void, delay: number) {
  const id = ref<number | undefined>()

  onMounted(() => {
    id.value = setInterval(callback, delay)
  })

  onUnmounted(() => {
    if (id.value) clearInterval(id.value)
  })
}
```

## Usage Restrictions

Composables must be called:
- Synchronously in `<script setup>` or `setup()`
- Can be called in lifecycle hooks like `onMounted()`

```ts
// ✅ Works
<script setup>
const { x, y } = useMouse()
</script>

// ❌ Won't work
setTimeout(() => {
  const { x, y } = useMouse() // No active component
}, 100)
```

Exception: `<script setup>` allows composables after `await`.

## vs Other Patterns

**vs Mixins**: Composables are explicit (no naming collisions, clear source)

**vs Renderless Components**: Composables have no component overhead

**vs React Hooks**: Similar concept, but Vue's reactivity is different - no rules about hook order or dependency arrays

<!-- 
Source references:
- https://vuejs.org/guide/reusability/composables.html
-->
