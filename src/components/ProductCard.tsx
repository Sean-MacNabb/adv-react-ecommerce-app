import type { Product } from '../types';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { addToCart } from '../redux/cartSlice';

// Fallback image shown if the product's image URL fails to load
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // Swaps in the placeholder image if the original image URL 404s
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        onError={handleImageError}
      />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;