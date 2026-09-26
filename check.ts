// Self-check logic cartSlice — chạy: node check.ts
import assert from 'node:assert/strict'
import cartReducer from './src/features/cart/cartSlice.ts'
import { addToCart, removeFromCart, updateQuantity } from './src/features/cart/cartSlice.ts'

const p = { id: 1, name: 'Áo thun', price: 250000, image: 'test-image' }

let s = cartReducer(undefined, { type: '@@INIT' })
assert.deepEqual(s.items, [])

s = cartReducer(s, addToCart(p))                    // thêm mới
assert.equal(s.items.length, 1)
assert.equal(s.items[0].qty, 1)

s = cartReducer(s, addToCart(p))                    // thêm trùng → tăng qty
assert.equal(s.items.length, 1)
assert.equal(s.items[0].qty, 2)

s = cartReducer(s, updateQuantity({ id: 1, qty: 5 })) // cập nhật số lượng
assert.equal(s.items[0].qty, 5)

s = cartReducer(s, updateQuantity({ id: 1, qty: 0 }))  // qty 0 → xoá
assert.equal(s.items.length, 0)

s = cartReducer(s, addToCart(p))
s = cartReducer(s, removeFromCart(1))                // xoá trực tiếp
assert.equal(s.items.length, 0)

s = cartReducer(s, updateQuantity({ id: 99, qty: 3 })) // id không tồn tại → noop
assert.equal(s.items.length, 0)

console.log('✓ cartSlice: 8/8 assert pass')
