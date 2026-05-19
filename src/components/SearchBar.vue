<template>
  <view class="search-bar" @click="handleClick">
    <view class="search-input-wrapper">
      <text class="search-icon iconfont icon-search"></text>
      <text class="search-placeholder">{{ placeholder }}</text>
    </view>
    <view v-if="showCancel" class="search-cancel" @click.stop="handleCancel">
      <text>取消</text>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  placeholder?: string
  showCancel?: boolean
}>(), {
  placeholder: '搜索商品',
  showCancel: false
})

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'cancel'): void
}>()

function handleClick() {
  emit('click')
}

function handleCancel() {
  emit('cancel')
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  padding: 0 $spacing-base $spacing-sm;
  background: $bg-color-white;

  .search-input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    background: $bg-color-grey;
    border-radius: 40rpx;
    padding: $spacing-sm $spacing-base;

    .search-icon {
      font-size: $font-size-lg;
      margin-right: $spacing-sm;
    }

    .search-placeholder {
      font-size: $font-size-base;
      color: $text-color-placeholder;
    }
  }

  .search-cancel {
    margin-left: $spacing-base;
    padding: $spacing-sm $spacing-base;

    text {
      font-size: $font-size-base;
      color: $text-color-secondary;
    }
  }
}
</style>
