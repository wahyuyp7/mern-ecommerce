import { NavLink, useNavigate } from "react-router-dom";

const AdminLayout = ({ title, children }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  const navClass = ({ isActive }) =>
    [
      "block rounded-lg px-3 py-2 text-sm",
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white",
    ].join(" ");

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 p-4">
        <div className="mb-6 text-white">
          <h1 className="text-lg font-semibold">Admin</h1>
          <p className="text-xs text-gray-400">Dashboard</p>
        </div>

        <nav className="space-y-1">
          <NavLink to="/admin/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/admin/product/create" className={navClass}>
            Create Product
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">
            {title}
          </h2>
          <button
            onClick={logout}
            className="text-sm rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-100"
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
