import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  const updateQty = (id, qty) => {
    const updated = cart.map((i) =>
      i._id === id ? { ...i, qty: Number(qty) } : i
    );
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (id) => {
    const updated = cart.filter((i) => i._id !== id);
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">Keranjang</h1>
        <p className="text-sm text-gray-500 mb-6">
          Tinjau produk sebelum lanjut checkout.
        </p>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-gray-600">Keranjang kamu masih kosong.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Belanja Sekarang
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatRupiah(item.price)}
                    </p>
                  </div>

                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item._id, e.target.value)
                    }
                    className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
                  />

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit">
              <h3 className="font-semibold text-gray-800 mb-4">Ringkasan</h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Jumlah item</span>
                <span>
                  {cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </div>
              <div className="border-t pt-3 mb-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
              <button
                onClick={() => navigate("/placeorder")}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
              >
                Lanjut Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
