import express from "express";
import {
  adminAddProduct,
  adminAddUser,
  adminDeleteProduct,
  adminDeleteUser,
  adminGetProduct,
  adminOrder,
  adminUpdateOrder,
  adminUpdateProduct,
  adminUpdateUser,
  loginAdmin,
  registerAdmin,
} from "../controllers/admin.js";

import { authenticate, verifyAdmin } from "../middleware/isAdmin.js";


const router = express.Router();

// Admin Auth Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Products
router.post("/products/add", authenticate,verifyAdmin, adminAddProduct);
router.get("/products", authenticate,verifyAdmin, adminGetProduct);
router.put("/products/:id", authenticate,verifyAdmin, adminUpdateProduct);
router.delete("/products/:id", authenticate,verifyAdmin, adminDeleteProduct);

// Users
router.get("/users", authenticate,verifyAdmin, adminAddUser); // Not sure why it's `adminAddUser` on GET
router.put("/users/:id", authenticate,verifyAdmin, adminUpdateUser);
router.delete("/users/:id", authenticate,verifyAdmin, adminDeleteUser);

// Orders
router.get("/orders", authenticate,verifyAdmin, adminOrder);
router.put("/orders/:id", authenticate,verifyAdmin, adminUpdateOrder);

export default router;
