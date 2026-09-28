# 🎹 Customize Clicker

> Landing page bán hàng + hệ thống đặt hàng cho **Móc Khóa Clicker Bàn Phím Cơ Custom Theo Tên** — tích hợp thanh toán QR SePay và thông báo Telegram.

---

## ✨ Tính Năng

- 🖼️ **Product Gallery** — lightbox xem ảnh sản phẩm
- 🎨 **Tùy chỉnh sản phẩm** — nhập tên (tối đa 8 ký tự), chọn màu đơn hoặc phối màu
- 💰 **Tính giá real-time** — server-side pricing, client không thể giả mạo giá
- 🛒 **Checkout 3 bước** — thông tin giao hàng → thanh toán → xác nhận
- 💳 **2 phương thức thanh toán**:
  - **QR SePay** — tạo QR động, tự động xác nhận qua webhook
  - **COD** — giới hạn 5 đơn/SĐT chống lạm dụng
- 📬 **Telegram notifications** — thông báo đơn hàng mới đến admin
- 🔒 **Rate limiting** — bảo vệ tất cả API endpoints
- ✅ **Zod validation** — validate input nghiêm ngặt phía server

---

## 🛠️ Tech Stack

| Layer | Công nghệ | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^16.3.6 |
| Language | TypeScript (strict) | ^5 |
| UI | React | ^19 |
| Styling | Tailwind CSS | v4 (CSS-first) |
| Icons | Heroicons | v2 |
| Forms | React Hook Form + Zod | ^7 / ^4 |
| ORM | Prisma | ^5.22 |
| Database | PostgreSQL | — |
| Payments | SePay + VietQR | — |
| Notifications | Telegram Bot API | — |
| Deploy | Vercel | Serverless |

---

## 📁 Cấu Trúc Thư Mục

```
customize-clicker/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # Landing page chính
│   ├── globals.css
│   └── api/
│       ├── calculate-price/route.ts    # Tính giá server-side
│       ├── orders/
│       │   ├── create/route.ts         # Tạo đơn hàng
│       │   └── status/route.ts         # Kiểm tra trạng thái đơn
│       ├── sepay/
│       │   └── webhook/route.ts        # Nhận xác nhận thanh toán từ SePay
│       └── telegram/
│           └── test/route.ts           # Test gửi Telegram (dev only)
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── product/
│   │   ├── ProductGallery.tsx          # Ảnh + lightbox
│   │   ├── ProductOptions.tsx          # Tùy chọn sản phẩm + nút đặt hàng
│   │   ├── ColorPickerGroup.tsx
│   │   ├── CustomTextInput.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── ProductDescription.tsx
│   │   └── Lightbox.tsx
│   ├── checkout/
│   │   ├── OrderModal.tsx              # Modal checkout 3 bước
│   │   ├── Step1_CustomerForm.tsx      # Thông tin giao hàng
│   │   ├── Step2_Payment.tsx           # Chọn + hoàn tất thanh toán
│   │   └── Step3_Success.tsx           # Xác nhận đặt hàng thành công
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Label.tsx
│       ├── SegmentedControl.tsx
│       └── Skeleton.tsx
├── lib/
│   ├── pricing.ts                      # Logic tính giá
│   ├── orders.ts                       # CRUD đơn hàng + COD limit
│   ├── sepay.ts                        # SePay API + webhook auth
│   ├── telegram.ts                     # Gửi thông báo Telegram
│   ├── prisma.ts                       # Prisma client singleton
│   ├── rate-limit.ts                   # In-memory rate limiter
│   ├── input-security.ts               # Zod validators tái sử dụng
│   ├── input-sanitization.ts           # Strip HTML/JS injection
│   └── types.ts                        # Shared TypeScript types
├── prisma/
│   └── schema.prisma
├── proxy.ts                            # Next.js 16 proxy (rate limiting middleware)
├── .env.example
├── next.config.ts
└── package.json
```

---

## ⚙️ Cài Đặt & Chạy Local

### Yêu cầu

- Node.js ≥ 20
- PostgreSQL đang chạy local (hoặc connection string remote)

### 1. Clone & cài dependencies

```bash
git clone <repo-url>
cd customize-clicker
npm install
```

### 2. Cấu hình biến môi trường

