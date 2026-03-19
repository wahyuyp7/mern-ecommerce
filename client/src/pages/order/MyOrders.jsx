import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrders } from "../../api/orderApi";
import UserNavbar from "../../components/UserNavbar";

const MyOrders = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const loadOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError(err?.response?.data?.message || "Gagal memuat order");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userInfo, navigate]);

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
        <h1 className="text-2xl font-bold mb-1 text-gray-800">My Orders</h1>
        <p className="text-sm text-gray-500 mb-6">
          Daftar semua pesanan kamu ada di sini.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="p-4">
                    <p className="text-red-600">{error}</p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-gray-500">
                    Kamu belum punya order.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-3 text-gray-600">{order._id.slice(-10)}</td>
                    <td className="p-3 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-3 font-medium">
                      {formatRupiah(order.totalPrice)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-indigo-600 font-medium hover:underline"
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
