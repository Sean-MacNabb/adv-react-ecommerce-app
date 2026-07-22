import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  // Reuses the same 'products' query cache as Home.tsx — React Query
  // won't re-fetch, it'll just read what's already cached
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Derives a unique, sorted list of category names from the product list
  const categories = data
    ? Array.from(new Set(data.map((product) => product.category))).sort()
    : [];

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;