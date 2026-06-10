import { describe, expect, test } from "vitest";

import { getProductStats } from "../utils/productStats";
import type { Product } from "../types/Product.ts";

describe("getProductStats", () => {
  const products: Product[] = [
    {
      id: "1",
      name: "りんご",
      completed: false,
    },
    {
      id: "2",
      name: "みかん",
      completed: true,
    },
    {
      id: "3",
      name: "バナナ",
      completed: false,
    },
  ];

  test("商品件数を正しく計算できる", () => {
    const visibleProducts = products;

    const result = getProductStats(products, visibleProducts);

    expect(result.totalCount).toBe(3);
    expect(result.completedCount).toBe(1);
    expect(result.activeCount).toBe(2);
    expect(result.visibleCount).toBe(3);
  });

  test("表示件数を正しく計算できる", () => {
    const visibleProducts = [products[0]];

    const result = getProductStats(products, visibleProducts);

    expect(result.visibleCount).toBe(1);
  });
});