import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";
import UserNavbar from "../../components/UserNavbar";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const loadOrder = async () => {
      try {
        const { data } = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Gagal memuat detail order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, userInfo, navigate]);

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <div className="mb-4">
          <Link to="/myorders" className="text-sm text-indigo-600 hover:underline">
            ← Kembali ke My Orders
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-800">Order Detail</h1>
        <p className="text-sm text-gray-500 mb-6">ID: {id}</p>

        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-gray-500">
            Loading order detail...
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Item Pesanan</h2>
              <div className="space-y-4">
                {order?.orderItems?.map((item, idx) => (
                  <div
                    key={`${item.product}-${idx}`}
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
                  <span>{formatRupiah(order?.itemsPrice || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{formatRupiah(order?.shippingPrice || 0)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatRupiah(order?.totalPrice || 0)}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Status Pengiriman</p>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    order?.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order?.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p>Payment: {order?.paymentMethod || "-"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
