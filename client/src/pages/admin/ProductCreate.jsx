import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import AdminForm from "../../components/AdminForm";
import { createProduct } from "../../api/productApi";

const ProductCreate = () => {
  const navigate = useNavigate();
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
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", image);

    await createProduct(fd);
    navigate("/admin/products");
  };

  return (
    <AdminLayout title="Create Product">
      <AdminForm onSubmit={submit} submitText="Create">
        {["name","price","category","countInStock"].map((k) => (
          <input
            key={k}
            className="w-full rounded-lg border px-3 py-2"
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
          />
        ))}
        <textarea
          className="w-full rounded-lg border px-3 py-2"
          placeholder="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </AdminForm>
    </AdminLayout>
  );
};

export default ProductCreate;
