import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ===== USER / MARKETPLACE ===== */
import Home from "./pages/home/Home";
import ProductDetail from "./pages/product/ProductDetail";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/order/PlaceOrder";
import MyOrders from "./pages/order/MyOrders";
import OrderDetail from "./pages/order/OrderDetail";

/* ===== USER AUTH ===== */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ===== ADMIN ===== */
import AdminLogin from "./pages/auth/AdminLogin";
import ProductList from "./pages/admin/ProductList";
import ProductCreate from "./pages/admin/ProductCreate";
import ProductEdit from "./pages/admin/ProductEdit";
import OrderList from "./pages/admin/OrderList";
import AdminProfile from "./pages/admin/AdminProfile";
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
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetail />} />

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
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
