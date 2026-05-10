import React from "react";

import type { StatusFilter } from "../types/Product.ts";

type FilterBarProps = {
  statusFilter: StatusFilter;
  setStatusFilter: React.Dispatch<
    React.SetStateAction<StatusFilter>
  >;
};

function FilterBar({
  statusFilter,
  setStatusFilter,
}: FilterBarProps) {
  return (
    <div className="button-group">
      <button
        className={
          statusFilter === "all"
            ? "filter-button active"
            : "filter-button"
        }
        onClick={() => setStatusFilter("all")}
      >
        すべて
      </button>

      <button
        className={
          statusFilter === "active"
            ? "filter-button active"
            : "filter-button"
        }
        onClick={() => setStatusFilter("active")}
      >
        未完了
      </button>

      <button
        className={
          statusFilter === "completed"
            ? "filter-button active"
            : "filter-button"
        }
        onClick={() => setStatusFilter("completed")}
      >
        完了済み
      </button>
    </div>
  );
}

export default React.memo(FilterBar);