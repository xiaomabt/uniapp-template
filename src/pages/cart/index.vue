<template>
  <view class="container">
    <NavBar title="购物车" />
    <view class="cart-content">
      <view v-if="cartStore.items.length > 0">
        <view class="cart-list">
          <view
            v-for="item in cartStore.items"
            :key="item.id"
            class="cart-item"
          >
            <image class="item-image" :src="item.image" mode="aspectFill" />
            <view class="item-info">
              <text class="item-name">{{ item.name }}</text>
              <view class="item-price-row">
                <text class="item-price">¥{{ item.price }}</text>
                <text v-if="item.originalPrice" class="item-original">¥{{ item.originalPrice }}</text>
              </view>
            </view>
            <view class="item-actions">
              <view class="quantity-control">
                <view class="qty-btn" @click="handleDecrease(item.id)">
                  <text>-</text>
                </view>
                <text class="qty-value">{{ item.quantity }}</text>
                <view class="qty-btn" @click="handleIncrease(item.id)">
                  <text>+</text>
                </view>
              </view>
              <view class="delete-btn" @click="handleDelete(item.id)">
                <text>删除</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-cart">
        <text class="empty-icon">🛒</text>
        <text class="empty-text">购物车是空的</text>
        <view class="empty-btn" @click="goShopping">
          <text>去逛逛</text>
        </view>
      </view>
    </view>
    <view v-if="cartStore.items.length > 0" class="cart-footer">
      <view class="footer-left">
        <text class="total-label">合计:</text>
        <text class="total-price">¥{{ cartStore.totalPrice.toFixed(2) }}</text>
      </view>
      <view class="footer-right">
        <text class="item-count">{{ cartStore.totalCount }}件</text>
        <view class="checkout-btn" @click="handleCheckout">
          <text>结算</text>
        </view>
      </view>
    </view>
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function handleIncrease(productId: number) {
  const item = cartStore.items.find(item => item.id === productId)
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1)
  }
}

function handleDecrease(productId: number) {
  const item = cartStore.items.find(item => item.id === productId)
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1)
  }
}

function handleDelete(productId: number) {
  uni.showModal({
    title: '提示',
    content: '确定删除该商品吗？',
    success: (res) => {
      if (res.confirm) {
        cartStore.removeItem(productId)
      }
    }
  })
}

function goShopping() {
  uni.switchTab({ url: '/pages/index/index' })
}

function handleCheckout() {
  uni.showToast({
    title: '结算功能开发中',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: $bg-color;
}

.cart-content {
  padding-bottom: 140rpx;
}

.cart-list {
  padding: $spacing-base;

  .cart-item {
    display: flex;
    background: $bg-color-white;
    border-radius: $radius-lg;
    padding: $spacing-base;
    margin-bottom: $spacing-base;
    box-shadow: $shadow-sm;

    .item-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: $radius-sm;
      flex-shrink: 0;
    }

    .item-info {
      flex: 1;
      padding: 0 $spacing-base;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .item-name {
        font-size: $font-size-base;
        color: $text-color;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .item-price-row {
        display: flex;
        align-items: baseline;

        .item-price {
          font-size: $font-size-lg;
          color: $error-color;
          font-weight: 600;
        }

        .item-original {
          font-size: $font-size-xs;
          color: $text-color-placeholder;
          text-decoration: line-through;
          margin-left: $spacing-xs;
        }
      }
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;

      .quantity-control {
        display: flex;
        align-items: center;
        background: $bg-color-grey;
        border-radius: $radius-sm;

        .qty-btn {
          width: 56rpx;
          height: 56rpx;
          display: flex;
          align-items: center;
          justify-content: center;

          text {
            font-size: $font-size-lg;
            color: $text-color;
          }
        }

        .qty-value {
          width: 60rpx;
          text-align: center;
          font-size: $font-size-base;
          color: $text-color;
        }
      }

      .delete-btn {
        text {
          font-size: $font-size-sm;
          color: $text-color-placeholder;
        }
      }
    }
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 150rpx 0;

  .empty-icon {
    font-size: 120rpx;
    margin-bottom: $spacing-lg;
  }

  .empty-text {
    font-size: $font-size-lg;
    color: $text-color-placeholder;
    margin-bottom: $spacing-lg;
  }

  .empty-btn {
    background: $primary-color;
    padding: $spacing-base $spacing-xl;
    border-radius: 40rpx;

    text {
      font-size: $font-size-base;
      color: #fff;
      font-weight: 500;
    }
  }
}

.cart-footer {
  position: fixed;
  bottom: 100rpx;
  left: 0;
  right: 0;
  background: $bg-color-white;
  padding: $spacing-base;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.06);

  .footer-left {
    display: flex;
    align-items: baseline;

    .total-label {
      font-size: $font-size-base;
      color: $text-color-secondary;
    }

    .total-price {
      font-size: $font-size-xl;
      color: $error-color;
      font-weight: 700;
      margin-left: $spacing-xs;
    }
  }

  .footer-right {
    display: flex;
    align-items: center;

    .item-count {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      margin-right: $spacing-base;
    }

    .checkout-btn {
      background: linear-gradient(135deg, $primary-color 0%, #6a9dff 100%);
      padding: $spacing-sm $spacing-xl;
      border-radius: 40rpx;

      text {
        font-size: $font-size-base;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>
