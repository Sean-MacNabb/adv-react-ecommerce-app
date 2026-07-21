import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

// Fetches all products from FakeStoreAPI
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

// Fetches products belonging to a specific category
const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return response.data;
};

const Home = () => {
  // Tracks which category is currently selected ('' means all products)
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetches all products; only runs when no category is selected
  const {
    data: allProducts,
    isLoading: isAllLoading,
    error: allError,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: selectedCategory === '',
  });

  // Fetches category-specific products; only runs when a category is selected
  const {
    data: categoryProducts,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useQuery<Product[]>({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: selectedCategory !== '',
  });

  // Picks whichever query result is relevant based on the current filter
  const products = selectedCategory === '' ? allProducts : categoryProducts;
  const isLoading = selectedCategory === '' ? isAllLoading : isCategoryLoading;
  const error = selectedCategory === '' ? allError : categoryError;

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