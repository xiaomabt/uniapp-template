<template>
  <view class="product-card" @click="handleClick">
    <view class="product-image-wrapper">
      <image class="product-image" :src="product.image" mode="aspectFill" />
      <view v-if="product.originalPrice" class="product-tag">
        <text>省{{ (product.originalPrice - product.price).toFixed(0) }}元</text>
      </view>
      <view class="product-add" @click.stop="handleAdd">
        <text class="add-icon iconfont icon-plus"></text>
      </view>
    </view>
    <view class="product-info">
      <text class="product-name">{{ product.name }}</text>
      <view class="product-bottom">
        <view class="product-price">
          <text class="price-symbol">¥</text>
          <text class="price-value">{{ product.price }}</text>
          <text v-if="product.originalPrice" class="price-original">¥{{ product.originalPrice }}</text>
        </view>
        <text class="product-sales">已售{{ formatNumber(product.sales) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Product } from '@/data/products'
import { formatNumber } from '@/utils'
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

function handleClick() {
  uni.navigateTo({
    url: `/pages/detail/index?id=${props.product.id}`
  })
}

function handleAdd() {
  cartStore.addItem(props.product)
}
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  background: $bg-color-white;
  border-radius: $radius-lg;
  overflow: hidden;
  margin-bottom: $spacing-base;
  box-shadow: $shadow-sm;
  transition: transform 0.2s, box-shadow 0.2s;

  &:active {
    transform: scale(0.98);
    box-shadow: $shadow-base;
  }

  .product-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;

    .product-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .product-tag {
      position: absolute;
      top: 16rpx;
      left: 0;
      background: linear-gradient(90deg, $error-color, #ff7875);
      padding: 6rpx 16rpx;
      border-radius: 0 8rpx 8rpx 0;

      text {
        font-size: 20rpx;
        color: #fff;
        font-weight: 500;
      }
    }
  }

  .product-info {
    padding: $spacing-sm $spacing-base;

    .product-name {
      font-size: $font-size-base;
      color: $text-color;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: $spacing-sm;
    }

    .product-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .product-price {
        display: flex;
        align-items: baseline;

        .price-symbol {
          font-size: $font-size-sm;
          color: $error-color;
          font-weight: 600;
        }

        .price-value {
          font-size: $font-size-xl;
          color: $error-color;
          font-weight: 700;
          margin-left: 2rpx;
        }

        .price-original {
          font-size: $font-size-xs;
          color: $text-color-placeholder;
          text-decoration: line-through;
          margin-left: $spacing-xs;
        }
      }

      .product-sales {
        font-size: $font-size-xs;
        color: $text-color-placeholder;
      }
    }
  }

  .product-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;

    .product-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .product-tag {
      position: absolute;
      top: 16rpx;
      left: 0;
      background: linear-gradient(90deg, $error-color, #ff7875);
      padding: 6rpx 16rpx;
      border-radius: 0 8rpx 8rpx 0;

      text {
        font-size: 20rpx;
        color: #fff;
        font-weight: 500;
      }
    }

    .product-add {
      position: absolute;
      right: $spacing-sm;
      bottom: $spacing-sm;
      width: 64rpx;
      height: 64rpx;
      background: $primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4rpx 12rpx rgba(64, 128, 255, 0.4);

      .add-icon {
        font-size: 40rpx;
        color: #fff;
        font-weight: 300;
        line-height: 1;
      }

      &:active {
        background: darken($primary-color, 10%);
      }
    }
  }

  .product-info {
    padding: $spacing-sm $spacing-base;

    .product-name {
      font-size: $font-size-base;
      color: $text-color;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: $spacing-sm;
    }

    .product-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .product-price {
        display: flex;
        align-items: baseline;

        .price-symbol {
          font-size: $font-size-sm;
          color: $error-color;
          font-weight: 600;
        }

        .price-value {
          font-size: $font-size-xl;
          color: $error-color;
          font-weight: 700;
          margin-left: 2rpx;
        }

        .price-original {
          font-size: $font-size-xs;
          color: $text-color-placeholder;
          text-decoration: line-through;
          margin-left: $spacing-xs;
        }
      }

      .product-sales {
        font-size: $font-size-xs;
        color: $text-color-placeholder;
      }
    }
  }
}
</style>
