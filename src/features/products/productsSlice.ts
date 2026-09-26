import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { fetchProducts, type Product } from './api'

// ponytail: dùng createAsyncThunk theo yêu cầu đề bài; cần cache/invalidate
// thì nâng cấp lên RTK Query (createApi + endpoints)
export const getProducts = createAsyncThunk(
  'products/fetchAll',
  fetchProducts,
)

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Không tải được sản phẩm'
      })
  },
})

export default productsSlice.reducer
