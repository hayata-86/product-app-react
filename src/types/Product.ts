export type Product = {
  id: string;
  userId: string;
  name: string;
  completed: boolean;
};

export type NewProduct = Omit<Product, "id">;

export type ProductUpdate = Partial<Product>;

export type StatusFilter = "all" | "active" | "completed";

export type SortOrder = "manual" | "asc" | "desc";
