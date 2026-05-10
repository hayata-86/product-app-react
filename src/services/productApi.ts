import type {
  Product,
  NewProduct,
  ProductUpdate,
} from "../types/Product.ts";
import { request } from "./apiClient";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

export const getProducts = async (): Promise<Product[]> => {
  return request<Product[]>(
    BASE_URL,
    undefined,
    "商品一覧の取得に失敗しました"
  );
};

export const createProduct = async (
  product: NewProduct
): Promise<Product> => {
  return request<Product>(
    BASE_URL,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    },
    "商品の追加に失敗しました"
  );
};

export const updateProduct = async (
  id: string,
  updates: ProductUpdate
): Promise<Product> => {
  return request<Product>(
    `${BASE_URL}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    },
    "商品の更新に失敗しました"
  );
};

export const deleteProduct = async (
  id: string
): Promise<void> => {
  return request<void>(
    `${BASE_URL}/${id}`,
    {
      method: "DELETE",
    },
    "商品の削除に失敗しました"
  );
};

export const deleteCompletedProducts = async (
  products: Product[]
): Promise<void> => {
  const completedProducts = products.filter((product) => product.completed);

  await Promise.all(
    completedProducts.map((product) => deleteProduct(product.id))
  );
};

