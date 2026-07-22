interface ProductSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const ProductSearch = ({
  search,
  onSearchChange,
}: ProductSearchProps) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Search Products
      </h2>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default ProductSearch;