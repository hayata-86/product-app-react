import { useEffect, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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
  const [errorMessage, setErrorMessage] = useState<string>("");

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (savedProduct) => {
      setProducts((prevProducts) => [
        ...prevProducts,
        savedProduct,
      ]);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Product>;
    }) => updateProduct(id, updates),

    onSuccess: (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id
            ? updatedProduct
            : product
        )
      );

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: (_, deletedId) => {
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.id !== deletedId
        )
      );

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const clearCompletedMutation = useMutation({
    mutationFn: deleteCompletedProducts,

    onSuccess: () => {
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => !product.completed
        )
      );

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const queryErrorMessage =
    error instanceof Error ? error.message : "";

  const addProduct = async (
    name: string
  ): Promise<Product | null> => {
    try {
      const savedProduct =
        await addMutation.mutateAsync({
          name,
          completed: false,
        });

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
        await updateMutation.mutateAsync({
          id,
          updates: {
            name,
          },
        });

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
      await deleteMutation.mutateAsync(id);
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
      await updateMutation.mutateAsync({
        id,
        updates: {
          completed: !targetProduct.completed,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "完了状態の更新に失敗しました";

      setErrorMessage(message);
    }
  };

  const clearCompleted = async (): Promise<void> => {
    try {
      await clearCompletedMutation.mutateAsync(products);
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
      const oldIndex = prevProducts.findIndex(
        (product) => product.id === activeId
      );

      const newIndex = prevProducts.findIndex(
        (product) => product.id === overId
      );

      if (oldIndex === -1 || newIndex === -1) {
        return prevProducts;
      }

      const updatedProducts = [...prevProducts];

      const [movedItem] = updatedProducts.splice(oldIndex, 1);

      updatedProducts.splice(newIndex, 0, movedItem);

      return updatedProducts;
    });
  };

  return {
    products,
    isLoading,
    errorMessage: errorMessage || queryErrorMessage,
    addProduct,
    editProduct,
    removeProduct,
    toggleCompleted,
    clearCompleted,
    reorderProducts,
  };
}