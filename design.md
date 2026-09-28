# Design Document — Customize Clicker

> Product Detail E-Commerce Web App · Next.js App Router · Mobile-First · Stateless

---

## 1. Architecture Overview

`
┌─────────────────────────────────────────────────────────────────┐
│                          Vercel Edge / Node.js                  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Next.js App Router                      │   │
│  │                                                          │   │
│  │  ┌─────────────────┐     ┌──────────────────────────┐   │   │
│  │  │   Server         │     │   Client Components       │   │   │
│  │  │   Components     │     │   (Interactive UI)        │   │   │
│  │  │   (Static HTML)  │     │   – Gallery               │   │   │
│  │  │   – Layout       │     │   – Lightbox              │   │   │
│  │  │   – ProductData  │     │   – PriceCalculator       │   │   │
│  │  │   – Metadata     │     │   – ColorPicker           │   │   │
│  │  └────────┬─────────┘     │   – OrderModal (3-step)   │   │   │
│  │           │               └──────────┬───────────────┘   │   │
│  │           │                          │                    │   │
│  │  ┌────────▼──────────────────────────▼──────────────┐   │   │
│  │  │              API Routes (Route Handlers)           │   │   │
│  │  │                                                   │   │   │
│  │  │  POST /api/calculate-price   (pricing engine)     │   │   │
│  │  │  POST /api/orders/create     (create order)       │   │   │
│  │  │  GET  /api/orders/status     (SSE / poll)         │   │   │
│  │  │  POST /api/sepay/webhook     (IPN receiver)       │   │   │
│  │  │  POST /api/zalo/notify       (Zalo dispatch)      │   │   │
│  │  └───────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  In-Memory Order Store  (Map<orderId, OrderRecord>)             │
│  Note: Resets on cold-start — suitable for demo/MVP.           │
└─────────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
   SePay IPN Webhook              Zalo Bot API
   (payment events)               (notifications)
`

### Key Design Decisions

| Decision | Rationale |
|---|---|
| No database | MVP / stateless Vercel deployment; orders live in module-level Map |
| Server Actions for pricing | Prevents client-side price tampering; price recomputed on submit |
| SSE for payment polling | Lower overhead than WebSockets on Edge; no extra infra |
| App Router | Enables Server Components, Streaming, and nested layouts out of the box |
| Tailwind CSS only | No extra UI library keeps bundle lean and design fully custom |

---

## 2. UI Layout — Mobile-First

### 2.1 Responsive Breakpoints

| Breakpoint | Columns | Notes |
|---|---|---|
| < 640px (default) | 1 column | Product section stacked vertically |
| 640px – 1023px (sm/md) | 1 column | Same stacked layout, slightly wider gutters |
| >= 1024px (lg) | 2 columns | Media left, Options right, max-width 1100px |

### 2.2 Page Structure (Mobile)

`
┌──────────────────────────────────┐
│          HEADER (sticky)         │  48px tall — logo + store name
├──────────────────────────────────┤
│         MAIN IMAGE               │  aspect-square, object-cover
│         (tap → Lightbox)         │  rounded-none on mobile
├──────────────────────────────────┤
│  ◀ thumbnail  thumbnail ▶        │  Horizontal scroll row, 64px squares
├──────────────────────────────────┤
│  Product Name (h1, 1.375rem)     │  font-semibold, text-gray-900
│  Price display (dynamic)         │  text-2xl, text-red-600 (WooCommerce red)
│  ─────────── separator ──────── │
│  Custom Text Label               │
│  [ input field                 ] │  full-width, bordered
│  Character count / price hint    │  text-xs, text-gray-500
│  ─────────── separator ──────── │
│  Color Mode Segmented Toggle     │  pill-style, 2 options
│  [ Color Picker(s)             ] │  5 presets + 1 custom hex input
│  ─────────── separator ──────── │
│  [ Tiến hành đặt hàng  CTA    ] │  full-width, bg-red-600, py-3, text-white
├──────────────────────────────────┤
│  Product Description (prose)     │  collapsible accordion on mobile
├──────────────────────────────────┤
│          FOOTER                  │  minimal — copyright
└──────────────────────────────────┘
`

### 2.3 Lightbox (full-screen, mobile-friendly)

- Fixed overlay inset-0, g-black/90
- Centered image with max-h-[90vh], object-contain
- Close button: top-right, 44×44px tap target
- Swipe gesture support via 	ouchstart / 	ouchend delta calculation

---

## 3. Dynamic Pricing Engine

### 3.1 Pricing Formula (Server-Side, lib/pricing.ts)

```typescript
BASE_PRICE = 0  // VND

// Pricing Configuration
const PRICING_CONFIG = {
  char1Price: 20000,               // Fixed total price for exactly 1 character
  basePerCharPrice: 15000,         // Base price per character starting at 2 characters
  discountStepPerChar: 1000,       // Price drop per character for each additional character beyond 2
};

function calculateTotal(charCount: number): number {
  if (charCount <= 0) return BASE_PRICE;
  const count = Math.min(charCount, 8);
  
  if (count === 1) return BASE_PRICE + PRICING_CONFIG.char1Price;
  
  const pricePerChar = PRICING_CONFIG.basePerCharPrice - (count - 2) * PRICING_CONFIG.discountStepPerChar;
  return BASE_PRICE + (pricePerChar * count);
}
```

### 3.2 Anti-Tampering: Order Validation

On POST /api/orders/create:
1. Server receives { text, colorMode, colors[], customerInfo }.
2. Server **independently recalculates** price using calculateTotal(text.length).
3. If client-submitted price differs from server-computed price → reject with 400 PRICE_MISMATCH.

---

## 4. Order State Machine

`
PENDING_PAYMENT ──► PAID ──► (terminal)
       │                │
       │                └──► Triggers:
       │                      • Zalo customer notification
       │                      • Zalo store owner notification
       │
       └──► (timeout / COD) ──► AWAITING_COD ──► (terminal)
`

---

## 5. Webhook & Communication Workflows

### 5.1 SePay IPN Webhook

`
SePay Server ──POST──► /api/sepay/webhook
                        │
                        ├── Verify HMAC signature (X-SePay-Signature header)
                        │   using SEPAY_WEBHOOK_SECRET
                        │
                        ├── Extract { transaction_id, amount, description }
                        │   description must contain transferCode
                        │
                        ├── Match transferCode → OrderRecord in memory store
                        │
                        ├── Validate amount >= order.pricing.total
                        │
                        ├── Update order.status = 'paid'
                        │
                        ├── POST /api/zalo/notify (internal call)
                        │
                        └── Return 200 { received: true }
`

### 5.2 Payment Status Polling (SSE)

Browser ──GET──► /api/orders/status?orderId=XYZ
Server polls in-memory store every 2s, sends status updates.
On timeout, the user is allowed to click "Tôi đã chuyển khoản xong (Xác nhận)".

---

## 6. Mobile-First UX Strategies

| Strategy | Implementation |
|---|---|
| Touch targets ≥ 44px | All interactive elements have min-h-[44px] |
| Keyboard-aware modal | Padding adjusts when virtual keyboard opens (isualViewport API) |
| Safe areas | pb-safe / env(safe-area-inset-bottom) for notched devices |