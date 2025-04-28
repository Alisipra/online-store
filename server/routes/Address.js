import express from "express";
import { addAddress, getAddress } from "../controllers/address.js";
import { authenticated } from "../middleware/auth.js";

const router=express.Router();

// add address
router.post("/add",authenticated,addAddress)

// get address
router.get("/getaddress",authenticated,getAddress);


export default router;

