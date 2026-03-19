import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ product, onAddToCart, formatRupiah }) => {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
      <Link to={`/product/${product._id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          to={`/product/${product._id}`}
          className="text-sm font-medium text-gray-800 hover:text-indigo-600 line-clamp-2 mb-2 min-h-10"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1 text-yellow-500 mb-2">
          <AiFillStar className="w-4 h-4" />
          <span className="text-xs text-gray-600">4.5</span>
        </div>

        <div className="mt-auto">
          <p className="font-bold text-lg text-indigo-600 mb-3">
            {formatRupiah(product.price)}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="w-4 h-4" />
            Keranjang
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
