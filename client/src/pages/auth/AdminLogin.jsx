import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/authApi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await adminLogin(email, password);
      if (!data.isAdmin) throw new Error("Not admin");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/admin/products");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white rounded-xl shadow p-6"
      >
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Admin Login
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        )}

        <input
          className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-lg bg-indigo-600 text-white py-2 text-sm hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
