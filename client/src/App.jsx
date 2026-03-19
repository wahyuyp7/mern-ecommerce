import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== USER / MARKETPLACE ===== */
import Home from "./pages/home/Home";
import ProductDetail from "./pages/product/ProductDetail";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/order/PlaceOrder";

/* ===== USER AUTH ===== */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ===== ADMIN ===== */
import AdminLogin from "./pages/auth/AdminLogin";
import ProductList from "./pages/admin/ProductList";
import ProductCreate from "./pages/admin/ProductCreate";
import ProductEdit from "./pages/admin/ProductEdit";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== PUBLIC / USER ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />

        {/* ===== USER AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== ADMIN LOGIN ===== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ===== ADMIN (PROTECTED) ===== */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/create" element={<ProductCreate />} />
          <Route path="/admin/product/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
