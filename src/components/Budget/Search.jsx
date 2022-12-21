import React, { useEffect, useState } from "react";
import debounce from "../../utils/debounce";

const Search = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setSearch(searchInput);
  }, [setSearch, searchInput]);

  const handleSearch = debounce((value) => {
    setSearchInput(value);
  });

  return (
    <input
      type="search"
      onChange={(e) => handleSearch(e.target.value)}
      spellCheck="false"
      className="input input-bordered input-primary input-sm"
      placeholder="Search..."
    />
  );
};

export default Search;
