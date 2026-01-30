---
name: component-props
description: Declare and use props with type safety and validation
---

# Component Props

Props are custom attributes for passing data from parent to child components.

## Type-Based Declaration (Recommended)

Use TypeScript interfaces with `defineProps`:

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = defineProps<Props>()
</script>
```

## Reactive Props Destructure (3.5+)

Destructure props while keeping reactivity:

```vue
<script setup lang="ts">
interface Props {
  msg?: string
  count?: number
}

const { msg = 'hello', count = 0 } = defineProps<Props>()

// Both msg and count are reactive
watchEffect(() => {
  console.log(msg, count)
})
</script>
```

### Passing destructured props to functions

```ts
const { foo } = defineProps(['foo'])

// ❌ Won't work - passes value not reactive source
watch(foo, /* ... */)

// ✅ Wrap in getter
watch(() => foo, /* ... */)

// ✅ For composables
useComposable(() => foo)
```

## Default Values with withDefaults (3.4 and below)

```vue
<script setup lang="ts">
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two'] // Factory function for objects/arrays
})
</script>
```

## Runtime Declaration

For runtime validation without TypeScript:

```vue
<script setup lang="ts">
const props = defineProps({
  // Basic type check
  propA: Number,
  // Multiple types
  propB: [String, Number],
  // Required
  propC: { type: String, required: true },
  // With default
  propD: { type: Number, default: 100 },
  // Object with factory default
  propE: {
    type: Object,
    default: () => ({ message: 'hello' })
  },
  // Custom validator
  propF: {
    validator(value: string) {
      return ['success', 'warning', 'danger'].includes(value)
    }
  }
})
</script>
```

## Prop Types

Supported `type` values:
- `String`, `Number`, `Boolean`, `Array`, `Object`
- `Date`, `Function`, `Symbol`, `Error`
- Custom classes (uses `instanceof`)

```ts
class Person {
  constructor(public name: string) {}
}

defineProps({
  author: Person // instanceof check
})
```

## Nullable Props

```ts
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

## Boolean Casting

Boolean props have special casting rules:

```vue
<script setup lang="ts">
defineProps({
  disabled: Boolean
})
</script>

<!-- equivalent to :disabled="true" -->
<MyComponent disabled />

<!-- equivalent to :disabled="false" -->
<MyComponent />
```

## One-Way Data Flow

Props form a one-way binding: parent → child. Never mutate props directly.

```ts
const props = defineProps(['initialCounter'])

// ❌ Don't mutate props
props.initialCounter = 5

// ✅ Use local state initialized from prop
const counter = ref(props.initialCounter)

// ✅ Or use computed for transformations
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

## Passing Props

```vue-html
<!-- Static -->
<BlogPost title="My Post" />

<!-- Dynamic -->
<BlogPost :title="post.title" />

<!-- Number (requires v-bind) -->
<BlogPost :likes="42" />

<!-- Boolean -->
<BlogPost is-published />
<BlogPost :is-published="false" />

<!-- Object spread -->
<BlogPost v-bind="post" />
<!-- equivalent to -->
<BlogPost :id="post.id" :title="post.title" />
```

## Prop Name Casing

- Declare with camelCase in JavaScript
- Use kebab-case in templates

```ts
defineProps({
  greetingMessage: String
})
```

```vue-html
<MyComponent greeting-message="hello" />
```

<!-- 
Source references:
- https://vuejs.org/guide/components/props.html
- https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits
-->
