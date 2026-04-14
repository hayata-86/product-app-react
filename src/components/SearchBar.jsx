function SearchBar({ searchKeyword, setSearchKeyword }) {
  return (
    <div className="form-row">
      <input
        className="text-input"
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="商品名で検索"
      />
    </div>
  );
}

export default SearchBar;