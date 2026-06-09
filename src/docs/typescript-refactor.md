# React + TypeScript 商品管理アプリ

React + Vite + TypeScript を用いて作成した商品管理アプリです。

商品追加・編集・削除・検索・並び替え・CSV出力・ドラッグ＆ドロップによる並び替えなど、実務を意識したCRUD機能を実装しています。

---

# アプリ概要

## 主な機能

- 商品追加
- 商品編集
- 商品削除
- 商品検索
- 状態フィルター
- 並び替え
- ドラッグ＆ドロップ並び替え
- CSVエクスポート
- 完了済み一括削除
- 件数表示
- API連携

---

# 使用技術

- React
- TypeScript
- Vite
- @dnd-kit
- json-server
- CSS

---

# TypeScript移行対応

本アプリは、React + Vite + JavaScript 構成から、React + TypeScript 構成へ移行を実施しました。

## 実施内容

- JavaScript → TypeScript へ移行
- `.jsx` → `.tsx`
- `.js` → `.ts`
- `tsconfig.json` 調整
- `Product` 型定義追加
- `StatusFilter` / `SortOrder` 型定義追加
- APIレスポンス型定義
- utility関数の型定義
- DnD (`@dnd-kit`) の型対応
- Promise型対応
- Props型定義

---

# ディレクトリ構成

```txt
src/
 ├─ components/
 │   ├─ ProductForm.tsx
 │   ├─ ProductItem.tsx
 │   ├─ ProductList.tsx
 │   ├─ SearchBar.tsx
 │   ├─ FilterBar.tsx
 │   └─ SortBar.tsx
 │
 ├─ hooks/
 │   └─ useProducts.ts
 │
 ├─ services/
 │   ├─ apiClient.ts
 │   └─ productApi.ts
 │
 ├─ utils/
 │   ├─ csv.ts
 │   ├─ productFilter.ts
 │   └─ productStats.ts
 │
 ├─ types/
 │   └─ Product.ts
 │
 ├─ App.tsx
 └─ main.tsx
```

---

# 実装した主な改善内容

## カスタムHook化

`useProducts.ts` を作成し、商品関連ロジックを分離。

### 分離した内容

- 商品取得
- 商品追加
- 商品更新
- 商品削除
- 完了状態更新
- 完了済み一括削除
- DnD並び替え
- loading管理
- error管理

これにより `App.tsx` の責務を軽量化し、保守性を向上。

---

## utility関数分離

### productFilter.ts

検索・フィルター・並び替えロジックを分離。

### productStats.ts

件数計算ロジックを分離。

### csv.ts

CSVエクスポート処理を型安全化。

---

## APIクライアント共通化

`apiClient.ts` を作成し、fetch処理を共通化。

### 対応内容

- API通信共通化
- エラーハンドリング共通化
- Generic型対応
- DELETEレスポンス対応

---

## パフォーマンス最適化

### useMemo

以下をメモ化。

- 表示商品一覧
- 件数計算

### useCallback

イベント関数をメモ化。

- handleAddProduct
- handleDeleteProduct
- handleToggleCompleted
- handleClearCompleted
- handleDragEnd
- handleStartEdit

### React.memo

コンポーネント再描画を最適化。

- ProductForm
- SearchBar
- FilterBar
- SortBar
- ProductList
- ProductItem

---

# 技術的に工夫したポイント

- TypeScriptによる型安全性向上
- API層・UI層・ロジック層の責務分離
- hooks/utilities分離による再利用性向上
- React Hooksを用いたレンダリング最適化
- DnD操作の型安全化
- 保守性を意識したディレクトリ設計

---

# セットアップ

## パッケージインストール

```bash
npm install
```

## json-server 起動

```bash
npx json-server db.json --port 3001
```

## 開発サーバー起動

```bash
npm run dev
```

---

# 環境変数

`.env`

```env
VITE_API_BASE_URL=http://localhost:3001
```

---

# 今後の改善予定

- React Query導入
- Zustand導入
- Testing Library導入
- ESLint + Prettier導入
- ダークモード対応
- 認証機能追加
- ページネーション
- バックエンド本番API化
