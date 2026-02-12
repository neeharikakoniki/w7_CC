import React from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  category,
  categories,
  onCategoryChange,
}) => {
  return (
    <div className="search-wrap">
      <label className="search-label" htmlFor="product-search">
        Find products
      </label>
      <div className="search-controls">
        <input
          id="product-search"
          className="search-input"
          type="text"
          placeholder="Search by name or category..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <select
          className="search-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
