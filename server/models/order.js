import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
    products: [{ 
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',required:true },
        quantity: Number
    }],
    shortOrderId: {
        type: String,
        unique: true,
        required: true,
      },
    totalAmount: Number,
    status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
}, { timestamps: true });


const Order = mongoose.model('Order', OrderSchema);
export default Order
