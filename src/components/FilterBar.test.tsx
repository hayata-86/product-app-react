import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import FilterBar from "./FilterBar";

describe("FilterBar", () => {
  test("未完了ボタンをクリックするとsetStatusFilterにactiveが渡される", async () => {
    const user = userEvent.setup();

    const setStatusFilter = vi.fn();

    render(
      <FilterBar statusFilter="all" setStatusFilter={setStatusFilter} />
    );

    const button = screen.getByRole("button", {
      name: "未完了",
    });

    await user.click(button);

    expect(setStatusFilter).toHaveBeenCalledWith("active");
  });

  test("完了済みボタンをクリックするとsetStatusFilterにcompletedが渡される", async () => {
    const user = userEvent.setup();

    const setStatusFilter = vi.fn();

    render(
      <FilterBar statusFilter="all" setStatusFilter={setStatusFilter} />
    );

    const button = screen.getByRole("button", {
      name: "完了済み",
    });

    await user.click(button);

    expect(setStatusFilter).toHaveBeenCalledWith("completed");
  });
});