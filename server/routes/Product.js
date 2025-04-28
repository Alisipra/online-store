import express from "express";
import { addProduct, deleteProductbyId, getProductbyId, getProducts, updateProductbyId } from "../controllers/product.js";
const router=express.Router();
///get all products
router.get("/all",getProducts);
///add product
router.post("/add",addProduct);
///get product by id
router.get("/:id",getProductbyId);

///update product by id
router.put("/:id",updateProductbyId);

///delete product by id
router.delete("/:id",deleteProductbyId);


export default router;
