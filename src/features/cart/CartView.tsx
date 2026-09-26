import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromCart, updateQuantity } from './cartSlice'

const formatVnd = (n: number) => n.toLocaleString('vi-VN') + '₫'

export default function CartView() {
  const items = useAppSelector((s) => s.cart.items)
  const dispatch = useAppDispatch()

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <section className="utility-panel cart-panel" id="cart" aria-labelledby="cart-title">
      <div className="panel-head">
        <div>
          <p className="eyebrow">03 / Phần chuẩn bị</p>
          <h2 id="cart-title">Sẵn sàng đi cùng bạn.</h2>
        </div>
        <span className="panel-count">{itemCount} món</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">Giỏ hàng đang trống.</p>
          <p>Thêm một món từ bộ sưu tập, rồi quay lại đây khi bạn đã sẵn sàng.</p>
          <a className="text-link" href="#collection">Quay lại chọn đồ</a>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((i) => (
              <li key={i.id}>
                <img className="thumb-sm" src={i.image} alt={i.name} loading="lazy" />
                <div className="cart-info">
                  <span className="item-label">NÉT / {String(i.id).padStart(2, '0')}</span>
                  <span className="name">{i.name}</span>
                  <span className="price">{formatVnd(i.price * i.qty)}</span>
                </div>
                <label className="quantity-field">
                  <span>Số lượng</span>
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    aria-label={`Số lượng ${i.name}`}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: i.id,
                          qty: Number(e.target.value) || 0,
                        }),
                      )
                    }
                  />
                </label>
                <button
                  className="text-button"
                  aria-label={`Xóa ${i.name} khỏi giỏ hàng`}
                  onClick={() => dispatch(removeFromCart(i.id))}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
          <div className="panel-total cart-total">
            <span>Tổng tạm tính</span>
            <strong>{formatVnd(total)}</strong>
          </div>
        </>
      )}
    </section>
  )
}
