// Shape of a product as returned by FakeStoreAPI
export interface Product {
    id: number;
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