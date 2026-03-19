import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orderApi";
import UserNavbar from "../../components/UserNavbar";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  /* ===== PROTECT ROUTE ===== */
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [userInfo, cart.length, navigate]);

  if (!userInfo) return null; // prevent render flicker

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = 10000;
  const totalPrice = itemsPrice + shippingPrice;

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  const placeOrderHandler = async () => {
    if (cart.length === 0 || placingOrder) return;
    setError("");
    setPlacingOrder(true);

    const order = {
      orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      })),
      shippingAddress: {
        address: "Jl. Contoh",
        city: "Denpasar",
        postalCode: "80111",
        country: "Indonesia",
      },
      paymentMethod: "COD",
      itemsPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      const { data } = await createOrder(order);
      localStorage.removeItem("cartItems");
      window.dispatchEvent(new Event("cart-updated"));
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal membuat pesanan");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-1 text-gray-800">
          Konfirmasi Pesanan
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Periksa detail pesanan kamu sebelum checkout.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Item Pesanan</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.qty} x {formatRupiah(item.price)}
                    </p>
                  </div>
                  <p className="font-medium">{formatRupiah(item.qty * item.price)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit">
            <h3 className="font-semibold text-gray-800 mb-4">Ringkasan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Items</span>
                <span>{formatRupiah(itemsPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{formatRupiah(shippingPrice)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
                {error}
              </p>
            )}

            <button
              onClick={placeOrderHandler}
              disabled={placingOrder || cart.length === 0}
              className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {placingOrder ? "Memproses..." : "Buat Pesanan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
