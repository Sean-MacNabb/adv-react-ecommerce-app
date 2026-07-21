import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetches the list of category names from FakeStoreAPI
const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
};

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  // Runs fetchCategories and caches the result under the 'categories' key
  const { data, isLoading, error } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {data?.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;