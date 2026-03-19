import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getAllOrders, markDelivered } from "../../api/orderApi";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const { data } = await getAllOrders();
    setOrders(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AdminLayout title="Orders">
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.name}</td>
              <td>Rp {o.totalPrice}</td>
              <td>
                {o.isDelivered ? "Delivered" : "Pending"}
              </td>
              <td>
                {!o.isDelivered && (
                  <button
                    onClick={() => markDelivered(o._id)}
                    className="text-indigo-600"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default OrderList;
