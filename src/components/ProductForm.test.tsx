import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ProductForm from "./ProductForm";

describe("ProductForm", () => {
  test("入力欄に文字を入力できる", async () => {
    const user = userEvent.setup();

    const setProductName = vi.fn();

    render(
      <ProductForm
        productName=""
        setProductName={setProductName}
        handleAddProduct={async () => {}}
        editingId={null}
      />
    );

    const input = screen.getByRole("textbox");

    await user.type(input, "テスト商品");

    expect(setProductName).toHaveBeenCalled();
  });
});

test("追加ボタンをクリックするとhandleAddProductが呼ばれる", async () => {
  const user = userEvent.setup();

  const setProductName = vi.fn();
  const handleAddProduct = vi.fn();

  render(
    <ProductForm
      productName="テスト商品"
      setProductName={setProductName}
      handleAddProduct={handleAddProduct}
      editingId={null}
    />
  );

  const button = screen.getByRole("button", {
    name: "追加",
  });

  await user.click(button);

  expect(handleAddProduct).toHaveBeenCalledTimes(1);
});