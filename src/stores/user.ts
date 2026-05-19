import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  id: number
  name: string
  avatar: string
  phone: string
  email: string
  balance: number
  points: number
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = ref(false)

  const defaultUser: UserInfo = {
    id: 1,
    name: '用户昵称',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar%20portrait%20friendly%20person&image_size=square',
    phone: '138****8888',
    email: 'user@example.com',
    balance: 1000.00,
    points: 5200
  }

  function login(username: string, password: string) {
    userInfo.value = { ...defaultUser, name: username }
    isLoggedIn.value = true
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
  }

  function logout() {
    userInfo.value = null
    isLoggedIn.value = false
    uni.showToast({
      title: '已退出登录',
      icon: 'none'
    })
  }

  function updateUserInfo(info: Partial<UserInfo>) {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...info }
    }
  }

  const user = computed(() => userInfo.value)

  return {
    user,
    isLoggedIn,
    login,
    logout,
    updateUserInfo
  }
})
