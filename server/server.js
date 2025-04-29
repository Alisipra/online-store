import express from "express"
import { connectDb } from "./db.js";
import bodyparser from "express";
import userRouter from "./routes/User.js"
import productRouter from "./routes/Product.js"
import cartRouter from "./routes/Cart.js"
import addressRouter from "./routes/Address.js"
import stripeRoutes from "./routes/Stripe.js"
import adminRouter from "./routes/Admin.js"
import orderRouter from "./routes/Order.js"

import cors from "cors";
const app=express()
connectDb();
////middlewares
app.use(bodyparser.json());
////cors policy adding
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  }));

///home route
app.get("/",(req,res)=>{
  res.send("server is up...")
})

  app.use("/api/stripe", stripeRoutes);
///user router
app.use("/api/user",userRouter)
///product router
app.use("/api/product",productRouter);

///cart router
app.use("/api/cart",cartRouter);

//address router
app.use("/api/address",addressRouter)


//admin router
app.use("/api/admin",adminRouter)

//Order router
app.use("/api/order",orderRouter)


const port=2000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})