import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { getProducts, deleteProduct } from "../../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (confirm("Delete product?")) {
      await deleteProduct(id);
      load();
    }
  };

  return (
    <AdminLayout title="Products">
      <div className="mb-4 flex justify-end">
        <Link
          to="/admin/product/create"
          className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700"
        >
          + Create
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p._id}>
                <td className="p-3">
                  <img
                    src={p.image}
                    className="h-10 w-10 rounded object-cover"
                  />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">Rp {p.price}</td>
                <td className="p-3 text-right space-x-3">
                  <Link
                    to={`/admin/product/${p._id}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ProductList;
