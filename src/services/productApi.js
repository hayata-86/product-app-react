const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

export const getProducts = async () => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("商品一覧の取得に失敗しました");
  }

  return response.json();
};

export const createProduct = async (product) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("商品の追加に失敗しました");
  }

  return response.json();
};

export const updateProduct = async (id, updates) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("商品の更新に失敗しました");
  }

  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("商品の削除に失敗しました");
  }
};

export const deleteCompletedProducts = async (products) => {
  const completedProducts = products.filter((product) => product.completed);

  await Promise.all(
    completedProducts.map((product) => deleteProduct(product.id))
  );
};