import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/userApi";

const Login = () => {
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
      const data = await loginUser(email, password);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-7 rounded-2xl shadow-lg border border-gray-100"
      >
        <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">
          Login
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Masuk untuk melanjutkan belanja
        </p>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}

        <div className="space-y-1 mb-3">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="nama@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1 mb-5">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Masukkan password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        <p className="text-sm mt-4 text-center">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium"
          >
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
