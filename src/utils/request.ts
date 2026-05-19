export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: Record<string, any>
  header?: Record<string, string>
  timeout?: number
}

export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

const baseURL = 'https://api.example.com'

const defaultHeader = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export async function request<T = any>(options: RequestOptions): Promise<ResponseData<T>> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data,
      header: { ...defaultHeader, ...options.header },
      timeout: options.timeout || 30000,
      success: (res) => {
        const response = res.data as ResponseData<T>
        if (response.code === 200) {
          resolve(response)
        } else {
          uni.showToast({
            title: response.message || '请求失败',
            icon: 'none'
          })
          reject(response)
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export function get<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>) {
  return request<T>({ url, method: 'GET', data, ...options })
}

export function post<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>) {
  return request<T>({ url, method: 'POST', data, ...options })
}

export function put<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>) {
  return request<T>({ url, method: 'PUT', data, ...options })
}

export function del<T = any>(url: string, data?: Record<string, any>, options?: Omit<RequestOptions, 'url' | 'method' | 'data'>) {
  return request<T>({ url, method: 'DELETE', data, ...options })
}
