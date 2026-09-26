import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Bắt buộc dùng 2 hook này trong toàn bộ app để có kiểu đầy đủ
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector
