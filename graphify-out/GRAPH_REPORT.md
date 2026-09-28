# Graph Report - customize-clicker  (2026-09-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 190 nodes · 250 edges · 16 communities (13 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `741b8f83`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- dependencies
- compilerOptions
- orders.ts
- OrderModal.tsx
- page.tsx
- ProductOptions.tsx
- webhook/route.ts
- Step1_CustomerForm.tsx
- pricing.ts
- package.json
- include
- eslint.config.mjs
- layout.tsx
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `getPricingBreakdown()` - 7 edges
3. `POST()` - 6 edges
4. `include` - 6 edges
5. `PricingBreakdown` - 5 edges
6. `getPaymentInfo()` - 5 edges
7. `Button()` - 5 edges
8. `scripts` - 5 edges
9. `POST()` - 4 edges
10. `createOrder()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `getPricingBreakdown()`  [EXTRACTED]
  app/api/orders/create/route.ts → lib/pricing.ts
- `POST()` --calls--> `getPricingBreakdown()`  [EXTRACTED]
  app/api/calculate-price/route.ts → lib/pricing.ts
- `Props` --references--> `PricingBreakdown`  [EXTRACTED]
  components/checkout/OrderModal.tsx → lib/types.ts
- `Props` --references--> `ProductSelection`  [EXTRACTED]
  components/checkout/OrderModal.tsx → lib/types.ts
- `POST()` --calls--> `createOrder()`  [EXTRACTED]
  app/api/orders/create/route.ts → lib/orders.ts

## Import Cycles
- None detected.

## Communities (16 total, 3 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, prisma (+13 more)

### Community 1 - "dependencies"
Cohesion: 0.10
Nodes (21): @heroicons/react, @hookform/resolvers, nanoid, next, dependencies, @heroicons/react, @hookform/resolvers, nanoid (+13 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "orders.ts"
Cohesion: 0.18
Nodes (12): POST(), schema, dynamic, GET(), createOrder(), generateOrderCode(), getOrder(), prisma (+4 more)

### Community 4 - "OrderModal.tsx"
Cohesion: 0.17
Nodes (13): Props, Step1_CustomerForm(), Props, Step2_Payment(), Props, Step3_Success(), Button(), ButtonProps (+5 more)

### Community 5 - "page.tsx"
Cohesion: 0.18
Nodes (8): Footer(), Header(), Lightbox(), Props, ProductDescription(), IMAGES, ProductGallery(), ProductOptions()

### Community 6 - "ProductOptions.tsx"
Cohesion: 0.17
Nodes (10): OrderModal(), ColorPickerGroup(), PRESET_COLORS, Props, CustomTextInput(), PriceDisplay(), Props, SegmentedControl() (+2 more)

### Community 7 - "webhook/route.ts"
Cohesion: 0.31
Nodes (7): POST(), findOrderByOrderCode(), updateOrderStatus(), verifyWebhookApiKey(), OrderRecord, buildOrderMessage(), sendZaloToAdmin()

### Community 8 - "Step1_CustomerForm.tsx"
Cohesion: 0.27
Nodes (7): FormData, Props, schema, Props, Input, InputProps, Label()

### Community 9 - "pricing.ts"
Cohesion: 0.31
Nodes (8): POST(), schema, BASE_PRICE, calculateTextAddon(), calculateTotal(), getPricingBreakdown(), MAX_CHARS, PRICING_CONFIG

### Community 10 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 11 - "include"
Cohesion: 0.22
Nodes (8): .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 12 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

## Knowledge Gaps
- **81 isolated node(s):** `SePayBankAccount`, `Props`, `Props`, `ButtonProps`, `CreateOrderResponse` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 88 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `PricingBreakdown` connect `OrderModal.tsx` to `pricing.ts`, `ProductOptions.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `SePayBankAccount`, `Props`, `Props` to the rest of the system?**
  _81 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._