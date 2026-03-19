import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);

  const updateQty = (id, qty) => {
    const updated = cart.map((i) =>
      i._id === id ? { ...i, qty: Number(qty) } : i
    );
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((i) => i._id !== id);
    setCart(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>

      {cart.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4 bg-white p-4 rounded shadow"
            >
              <div>
                <h2>{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Rp {item.price}
                </p>
              </div>

              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  updateQty(item._id, e.target.value)
                }
                className="w-16 border rounded px-2 py-1"
              />

              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="text-right font-bold mb-4">
            Total: Rp {total}
          </div>

          <button
            onClick={() => navigate("/placeorder")}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
