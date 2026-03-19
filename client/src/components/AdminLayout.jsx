import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiLogOut,
  FiPackage,
  FiPlusSquare,
  FiUser,
} from "react-icons/fi";

const AdminLayout = ({ title, children }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  const navClass = ({ isActive }) =>
    [
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
      isActive
        ? "bg-indigo-50 text-indigo-700 font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    ].join(" ");

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 border-r border-gray-200 bg-white p-4 hidden md:block">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          <p className="text-xs text-gray-500">Kelola toko kamu</p>
        </div>

        <nav className="space-y-1">
          <NavLink to="/admin/products" className={navClass}>
            <FiGrid className="h-4 w-4" />
            Products
          </NavLink>
          <NavLink to="/admin/product/create" className={navClass}>
            <FiPlusSquare className="h-4 w-4" />
            Create Product
          </NavLink>
          <NavLink to="/admin/orders" className={navClass}>
            <FiPackage className="h-4 w-4" />
            Orders
          </NavLink>
          <NavLink to="/admin/profile" className={navClass}>
            <FiUser className="h-4 w-4" />
            Profile
          </NavLink>
        </nav>

        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Signed in as</p>
          <p className="text-sm font-semibold text-gray-800 truncate">
            {userInfo.name || "Admin"}
          </p>
          <p className="text-xs text-gray-500 truncate">{userInfo.email || "-"}</p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-xs md:text-sm text-gray-500">Dashboard management</p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-sm rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-100"
          >
            <FiLogOut className="h-4 w-4" />
            Logout
          </button>
        </header>

        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
