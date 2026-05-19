export function formatPrice(price: number): string {
  return price.toFixed(2)
}

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toString()
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  } as T
}

export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let lastTime = 0
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.apply(this, args)
    }
  } as T
}

export function getStatusBarHeight(): number {
  const systemInfo = uni.getSystemInfoSync()
  return systemInfo.statusBarHeight || 44
}

export function getSafeAreaBottom(): number {
  const systemInfo = uni.getSystemInfoSync()
  return (systemInfo as any).safeArea?.bottom || (systemInfo as any).safeAreaInsets?.bottom || 0
}

export function navigateTo(url: string, params?: Record<string, any>) {
  let fullUrl = url
  if (params) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')
    fullUrl += '?' + query
  }
  uni.navigateTo({ url: fullUrl })
}

export function navigateBack(delta?: number) {
  uni.navigateBack({ delta: delta || 1 })
}

export function switchTab(url: string) {
  uni.switchTab({ url })
}
