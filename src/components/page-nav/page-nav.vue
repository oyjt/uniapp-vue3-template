<template>
  <view class="nav-wrap">
    <view class="nav-title">
      <u--image :show-loading="true" src="./static/logo.png" width="70px" height="70px" />
      <view class="nav-info">
        <view class="nav-info__title">
          <text class="nav-info__title__text">
            uview-plus3
          </text>
        </view>
        <text class="nav-slogan">
          多平台快速开发的UI框架
        </text>
      </view>
    </view>
    <text class="nav-desc">
      {{ desc }}
    </text>
  </view>
</template>

<script>
export default {
  name: 'PageNav',
  props: {
    desc: String,
    title: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.nav-wrap {
  @apply relative p-15px;
}

.lang {
  @apply absolute top-15rpx right-15px;
}

.nav-title {
  /* #ifndef APP-NVUE */
  @apply flex justify-start items-center;

  /* #endif */
  @apply flex-row;
}

.nav-info {
  @apply ml-15px;

  &__title {
    /* #ifndef APP-NVUE */
    @apply flex;

    /* #endif */
    @apply flex-row items-center;

    &__text {
      /* #ifndef APP-NVUE */
      @apply flex text-25px text-left;

      /* #endif */
      @apply font-bold;

      color: $u-main-color;
    }

    &__jump {
      @apply ml-20px text-12px font-normal;

      color: $u-primary;
    }
  }
}

.logo {
  @apply w-70px h-70px;

  /* #ifndef APP-NVUE */
  @apply h-auto;

  /* #endif */
}

.nav-slogan {
  @apply text-14px;

  color: $u-tips-color;
}

.nav-desc {
  @apply mt-10px text-14px lh-normal;

  color: $u-content-color;
}
</style>
