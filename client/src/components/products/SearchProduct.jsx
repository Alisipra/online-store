import React, { useContext, useEffect, useState } from 'react'
import appContext from '../../context/AppContext'
import { useParams } from 'react-router-dom';

export default function searchProduct({category}) {
    const{product} = useContext(appContext);
    const {term}=useParams();
    const [searchProduct, setSearchProduct] = useState();
    
    useEffect(() => {
      setSearchProduct(product.filter((data)=>data?.title?.toLowerCase().includes(term.toLowerCase())));
    //   console.log("cat",category);
      
    }, [term,product])
    
  return (
    <>
   <div className="container-fluid text-center">
    <div className="container">
        <div className="row justify-content-center">
            {searchProduct?.map((data) => (
                <div key={data._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div className="card shadow-lg rounded-5 p-3 h-100">
                        <img 
                            src={data?.imgSrc} 
                            alt={data?.title} 
                            className="card-img-top img-fluid rounded-3" 
                            style={{ height: "200px", objectFit: "cover" }} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{data?.title}</h5>
                            <p className="card-text">{data?.description}</p>
                            <h3 className="text-black">{data?.price}.Rs</h3>
                            <button className="btn btn-warning fw-bold w-100">Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>

    
    </>
  )
}
