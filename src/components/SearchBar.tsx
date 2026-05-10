import React from "react";

type SearchBarProps = {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<
    React.SetStateAction<string>
  >;
};

function SearchBar({
  searchKeyword,
  setSearchKeyword,
}: SearchBarProps) {
  return (
    <div className="form-row">
      <input
        className="text-input"
        type="text"
        value={searchKeyword}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>
        ) => setSearchKeyword(e.target.value)}
        placeholder="商品名で検索"
      />
    </div>
  );
}

export default React.memo(SearchBar);