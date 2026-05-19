/// <reference types="vite/client" />
/// <reference types="@dcloudio/types" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@dcloudio/uni-app' {
  export function onLaunch(callback: () => void): void
  export function onShow(callback: () => void): void
  export function onHide(callback: () => void): void
  export function onLoad(callback: (options?: Record<string, any>) => void): void
  export function onReady(callback: () => void): void
  export function onUnload(callback: () => void): void
  export function onPullDownRefresh(callback: () => void): void
  export function onReachBottom(callback: () => void): void
}
