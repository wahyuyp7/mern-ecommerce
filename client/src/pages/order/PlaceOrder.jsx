import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orderApi";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  /* ===== PROTECT ROUTE ===== */
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null; // prevent render flicker

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrderHandler = async () => {
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
      shippingPrice: 10000,
      totalPrice: itemsPrice + 10000,
    };

    const { data } = await createOrder(order);

    localStorage.removeItem("cartItems");
    navigate(`/order/${data._id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Konfirmasi Pesanan
      </h1>

      <p className="mb-4">
        Total: <strong>Rp {itemsPrice + 10000}</strong>
      </p>

      <button
        onClick={placeOrderHandler}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Buat Pesanan
      </button>
    </div>
  );
};

export default PlaceOrder;
