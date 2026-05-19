<template>
  <view class="category-grid">
    <view
      class="category-item"
      v-for="item in categories"
      :key="item.id"
      @click="handleClick(item)"
    >
      <text class="category-icon iconfont" :class="item.icon"></text>
      <text class="category-name">{{ item.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Category } from '@/data/products'

defineProps<{
  categories: Category[]
}>()

const emit = defineEmits<{
  (e: 'click', category: Category): void
}>()

function handleClick(category: Category) {
  emit('click', category)
}
</script>

<style lang="scss" scoped>
.category-grid {
  display: flex;
  flex-wrap: wrap;
  background: $bg-color-white;
  padding: $spacing-base;

  .category-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-base 0;

    .category-icon {
      width: 100rpx;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48rpx;
      background: linear-gradient(135deg, rgba($primary-color, 0.1) 0%, rgba($primary-color, 0.05) 100%);
      border-radius: 50%;
      margin-bottom: $spacing-sm;
    }

    .category-name {
      font-size: $font-size-sm;
      color: $text-color;
      margin-top: $spacing-xs;
    }
  }
}
</style>
