import React from "react";

type ProductFormProps = {
  productName: string;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  handleAddProduct: () => void;
  editingId: string | null;
};

function ProductForm({
  productName,
  setProductName,
  handleAddProduct,
  editingId,
}: ProductFormProps) {
  return (
    <div className="form-row">
      <input
        type="text"
        value={productName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setProductName(e.target.value)
        }
        placeholder="商品名を入力"
        className="text-input"
      />

      <button className="primary-button" onClick={handleAddProduct}>
        {editingId ? "更新" : "追加"}
      </button>
    </div>
  );
}

export default React.memo(ProductForm);
