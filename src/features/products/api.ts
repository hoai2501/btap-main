export interface Product {
  id: number
  name: string
  price: number
  image: string
}

// API giả lập: delay 800ms như gọi network thật
// Ảnh thật từ CDN dummyjson
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Áo sơ mi kẻ nam',
    price: 350000,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp',
  },
  {
    id: 2,
    name: 'Áo thun Gigabyte Aorus',
    price: 250000,
    image: 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp',
  },
  {
    id: 3,
    name: 'Giày sneaker',
    price: 890000,
    image: 'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp',
  },
  {
    id: 4,
    name: 'Đồng hồ Rolex Datejust',
    price: 1250000,
    image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp',
  },
  {
    id: 5,
    name: 'Balo faux leather',
    price: 650000,
    image: "https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp",
  },
  {
    id: 6,
    name: 'Kính râm cổ điển',
    price: 450000,
    image: 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp',
  },
]

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(PRODUCTS), 800),
  )
}
