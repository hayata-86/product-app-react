import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import SortBar from "./SortBar";

describe("SortBar", () => {
  test("昇順ボタンをクリックするとascが渡される", async () => {
    const user = userEvent.setup();

    const setSortOrder = vi.fn();

    render(
      <SortBar
        sortOrder="manual"
        setSortOrder={setSortOrder}
      />
    );

    const button = screen.getByRole("button", {
      name: "昇順",
    });

    await user.click(button);

    expect(setSortOrder).toHaveBeenCalledWith("asc");
  });

  test("降順ボタンをクリックするとdescが渡される", async () => {
    const user = userEvent.setup();

    const setSortOrder = vi.fn();

    render(
      <SortBar
        sortOrder="manual"
        setSortOrder={setSortOrder}
      />
    );

    const button = screen.getByRole("button", {
      name: "降順",
    });

    await user.click(button);

    expect(setSortOrder).toHaveBeenCalledWith("desc");
  });

  test("手動ボタンをクリックするとmanualが渡される", async () => {
    const user = userEvent.setup();

    const setSortOrder = vi.fn();

    render(
      <SortBar
        sortOrder="asc"
        setSortOrder={setSortOrder}
      />
    );

    const button = screen.getByRole("button", {
      name: "手動",
    });

    await user.click(button);

    expect(setSortOrder).toHaveBeenCalledWith("manual");
  });
});