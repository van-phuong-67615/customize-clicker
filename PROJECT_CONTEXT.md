# Project Context — Customize Clicker

> Living reference document. Update when adding new packages or env vars.

---

## 1. Technology Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Framework | **Next.js** | 15 (App Router) |
| Language | **TypeScript** | 5.x — strict mode |
| UI Library | **React** | 19 |
| Styling | **Tailwind CSS** | v4 (CSS-first config) |
| Icons | **Heroicons** | v2 (@heroicons/react) |
| Form Validation | **Zod** | v3 |
| ORM | **Prisma** | Prisma Client & CLI |
| Deployment | **Vercel** | Serverless + Edge |

### No External State Libraries
All interactive state is local React state (useState, useReducer).

---

## 2. Project Directory Structure

`
customize-clicker/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/ ...
├── components/
│   ├── layout/ ...
│   ├── product/ ...
│   ├── checkout/ ...
│   └── ui/ ...
├── lib/
│   ├── pricing.ts
│   ├── orders.ts
│   ├── zalo.ts
│   ├── sepay.ts
│   ├── prisma.ts
│   └── types.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── images/
├── design.md
├── PROJECT_CONTEXT.md
├── .env.example
├── next.config.ts
├── tsconfig.json
└── package.json
`

---

## 3. Environment Variables

### .env.example (committed to git)

` ash
DATABASE_URL="postgresql://user:password@localhost:5432/customize_clicker"

SEPAY_API_TOKEN=your_sepay_api_token_here
SEPAY_WEBHOOK_API_KEY=your_sepay_webhook_api_key_here
SEPAY_BANK_ACCOUNT=1234567890
SEPAY_BANK_NAME=Vietcombank
SEPAY_ACCOUNT_NAME=NGUYEN VAN A

ZALO_OA_ACCESS_TOKEN=your_zalo_oa_access_token_here
ZALO_OA_ID=your_zalo_oa_id_here
ZALO_OWNER_USER_ID=your_zalo_user_id_here

NEXT_PUBLIC_BASE_PRICE=89000
NEXT_PUBLIC_PRODUCT_NAME="Móc Khóa Clicker Bàn Phím Cơ Custom Theo Tên"
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
NODE_ENV=development
`

---

## 4. Coding Conventions

- **File naming**: PascalCase for components, camelCase for lib/utils, kebab-case for route folders.
- **Imports**: Absolute imports via @/ alias (configured in 	sconfig.json).
- **No ny**: TypeScript strict mode; use unknown + type guards instead.