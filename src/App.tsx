import type { Product, StatusFilter, SortOrder } from "./types/Product.ts";

import { useCallback, useMemo, useState } from "react";
import "./App.css";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { getVisibleProducts } from "./utils/productFilter";

import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";

import { exportProductsToCSV } from "./utils/csv";
import { useProducts } from "./hooks/useProducts";
import { getProductStats } from "./utils/productStats";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "./hooks/useAuth";

function App() {
  const [productName, setProductName] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("manual");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const { user, isLoggedIn, authErrorMessage, login, register, logout } =
    useAuth();

  const {
    products,
    isLoading,
    errorMessage,
    addProduct,
    editProduct,
    removeProduct,
    toggleCompleted,
    clearCompleted,
    reorderProducts,
  } = useProducts(user?.id ?? "");;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddProduct = useCallback(async (): Promise<void> => {
    const trimmedName = productName.trim();

    if (trimmedName === "") return;

    if (editingId) {
      const updatedProduct = await editProduct(editingId, trimmedName);

      if (!updatedProduct) return;

      setEditingId(null);
      setProductName("");
      return;
    }

    const savedProduct = await addProduct(trimmedName);

    if (!savedProduct) return;

    setProductName("");
  }, [productName, editingId, editProduct, addProduct]);

  const handleDeleteProduct = useCallback(
    async (id: string): Promise<void> => {
      await removeProduct(id);

      if (editingId === id) {
        setEditingId(null);
        setProductName("");
      }
    },
    [removeProduct, editingId]
  );

  const handleClearCompleted = useCallback(async (): Promise<void> => {
    const completedProducts = products.filter((product) => product.completed);

    if (completedProducts.length === 0) return;

    const editingProduct = products.find((product) => product.id === editingId);

    await clearCompleted();

    if (editingProduct?.completed) {
      setEditingId(null);
      setProductName("");
    }
  }, [products, editingId, clearCompleted]);

  const handleToggleCompleted = useCallback(
    async (id: string): Promise<void> => {
      await toggleCompleted(id);
    },
    [toggleCompleted]
  );

  const handleStartEdit = useCallback((product: Product): void => {
    setProductName(product.name);
    setEditingId(product.id);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent): void => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;
      if (sortOrder !== "manual") return;

      reorderProducts(String(active.id), String(over.id));
    },
    [sortOrder, reorderProducts]
  );

  const visibleProducts = useMemo(
    () => getVisibleProducts(products, searchKeyword, statusFilter, sortOrder),
    [products, searchKeyword, statusFilter, sortOrder]
  );

  const { totalCount, completedCount, activeCount, visibleCount } = useMemo(
    () => getProductStats(products, visibleProducts),
    [products, visibleProducts]
  );

  if (!isLoggedIn) {
    if (authMode === "register") {
      return (
        <RegisterForm
          authErrorMessage={authErrorMessage}
          register={register}
          onSwitchToLogin={() => setAuthMode("login")}
        />
      );
    }

    return (
      <LoginForm
        authErrorMessage={authErrorMessage}
        login={login}
        onSwitchToRegister={() => setAuthMode("register")}
      />
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">商品管理アプリ</h1>

        <div className="user-row">
          <span>{user?.name} さんでログイン中</span>

          <button className="secondary-button" onClick={logout}>
            ログアウト
          </button>
        </div>

        {isLoading && (
          <p className="info-message">商品一覧を読み込み中です...</p>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="panel">
          <ProductForm
            productName={productName}
            setProductName={setProductName}
            handleAddProduct={handleAddProduct}
            editingId={editingId}
          />

          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />

          <div className="controls-grid">
            <FilterBar
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />

            <SortBar sortOrder={sortOrder} setSortOrder={setSortOrder} />
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">全件数</span>
            <span className="stat-value">{totalCount}件</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">未完了件数</span>
            <span className="stat-value">{activeCount}件</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">完了件数</span>
            <span className="stat-value">{completedCount}件</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">表示件数</span>
            <span className="stat-value">{visibleCount}件</span>
          </div>
        </div>

        <div className="action-row">
          <button
            className="secondary-button"
            onClick={handleClearCompleted}
            disabled={completedCount === 0}
          >
            完了済みを一括削除
          </button>

          <button
            className="secondary-button"
            onClick={() => exportProductsToCSV(products)}
          >
            CSVエクスポート
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <ProductList
            filteredProducts={visibleProducts}
            handleToggleCompleted={handleToggleCompleted}
            handleDeleteProduct={handleDeleteProduct}
            handleStartEdit={handleStartEdit}
          />
        </DndContext>
      </div>
    </div>
  );
}

export default App;