import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { updateProduct } from "../../api/productApi"

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

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      )

      setForm({
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
        countInStock: data.countInStock,
      })

      setImagePreview(data.image)
    }

    fetchProduct()
  }, [id])

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) =>
      formData.append(k, v)
    )

    if (imageFile) {
      formData.append("image", imageFile)
    }

    await updateProduct(id, formData)
    navigate("/admin/products")
  }

  return (
    <div>
      <h2>Edit Product</h2>

      <form onSubmit={submitHandler}>
        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          placeholder="Price"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          placeholder="Description"
        />

        <input
          type="file"
          onChange={(e) => {
            setImageFile(e.target.files[0])
            setImagePreview(
              URL.createObjectURL(e.target.files[0])
            )
          }}
        />

        {imagePreview && (
          <img src={imagePreview} width="120" />
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default ProductEdit
