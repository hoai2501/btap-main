import { Provider } from 'react-redux'
import { store } from './app/store'
import { useAppSelector } from './app/hooks'
import ProductList from './features/products/ProductList'
import CartView from './features/cart/CartView'
import FavoritesView from './features/favorites/FavoritesView'
import {
  selectFavoriteCount,
  useFavoritesStore,
} from './features/favorites/favoritesStore'

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

function AppContent() {
  // Header đọc thẳng từ Zustand store (không cần Provider)
  const favoriteCount = useFavoritesStore(selectFavoriteCount)
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((count, item) => count + item.qty, 0),
  )

  return (
    <main className="app-shell">
        <header className="topbar">
          <a className="wordmark" href="#top" aria-label="Nét, về đầu trang">
            NÉT<span>SHOP</span>
          </a>
          <nav className="main-nav" aria-label="Điều hướng chính">
            <a href="#collection">Bộ sưu tập</a>
            <a href="#favorites">Đã lưu <span>{favoriteCount}</span></a>
            <a href="#cart">Giỏ hàng <span>{cartCount}</span></a>
          </nav>
          <p className="edition-label">BỘ SƯU TẬP 04</p>
        </header>

        <section className="hero" id="top" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">Bộ sưu tập chọn lọc</p>
            <h1 id="page-title">
              Những món đồ<br />
              bạn thật sự muốn <em>giữ lại.</em>
            </h1>
            <p className="hero-description">
              Chọn một món bạn thích, lưu lại để xem sau và mua khi đã sẵn sàng.
            </p>
            <a className="hero-link" href="#collection">Xem sản phẩm <span>06 món</span></a>
          </div>
        </section>

        <ProductList />
        <div className="utility-grid">
          <FavoritesView />
          <CartView />
        </div>

        <footer className="footer">
          <span>NÉT SHOP</span>
          <span>Danh sách yêu thích được lưu trên trình duyệt.</span>
        </footer>
    </main>
  )
}
//
