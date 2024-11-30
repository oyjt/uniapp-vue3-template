<template>
  <web-view class="h-full" :src="url" />
</template>

<script setup lang="ts">
const url = ref<string>('');

onLoad((options: any) => {
  if (options.url)
    url.value = decodeURIComponent(options.url);
});
</script>
