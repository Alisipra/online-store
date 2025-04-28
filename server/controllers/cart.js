import { Cart } from "../models/cart.js";


// get user's cart
export const getCart=async (req,res)=>{
    const userId=req.user;
    try {
        let cart=await Cart.findOne({userId});
        if(!cart){
            return res.json({message:"Cart Does Not Exists..."});
        }
        res.json({message:"Cart Found Successfully...",cart});

    } catch (error) {
        
    }

}
// add to cart
export const addToCart=async(req,res)=>{
    try {
        const {productId,title,price,qty,imgSrc}=req.body;
        const userId=req.user;
        ///now increasing quantity only not again adding 
        let cart=await Cart.findOne({userId});
        if(!cart){
            cart=new Cart({userId,items:[]});
        }
        const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId);
        if(itemIndex>-1){
            cart.items[itemIndex].qty+=qty;
            cart.items[itemIndex].price+=price*qty;
        }
        else{
            cart.items.push({productId,title,price,qty,imgSrc});  
        }
        await cart.save()  ;
        res.json({message:"Add To Cart Successfully...",cart})
    } catch (error) {
        res.json(error.message);
    }
    

}
// remove product from cart

export const removeProductFromCart=async (req,res)=>{
    const productId=req.params.productId;
    const userId=req.user;
    try {
        let cart=await Cart.findOne({userId});
        if(!cart){
            res.json({message:"No Such Cart..."})
        }
        cart.items=cart.items.filter((item)=>item.productId.toString()!==productId);
        await cart.save();
        res.json({message:"Product Removed Successfully..."})    
    } catch (error) {
        res.json(error.message);
    }
    
}
//clear cart
export const clearCart=async (req,res)=>{
    const userId=req.user;
    try {
        let cart=await Cart.findOne({userId});
        if(!cart){
            cart=new cart({items:[]})
            return res.json({message:"Something Went Wrong..."});
        }
        cart.items=[];
        await cart.save();
        res.json({message:"Cleared Cart..."})

    } catch (error) {
        
    }   
}

///decrease quantity should change price and qty
export const decreaseQty = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const userId = req.user;

        // Find or create a cart
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex === -1) {
            return res.status(400).json({ message: "Invalid Product..." });
        }

        const item = cart.items[itemIndex];

        // Decrease quantity or remove item if quantity is less than or equal to requested decrease
        if (item.qty > qty) {
            const pricePerUnit = item.price / item.qty;
            item.qty -= qty;
            item.price -= pricePerUnit * qty;
        } else {
            cart.items.splice(itemIndex, 1); // Remove the item
        }

        await cart.save();
        return res.status(200).json({ message: "Qty decreased successfully", cart });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


