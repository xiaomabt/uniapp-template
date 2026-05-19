export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  sales: number
  rating: number
  categoryId: number
}

export interface Category {
  id: number
  name: string
  icon: string
}

export const categories: Category[] = [
  { id: 1, name: '热门推荐', icon: 'icon-trending-up' },
  { id: 2, name: '数码电子', icon: 'icon-category' },
  { id: 3, name: '服装服饰', icon: 'icon-tag' },
  { id: 4, name: '家居生活', icon: 'icon-home' },
  { id: 5, name: '美食零食', icon: 'icon-star' },
  { id: 6, name: '美妆护肤', icon: 'icon-heart' },
  { id: 7, name: '图书文具', icon: 'icon-service' },
  { id: 8, name: '运动户外', icon: 'icon-clock' }
]

export const products: Product[] = [
  {
    id: 1,
    name: '智能手机 Pro Max 2024',
    price: 5999,
    originalPrice: 6999,
    image: 'https://picsum.photos/300/300?random=1',
    sales: 12580,
    rating: 4.9,
    categoryId: 2
  },
  {
    id: 2,
    name: '无线蓝牙耳机降噪版',
    price: 399,
    originalPrice: 499,
    image: 'https://picsum.photos/300/300?random=2',
    sales: 8920,
    rating: 4.8,
    categoryId: 2
  },
  {
    id: 3,
    name: '时尚休闲运动鞋',
    price: 299,
    originalPrice: 399,
    image: 'https://picsum.photos/300/300?random=3',
    sales: 6540,
    rating: 4.7,
    categoryId: 8
  },
  {
    id: 4,
    name: '轻薄羽绒服女款',
    price: 499,
    originalPrice: 699,
    image: 'https://picsum.photos/300/300?random=4',
    sales: 4320,
    rating: 4.8,
    categoryId: 3
  },
  {
    id: 5,
    name: '智能手表运动版',
    price: 1299,
    originalPrice: 1599,
    image: 'https://picsum.photos/300/300?random=5',
    sales: 3890,
    rating: 4.6,
    categoryId: 2
  },
  {
    id: 6,
    name: '坚果零食大礼包',
    price: 89,
    originalPrice: 129,
    image: 'https://picsum.photos/300/300?random=6',
    sales: 15680,
    rating: 4.9,
    categoryId: 5
  },
  {
    id: 7,
    name: '保湿护肤套装',
    price: 258,
    originalPrice: 358,
    image: 'https://picsum.photos/300/300?random=7',
    sales: 7230,
    rating: 4.7,
    categoryId: 6
  },
  {
    id: 8,
    name: '简约台灯护眼',
    price: 168,
    originalPrice: 198,
    image: 'https://picsum.photos/300/300?random=8',
    sales: 2980,
    rating: 4.5,
    categoryId: 4
  },
  {
    id: 9,
    name: '机械键盘RGB',
    price: 459,
    originalPrice: 559,
    image: 'https://picsum.photos/300/300?random=9',
    sales: 3450,
    rating: 4.8,
    categoryId: 2
  },
  {
    id: 10,
    name: '儿童绘本套装',
    price: 68,
    originalPrice: 98,
    image: 'https://picsum.photos/300/300?random=10',
    sales: 8760,
    rating: 4.9,
    categoryId: 7
  },
  {
    id: 11,
    name: '户外帐篷双人',
    price: 399,
    originalPrice: 499,
    image: 'https://picsum.photos/300/300?random=11',
    sales: 2150,
    rating: 4.6,
    categoryId: 8
  },
  {
    id: 12,
    name: '纯棉四件套',
    price: 288,
    originalPrice: 388,
    image: 'https://picsum.photos/300/300?random=12',
    sales: 5430,
    rating: 4.7,
    categoryId: 4
  }
]

export function getProductsByCategory(categoryId: number): Product[] {
  if (categoryId === 1) {
    return products.slice(0, 8)
  }
  return products.filter(p => p.categoryId === categoryId)
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id)
}
