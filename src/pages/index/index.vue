<template>
  <view class="container">
    <NavBar title="首页" />
    <scroll-view scroll-y class="content">
      <SearchBar placeholder="搜索商品" />
      <view class="slider-wrapper">
        <Slider :items="sliderItems" />
      </view>
      <CategoryGrid :categories="categories" @click="handleCategoryClick" />
      <view class="section">
        <view class="section-header">
          <text class="section-title">🔥 热门推荐</text>
          <text class="section-more">更多 ›</text>
        </view>
        <view class="product-list">
          <ProductCard
            v-for="product in hotProducts"
            :key="product.id"
            :product="product"
          />
        </view>
      </view>
    </scroll-view>
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import Slider from '@/components/Slider.vue'
import CategoryGrid from '@/components/CategoryGrid.vue'
import ProductCard from '@/components/ProductCard.vue'
import TabBar from '@/components/TabBar.vue'
import { categories, products, type Category } from '@/data/products'

const sliderItems = ref([
  { image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=shopping%20promotion%20banner%20colorful%20sale&image_size=landscape_16_9', title: '限时特惠' },
  { image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=technology%20electronics%20gadgets%20banner&image_size=landscape_16_9', title: '数码新品' },
  { image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=fashion%20clothing%20summer%20collection&image_size=landscape_16_9', title: '时尚穿搭' }
])

const hotProducts = ref(products.slice(0, 8))

function handleCategoryClick(category: Category) {
  uni.switchTab({ url: '/pages/category/index' })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: $bg-color;
}

.content {
  height: calc(100vh - 44px - 88rpx);
}

.slider-wrapper {
  padding: $spacing-sm $spacing-base;
}

.section {
  padding: $spacing-base;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-base;

    .section-title {
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
    }

    .section-more {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;

    :deep(.product-card) {
      width: calc(50% - $spacing-sm);
      margin-right: $spacing-sm;

      &:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
}
</style>