```bash
cp .env.example .env
```

Điền đầy đủ các giá trị trong `.env` (xem bảng bên dưới).

### 3. Khởi tạo database

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

---

## 🔑 Biến Môi Trường

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `SEPAY_API_TOKEN` | ✅ | API token lấy từ SePay dashboard |
| `SEPAY_WEBHOOK_API_KEY` | ✅ | Key xác thực webhook từ SePay |
| `SEPAY_BANK_ACCOUNT` | ✅ | Số tài khoản ngân hàng |
| `SEPAY_BANK_NAME` | ✅ | Tên ngắn ngân hàng (vd: `ACB`) |
| `SEPAY_ACCOUNT_NAME` | ✅ | Tên chủ tài khoản (in hoa) |
| `TELEGRAM_BOT_TOKEN` | ✅ | Token Telegram bot (từ @BotFather) |
| `TELEGRAM_CHAT_ID` | ✅ | Chat ID nhận thông báo đơn hàng |
| `TELEGRAM_TEST_API_KEY` | ⚠️ Dev | Key test endpoint Telegram (bị vô hiệu hóa trên production) |
| `NODE_ENV` | ✅ | `development` hoặc `production` |

---

## 🔌 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `POST` | `/api/calculate-price` | Tính giá theo custom text | — |
| `POST` | `/api/orders/create` | Tạo đơn hàng mới | — |
| `GET` | `/api/orders/status?orderId=` | Lấy trạng thái thanh toán | — |
| `POST` | `/api/sepay/webhook` | Nhận xác nhận CK từ SePay | `Apikey` header |
| `POST` | `/api/telegram/test` | Test gửi tin Telegram | `x-api-key` header |

> ⚠️ `/api/telegram/test` trả về **404** khi `NODE_ENV=production`.

### Rate Limits (per IP, per minute)

| Endpoint | Limit |
|---|---|
| `/api/calculate-price` | 30 req/phút |
| `/api/orders/create` | 10 req/phút |
| `/api/orders/status` | 60 req/phút |
| `/api/sepay/webhook` | 60 req/phút |
| `/api/telegram/test` | 5 req/phút |
| Mọi route khác | 60 req/phút |

---

## 💰 Logic Tính Giá

Giá được tính **server-side** và verify lại khi tạo đơn. Client không thể tự khai giá.

| Số ký tự | Giá |
|---|---|
| 0 | 0đ (không custom) |
| 1 | Base + 20.000đ |
| 2 | Base + 30.000đ (15k × 2) |
| 3 | Base + 42.000đ (14k × 3) |
| … | Giảm dần 1k/ký tự |
| 8 | Base + 72.000đ (9k × 8) |

> Base price = **5.000đ**. Tối đa **8 ký tự**.

---

## 🚀 Deploy lên Vercel

1. Push code lên GitHub
2. Import repo vào [vercel.com](https://vercel.com)
3. Thêm tất cả biến môi trường trong **Settings → Environment Variables**
4. Deploy — Vercel tự detect Next.js

### Sau khi deploy

- Cấu hình **SePay webhook URL**: `https://your-domain.vercel.app/api/sepay/webhook`
- Header xác thực: `Authorization: Apikey <SEPAY_WEBHOOK_API_KEY>`

---

## 🔒 Bảo Mật

- **Input validation**: Zod schema trên mọi API endpoint
- **SQL injection**: Prisma ORM với parameterized queries
- **XSS**: Strip `<`, `>`, `javascript:` khỏi mọi text input
- **Webhook auth**: Fail-closed — từ chối nếu `SEPAY_WEBHOOK_API_KEY` chưa cấu hình
- **COD abuse**: Giới hạn 5 đơn COD/SĐT (Serializable transaction)
- **Price tampering**: Server luôn tính lại và so sánh với `clientTotal`
- **Rate limiting**: `proxy.ts` áp dụng cho toàn bộ `/api/*`

---

## 📜 Scripts

```bash
npm run dev      # Dev server với Turbopack
npm run build    # Production build
npm run start    # Chạy production server
npm run lint     # ESLint
npx prisma studio          # GUI quản lý database
npx prisma migrate dev     # Tạo migration mới
npx prisma migrate deploy  # Apply migration lên production
```
