function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      style={{
        padding: "12px",
        width: "300px",
        borderRadius: "10px",
        border: "1px solid #ddd",
      }}
    />
  );
}

export default SearchBar;