import { useEffect, useState } from "react";

import type { Product } from "../types/Product.ts";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteCompletedProducts,
} from "../services/productApi";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] =
    useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "商品一覧の取得に失敗しました";

        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (
    name: string
  ): Promise<Product | null> => {
    try {
      const savedProduct =
        await createProduct({
          name,
          completed: false,
        });

      setProducts((prevProducts) => [
        ...prevProducts,
        savedProduct,
      ]);

      return savedProduct;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "商品の追加に失敗しました";

      setErrorMessage(message);

      return null;
    }
  };

  const editProduct = async (
    id: string,
    name: string
  ): Promise<Product | null> => {
    try {
      const updatedProduct =
        await updateProduct(id, {
          name,
        });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? updatedProduct
            : product
        )
      );

      return updatedProduct;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "商品の更新に失敗しました";

      setErrorMessage(message);

      return null;
    }
  };

  const removeProduct = async (
    id: string
  ): Promise<void> => {
    try {
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.id !== id
        )
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "商品の削除に失敗しました";

      setErrorMessage(message);
    }
  };

  const toggleCompleted = async (
    id: string
  ): Promise<void> => {
    const targetProduct = products.find(
      (product) => product.id === id
    );

    if (!targetProduct) return;

    try {
      const updatedProduct =
        await updateProduct(id, {
          completed:
            !targetProduct.completed,
        });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? updatedProduct
            : product
        )
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "完了状態の更新に失敗しました";

      setErrorMessage(message);
    }
  };

  const clearCompleted =
    async (): Promise<void> => {
      try {
        await deleteCompletedProducts(
          products
        );

        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) =>
              !product.completed
          )
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "完了済み商品の削除に失敗しました";

        setErrorMessage(message);
      }
    };

  const reorderProducts = (
    activeId: string,
    overId: string
  ): void => {
    setProducts((prevProducts) => {
      const oldIndex =
        prevProducts.findIndex(
          (product) =>
            product.id === activeId
        );

      const newIndex =
        prevProducts.findIndex(
          (product) =>
            product.id === overId
        );

      if (
        oldIndex === -1 ||
        newIndex === -1
      ) {
        return prevProducts;
      }

      const updatedProducts = [
        ...prevProducts,
      ];

      const [movedItem] =
        updatedProducts.splice(
          oldIndex,
          1
        );

      updatedProducts.splice(
        newIndex,
        0,
        movedItem
      );

      return updatedProducts;
    });
  };

  return {
    products,
    isLoading,
    errorMessage,
    addProduct,
    editProduct,
    removeProduct,
    toggleCompleted,
    clearCompleted,
    reorderProducts,
  };
}