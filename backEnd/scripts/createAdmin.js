const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../db/User.model");
const connectToMongoDb = require("../db/index");

async function createAdmin() {
  // 1. Check if env variables exist before starting
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    throw new Error("Missing ADMIN credentials in .env file");
  }

  // 2. Connect
  await connectToMongoDb();

  // 3. Logic
  const existingAdmin = await User.findOne({
    userName: process.env.ADMIN_USERNAME,
  });

  if (existingAdmin) {
    console.log("user already exists");
    await mongoose.connection.close(); // Close connection gracefully
    process.exit(0);
  }
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const user = await User.create({
    fullName: process.env.ADMIN_FULL_NAME,
    userName: process.env.ADMIN_USERNAME,
    password: hashedPassword,
    role: "user",
  });
  if (user.role === "admin") console.log("Admin created successfully");
  else console.log("user created successfully");
  await mongoose.connection.close();
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error("Critical Error:", err.message);
  process.exit(1);
});
