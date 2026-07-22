# Advanced React E-Commerce App

A React + TypeScript e-commerce application built with Redux Toolkit, React Query, and Firebase — supporting user authentication, Firestore-backed product management, and order history.

## Features

**Authentication**
- User registration and login via Firebase Authentication (email/password)
- Logout functionality
- Protected user session synced across the app via Redux

**User Management**
- User profile document created in Firestore on registration
- View and edit profile (name, address)
- Delete account (removes both Firebase Auth account and Firestore user document)

**Product Management**
- Products stored and managed in Firestore (replaces previous FakeStoreAPI integration)
- Browse all products with title, price, category, description, and image
- Dynamic category filtering
- Create, edit, and delete products via the Product Management page

**Shopping Cart & Orders**
- Add to cart / remove from cart functionality
- Cart totals (item count and price) update in real time
- Cart persists across page refreshes using sessionStorage
- Checkout creates an order document in Firestore, linked to the logged-in user
- Order History page lists all past orders with date and total
- Order Details page shows the full list of items and total for a single order

## Tech Stack

- React + TypeScript
- Vite
- React Router DOM (page navigation)
- Redux Toolkit (cart and auth state management)
- React Query / TanStack Query (data fetching and caching)
- Firebase Authentication (email/password)
- Firebase Firestore (products, users, orders)

## Getting Started

1. Clone the repository:
```bash
   git clone <your-repo-url>
   cd adv-react-ecommerce-app
```

2. Install dependencies:
```bash
   npm install
```

3. Set up Firebase:
   - Create a project at [console.firebase.google.com](https://console.firebase.google.com)
   - Register a Web app inside that project
   - Enable **Authentication → Sign-in method → Email/Password**
   - Enable **Firestore Database** (test mode is fine for development)

4. Create a `.env` file in the project root with your Firebase config values:
