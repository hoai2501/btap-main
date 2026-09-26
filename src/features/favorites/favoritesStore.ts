import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Product } from '../products/api'

/**
 * Zustand store riêng cho tính năng "Sản phẩm yêu thích".
 *
 * Khác với Redux Toolkit: không cần slice / action creator / Provider.
 * Component gọi thẳng `useFavoritesStore(selector)` là có state + action.
 * 
 */

export interface FavoritesState {
  items: Product[]
  toggleFavorite: (product: Product) => void
  removeFavorite: (id: number) => void
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  // persist: tự lưu/khôi phục danh sách yêu thích qua localStorage
  persist(
    (set) => ({
      items: [],

      toggleFavorite: (product) =>
        set((state) => {
          const isFavorited = state.items.some((i) => i.id === product.id)
          return {
            items: isFavorited
              ? state.items.filter((i) => i.id !== product.id)
              : [...state.items, product],
          }
        }),

      removeFavorite: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearFavorites: () => set({ items: [] }),
    }),
    {
      name: 'ltwnc-favorites',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Selector dùng chung — tránh lặp logic rải rác ở component
export const selectFavoriteCount = (state: FavoritesState) => state.items.length

/** Hook tiện dụng: sản phẩm này đã nằm trong danh sách yêu thích chưa? */
export const useIsFavorite = (id: number) =>
  useFavoritesStore((state) => state.items.some((i) => i.id === id))
