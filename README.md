# LMS mô phỏng – bản cập nhật

Bản website độc lập phục vụ học tập, không phải LMS chính thức của VNU.

## Tính năng
- Nội dung tự biên soạn cho bài 1–7B; mỗi mục **Bài giảng** có **10 trang** chuyển bằng nút trên/dưới hoặc thanh công cụ.
- Trang Giảng viên: Phạm Đức Mạnh (theo thiết lập của người dùng, chỉ áp dụng bản mô phỏng).
- Trang Thành viên: sáu người và mã sinh viên theo danh sách được cung cấp; có thể chỉnh sửa cục bộ.
- Lịch 7 ngày gồm học trên lớp, online, ngủ, hẹn hò, chơi game. Chỉnh sửa và lưu cục bộ.
- Bookworm: liên kết Facebook do người dùng cung cấp.
- Nhận xét: hai câu bình chọn vui; không phản ánh quan hệ thật; dữ liệu lưu cục bộ.

## Cách chạy
Giải nén toàn bộ ZIP, mở `index.html` trong trình duyệt. Đưa tất cả các file trong cùng một thư mục lên nhánh chính GitHub Pages.

Không nhập mật khẩu của hệ thống chính thức vào trang mô phỏng. Không đồng bộ dữ liệu LMS.


## Cập nhật giao diện thu gọn
Đã bỏ phần banner cảnh báo màu vàng và khối đầu trang lớn. Nhãn “BẢN MÔ PHỎNG” chuyển sang thanh xanh để tránh gây nhầm với trang LMS chính thức. Khung đọc bài giảng được tăng chiều cao.


## Cập nhật giao diện
- Mục Thành viên cố định sáu tên và mã sinh viên trong `lesson-ui.js`, không có ô nhập hay nút lưu; không sử dụng dữ liệu danh sách đã lưu từ phiên bản cũ.
- Mục Thông báo có lời nhắn gửi tình cảm đến sáu thành viên.
- Mục Tiến trình học tập có đoạn chia sẻ tự biên soạn, không mô phỏng số liệu tiến độ thật.
- Đây là website tĩnh: không có giao diện chỉnh sửa cho khách truy cập, nhưng người có quyền sửa repository GitHub vẫn có thể sửa mã nguồn.
