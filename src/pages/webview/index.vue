<template>
  <web-view class="h-full" :src="url"></web-view>
</template>

<script setup lang="ts">
const url = ref<string>('');

onLoad(params => {
  if (params.title) {
    uni.setNavigationBarTitle({
      title: params.title,
    });
  }
  if (params.url) {
    url.value = params.url;
  }
});
</script>
