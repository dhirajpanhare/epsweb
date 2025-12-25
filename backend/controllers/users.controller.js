import '../models/db.js';
import UserSchemaModel from '../models/users.model.js';
import randomstring from "randomstring";
import jwt from "jsonwebtoken";

// ------------------ Register ------------------
export const save = async (req, res) => {
  try {
    const users = await UserSchemaModel.find();
    const _id = users.length === 0 ? 1 : users[users.length - 1]._id + 1;

    const userDetails = {
      ...req.body,
      _id,
      status: 0,
      role: "admin",
      info: new Date()
    };

    await UserSchemaModel.create(userDetails);
    res.status(201).json({ status: true, message: "User registered successfully" });
  } catch (error) {
    console.error("❌ User Save Error:", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// ------------------ Login (email) ------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchemaModel.findOne({ email, status: 1 });
    if (!user) {
      return res.status(404).json({ token: null, message: "User not found" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ token: null, message: "Invalid password" });
    }

    const payload = { email: user.email, id: user._id, role: user.role };
    const key = process.env.JWT_SECRET || randomstring.generate(50);
    const token = jwt.sign(payload, key, { expiresIn: "1h" }); // optional expiry

    res.status(200).json({ token, userDetails: user });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ token: null, message: err.message });
  }
};

// ------------------ Admin: Fetch Users ------------------
export const fetch = async (req, res) => {
  try {
    const userList = await UserSchemaModel.find(req.query);
    if (userList.length === 0) return res.status(404).json({ status: "Resource not found" });
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ status: "Server error", message: err.message });
  }
};

// ------------------ Admin: Update User ------------------
export const update = async (req, res) => {
  try {
    const { condition_obj, content_obj } = req.body;

    const user = await UserSchemaModel.findOne(condition_obj);
    if (!user) return res.status(404).json({ status: "Requested resource not available" });

    const result = await UserSchemaModel.updateOne(condition_obj, { $set: content_obj });
    res.status(200).json({ msg: result.modifiedCount > 0 ? "OK" : "No changes made" });
  } catch (err) {
    res.status(500).json({ status: "Server Error", message: err.message });
  }
};

// ------------------ Admin: Delete User ------------------
export const deleteUser = async (req, res) => {
  try {
    const user = await UserSchemaModel.findOne(req.body);
    if (!user) return res.status(404).json({ status: "User not found" });

    const result = await UserSchemaModel.deleteOne(req.body);
    res.status(200).json({ status: result.deletedCount > 0 ? "OK" : "Server Error" });
  } catch (err) {
    res.status(500).json({ status: "Server Error", message: err.message });
  }
};
