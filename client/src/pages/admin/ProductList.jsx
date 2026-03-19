import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { getProducts, deleteProduct } from "../../api/productApi";
import { FiBox, FiDollarSign, FiPackage } from "react-icons/fi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
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

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  const totalStock = products.reduce((sum, p) => sum + (p.countInStock || 0), 0);
  const totalValue = products.reduce(
    (sum, p) => sum + (p.price || 0) * (p.countInStock || 0),
    0
  );

  return (
    <AdminLayout title="Products">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Produk</p>
            <FiBox className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Stok</p>
            <FiPackage className="text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">{totalStock}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Nilai Inventori</p>
            <FiDollarSign className="text-indigo-600" />
          </div>
          <p className="text-lg font-bold text-gray-800 mt-2">{formatRupiah(totalValue)}</p>
        </div>
      </div>

      <div className="mb-4 flex justify-end">
        <Link
          to="/admin/product/create"
          className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-700"
        >
          + Create Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[680px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td className="p-3 text-gray-500" colSpan={6}>
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-500" colSpan={6}>
                  Belum ada produk.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-10 w-10 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-700">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.category || "-"}</td>
                  <td className="p-3">{formatRupiah(p.price)}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        (p.countInStock || 0) > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.countInStock || 0}
                    </span>
                  </td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ProductList;
