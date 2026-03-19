# Client - MERN E-Commerce

Frontend e-commerce berbasis React + Vite.

## Fitur Frontend

- User flow: home, product detail, cart, place order, my orders, order detail.
- Auth: login dan register user.
- Admin flow: admin login, dashboard produk, create/edit produk, list order, admin profile.
- UI modern dengan Tailwind CSS dan komponen reusable.

## Tech Stack

- React
- React Router
- Axios
- Tailwind CSS
- Vite

## Environment Variable

Buat file `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Menjalankan Frontend

```bash
npm install
npm run dev
```

Dev server default: `http://localhost:5173`

## Script NPM

- `npm run dev` - Jalankan Vite dev server.
- `npm run build` - Build production.
- `npm run preview` - Preview hasil build.
- `npm run lint` - Jalankan ESLint.

## Catatan Integrasi API

- Semua request API menggunakan `VITE_API_URL`.
- Token user/admin disimpan di `localStorage` (`userInfo`).
- Cart disimpan di `localStorage` (`cartItems`) dan navbar update realtime saat cart berubah.
