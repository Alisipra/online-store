import  Product from "../models/product.js";


// add product
export const addProduct=(async(req,res)=>{
    const {title,description,price,category,qty,imgSrc}=req.body;

    try {
        let product=await Product.create({title,description,price,category,qty,imgSrc})
        res.status(200).json({message:"Product Added Successfully...",product})

    } catch (error) {
        
    }

})
// get products
export const getProducts=(async(req,res)=>{
    try {
        let product=await Product.find()
        res.status(200).json({message:"All the Products...",product})

    } catch (error) {
        res.json(error.message);
    }

})
// get product using id
export const getProductbyId=(async(req,res)=>{
    const id=req.params.id;
    try {
        let product=await Product.findById(id)
        res.status(200).json({message:"specific Product...",product})

    } catch (error) {
        res.json(error.message);
    }

})
// update product using id
export const updateProductbyId=(async(req,res)=>{
    const id=req.params.id;
    try {
        let product=await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({message:"Product Updated Successfully...",product})

    } catch (error) {
        res.json(error.message);
    }

})
// update product using id
export const deleteProductbyId=(async(req,res)=>{
    const id=req.params.id;
    try {
        let product=await Product.findByIdAndDelete(id)
        res.status(200).json({message:"Product deleted Successfully..."})

    } catch (error) {
        res.json(error.message);
    }

})


