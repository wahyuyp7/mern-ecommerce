import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import UserNavbar from "../../components/UserNavbar";
import { FiSearch, FiTrendingUp } from "react-icons/fi";
import {
  MdOutlineElectricBolt,
  MdOutlineCheckroom,
  MdOutlineHome,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import ProductCard from "./ProductCard";

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
    window.dispatchEvent(new Event("cart-updated"));
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
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl">
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

              <div className="mt-8 max-w-2xl">
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

                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 font-semibold transition">
                    Cari
                  </button>
                </div>

              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/20 text-white px-3 py-1.5">
                  {products.length} produk tersedia
                </span>
                <span className="rounded-full bg-white/20 text-white px-3 py-1.5">
                  Kategori populer setiap hari
                </span>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-white/20 blur-xl" />
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1000&q=80"
                  alt="Belanja online"
                  className="relative w-full h-[380px] object-cover rounded-3xl border border-white/30 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* CATEGORY */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeCategory === category.name
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
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
                  className="bg-white rounded-2xl border border-gray-100 h-56 animate-pulse"
                />
              ))
            : filteredProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onAddToCart={addToCart}
                  formatRupiah={formatRupiah}
                />
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
