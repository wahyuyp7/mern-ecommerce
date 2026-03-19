import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return null;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <img
        src={product.image}
        className="w-full rounded-xl"
      />

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-600">
          {product.description}
        </p>
        <p className="mt-4 font-semibold">
          Rp {product.price}
        </p>

        <button
          onClick={addToCart}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
