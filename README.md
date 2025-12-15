<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# My Books Backend

A RESTful API for an online book store built with [NestJS](https://nestjs.com/), MongoDB, and Redis.

> **Note:** Payment integration (e.g., sending API requests to Mountebank or a payment gateway) is **not yet implemented**.

---

## Features

- **Book Catalog Management** - Browse available books with details (title, genre, price, stock)
- **Shopping Cart** - Redis-backed cart system with real-time stock validation
- **Order Management** - Create orders with cart items and shipping details
- **RESTful API** - Clean, well-structured endpoints following REST principles
- **Comprehensive Testing** - Unit and integration tests with high coverage

---

## Tech Stack

- **Framework:** NestJS (Node.js/TypeScript)
- **Database:** MongoDB (via Mongoose)
- **Cache/Session Store:** Redis
- **Validation:** class-validator, class-transformer
- **Testing:** Jest

---

## Project Structure

```
src/
├── books/          # Book catalog module
├── carts/          # Shopping cart module
├── orders/         # Order management module
├── redis/          # Redis service module
├── common/         # Shared constants and utilities
└── main.ts         # Application entry point
```

---

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore
REDIS_URL=redis://localhost:6379
```

---

## Installation

```bash
npm install
```

---

## Running the Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

The API will be available at `http://localhost:3000`

---

## API Endpoints

### Books
- `GET /books` — Get list of available books

### Cart
- `POST /carts/add` — Add a book to cart
  ```json
  {
    "bookId": "string",
    "quantity": number,
    "cartId": "string" (optional)
  }
  ```
- `PATCH /carts/:cartId` — Get cart details with items
- `GET /carts/:cartId` — Get checkout summary

### Orders
- `POST /orders/create` — Create order from cart
  ```json
  {
    "cartId": "string",
    "shippingAddress": "string"
  }
  ```

See the HTTP request files in each module directory for examples:
- [src/books/books.http](src/books/books.http)
- [src/carts/carts.http](src/carts/carts.http)
- [src/orders/orders.http](src/orders/orders.http)

---

## Testing

```bash
# unit tests
npm run test

# test coverage
npm run test:cov

# e2e tests
npm run test:e2e

# watch mode
npm run test:watch
```

---

## Architecture

The application follows NestJS best practices with a modular architecture:

- **Controllers** - Handle HTTP requests and responses
- **Services** - Contain business logic
- **Repositories** - Data access layer (MongoDB/Redis)
- **DTOs** - Data validation and transformation
- **Schemas** - MongoDB document schemas

Key services:
- [`BooksService`](src/books/books.service.ts) - Manages book catalog and stock
- [`CartsService`](src/carts/carts.service.ts) - Shopping cart operations
- [`OrdersService`](src/orders/orders.service.ts) - Order creation and processing
- [`RedisService`](src/redis/redis.service.ts) - Redis client wrapper

---

## Roadmap

- [x] Book catalog API
- [x] Shopping cart with Redis
- [x] Order creation
- [x] Stock validation
- [ ] Payment integration (Mountebank/payment gateway)
- [ ] User authentication
- [ ] Order history
- [ ] Inventory management

---

## License

This project is [MIT licensed](LICENSE).

---

## Stay in touch

Built with [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.