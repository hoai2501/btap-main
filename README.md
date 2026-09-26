# LTWNC — Tuần 4: Zustand

Bài tập tính năng **"Sản phẩm yêu thích"** (thêm/bỏ sản phẩm khỏi danh sách yêu thích),
cài đặt bằng **Zustand store riêng** (`favoritesStore`).

Dự án dựa trên bài tuần 3 (React + TypeScript + Vite + Redux Toolkit cho products/cart);
tuần 4 bổ sung store Zustand chạy song song, không cần Provider.

## Tính năng

- Bấm **Lưu lại** trên mỗi sản phẩm để **thêm**, bấm **Đã lưu** để **bỏ** khỏi yêu thích (`toggleFavorite`).
- Xem danh sách yêu thích, xoá từng sản phẩm (`removeFavorite`) hoặc xoá tất cả (`clearFavorites`).
- Tổng số lượng hiển thị trên header (đọc từ store, không qua Redux Provider).
- Danh sách được **persist** vào `localStorage` bằng middleware `persist`.

## Cấu trúc phần Zustand

```
src/features/favorites/
├── favoritesStore.ts   # create + persist: state items và các action
├── FavoriteButton.tsx   # nút Lưu lại/Đã lưu, subscribe đúng phần state cần dùng
└── FavoritesView.tsx    # danh sách + xoá + tính tổng
```

## Chạy

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
node check-favorites.ts   # self-check store (7/7 assert)
```

Xem so sánh với Redux Toolkit tại [`NHAN_XET.md`](./NHAN_XET.md).
