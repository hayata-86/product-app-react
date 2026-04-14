function SortBar({ sortOrder, setSortOrder }) {
  return (
    <div className="button-group">
      <button
        className={sortOrder === "manual" ? "filter-button active" : "filter-button"}
        onClick={() => setSortOrder("manual")}
      >
        手動
      </button>

      <button
        className={sortOrder === "asc" ? "filter-button active" : "filter-button"}
        onClick={() => setSortOrder("asc")}
      >
        昇順
      </button>

      <button
        className={sortOrder === "desc" ? "filter-button active" : "filter-button"}
        onClick={() => setSortOrder("desc")}
      >
        降順
      </button>
    </div>
  );
}

export default SortBar;