import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { getProducts } from '../api/products';

const Home = () => {
  // Tracks which category is currently selected ('' means all products)
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetches all products from Firestore; cached under the 'products' key
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Filters client-side by category, since Firestore already gave us the full list
  const products =
    selectedCategory === ''
      ? allProducts
      : allProducts?.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {isLoading && <p>Loading products...</p>}
      {error && <p>Error loading products.</p>}

      <div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;