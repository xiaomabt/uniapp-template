<template>
  <view class="container">
    <NavBar title="商品详情" :showBack="true" />
    <scroll-view scroll-y class="detail-content" v-if="product">
      <swiper class="detail-swiper" indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
        <swiper-item>
          <image class="detail-image" :src="product.image" mode="aspectFill" />
        </swiper-item>
      </swiper>
      <view class="detail-info">
        <text class="detail-title">{{ product.name }}</text>
        <view class="detail-price-row">
          <text class="price-symbol">¥</text>
          <text class="price-value">{{ product.price }}</text>
          <text v-if="product.originalPrice" class="price-original">¥{{ product.originalPrice }}</text>
          <text v-if="product.originalPrice" class="price-discount">省{{ (product.originalPrice - product.price).toFixed(0) }}元</text>
        </view>
        <view class="detail-stats">
          <text class="stat-item">⭐ {{ product.rating }}</text>
          <text class="stat-item">|</text>
          <text class="stat-item">已售{{ product.sales }}件</text>
        </view>
      </view>
      <view class="detail-divider"></view>
      <view class="detail-section">
        <view class="section-title">商品详情</view>
        <view class="detail-desc">
          <text>这是一款优质商品，品质保证，售后无忧。</text>
          <text>支持7天无理由退换货，全国包邮。</text>
          <text>正品保障，假一赔十。</text>
        </view>
      </view>
    </scroll-view>
    <view class="detail-footer">
      <view class="footer-left">
        <view class="footer-item" @click="handleShare">
          <text class="footer-icon iconfont icon-share"></text>
          <text class="footer-text">分享</text>
        </view>
        <view class="footer-item" @click="handleFavorite">
          <text class="footer-icon iconfont" :class="isFavorite ? 'icon-heart' : 'icon-favorites'" :style="isFavorite ? 'color: #ff4d4f' : ''"></text>
          <text class="footer-text">收藏</text>
        </view>
      </view>
      <view class="footer-right">
        <view class="footer-btn secondary" @click="handleAddCart">
          <text>加入购物车</text>
        </view>
        <view class="footer-btn primary" @click="handleBuyNow">
          <text>立即购买</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import NavBar from '@/components/NavBar.vue'
import { getProductById, type Product } from '@/data/products'
import { useCartStore } from '@/stores/cart'

const product = ref<Product | null>(null)
const isFavorite = ref(false)
const cartStore = useCartStore()

onLoad((options) => {
  if (options?.id) {
    const productId = parseInt(options.id as string)
    product.value = getProductById(productId) || null
  }
})

function handleShare() {
  uni.showToast({
    title: '分享功能开发中',
    icon: 'none'
  })
}

function handleFavorite() {
  isFavorite.value = !isFavorite.value
  uni.showToast({
    title: isFavorite.value ? '已收藏' : '已取消收藏',
    icon: 'none'
  })
}

function handleAddCart() {
  if (product.value) {
    cartStore.addItem(product.value)
  }
}

function handleBuyNow() {
  uni.showToast({
    title: '购买功能开发中',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: $bg-color;
}

.detail-content {
  height: calc(100vh - 44px - 88rpx - 120rpx);
}

.detail-swiper {
  width: 100%;
  height: 750rpx;

  .detail-image {
    width: 100%;
    height: 100%;
  }
}

.detail-info {
  background: $bg-color-white;
  padding: $spacing-lg $spacing-base;

  .detail-title {
    font-size: $font-size-lg;
    color: $text-color;
    font-weight: 600;
    line-height: 1.4;
    display: block;
    margin-bottom: $spacing-base;
  }

  .detail-price-row {
    display: flex;
    align-items: baseline;
    margin-bottom: $spacing-sm;

    .price-symbol {
      font-size: $font-size-lg;
      color: $error-color;
      font-weight: 600;
    }

    .price-value {
      font-size: 56rpx;
      color: $error-color;
      font-weight: 700;
    }

    .price-original {
      font-size: $font-size-base;
      color: $text-color-placeholder;
      text-decoration: line-through;
      margin-left: $spacing-sm;
    }

    .price-discount {
      font-size: $font-size-sm;
      color: $error-color;
      background: rgba($error-color, 0.1);
      padding: 4rpx 12rpx;
      border-radius: $radius-xs;
      margin-left: $spacing-sm;
    }
  }

  .detail-stats {
    display: flex;
    align-items: center;

    .stat-item {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      margin-right: $spacing-sm;
    }
  }
}

.detail-divider {
  height: $spacing-base;
  background: $bg-color;
}

.detail-section {
  background: $bg-color-white;
  padding: $spacing-lg $spacing-base;

  .section-title {
    font-size: $font-size-base;
    font-weight: 600;
    color: $text-color;
    margin-bottom: $spacing-base;
  }

  .detail-desc {
    text {
      font-size: $font-size-base;
      color: $text-color-secondary;
      line-height: 1.8;
      display: block;
      margin-bottom: $spacing-sm;
    }
  }
}

.detail-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: $bg-color-white;
  padding: $spacing-sm $spacing-base;
  padding-bottom: calc(#{$spacing-sm} + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.06);

  .footer-left {
    display: flex;

    .footer-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 $spacing-lg;

      .footer-icon {
        font-size: $font-size-xl;
        margin-bottom: $spacing-xs;
      }

      .footer-text {
        font-size: $font-size-xs;
        color: $text-color-secondary;
      }
    }
  }

  .footer-right {
    display: flex;

    .footer-btn {
      padding: $spacing-sm $spacing-lg;
      border-radius: 40rpx;
      margin-left: $spacing-sm;

      text {
        font-size: $font-size-base;
        font-weight: 500;
      }

      &.secondary {
        background: $bg-color-grey;

        text {
          color: $text-color;
        }
      }

      &.primary {
        background: linear-gradient(135deg, $primary-color 0%, #6a9dff 100%);

        text {
          color: #fff;
        }
      }
    }
  }
}
</style>
