import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../../api/authApi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      if (!data.isAdmin) throw new Error("Not admin");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/admin/products");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-100 to-indigo-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-7"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          Admin Login
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Masuk sebagai admin untuk mengelola toko
        </p>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <div className="space-y-1 mb-3">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="admin@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1 mb-5">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            placeholder="Masukkan password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 text-white py-2.5 text-sm font-medium hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Login Admin"}
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Kembali ke{" "}
          <Link to="/" className="text-indigo-600 font-medium hover:underline">
            halaman utama
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
