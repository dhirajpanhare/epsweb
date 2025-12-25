import express from "express";
import * as UsersController from '../controllers/users.controller.js';

const router = express.Router();

// Create a new user
router.post("/save", UsersController.save);

// Login user
router.post("/login", UsersController.login);

// Fetch users (all or filtered)
router.get("/fetch", UsersController.fetch);

// Update user
// Use PUT or PATCH instead of GET for updates
router.put("/update", UsersController.update);

// Delete user
// Use DELETE instead of GET for deletion
router.delete("/delete", UsersController.deleteUser);

export default router;
