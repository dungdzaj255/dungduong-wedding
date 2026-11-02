# Thiệp Cưới Online - Đoàn Dũng & Thùy Dương

Bản clone hoàn chỉnh toàn bộ website thiệp cưới: [https://zenlove.me/s/dung-duong](https://zenlove.me/s/dung-duong).

---

## 📸 Giao diện hoàn chỉnh đã nhân bản

Toàn bộ 74 phần tử của canvas (kích thước gốc 500px × 7017px) được tái lập chuẩn xác theo dữ liệu cấu trúc trích xuất từ source bundle:

1. **Cover & Hero**:
   - Khung phong bì nhung đỏ Burgundy cổ điển, sáp niêm phong vàng đồng.
   - Ảnh chân dung cưới của cặp đôi Đoàn Dũng & Thùy Dương.
   - Huy hiệu hoa văn thư pháp tên cô dâu & chú rể.
   - Đồng hồ đếm ngược trực tiếp (**Countdown Timer**) theo thời gian thực đến ngày cưới `29.11.2026 - 17:30`.
2. **Giới thiệu Cô dâu & Chú rể**:
   - Chân dung chú rể **Đoàn Dũng** & cô dâu **Thùy Dương**.
   - Bó hoa cưới điểm xuyết ở giữa cùng câu chuyện tình yêu *"Từ Tri Kỷ Niên Thiếu Đến Trọn Kiếp Đồng Tâm"*.
3. **Thư Mời & Thẻ Sự Kiện (Invitation & Event Cards)**:
   - Thông tin gia đình hai bên:
     - **Nhà Trai**: Ông Phùng Đoàn Du & Bà Nhân Thị Thủy (TP. Hà Nội).
     - **Nhà Gái**: Ông Lê Hải Mạnh & Bà Nguyễn Minh Hiếu (TP. Hà Nội).
   - Hai thẻ tiệc Burgundy:
     - **Bữa tiệc chung vui**: `17:00 - Chủ Nhật, 29.11.2026` (21/10 Bính Ngọ) tại TT Văn hóa xã Ngũ Hiệp.
     - **Lễ thành hôn**: `17:30 - Chủ Nhật, 29.11.2026` (21/10 Bính Ngọ) tại TT Văn hóa xã Ngũ Hiệp.
     - Nút **Xem chỉ đường** dạng pill viền trắng có hiệu ứng pulse nhấp nháy, liên kết Google Maps chính xác.
4. **OUR LOVE & Lịch Tháng 11.2026**:
   - 3 bức ảnh khoảnh khắc tình yêu kèm lời tâm sự lãng mạn.
   - Thẻ lịch **November 2026** thiết kế riêng, làm nổi bật ngày `29` với vòng tròn ánh sáng và hoa văn cưới.
5. **Album of Love (Bộ sưu tập ảnh cưới)**:
   - 6 bức ảnh cưới nghệ thuật bố cục 2 cột.
   - Tích hợp **Lightbox Modal** khi click vào bất kỳ ảnh nào để xem toàn màn hình (Next / Prev / Close).
6. **Xác nhận tham dự (RSVP Form)**:
   - Form tương tác đầy đủ: Họ tên, Khách nhà trai/gái, Xác nhận tham dự (Có/Bận), Đếm số lượng người tham gia (`-` / `+`), Lời chúc gửi tới cặp đôi.
   - Hiệu ứng gửi thành công sinh động.
7. **Thank You & Chân trang**:
   - Bức ảnh kỷ niệm tráng lệ kèm chữ ký nghệ thuật *Thank you* phong cách thư pháp.
8. **Nhạc nền & Điều khiển**:
   - Nhạc cưới lãng mạn: bài hát **Beautiful Girl** (`/music.mp3`).
   - Nút xoay đĩa than nổi bật góc màn hình để bật/tắt nhạc.
   - Nút cuộn nhanh lên đầu trang & Nút chia sẻ liên kết thiệp cưới.
   - Bộ chọn chế độ xem nhanh: **Mobile 390px** / **Responsive** / **Gốc 500px**.

---

## 🎨 Tài nguyên Offline & Phông chữ

- **Tất cả 22 hình ảnh** (ảnh chân dung, ảnh cưới, hoa lá, phong bì, tem niêm phong) đã được tải về cục bộ tại thư mục `public/images/`.
- **Phông chữ tích hợp sẵn** trong `public/fonts/`:
  - `BucThu` / `signature.woff2`: Phông chữ ký thư pháp nghệ thuật tiếng Việt.
  - `Lora` & `Lora Regular`: Phông serif sang trọng dành cho nội dung thiệp mời.
  - `High Spirited`: Phông tiêu đề nghệ thuật lãng mạn.
  - `Arcittya Begatri` & `Brygada`: Phông phụ trợ.

---

## 🚀 Hướng dẫn khởi chạy & kiểm thử

### 1. Cài đặt các gói phụ thuộc (nếu cần)
```bash
npm install
```

### 2. Chạy môi trường Dev Server
```bash
npm run dev
```

### 3. Build & Xem trước bản Production
```bash
npm run build
npm run preview
```
Mở trình duyệt tại địa chỉ được Vite cung cấp (mặc định `http://localhost:5173` hoặc `http://localhost:4173`).
