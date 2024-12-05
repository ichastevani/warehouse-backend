const bcrypt = require("bcrypt");
const { createUser } = require("../models/userModel"); // Import model

// Controller untuk Sign Up
const signUp = async (req, res) => {
    const { fullname, email, phone, role, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user ke database
        const result = await createUser(fullname, email, phone, hashedPassword);

    res
      .status(201)
      .json({
        message: "User registered successfully",
        userId: result.insertId,
      });
  } catch (err) {
    console.error("Error in signUp controller:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { id, name, email, phone } = req.body;

  try {
    await userModel.updateUser({ id, name, email, phone });
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user profile", error });
  }
};

module.exports = { signUp, updateUserProfile };