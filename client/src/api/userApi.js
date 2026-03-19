import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginUser = async (email, password) => {
  const { data } = await axios.post(
    `${API_URL}/api/users/login`,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await axios.post(
    `${API_URL}/api/users/register`,
    { name, email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return data;
};
