---
name: component-slots
description: Pass template content to child components with default, named, and scoped slots
---

# Component Slots

Slots allow parent components to pass template content into child components.

## Basic Slot

Child component with slot outlet:

```vue
<!-- FancyButton.vue -->
<template>
  <button class="fancy-btn">
    <slot></slot> <!-- slot outlet -->
  </button>
</template>
```

Parent passes slot content:

```vue-html
<FancyButton>
  Click me!
</FancyButton>
```

Renders as:

```html
<button class="fancy-btn">Click me!</button>
```

## Fallback Content

Provide default content when no slot content is provided:

```vue
<template>
  <button>
    <slot>Submit</slot> <!-- "Submit" is fallback -->
  </button>
</template>
```

## Named Slots

Use multiple slots with names:

```vue
<!-- BaseLayout.vue -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot> <!-- default slot -->
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

Use `v-slot` or `#` shorthand to target named slots:

```vue-html
<BaseLayout>
  <template #header>
    <h1>Page Title</h1>
  </template>

  <p>Main content goes here</p>

  <template #footer>
    <p>Contact info</p>
  </template>
</BaseLayout>
```

## Scoped Slots

Pass data from child to parent slot content:

```vue
<!-- MyComponent.vue -->
<template>
  <div>
    <slot :text="greetingMessage" :count="1"></slot>
  </div>
</template>

<script setup lang="ts">
const greetingMessage = 'hello'
</script>
```

Receive slot props in parent:

```vue-html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

<!-- Or with destructuring -->
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```

### Named Scoped Slots

```vue-html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps.title }}
  </template>

  <template #default="{ message }">
    {{ message }}
  </template>
</MyComponent>
```

## Conditional Slots

Check if a slot has content using `$slots`:

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
  </div>
</template>
```

## Dynamic Slot Names

```vue-html
<template #[dynamicSlotName]>
  ...
</template>
```

## Renderless Components

Components that only provide logic via scoped slots:

```vue
<!-- MouseTracker.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

function update(e: MouseEvent) {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<template>
  <slot :x="x" :y="y"></slot>
</template>
```

Usage:

```vue-html
<MouseTracker v-slot="{ x, y }">
  Mouse: {{ x }}, {{ y }}
</MouseTracker>
```

> Note: Composables are often preferred over renderless components for pure logic reuse.

## Render Scope

- Slot content has access to parent scope
- Slot content does NOT have access to child scope
- Use scoped slots to expose child data

<!-- 
Source references:
- https://vuejs.org/guide/components/slots.html
-->
