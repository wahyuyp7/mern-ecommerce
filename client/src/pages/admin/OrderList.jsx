import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAllOrders, markDelivered } from "../../api/orderApi";
import { FiCheckCircle, FiClock, FiCreditCard } from "react-icons/fi";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await getAllOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelivered = async (id) => {
    await markDelivered(id);
    load();
  };

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  const deliveredCount = orders.filter((o) => o.isDelivered).length;
  const pendingCount = orders.length - deliveredCount;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <AdminLayout title="Orders">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <FiClock className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Delivered</p>
            <FiCheckCircle className="text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">{deliveredCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <FiCreditCard className="text-indigo-600" />
          </div>
          <p className="text-lg font-bold text-gray-800 mt-2">{formatRupiah(totalRevenue)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>
                  Belum ada order.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td className="p-3 text-gray-500">{o._id.slice(-8)}</td>
                  <td className="p-3">{o.user?.name || "-"}</td>
                  <td className="p-3">{formatRupiah(o.totalPrice)}</td>
                  <td className="p-3 text-gray-600">{o.paymentMethod || "-"}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        o.isDelivered
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {!o.isDelivered ? (
                      <button
                        onClick={() => handleDelivered(o._id)}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
                      >
                        Mark Delivered
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrderList;
