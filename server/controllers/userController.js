import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../middleware/validateMiddleware.js";
import generateToken from "../utils/generateToken.js";

// REGISTER
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Semua field wajib diisi");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, "Email sudah terdaftar");
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// LOGIN
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Email atau password salah");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});
