<template>
  <text 
    class="iconfont" 
    :class="[iconClass, { 'icon-active': active }]"
    :style="{ fontSize: size + 'rpx', color: color }"
  ></text>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type: string
  size?: number
  color?: string
  active?: boolean
}>(), {
  size: 32,
  color: '#333333',
  active: false
})

const iconClass = computed(() => `icon-${props.type}`)
</script>

<style lang="scss" scoped>
.iconfont {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-active {
  color: $primary-color;
}
</style>
