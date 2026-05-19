<template>
  <view class="container">
    <NavBar title="我的" />
    <view class="user-section">
      <view class="user-header">
        <image class="user-avatar" :src="userStore.user?.avatar || ''" mode="aspectFill" />
        <view class="user-info">
          <text class="user-name">{{ userStore.user?.name || '登录/注册' }}</text>
          <text class="user-phone">{{ userStore.user?.phone || '点击登录' }}</text>
        </view>
        <view class="user-arrow">›</view>
      </view>
      <view class="user-stats">
        <view class="stat-item">
          <text class="stat-value">¥{{ userStore.user?.balance.toFixed(2) || '0.00' }}</text>
          <text class="stat-label">余额</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ userStore.user?.points || '0' }}</text>
          <text class="stat-label">积分</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ orders }}</text>
          <text class="stat-label">订单</text>
        </view>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-item" v-for="item in menuItems" :key="item.key" @click="handleMenuClick(item)">
        <text class="menu-icon iconfont" :class="item.icon"></text>
        <text class="menu-text">{{ item.text }}</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
    <view class="logout-section" v-if="userStore.isLoggedIn">
      <view class="logout-btn" @click="handleLogout">
        <text>退出登录</text>
      </view>
    </view>
    <view class="login-section" v-else>
      <view class="login-btn" @click="handleLogin">
        <text>立即登录</text>
      </view>
    </view>
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const orders = ref(3)

const menuItems = ref([
  { key: 'orders', icon: 'icon-orders', text: '我的订单' },
  { key: 'coupon', icon: 'icon-coupon', text: '优惠券' },
  { key: 'address', icon: 'icon-address', text: '收货地址' },
  { key: 'favorites', icon: 'icon-favorites', text: '我的收藏' },
  { key: 'service', icon: 'icon-service', text: '客服中心' },
  { key: 'settings', icon: 'icon-settings', text: '设置' }
])

function handleMenuClick(item: { key: string; icon: string; text: string }) {
  uni.showToast({
    title: `${item.text}功能开发中`,
    icon: 'none'
  })
}

function handleLogin() {
  uni.showModal({
    title: '登录',
    editable: true,
    placeholderText: '请输入用户名',
    success: (res) => {
      if (res.confirm && res.content) {
        userStore.login(res.content, 'password')
      }
    }
  })
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: $bg-color;
}

.user-section {
  background: linear-gradient(135deg, $primary-color 0%, #6a9dff 100%);
  padding: $spacing-lg $spacing-base;
  padding-top: calc(#{$spacing-lg} + env(safe-area-inset-top));

  .user-header {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-lg;

    .user-avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      border: 4rpx solid rgba(255, 255, 255, 0.5);
    }

    .user-info {
      flex: 1;
      margin-left: $spacing-base;

      .user-name {
        font-size: $font-size-xl;
        color: #fff;
        font-weight: 600;
        display: block;
        margin-bottom: $spacing-xs;
      }

      .user-phone {
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .user-arrow {
      font-size: $font-size-xl;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .user-stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.15);
    border-radius: $radius-lg;
    padding: $spacing-lg 0;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .stat-value {
        font-size: $font-size-xl;
        color: #fff;
        font-weight: 600;
        margin-bottom: $spacing-xs;
      }

      .stat-label {
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .stat-divider {
      width: 1rpx;
      height: 60rpx;
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.menu-section {
  margin: $spacing-base;
  background: $bg-color-white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;

  .menu-item {
    display: flex;
    align-items: center;
    padding: $spacing-lg $spacing-base;
    border-bottom: 1rpx solid $border-color-light;

    &:last-child {
      border-bottom: none;
    }

    .menu-icon {
      font-size: $font-size-xl;
      margin-right: $spacing-base;
    }

    .menu-text {
      flex: 1;
      font-size: $font-size-base;
      color: $text-color;
    }

    .menu-arrow {
      font-size: $font-size-lg;
      color: $text-color-placeholder;
    }
  }
}

.login-section,
.logout-section {
  padding: $spacing-lg $spacing-base;

  .login-btn,
  .logout-btn {
    background: $primary-color;
    padding: $spacing-base;
    border-radius: 40rpx;
    text-align: center;

    text {
      font-size: $font-size-base;
      color: #fff;
      font-weight: 500;
    }
  }

  .logout-btn {
    background: transparent;
    border: 2rpx solid $border-color;

    text {
      color: $text-color-secondary;
    }
  }
}
</style>
