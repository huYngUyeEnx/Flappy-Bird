# 🎮 React Game Portal (Micro-Games Collection)

Đây là một nền tảng tổng hợp các mini-game (hiện tại có Flappy Bird và sẽ được mở rộng trong tương lai). Dự án được xây dựng với **React (TypeScript), Vite, Tailwind CSS, và Framer Motion**, hướng tới trải nghiệm mượt mà, tối giản (anti-slop/premium UI design) và dễ dàng scale thêm các trò chơi mới.

## 🚀 Tính năng nổi bật
- **Kiến trúc đa game (Multi-game Architecture):** Mỗi trò chơi được cô lập hoàn toàn về state, hooks, và components.
- **Thiết kế UI cao cấp:** Trang chủ (Portal) sử dụng lưới Bento bất đối xứng, dark theme với phong cách Tech/Premium, tương tác mượt mà nhờ Framer Motion.
- **Quản lý dữ liệu tập trung:** Dễ dàng thêm game mới chỉ bằng cách khai báo vào file data duy nhất.
- **Routing:** Quản lý điều hướng linh hoạt giữa các trò chơi bằng `react-router-dom`.

---

## 🤖 Hướng dẫn dành cho AI (AI Instructions & Architecture)

Nếu bạn là một AI Agent đang đọc file này để hỗ trợ phát triển hoặc thêm tính năng mới, hãy chú ý các nguyên tắc cấu trúc dưới đây để duy trì tính nhất quán của dự án.

### 1. Cấu trúc thư mục cốt lõi
```text
src/
├── data/
│   └── games.ts            # Nơi khai báo mảng dữ liệu (Game interface) chứa danh sách các trò chơi hiện có.
├── games/                  # Nơi chứa toàn bộ logic và UI của TỪNG game.
│   ├── FlappyBird/         # (Ví dụ) Thư mục gốc của 1 game cụ thể.
│   │   ├── components/     # Các UI Component chỉ phục vụ riêng cho game này.
│   │   ├── hooks/          # Các custom hooks chứa logic game (ví dụ: useBird, usePipes, useGameLoop).
│   │   ├── constants.ts    # File lưu các hằng số vật lý, tốc độ, khung hình của game.
│   │   └── FlappyBird.tsx  # Component chính (Entry point) của game.
│   └── [GameName]/         # Nếu muốn thêm game mới, tạo một folder có cấu trúc tương tự ở đây.
├── pages/                  
│   └── Home.tsx            # Giao diện trang Portal/Menu chọn game.
├── App.tsx                 # Khai báo React Router, gán URL tĩnh (như /flappy-bird) cho các component game.
└── main.tsx                # Entry point của toàn bộ React app.
```

### 2. Nguyên tắc khi thêm một Game mới (Quy trình cho AI)
Để tích hợp một trò chơi mới vào hệ thống, bạn cần làm theo **chính xác 4 bước sau**:
1. **Khởi tạo thư mục game:** Tạo thư mục `src/games/[TênGame]/`. Đặt mọi logic (hook, component, constant, asset) của game đó vào trong thư mục này. Tuyệt đối không để rò rỉ logic riêng của game ra ngoài `src/components/` chung.
2. **Tạo Entry Point:** File xuất ra màn hình chính của game phải nằm ngay gốc thư mục game (vd: `src/games/Tetris/Tetris.tsx`).
3. **Cập nhật Dữ liệu:** Mở `src/data/games.ts` và thêm một Object mới vào mảng `games` (chú ý cung cấp đủ `id, name, path, description, category, colSpan, image`).
4. **Khai báo Route:** Mở `src/App.tsx`, import file Entry Point của game mới và thêm `<Route path="/[duong-dan]" element={<TenGame />} />` vào danh sách Routes.

### 3. Nguyên tắc Thiết kế (Design Taste & UI)
- Giữ vững thiết kế **Dark Monochrome** (`bg-[#0a0a0a]` hoặc `bg-zinc-950`).
- Không sử dụng gradient rực rỡ mang hơi hướng "AI-generated" (vd: tím neon, xanh chói).
- Các thẻ card sử dụng hiệu ứng hover kết hợp Framer Motion. Nếu bạn thiết kế thêm thành phần UI, hãy áp dụng viền mỏng (`border-zinc-800`), font chữ tương phản, và duy trì các icon từ `@phosphor-icons/react`.

---

## 🛠 Cài đặt và Khởi chạy (Local Development)

### Yêu cầu
- Node.js (phiên bản 18+ khuyến nghị)
- npm hoặc yarn

### Các bước cài đặt
1. **Clone repository và cài dependencies:**
   ```bash
   npm install
   ```

2. **Chạy server phát triển (Development):**
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt tại `http://localhost:5173`.

3. **Format và kiểm tra mã nguồn (Lint/Prettier):**
   ```bash
   npm run lint
   npm run prettier:fix
   ```

4. **Build production:**
   ```bash
   npm run build
   ```
