# Nhận xét — Zustand store riêng vs Redux Toolkit

Zustand phù hợp với tính năng yêu thích vì cài đặt nhanh, ít boilerplate và không cần `Provider` hay slice riêng.
Selector giúp mỗi component chỉ theo dõi phần state cần thiết, còn middleware `persist` lưu danh sách vào `localStorage` rất gọn.
Đổi lại, khi ứng dụng lớn, nhiều store có thể làm logic phân tán và quy ước giữa các module kém chặt chẽ hơn.
Redux Toolkit có cấu trúc chuẩn hóa, DevTools mạnh, reducer dễ kiểm thử và hỗ trợ tốt cho luồng async phức tạp như RTK Query.
Nhược điểm của Redux Toolkit là nhiều khái niệm và mã khởi tạo hơn, dù `createSlice` đã giảm đáng kể boilerplate.
Với bài toán nhỏ này Zustand là lựa chọn nhẹ và trực tiếp; dự án lớn, nhiều team sẽ hưởng lợi hơn từ Redux Toolkit.
