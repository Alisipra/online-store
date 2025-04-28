import Order from "../models/order.js";
import mongoose from "mongoose";
///create order


const generateShortId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit number
  };
  

export const createOrder = async (req, res) => {
    try {
        const { userId, products, totalAmount, status } = req.body;

        if (!userId || !products || products.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        // ✅ Ensure `productId` is converted to ObjectId
        const formattedProducts = products.map((product) => ({
            productId:new mongoose.Types.ObjectId(product.productId), // Convert to ObjectId
            quantity: product.quantity
        }));


        // Generate and check for unique shortOrderId
    let shortOrderId;
    let isUnique = false;
    while (!isUnique) {
      shortOrderId = generateShortId();
      const existing = await Order.findOne({ shortOrderId });
      if (!existing) isUnique = true;
    }
        const newOrder = new Order({
            userId:new mongoose.Types.ObjectId(userId), // Convert to ObjectId
            products: formattedProducts,
            totalAmount,
            status,
            shortOrderId
        });

        const savedOrder = await newOrder.save();
        console.log("Order saved successfully:", savedOrder); // Debugging
        res.status(201).json({ message: "Order placed successfully", savedOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error saving order", error });
    }
};
// get all orders 

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate("userId", "name email") // 👉 populate only the name field from User
      .populate({
        path: "products.productId",  // Populate the productId field inside products array
        model: "Product",  // Model name of the product collection
        select: "title imgSrc price"  // Fields to retrieve
    })
    .exec();

      if (!orders.length) {
        return res.status(404).json({ message: "No orders found", orders: [] });
      }
  
      res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };
  

// Get all orders of a specific user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId })
            .populate({
                path: "products.productId", // ✅ Populate `productId`
                model: "Product",
                select: "title description price category imgSrc" // ✅ Only fetch needed fields
            })
            .exec();

        // ✅ Log the populated orders
        // console.log("Fetched Orders with Products:", JSON.stringify(orders, null, 2));

        if (!orders.length) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Error fetching user orders", error });
    }
};
export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { productId, title, price, qty } = req.body;
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      const product = order.products.find(
        (p) => p.productId.toString() === productId.toString()
      );
  
      if (!product) {
        return res.status(404).json({ error: "Product not found in the order" });
      }
  
      // Update only if values are provided
      if (title !== undefined) product.title = title;
      if (price !== undefined) product.price = Number(price);
      if (qty !== undefined) product.qty = Number(qty);
  
      await order.save();
  
      res.status(200).json({
        message: "Product updated successfully",
        updatedProduct: product,
        order,
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Error updating product" });
    }
  };
  
// 
// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; // Order ID from the URL parameter
        const { status } = req.body; // Status (Shipped, Delivered, Pending)

        // Validate the status
        if (!["Shipped", "Delivered", "Pending"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find and update the order by ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the status
        order.status = status;
        await order.save();

        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Error updating order status", error });
    }
};
