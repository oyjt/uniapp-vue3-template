<template>
  <view class="nav-wrap">
    <view class="nav-title">
      <u--image :show-loading="true" src="./static/logo.png" width="70px" height="70px" />
      <view class="nav-info">
        <view class="nav-info__title">
          <text class="nav-info__title__text">uview-plus3</text>
        </view>
        <text class="nav-slogan">多平台快速开发的UI框架</text>
      </view>
    </view>
    <text class="nav-desc">{{ desc }}</text>
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
  position: relative;
  padding: 15px;
}

.lang {
  position: absolute;
  top: 15px;
  right: 15px;
}

.nav-title {
  /* #ifndef APP-NVUE */
  display: flex;
  justify-content: flex-start;
  align-items: center;

  /* #endif */
  flex-direction: row;
}

.nav-info {
  margin-left: 15px;

  &__title {
    /* #ifndef APP-NVUE */
    display: flex;

    /* #endif */
    flex-direction: row;
    align-items: center;

    &__text {
      /* #ifndef APP-NVUE */
      display: flex;
      font-size: 25px;
      text-align: left;

      /* #endif */
      color: $u-main-color;
      font-weight: bold;
    }

    &__jump {
      margin-left: 20px;
      font-size: 12px;
      color: $u-primary;
      font-weight: normal;
    }
  }
}

.logo {
  width: 70px;
  height: 70px;

  /* #ifndef APP-NVUE */
  height: auto;

  /* #endif */
}

.nav-slogan {
  font-size: 14px;
  color: $u-tips-color;
}

.nav-desc {
  margin-top: 10px;
  font-size: 14px;
  color: $u-content-color;
  line-height: 20px;
}
</style>
