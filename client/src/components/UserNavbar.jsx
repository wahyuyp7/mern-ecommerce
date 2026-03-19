import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogOut, FiPackage, FiShoppingBag } from "react-icons/fi";

const readStorageJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

/* ICON CART */
const IconCart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
    viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293
         c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0
         100 4 2 2 0 000-4zm-8 2a2 2 0
         11-4 0 2 2 0 014 0z" />
  </svg>
);

const UserNavbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [user, setUser] = useState(() =>
    readStorageJson("userInfo", null)
  );
  const [cartCount, setCartCount] = useState(() => {
    const cart = readStorageJson("cartItems", []);
    return cart.reduce((a, c) => a + c.qty, 0);
  });
  const [cartBump, setCartBump] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutside);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
    };
  }, []);

  useEffect(() => {
    const syncUser = () => {
      setUser(readStorageJson("userInfo", null));
    };

    window.addEventListener("user-updated", syncUser);

    return () => {
      window.removeEventListener("user-updated", syncUser);
    };
  }, []);

  useEffect(() => {
    const readCartCount = () => {
      const cart = readStorageJson("cartItems", []);
      const nextCount = cart.reduce((sum, item) => sum + item.qty, 0);
      setCartCount((prev) => {
        if (nextCount > prev) {
          setCartBump(true);
        }
        return nextCount;
      });
    };

    const onStorage = (event) => {
      if (event.key === "cartItems") {
        readCartCount();
      }
    };

    readCartCount();
    window.addEventListener("storage", onStorage);
    window.addEventListener("cart-updated", readCartCount);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cart-updated", readCartCount);
    };
  }, []);

  useEffect(() => {
    if (!cartBump) return;
    const timer = setTimeout(() => setCartBump(false), 220);
    return () => clearTimeout(timer);
  }, [cartBump]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.dispatchEvent(new Event("user-updated"));
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-indigo-600 text-white">
            <FiShoppingBag className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            TokoKu
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/myorders"
              className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Pesanan Saya
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <Link
            to="/cart"
            className={`relative inline-flex items-center justify-center h-10 w-10 rounded-xl border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition ${
              cartBump ? "scale-110" : "scale-100"
            }`}
            aria-label="Keranjang"
          >
            <IconCart />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] min-w-5 h-5 px-1 rounded-full grid place-items-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {!user ? (
            <div className="flex items-center gap-2 text-sm">
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-1.5 hover:bg-gray-50"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
                  className="h-8 w-8 rounded-lg"
                />
                <span className="text-sm text-gray-700 hidden sm:block max-w-24 truncate">
                  {user.name}
                </span>
                <FiChevronDown className="text-gray-500" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg p-1.5">
                  <Link
                    to="/myorders"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <FiPackage className="h-4 w-4" />
                    My Orders
                  </Link>
                  <Link
                    to={user?.isAdmin ? "/admin/products" : "/myorders"}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <FiShoppingBag className="h-4 w-4" />
                    {user?.isAdmin ? "Dashboard Admin" : "Profile"}
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm rounded-lg text-rose-600 hover:bg-rose-50"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
