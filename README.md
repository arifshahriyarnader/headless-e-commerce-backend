# Headless-E-Commerce-backend

## Overview

This project is a backend solution for a headless e-commerce system.  
It manages products, carts, promo codes, and orders, including payment processing and reporting.

---

## Features

- **Catalog**
  - Products with multiple variants and prices.

- **Cart**
  - Create and fetch carts (guest via token).
  - Add, update, and remove items.

- **Promos**
  - Support for `PERCENT` or `FIXED` discount types.
  - Promo validity window enforcement.

- **Checkout**
  - Create an order from a cart.
  - Apply promo codes during checkout.

- **Order Management**
  - Track orders with statuses: `PLACED`, `DELIVERED`, `CANCELLED`.
  - Payment statuses: `PENDING`, `PAID`, `FAILED`.
  - Automatic order status updates:
    - `PAID` → `DELIVERED`
    - `FAILED` → `CANCELLED`
  - Sales and promo usage reports using aggregation pipelines.

- **Validation & Error Handling**
  - Request validation using **Zod**.
  - Handles missing or invalid inputs gracefully.

---

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **TypeScript**
- **Zod** for request validation
- **Postman** for testing

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/arifshahriyarnader/headless-e-commerce-backend.git

2. Navigate to the server folder
    ```bash
    cd server

3. Install dependecies
    ```bash
    npm install

4. Create a .env file
    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string

5. Start the server
    ```bash
    npm run dev


## Folder Structure

    server/
        src/
        config/
        controllers/
        middleware/
        models/
        routes/api
        services/
        validations/


# Thank You.