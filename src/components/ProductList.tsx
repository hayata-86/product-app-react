import React from "react";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import ProductItem from "./ProductItem";

import type { Product } from "../types/Product.ts";

type ProductListProps = {
  filteredProducts: Product[];
  handleToggleCompleted: (
    id: string
  ) => void;
  handleDeleteProduct: (
    id: string
  ) => void;
  handleStartEdit: (
    product: Product
  ) => void;
};

function ProductList({
  filteredProducts,
  handleToggleCompleted,
  handleDeleteProduct,
  handleStartEdit,
}: ProductListProps) {
  if (filteredProducts.length === 0) {
    return (
      <p className="empty-message">
        該当する商品がありません
      </p>
    );
  }

  return (
    <SortableContext
      items={filteredProducts.map(
        (product) => product.id
      )}
      strategy={verticalListSortingStrategy}
    >
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleToggleCompleted={
              handleToggleCompleted
            }
            handleDeleteProduct={
              handleDeleteProduct
            }
            handleStartEdit={handleStartEdit}
          />
        ))}
      </ul>
    </SortableContext>
  );
}

export default React.memo(ProductList);