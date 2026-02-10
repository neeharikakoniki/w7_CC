import React from 'react'


type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};


const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder='Search Products..'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div>SearchBar</div>
    </>
  )
}

export default SearchBar