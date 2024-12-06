const bcrypt = require("bcrypt");
const { createUser, updateUserPassword, getUserById } = require("../models/userModel"); // Import model user
const Company = require("../models/companyModel"); // Import model company

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

    const userId = result.insertId; // Dapatkan userId dari hasil insert

    // Buat entry default di tabel companies
    await Company.add({ user_id: userId });

    res.status(201).json({
      message: "User registered successfully",
      userId,
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

const changePassword = async (req, res) => {
  const userId = req.params.userId;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "New password and confirmation do not match" });
  }

  try {
    // Fetch the user's current password from the database
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password matches the current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await updateUserPassword(userId, hashedPassword);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp, updateUserProfile, changePassword };
