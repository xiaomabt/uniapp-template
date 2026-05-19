<template>
  <view class="custom-tabbar">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="tab-item"
      :class="{ active: currentIndex === index }"
      @click="handleTabClick(index)"
    >
      <text class="tab-icon iconfont" :class="item.icon"></text>
      <text class="tab-text">{{ item.text }}</text>
      <view v-if="index === 2 && cartStore.totalCount > 0" class="tab-badge">
        <text>{{ cartStore.totalCount > 99 ? '99+' : cartStore.totalCount }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const currentIndex = ref(0)

const tabList = [
  { pagePath: '/pages/index/index', text: '首页', icon: 'icon-home' },
  { pagePath: '/pages/category/index', text: '分类', icon: 'icon-category' },
  { pagePath: '/pages/cart/index', text: '购物车', icon: 'icon-cart' },
  { pagePath: '/pages/mine/index', text: '我的', icon: 'icon-user' }
]

function getCurrentPageIndex() {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    const route = '/' + currentPage.route
    const index = tabList.findIndex(item => item.pagePath === route)
    return index >= 0 ? index : 0
  }
  return 0
}

function handleTabClick(index: number) {
  if (currentIndex.value === index) return
  currentIndex.value = index
  uni.switchTab({
    url: tabList[index].pagePath
  })
}

onMounted(() => {
  currentIndex.value = getCurrentPageIndex()
})
</script>

<style lang="scss" scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: $tab-bar-height;
  background: $bg-color-white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 999;

  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-xs 0;
    position: relative;

    .tab-icon {
      font-size: 40rpx;
      color: $text-color-secondary;
      transition: all 0.2s;
    }

    .tab-text {
      font-size: $font-size-xs;
      color: $text-color-secondary;
      margin-top: $spacing-xs;
      transition: all 0.2s;
    }

    &.active {
      .tab-icon,
      .tab-text {
        color: $primary-color;
      }
    }

    .tab-badge {
      position: absolute;
      top: 2rpx;
      right: 50%;
      transform: translateX(24rpx);
      min-width: 32rpx;
      height: 32rpx;
      background: $error-color;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8rpx;

      text {
        font-size: 20rpx;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
