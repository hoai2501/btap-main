import type { Product } from '../products/api'
import { useFavoritesStore, useIsFavorite } from './favoritesStore'

export default function FavoriteButton({ product }: { product: Product }) {
  // Chỉ subscribe đúng phần state cần dùng → tránh re-render thừa
  const isFavorite = useIsFavorite(product.id)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)

  return (
    <button
      type="button"
      className={`save-button${isFavorite ? ' active' : ''}`}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Bỏ ${product.name} khỏi yêu thích`
          : `Thêm ${product.name} vào yêu thích`
      }
      title={isFavorite ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
      onClick={() => toggleFavorite(product)}
    >
      {isFavorite ? 'Đã lưu' : 'Lưu lại'}
    </button>
  )
}
