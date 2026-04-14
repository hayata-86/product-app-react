import { useEffect, useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";
import { exportProductsToCSV } from "./utils/csv";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteCompletedProducts,
} from "./services/productApi";

function App() {
  const [productName, setProductName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("manual");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const trimmedName = productName.trim();

    if (trimmedName === "") return;

    setErrorMessage("");

    if (editingId) {
      try {
        const updatedProduct = await updateProduct(editingId, {
          name: trimmedName,
        });

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingId ? updatedProduct : product
          )
        );

        setEditingId(null);
        setProductName("");
        return;
      } catch (error) {
        setErrorMessage(error.message);
        return;
      }
    }

    try {
      const savedProduct = await createProduct({
        name: trimmedName,
        completed: false,
      });

      setProducts((prevProducts) => [...prevProducts, savedProduct]);
      setProductName("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    setErrorMessage("");

    try {
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      if (editingId === id) {
        setEditingId(null);
        setProductName("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleClearCompleted = async () => {
    const completedProducts = products.filter((product) => product.completed);

    if (completedProducts.length === 0) return;

    const editingProduct = products.find((product) => product.id === editingId);

    setErrorMessage("");

    try {
      await deleteCompletedProducts(products);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => !product.completed)
      );

      if (editingProduct?.completed) {
        setEditingId(null);
        setProductName("");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleCompleted = async (id) => {
    const targetProduct = products.find((product) => product.id === id);

    if (!targetProduct) return;

    setErrorMessage("");

    try {
      const updatedProduct = await updateProduct(id, {
        completed: !targetProduct.completed,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleStartEdit = (product) => {
    setProductName(product.name);
    setEditingId(product.id);
  };

  const visibleProducts = [...products]
    .filter((product) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((product) => {
      if (statusFilter === "active") {
        return !product.completed;
      }

      if (statusFilter === "completed") {
        return product.completed;
      }

      return true;
    });

  if (sortOrder === "asc") {
    visibleProducts.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  } else if (sortOrder === "desc") {
    visibleProducts.sort((a, b) => b.name.localeCompare(a.name, "ja"));
  }

  const totalCount = products.length;
  const completedCount = products.filter((product) => product.completed).length;
  const activeCount = products.filter((product) => !product.completed).length;
  const visibleCount = visibleProducts.length;

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">商品管理アプリ</h1>

        {isLoading && <p className="info-message">商品一覧を読み込み中です...</p>}
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

            <SortBar
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
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

        <ProductList
          filteredProducts={visibleProducts}
          handleToggleCompleted={handleToggleCompleted}
          handleDeleteProduct={handleDeleteProduct}
          handleStartEdit={handleStartEdit}
        />
      </div>
    </div>
  );
}

export default App;