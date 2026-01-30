---
name: lifecycle-hooks
description: Run code at specific stages of component lifecycle
---

# Lifecycle Hooks

Execute code at specific stages of a component's lifecycle.

## Common Lifecycle Hooks

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// Before DOM is mounted
onBeforeMount(() => {
  console.log('before mount')
})

// After DOM is mounted (most common)
onMounted(() => {
  console.log('mounted')
  // Safe to access DOM, make API calls, start timers
})

// Before reactive state change causes re-render
onBeforeUpdate(() => {
  console.log('before update')
})

// After DOM re-render
onUpdated(() => {
  console.log('updated')
})

// Before component unmounts
onBeforeUnmount(() => {
  console.log('before unmount')
})

// After component unmounts
onUnmounted(() => {
  console.log('unmounted')
  // Cleanup: remove listeners, cancel timers, etc.
})
</script>
```

## Lifecycle Diagram

```
Creation:
  setup() → onBeforeMount → onMounted

Updates:
  onBeforeUpdate → onUpdated

Destruction:
  onBeforeUnmount → onUnmounted
```

## Common Patterns

### DOM Access

```ts
import { ref, onMounted } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  // DOM is available
  inputRef.value?.focus()
})
```

### API Calls

```ts
import { ref, onMounted } from 'vue'

const data = ref(null)

onMounted(async () => {
  const response = await fetch('/api/data')
  data.value = await response.json()
})
```

### Cleanup

```ts
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
```

### Timer Cleanup

```ts
import { onMounted, onUnmounted } from 'vue'

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    // ...
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
```

## Less Common Hooks

```ts
import {
  onActivated,      // Component kept alive is activated
  onDeactivated,    // Component kept alive is deactivated
  onErrorCaptured,  // Error from descendant captured
  onRenderTracked,  // Debug: reactive dependency tracked
  onRenderTriggered // Debug: re-render triggered
} from 'vue'
```

## SSR Hooks

```ts
import { onServerPrefetch } from 'vue'

// Only runs during server-side rendering
onServerPrefetch(async () => {
  data.value = await fetchData()
})
```

## Important Notes

1. **Hooks must be called synchronously** during `setup()`:

```ts
// ❌ Won't work
setTimeout(() => {
  onMounted(() => {})
}, 100)

// ✅ Works
onMounted(() => {
  setTimeout(() => {}, 100)
})
```

2. **Can call from external functions** if called synchronously from setup:

```ts
// composable.ts
export function useFeature() {
  onMounted(() => {
    // This works if useFeature is called synchronously in setup
  })
}
```

3. **Multiple calls are allowed** - all callbacks will be invoked:

```ts
onMounted(() => console.log('first'))
onMounted(() => console.log('second'))
// Both will run
```

<!-- 
Source references:
- https://vuejs.org/guide/essentials/lifecycle.html
- https://vuejs.org/api/composition-api-lifecycle.html
-->
