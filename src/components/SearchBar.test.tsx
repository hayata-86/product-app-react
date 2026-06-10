import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("検索文字入力時にsetSearchKeywordが呼ばれる", async () => {
    const user = userEvent.setup();

    const setSearchKeyword = vi.fn();

    render(
      <SearchBar
        searchKeyword=""
        setSearchKeyword={setSearchKeyword}
      />
    );

    const input = screen.getByPlaceholderText("商品名で検索");

    await user.type(input, "りんご");

    expect(setSearchKeyword).toHaveBeenCalled();
  });
});