import {adminModel} from "../models/admin.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { User } from "../models/user.js";

///login admin
import jwt from 'jsonwebtoken';

////register admin
export const registerAdmin=async(req,res)=>{
    const {name,email,password,role}=req.body;

    ///check if admin already exists

     const existingAdmin=await adminModel.findOne({email});
     if(existingAdmin){
        return res.status(409).json({message:"Admin Already Exists..."})
     }
     let response=await adminModel.create({name,email,password,role})
      res.status(200).json({message:"Admin Registered...",response})


}

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin exists
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "No Such User Exists...." });
        }

        // Check if password matches (You should hash passwords in production)
        if (admin.password !== password) {
            return res.status(400).json({ message: "Invalid Credentials...." });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_Secret);

        res.status(200).json({
            message: "Log in Successfully...",
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role
            },
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

    
///Products sections

////add new product
export const adminAddProduct=async (req, res) => {
   try {
       const newProduct = new Product(req.body);
       await newProduct.save();
       res.status(201).json({ message: 'Product added successfully', product: newProduct });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

///fetch all the products
export const adminGetProduct=async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//update existing product
export const adminUpdateProduct=async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

///delete product
export const adminDeleteProduct=async (req, res) => {
   try {
       await Product.findByIdAndDelete(req.params.id);
       res.status(200).json({ message: 'Product deleted successfully' });
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

// user manangement section of admin
// add user
export const adminAddUser=async (req, res) => {
   try {
       const users = await User.find();
       res.status(200).json(users);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

// update user
export const adminUpdateUser=async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// delete product
export const adminDeleteUser=async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// order management section
export const adminOrder=async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update order
export const adminUpdateOrder=async (req, res) => {
   try {
       const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
       res.status(200).json(updatedOrder);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}