import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/products';

// Empty form template used for both "add new" and resetting after edit
const emptyForm = {
  title: '',
  price: '',
  category: '',
  description: '',
  image: '',
};

const ProductManagementPage = () => {
  const queryClient = useQueryClient();

  // Fetches the product list; shares the same cache key as Home.tsx,
  // so creating/updating/deleting here will also refresh Home's view
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // Form state — used for both creating a new product and editing an existing one
  const [form, setForm] = useState(emptyForm);

  // Tracks which product (if any) is currently being edited; null means "creating new"
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Pre-fills the form with an existing product's data for editing
  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: String(product.price),
      category: product.category,
      description: product.description,
      image: product.image,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const productData = {
        title: form.title,
        price: parseFloat(form.price),
        category: form.category,
        description: form.description,
        image: form.image,
        rating: { rate: 0, count: 0 },
      };

      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await createProduct(productData);
      }

      // Invalidate the 'products' cache so Home.tsx and this list both refresh
      await queryClient.invalidateQueries({ queryKey: ['products'] });

      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setFormError(`${editingId ? 'Update' : 'Create'} failed: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this product?');
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (err) {
      setFormError(`Delete failed: ${err}`);
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>

        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="text"
            value={form.image}
            onChange={(e) => handleChange('image', e.target.value)}
            required
          />
        </div>

        {formError && <p>{formError}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : editingId
            ? 'Update Product'
            : 'Add Product'}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>Existing Products</h3>

      {isLoading && <p>Loading products...</p>}
      {error && <p>Error loading products.</p>}

      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} width={50} />
            <span>{product.title}</span>
            <span>${product.price.toFixed(2)}</span>
            <span>{product.category}</span>
            <button onClick={() => handleEditClick(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagementPage;