<template>
  <view class="navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="navbar-content">
      <view v-if="showBack" class="navbar-back" @click="handleBack">
        <text class="back-icon iconfont icon-arrow-left"></text>
      </view>
      <view class="navbar-title">{{ title }}</view>
      <view class="navbar-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
  <view class="navbar-placeholder" :style="{ height: navbarHeight + 'px' }"></view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getStatusBarHeight } from '@/utils'

const props = withDefaults(defineProps<{
  title?: string
  showBack?: boolean
}>(), {
  title: '',
  showBack: false
})

const statusBarHeight = ref(getStatusBarHeight())
const navBarHeight = 44

const navbarHeight = computed(() => statusBarHeight.value + navBarHeight)

function handleBack() {
  uni.navigateBack({
    fail: () => {
      uni.switchTab({ url: '/pages/index/index' })
    }
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(135deg, $primary-color 0%, #6a9dff 100%);

  .navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 88rpx;
    padding: 0 24rpx;
  }

  .navbar-back {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    transition: all 0.2s;

    &:active {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(0.95);
    }

    .back-icon {
      font-size: 36rpx;
      color: #fff;
      font-weight: 500;
      line-height: 1;
    }
  }

  .navbar-title {
    flex: 1;
    text-align: center;
    font-size: 34rpx;
    font-weight: 600;
    color: #fff;
    margin: 0 20rpx;
  }

  .navbar-right {
    display: flex;
    align-items: center;
  }
}

.navbar-placeholder {
  width: 100%;
  background: linear-gradient(135deg, $primary-color 0%, #6a9dff 100%);
}
</style>
