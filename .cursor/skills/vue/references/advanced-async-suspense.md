---
name: async-components-suspense
description: Handle async operations, top-level await, and Suspense boundaries
---

# Async Components & Suspense

Vue provides patterns for handling asynchronous operations in components.

## Top-Level await in Script Setup

`<script setup>` supports top-level `await`, making the component an async dependency:

```vue
<script setup lang="ts">
const data = await fetch('/api/data').then(r => r.json())
</script>

<template>
  <div>{{ data }}</div>
</template>
```

**Important**: Components with top-level `await` **require a `<Suspense>` boundary** in a parent component, otherwise they won't render.

## Suspense

`<Suspense>` is a built-in component for handling async dependencies in the component tree.

```vue
<template>
  <Suspense>
    <!-- Component with async setup -->
    <AsyncComponent />
    
    <!-- Fallback while loading -->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

### Suspense Slots

- **default**: The async content to render
- **fallback**: Content shown while async dependencies are resolving

```vue
<Suspense>
  <template #default>
    <Dashboard />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

## Async Components

Define components that are loaded asynchronously:

```ts
import { defineAsyncComponent } from 'vue'

const AsyncModal = defineAsyncComponent(() => 
  import('./components/Modal.vue')
)

// With options
const AsyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./components/Modal.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,        // Delay before showing loading (ms)
  timeout: 3000      // Timeout before showing error (ms)
})
```

## Common Async Pitfalls

### Pitfall 1: Missing Suspense Boundary

```vue
<!-- ❌ Won't work - no Suspense boundary -->
<template>
  <AsyncComponent />
</template>

<!-- ✅ Works -->
<template>
  <Suspense>
    <AsyncComponent />
    <template #fallback>Loading...</template>
  </Suspense>
</template>
```

### Pitfall 2: Lifecycle Hooks After await

Lifecycle hooks must be registered synchronously, before any `await`:

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// ✅ Register hooks BEFORE await
onMounted(() => console.log('mounted'))
onUnmounted(() => console.log('unmounted'))

// Now you can await
const data = await fetchData()
</script>
```

```vue
<script setup lang="ts">
// ❌ WRONG - hooks after await won't work
const data = await fetchData()

onMounted(() => {
  // This may not be called!
})
</script>
```

### Pitfall 3: Composables After await

Composables that use lifecycle hooks must be called before `await`:

```vue
<script setup lang="ts">
import { useMouse } from '@/composables/useMouse'

// ✅ Call composables BEFORE await
const { x, y } = useMouse()

const data = await fetchData()
</script>
```

### Pitfall 4: Watchers Created in Async Callbacks

Watchers in async callbacks aren't auto-disposed:

```ts
// ❌ Memory leak - watcher not auto-disposed
setTimeout(() => {
  watch(source, callback) // Must be stopped manually
}, 1000)

// ✅ Watchers in setup are auto-disposed
watch(source, callback)
```

## Recommended Pattern: Avoid Top-Level await

Often better to handle async in `onMounted` or with watchers:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref<Data | null>(null)
const isLoading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    data.value = await fetchData()
  } catch (e) {
    error.value = e as Error
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>
```

This pattern:
- Doesn't require Suspense
- Gives you control over loading/error states
- Works everywhere without special parent setup

## When to Use Suspense

Use Suspense when:
- You have nested async components
- You want coordinated loading states across multiple async children
- You're doing SSR with async data requirements

Avoid Suspense when:
- Simple single-component async loading
- You need fine-grained control over loading states
- You want to avoid Suspense complexity

## Suspense Events

```vue
<Suspense
  @pending="onPending"
  @resolve="onResolve"
  @fallback="onFallback"
>
  <AsyncComponent />
</Suspense>
```

## Error Handling with Suspense

Use `onErrorCaptured` or `<ErrorBoundary>` pattern:

```vue
<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((e) => {
  error.value = e
  return false // Prevent propagation
})
</script>

<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <Suspense v-else>
    <AsyncComponent />
    <template #fallback>Loading...</template>
  </Suspense>
</template>
```

<!-- 
Source references:
- https://vuejs.org/guide/built-ins/suspense.html
- https://vuejs.org/guide/components/async.html
- https://vuejs.org/api/sfc-script-setup.html#top-level-await
-->
