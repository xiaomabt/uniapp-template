<template>
  <view class="slider">
    <swiper
      class="swiper"
      :indicator-dots="showDots"
      :autoplay="autoPlay"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      indicator-color="rgba(255,255,255,0.5)"
      indicator-active-color="#fff"
    >
      <swiper-item v-for="(item, index) in items" :key="index">
        <image class="slider-image" :src="item.image" mode="aspectFill" />
        <view v-if="item.title" class="slider-title">{{ item.title }}</view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
export interface SliderItem {
  image: string
  title?: string
}

withDefaults(defineProps<{
  items: SliderItem[]
  showDots?: boolean
  autoPlay?: boolean
  circular?: boolean
  interval?: number
  duration?: number
}>(), {
  showDots: true,
  autoPlay: true,
  circular: true,
  interval: 3000,
  duration: 500
})
</script>

<style lang="scss" scoped>
.slider {
  .swiper {
    width: 100%;
    height: 320rpx;
    border-radius: $radius-lg;
    overflow: hidden;
  }

  .slider-image {
    width: 100%;
    height: 100%;
  }

  .slider-title {
    position: absolute;
    bottom: 24rpx;
    left: 24rpx;
    font-size: $font-size-lg;
    color: #fff;
    font-weight: 600;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
  }
}
</style>
