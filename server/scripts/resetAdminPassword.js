import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hash = await bcrypt.hash("Admin12345", 10);
    const result = await mongoose.connection.db.collection("users").updateOne(
      { email: "admin@test.com" },
      { $set: { password: hash, isAdmin: true } }
    );

    const user = await mongoose.connection.db
      .collection("users")
      .findOne({ email: "admin@test.com" });

    const verify = user?.password
      ? await bcrypt.compare("Admin12345", user.password)
      : false;

    console.log("matched:", result.matchedCount, "modified:", result.modifiedCount);
    console.log("verify:", verify);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
