# Smart-Buy

**Smart-Buy** is a comprehensive e-commerce platform designed to provide users with a seamless shopping experience. It includes various features such as user authentication, a subscriber dashboard, wishlist functionality, product listing with filtering options, a shopping cart, and an admin dashboard for managing the store.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
  - [Authentication](#authentication)
  - [Subscriber Dashboard](#subscriber-dashboard)
  - [Wishlist](#wishlist)
  - [Products Listing Page](#products-listing-page)
  - [Cart](#cart)
  - [Admin Flow](#admin-flow)
- [Backend API Routes](#backend-api-routes)
  - [User Routes](#user-routes)
  - [Order Routes](#order-routes)
  - [Product Routes](#product-routes)
  - [Coupon Routes](#coupon-routes)
  - [Category Routes](#category-routes)
  - [Subcategory Routes](#subcategory-routes)
- [Installation](#installation)
- [Usage](#usage)

## Technologies Used

### Frontend

- **HTML**: Markup language for structuring the web pages.
- **CSS**: Styling language for the presentation of web pages.
- **JavaScript (JS)**: Scripting language for dynamic and interactive features.
- **React**: JavaScript library for building user interfaces.
- **Redux**: State management library for JavaScript applications.
- **Bootstrap**: CSS framework for responsive design.
- **Firebase**: Platform used for managing users and analytics.
- **Stripe**: Payment processing platform integrated for checkout.

### Backend & Database

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing and managing data.

## Features

### Authentication

- **Login Flow**: Users can log in using their username and password or via Google.
- **Register**: New users can register by providing their email. A registration link is sent to the provided email to set up a password.
- **Forgot Password**: Users can reset their password if forgotten.

### Subscriber Dashboard

- **Order History**: Users can view their past orders and order details.
- **Order Details**: Displays status updates (e.g., packed, shipped, delivered), products in the order, payment method, and provides an option to view the invoice.

### Wishlist

- **Wishlist**: Users can add products to their wishlist for future reference.

### Products Listing Page

- **Product Listings**: Displays all products with options to filter based on price, category, sub-category, rating, best sellers, or newly arrived.
- **Search Functionality**: Users can search for products.
- **Filters**: Users can filter products by price, category, sub-category, and rating.

### Cart

- **Add to Cart**: Users can add products to their cart and increase the quantity.
- **Checkout**: Users can proceed to checkout after logging in or creating an account.
- **Logout**: Option to log out from the application.

### Admin Flow

- **Admin Dashboard**: Admins can manage the store by adding products, categories, sub-categories, and coupons.
- **Product Management**: Admins can view a list of all products and manage them.

## Backend API Routes

### User Routes

- `POST /user/cart` - Add products to the cart.
- `GET /user/cart` - Get all products in the user's cart.
- `DELETE /user/cart` - Remove all products from the cart.
- `POST /user/address` - Add and save the user's address.

### Order Routes

- `POST /user/order` - Create a new order.
- `POST /user/cash-order` - Create an order with the Cash on Delivery (COD) option.
- `GET /user/orders` - List all orders for the user.
- `POST /user/cart/coupon` - Apply a coupon code to the checkout.

### Wishlist Routes

- `POST /user/wishlist` - Add a product to the wishlist.
- `GET /user/wishlist` - Get all products in the wishlist.
- `PUT /user/wishlist/:productId` - Remove a product from the wishlist.

### Product Routes

- `POST /product` - Create a new product.
- `GET /products/total` - Get the total count of products available.
- `GET /products` - List all products.
- `GET /product/:slug` - Get details of a specific product.
- `PUT /product/:slug` - Update a specific product.
- `DELETE /product/:slug` - Delete a specific product.
- `POST /product/star/:productId` - Update the rating of a product.
- `GET /product/related/:productId` - Get related products.
- `POST /search/filters` - Save the filters or search criteria applied by the user.

### Coupon Routes

- `POST /coupon` - Create a new coupon.
- `GET /coupons` - List all coupons.
- `DELETE /coupon/:couponId` - Delete a specific coupon.

### User Management Routes

- `POST /create-or-update-user` - Create or update an existing user.
- `GET /current-user` - Get details about the current user.

### Category Routes

- `POST /category` - Create a new category.
- `GET /categories` - List all categories.
- `PUT /category/:categoryId` - Update a specific category.
- `DELETE /category/:categoryId` - Delete a specific category.
- `GET /category/:categoryId/subcategories` - Get subcategories for a specific category.

### Subcategory Routes

- `POST /subcategory` - Create a new subcategory.
- `GET /subcategories` - List all subcategories.
- `PUT /subcategory/:subcategoryId` - Update a specific subcategory.
- `DELETE /subcategory/:subcategoryId` - Delete a specific subcategory.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/smart-buy.git
   cd smart-buy

2. **Setup Frontend:**
    ```bash
    cd shopping-cart
    npm install
    npm start
3. **Setup environment variables:**
    Setup all the firebase project details and the stripe key details in the env file

4. **Setup Backend:**
    ```bash
    cd server
    npm install
    npm start

5. **Set up Firebase configuration:**
    Do add your firebase Service account key json in config file. And add Mongodb database username and password in the env file

## Features

- Frontend: Visit http://localhost:3000 to use the application.
    

