import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RelatedProduct from './RelatedProduct';

export default function ProductDetails() {
    const [SpecificProduct, setSpecificProduct] = useState([]);
    const {id}=useParams();
    const url="http://localhost:2000/api"
    useEffect(() => {
    // fetching products from database
    const fetchProduct= async()  =>{
        const api=await axios.get(`${url}/product/${id}`,{
            headers:{
                "Content-Type":"Application/json"
            },
            withCredentials:true
        })
        // console.log(api.data.product);
        setSpecificProduct(api.data.product);
        
        }

    fetchProduct();
    
    }, [id])
    
  return (
    <>
   <h1 className="text-center fw-bolder mt-2">Product Details</h1>

<div className="container mt-5 shadow-lg rounded-4 p-4">
  <div className="row align-items-center g-4">
    {/* Left Section - Image */}
    <div className="col-12 col-md-6 text-center">
      <img
        src={SpecificProduct?.imgSrc}
        alt={SpecificProduct?.title}
        className="img-fluid rounded-3"
        style={{ maxWidth: "350px", height: "auto" }}
      />
    </div>

    {/* Right Section - Product Info */}
    <div className="col-12 col-md-6">
      <h3>{SpecificProduct?.title}</h3>
      <p className="lead">{SpecificProduct?.description}</p>
      <h1 className="text-black">{SpecificProduct?.price}.Rs</h1>
      <button className="btn btn-warning fw-bold mt-3">Add to Cart</button>
    </div>
  </div>
</div>

    <RelatedProduct category={SpecificProduct.category}/>
    </>
  )
}
