## Description

Based on [Next.js](https://nextjs.org/) framework.

[Ant Design](https://www.postgresql.org/) as React UI library.

[MongoDB](https://www.mongodb.com/) as database.

[TypeScript](https://www.typescriptlang.org/) language for code programming.

[NextAuth.js](https://next-auth.js.org/) for authentication.

## Getting Started

First, create local mongodb instance, create admin user, create database "config-editor" with collections: admins, walletLinkAddresses, serverAddresses, serverGroups.
Add user in collection `admins` (password must by hashed by Bcrypt).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About project

Demo: [https://youtu.be/AsOcLKKA6tA](https://youtu.be/AsOcLKKA6tA)

Endpoints:
Public:
```
POST /api/login: Login into app
GET /api/serverConfig: Returns full server config.
```

Private:
Endpoints for Server Groups:
```
GET /api/serverGroups: Returns an array of all Server Group objects.
GET /api/serverGroups/{id}: Returns a single Server Group object with the specified id.
POST /api/serverGroups: Creates a new Server Group object with the data provided in the request body.
PUT /api/serverGroups/{id}: Updates the Server Group object with the specified id with the data provided in the request body.
DELETE /api/serverGroups/{id}: Deletes the Server Group object with the specified id.
```

Endpoints for Server Addresses:
```
GET /api/serverAddresses: Returns an array of all Server Address objects.
GET /api/serverAddresses/{id}: Returns a single Server Address object with the specified id.
POST /api/serverAddresses: Creates a new Server Address object with the data provided in the request body.
PUT /api/serverAddresses/{id}: Updates the Server Address object with the specified id with the data provided in the request body.
DELETE /api/serverAddresses/{id}: Deletes the Server Address object with the specified id.
```

Endpoints for Wallet Link Addresses:
```
GET /api/walletLinkAddresses: Returns an array of all Wallet Link Address objects.
GET /api/walletLinkAddresses/{id}: Returns a single Wallet Link Address object with the specified id.
POST /api/walletLinkAddresses: Creates a new Wallet Link Address object with the data provided in the request body.
PUT /api/walletLinkAddresses/{id}: Updates the Wallet Link Address object with the specified id with the data provided in the request body.
DELETE /api/walletLinkAddresses/{id}: Deletes the Wallet Link Address object with the specified
```