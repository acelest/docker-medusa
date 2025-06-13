<p align="center">
  <a href="https://www.medusajs.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png" width="100" />
  </a>
</p>
<h1 align="center">
  🚀 Dockerized Medusa.js E-Commerce Project
</h1>

<h4 align="center">
  A complete dockerized e-commerce solution with Backend, Admin Panel, and Next.js Storefront
</h4>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## 📌 Project Overview

This project demonstrates how to containerize a complete Medusa.js e-commerce stack with Docker:

- **Medusa Backend**: Core e-commerce engine
- **Admin Panel**: Dashboard for store management
- **Next.js Storefront**: Customer-facing frontend application
- **PostgreSQL**: Database for data persistence
- **Redis**: For caching and pub/sub functionality

The project uses a well-structured architecture that separates source code from Docker configurations, providing better control over development and production environments.

---

## 🏗️ Project Structure

```
store-medusa-docker/
├── docker-compose.yml            # Main Docker Compose configuration
├── docker-compose.override.yml   # Development overrides
├── docker-compose.prod.yml       # Production settings
├── admin/                        # Admin panel Docker configuration
│   ├── Dockerfile
│   └── Dockerfile.prod
├── backend/                      # Medusa backend Docker configuration
│   ├── Dockerfile
│   ├── Dockerfile.prod
│   └── develop.sh
├── storefront/                   # Next.js storefront Docker configuration
│   ├── Dockerfile
│   └── Dockerfile.prod
├── my-medusa-store/              # Medusa backend source code
│   ├── package.json
│   ├── medusa-config.ts
│   └── ...
├── my-medusa-store-storefront/   # Next.js storefront source code
│   ├── package.json
│   ├── next.config.js
│   └── ...
└── README.md                     # Project documentation
```

## 🧠 Architecture Design

This project uses a separation of concerns approach:

- **Source Code Directories**:

  - `my-medusa-store` - Backend Medusa application generated with `create-medusa-app`
  - `my-medusa-store-storefront` - Storefront Next.js application

- **Docker Configuration Directories**:
  - `backend/` - Contains Dockerfile for Medusa backend
  - `admin/` - Contains Dockerfile for admin panel
  - `storefront/` - Contains Dockerfile for Next.js storefront

This separation provides better control over the build process for different environments, making it easier to maintain and deploy.

## 🚀 Getting Started

### Requirements

- Docker and Docker Compose installed on your system
- Git

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/store-medusa-docker.git
cd store-medusa-docker
```

2. Build and start the development environment:

```bash
docker compose up --build
```

After the initial build, you can start the containers without rebuilding:

```bash
docker compose up
```

3. Access your applications at:

<ul>
  <li><b>Medusa Server</b>: http://localhost:9000
  <li><b>Medusa Admin</b>: http://localhost:7000
  <li><b>Storefront</b>: http://localhost:8000
  <li><b>PostgreSQL</b>: localhost:5432
  <li><b>Redis</b>: localhost:6379
</ul>

> **Note:** If you change the dependencies of your projects by adding new packages, rebuild the affected service with `docker compose up --build` to update your environment.

### Seeding Your Medusa Store

Add sample data to your store:

```bash
docker exec medusa-server medusa seed -f ./data/seed.json
```

## 🔧 Production Deployment

This repository contains Dockerfiles for both development (`Dockerfile`) and production (`Dockerfile.prod`).

The production Dockerfiles create optimized images based on your local development progress:

1. Build and run production containers:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

2. For subsequent runs without rebuilding:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## ✨ Key Features

- **Development Mode**: Fast rebuilds with volume mounting for efficient development
- **Production Mode**: Optimized builds for deployment
- **Data Persistence**: Configured volumes for database data
- **Environment Isolation**: Separate configurations for development and production
- **Hot Reloading**: Changes to source code are reflected immediately in development

## 🔍 Environment Configuration

### Environment Variables

Create appropriate `.env` files in each project directory. Sample templates:

- For backend (`my-medusa-store/.env`):

  ```
  JWT_SECRET=your_jwt_secret
  COOKIE_SECRET=your_cookie_secret
  DATABASE_URL=postgres://postgres:postgres@postgres:5432/medusa-docker
  REDIS_URL=redis://redis:6379
  ```

- For storefront (`my-medusa-store-storefront/.env`):
  ```
  NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
  ```

## 📚 Resources

- [Medusa Documentation](https://docs.medusajs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

`docker-compose.production.yml` contains production relevant overrides to the services described in the `docker-compose.yml` development file.

## Try it out

```
curl -X GET localhost:9000/store/products | python -m json.tool
```

After the seed script has run you will have the following things in you database:

- a User with the email: admin@medusa-test.com and password: supersecret
- a Region called Default Region with the countries GB, DE, DK, SE, FR, ES, IT
- a Shipping Option called Standard Shipping which costs 10 EUR
- a Product called Cool Test Product with 4 Product Variants that all cost 19.50 EUR

Visit [docs.medusa-commerce.com](https://docs.medusa-comerce.com) for further guides.

<p>
  <a href="https://www.medusa-commerce.com">
    Website
  </a> 
  |
  <a href="https://medusajs.notion.site/medusajs/Medusa-Home-3485f8605d834a07949b17d1a9f7eafd">
    Notion Home
  </a>
  |
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    Twitter
  </a>
  |
  <a href="https://docs.medusa-commerce.com">
    Docs
  </a>
</p>
