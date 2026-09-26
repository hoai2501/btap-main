import { useFavoritesStore } from './favoritesStore'

const formatVnd = (n: number) => n.toLocaleString('vi-VN') + '₫'

export default function FavoritesView() {
  const items = useFavoritesStore((s) => s.items)
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite)
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites)

  const total = items.reduce((sum, i) => sum + i.price, 0)

  return (
    <section className="utility-panel favorites-panel" id="favorites" aria-labelledby="favorites-title">
      <div className="panel-head">
        <div>
          <p className="eyebrow">02 / Sổ tay lựa chọn</p>
          <h2 id="favorites-title">Đã lưu lại.</h2>
        </div>
        <span className="panel-count">{items.length} món</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">Kệ đang còn trống.</p>
          <p>Những sản phẩm bạn lưu sẽ xuất hiện ở đây để dễ quay lại.</p>
          <a className="text-link" href="#collection">Khám phá bộ sưu tập</a>
        </div>
      ) : (
        <>
          <ul className="saved-list">
            {items.map((i) => (
              <li key={i.id}>
                <img className="thumb-sm" src={i.image} alt={i.name} loading="lazy" />
                <div className="saved-info">
                  <span className="item-label">NÉT / {String(i.id).padStart(2, '0')}</span>
                  <span className="name">{i.name}</span>
                  <span className="price">{formatVnd(i.price)}</span>
                </div>
                <button
                  className="text-button"
                  aria-label={`Bỏ ${i.name} khỏi yêu thích`}
                  onClick={() => removeFavorite(i.id)}
                >
                  Bỏ lưu
                </button>
              </li>
            ))}
          </ul>
          <div className="panel-total">
            <span>Tổng giá trị</span>
            <strong>{formatVnd(total)}</strong>
            <button className="text-button" onClick={clearFavorites}>
              Xóa tất cả
            </button>
          </div>
        </>
      )}
    </section>
  )
}
