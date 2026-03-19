import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProductById, updateProduct } from "../../api/productApi"
import AdminLayout from "../../components/AdminLayout"
import AdminForm from "../../components/AdminForm"

const ProductEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    countInStock: "",
  })

  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await getProductById(id)

      setForm({
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
        countInStock: data.countInStock,
      })

      setImagePreview(data.image)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  const submitHandler = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) =>
      formData.append(k, v)
    )

    if (imageFile) {
      formData.append("image", imageFile)
    }

    try {
      await updateProduct(id, formData)
      navigate("/admin/products")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout title="Edit Product">
      {loading ? (
        <div className="rounded-xl bg-white p-6 shadow text-sm text-gray-500">
          Loading product...
        </div>
      ) : (
        <AdminForm
          onSubmit={submitHandler}
          submitText={submitting ? "Updating..." : "Update Product"}
        >
          {["name", "price", "category", "countInStock"].map((k) => (
            <div key={k} className="space-y-1">
              <label className="text-sm font-medium capitalize text-gray-700">
                {k}
              </label>
              <input
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                placeholder={`Input ${k}`}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Input description"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) => {
                const file = e.target.files[0]
                if (!file) return
                setImageFile(file)
                setImagePreview(URL.createObjectURL(file))
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt={form.name}
                className="h-24 w-24 rounded-lg object-cover border"
              />
            )}
          </div>
        </AdminForm>
      )}
    </AdminLayout>
  )
}

export default ProductEdit
