# MERN E-Commerce

Project e-commerce berbasis MERN stack (MongoDB, Express, React, Node.js) dengan fitur user marketplace dan admin panel.

## Fitur Utama

- Autentikasi user: register dan login.
- Marketplace: lihat daftar produk, detail produk, cart, place order, my orders, dan order detail.
- Admin panel: login admin, dashboard, kelola produk, kelola order, dan edit profil admin.
- Produk bisa dibuat dengan gambar upload Cloudinary atau tanpa gambar (otomatis placeholder).

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS.
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary.

## Struktur Project

```bash
mern-ecommerce/
  client/   # Frontend React + Vite
  server/   # Backend Express + MongoDB
```

## Prasyarat

- Node.js 18+ (disarankan LTS terbaru)
- npm
- MongoDB URI (Atlas/local)
- Akun Cloudinary

## Setup Environment Variables

### Backend (`server/.env`)

Buat file `server/.env` lalu isi:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`client/.env`)

Buat file `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Instalasi

Jalankan perintah berikut dari root project.

### 1) Install dependency backend

```bash
cd server
npm install
```

### 2) Install dependency frontend

```bash
cd ../client
npm install
```

## Menjalankan Project (Development)

Gunakan 2 terminal terpisah.

### Terminal 1 - Backend

```bash
cd server
npm run dev
```

Server API berjalan di `http://localhost:5000`.

### Terminal 2 - Frontend

```bash
cd client
npm run dev
```

Frontend berjalan di URL yang muncul di terminal Vite (umumnya `http://localhost:5173`).

## Script NPM

### Client (`client/package.json`)

- `npm run dev` - Jalankan Vite dev server.
- `npm run build` - Build untuk production.
- `npm run preview` - Preview hasil build.
- `npm run lint` - Jalankan ESLint.

### Server (`server/package.json`)

- `npm run dev` - Jalankan server dengan nodemon.
- `npm start` - Jalankan server mode normal.

### Script Utility Server

- `node scripts/resetAdminPassword.js` - Reset password admin `admin@test.com` ke `Admin12345`.
- `node scripts/seedProductsNoImage.js` - Isi data contoh produk tanpa upload gambar.

## Endpoint API Utama

### User

- `POST /api/users/register`
- `POST /api/users/login`
- `PUT /api/users/profile` (login)

### Product

- `GET /api/products` (public)
- `GET /api/products/:id` (public)
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Order

- `POST /api/orders` (login)
- `GET /api/orders/myorders` (login)
- `GET /api/orders/:id` (login)
- `GET /api/orders` (admin)
- `PUT /api/orders/:id/deliver` (admin)

## Catatan

- Token autentikasi disimpan di `localStorage` pada frontend.
- Upload gambar produk menggunakan `multipart/form-data` (opsional saat create).
- Pastikan akun admin memiliki `isAdmin: true` di database agar bisa mengakses route admin.
- Demi keamanan, hindari commit file `.env` ke repository publik.
