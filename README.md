# TrendHive

## Overview

This package includes the client component of A E-commerce web application.

**[LIVE LINK](https://trend-hive-neon.vercel.app/)**

### admin email: joydharsamrat@gmail.com

### admin pass: 123456

## Features

- Secure sign-up and login using JWT.
- Admins can create, update, and delete Products.
- Users can see products and and add to their carts for ordering later.
- Admins can view and manage all user and make other users admin.

## Technologies Used

- Frontend: Next.js, Typescript, Tailwind css, daisy ui, rtk.query, axios
- Backend: Node.js, Express.js, Typescript
- Authentication: JWT (JSON Web Tokens)
- Database: MongoDB, Mongoose
- Payment: Aamarpay

## Cloning the Repositories

clone the repository:

```sh
client: git clone https://github.com/joydharsamrat/trend-hive.git
server: git clone https://github.com/joydharsamrat/trend-hive-server.git
```

## Installing Dependencies

Navigate to the directory and install the required dependencies using npm.

```sh
client:
cd trend-hive
npm install

server:
cd trend-hive-server
npm install
```

## Environment Configuration

Create a .env file in the root directory with the following contents:

client:

```sh
NEXT_PUBLIC_BASE_API=YOUR_SERVER_BASE_API

```

Server:

```sh
NODE_ENV=ENVIRONMENT_OF_THE_APP
PORT=THE_PORT_THIS_APP_WILL_RUN_ON
DB_URL=YOUR_DATABASE_URL
BCRYPT_SALT_ROUNDS=SALT_ROUNDS_FOR_BCRYPT
JWT_ACCESS_TOKEN_SECRET=SECRET_FOR_JWT_ACCESS_TOKEN
JWT_ACCESS_EXPIRES_IN=ACCESS_TOKEN_EXPIRE_TIME
JWT_REFRESH_TOKEN_SECRET=SECRET_FOR_JWT_REFRESH_TOKEN
JWT_REFRESH_EXPIRES_IN=REFRESH_TOKEN_EXPIRE_TIME

```

## Running the Application Locally

Run the development server:

```sh
Client: npm run dev
Server: npm run dev
```
