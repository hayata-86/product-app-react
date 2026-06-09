import React from "react";

import type { SortOrder } from "../types/Product.ts";

type SortBarProps = {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
};

function SortBar({ sortOrder, setSortOrder }: SortBarProps) {
  return (
    <div className="button-group">
      <button
        className={
          sortOrder === "manual" ? "filter-button active" : "filter-button"
        }
        onClick={() => setSortOrder("manual")}
      >
        手動
      </button>

      <button
        className={
          sortOrder === "asc" ? "filter-button active" : "filter-button"
        }
        onClick={() => setSortOrder("asc")}
      >
        昇順
      </button>

      <button
        className={
          sortOrder === "desc" ? "filter-button active" : "filter-button"
        }
        onClick={() => setSortOrder("desc")}
      >
        降順
      </button>
    </div>
  );
}

export default React.memo(SortBar);
