<template>
  <view class="container">
    <NavBar title="分类" />
    <view class="category-layout">
      <scroll-view scroll-y class="category-sidebar">
        <view
          v-for="category in categoryList"
          :key="category.id"
          class="sidebar-item"
          :class="{ active: activeCategory === category.id }"
          @click="handleCategorySelect(category.id)"
        >
          <text class="iconfont" :class="category.icon"></text>
          <text>{{ category.name }}</text>
        </view>
      </scroll-view>
      <scroll-view scroll-y class="category-content">
        <view v-if="currentProducts.length > 0">
          <view class="product-grid">
            <view
              v-for="product in currentProducts"
              :key="product.id"
              class="category-product"
              @click="handleProductClick(product.id)"
            >
              <image class="product-image" :src="product.image" mode="aspectFill" />
              <text class="product-name">{{ product.name }}</text>
              <text class="product-price">¥{{ product.price }}</text>
            </view>
          </view>
        </view>
        <view v-else class="empty-state">
          <text class="empty-icon">📦</text>
          <text class="empty-text">暂无商品</text>
        </view>
      </scroll-view>
    </view>
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
import { categories, getProductsByCategory, type Product } from '@/data/products'

const categoryList = ref(categories)
const activeCategory = ref(1)

const currentProducts = computed(() => {
  return getProductsByCategory(activeCategory.value)
})

function handleCategorySelect(categoryId: number) {
  activeCategory.value = categoryId
}

function handleProductClick(productId: number) {
  uni.navigateTo({
    url: `/pages/detail/index?id=${productId}`
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: $bg-color;
}

.category-layout {
  display: flex;
  height: calc(100vh - 44px - 88rpx - 100rpx);
}

.category-sidebar {
  width: 200rpx;
  background: $bg-color-grey;

  .sidebar-item {
    padding: $spacing-lg $spacing-sm;
    text-align: center;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    border-left: 6rpx solid transparent;
    transition: all 0.3s;

    &.active {
      background: $bg-color-white;
      color: $primary-color;
      border-left-color: $primary-color;
      font-weight: 600;
    }
  }
}

.category-content {
  flex: 1;
  background: $bg-color-white;
  padding: $spacing-sm;

  .product-grid {
    display: flex;
    flex-wrap: wrap;

    .category-product {
      width: calc(50% - $spacing-xs);
      margin-right: $spacing-sm;
      margin-bottom: $spacing-base;

      &:nth-child(2n) {
        margin-right: 0;
      }

      .product-image {
        width: 100%;
        height: 240rpx;
        border-radius: $radius-base;
      }

      .product-name {
        font-size: $font-size-sm;
        color: $text-color;
        margin-top: $spacing-xs;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 0 $spacing-xs;
      }

      .product-price {
        font-size: $font-size-base;
        color: $error-color;
        font-weight: 600;
        padding: $spacing-xs;
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100rpx 0;

    .empty-icon {
      font-size: 80rpx;
      margin-bottom: $spacing-base;
    }

    .empty-text {
      font-size: $font-size-base;
      color: $text-color-placeholder;
    }
  }
}
</style>
