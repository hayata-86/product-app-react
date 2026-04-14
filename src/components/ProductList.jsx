import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ProductItem from "./ProductItem";

function ProductList({
  filteredProducts,
  handleToggleCompleted,
  handleDeleteProduct,
  handleStartEdit,
}) {
  if (filteredProducts.length === 0) {
    return <p className="empty-message">該当する商品がありません</p>;
  }

  return (
    <SortableContext
      items={filteredProducts.map((product) => product.id)}
      strategy={verticalListSortingStrategy}
    >
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleToggleCompleted={handleToggleCompleted}
            handleDeleteProduct={handleDeleteProduct}
            handleStartEdit={handleStartEdit}
          />
        ))}
      </ul>
    </SortableContext>
  );
}

export default ProductList;