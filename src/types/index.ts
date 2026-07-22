// Shape of a product, now stored in Firestore's "products" collection
export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
}

// A cart item is a product PLUS how many the user added
export interface CartItem extends Product {
    quantity: number;
}

// Shape of the user profile stored in Firestore's "users" collection
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  address: string;
}

// Shape of an order stored in Firestore's "orders" collection
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
}