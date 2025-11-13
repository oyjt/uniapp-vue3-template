<template>
  <web-view class="h-full" :src="url" />
</template>

<script setup>
const url = ref('');

onLoad((options) => {
  if (options.url)
    url.value = decodeURIComponent(options.url);
});
</script>
