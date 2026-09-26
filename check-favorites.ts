// Self-check favoritesStore — chạy: node check-favorites.ts
import assert from 'node:assert/strict'

// Zustand persist dùng localStorage; Node không có sẵn nên stub in-memory
// trước khi import store (import động để stub kịp có hiệu lực).
const mem = new Map<string, string>()
globalThis.localStorage = {
  getItem: (k) => mem.get(k) ?? null,
  setItem: (k, v) => void mem.set(k, String(v)),
  removeItem: (k) => void mem.delete(k),
  clear: () => mem.clear(),
  key: (i) => [...mem.keys()][i] ?? null,
  get length() {
    return mem.size
  },
} as Storage

const { useFavoritesStore } = await import(
  './src/features/favorites/favoritesStore.ts'
)
const store = useFavoritesStore
const p = { id: 1, name: 'Áo thun', price: 250000, image: 'test-image' }
const q = { id: 2, name: 'Giày', price: 890000, image: 'test-image' }

// Trạng thái đầu
assert.deepEqual(store.getState().items, [])

// Thêm vào yêu thích
store.getState().toggleFavorite(p)
assert.equal(store.getState().items.length, 1)
assert.equal(store.getState().items[0].id, 1)

// Toggle lần 2 cùng sản phẩm → bỏ khỏi yêu thích
store.getState().toggleFavorite(p)
assert.equal(store.getState().items.length, 0)

// Thêm nhiều sản phẩm
store.getState().toggleFavorite(p)
store.getState().toggleFavorite(q)
assert.deepEqual(
  store.getState().items.map((i) => i.id),
  [1, 2],
)

// Xoá theo id
store.getState().removeFavorite(1)
assert.deepEqual(
  store.getState().items.map((i) => i.id),
  [2],
)

// Xoá id không tồn tại → noop
store.getState().removeFavorite(99)
assert.equal(store.getState().items.length, 1)

// Xoá tất cả
store.getState().clearFavorites()
assert.equal(store.getState().items.length, 0)

console.log('✓ favoritesStore: 7/7 assert pass')
