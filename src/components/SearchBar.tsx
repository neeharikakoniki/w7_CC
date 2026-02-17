import React from 'react';

type Sort = "price-asc" | "price-desc" | null;

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
  sort: Sort;
  onSortChange: (value: Sort) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};




const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  category,
  categories,
  onCategoryChange,
  sort,
  onSortChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
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
      <div className="filter-controls">
        <select
          className="search-select"
          value={sort ?? ""}
          onChange={(e) =>
            onSortChange((e.target.value || null) as Sort)
          }
          aria-label="Sort by price"
        >
          <option value="">Default order</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
        </select>
        <div className="price-range">
          <input
            className="search-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            aria-label="Minimum price"
          />
          <input
            className="search-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            aria-label="Maximum price"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
