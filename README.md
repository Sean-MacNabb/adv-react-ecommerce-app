# Advanced React E-Commerce App

A React + TypeScript e-commerce application built with Redux Toolkit and React Query, using the FakeStoreAPI to simulate product data.

## Features

- Product listing with title, price, category, description, rating, and image
- Dynamic category filtering via dropdown
- Add to cart / remove from cart functionality
- Cart totals (item count and price) update in real time
- Cart persists across page refreshes using sessionStorage
- Checkout simulation that clears the cart and sessionStorage

## Tech Stack

- React + TypeScript
- Vite
- Redux Toolkit (cart state management)
- React Query / TanStack Query (data fetching)
- Axios
- FakeStoreAPI

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone <your-repo-url>
   cd adv-react-ecommerce-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open the app in your browser at the local URL shown in the terminal (typically `http://localhost:5173`).

## Project Structure

\`\`\`
src/
├── redux/          # Redux store and cart slice
├── types/          # Shared TypeScript types
├── components/     # Home, ProductCard, CategoryFilter, ShoppingCart
├── hooks/          # sessionStorage persistence hook
├── App.tsx
└── main.tsx
\`\`\`