function ProductForm({
  productName,
  setProductName,
  handleAddProduct,
  editingId,
}) {
  return (
    <div className="form-row">
      <input
        className="text-input"
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="商品名を入力"
      />
      <button className="primary-button" onClick={handleAddProduct}>
        {editingId ? "更新" : "追加"}
      </button>
    </div>
  );
}

export default ProductForm;