import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addToCart } from '../cart/cartSlice'
import { useEffect } from 'react'
import { getProducts } from './productsSlice'
import type { Product } from './api'
import FavoriteButton from '../favorites/FavoriteButton'

const formatVnd = (n: number) => n.toLocaleString('vi-VN') + '₫'

function ProductCard({ p }: { p: Product }) {
  const dispatch = useAppDispatch()
  return (
    <article className="card">
      <div className="thumb-wrap">
        <img className="thumb" src={p.image} alt={p.name} loading="lazy" />
        <FavoriteButton product={p} />
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <div className="card-footer">
          <p className="price">{formatVnd(p.price)}</p>
          <button className="add-button" onClick={() => dispatch(addToCart(p))}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ProductList() {
  const { items, status, error } = useAppSelector((s) => s.products)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (status === 'idle') dispatch(getProducts())
  }, [status, dispatch])

  if (status === 'loading') return <p className="status">Đang tải sản phẩm…</p>
  if (status === 'failed') return <p className="status error">Lỗi: {error}</p>

  return (
    <section className="collection-section" id="collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Bộ sưu tập tuần này</p>
          <h2 id="collection-title">Chọn ít. Chọn đúng.</h2>
        </div>
        <p className="section-intro">
          Sáu món đồ cho những ngày muốn mặc đẹp, đi xa và sống chậm hơn một nhịp.
        </p>
      </div>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  )
}
