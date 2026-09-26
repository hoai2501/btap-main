import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../products/api'

export interface CartItem extends Product {
  qty: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const found = state.items.find((i) => i.id === action.payload.id)
      if (found) found.qty += 1
      else state.items.push({ ...action.payload, qty: 1 })
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    updateQuantity(state, action: PayloadAction<{ id: number; qty: number }>) {
      const { id, qty } = action.payload
      if (qty <= 0) {
        state.items = state.items.filter((i) => i.id !== id)
        return
      }
      const found = state.items.find((i) => i.id === id)
      if (found) found.qty = qty
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
