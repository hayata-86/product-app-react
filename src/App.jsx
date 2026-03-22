import { useState } from "react";

function App() {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    const trimmedName = productName.trim();

    if (trimmedName === "") return;

    const newProduct = {
      id: crypto.randomUUID(),
      name: trimmedName,
      completed: false,
    };

    setProducts([...products, newProduct]);
    setProductName("");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, completed: !product.completed }
          : product
      )
    );
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1>商品管理アプリ</h1>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="商品名を入力"
        />
        <button onClick={handleAddProduct} style={{ marginLeft: "8px" }}>
          追加
        </button>
      </div>

      <p>件数: {products.length}件</p>

      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={product.completed}
              onChange={() => handleToggleCompleted(product.id)}
            />

            <span
              style={{
                marginLeft: "8px",
                textDecoration: product.completed ? "line-through" : "none",
                color: product.completed ? "#888" : "#000",
              }}
            >
              {product.name}
            </span>

            <button
              onClick={() => handleDeleteProduct(product.id)}
              style={{ marginLeft: "8px" }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;