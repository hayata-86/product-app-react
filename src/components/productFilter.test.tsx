import { describe, expect, test } from "vitest";

import { getVisibleProducts } from "../utils/productFilter";
import type { Product } from "../types/Product.ts";

describe("getVisibleProducts", () => {
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

  test("商品名で検索できる", () => {
    const result = getVisibleProducts(
      products,
      "りんご",
      "all",
      "manual"
    );

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("りんご");
  });

  test("未完了のみ取得できる", () => {
    const result = getVisibleProducts(
      products,
      "",
      "active",
      "manual"
    );

    expect(result).toHaveLength(2);
  });

  test("完了済みのみ取得できる", () => {
    const result = getVisibleProducts(
      products,
      "",
      "completed",
      "manual"
    );

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("みかん");
  });

  test("昇順ソートできる", () => {
    const result = getVisibleProducts(
      products,
      "",
      "all",
      "asc"
    );

    expect(result[0].name).toBe("バナナ");
  });

  test("降順ソートできる", () => {
    const result = getVisibleProducts(
      products,
      "",
      "all",
      "desc"
    );

    expect(result[0].name).toBe("りんご");
  });
});