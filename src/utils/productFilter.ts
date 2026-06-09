import type { Product, StatusFilter, SortOrder } from "../types/Product.ts";

export function getVisibleProducts(
  products: Product[],
  searchKeyword: string,
  statusFilter: StatusFilter,
  sortOrder: SortOrder
): Product[] {
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

  return visibleProducts;
}
