import type { Product } from "../types/Product.ts";

export type ProductStats = {
  totalCount: number;
  completedCount: number;
  activeCount: number;
  visibleCount: number;
};

export function getProductStats(
  products: Product[],
  visibleProducts: Product[]
): ProductStats {
  return {
    totalCount: products.length,
    completedCount: products.filter((product) => product.completed).length,
    activeCount: products.filter((product) => !product.completed).length,
    visibleCount: visibleProducts.length,
  };
}