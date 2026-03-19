import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import UserNavbar from "../../components/UserNavbar";
import { FiSearch, FiShoppingCart, FiTrendingUp } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import {
  MdOutlineElectricBolt,
  MdOutlineCheckroom,
  MdOutlineHome,
  MdOutlinePhoneIphone,
} from "react-icons/md";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Semua", icon: FiTrendingUp },
    { name: "Elektronik", icon: MdOutlineElectricBolt },
    { name: "Fashion", icon: MdOutlineCheckroom },
    { name: "Rumah Tangga", icon: MdOutlineHome },
    { name: "Gadget", icon: MdOutlinePhoneIphone },
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
    load();
  }, []);

  /* ================= CART ================= */
  const addToCart = (product) => {
    const updated = [...cartItems];
    const exist = updated.find((i) => i._id === product._id);

    if (exist) {
      exist.qty += 1;
    } else {
      updated.push({ ...product, qty: 1 });
    }

    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  /* ================= FILTER ================= */
  const filteredProducts = products
    .filter((p) =>
      activeCategory === "Semua"
        ? true
        : p.category?.toLowerCase() ===
          activeCategory.toLowerCase()
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const formatRupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(n);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm mb-5">
              <FiTrendingUp />
              Produk Terlaris
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Belanja Mudah,
              <br />
              <span className="text-yellow-300">
                Harga Bersahabat
              </span>
            </h1>

            <p className="text-blue-100 mb-8 text-base md:text-lg">
              Ribuan produk pilihan dengan pengiriman cepat dan aman.
            </p>

            {/* SEARCH FIXED */}
            <div className="mt-8 max-w-xl">
              <div className="flex items-center bg-white rounded-2xl shadow-xl overflow-hidden ring-4 ring-blue-500/20">
                <div className="pl-4 text-gray-400">
                  <FiSearch className="w-5 h-5" />
                </div>

                <input
                  type="text"
                  placeholder="Cari produk, kategori, atau merek..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-4 text-gray-800 placeholder-gray-400 focus:outline-none text-sm md:text-base"
                />

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 font-semibold transition">
                  Cari
                </button>
              </div>

              <p className="text-blue-100 text-sm mt-3">
                Contoh: kopi, sepatu, headphone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* CATEGORY */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActiveCategory(name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeCategory === name
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </div>

        {/* RESULT COUNT */}
        {!loading && (
          <p className="text-sm text-gray-500 mb-6">
            Menampilkan{" "}
            <strong>{filteredProducts.length}</strong> produk
          </p>
        )}

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {loading
            ? [...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-56 animate-pulse"
                />
              ))
            : filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <Link to={`/product/${p._id}`}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-44 w-full object-cover"
                    />
                  </Link>

                  <div className="p-4 flex flex-col">
                    <Link
                      to={`/product/${p._id}`}
                      className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-2"
                    >
                      {p.name}
                    </Link>

                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <AiFillStar className="w-4 h-4" />
                      <span className="text-xs text-gray-600">
                        4.5
                      </span>
                    </div>

                    <div className="mt-auto">
                      <p className="font-bold text-lg text-blue-600 mb-3">
                        {formatRupiah(p.price)}
                      </p>

                      <button
                        onClick={() => addToCart(p)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* EMPTY STATE */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-500 mb-6">
              Coba kata kunci atau kategori lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
