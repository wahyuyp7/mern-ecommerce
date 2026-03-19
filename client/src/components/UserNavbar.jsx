import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);

  /* LOAD USER & CART */
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    const cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const count = cart.reduce((a, c) => a + c.qty, 0);
    setCartCount(count);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TokoKu
        </Link>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-6 relative">
          
          {/* CART */}
          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
            <IconCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* AUTH */}
          {!user ? (
            <div className="flex gap-3 text-sm">
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* AVATAR */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm hidden sm:block">
                  {user.name}
                </span>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                  <Link
                    to="/myorders"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
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
