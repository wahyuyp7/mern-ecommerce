import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import AdminForm from "../../components/AdminForm";
import { createProduct } from "../../api/productApi";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    countInStock: "",
  });
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) {
      fd.append("image", image);
    }

    try {
      await createProduct(fd);
      navigate("/admin/products");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Create Product">
      <AdminForm
        onSubmit={submit}
        submitText={submitting ? "Creating..." : "Create Product"}
      >
        {["name","price","category","countInStock"].map((k) => (
          <div key={k} className="space-y-1">
            <label className="text-sm font-medium capitalize text-gray-700">
              {k}
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              placeholder={`Input ${k}`}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              required
            />
          </div>
        ))}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            placeholder="Input description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Image (opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </AdminForm>
    </AdminLayout>
  );
};

export default ProductCreate;
