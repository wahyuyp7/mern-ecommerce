import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const adminLogin = async (email, password) => {
  const { data } = await axios.post(
    `${API_URL}/api/users/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
