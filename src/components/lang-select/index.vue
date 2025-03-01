<template>
  <view>
    <picker
      range-key="label"
      :range="langOptions"
      :value="langIndex"
      @change="handleLangChange"
    >
      <slot>
        <view class="i-mdi-language" :style="langStyle" />
      </slot>
    </picker>
  </view>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps({
  size: {
    type: Number,
    default: 40,
    required: false,
  },
});
const emit = defineEmits(['change']);
const { locale, t } = useI18n();
const langStyle = {
  fontSize: `${props.size}rpx`,
};
const langOptions = computed(() => {
  return [
    { label: t('locale.en'), value: 'en' },
    { label: t('locale.zh-hans'), value: 'zh-Hans' },
  ];
});
const langIndex = computed(() => {
  return langOptions.value.findIndex((item) => {
    return item.value === locale.value;
  });
});

function handleLangChange(event: any) {
  const lang = langOptions.value[event.detail.value].value;
  locale.value = lang;
  uni.setLocale(lang);
  emit('change', lang);
}
</script>

<style lang="scss" scoped></style>
