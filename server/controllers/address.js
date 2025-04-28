import {Address} from "../models/shippingAddress.js";
import mongoose from "mongoose";

// add address of user
export const addAddress = async (req, res) => {
    const { fullname, address, city, state, country, pincode, phone } = req.body;

    try {
        // Check if the address already exists
        let existingAddress = await Address.findOne({
            address});

        if (existingAddress) {
            return res.status(400).json({ message: "Address already exists", existingAddress });
        }

        // Create a new address if it doesn't exist
        let userAddress = await Address.create({
            fullname,
            address,
            city,
            state,
            country,
            pincode,
            phone
        });
        

        res.status(201).json({ message: "Address Added Successfully...", userAddress });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// get address of a user
export const getAddress = async (req, res) => {

    try {
        let address= await Address.find().sort({createdAt:-1})
        res.json({message:"",userAddress:address[0]})
        
    } catch (error) {
           res.status(500).json({ message: "Internal Server Error" });
    }
}


