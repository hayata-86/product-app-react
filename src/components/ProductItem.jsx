import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ProductItem({
  product,
  handleToggleCompleted,
  handleDeleteProduct,
  handleStartEdit,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={isDragging ? "product-item dragging" : "product-item"}
    >
      <div className="product-main">
        <button
          type="button"
          className="drag-handle"
          {...attributes}
          {...listeners}
          aria-label="ドラッグして並び替え"
        >
          ☰
        </button>

        <label className="product-check">
          <input
            type="checkbox"
            checked={product.completed}
            onChange={() => handleToggleCompleted(product.id)}
          />
        </label>

        <span className={product.completed ? "product-name completed" : "product-name"}>
          {product.name}
        </span>
      </div>

      <div className="product-actions">
        <button
          className="small-button"
          onClick={() => handleStartEdit(product)}
        >
          編集
        </button>
        <button
          className="small-button danger"
          onClick={() => handleDeleteProduct(product.id)}
        >
          削除
        </button>
      </div>
    </li>
  );
}

export default ProductItem;