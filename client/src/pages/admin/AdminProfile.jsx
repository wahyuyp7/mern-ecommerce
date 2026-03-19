import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { updateUserProfile } from "../../api/userApi";

const AdminProfile = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const [name, setName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password && password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    try {
      setLoading(true);
      const payload = { name, email };
      if (password) payload.password = password;

      const data = await updateUserProfile(payload);
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.dispatchEvent(new Event("user-updated"));
      setPassword("");
      setConfirmPassword("");
      setSuccess("Profil admin berhasil diperbarui");
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal update profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Admin Profile">
      <form
        onSubmit={submitHandler}
        className="max-w-xl bg-white rounded-xl shadow p-6 space-y-4"
      >
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {success}
          </p>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Nama</label>
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Password Baru (opsional)
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kosongkan jika tidak ingin ganti"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Konfirmasi Password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Ulangi password baru"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </AdminLayout>
  );
};

export default AdminProfile;
