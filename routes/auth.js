const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Wrong Username or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong Username or Password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

module.exports = router;